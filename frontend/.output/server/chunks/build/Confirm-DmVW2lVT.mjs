import { H as _sfc_main$e, _ as _sfc_main$l } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "Confirm",
  __ssrInlineRender: true,
  props: {
    title: { default: "تایید عملیات" },
    message: { default: "آیا مطمئن هستید؟" },
    cancelLabel: { default: "انصراف" },
    cancelIcon: {},
    cancelColor: { default: "neutral" },
    confirmLabel: { default: "تایید" },
    confirmIcon: {},
    confirmColor: { default: "primary" },
    onConfirm: {},
    onCancel: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        close: { onClick: props.onCancel },
        description: " "
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-bold"${_scopeId}>${ssrInterpolate(__props.title)}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(__props.title), 1)
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center leading-relaxed"${_scopeId}>${ssrInterpolate(__props.message)}</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center leading-relaxed" }, toDisplayString(__props.message), 1)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: __props.cancelColor,
              label: __props.cancelLabel,
              "trailing-icon": props.cancelIcon,
              variant: "outline",
              onClick: ($event) => props.onCancel?.()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: __props.confirmColor,
              label: __props.confirmLabel,
              "trailing-icon": props.confirmIcon,
              onClick: ($event) => props.onConfirm?.()
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center gap-4" }, [
                createVNode(_component_UButton, {
                  color: __props.cancelColor,
                  label: __props.cancelLabel,
                  "trailing-icon": props.cancelIcon,
                  variant: "outline",
                  onClick: ($event) => props.onCancel?.()
                }, null, 8, ["color", "label", "trailing-icon", "onClick"]),
                createVNode(_component_UButton, {
                  color: __props.confirmColor,
                  label: __props.confirmLabel,
                  "trailing-icon": props.confirmIcon,
                  onClick: ($event) => props.onConfirm?.()
                }, null, 8, ["color", "label", "trailing-icon", "onClick"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/Confirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Confirm = Object.assign(_sfc_main, { __name: "ModalConfirm" });

export { Confirm as default };
//# sourceMappingURL=Confirm-DmVW2lVT.mjs.map
