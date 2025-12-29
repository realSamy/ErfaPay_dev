<template>
  <UForm @submit.prevent="handleSubmit" class="bg-ui-highlight w-full p-10 sm:p-8 md:p-20 flex flex-col gap-6">
    <!-- Gateway Selection Tabs -->
    <UTabs v-model="selectedGateway" :items="gatewayTabs" class="w-full" />

    <!-- PayPal / Crypto Section -->
    <div v-if="selectedGateway !== 'voucher'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormField :label="$t('pages.home.select_currency')" :ui="fieldUI" class="bg-ui-input rounded-lg p-3">
        <USelect
          v-model="selectedCurrency"
          :items="availableCurrencies"
          :disabled="selectedGateway === 'paypal'"
          class="w-full"
          label-key="name"
          value-key="code"
          variant="none"
        />
      </UFormField>

      <UFormField :label="$t('pages.home.deposit_amount')" :ui="fieldUI" class="bg-ui-input rounded-lg p-3">
        <UInputNumber
          v-model="depositAmount"
          :decrement="false"
          :format-options="{ maximumFractionDigits: 5 }"
          :increment="false"
          :min="minAmounts[selectedGateway]"
          :step="0.00000001"
          class="w-full"
          dir="ltr"
          placeholder="0.00"
          variant="subtle"
          @focus="(e: any) => e.target.select()"
        />
      </UFormField>

      <div class="col-span-1 md:col-span-2">
        <UFormField :label="$t('pages.home.irt_equivalent')" :ui="fieldUI" class="bg-ui-input rounded-lg p-3">
          <UInput
            :value="formattedIRTEquivalent"
            class="w-full"
            dir="ltr"
            readonly
            type="text"
            variant="none"
          />
        </UFormField>
        <span v-if="irtEquivalent" class="text-muted text-sm">
          {{ irtEquivalentText }} {{ $t('common.currencies.text.toman') }}
        </span>
      </div>
    </div>

    <!-- Perfect Money Voucher Section -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormField :label="$t('pages.home.voucher_number')" :ui="fieldUI" class="bg-ui-input rounded-lg p-3" required>
        <UInput
          v-model="voucherNum"
          class="w-full"
          placeholder="e.g. 1234567890"
          dir="ltr"
          maxlength="10"
          variant="subtle"
        />
      </UFormField>

      <UFormField :label="$t('pages.home.voucher_code')" :ui="fieldUI" class="bg-ui-input rounded-lg p-3" required>
        <UInput
          v-model="voucherCode"
          class="w-full"
          placeholder="e.g. ABCD1234EFGH5678"
          dir="ltr"
          maxlength="16"
          variant="subtle"
        />
      </UFormField>
    </div>

    <!-- Submit Button -->
    <UButton
      :label="submitButtonLabel"
      :loading="loading"
      :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
      block
      class="rounded-lg font-bold text-lg text-white"
      size="xl"
      type="submit"
    />
  </UForm>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '~/composables/useAuth'

const { t, locale } = useI18n()
const { user, login } = useAuth()
const currenciesStore = await useLoadCurrenciesStore()

const loading = ref(false)

// Gateway selection
const selectedGateway = ref<'paypal' | 'crypto' | 'voucher'>('paypal')
const gatewayTabs = [
  { value: 'paypal', label: 'PayPal' },
  { value: 'crypto', label: t('pages.home.crypto') },
  { value: 'voucher', label: 'Perfect Money Voucher' },
]

// Available currencies (hardcoded – only supported ones)
const cryptoCurrencies = [
  { code: 'BTC', name: 'Bitcoin (BTC)' },
  { code: 'ETH', name: 'Ethereum (ETH)' },
  { code: 'USDT', name: 'Tether (USDT TRC20)' },
  { code: 'LTC', name: 'Litecoin (LTC)' },
  { code: 'TRX', name: 'Tron (TRX)' },
  // Add more as supported by NOWPayments
]

const availableCurrencies = computed(() => {
  if (selectedGateway.value === 'paypal') return [{ code: 'USD', name: 'US Dollar (USD)' }]
  return cryptoCurrencies
})

const selectedCurrency = ref('USD')

// Min amounts (adjust as needed)
const minAmounts = {
  paypal: 5,     // $5 minimum
  crypto: 5,     // $5 equivalent
  voucher: 0,    // No min for voucher
}

// Amount input
const depositAmount = ref<number | null>(null)

// Voucher inputs
const voucherNum = ref('')
const voucherCode = ref('')

// IRT Calculation (only for PayPal/Crypto)
const irtRate = computed(() => {
  if (selectedGateway.value === 'voucher') return 0
  const currency = selectedCurrency.value
  return currenciesStore.value.find(c => c.code == currency)?.['rate'] || 0
})

const irtEquivalent = computed(() => {
  if (selectedGateway.value === 'voucher' || !depositAmount.value || depositAmount.value <= 0) return 0
  return Math.floor(depositAmount.value * irtRate.value)
})

const irtEquivalentText = computed(() => numberToText(irtEquivalent.value, locale.value))
const formattedIRTEquivalent = computed(() => irtEquivalent.value.toLocaleString(locale.value))

const fieldUI = { label: 'text-gray-700 dark:text-gray-300 font-semibold text-nowrap' }

const submitButtonLabel = computed(() => {
  if (selectedGateway.value === 'voucher') return t('pages.home.redeem_voucher')
  return t('services.labels.charge_account')
})

// Reset amount when gateway changes
watch(selectedGateway, (newVal) => {
  depositAmount.value = null
  if (newVal === 'paypal') selectedCurrency.value = 'USD'
  if (newVal === 'crypto') selectedCurrency.value = 'BTC'
})

// Submit handler
const handleSubmit = async () => {
  if (loading.value) return

  if (!user.value) {
    return login()
  }

  if (selectedGateway.value !== 'voucher') {
    if (!depositAmount.value || depositAmount.value < minAmounts[selectedGateway.value]) {
      useToast().add({
        title: t('common.titles.error'),
        description: t('errors.invalid_amount'),
        color: 'error',
      })
      return
    }
  } else {
    if (!voucherNum.value || !voucherCode.value) {
      useToast().add({
        title: t('common.titles.error'),
        description: t('error.voucher_required'),
        color: 'error',
      })
      return
    }
  }

  loading.value = true

  try {
    let payload: any = {}
    let endpoint = '/api/payments/charges/create/'

    if (selectedGateway.value === 'paypal') {
      payload = { gateway: 'paypal', foreign_amount: depositAmount.value }
    } else if (selectedGateway.value === 'crypto') {
      payload = {
        gateway: 'crypto',
        foreign_amount: depositAmount.value,
        currency: selectedCurrency.value,
      }
    } else if (selectedGateway.value === 'voucher') {
      payload = {
        gateway: 'voucher',
        voucher_num: voucherNum.value,
        voucher_code: voucherCode.value,
      }
    }

    const { data } = await useAuthApi(endpoint, {
      method: 'POST',
      body: payload,
    })

    if (data.value?.approve_url || data.value?.pay_url) {
      window.location.href = data.value.approve_url || data.value.pay_url
    } else if (data.value?.success) {
      useToast().add({ title: t('pages.home.voucher_success'), color: 'success' })
      // Optionally refresh wallet balance
    } else {
      useToast().add({
        title: t('common.titles.error'),
        description: data.value?.error || t('common.errors.unknown'),
        color: 'error',
      })
    }
  } catch (err) {
    useToast().add({ title: t('common.titles.error'), color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>