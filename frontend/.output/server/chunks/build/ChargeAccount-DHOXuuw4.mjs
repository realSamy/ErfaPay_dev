import { _ as _sfc_main$2 } from './Container-FYbH69tK.mjs';
import { _ as _sfc_main$3 } from './Form-DbM-gQaT.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, createCommentVNode, toDisplayString, withModifiers, useSlots, renderSlot, createTextVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from 'reka-ui';
import { useWindowSize, reactivePick } from '@vueuse/core';
import { b as useI18n, k as useAuth, r as _sfc_main$d, s as _sfc_main$c, _ as _sfc_main$l, d as __unimport_directionalIcon, j as useState, z as useToast, y as useAuthApi, a as useAppConfig, t as tv, h as _sfc_main$q, A as _sfc_main$o, B as get } from './server.mjs';
import { _ as _sfc_main$6 } from './Badge-B5nYqlG6.mjs';
import { _ as _sfc_main$4 } from './Select-BkNBr6Bu.mjs';
import { _ as _sfc_main$5 } from './InputNumber-LtvFKiY6.mjs';
import { u as useApi } from './useApi-_4dZBB2A.mjs';

const useLoadCurrenciesStore = async (forced = false) => {
  const store = useState("currencies", () => []);
  const loading = ref(false);
  const error = ref(null);
  const fetchData = async () => {
    const response = await useApi("/api/currencies/latest/");
    return response.data.value?.data ?? [];
  };
  try {
    if (forced || !store.value?.length) {
      store.value = await fetchData();
    } else {
      const newCurr = await fetchData();
      store.value.forEach((item) => {
        item.rate = newCurr.find((_i) => _i.code === item.code)?.rate || 0;
      });
    }
  } catch (e) {
    console.error("Failed to fetch currencies:", e);
    error.value = e.message || "Failed to load currency data.";
  } finally {
    loading.value = false;
  }
  return store;
};
const theme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: null, required: false, default: "0" },
    modelValue: { type: null, required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = ref([]);
    __expose({
      triggersRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        "activation-mode": __props.activationMode,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), {
              "data-slot": "list",
              class: ui.value.list({ class: props.ui?.list })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item, index) => {
                    _push3(ssrRenderComponent(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.icon) {
                              _push4(ssrRenderComponent(_sfc_main$q, {
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$o, mergeProps({
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (unref(get)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.badge || item.badge === 0) {
                              _push4(ssrRenderComponent(_sfc_main$6, mergeProps({
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(unref(TabsIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, null, 8, ["class"]),
                    renderSlot(_ctx.$slots, "list-leading"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      return openBlock(), createBlock(unref(TabsTrigger), {
                        key: index,
                        ref_for: true,
                        ref: (el) => triggersRef.value[index] = el,
                        value: item.value ?? String(index),
                        disabled: item.disabled,
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ]),
                          unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                          }, [
                            renderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => [
                              createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.items, (item, index) => {
                _push2(ssrRenderComponent(unref(TabsContent), {
                  key: index,
                  value: item.value ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        _push3(`${ssrInterpolate(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(TabsList), {
                "data-slot": "list",
                class: ui.value.list({ class: props.ui?.list })
              }, {
                default: withCtx(() => [
                  createVNode(unref(TabsIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, 8, ["class"]),
                  renderSlot(_ctx.$slots, "list-leading"),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                            key: 1,
                            size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ]),
                        unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, [
                          renderSlot(_ctx.$slots, "default", {
                            item,
                            index
                          }, () => [
                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "class"]);
                  }), 128)),
                  renderSlot(_ctx.$slots, "list-trailing")
                ]),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
                return openBlock(), createBlock(unref(TabsContent), {
                  key: index,
                  value: item.value ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function numberToText(num, locale = "en") {
  if (!Number.isFinite(num) || num < 0 || !Number.isInteger(num))
    throw new Error("Only positive integers are supported");
  if (locale === "en") return numberToEnglish(num);
  if (locale === "fa") return numberToPersian(num);
  return num.toString();
}
function numberToEnglish(num) {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];
  const thousands = ["", "thousand", "million", "billion"];
  if (num === 0) return "zero";
  let word = "";
  let i = 0;
  while (num > 0) {
    const chunk = num % 1e3;
    if (chunk !== 0) {
      const chunkWord = convertChunkEnglish(chunk, ones, teens, tens);
      word = chunkWord + " " + thousands[i] + " " + word;
    }
    num = Math.floor(num / 1e3);
    i++;
  }
  return word.trim().replace(/\s+/g, " ");
}
function convertChunkEnglish(num, ones, teens, tens) {
  let result = "";
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  if (hundred > 0) {
    result += ones[hundred] + " hundred";
    if (remainder > 0) result += " and ";
  }
  if (remainder >= 10 && remainder < 20) {
    result += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    if (ten > 0) result += tens[ten];
    if (ten > 0 && one > 0) result += "-";
    if (one > 0) result += ones[one];
  }
  return result.trim();
}
function numberToPersian(num) {
  const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
  const teens = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده"
  ];
  const tens = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود"
  ];
  const hundreds = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد"
  ];
  const thousands = ["", "هزار", "میلیون", "میلیارد", "تریلیون", "تریلیارد"];
  if (num === 0) return "صفر";
  let parts = [];
  let i = 0;
  while (num > 0) {
    const chunk = num % 1e3;
    if (chunk !== 0) {
      const chunkWord = convertChunkPersian(chunk, ones, teens, tens, hundreds);
      if (thousands[i]) parts.unshift(chunkWord + " " + thousands[i]);
      else parts.unshift(chunkWord);
    }
    num = Math.floor(num / 1e3);
    i++;
  }
  return parts.join(" و ").trim();
}
function convertChunkPersian(num, ones, teens, tens, hundreds) {
  const h = Math.floor(num / 100);
  const t = Math.floor(num % 100 / 10);
  const o = num % 10;
  const parts = [];
  if (h > 0 && hundreds[h]?.length) parts.push(hundreds[h]);
  if (t === 1 && teens[o]?.length) {
    parts.push(teens[o]);
  } else {
    if (t > 1 && tens[t]?.length) parts.push(tens[t]);
    if (o > 0 && ones[o]?.length) parts.push(ones[o]);
  }
  return parts.join(" و ");
}
const paypalMinUSD = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChargeAccount",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const { user, login } = useAuth();
    const currenciesStore = ([__temp, __restore] = withAsyncContext(() => useLoadCurrenciesStore()), __temp = await __temp, __restore(), __temp);
    const loading = ref(false);
    const { width } = useWindowSize();
    const tabsOrientation = computed(() => {
      return width.value < 768 ? "horizontal" : "vertical";
    });
    const selectedGateway = ref("paypal");
    const gatewayTabs = [
      { value: "paypal", label: "PayPal" },
      { value: "crypto", label: t("pages.home.crypto") },
      { value: "voucher", label: "Perfect Money Voucher" }
    ];
    const cryptoCurrencies = [
      { code: "BTC", name: "Bitcoin (BTC)" },
      { code: "ETH", name: "Ethereum (ETH)" },
      { code: "USDT", name: "Tether (USDT TRC20)" },
      { code: "LTC", name: "Litecoin (LTC)" },
      { code: "TRX", name: "Tron (TRX)" },
      { code: "BNB", name: "Binance Coin (BNB)" }
      // Add more as supported by NOWPayments
    ];
    const availableCurrencies = computed(() => {
      if (selectedGateway.value === "paypal") return [{ code: "USD", name: "US Dollar (USD)" }];
      return cryptoCurrencies;
    });
    const selectedCurrency = ref("USD");
    const cryptoMinAmountsUSD = {
      BTC: 5e-4,
      // ~$30–50 at current prices
      ETH: 0.01,
      // ~$30–40
      USDT: 10,
      // $10 minimum
      // LTC: 0.1,       // ~$10–15
      TRX: 200,
      // ~$30–40
      BNB: 0.02
      // ~$10–15
      // Add more currencies here as you support them
    };
    const currentMinAmount = computed(() => {
      if (selectedGateway.value === "paypal") {
        return paypalMinUSD;
      }
      if (selectedGateway.value === "voucher") {
        return 0;
      }
      return cryptoMinAmountsUSD[selectedCurrency.value] || 10;
    });
    const depositAmount = ref(null);
    const voucherNum = ref("");
    const voucherCode = ref("");
    const irtRate = computed(() => {
      if (selectedGateway.value === "voucher") return 0;
      const currency = selectedCurrency.value;
      return currenciesStore.value.find((c) => c.code == currency)?.["rate"] || 0;
    });
    const irtEquivalent = computed(() => {
      if (selectedGateway.value === "voucher" || !depositAmount.value || depositAmount.value <= 0) return 0;
      return Math.floor(depositAmount.value * irtRate.value);
    });
    const irtEquivalentText = computed(() => numberToText(irtEquivalent.value, locale.value));
    const formattedIRTEquivalent = computed(() => irtEquivalent.value.toLocaleString(locale.value));
    const fieldUI = { label: "text-gray-700 dark:text-gray-300 font-semibold text-nowrap" };
    const submitButtonLabel = computed(() => {
      if (selectedGateway.value === "voucher") return t("pages.home.redeem_voucher");
      return t("services.labels.charge_account");
    });
    watch(selectedGateway, (newVal) => {
      depositAmount.value = null;
      if (newVal === "paypal") selectedCurrency.value = "USD";
      if (newVal === "crypto") selectedCurrency.value = "BTC";
    });
    const handleSubmit = async () => {
      if (loading.value) return;
      if (!user.value) {
        return login();
      }
      if (selectedGateway.value !== "voucher") {
        if (!depositAmount.value || depositAmount.value < currentMinAmount.value) {
          useToast().add({
            title: t("common.titles.error"),
            description: t("errors.invalid_amount"),
            color: "error"
          });
          return;
        }
      } else {
        if (!voucherNum.value || !voucherCode.value) {
          useToast().add({
            title: t("common.titles.error"),
            description: t("error.voucher_required"),
            color: "error"
          });
          return;
        }
      }
      loading.value = true;
      try {
        let payload = {};
        let endpoint = "/api/payments/charges/create/";
        if (selectedGateway.value === "paypal") {
          payload = { gateway: "paypal", foreign_amount: depositAmount.value };
        } else if (selectedGateway.value === "crypto") {
          payload = {
            gateway: "crypto",
            foreign_amount: depositAmount.value,
            currency: selectedCurrency.value
          };
        } else if (selectedGateway.value === "voucher") {
          payload = {
            gateway: "voucher",
            voucher_num: voucherNum.value,
            voucher_code: voucherCode.value
          };
        }
        const { data } = await useAuthApi(endpoint, {
          method: "POST",
          body: payload
        });
        if (data.value?.approve_url || data.value?.pay_url) {
          (void 0).location.href = data.value.approve_url || data.value.pay_url;
        } else if (data.value?.success) {
          useToast().add({ title: t("pages.home.voucher_success"), color: "success" });
        } else {
          useToast().add({
            title: t("common.titles.error"),
            description: data.value?.error || t("common.errors.unknown"),
            color: "error"
          });
        }
      } catch (err) {
        useToast().add({ title: t("common.titles.error"), color: "error" });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$2;
      const _component_UForm = _sfc_main$3;
      const _component_UTabs = _sfc_main$1;
      const _component_UFormField = _sfc_main$d;
      const _component_USelect = _sfc_main$4;
      const _component_UInputNumber = _sfc_main$5;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "w-full bg-ui-highlight p-10" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              class: "bg-ui-highlight w-full space-y-6 flex flex-col md:flex-row gap-6",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTabs, {
                    modelValue: selectedGateway.value,
                    "onUpdate:modelValue": ($event) => selectedGateway.value = $event,
                    items: gatewayTabs,
                    orientation: tabsOrientation.value,
                    class: "h-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="w-full space-y-6"${_scopeId2}>`);
                  if (selectedGateway.value !== "voucher") {
                    _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: _ctx.$t("pages.home.select_currency"),
                      ui: fieldUI,
                      class: "bg-ui-input rounded-lg p-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_USelect, {
                            modelValue: selectedCurrency.value,
                            "onUpdate:modelValue": ($event) => selectedCurrency.value = $event,
                            disabled: selectedGateway.value === "paypal",
                            items: availableCurrencies.value,
                            class: "w-full",
                            "label-key": "name",
                            "value-key": "code",
                            variant: "none"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_USelect, {
                              modelValue: selectedCurrency.value,
                              "onUpdate:modelValue": ($event) => selectedCurrency.value = $event,
                              disabled: selectedGateway.value === "paypal",
                              items: availableCurrencies.value,
                              class: "w-full",
                              "label-key": "name",
                              "value-key": "code",
                              variant: "none"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: _ctx.$t("pages.home.deposit_amount"),
                      ui: fieldUI,
                      class: "bg-ui-input rounded-lg p-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInputNumber, {
                            modelValue: depositAmount.value,
                            "onUpdate:modelValue": ($event) => depositAmount.value = $event,
                            decrement: false,
                            "format-options": { maximumFractionDigits: 5 },
                            increment: false,
                            min: currentMinAmount.value,
                            step: 1e-8,
                            class: "w-full",
                            dir: "ltr",
                            placeholder: "0.00",
                            variant: "subtle",
                            onFocus: (e) => e.target.select()
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInputNumber, {
                              modelValue: depositAmount.value,
                              "onUpdate:modelValue": ($event) => depositAmount.value = $event,
                              decrement: false,
                              "format-options": { maximumFractionDigits: 5 },
                              increment: false,
                              min: currentMinAmount.value,
                              step: 1e-8,
                              class: "w-full",
                              dir: "ltr",
                              placeholder: "0.00",
                              variant: "subtle",
                              onFocus: (e) => e.target.select()
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "onFocus"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="col-span-1 md:col-span-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: _ctx.$t("pages.home.irt_equivalent"),
                      ui: fieldUI,
                      class: "bg-ui-input rounded-lg p-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            value: formattedIRTEquivalent.value,
                            class: "w-full",
                            dir: "ltr",
                            readonly: "",
                            type: "text",
                            variant: "none"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              value: formattedIRTEquivalent.value,
                              class: "w-full",
                              dir: "ltr",
                              readonly: "",
                              type: "text",
                              variant: "none"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (irtEquivalent.value) {
                      _push3(`<span class="text-muted text-sm"${_scopeId2}>${ssrInterpolate(irtEquivalentText.value)} ${ssrInterpolate(_ctx.$t("common.currencies.text.toman"))}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: _ctx.$t("pages.home.voucher_number"),
                      ui: fieldUI,
                      class: "bg-ui-input rounded-lg p-3",
                      required: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: voucherNum.value,
                            "onUpdate:modelValue": ($event) => voucherNum.value = $event,
                            class: "w-full",
                            dir: "ltr",
                            maxlength: "10",
                            placeholder: "e.g. 1234567890",
                            variant: "subtle"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: voucherNum.value,
                              "onUpdate:modelValue": ($event) => voucherNum.value = $event,
                              class: "w-full",
                              dir: "ltr",
                              maxlength: "10",
                              placeholder: "e.g. 1234567890",
                              variant: "subtle"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UFormField, {
                      label: _ctx.$t("pages.home.voucher_code"),
                      ui: fieldUI,
                      class: "bg-ui-input rounded-lg p-3",
                      required: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UInput, {
                            modelValue: voucherCode.value,
                            "onUpdate:modelValue": ($event) => voucherCode.value = $event,
                            class: "w-full",
                            dir: "ltr",
                            maxlength: "16",
                            placeholder: "e.g. ABCD1234EFGH5678",
                            variant: "subtle"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UInput, {
                              modelValue: voucherCode.value,
                              "onUpdate:modelValue": ($event) => voucherCode.value = $event,
                              class: "w-full",
                              dir: "ltr",
                              maxlength: "16",
                              placeholder: "e.g. ABCD1234EFGH5678",
                              variant: "subtle"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: submitButtonLabel.value,
                    loading: loading.value,
                    "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                    block: "",
                    class: "rounded-lg font-bold text-lg text-white",
                    size: "xl",
                    type: "submit"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UTabs, {
                      modelValue: selectedGateway.value,
                      "onUpdate:modelValue": ($event) => selectedGateway.value = $event,
                      items: gatewayTabs,
                      orientation: tabsOrientation.value,
                      class: "h-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "orientation"]),
                    createVNode("div", { class: "w-full space-y-6" }, [
                      selectedGateway.value !== "voucher" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                      }, [
                        createVNode(_component_UFormField, {
                          label: _ctx.$t("pages.home.select_currency"),
                          ui: fieldUI,
                          class: "bg-ui-input rounded-lg p-3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_USelect, {
                              modelValue: selectedCurrency.value,
                              "onUpdate:modelValue": ($event) => selectedCurrency.value = $event,
                              disabled: selectedGateway.value === "paypal",
                              items: availableCurrencies.value,
                              class: "w-full",
                              "label-key": "name",
                              "value-key": "code",
                              variant: "none"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "items"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: _ctx.$t("pages.home.deposit_amount"),
                          ui: fieldUI,
                          class: "bg-ui-input rounded-lg p-3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInputNumber, {
                              modelValue: depositAmount.value,
                              "onUpdate:modelValue": ($event) => depositAmount.value = $event,
                              decrement: false,
                              "format-options": { maximumFractionDigits: 5 },
                              increment: false,
                              min: currentMinAmount.value,
                              step: 1e-8,
                              class: "w-full",
                              dir: "ltr",
                              placeholder: "0.00",
                              variant: "subtle",
                              onFocus: (e) => e.target.select()
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "onFocus"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                          createVNode(_component_UFormField, {
                            label: _ctx.$t("pages.home.irt_equivalent"),
                            ui: fieldUI,
                            class: "bg-ui-input rounded-lg p-3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                value: formattedIRTEquivalent.value,
                                class: "w-full",
                                dir: "ltr",
                                readonly: "",
                                type: "text",
                                variant: "none"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          irtEquivalent.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-muted text-sm"
                          }, toDisplayString(irtEquivalentText.value) + " " + toDisplayString(_ctx.$t("common.currencies.text.toman")), 1)) : createCommentVNode("", true)
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                      }, [
                        createVNode(_component_UFormField, {
                          label: _ctx.$t("pages.home.voucher_number"),
                          ui: fieldUI,
                          class: "bg-ui-input rounded-lg p-3",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: voucherNum.value,
                              "onUpdate:modelValue": ($event) => voucherNum.value = $event,
                              class: "w-full",
                              dir: "ltr",
                              maxlength: "10",
                              placeholder: "e.g. 1234567890",
                              variant: "subtle"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: _ctx.$t("pages.home.voucher_code"),
                          ui: fieldUI,
                          class: "bg-ui-input rounded-lg p-3",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: voucherCode.value,
                              "onUpdate:modelValue": ($event) => voucherCode.value = $event,
                              class: "w-full",
                              dir: "ltr",
                              maxlength: "16",
                              placeholder: "e.g. ABCD1234EFGH5678",
                              variant: "subtle"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"])
                      ])),
                      createVNode(_component_UButton, {
                        label: submitButtonLabel.value,
                        loading: loading.value,
                        "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                        block: "",
                        class: "rounded-lg font-bold text-lg text-white",
                        size: "xl",
                        type: "submit"
                      }, null, 8, ["label", "loading", "trailing-icon"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                class: "bg-ui-highlight w-full space-y-6 flex flex-col md:flex-row gap-6",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_UTabs, {
                    modelValue: selectedGateway.value,
                    "onUpdate:modelValue": ($event) => selectedGateway.value = $event,
                    items: gatewayTabs,
                    orientation: tabsOrientation.value,
                    class: "h-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "orientation"]),
                  createVNode("div", { class: "w-full space-y-6" }, [
                    selectedGateway.value !== "voucher" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                    }, [
                      createVNode(_component_UFormField, {
                        label: _ctx.$t("pages.home.select_currency"),
                        ui: fieldUI,
                        class: "bg-ui-input rounded-lg p-3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_USelect, {
                            modelValue: selectedCurrency.value,
                            "onUpdate:modelValue": ($event) => selectedCurrency.value = $event,
                            disabled: selectedGateway.value === "paypal",
                            items: availableCurrencies.value,
                            class: "w-full",
                            "label-key": "name",
                            "value-key": "code",
                            variant: "none"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "items"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      createVNode(_component_UFormField, {
                        label: _ctx.$t("pages.home.deposit_amount"),
                        ui: fieldUI,
                        class: "bg-ui-input rounded-lg p-3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInputNumber, {
                            modelValue: depositAmount.value,
                            "onUpdate:modelValue": ($event) => depositAmount.value = $event,
                            decrement: false,
                            "format-options": { maximumFractionDigits: 5 },
                            increment: false,
                            min: currentMinAmount.value,
                            step: 1e-8,
                            class: "w-full",
                            dir: "ltr",
                            placeholder: "0.00",
                            variant: "subtle",
                            onFocus: (e) => e.target.select()
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "onFocus"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      createVNode("div", { class: "col-span-1 md:col-span-2" }, [
                        createVNode(_component_UFormField, {
                          label: _ctx.$t("pages.home.irt_equivalent"),
                          ui: fieldUI,
                          class: "bg-ui-input rounded-lg p-3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              value: formattedIRTEquivalent.value,
                              class: "w-full",
                              dir: "ltr",
                              readonly: "",
                              type: "text",
                              variant: "none"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        irtEquivalent.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-muted text-sm"
                        }, toDisplayString(irtEquivalentText.value) + " " + toDisplayString(_ctx.$t("common.currencies.text.toman")), 1)) : createCommentVNode("", true)
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "grid grid-cols-1 md:grid-cols-2 gap-6"
                    }, [
                      createVNode(_component_UFormField, {
                        label: _ctx.$t("pages.home.voucher_number"),
                        ui: fieldUI,
                        class: "bg-ui-input rounded-lg p-3",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: voucherNum.value,
                            "onUpdate:modelValue": ($event) => voucherNum.value = $event,
                            class: "w-full",
                            dir: "ltr",
                            maxlength: "10",
                            placeholder: "e.g. 1234567890",
                            variant: "subtle"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      createVNode(_component_UFormField, {
                        label: _ctx.$t("pages.home.voucher_code"),
                        ui: fieldUI,
                        class: "bg-ui-input rounded-lg p-3",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: voucherCode.value,
                            "onUpdate:modelValue": ($event) => voucherCode.value = $event,
                            class: "w-full",
                            dir: "ltr",
                            maxlength: "16",
                            placeholder: "e.g. ABCD1234EFGH5678",
                            variant: "subtle"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"])
                    ])),
                    createVNode(_component_UButton, {
                      label: submitButtonLabel.value,
                      loading: loading.value,
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                      block: "",
                      class: "rounded-lg font-bold text-lg text-white",
                      size: "xl",
                      type: "submit"
                    }, null, 8, ["label", "loading", "trailing-icon"])
                  ])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChargeAccount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ChargeAccount = Object.assign(_sfc_main, { __name: "ChargeAccount" });

export { ChargeAccount as C, useLoadCurrenciesStore as u };
//# sourceMappingURL=ChargeAccount-DHOXuuw4.mjs.map
