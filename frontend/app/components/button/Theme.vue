<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
        v-if="toggle"
        :loading="isTransitioning"
        :icon="isDark ? 'mdi:moon-and-stars' : 'mdi:weather-sunny'"
        @click="handleRipple"
        variant="link"
        color="neutral"
    />
    <USwitch
        v-else
        v-model="isDarkReadOnly"
        :default-value="isDark"
        :disabled="isTransitioning"
        :loading="isTransitioning"
        checked-icon="mdi:moon-and-stars"
        dir="rtl"
        size="xl"
        unchecked-icon="mdi:weather-sunny"
        @click="handleRipple"
    />

    <template #fallback>
      <div class="size-8"/>
    </template>
  </ClientOnly>

  <Transition :name="isEnteringDarkMode ? 'ripple-expand' : 'ripple-collapse'" @after-leave="onRippleTransitionEnd">
    <div
        v-if="showRipple"
        :style="{
        left: `${ripplePosition.x}px`,
        top: `${ripplePosition.y}px`,
        width: `${ripplePosition.size}px`,
        height: `${ripplePosition.size}px`,
        backgroundColor: 'var(--ui-bg-dark)',
      }"
        class="ripple-effect"
    ></div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps({
  toggle: {type: Boolean, default: false},
  modelValue: {type: Boolean, default: false},
})
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});
const isDarkReadOnly = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
  },
});


const ripplePosition = ref({x: 0, y: 0, size: 0});
const showRipple = ref(false);
const isTransitioning = ref(false);
const isEnteringDarkMode = ref(false);

const emit = defineEmits<{
  (event: 'update:modelValue', isTransitioning: boolean): void
}>()

const handleRipple = (event: MouseEvent) => {
  if (isTransitioning.value) return;
  isEnteringDarkMode.value = !isDark.value;

  showRipple.value = true;
  isTransitioning.value = true;
  emit('update:modelValue', true);

  const diameter = Math.max(window.innerWidth, window.innerHeight);
  const radius = diameter / 2;

  ripplePosition.value = {
    x: event.clientX - radius,
    y: event.clientY - radius,
    size: diameter,
  };

  if (!isEnteringDarkMode.value) {
    isDark.value = !isDark.value;
    document.documentElement.style.setProperty('--ui-bg', 'var(--ui-bg-light)')
  } else {
    setTimeout(() => {
      isDark.value = !isDark.value;
      document.documentElement.style.setProperty('--ui-bg', 'var(--ui-bg-dark)')
    }, 300)
  }

  setTimeout(() => {
    showRipple.value = false;
  }, 350);
};

const onRippleTransitionEnd = () => {
  if (!showRipple.value) {
    isTransitioning.value = false;
    emit('update:modelValue', false);
  }
};

const onBackgroundTransitionEnd = () => {
  document.body.style.transition = '';
};

onMounted(() => {
  document.body.addEventListener('transitionend', onBackgroundTransitionEnd);
  document.documentElement.style.setProperty('--ui-bg', isDark.value ? 'var(--ui-bg-dark)' : 'var(--ui-bg-light)');
});

onUnmounted(() => {
  document.body.removeEventListener('transitionend', onBackgroundTransitionEnd);
});

</script>
<!--suppress CssUnusedSymbol -->
<style scoped>
:root {
  --ripple-scale: 1.5;
}

.ripple-effect {
  position: fixed;
  border-radius: 50%;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.ripple-expand-enter-active,
.ripple-expand-leave-active {
  transition: transform 0.35s ease-in;
}

.ripple-expand-enter-from {
  transform: scale(0);
  opacity: 1;
}

.ripple-expand-enter-to {
  transform: scale(var(--ripple-scale, 4));
  opacity: 1;
}

.ripple-expand-leave-from,
.ripple-expand-leave-to {
  transform: scale(var(--ripple-scale, 4));
  opacity: 1;
}

.ripple-collapse-enter-active,
.ripple-collapse-leave-active {
  transition: transform 0.35s ease-out;
}

.ripple-collapse-enter-from {
  transform: scale(var(--ripple-scale, 4));
  opacity: 1;
}

.ripple-collapse-enter-to {
  transform: scale(0);
  opacity: 1;
}

.ripple-collapse-leave-from,
.ripple-collapse-leave-to {
  transform: scale(0);
  opacity: 1;
}

</style>