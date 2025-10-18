<template>
  <UContainer class="bg-ui-highlight p-10 sm:p-8 md:p-20 flex flex-col md:flex-row gap-2">
    <div class="w-full flex justify-between items-center bg-ui-input p-3 rounded-lg">
      <span class="text-gray-700 dark:text-gray-300 font-semibold grow w-1/2 text-nowrap">{{
          t('pages.home.select_currency')
        }}</span>
      <UIcon :name="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" class="text-gray-500 min-w-[40px]" size="40"/>
      <USelect
          v-model="selectedCurrency"
          :items="currencies"
          class="grow w-1/2"
          label-key="code"
          value-key="code"
          variant="none"
      />
    </div>

    <div class="w-full flex justify-between items-center bg-ui-input p-3 rounded-lg">
      <span class="text-gray-700 dark:text-gray-300 font-semibold grow w-1/2 text-nowrap">{{
          t('pages.home.deposit_amount')
        }}</span>
      <UIcon :name="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')" class="text-gray-500 min-w-[40px]" :size="40"/>
      <UInput
          v-model.number="depositAmount"
          type="number"
          class="w-1/2"
          min="0"
          placeholder="0.00"
          variant="none"
          @keydown="checkNumber"
      />
    </div>


    <div class="w-full flex flex-col relative">
      <div class="w-full flex grow justify-between items-center bg-ui-input p-3 rounded-lg">
        <span class="text-gray-700 dark:text-gray-300 font-semibold grow text-nowrap">{{
            t('pages.home.rial_equivalent')
          }}</span>
        <UIcon name="mdi:equal" class="text-gray-500 min-w-[40px]" size="40"/>
        <UInput
            :model-value="formattedRialEquivalent"
            class="grow"
            readonly
            type="text"
            variant="none"
        />
      </div>
      <span v-if="rialEquivalent"
          class="text-muted md:absolute top-19 capitalize">{{ rialEquivalentText }} {{ t('common.currencies.text.toman') }}</span>
    </div>
    <UButton
        :label="t('services.labels.charge_account')"
        :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
        block
        class="rounded-lg font-bold text-lg text-white"
        size="xl"
        @click="handleChargeWallet"
    />

  </UContainer>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import type {CurrencyItem} from "~/types/data";

const {t, locale} = useI18n();

const currencies: Ref<CurrencyItem[]> = useState('currencies');
const selectedCurrency = ref('USD');
const depositAmount = ref<number | null>(null);

const rialEquivalent = computed(() => {
  if (depositAmount.value === null || depositAmount.value <= 0) {
    return 0;
  }
  const rate = currencies.value.find(_i => _i.code === selectedCurrency.value)?.rate;
  return Math.floor(depositAmount.value * (rate || 0));
});

const rialEquivalentText = computed(() => numberToText(rialEquivalent.value, locale.value))

const formattedRialEquivalent = computed(() => {
  let output = 0;
  if (rialEquivalent.value !== 0) {
    output = rialEquivalent.value
  }
  return output.toLocaleString(locale.value);
});

const handleChargeWallet = () => {
  if (depositAmount.value && depositAmount.value > 0) {
    console.log(`Charging wallet with ${depositAmount.value} ${selectedCurrency.value} (Equivalent to ${rialEquivalent.value} IRR)`);
  } else {
    alert('لطفا مبلغ معتبری را وارد کنید.');
  }
};

function checkNumber(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const isNumberKey = /^[0-9]$/.test(e.key)

  if (!isNumberKey) return

  const selectionLength = input.selectionEnd! - input.selectionStart!
  const currentLength = input.value.length

  if (currentLength - selectionLength >= 7) {
    e.preventDefault()
  }
}</script>

<style scoped>

</style>