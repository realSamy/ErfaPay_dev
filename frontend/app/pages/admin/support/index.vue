<template>
  <div class="space-y-10 max-h-full p-2 overflow-y-auto">
    <section v-if="hasPermission('send_bulk_emails')" class="space-y-4">
      <h2 class="font-bold text-2xl">ارسال ایمیل همگانی</h2>
      <UForm @submit.prevent="submit">
        <div class="space-y-4">
          <UFormField :label="$t('common.labels.email_subject')" size="xl">
            <UInput
                v-model="payload.subject"
                class="w-lg"
                :placeholder="$t('common.placeholders.subject')"
                required
            />
          </UFormField>
          <TiptapEditor v-model="payload.message" required/>
          <UButton
              :label="$t('common.labels.send')"
              :loading="loading"
              :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
              size="xl"
              type="submit"/>
        </div>
      </UForm>
    </section>

    <section>
      <h2 class="font-bold text-2xl">{{ $t('common.titles.tickets') }}</h2>
      <ClientOnly>
        <TableAdminTickets/>
      </ClientOnly>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {BulkEmailPayload} from "~/types/payload";

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'support'],
  title: 'pages.admin.title.support'
})

const {t} = useI18n();
const {sendBulkEmail, loading} = useAdminBulkEmail()
const payload = ref(<BulkEmailPayload>{})

const {hasPermission} = usePermissions()

const submit = async () => {
  if (!payload.value.message || !payload.value.subject) {
    useToast().add({
      title: t('common.labels.bulk_email'),
      description: t('errors.bulk_mail_payload_incomplete'),
      color: 'error',
    })
    return
  }
  await sendBulkEmail(payload.value)
}
</script>

<style scoped>
</style>