import { u as useAdminCreateService, _ as __nuxt_component_0 } from './useAdminServices-9nc0vayL.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { z as useToast, D as navigateTo, p as useLocalePath } from './server.mjs';
import './Form-DbM-gQaT.mjs';
import '@vueuse/core';
import './Textarea-C6RFyJZc.mjs';
import 'reka-ui';
import './Select-BkNBr6Bu.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
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
import './InputNumber-LtvFKiY6.mjs';
import './FieldGroup-bZqqUUeP.mjs';
import './FileUpload-DYR6EaNq.mjs';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const { create, pending } = useAdminCreateService();
    const servicePayload = ref({
      title_fa: "",
      title_en: "",
      description_fa: "",
      description_en: "",
      icon: "",
      banner: null,
      commission_type: "percent",
      commission_percent: 0.12,
      commission_fixed: 0,
      min_amount: 1e4,
      max_amount: 1e8,
      tax_rate: 0.05,
      user_pricing: true,
      is_active: true,
      required_fields: [],
      order: 0
    });
    const submit = async (payload) => {
      const { data, error } = await create(payload);
      if (data.value) {
        useToast().add({ title: "سرویس با موفقیت ایجاد شد", color: "success" });
        await navigateTo(useLocalePath()("admin-services"));
      } else {
        useToast().add({
          title: "خطا در ایجاد سرویس",
          description: error.value?.data?.errors?.[0] || "خطای ناشناخته",
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormAdminService = __nuxt_component_0;
      _push(ssrRenderComponent(_component_FormAdminService, mergeProps({
        payload: unref(servicePayload),
        pending: unref(pending),
        onSubmit: submit
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/services/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-Xs4uP6Qx.mjs.map
