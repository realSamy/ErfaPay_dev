<template>
  <div class="mt-20 flex flex-col gap-16 max-w-screen">
    <UContainer class="flex flex-col gap-16">
      <CarouselServices :items="ServiceSlides"/>
      <div class="flex flex-col justify-center items-center">
        <h3 class="text-xl mb-2 text-muted">{{ $t('pages.home.current_prices') }}</h3>
        <CarouselCurrencies/>
      </div>
    </UContainer>

    <ChargeAccount/>

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
      <div class="p-10 text-center space-y-4">
        <h2 class="font-extrabold text-2xl">{{ $t('pages.home.cta_section_title') }}</h2>
        <UButton :label="$t('common.labels.signup')" class="mt-3" size="xl"/>
      </div>
      <div class="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between text-xl">
        <h2>{{ $t('common.messages.support_24_7') }}</h2>
        <p>
          {{ $t('pages.home.support_phone') }}
          <span dir="ltr">{{ useConvertNumericToLocale('(+98) 912 999 9999 - (+98) 912 999 9999', locale) }}</span>
        </p>
      </div>
    </UContainer>

  </div>
</template>

<script lang="ts" setup>
import type {User} from "~/types/auth";
import {FetchError} from "ofetch";
import type {ServiceSlide} from "~/types/data";
import ChargeAccount from "~/components/ChargeAccount.vue";

const {locale} = useI18n();
const slide = {
  title: $t('pages.home.hero_section_title'),
  message: $t('pages.home.hero_section_description'),
  cta_label: $t('pages.home.hero_section_cta'),
  image: '/img/carousels/header/erfapay_cards.png',
}
const ServiceSlides: ServiceSlide[] = [
  slide, slide, slide,
]
const benefits = useState('benefits')

const user: Ref<User> = useState('user')
const authError: Ref<FetchError> = useState('auth_error')

</script>