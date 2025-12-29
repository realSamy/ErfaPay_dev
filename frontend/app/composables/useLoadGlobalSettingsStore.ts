import type {GlobalSettings} from "~/types/settings";

export const useLoadGlobalSettingsStore = async () => {
  const store = useState<GlobalSettings>('global.settings', () => ({} as GlobalSettings))

  if (!store.value) {
    const {fetchSettings} = useGlobalSettings()
    store.value = await fetchSettings()
  }

  return store
}