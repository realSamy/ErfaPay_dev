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
        base: 'cursor-pointer',
      },
      variants: {
        color: {
          primary: 'dark:text-white'
        }
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
