<template>
  <div class="space-y-12">
    <section class="page-section">
      <h2 class="font-bold text-2xl">تنظیم ساعات قبول سفارشات</h2>
      <ClientOnly>
        <div class="space-y-2">
          <div class="space-x-2">
            <span>ساعات ثبت سفارش در حال حاضر از ساعت</span>
            <InputTime v-model="timeFrom"/>
            <span>الی</span>
            <InputTime v-model="timeTo"/>
            <span>در روز های</span>
            <PickerWeekDay v-model="dayFrom"/>
            <span>تا</span>
            <PickerWeekDay v-model="dayTo"/>
            <span>میباشد</span>
          </div>
          <div class="space-x-2">
            <span>ثبت سفارش در حال حاضر</span>
            <USelectMenu
                v-model="ordersAvailability"
                :items="ordersAvailabilityItems"
                :search-input="false"/>
            <span>میباشد</span>
          </div>

          <UButton label="اعمال تغییرات" size="xl"/>
        </div>
      </ClientOnly>
    </section>
    <section class="page-section">
      <div class="flex justify-between pe-6 py-2">
        <h2 class="font-bold text-2xl">لیست خدمات</h2>
        <UButton size="xl" trailing-icon="material-symbols:add" :to="useLocalePath()({name: 'admin-services-new'})" :label="$t('pages.admin.labels.services.button_new_service')" />
      </div>
      <ClientOnly>
        <TableAdminServices />
      </ClientOnly>
    </section>

    <section class="page-section">
      <h2 class="font-bold text-2xl">لیست سفارشات</h2>
      <ClientOnly>
        <TableAdminOrders :orders="orders" :loading="loadingOrders" />
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {TimeString, WeekDay} from "~/types/data";
import type {Order} from "~/types";

definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.orders'

})

const timeFrom = ref<TimeString>('00:00');
const timeTo = ref<TimeString>('00:00');
const dayFrom = ref<WeekDay>('Monday');
const dayTo = ref<WeekDay>('Monday');

const ordersAvailabilityItems = ref(['قعال', 'غیرفعال'])
const ordersAvailability = ref('فعال')

const orders = ref<Order[]>([])
const loadingOrders = ref(true)

adminLoadOrders().then(_o => {
  orders.value = _o
  loadingOrders.value = false
})

</script>