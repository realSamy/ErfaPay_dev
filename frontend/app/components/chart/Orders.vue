<!-- components/admin/LineChart.vue -->
<template>
  <div class="space-y-4 h-[300px]">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <h3 class="font-bold text-xl">{{ $t('admin.charts.title_orders') }}</h3>
      <div class="flex flex-wrap gap-4 items-center">
        <!-- Mode Radio Group -->
        <URadioGroup
            v-model="mode"
            :items="modeOptions"
            orientation="horizontal"
            size="xs"
            variant="table"
        />

        <!-- Date Range Picker -->
        <UPopover>
          <UButton
              :label="dateRangeLabel"
              color="neutral"
              icon="i-lucide-calendar"
              variant="subtle"
          />

          <template #content>
            <UCalendar
                v-model="dateRange"
                :max="maxSelectableDate"
                :min="minSelectableDate"
                :number-of-months="2"
                class="p-2"
                range
                @update:model-value="onDateRangeChange"
            />
          </template>
        </UPopover>

        <!-- CSV Download -->
        <UButton
            :label="$t('common.tables.download') + ' CSV'"
            :loading="csvLoading"
            icon="i-heroicons-document-arrow-down"
            @click="downloadCSV"
        />
      </div>
    </div>

    <VChart :loading="loading" :option="option" autoresize/>
  </div>
</template>

<script lang="ts" setup>
import {CalendarDate, getLocalTimeZone, DateFormatter, PersianCalendar, GregorianCalendar} from '@internationalized/date'

import {useI18n} from 'vue-i18n'

const {t, locale, n, d} = useI18n()
const df = new DateFormatter(locale.value, {dateStyle: 'medium'})

const mode = ref<'daily' | 'weekly' | 'monthly'>('daily')
const modeOptions = [
  {value: 'daily', label: t('admin.charts.modes.daily')},
  {value: 'weekly', label: t('admin.charts.modes.weekly')},
  {value: 'monthly', label: t('admin.charts.modes.monthly')},
]
const todayDate = d(new Date, {
  numberingSystem: 'latn'
}).split('/')

const LocaleCalendar = locale.value == "en" ? GregorianCalendar : PersianCalendar
const today = new CalendarDate(new LocaleCalendar, Number(todayDate[0]), Number(todayDate[1]), Number(todayDate[2]))
const defaultEnd = today
const defaultStart = today.subtract({days: 30})

const dateRange = shallowRef<{ start: CalendarDate; end: CalendarDate }>({
  start: defaultStart,
  end: defaultEnd,
})

const minSelectableDate = today.subtract({days: 365}) // Optional: limit how far back
const maxSelectableDate = today

// Computed label for the button
const dateRangeLabel = computed(() => {
  if (!dateRange.value.start) return t('admin.charts.pick_date')
  if (!dateRange.value.end) return df.format(dateRange.value.start.toDate(getLocalTimeZone()))
  return `${df.format(dateRange.value.start.toDate(getLocalTimeZone()))} - ${df.format(dateRange.value.end.toDate(getLocalTimeZone()))}`
})

// Force max 20 days when in daily mode
const onDateRangeChange = () => {
  if (!dateRange.value.end) return
  const daysDiff = dateRange.value.end.compare(dateRange.value.start)

  if (mode.value === 'daily') {
    if (daysDiff > 30) {
      // Auto-adjust to 20 days ending on selected end
      dateRange.value.start = dateRange.value.end.subtract({days: 30})
      useToast().add({
        title: t('admin.charts.max_20_days', [n(30)]),
        color: 'warning',
      })
    }
  } else if (daysDiff > 365) {
    dateRange.value.start = dateRange.value.end.subtract({days: 364})
    useToast().add({
      title: t('admin.charts.max_1_year'),
      color: 'warning',
    })

  }

}

// Fetch data
const {data: chartData, loading, refresh} = useAdminChartData(
    'orders',
    mode,
    computed(() => dateRange.value.start?.toDate(getLocalTimeZone()) || null),
    computed(() => dateRange.value.end?.toDate(getLocalTimeZone()) || null)
)

// Watch mode and date changes
watch([mode, dateRange], () => refresh(), {deep: true})

const echarts = await import('echarts')


const labels = computed(() => chartData.value?.labels || [])
const values = computed(() => chartData.value?.values || [])

const option = computed<ECOption>(() => ({
  xAxis: {
    type: 'category',
    triggerEvent: true,
    tooltip: {show: true},
    data: labels.value,
  },
  yAxis: {
    type: 'value',
    min: 0,
    triggerEvent: true,
    tooltip: {show: true},
  },
  legend: {top: 20},
  tooltip: {
    trigger: 'axis',
  },
  series: [{
    type: 'line',
    data: values.value,
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    emphasis: {focus: 'series'},
    lineStyle: {color: '#3B82F6', width: 2},
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(59, 130, 246, 0.4)'},
        {offset: 1, color: 'rgba(59, 130, 246, 0.0)'},
      ]),
    },
  }],
}))

watch(mode, () => refresh())

// CSV Download
const csvLoading = ref(false)
const downloadCSV = async () => {
  csvLoading.value = true
  try {
    const response = await useAuthApi(`/api/orders/admin/charts/?mode=${mode.value}&output=csv`, {
      method: 'GET',
      responseType: 'blob',
    })
    const url = URL.createObjectURL(response.data.value)
    const link = document.createElement('a')
    link.href = url
    link.download = `report_${mode.value}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.log(err)
    useToast().add({title: 'Error downloading CSV', color: 'error'})
  } finally {
    csvLoading.value = false
  }
}
</script>