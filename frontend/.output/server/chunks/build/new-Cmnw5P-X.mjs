import { b as useI18n, _ as _sfc_main$l, d as __unimport_directionalIcon, e as __nuxt_component_4$1 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCreateTicket } from './useTickets-CnXAgghv.mjs';
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
  __name: "new",
  __ssrInlineRender: true,
  async setup(__props) {
    const { t: $t } = useI18n();
    const categories = ref([]);
    computed(() => [
      { value: "low", label: $t("common.priorities.low") },
      { value: "medium", label: $t("common.priorities.medium") },
      { value: "high", label: $t("common.priorities.high") }
    ]);
    useCreateTicket();
    const { locale } = useI18n();
    computed(() => `title_${locale.value.toLowerCase()}`);
    const other_category = computed(() => categories.value.find((cat) => cat.slug === "other"));
    ref({
      subject: "",
      message: "",
      category: other_category.value?.id || void 0,
      attachments: void 0,
      priority: "low"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      const _component_ClientOnly = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10" }, _attrs))}><section><h2 class="font-bold text-2xl">${ssrInterpolate(unref($t)("pages.tickets.titles.new_ticket"))}</h2><p>${ssrInterpolate(unref($t)("pages.tickets.messages.notice_faq"))}</p>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: unref($t)("pages.tickets.labels.faq"),
        "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
        class: "mt-4",
        size: "xl"
      }, null, _parent));
      _push(`</section><section>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/support/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-Cmnw5P-X.mjs.map
