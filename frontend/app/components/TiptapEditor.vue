<!-- components/TiptapEditor.vue -->
<template>
  <div class="tiptap-wrapper">
    <!-- Toolbar -->
    <div v-if="editor"
         class="toolbar border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
      <div class="flex flex-wrap items-center gap-1 p-3">

        <!-- Text Style -->
        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('bold') }"
            :disabled="!editor.can().toggleBold()"
            color="neutral"
            icon="material-symbols:format-bold-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleBold().run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('italic') }"
            color="neutral"
            icon="material-symbols:format-italic-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleItalic().run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('strike') }"
            color="neutral"
            icon="material-symbols:format-strikethrough-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleStrike().run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('code') }"
            color="neutral"
            icon="material-symbols:code-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleCode().run()"
        />

        <USeparator class="h-6 mx-1" orientation="vertical"/>

        <!-- Headings -->
        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('heading', { level: 1 }) }"
            color="neutral"
            icon="material-symbols:format-h1-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('heading', { level: 2 }) }"
            color="neutral"
            icon="material-symbols:format-h2-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('heading', { level: 3 }) }"
            color="neutral"
            icon="material-symbols:format-h3-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />

        <USeparator class="h-6 mx-1" orientation="vertical"/>

        <!-- Lists -->
        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('bulletList') }"
            color="neutral"
            icon="material-symbols:format-list-bulleted-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleBulletList().run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('orderedList') }"
            color="neutral"
            icon="material-symbols:format-list-numbered-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleOrderedList().run()"
        />

        <USeparator class="h-6 mx-1" orientation="vertical"/>

        <!-- Blocks -->
        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('blockquote') }"
            color="neutral"
            icon="material-symbols:format-quote-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleBlockquote().run()"
        />

        <UButton
            :class="{ 'bg-primary/10 text-primary': editor.isActive('codeBlock') }"
            color="neutral"
            icon="material-symbols:code-blocks-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().toggleCodeBlock().run()"
        />

        <UButton
            color="neutral"
            icon="material-symbols:horizontal-rule-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().setHorizontalRule().run()"
        />

        <USeparator class="h-6 mx-1" orientation="vertical"/>

        <!-- History -->
        <div class="flex flex-wrap items-center gap-1" dir="ltr">
          <UButton
            :disabled="!editor.can().undo()"
            color="neutral"
            icon="material-symbols:undo-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().undo().run()"
        />

        <UButton
            :disabled="!editor.can().redo()"
            color="neutral"
            icon="material-symbols:redo-rounded"
            size="xs"
            square
            variant="ghost"
            @click="editor.chain().focus().redo().run()"
        />
        </div>

        <USeparator class="h-6 mx-1" orientation="vertical"/>

        <!-- Clear Formatting -->
        <UButton
            color="neutral"
            icon="material-symbols:format-clear-rounded"
            size="xs"
            square
            title="پاک کردن فرمت"
            variant="ghost"
            @click="editor.chain().focus().unsetAllMarks().run()"
        />
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content">
      <TiptapEditorContent
          :editor="editor"
          class="min-h-64 p-4 prose prose-lg dark:prose-invert max-w-none focus:outline-none"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useEditor, EditorContent as TiptapEditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue || 'پیام خود را وارد کنید...',
  extensions: [
    StarterKit.configure({
      heading: {levels: [1, 2, 3]},
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-lg focus:outline-none min-h-64',
      'data-placeholder': props.placeholder || 'شروع به تایپ کنید...',
    },
  },
  onUpdate: ({editor}) => {
    emit('update:modelValue', editor.getHTML())
  },
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
@reference "@/assets/css/main.css";

.tiptap-wrapper {
  @apply border border-gray-300 dark:border-gray-700 rounded-lg overflow-y-auto h-90 max-h-90 bg-white dark:bg-gray-900 shadow-sm;
}

.toolbar {
  @apply backdrop-blur-sm bg-white/80 dark:bg-gray-900/80;
}

.editor-content :deep(p.is-editor-empty:first-child)::before {
  @apply text-gray-400 pointer-events-none float-right content-[attr(data-placeholder)];
  content: attr(data-placeholder);
  height: 0;
}

.editor-content :deep(.ProseMirror) {
  min-height: 16rem;
}
</style>

<style scoped>
@reference "@/assets/css/main.css";

/* Main editor container */
:deep(.ProseMirror) {
  @apply min-h-64 p-4 focus:outline-none;
  direction: rtl;
  text-align: right;
}

/* Placeholder when empty */
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  @apply text-gray-400 dark:text-gray-500 pointer-events-none float-right;
  content: attr(data-placeholder);
  height: 0;
}

/* Paragraphs */
:deep(.ProseMirror p) {
  @apply mb-4 leading-relaxed;
}

/* Headings */
:deep(.ProseMirror h1) {
  @apply text-3xl font-bold mt-8 mb-4 leading-tight;
}

:deep(.ProseMirror h2) {
  @apply text-2xl font-bold mt-7 mb-3 leading-tight;
}

:deep(.ProseMirror h3) {
  @apply text-xl font-bold mt-6 mb-3 leading-tight;
}

:deep(.ProseMirror h4) {
  @apply text-lg font-bold mt-5 mb-2;
}

:deep(.ProseMirror h5) {
  @apply text-base font-bold mt-4 mb-2;
}

:deep(.ProseMirror h6) {
  @apply text-base font-semibold mt-4 mb-2;
}

/* Lists */
:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  @apply my-4 pr-6 space-y-2;
}

:deep(.ProseMirror ul > li) {
  @apply list-disc list-inside;
}

:deep(.ProseMirror ol > li) {
  @apply list-decimal list-inside;
}

:deep(.ProseMirror li > p) {
  @apply inline;
}

/* Blockquote */
:deep(.ProseMirror blockquote) {
  @apply border-r-4 border-primary pr-4 py-2 my-4 italic text-gray-700 dark:text-gray-300;
}

:deep(.ProseMirror code) {
  @apply bg-gray-100 dark:bg-gray-800 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono;
}

:deep(.ProseMirror pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm leading-relaxed;
}

:deep(.ProseMirror pre code) {
  @apply bg-transparent text-inherit p-0 rounded-none;
}

:deep(.ProseMirror hr) {
  @apply border-t-2 border-gray-300 dark:border-gray-700 my-8;
}

:deep(.ProseMirror strong) {
  @apply font-bold;
}

:deep(.ProseMirror em) {
  @apply italic;
}

:deep(.ProseMirror strike) {
  @apply line-through;
}

:deep(.ProseMirror ::selection) {
  @apply bg-primary/20;
}
</style>