<template>
  <UCard class="w-full divide-y-0">
    <template #header>
      {{ header }}
    </template>
    <template #default>
      <div class="flex w-full justify-between">
        <span class="font-medium text-5xl">{{ $n(body) }}</span>
        <UPopover v-if="stats" mode="hover">
          <UBadge
              :color="stats.month < 0 ? 'error' : 'success'"
              :label="$n(stats.month)+'%'"
              :trailing-icon="stats.month < 0 ? 'material-symbols:arrow-downward' : 'material-symbols:arrow-upward'"
              class="self-end"
              size="sm"
              title="در مقایسه با ماه قبل"
              variant="subtle"/>

          <template #content>
            <div class="flex flex-row gap-1 p-2">
              <div class="flex flex-col gap-2">
                <span class="text-sm text-muted text-center">روز</span>
                <UBadge
                    :color="stats.day < 0 ? 'error' : 'success'"
                    :label="$n(stats.day)+'%'"
                    :trailing-icon="stats.day < 0 ? 'material-symbols:arrow-downward' : 'material-symbols:arrow-upward'"
                    class="self-end"
                    size="sm"
                    title="در مقایسه با دیروز"
                    variant="subtle"/>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-sm text-muted text-center">هفته</span>
                <UBadge
                    :color="stats.week < 0 ? 'error' : 'success'"
                    :label="$n(stats.week)+'%'"
                    :trailing-icon="stats.week < 0 ? 'material-symbols:arrow-downward' : 'material-symbols:arrow-upward'"
                    class="self-end"
                    size="sm"
                    title="در مقایسه با هفته قبل"
                    variant="subtle"/>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-sm text-muted text-center">ماه</span>
                <UBadge
                    :color="stats.month < 0 ? 'error' : 'success'"
                    :label="$n(stats.month)+'%'"
                    :trailing-icon="stats.month < 0 ? 'material-symbols:arrow-downward' : 'material-symbols:arrow-upward'"
                    class="self-end"
                    size="sm"
                    title="در مقایسه با ماه قبل"
                    variant="subtle"/>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type {PeriodicStats} from "~/types/users";

interface Props {
  header: string
  body: number
  stats?: PeriodicStats
}

defineProps<Props>()
</script>