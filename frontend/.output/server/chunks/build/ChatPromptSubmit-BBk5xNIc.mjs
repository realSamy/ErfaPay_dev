import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, toRef, ref, nextTick, watch, createSlots, renderList, mergeModels, useModel, useTemplateRef, withKeys, withModifiers, Fragment, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Primitive, Slot, Presence, useForwardProps } from 'reka-ui';
import { a as useAppConfig, t as tv, Y as omit, _ as _sfc_main$l, u as useLocale, a2 as transformUI, h as _sfc_main$q, A as _sfc_main$o } from './server.mjs';
import { z as defu } from '../nitro/nitro.mjs';
import { watchThrottled, useElementBounding, reactivePick, reactiveOmit } from '@vueuse/core';
import { _ as _sfc_main$6 } from './Tooltip-BFGZkN6r.mjs';
import { _ as _sfc_main$5 } from './Textarea-C6RFyJZc.mjs';

const theme$4 = {
  "slots": {
    "root": "relative flex-1 flex flex-col min-h-0 min-w-0",
    "prompt": "px-0 rounded-t-none border-t border-default",
    "close": "",
    "content": "overflow-y-auto flex-1 flex flex-col py-3"
  }
};
const _sfc_main$4 = {
  __name: "UChatPalette",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.chatPalette || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="content" class="${ssrRenderClass(ui.value.content({ class: props.ui?.content }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Slot), { compact: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (!!slots.prompt) {
              _push2(ssrRenderComponent(unref(Slot), {
                "data-slot": "prompt",
                class: ui.value.prompt({ class: props.ui?.prompt })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "prompt", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "prompt")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                "data-slot": "content",
                class: ui.value.content({ class: props.ui?.content })
              }, [
                createVNode(unref(Slot), { compact: "" }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                })
              ], 2),
              !!slots.prompt ? (openBlock(), createBlock(unref(Slot), {
                key: 0,
                "data-slot": "prompt",
                class: ui.value.prompt({ class: props.ui?.prompt })
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "prompt")
                ]),
                _: 3
              }, 8, ["class"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/ChatPalette.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "group/message relative w-full",
    "container": "relative flex items-start",
    "leading": "inline-flex items-center justify-center min-h-6",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "content": "relative text-pretty min-w-0 *:first:mt-0 *:last:mb-0",
    "actions": [
      "opacity-0 group-hover/message:opacity-100 absolute bottom-0 flex items-center",
      "transition-opacity"
    ]
  },
  "variants": {
    "variant": {
      "solid": {
        "content": "bg-inverted text-inverted"
      },
      "outline": {
        "content": "bg-default ring ring-default"
      },
      "soft": {
        "content": "bg-elevated/50"
      },
      "subtle": {
        "content": "bg-elevated/50 ring ring-default"
      },
      "naked": {
        "content": ""
      }
    },
    "side": {
      "left": {
        "container": "rtl:justify-end"
      },
      "right": {
        "container": "ltr:justify-end ms-auto max-w-[75%]"
      }
    },
    "leading": {
      "true": ""
    },
    "actions": {
      "true": ""
    },
    "compact": {
      "true": {
        "root": "scroll-mt-3",
        "container": "gap-1.5 pb-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "false": {
        "root": "scroll-mt-4 sm:scroll-mt-6",
        "container": "gap-3 pb-8",
        "leadingIcon": "size-8",
        "leadingAvatarSize": "md"
      }
    }
  },
  "compoundVariants": [
    {
      "compact": true,
      "actions": true,
      "class": {
        "container": "pb-8"
      }
    },
    {
      "leading": true,
      "compact": false,
      "side": "left",
      "class": {
        "actions": "left-11"
      }
    },
    {
      "leading": true,
      "compact": true,
      "side": "left",
      "class": {
        "actions": "left-6.5"
      }
    },
    {
      "variant": [
        "solid",
        "outline",
        "soft",
        "subtle"
      ],
      "compact": false,
      "class": {
        "content": "px-4 py-3 rounded-lg min-h-12",
        "leading": "mt-2"
      }
    },
    {
      "variant": [
        "solid",
        "outline",
        "soft",
        "subtle"
      ],
      "compact": true,
      "class": {
        "content": "px-2 py-1 rounded-lg min-h-8",
        "leading": "mt-1"
      }
    },
    {
      "variant": "naked",
      "side": "left",
      "class": {
        "content": "w-full"
      }
    }
  ],
  "defaultVariants": {
    "variant": "naked"
  }
};
const _sfc_main$3 = {
  __name: "UChatMessage",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "article" },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    variant: { type: null, required: false },
    side: { type: null, required: false },
    actions: { type: Array, required: false },
    compact: { type: Boolean, required: false },
    content: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    id: { type: String, required: true },
    role: { type: String, required: true },
    metadata: { type: null, required: false },
    parts: { type: Array, required: true }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.chatMessage || {} })({
      variant: props.variant,
      side: props.side,
      leading: !!props.icon || !!props.avatar || !!slots.leading,
      actions: !!props.actions || !!slots.actions,
      compact: props.compact
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-role": __props.role,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}>`);
            if (__props.icon || __props.avatar || !!slots.leading) {
              _push2(`<div data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {
                avatar: __props.avatar,
                ui: ui.value
              }, () => {
                if (__props.icon) {
                  _push2(ssrRenderComponent(_sfc_main$q, {
                    name: __props.icon,
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$o, mergeProps({
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.content || __props.parts.length || !!slots.content) {
              _push2(`<div data-slot="content" class="${ssrRenderClass(ui.value.content({ class: props.ui?.content }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "content", {
                id: __props.id,
                role: __props.role,
                content: __props.content,
                parts: __props.parts
              }, () => {
                if (__props.content) {
                  _push2(`<!--[-->${ssrInterpolate(__props.content)}<!--]-->`);
                } else {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.parts, (part, index) => {
                    _push2(`<!--[-->`);
                    if (part.type === "text") {
                      _push2(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<!--]-->`);
                  });
                  _push2(`<!--]-->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.actions || !!slots.actions) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: props.ui?.actions }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "actions", { actions: __props.actions }, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.actions, (action, index) => {
                  _push2(ssrRenderComponent(_sfc_main$6, {
                    key: index,
                    text: action.label
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                          size: "sm",
                          color: "neutral",
                          variant: "ghost"
                        }, { ref_for: true }, unref(omit)(action, ["onClick"]), {
                          label: void 0,
                          onClick: ($event) => typeof action.onClick === "function" ? action.onClick($event, props) : void 0
                        }), null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_sfc_main$l, mergeProps({
                            size: "sm",
                            color: "neutral",
                            variant: "ghost"
                          }, { ref_for: true }, unref(omit)(action, ["onClick"]), {
                            label: void 0,
                            onClick: ($event) => typeof action.onClick === "function" ? action.onClick($event, props) : void 0
                          }), null, 16, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: props.ui?.container })
              }, [
                __props.icon || __props.avatar || !!slots.leading ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "leading",
                  class: ui.value.leading({ class: props.ui?.leading })
                }, [
                  renderSlot(_ctx.$slots, "leading", {
                    avatar: __props.avatar,
                    ui: ui.value
                  }, () => [
                    __props.icon ? (openBlock(), createBlock(_sfc_main$q, {
                      key: 0,
                      name: __props.icon,
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                    }, null, 8, ["name", "class"])) : __props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                      key: 1,
                      size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      "data-slot": "leadingAvatar",
                      class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.content || __props.parts.length || !!slots.content ? (openBlock(), createBlock("div", {
                  key: 1,
                  "data-slot": "content",
                  class: ui.value.content({ class: props.ui?.content })
                }, [
                  renderSlot(_ctx.$slots, "content", {
                    id: __props.id,
                    role: __props.role,
                    content: __props.content,
                    parts: __props.parts
                  }, () => [
                    __props.content ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(__props.content), 1)
                    ], 64)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.parts, (part, index) => {
                      return openBlock(), createBlock(Fragment, {
                        key: `${__props.id}-${part.type}-${index}`
                      }, [
                        part.type === "text" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(toDisplayString(part.text), 1)
                        ], 64)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true),
                __props.actions || !!slots.actions ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: props.ui?.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", { actions: __props.actions }, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index) => {
                      return openBlock(), createBlock(_sfc_main$6, {
                        key: index,
                        text: action.label
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$l, mergeProps({
                            size: "sm",
                            color: "neutral",
                            variant: "ghost"
                          }, { ref_for: true }, unref(omit)(action, ["onClick"]), {
                            label: void 0,
                            onClick: ($event) => typeof action.onClick === "function" ? action.onClick($event, props) : void 0
                          }), null, 16, ["onClick"])
                        ]),
                        _: 2
                      }, 1032, ["text"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/ChatMessage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "root": "w-full flex flex-col gap-1 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height)",
    "indicator": "h-6 flex items-center gap-1 py-3 *:size-2 *:rounded-full *:bg-elevated [&>*:nth-child(1)]:animate-[bounce_1s_infinite] [&>*:nth-child(2)]:animate-[bounce_1s_0.15s_infinite] [&>*:nth-child(3)]:animate-[bounce_1s_0.3s_infinite]",
    "viewport": "absolute inset-x-0 top-[86%] data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
    "autoScroll": "rounded-full absolute right-1/2 translate-x-1/2 bottom-0"
  },
  "variants": {
    "compact": {
      "true": "",
      "false": ""
    }
  }
};
const _sfc_main$2 = {
  __name: "UChatMessages",
  __ssrInlineRender: true,
  props: {
    messages: { type: Array, required: false },
    status: { type: String, required: false },
    shouldAutoScroll: { type: Boolean, required: false, default: false },
    shouldScrollToBottom: { type: Boolean, required: false, default: true },
    autoScroll: { type: [Boolean, Object], required: false, default: true },
    autoScrollIcon: { type: null, required: false },
    user: { type: Object, required: false },
    assistant: { type: Object, required: false },
    compact: { type: Boolean, required: false },
    spacingOffset: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const getProxySlots = () => omit(slots, ["default", "indicator", "viewport"]);
    const appConfig = useAppConfig();
    const userProps = toRef(() => defu(props.user, { side: "right", variant: "soft" }));
    const assistantProps = toRef(() => defu(props.assistant, { side: "left", variant: "naked" }));
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.chatMessages || {} })({
      compact: props.compact
    }));
    const el = ref(null);
    const parent = ref(null);
    const messagesRefs = ref(/* @__PURE__ */ new Map());
    const showAutoScroll = ref(false);
    const lastMessageHeight = ref(0);
    const lastMessageSubmitted = ref(false);
    const lastScrollTop = ref(0);
    const userScrolledUp = ref(false);
    function registerMessageRef(id, element) {
      const elInstance = element?.$el;
      if (elInstance) {
        messagesRefs.value.set(id, elInstance);
      }
    }
    function scrollToMessage(id) {
      const element = messagesRefs.value.get(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    function scrollToBottom(smooth = true) {
      if (!parent.value) {
        return;
      }
      if (smooth) {
        parent.value.scrollTo({ top: parent.value.scrollHeight, behavior: "smooth" });
      } else {
        parent.value.scrollTop = parent.value.scrollHeight;
      }
    }
    watchThrottled([() => props.messages, () => props.status], ([_, status]) => {
      if (status !== "streaming") {
        return;
      }
      if (!props.shouldAutoScroll) {
        checkScrollPosition();
        return;
      }
      nextTick(() => {
        if (!parent.value || userScrolledUp.value) return;
        if (parent.value.scrollHeight - parent.value.scrollTop - parent.value.clientHeight < 150) {
          scrollToBottom(false);
        }
      });
    }, { deep: true, throttle: 50, leading: true });
    watch(() => props.status, (status) => {
      if (status !== "submitted") {
        return;
      }
      const lastMessage = props.messages?.[props.messages.length - 1];
      if (!lastMessage || lastMessage.role !== "user") {
        return;
      }
      userScrolledUp.value = false;
      nextTick(() => {
        lastMessageSubmitted.value = true;
        updateLastMessageHeight();
        nextTick(() => {
          scrollToMessage(lastMessage.id);
        });
      });
    });
    function checkScrollPosition() {
      if (!parent.value) {
        return;
      }
      const scrollPosition = parent.value.scrollTop + parent.value.clientHeight;
      const scrollHeight = parent.value.scrollHeight;
      const threshold = 100;
      showAutoScroll.value = scrollHeight - scrollPosition >= threshold;
      if (parent.value.scrollTop < lastScrollTop.value) {
        userScrolledUp.value = true;
      } else if (scrollHeight - scrollPosition < threshold) {
        userScrolledUp.value = false;
      }
      lastScrollTop.value = parent.value.scrollTop;
    }
    function onAutoScrollClick() {
      userScrolledUp.value = false;
      scrollToBottom();
    }
    function updateLastMessageHeight() {
      if (!el.value || !parent.value || !props.messages?.length || !lastMessageSubmitted.value) {
        return;
      }
      const { height: parentHeight } = useElementBounding(parent.value);
      const lastMessage = props.messages.findLast((m) => m.role === "user");
      if (!lastMessage) {
        return;
      }
      const lastMessageEl = messagesRefs.value.get(lastMessage.id);
      if (!lastMessageEl) {
        return;
      }
      let spacingOffset = props.spacingOffset || 0;
      const elComputedStyle = (void 0).getComputedStyle(el.value);
      const parentComputedStyle = (void 0).getComputedStyle(parent.value);
      spacingOffset += Number.parseFloat(elComputedStyle.rowGap) || Number.parseFloat(elComputedStyle.gap) || 0;
      spacingOffset += Number.parseFloat(parentComputedStyle.paddingTop) || 0;
      spacingOffset += Number.parseFloat(parentComputedStyle.paddingBottom) || 0;
      lastMessageHeight.value = Math.max(parentHeight.value - lastMessageEl.offsetHeight - spacingOffset, 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        "data-status": __props.status,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        style: { "--last-message-height": `${lastMessageHeight.value}px` }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`<!--[-->`);
        ssrRenderList(__props.messages, (message) => {
          _push(ssrRenderComponent(_sfc_main$3, mergeProps({
            key: message.id
          }, { ref_for: true }, { ...message, ...message.role === "user" ? userProps.value : assistantProps.value }, {
            ref_for: true,
            ref: (el2) => registerMessageRef(message.id, el2),
            compact: __props.compact
          }), createSlots({ _: 2 }, [
            renderList(getProxySlots(), (_, name) => {
              return {
                name,
                fn: withCtx((slotData, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData, { message }), null, _push2, _parent2, _scopeId);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData, { message }))
                    ];
                  }
                })
              };
            })
          ]), _parent));
        });
        _push(`<!--]-->`);
      }, _push, _parent);
      if (__props.status === "submitted") {
        _push(ssrRenderComponent(_sfc_main$3, mergeProps({
          id: "indicator",
          role: "assistant"
        }, { ...assistantProps.value, actions: void 0, parts: [] }, { compact: __props.compact }), {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "indicator", { ui: ui.value }, () => {
                _push2(`<div data-slot="indicator" class="${ssrRenderClass(ui.value.indicator({ class: props.ui?.indicator }))}"${_scopeId}><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span></div>`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "indicator", { ui: ui.value }, () => [
                  createVNode("div", {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, [
                    createVNode("span"),
                    createVNode("span"),
                    createVNode("span")
                  ], 2)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Presence), { present: showAutoScroll.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttr("data-state", showAutoScroll.value ? "open" : "closed")} data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "viewport", {
              ui: ui.value,
              onClick: onAutoScrollClick
            }, () => {
              if (__props.autoScroll) {
                _push2(ssrRenderComponent(_sfc_main$l, mergeProps({
                  icon: __props.autoScrollIcon || unref(appConfig).ui.icons.arrowDown,
                  color: "neutral",
                  variant: "outline"
                }, typeof __props.autoScroll === "object" ? __props.autoScroll : {}, {
                  "data-slot": "autoScroll",
                  class: ui.value.autoScroll({ class: props.ui?.autoScroll }),
                  onClick: onAutoScrollClick
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-state": showAutoScroll.value ? "open" : "closed",
                "data-slot": "viewport",
                class: ui.value.viewport({ class: props.ui?.viewport })
              }, [
                renderSlot(_ctx.$slots, "viewport", {
                  ui: ui.value,
                  onClick: onAutoScrollClick
                }, () => [
                  __props.autoScroll ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                    key: 0,
                    icon: __props.autoScrollIcon || unref(appConfig).ui.icons.arrowDown,
                    color: "neutral",
                    variant: "outline"
                  }, typeof __props.autoScroll === "object" ? __props.autoScroll : {}, {
                    "data-slot": "autoScroll",
                    class: ui.value.autoScroll({ class: props.ui?.autoScroll }),
                    onClick: onAutoScrollClick
                  }), null, 16, ["icon", "class"])) : createCommentVNode("", true)
                ])
              ], 10, ["data-state"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/ChatMessages.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "root": "relative flex flex-col items-stretch gap-2 px-2.5 py-2 w-full rounded-lg backdrop-blur",
    "header": "flex items-center gap-1.5",
    "body": "items-start",
    "footer": "flex items-center justify-between gap-1.5",
    "base": "text-base/5"
  },
  "variants": {
    "variant": {
      "outline": {
        "root": "bg-default/75 ring ring-default"
      },
      "soft": {
        "root": "bg-elevated/50"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default"
      },
      "naked": {
        "root": ""
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UChatPrompt",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false, default: "form" },
    placeholder: { type: String, required: false },
    variant: { type: null, required: false },
    error: { type: Error, required: false },
    class: { type: null, required: false },
    ui: { type: void 0, required: false },
    rows: { type: Number, required: false, default: 1 },
    autofocus: { type: Boolean, required: false, default: true },
    autofocusDelay: { type: Number, required: false },
    autoresize: { type: Boolean, required: false, default: true },
    autoresizeDelay: { type: Number, required: false },
    maxrows: { type: Number, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    disabled: { type: Boolean, required: false }
  }, {
    "modelValue": { type: String, ...{ default: "" } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit", "close"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const model = useModel(__props, "modelValue", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const textareaProps = useForwardProps(reactivePick(props, "rows", "autofocus", "autofocusDelay", "autoresize", "autoresizeDelay", "maxrows", "icon", "avatar", "loading", "loadingIcon"));
    const getProxySlots = () => omit(slots, ["header", "footer"]);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.chatPrompt || {} })({
      variant: props.variant
    }));
    const textareaRef = useTemplateRef("textareaRef");
    function submit(e) {
      if (model.value.trim() === "") {
        return;
      }
      emits("submit", e);
    }
    function blur(e) {
      textareaRef.value?.textareaRef?.blur();
      emits("close", e);
    }
    __expose({
      textareaRef: toRef(() => textareaRef.value?.textareaRef)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        onSubmit: submit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.header) {
              _push2(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$5, mergeProps({
              ref_key: "textareaRef",
              ref: textareaRef,
              modelValue: model.value,
              "onUpdate:modelValue": ($event) => model.value = $event,
              placeholder: __props.placeholder || unref(t)("chatPrompt.placeholder"),
              disabled: Boolean(__props.error) || __props.disabled,
              variant: "none"
            }, { ...unref(textareaProps), ..._ctx.$attrs }, {
              ui: unref(transformUI)(unref(omit)(ui.value, ["root", "body", "header", "footer"]), props.ui),
              "data-slot": "body",
              class: ui.value.body({ class: props.ui?.body }),
              onKeydown: [submit, blur]
            }), createSlots({ _: 2 }, [
              renderList(getProxySlots(), (_2, name) => {
                return {
                  name,
                  fn: withCtx((slotData, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, name, slotData)
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
            if (!!slots.footer) {
              _push2(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "header",
                class: ui.value.header({ class: props.ui?.header })
              }, [
                renderSlot(_ctx.$slots, "header")
              ], 2)) : createCommentVNode("", true),
              createVNode(_sfc_main$5, mergeProps({
                ref_key: "textareaRef",
                ref: textareaRef,
                modelValue: model.value,
                "onUpdate:modelValue": ($event) => model.value = $event,
                placeholder: __props.placeholder || unref(t)("chatPrompt.placeholder"),
                disabled: Boolean(__props.error) || __props.disabled,
                variant: "none"
              }, { ...unref(textareaProps), ..._ctx.$attrs }, {
                ui: unref(transformUI)(unref(omit)(ui.value, ["root", "body", "header", "footer"]), props.ui),
                "data-slot": "body",
                class: ui.value.body({ class: props.ui?.body }),
                onKeydown: [
                  withKeys(withModifiers(submit, ["exact", "prevent"]), ["enter"]),
                  withKeys(blur, ["esc"])
                ]
              }), createSlots({ _: 2 }, [
                renderList(getProxySlots(), (_2, name) => {
                  return {
                    name,
                    fn: withCtx((slotData) => [
                      renderSlot(_ctx.$slots, name, slotData)
                    ])
                  };
                })
              ]), 1040, ["modelValue", "onUpdate:modelValue", "placeholder", "disabled", "ui", "class", "onKeydown"]),
              !!slots.footer ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "footer",
                class: ui.value.footer({ class: props.ui?.footer })
              }, [
                renderSlot(_ctx.$slots, "footer")
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/ChatPrompt.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "base": ""
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UChatPromptSubmit",
  __ssrInlineRender: true,
  props: {
    status: { type: String, required: false, default: "ready" },
    icon: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    streamingIcon: { type: null, required: false },
    streamingColor: { type: null, required: false, default: "neutral" },
    streamingVariant: { type: null, required: false, default: "subtle" },
    submittedIcon: { type: null, required: false },
    submittedColor: { type: null, required: false, default: "neutral" },
    submittedVariant: { type: null, required: false, default: "subtle" },
    errorIcon: { type: null, required: false },
    errorColor: { type: null, required: false, default: "error" },
    errorVariant: { type: null, required: false, default: "soft" },
    ui: { type: void 0, required: false },
    class: { type: null, required: false },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    to: { type: null, required: false },
    href: { type: null, required: false },
    external: { type: Boolean, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    noRel: { type: Boolean, required: false },
    prefetchedClass: { type: String, required: false },
    prefetch: { type: Boolean, required: false },
    prefetchOn: { type: [String, Object], required: false },
    noPrefetch: { type: Boolean, required: false },
    trailingSlash: { type: String, required: false },
    activeClass: { type: String, required: false },
    exactActiveClass: { type: String, required: false },
    ariaCurrentValue: { type: String, required: false },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  emits: ["stop", "reload"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const buttonProps = useForwardProps(reactiveOmit(props, "icon", "color", "variant", "status", "streamingIcon", "streamingColor", "streamingVariant", "submittedIcon", "submittedColor", "submittedVariant", "errorIcon", "errorColor", "errorVariant", "class", "ui"));
    const statusButtonProps = computed(() => ({
      ready: {
        icon: props.icon || appConfig.ui.icons.arrowUp,
        color: props.color,
        variant: props.variant,
        type: "submit"
      },
      submitted: {
        icon: props.submittedIcon || appConfig.ui.icons.stop,
        color: props.submittedColor,
        variant: props.submittedVariant,
        onClick(e) {
          emits("stop", e);
        }
      },
      streaming: {
        icon: props.streamingIcon || appConfig.ui.icons.stop,
        color: props.streamingColor,
        variant: props.streamingVariant,
        onClick(e) {
          emits("stop", e);
        }
      },
      error: {
        icon: props.errorIcon || appConfig.ui.icons.reload,
        color: props.errorColor,
        variant: props.errorVariant,
        onClick(e) {
          emits("reload", e);
        }
      }
    })[props.status]);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.chatPromptSubmit || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$l, mergeProps({
        ...unref(buttonProps),
        ...statusButtonProps.value,
        "aria-label": unref(t)("chatPromptSubmit.label"),
        ..._ctx.$attrs
      }, {
        class: ui.value.base({ class: [props.ui?.base, props.class] }),
        ui: unref(transformUI)(ui.value, props.ui)
      }, _attrs), createSlots({ _: 2 }, [
        renderList(slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotData, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, name, slotData, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, name, slotData)
                ];
              }
            })
          };
        })
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/ChatPromptSubmit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$4 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=ChatPromptSubmit-BBk5xNIc.mjs.map
