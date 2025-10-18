<template>
  <UCarousel
      v-slot="{item}"
      :items="items"
      :ui="{
  dot: 'data-[state=active]:bg-primary',
  next: 'ring-transparent scale-150',
  prev: 'ring-transparent scale-150',
}"
      arrows :autoplay="{
        stopOnFocusIn: false,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }"
      dots loop
      :prev-icon="directionalIcon('mdi:chevron-right', 'mdi:chevron-left')"
      :next-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
  >
    <div :dir="dir" class="flex flex-col items-center md:flex-row w-full justify-between gap-10">
      <div>
        <h4 class="font-black text-2xl">{{ item.title }}</h4>
        <p class="text-muted mt-1">{{ item.message }}</p>
        <UButton :label="item.cta_label" :trailing-icon="ctaIcon" class="mt-3" size="xl"/>
      </div>
      <div class="grow flex justify-center">
        <img :src="item.image" :alt="item.title" class="w-100">
      </div>
    </div>
  </UCarousel>
</template>

<script lang="ts" setup>
import type {ServiceSlide} from "~/types/data";

const { locale } = useI18n()
const isRTL = computed(() => ['fa', 'ar'].includes(locale.value))
const dir = computed(() => isRTL.value ? "rtl" : "ltr");
const ctaIcon = directionalIcon('mdi:chevron-left', 'mdi:chevron-right')
defineProps<{
  items: ServiceSlide[]
}>()
</script>

<style scoped>

</style>