import type {HeaderContext} from "@tanstack/vue-table";
import {h} from "vue";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";
import {UButton, UDropdownMenu} from '#components'
import {filterFns, sortingFns} from '@tanstack/vue-table'


export function sortableLabel<TData = unknown>(label: string) {
  return ({column}: HeaderContext<TData, unknown>) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: label,
      icon: isSorted
          ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  }
}

export function filterableLabel<TData = unknown>(label: string, items: Ref<string[] | {
  value: string,
  label: string
}[]>, vModel: Ref<string[]>, sortable = true) {
  const toggleItem = (item: string, checked: boolean) => {
    if (checked) {
      if (!vModel.value.includes(item)) {
        vModel.value = [...vModel.value, item]
      }
    } else {
      vModel.value = vModel.value.filter(val => val !== item)
    }
  }

  return (_hc: HeaderContext<TData, unknown>) => {
    let _label: string | VNode;
    if (sortable) {
      _label = sortableLabel<TData>(label)(_hc)
    } else {
      _label = label;
    }

    const dropdownItems = computed<DropdownMenuItem[]>(() => [
      // {
      //   label: 'فیلتر انواع',
      //   icon: 'i-lucide-funnel',
      //   type: 'label' as const
      // },
      {
        type: 'separator' as const
      },
      ...items.value.map(item => ({
        label: typeof item === 'string' ? item : item.label,
        type: 'checkbox' as const,
        checked: vModel.value.includes(typeof item === 'string' ? item : item.value),
        onUpdateChecked(checked: boolean) {
          toggleItem(typeof item === 'string' ? item : item.value, checked)
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      })),
      {
        type: 'separator' as const
      },
      {
        label: 'پاک کردن همه',
        icon: 'i-lucide-x-circle',
        type: 'checkbox' as const,
        onUpdateChecked() {
          vModel.value = []
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      }
    ])

    const dropdown = h(UDropdownMenu, {
          items: dropdownItems.value,
          content: {align: 'start'},
          ui: {content: 'w-48'}
        }, () => h(UButton, {
          variant: 'ghost',
          color: 'neutral',
          size: 'sm',
          icon: 'material-symbols:filter-alt-outline',
        })
    )

    return h('div', {class: 'flex gap-2'}, [_label, dropdown])
  }
}