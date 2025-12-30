import { H as _sfc_main$e, r as _sfc_main$d, G as _sfc_main$7, I as _sfc_main$5, s as _sfc_main$c, _ as _sfc_main$l } from './server.mjs';
import { _ as _sfc_main$1 } from './Form-DbM-gQaT.mjs';
import { _ as _sfc_main$2 } from './InputNumber-LtvFKiY6.mjs';
import { _ as _sfc_main$3 } from './Textarea-C6RFyJZc.mjs';
import { defineComponent, reactive, watch, useTemplateRef, mergeProps, withCtx, createBlock, openBlock, createVNode, Fragment, renderList, createCommentVNode, withModifiers, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "Prompt",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    fields: {},
    title: { default: "modals.prompts.defaults.title" },
    message: { default: " " },
    cancelLabel: { default: "modals.prompts.defaults.cancel" },
    cancelIcon: {},
    cancelColor: { default: "neutral" },
    confirmLabel: { default: "modals.prompts.defaults.confirm" },
    confirmIcon: {},
    confirmColor: { default: "primary" },
    onConfirm: {},
    onCancel: {}
  },
  setup(__props) {
    const props = __props;
    const state = reactive({ ...props.modelValue });
    watch(
      () => props.modelValue,
      (val) => Object.assign(state, val),
      { deep: true }
    );
    const detectType = (value) => {
      if (typeof value === "number") return "number";
      if (typeof value === "boolean") return "boolean";
      return "text";
    };
    const form = useTemplateRef("form");
    const submit = () => props.onConfirm?.({ ...state });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UForm = _sfc_main$1;
      const _component_UFormField = _sfc_main$d;
      const _component_USelectMenu = _sfc_main$7;
      const _component_UCheckbox = _sfc_main$5;
      const _component_UInputNumber = _sfc_main$2;
      const _component_UTextarea = _sfc_main$3;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        "aria-description": __props.message,
        close: { onClick: props.onCancel },
        description: __props.message
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t(props.title))}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t(props.title)), 1)
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              ref_key: "form",
              ref: form,
              class: "space-y-4 p-4",
              onSubmit: submit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(state, (value, key) => {
                    _push3(`<!--[-->`);
                    if (props.fields?.[key]) {
                      _push3(ssrRenderComponent(_component_UFormField, {
                        label: props.fields[key].label || key.toString()
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (props.fields?.[key]?.type === "select") {
                              _push4(ssrRenderComponent(_component_USelectMenu, {
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                items: props.fields[key].options,
                                placeholder: props.fields[key].label || key.toString(),
                                class: "w-full",
                                "value-key": "value",
                                "label-key": "label",
                                required: ""
                              }, null, _parent4, _scopeId3));
                            } else if (detectType(value) === "boolean") {
                              _push4(ssrRenderComponent(_component_UCheckbox, {
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                label: props.fields?.[key]?.label || key.toString()
                              }, null, _parent4, _scopeId3));
                            } else if (detectType(value) === "number") {
                              _push4(ssrRenderComponent(_component_UInputNumber, {
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, _parent4, _scopeId3));
                            } else if (props.fields?.[key]?.type === "textarea") {
                              _push4(ssrRenderComponent(_component_UTextarea, {
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(_component_UInput, {
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, _parent4, _scopeId3));
                            }
                          } else {
                            return [
                              props.fields?.[key]?.type === "select" ? (openBlock(), createBlock(_component_USelectMenu, {
                                key: 0,
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                items: props.fields[key].options,
                                placeholder: props.fields[key].label || key.toString(),
                                class: "w-full",
                                "value-key": "value",
                                "label-key": "label",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "placeholder"])) : detectType(value) === "boolean" ? (openBlock(), createBlock(_component_UCheckbox, {
                                key: 1,
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                label: props.fields?.[key]?.label || key.toString()
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : detectType(value) === "number" ? (openBlock(), createBlock(_component_UInputNumber, {
                                key: 2,
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : props.fields?.[key]?.type === "textarea" ? (openBlock(), createBlock(_component_UTextarea, {
                                key: 3,
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock(_component_UInput, {
                                key: 4,
                                modelValue: state[key],
                                "onUpdate:modelValue": ($event) => state[key] = $event,
                                placeholder: props.fields?.[key]?.label || key.toString(),
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]--><div class="flex justify-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: props.cancelColor,
                    label: _ctx.$t(props.cancelLabel),
                    "trailing-icon": props.cancelIcon,
                    variant: "outline",
                    onClick: ($event) => props.onCancel?.()
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: props.confirmColor,
                    label: _ctx.$t(props.confirmLabel),
                    "trailing-icon": props.confirmIcon,
                    type: "submit"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(state, (value, key) => {
                      return openBlock(), createBlock(Fragment, { key }, [
                        props.fields?.[key] ? (openBlock(), createBlock(_component_UFormField, {
                          key: 0,
                          label: props.fields[key].label || key.toString()
                        }, {
                          default: withCtx(() => [
                            props.fields?.[key]?.type === "select" ? (openBlock(), createBlock(_component_USelectMenu, {
                              key: 0,
                              modelValue: state[key],
                              "onUpdate:modelValue": ($event) => state[key] = $event,
                              items: props.fields[key].options,
                              placeholder: props.fields[key].label || key.toString(),
                              class: "w-full",
                              "value-key": "value",
                              "label-key": "label",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "placeholder"])) : detectType(value) === "boolean" ? (openBlock(), createBlock(_component_UCheckbox, {
                              key: 1,
                              modelValue: state[key],
                              "onUpdate:modelValue": ($event) => state[key] = $event,
                              label: props.fields?.[key]?.label || key.toString()
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : detectType(value) === "number" ? (openBlock(), createBlock(_component_UInputNumber, {
                              key: 2,
                              modelValue: state[key],
                              "onUpdate:modelValue": ($event) => state[key] = $event,
                              placeholder: props.fields?.[key]?.label || key.toString(),
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : props.fields?.[key]?.type === "textarea" ? (openBlock(), createBlock(_component_UTextarea, {
                              key: 3,
                              modelValue: state[key],
                              "onUpdate:modelValue": ($event) => state[key] = $event,
                              placeholder: props.fields?.[key]?.label || key.toString(),
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock(_component_UInput, {
                              key: 4,
                              modelValue: state[key],
                              "onUpdate:modelValue": ($event) => state[key] = $event,
                              placeholder: props.fields?.[key]?.label || key.toString(),
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]))
                          ]),
                          _: 2
                        }, 1032, ["label"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128)),
                    createVNode("div", { class: "flex justify-center gap-4" }, [
                      createVNode(_component_UButton, {
                        color: props.cancelColor,
                        label: _ctx.$t(props.cancelLabel),
                        "trailing-icon": props.cancelIcon,
                        variant: "outline",
                        onClick: ($event) => props.onCancel?.()
                      }, null, 8, ["color", "label", "trailing-icon", "onClick"]),
                      createVNode(_component_UButton, {
                        color: props.confirmColor,
                        label: _ctx.$t(props.confirmLabel),
                        "trailing-icon": props.confirmIcon,
                        type: "submit"
                      }, null, 8, ["color", "label", "trailing-icon"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                ref_key: "form",
                ref: form,
                class: "space-y-4 p-4",
                onSubmit: withModifiers(submit, ["prevent"])
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(state, (value, key) => {
                    return openBlock(), createBlock(Fragment, { key }, [
                      props.fields?.[key] ? (openBlock(), createBlock(_component_UFormField, {
                        key: 0,
                        label: props.fields[key].label || key.toString()
                      }, {
                        default: withCtx(() => [
                          props.fields?.[key]?.type === "select" ? (openBlock(), createBlock(_component_USelectMenu, {
                            key: 0,
                            modelValue: state[key],
                            "onUpdate:modelValue": ($event) => state[key] = $event,
                            items: props.fields[key].options,
                            placeholder: props.fields[key].label || key.toString(),
                            class: "w-full",
                            "value-key": "value",
                            "label-key": "label",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "placeholder"])) : detectType(value) === "boolean" ? (openBlock(), createBlock(_component_UCheckbox, {
                            key: 1,
                            modelValue: state[key],
                            "onUpdate:modelValue": ($event) => state[key] = $event,
                            label: props.fields?.[key]?.label || key.toString()
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : detectType(value) === "number" ? (openBlock(), createBlock(_component_UInputNumber, {
                            key: 2,
                            modelValue: state[key],
                            "onUpdate:modelValue": ($event) => state[key] = $event,
                            placeholder: props.fields?.[key]?.label || key.toString(),
                            class: "w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : props.fields?.[key]?.type === "textarea" ? (openBlock(), createBlock(_component_UTextarea, {
                            key: 3,
                            modelValue: state[key],
                            "onUpdate:modelValue": ($event) => state[key] = $event,
                            placeholder: props.fields?.[key]?.label || key.toString(),
                            class: "w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock(_component_UInput, {
                            key: 4,
                            modelValue: state[key],
                            "onUpdate:modelValue": ($event) => state[key] = $event,
                            placeholder: props.fields?.[key]?.label || key.toString(),
                            class: "w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]))
                        ]),
                        _: 2
                      }, 1032, ["label"])) : createCommentVNode("", true)
                    ], 64);
                  }), 128)),
                  createVNode("div", { class: "flex justify-center gap-4" }, [
                    createVNode(_component_UButton, {
                      color: props.cancelColor,
                      label: _ctx.$t(props.cancelLabel),
                      "trailing-icon": props.cancelIcon,
                      variant: "outline",
                      onClick: ($event) => props.onCancel?.()
                    }, null, 8, ["color", "label", "trailing-icon", "onClick"]),
                    createVNode(_component_UButton, {
                      color: props.confirmColor,
                      label: _ctx.$t(props.confirmLabel),
                      "trailing-icon": props.confirmIcon,
                      type: "submit"
                    }, null, 8, ["color", "label", "trailing-icon"])
                  ])
                ]),
                _: 2
              }, 1536)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/Prompt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Prompt = Object.assign(_sfc_main, { __name: "ModalPrompt" });

export { Prompt as default };
//# sourceMappingURL=Prompt-4pYmaK3y.mjs.map
