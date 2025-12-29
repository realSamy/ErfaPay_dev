export const useBreadcrumbStore = () => {
  return useState<Record<string, unknown>>('breadcrumb.state', () => ({}))
}