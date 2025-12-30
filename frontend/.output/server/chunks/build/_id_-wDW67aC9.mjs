import { a as useAdminServiceDetail, _ as __nuxt_component_0, b as useAdminUpdateService } from './useAdminServices-9nc0vayL.mjs';
import { defineComponent, ref, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { F as useRoute, z as useToast, D as navigateTo, p as useLocalePath } from './server.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const serviceId = route.params.id;
    const pending = ref(false);
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useAdminServiceDetail(serviceId)), __temp = await __temp, __restore(), __temp);
    const service = ref(null);
    const servicePayload = ref({});
    if (response.value?.ok) {
      service.value = response.value.data;
      servicePayload.value = {
        ...service.value,
        commission_fixed: Number(service.value.commission_fixed),
        commission_percent: Number(service.value.commission_percent),
        min_amount: Number(service.value.min_amount),
        max_amount: Number(service.value.max_amount),
        tax_rate: Number(service.value.tax_rate),
        banner: void 0,
        required_fields: service.value.required_fields || []
      };
    }
    const { update } = useAdminUpdateService(serviceId);
    const submit = async (payload) => {
      pending.value = true;
      const { data, error } = await update(payload);
      if (data.value) {
        useToast().add({ title: "تغییرات سرویس با موفقیت ثبت شد", color: "success" });
        await navigateTo(useLocalePath()("admin-services"));
      } else {
        useToast().add({
          title: "خطا در ثبت تغییرات سرویس",
          description: error.value?.data?.errors?.[0] || "خطای ناشناخته",
          color: "error"
        });
      }
      pending.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormAdminService = __nuxt_component_0;
      if (unref(service)) {
        _push(ssrRenderComponent(_component_FormAdminService, mergeProps({
          payload: unref(servicePayload),
          "existing-service": unref(service),
          pending: unref(pending),
          "is-edit": true,
          onSubmit: submit
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/services/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-wDW67aC9.mjs.map
