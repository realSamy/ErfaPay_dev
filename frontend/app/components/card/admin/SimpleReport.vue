<template>
  <UCard class="w-full divide-y-0">
    <template #header>
      {{ header }}
    </template>
    <template #default>
      <div class="flex w-full justify-between">
        <span class="font-medium text-5xl">{{ $n(body) }}</span>
        <UBadge
            v-if="badge"
            :color="dec ? 'error' : 'success'"
            :label="$n(badge)+'%'"
            :trailing-icon="dec ? 'material-symbols:arrow-downward' : 'material-symbols:arrow-upward'"
            class="self-end"
            size="sm"
            variant="subtle"/>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
interface Props {
  header: string
  body: number
  badge?: number
  dec?: boolean
}

withDefaults(defineProps<Props>(), {dec: false})
</script>