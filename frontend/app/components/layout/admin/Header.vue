<template>
  <div
      :class="{'shadow-lg shadow-primary/50 bg-(--ui-bg-light) dark:bg-(--ui-bg-dark)': showOverlay}"
      class="z-2 h-18 rounded flex gap-2 items-center justify-between px-4 ms-0">
    <div class="header-start">
      <Logo class="lg:hidden" />
    </div>
    <div class="header-end">
      <UButton :label="$t('common.signin_or_signup')" @click="open('signin')" v-if="isIndexRoute" />
      <SelectLanguage v-model="showOverlay"/>

      <ButtonTheme toggle/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "~/components/Logo.vue";

const route = useRoute()
const isIndexRoute = computed(() => route.name?.toString().includes('index'))
const showOverlay = ref(false)
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
watch(showOverlay, (val) => {
  emit('update:modelValue', val)
})
const { open } = useAuthModal()
</script>


<style scoped>
@reference "@/assets/css/main.css";

.header-start, .header-end {
  @apply flex items-center gap-2;
}
.header-start {
  @apply md:gap-2 gap-0;
}
</style>