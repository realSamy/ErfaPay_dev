<template>
  <section class="page-section">
    <h2 class="font-bold text-2xl">ایجاد سرویس جدید</h2>
    <UForm class="w-full md:w-lg  space-y-4">
      <UFormField label="نام سرویس">
        <div class="space-y-1">
          <UFieldGroup as="label" class="w-full">
            <UBadge class="w-10 justify-center capitalize select-none" color="neutral" variant="outline">Fa</UBadge>
            <UInput class="w-full" placeholder="نام سرویس به فارسی" required size="xl" variant="subtle"/>
          </UFieldGroup>
          <UFieldGroup as="label" class="w-full">
            <UBadge class="w-10 justify-center capitalize select-none" color="neutral" variant="outline">en</UBadge>
            <UInput class="w-full" placeholder="Service name in English" required size="xl" variant="subtle"/>
          </UFieldGroup>
        </div>
      </UFormField>
      <UFormField label="توضیحات سرویس">
        <div class="space-y-1">
          <UFieldGroup as="label" class="w-full">
            <UBadge class="w-10 justify-center capitalize select-none" color="neutral" variant="outline">Fa</UBadge>
            <UTextarea class="w-full" placeholder="توضیحات سرویس به فارسی" required variant="subtle"/>
          </UFieldGroup>
          <UFieldGroup as="label" class="w-full">
            <UBadge class="w-10 justify-center capitalize select-none" color="neutral" variant="outline">en</UBadge>
            <UTextarea class="w-full" placeholder="Service descriptions in English" required variant="subtle"/>
          </UFieldGroup>
        </div>
      </UFormField>
      <UFormField label="نرخ کارمزد">
        <UInputNumber
            :format-options="{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 1,
                style: 'percent'
              }"
            :min="0"
            :step="0.01"
            class="w-full"
            required
            variant="subtle"/>
      </UFormField>
      <UFormField label="تصویر کاور">
        <UFileUpload accept="image/*" class="w-full"
                     description="محدودیت ارسال فایل ۵ مگابایت"
                     icon="material-symbols:image-outline"
                     label="کلیک کنید یا فایل تصویر را بکشید و اینجا رها کنید"
                     layout="list"
                     position="inside"
                     required
                     size="lg"/>
      </UFormField>
      <UFormField label="مدارک مورد نیاز">
        <InputTags v-model="docs" class="w-full"></InputTags>
      </UFormField>
      <UFormField>
        <UButton :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" label="ایجاد سرویس"
                 size="lg"
                 type="submit"/>
      </UFormField>
    </UForm>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  title: 'pages.admin.title.orders_new'

})

const docs = ref([])
</script>
