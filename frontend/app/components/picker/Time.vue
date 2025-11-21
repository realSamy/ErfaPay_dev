<script setup lang="ts">
// ---------- Props & Emits ----------
interface Props {
  modelValue?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const isOpen = ref(false)

// ---------- State ----------
const hour = ref(0)
const minute = ref(0)
const activePart = ref<'hour' | 'minute' | null>(null)
const inputBuffer = ref('')
const scrollHour = ref<HTMLDivElement | null>(null)
const scrollMinute = ref<HTMLDivElement | null>(null)

const formatted = computed(() =>
  `${hour.value.toString().padStart(2, '0')}:${minute.value.toString().padStart(2, '0')}`
)

// ---------- Init from v-model ----------
watch(
  () => props.modelValue,
  (val) => {
    if (!val) return
    const [h, m] = val.split(':').map(Number)
    hour.value = isNaN(h) ? 0 : Math.min(23, h)
    minute.value = isNaN(m) ? 0 : Math.min(59, m)
  },
  { immediate: true }
)

// ---------- Sync back ----------
watch([hour, minute], () => {
  emit('update:modelValue', formatted.value)
})

// ---------- Input handling ----------
const handleKey = (e: KeyboardEvent) => {
  if (!/^\d$/.test(e.key)) return

  inputBuffer.value += e.key
  if (inputBuffer.value.length > 4) inputBuffer.value = inputBuffer.value.slice(-4)

  // auto split
  if (inputBuffer.value.length >= 3) {
    const val = inputBuffer.value.padStart(4, '0')
    const h = parseInt(val.slice(0, 2))
    const m = parseInt(val.slice(2, 4))
    hour.value = Math.min(23, h)
    minute.value = Math.min(59, m)
    inputBuffer.value = ''
  }
}

// ---------- Wheel handling ----------
const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

const scrollTo = async (refEl: HTMLDivElement | null, index: number) => {
  await nextTick()
  if (refEl) refEl.scrollTop = index * 40 // each item 40px
}

watch(hour, () => scrollTo(scrollHour.value, hour.value))
watch(minute, () => scrollTo(scrollMinute.value, minute.value))

const handleScroll = (type: 'hour' | 'minute', e: Event) => {
  const el = e.target as HTMLElement
  const val = Math.round(el.scrollTop / 40)
  if (type === 'hour') hour.value = val
  else minute.value = val
}
</script>

<template>
  <div
    class="inline-flex items-center justify-center space-x-2  border border-gray-200 rounded-lg px-4 py-2 shadow-sm select-none"
    tabindex="0"
    @keydown="handleKey"
    dir="ltr"
  >
    <!-- Hour -->
    <div
      class="relative flex flex-col items-center"
      @click="activePart = 'hour'"
    >
      <div
        ref="scrollHour"
        class="wheel h-[40px] w-[48px] overflow-y-scroll no-scrollbar snap-y snap-mandatory text-center"
        @scroll.passive="handleScroll('hour', $event)"
      >
        <div
          v-for="h in hours"
          :key="h"
          class="wheel-item snap-center h-[40px] flex items-center justify-center"
          :class="{ 'text-blue-600 font-semibold': h === hour }"
        >
          {{ h.toString().padStart(2, '0') }}
        </div>
      </div>
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div class="h-[40px] w-full border-t border-b border-blue-300"></div>
      </div>
    </div>

    <!-- Colon -->
    <div class="text-xl font-bold text-gray-700">:</div>

    <!-- Minute -->
    <div
      class="relative flex flex-col items-center"
      @click="activePart = 'minute'"
    >
      <div
        ref="scrollMinute"
        class="wheel h-[40px] w-[48px] overflow-y-scroll no-scrollbar snap-y snap-mandatory text-center"
        @scroll.passive="handleScroll('minute', $event)"
      >
        <div
          v-for="m in minutes"
          :key="m"
          class="wheel-item snap-center h-[40px] flex items-center justify-center"
          :class="{ 'text-blue-600 font-semibold': m === minute }"
        >
          {{ m.toString().padStart(2, '0') }}
        </div>
      </div>
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div class="h-[40px] w-full border-t border-b border-blue-300"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wheel {
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.wheel-item {
  transition: color 0.15s ease;
}
</style>
