<template>
  <UContainer
      :class="{'shadow-lg shadow-primary/50 bg-(--ui-bg-light) dark:bg-(--ui-bg-dark)': showOverlay}"
      class="z-2 h-18 rounded flex gap-2 items-center justify-between">
    <div class="header-start">
      <UDrawer direction="right" class="md:hidden" title="Menu" description="Mobile Menu">
        <UButton color="neutral" icon="mdi:menu" variant="ghost"/>

        <template #content>
          <div class="p-10 flex flex-col">
            <ListServices />
            <UButton
                :label="$t('common.labels.contact_us')"
                :ui="{leadingIcon: 'text-primary'}"
                color="neutral"
                icon="mdi:phone"
                variant="ghost"/>
          </div>
        </template>
      </UDrawer>
      <Logo/>
      <ListServices v-model="showOverlay" class="hidden md:flex"/>
      <UButton
          :label="$t('common.labels.contact_us')"
          :ui="{leadingIcon: 'text-primary'}"
          class="hidden md:flex"
          color="neutral"
          icon="mdi:phone"
          variant="ghost"/>
    </div>
    <div class="header-end" transition="test">
      <div v-if="isIndexRoute">
        <UButton v-if="userStore" :label="$t('common.labels.dashboard')" :to="localePath({name: 'dashboard'})"  />
        <UButton v-else :label="$t('common.signin_or_signup')" @click="open('signin')"  />
      </div>
      <SelectLanguage v-model="showOverlay"/>

      <ButtonTheme toggle/>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import Logo from "~/components/Logo.vue";
import type {User} from "~/types/auth";

const localePath = useLocalePath()
const route = useRoute()
const isIndexRoute = computed(() => route.name?.toString().includes('index'))
const showOverlay = ref(false)
const userStore = useState<User>('user')
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