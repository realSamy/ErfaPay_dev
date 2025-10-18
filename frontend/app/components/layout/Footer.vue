<template>
  <UContainer class="max-w-screen bg-black/90 mt-10 text-white py-8">
    <UContainer class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6 pb-6 border-b border-gray-700">
        <div></div>
        <div class="flex flex-col sm:flex-row justify-between">
          <span class="text-lg font-semibold mb-4 sm:mb-0">{{ $t('pages.home.social_media_title') }}</span>
          <div class="flex space-x-4">
            <UButton aria-label="Instagram" class="text-white" color="primary" icon="i-mdi-instagram" target="_blank"
                     to="#" variant="link"/>
            <UButton aria-label="Telegram" class="text-white" color="primary" icon="i-mdi-telegram" target="_blank"
                     to="#" variant="link"/>
            <UButton aria-label="Twitter" class="text-white" color="primary" icon="i-mdi-twitter" target="_blank"
                     to="#" variant="link"/>
            <UButton aria-label="WhatsApp" class="text-white" color="primary" icon="i-mdi-whatsapp" target="_blank"
                     to="#" variant="link"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6">
        <div class="text-start">
          <h3 class="text-xl font-bold mb-4">{{ $t('footer.erfapay_links_title') }}</h3>
          <ul class="space-y-2">
            <li>
              <ULink class="text-gray-400 hover:text-primary-400" to="#">{{ $t('footer.rules_regulations') }}</ULink>
            </li>
            <li>
              <ULink class="text-gray-400 hover:text-primary-400" to="#">{{ $t('footer.faqs') }}</ULink>
            </li>
            <li>
              <ULink class="text-gray-400 hover:text-primary-400" to="#">{{ $t('footer.about_us') }}</ULink>
            </li>
            <li>
              <ULink class="text-gray-400 hover:text-primary-400" to="#">{{ $t('footer.privacy_policy') }}</ULink>
            </li>
          </ul>
        </div>

        <div class="text-start">
          <h3 class="text-xl font-bold mb-4">{{ $t('footer.contact_info_title') }}</h3>
          <div class="text-gray-400 mb-2">{{ $t('footer.address') }}</div>
          <div class="text-gray-400 mb-2 flex items-center justify-start">
            <UIcon class="ltr:mr-2 rtl:ml-2" name="i-mdi-email"/>
            <a :href="`mailto:${$t('footer.email')}`" class="hover:text-primary-400">{{ $t('footer.email') }}</a>
          </div>
          <div class="text-gray-400 flex items-center justify-start">
            <UIcon class="ltr:mr-2 rtl:ml-2" name="i-mdi-phone"/>
            <p dir="ltr"> {{ useConvertNumericToLocale(' (+98) 912 999 9999 - (+98) 912 999 9999', locale) }}</p>
          </div>
        </div>
      </div>


      <div class="text-center text-gray-500 text-sm pt-6 border-t border-gray-700">
        <div class="flex gap-2">
          <a v-for="logo in footerLogos" :href="logo.href">
            <img :alt="logo.alt" :src="logo.img" class="h-16">
          </a>
        </div>

        <p class="p-4">Copyright © ErfaPay.com All rights reserved</p>
      </div>
    </UContainer>
  </UContainer>
</template>
<script lang="ts" setup>
import type {FooterLogo} from "~/types/data";

const footerLogos = useState<FooterLogo[]>('footer_logos');
const {locale} = useI18n();

</script>

<style scoped>

</style>