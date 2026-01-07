<template>
  <div class="mt-20 flex flex-col gap-16 max-w-screen">
    <UContainer class="flex flex-col gap-16">
      <ClientOnly>
        <CarouselServices/>

        <template #fallback>
          <div class="flex flex-col items-center md:flex-row w-full justify-between gap-10">
            <div class="space-y-6">
              <USkeleton class="w-40 h-6"/>
              <USkeleton class="w-70 h-6"/>
              <USkeleton class="w-30 h-6"/>
            </div>
            <div class="grow flex justify-center">
              <USkeleton class="w-80 h-45"/>
            </div>
          </div>
        </template>
      </ClientOnly>
      <div class="flex flex-col justify-center items-center">
        <h3 class="text-xl mb-2 text-muted">{{ $t('pages.home.current_prices') }}</h3>
        <ClientOnly>
          <CarouselCurrencies/>

          <template #fallback>
            <UContainer class="flex flex-col md:flex-row items-center justify-between gap-10">
              <USkeleton class="w-80 h-20"/>
              <USkeleton class="w-80 h-20"/>
              <USkeleton class="w-80 h-20"/>
            </UContainer>
          </template>
        </ClientOnly>
      </div>
    </UContainer>

    <ClientOnly>
      <ChargeAccount v-if="user"/>
    </ClientOnly>

    <UContainer class="max-w-screen bg-primary py-10">
      <UContainer class="space-y-3">
        <h2 class="font-extrabold text-4xl text-white">{{ $t('pages.home.why_erfapay_title') }}</h2>
        <p class="text-xl text-white/80">{{ $t('pages.home.why_erfapay_description') }}</p>
        <div class="flex flex-col md:flex-row flex-wrap gap-6 mt-10">
          <CardBenefit v-for="item in benefits" :item="item"/>
        </div>
      </UContainer>
    </UContainer>

    <UContainer>
      <ClientOnly>
        <div class="p-10 text-center space-y-4" v-if="!user">
          <h2 class="font-extrabold text-2xl">{{ $t('pages.home.cta_section_title') }}</h2>
          <UButton :label="$t('common.labels.signup')" class="mt-3" size="xl" @click="() => login()"/>
        </div>
      </ClientOnly>
      <div class="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between text-xl">
        <h2>{{ $t('common.messages.support_24_7') }}</h2>
        <p>
          {{ $t('pages.home.support_phone') }}
          <span dir="ltr">{{ useConvertNumericToLocale(settings?.erfapay_phones || '', locale) }}</span>
        </p>
      </div>
    </UContainer>

  </div>
</template>

<script lang="ts" setup>
import ChargeAccount from "~/components/ChargeAccount.vue";

const {locale} = useI18n();

const benefits = useState('benefits')

const {user, login} = useAuth()

const settings = await useLoadGlobalSettingsStore()

</script>