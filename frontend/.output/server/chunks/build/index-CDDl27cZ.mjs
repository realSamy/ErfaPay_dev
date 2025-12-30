import { b as useI18n, e as __nuxt_component_4$1, _ as _sfc_main$l, p as useLocalePath, y as useAuthApi, z as useToast } from './server.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useApi } from './useApi-_4dZBB2A.mjs';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import 'unhead/server';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import '@iconify/utils';
import 'consola';
import '@vueuse/core';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const useGlobalSettings = () => {
  const settings = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const fetchSettings = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useApi("/api/global-settings/");
      if (data.value?.ok) {
        settings.value = data.value.data;
        return data.value.data;
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  return { settings, loading, error, fetchSettings };
};
const useUpdateGlobalSettings = () => {
  const loading = ref(false);
  const error = ref(null);
  const updatedSettings = ref(null);
  const { t } = useI18n();
  const updateSettings = async (payload) => {
    loading.value = true;
    error.value = null;
    try {
      const fd = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        fd.append(key, value instanceof File ? value : String(value));
      });
      const { data } = await useAuthApi("/api/global-settings/", {
        method: "PATCH",
        body: fd
      });
      if (data.value?.ok) {
        updatedSettings.value = data.value.data;
        useToast().add({
          description: t("common.messages.global_settings_applied"),
          color: "success"
        });
        return data.value;
      } else {
        error.value = data.value?.errors || "Update failed";
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return { loading, error, updatedSettings, updateSettings };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const { settings, fetchSettings } = useGlobalSettings();
    [__temp, __restore] = withAsyncContext(() => fetchSettings()), await __temp, __restore();
    useUpdateGlobalSettings();
    ref({
      ...settings.value,
      is_available_now: void 0
    });
    ref([
      { label: t("common.states.enabled"), value: true },
      { label: t("common.states.disabled"), value: false }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_4$1;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}>`);
      if (unref(settings)) {
        _push(`<section class="page-section"><h2 class="font-bold text-2xl">تنظیم ساعات قبول سفارشات</h2>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`<span class="text-sm text-muted">با توجه به تنظیمات، ثبت سفارش در حال حاضر ${ssrInterpolate(unref(settings).is_available_now ? "فعال" : "غیرفعال")} میباشد.</span></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="page-section"><div class="flex justify-between pe-6 py-2"><h2 class="font-bold text-2xl">لیست خدمات</h2>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: _ctx.$t("pages.admin.labels.services.button_new_service"),
        to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()({ name: "admin-services-new" }),
        size: "xl",
        "trailing-icon": "material-symbols:add"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section><section class="page-section"><h2 class="font-bold text-2xl">لیست سفارشات</h2>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/services/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CDDl27cZ.mjs.map
