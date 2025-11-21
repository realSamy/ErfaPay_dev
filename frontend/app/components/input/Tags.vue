<template>
  <div class="flex flex-wrap gap-2 items-center">
    <UBadge
        v-for="(tag, index) in tags"
        :key="index"
        class=""
        size="xl"
        variant="subtle"
    >
      <div class="space-y-1 flex flex-col">
        <UFieldGroup>
          <UBadge class="w-10 justify-center capitalize select-none">Fa</UBadge>
          <UBadge :label="tag.titleFa" variant="outline" class="w-full"/>
        </UFieldGroup>
        <UFieldGroup>
          <UBadge class="w-10 justify-center capitalize select-none">en</UBadge>
          <UBadge :label="tag.titleEn" variant="outline" class="w-full"/>
        </UFieldGroup>
      </div>
      <UButton
          class="h-4 w-4 p-0 ml-1 text-red-900"
          icon="material-symbols:close-rounded"
          size="xs"
          variant="ghost"
          @click="removeTag(index)"
      />
    </UBadge>

    <UButton
        v-if="!isAdding"
        color="primary"
        icon="material-symbols:add"
        size="md"
        @click="isAdding = true"
    />

    <template v-else>
      <UForm class="flex flex-col sm:flex-row gap-2 p-2 rounded-md ring ring-accented bg-accented"
             @submit.prevent="addTag">
        <UInput
            v-model="newTagFa"
            dir="rtl"
            placeholder="عنوان فارسی"
            required
        />
        <UInput
            v-model="newTagEn"
            placeholder="English title"
            required
        />
        <div class="flex gap-1">
          <UButton
              color="primary"
              icon="material-symbols:add"
              size="md"
              type="submit"
          />
          <UButton
              color="neutral"
              icon="material-symbols:close-rounded"
              size="md"
              variant="ghost"
              @click="cancelAdd"
          />
        </div>
      </UForm>
    </template>
  </div>
</template>

<script lang="ts" setup>
interface DocumentTag {
  titleEn: string
  titleFa: string
}

interface Props {
  modelValue?: DocumentTag[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: DocumentTag[]): void
}>()

const tags = computed({
  get: () => props.modelValue || [],
  set: (val: DocumentTag[]) => emit('update:modelValue', val)
})

const isAdding = ref(false)
const newTagEn = ref('')
const newTagFa = ref('')

const addTag = () => {
  if (newTagEn.value.trim() && newTagFa.value.trim()) {
    tags.value = [...tags.value, {
      titleEn: newTagEn.value.trim(),
      titleFa: newTagFa.value.trim()
    }]
    newTagEn.value = ''
    newTagFa.value = ''
  }
  isAdding.value = false
}

const removeTag = (index: number) => {
  tags.value = tags.value.filter((_, i) => i !== index)
}

const cancelAdd = () => {
  newTagEn.value = ''
  newTagFa.value = ''
  isAdding.value = false
}
</script>