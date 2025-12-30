import { computed, useTemplateRef, toRef, unref, mergeProps, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui';
import { useVModel, reactivePick } from '@vueuse/core';
import { u as useLocale, a as useAppConfig, R as useFormField, S as useFieldGroup, t as tv, _ as _sfc_main$l } from './server.mjs';

const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "size": {
      "xs": "px-2 py-1 text-xs gap-1",
      "sm": "px-2.5 py-1.5 text-xs gap-1.5",
      "md": "px-2.5 py-1.5 text-sm gap-1.5",
      "lg": "px-3 py-2 text-sm gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
    },
    "highlight": {
      "true": ""
    },
    "increment": {
      "false": ""
    },
    "decrement": {
      "false": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "orientation": "horizontal",
      "decrement": false,
      "class": "text-start"
    },
    {
      "decrement": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "decrement": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "decrement": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "decrement": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "decrement": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "increment": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "increment": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "increment": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "increment": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "increment": true,
      "size": "xl",
      "class": "pe-11"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInputNumber",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    orientation: { type: String, required: false, default: "horizontal" },
    increment: { type: [Boolean, Object], required: false, default: true },
    incrementIcon: { type: null, required: false },
    incrementDisabled: { type: Boolean, required: false },
    decrement: { type: [Boolean, Object], required: false, default: true },
    decrementIcon: { type: null, required: false },
    decrementDisabled: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    modelValue: { type: [Number, null], required: false },
    defaultValue: { type: Number, required: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    step: { type: Number, required: false },
    stepSnapping: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    formatOptions: { type: null, required: false },
    disableWheelChange: { type: Boolean, required: false },
    invertWheelChange: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultValue", "min", "max", "step", "stepSnapping", "formatOptions", "disableWheelChange", "invertWheelChange", "readonly"), emits);
    const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.inputNumber || {} })({
      color: color.value,
      variant: props.variant,
      size: inputSize.value,
      highlight: highlight.value,
      orientation: props.orientation,
      fieldGroup: orientation.value,
      increment: props.orientation === "vertical" ? !!props.increment || !!props.decrement : !!props.increment,
      decrement: props.orientation === "vertical" ? false : !!props.decrement
    }));
    const incrementIcon = computed(() => props.incrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp));
    const decrementIcon = computed(() => props.decrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown));
    const inputRef = useTemplateRef("inputRef");
    function onUpdate(value) {
      if (props.modelModifiers?.optional) {
        value = value ?? void 0;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef: toRef(() => inputRef.value?.$el)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NumberFieldRoot), mergeProps(unref(rootProps), {
        id: unref(id),
        "model-value": unref(modelValue),
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        name: unref(name),
        disabled: unref(disabled),
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              ref_key: "inputRef",
              ref: inputRef,
              placeholder: __props.placeholder,
              required: __props.required,
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base }),
              onBlur,
              onFocus: unref(emitFormFocus)
            }), null, _parent2, _scopeId));
            if (!!__props.increment) {
              _push2(`<div data-slot="increment" class="${ssrRenderClass(ui.value.increment({ class: props.ui?.increment }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(NumberFieldIncrement), {
                "as-child": "",
                disabled: unref(disabled) || __props.incrementDisabled
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "increment", {}, () => {
                      _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, _parent3, _scopeId2));
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "increment", {}, () => [
                        createVNode(_sfc_main$l, mergeProps({
                          icon: incrementIcon.value,
                          color: unref(color),
                          size: __props.size,
                          variant: "link",
                          "aria-label": unref(t)("inputNumber.increment")
                        }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!__props.decrement) {
              _push2(`<div data-slot="decrement" class="${ssrRenderClass(ui.value.decrement({ class: props.ui?.decrement }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(NumberFieldDecrement), {
                "as-child": "",
                disabled: unref(disabled) || __props.decrementDisabled
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "decrement", {}, () => {
                      _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, _parent3, _scopeId2));
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "decrement", {}, () => [
                        createVNode(_sfc_main$l, mergeProps({
                          icon: decrementIcon.value,
                          color: unref(color),
                          size: __props.size,
                          variant: "link",
                          "aria-label": unref(t)("inputNumber.decrement")
                        }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                ref_key: "inputRef",
                ref: inputRef,
                placeholder: __props.placeholder,
                required: __props.required,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base }),
                onBlur,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["placeholder", "required", "class", "onFocus"]),
              !!__props.increment ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "increment",
                class: ui.value.increment({ class: props.ui?.increment })
              }, [
                createVNode(unref(NumberFieldIncrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.incrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "increment", {}, () => [
                      createVNode(_sfc_main$l, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2)) : createCommentVNode("", true),
              !!__props.decrement ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "decrement",
                class: ui.value.decrement({ class: props.ui?.decrement })
              }, [
                createVNode(unref(NumberFieldDecrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.decrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "decrement", {}, () => [
                      createVNode(_sfc_main$l, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/InputNumber.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=InputNumber-LtvFKiY6.mjs.map
