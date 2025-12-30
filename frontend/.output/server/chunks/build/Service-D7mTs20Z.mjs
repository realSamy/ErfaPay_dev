import { j as useState, b as useI18n, g as _sfc_main$2, _ as _sfc_main$l, p as useLocalePath, d as __unimport_directionalIcon, h as _sfc_main$q } from './server.mjs';
import { u as useServices } from './useServices-BjUETh0c.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

async function useLoadServicesStore() {
  const services = useState("services.list", () => []);
  if (!services.value.length) {
    const { data: response } = await useServices();
    if (response.value?.ok) {
      services.value = response.value.data;
    }
  }
  return { services };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Service",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const { locale } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$q;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        ui: {
          body: "grow border-transparent",
          header: "border-transparent",
          root: "flex flex-col"
        },
        class: "w-full md:w-55 h-auto bg-primary text-white"
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h3 class="font-bold text-md"${_scopeId}>${ssrInterpolate(__props.item[`title_${unref(locale)}`])}</h3>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.item.icon,
              size: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h3", { class: "font-bold text-md" }, toDisplayString(__props.item[`title_${unref(locale)}`]), 1),
                createVNode(_component_UIcon, {
                  name: __props.item.icon,
                  size: "30"
                }, null, 8, ["name"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("services.labels.button_new_order"),
              "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
              class: "mt-3 bg-white text-black dark:text-black hover:bg-primary-800 hover:text-white",
              variant: "ghost",
              to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()({ name: "dashboard-orders-new-id", params: { id: __props.item.id } }),
              size: "xl"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full flex justify-center items-center" }, [
                createVNode(_component_UButton, {
                  label: _ctx.$t("services.labels.button_new_order"),
                  "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                  class: "mt-3 bg-white text-black dark:text-black hover:bg-primary-800 hover:text-white",
                  variant: "ghost",
                  to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()({ name: "dashboard-orders-new-id", params: { id: __props.item.id } }),
                  size: "xl"
                }, null, 8, ["label", "trailing-icon", "to"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>${ssrInterpolate(__props.item[`description_${unref(locale)}`])}</p>`);
          } else {
            return [
              createVNode("p", null, toDisplayString(__props.item[`description_${unref(locale)}`]), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/Service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "CardService" });

export { __nuxt_component_0 as _, useLoadServicesStore as u };
//# sourceMappingURL=Service-D7mTs20Z.mjs.map
