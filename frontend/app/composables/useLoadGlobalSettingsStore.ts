import type {GlobalSettings} from "~/types/settings";

export const useLoadGlobalSettingsStore = async () => {
  const store = useState<GlobalSettings|undefined>('global.settings', () => ({} as GlobalSettings))
  if (!store.value || Object.keys(store.value).length === 0) {
    const {fetchSettings} = useGlobalSettings()
    store.value = await fetchSettings()
  }

  return store
}