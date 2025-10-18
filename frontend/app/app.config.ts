export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
      slots: {
        base: 'cursor-pointer dark:text-white',
        label: 'dark:text-white',
        leadingIcon: 'dark:text-white',
        trailingIcon: 'dark:text-white',
      }
    },
    switch: {
      slots: {
        base: 'cursor-pointer',
      }
    },
    dropdownMenu: {
      slots: {
        item: 'cursor-pointer',
      }
    }
  }
})
