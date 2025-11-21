<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

/**
 * WheelPicker
 * - v-model: number (selected index)
 * - props.items: string[] (displayed values)
 * - label: optional label shown above
 */

interface Props {
  modelValue: number
  items: string[]
  label?: string
  ariaLabel?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()

const wheelRef = ref<HTMLElement | null>(null)
const itemHeight = 48 // px
const visibleCount = 3
const middleOffset = itemHeight * (visibleCount / 2) // e.g. 1.5 * 48 = 72

// create triple repetition for "infinite" feel
const repeated = computed(() => {
  const base = props.items || []
  return [...base, ...base, ...base]
})

const baseLength = computed(() => props.items?.length || 0)

// scroll to middle repetition according to current modelValue
const scrollToIndex = (index: number) => {
  if (!wheelRef.value || baseLength.value === 0) return
  // we scroll to the middle repetition
  const offsetIndex = index + baseLength.value // middle block
  wheelRef.value.scrollTop = offsetIndex * itemHeight - middleOffset
}

onMounted(() => {
  // ensure DOM ready
  nextTick(() => {
    scrollToIndex(props.modelValue || 0)
  })
})

// when parent updates modelValue, re-center wheel
watch(() => props.modelValue, (nv) => {
  nextTick(() => scrollToIndex(nv || 0))
})

// handle scroll, calculate nearest index in base array
let scrollTimeout: number | undefined
const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement
  if (!el || baseLength.value === 0) return

  // throttle final snapping using small timeout
  if (scrollTimeout) window.clearTimeout(scrollTimeout)
  scrollTimeout = window.setTimeout(() => {
    const scrollTop = el.scrollTop
    const rawIndex = Math.round(scrollTop / itemHeight)
    // map to base index
    const idx = ((rawIndex % baseLength.value) + baseLength.value) % baseLength.value
    // emit selected base-index
    emit('update:modelValue', idx)
    // snap to exact centered position in middle block for smoothness
    const snapIndex = idx + baseLength.value
    el.scrollTo({ top: snapIndex * itemHeight - middleOffset, behavior: 'smooth' })
  }, 80)
}
</script>

<template>
  <div class="flex flex-col items-center space-y-2">
    <div v-if="label" class="text-xs text-gray-500 uppercase tracking-wide">{{ label }}</div>

    <div
      ref="wheelRef"
      class="relative w-20 h-[144px] overflow-hidden rounded-lg bg-white shadow-inner scrollbar-hide"
      @scroll.passive="handleScroll"
      :aria-label="ariaLabel || label || 'wheel-picker'"
      role="listbox"
    >
      <ul class="h-full overflow-y-scroll snap-y snap-mandatory list-none m-0 p-0">
        <li
          v-for="(item, idx) in repeated"
          :key="idx"
          class="flex items-center justify-center h-[48px] text-lg font-medium text-gray-700 snap-center"
        >
          {{ item }}
        </li>
      </ul>

      <!-- center highlight -->
      <div
        class="absolute left-0 w-full h-[48px] pointer-events-none"
        style="top: calc(50% - 24px); border-top: 1px solid rgba(59,130,246,0.12); border-bottom: 1px solid rgba(59,130,246,0.12);"
      />
    </div>

    <!-- small label area (optional) -->
    <div class="text-xs text-gray-400"> </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
