import { u as useLoadServicesStore, _ as __nuxt_component_0 } from './Service-D7mTs20Z.mjs';
import { e as __nuxt_component_4$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './useServices-BjUETh0c.mjs';
import './useApi-_4dZBB2A.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { services } = ([__temp, __restore] = withAsyncContext(() => useLoadServicesStore()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CardService = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-20" }, _attrs))}><section><h1 class="font-bold text-3xl">تمامی سفارشات شما در یکجا</h1><p>با امکان پیگیری، مشاهده وضعیت و دسترسی سریع به جزئیات</p></section><section class="space-y-8"><h2 class="font-bold text-2xl">ثبت سفارش جدید:</h2><div class="flex flex-wrap justify-center gap-12"><!--[-->`);
      ssrRenderList(unref(services), (service) => {
        _push(ssrRenderComponent(_component_CardService, { item: service }, null, _parent));
      });
      _push(`<!--]--></div></section><section class="space-y-8"><h2 class="font-bold text-2xl">سفارشات پیشین:</h2>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DGgchJsi.mjs.map
