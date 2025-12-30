import { defineComponent, ref, mergeProps, unref, isRef, computed, watch, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { f as _export_sfc, p as useLocalePath, F as useRoute, k as useAuth, a6 as useAuthModal, _ as _sfc_main$l, e as __nuxt_component_4$1, j as useState, b as useI18n, Z as _sfc_main$m, h as _sfc_main$q } from './server.mjs';
import { _ as _sfc_main$5 } from './Container-FYbH69tK.mjs';
import { b as _sfc_main$3$1, L as Logo, _ as __nuxt_component_5, a as __nuxt_component_6, c as _sfc_main$6 } from './Logo-DBf2JVlb.mjs';
import { _ as __unimport_useConvertNumericToLocale } from './useConvertNumericToLocale-CAtKRlJ-.mjs';
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
import 'vaul-vue';
import 'reka-ui/namespaced';
import './Kbd-4P_ljKMp.mjs';

const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "z-1 fixed top-0 left-0 w-screen h-screen bg-black/20" }, _attrs))}></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Overlay.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]), { __name: "Overlay" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Services",
  __ssrInlineRender: true,
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const isOpen = ref(false);
    const items = computed(() => [
      {
        label: t("services.labels.internal_payment"),
        icon: "mdi:currency-usd"
      },
      {
        label: t("services.labels.money_transfer"),
        icon: "mdi:bank-transfer-out"
      },
      {
        label: t("services.labels.charge_account"),
        icon: "mdi:cash-plus"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDropdownMenu = _sfc_main$6;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UDropdownMenu, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": [($event) => isRef(isOpen) ? isOpen.value = $event : null, (_i) => emit("update:modelValue", _i)],
        content: {
          sideOffset: 20
        },
        items: unref(items),
        class: "",
        ui: {
          content: "w-48 rounded-none rounded-b-md p-0 shadow-lg shadow-primary/50 ring-transparent",
          group: "p-0 ",
          item: "p-3 border-s-transparent border-s-3 hover:border-s-primary-500 hover:bg-white/90 dark:hover:bg-primary/20 hover:text-primary",
          itemLeadingIcon: "group-hover:text-primary"
        }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: unref(t)("common.labels.services"),
              ui: { trailingIcon: "text-primary" },
              color: "neutral",
              dir: "ltr",
              "trailing-icon": "mdi:menu",
              variant: "ghost"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: unref(t)("common.labels.services"),
                ui: { trailingIcon: "text-primary" },
                color: "neutral",
                dir: "ltr",
                "trailing-icon": "mdi:menu",
                variant: "ghost"
              }, null, 8, ["label"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/list/Services.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$3, { __name: "ListServices" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const localePath = useLocalePath();
    const route = useRoute();
    const isIndexRoute = computed(() => route.name?.toString().includes("index"));
    const showOverlay = ref(false);
    const { isLoggedIn, isSupport } = useAuth();
    const emit = __emit;
    watch(showOverlay, (val) => {
      emit("update:modelValue", val);
    });
    const { open } = useAuthModal();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$5;
      const _component_UDrawer = _sfc_main$3$1;
      const _component_UButton = _sfc_main$l;
      const _component_ListServices = __nuxt_component_3;
      const _component_ClientOnly = __nuxt_component_4$1;
      const _component_SelectLanguage = __nuxt_component_5;
      const _component_ButtonTheme = __nuxt_component_6;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({
        class: [{ "shadow-lg shadow-primary/50 bg-(--ui-bg-light) dark:bg-(--ui-bg-dark)": unref(showOverlay) }, "z-2 h-18 rounded flex gap-2 items-center justify-between"]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-start" data-v-9584e65a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UDrawer, {
              class: "md:hidden",
              description: "Mobile Menu",
              direction: "right",
              title: "Menu"
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-10 flex flex-col" data-v-9584e65a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ListServices, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: _ctx.$t("common.labels.contact_us"),
                    ui: { leadingIcon: "text-primary" },
                    color: "neutral",
                    icon: "mdi:phone",
                    variant: "ghost"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-10 flex flex-col" }, [
                      createVNode(_component_ListServices),
                      createVNode(_component_UButton, {
                        label: _ctx.$t("common.labels.contact_us"),
                        ui: { leadingIcon: "text-primary" },
                        color: "neutral",
                        icon: "mdi:phone",
                        variant: "ghost"
                      }, null, 8, ["label"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    icon: "mdi:menu",
                    variant: "ghost"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      icon: "mdi:menu",
                      variant: "ghost"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(Logo, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ListServices, {
              modelValue: unref(showOverlay),
              "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null,
              class: "hidden md:flex"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("common.labels.contact_us"),
              ui: { leadingIcon: "text-primary" },
              class: "hidden md:flex",
              color: "neutral",
              icon: "mdi:phone",
              variant: "ghost"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="header-end" data-v-9584e65a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SelectLanguage, {
              modelValue: unref(showOverlay),
              "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ButtonTheme, { toggle: "" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "header-start" }, [
                createVNode(_component_UDrawer, {
                  class: "md:hidden",
                  description: "Mobile Menu",
                  direction: "right",
                  title: "Menu"
                }, {
                  content: withCtx(() => [
                    createVNode("div", { class: "p-10 flex flex-col" }, [
                      createVNode(_component_ListServices),
                      createVNode(_component_UButton, {
                        label: _ctx.$t("common.labels.contact_us"),
                        ui: { leadingIcon: "text-primary" },
                        color: "neutral",
                        icon: "mdi:phone",
                        variant: "ghost"
                      }, null, 8, ["label"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      icon: "mdi:menu",
                      variant: "ghost"
                    })
                  ]),
                  _: 1
                }),
                createVNode(Logo),
                createVNode(_component_ListServices, {
                  modelValue: unref(showOverlay),
                  "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null,
                  class: "hidden md:flex"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UButton, {
                  label: _ctx.$t("common.labels.contact_us"),
                  ui: { leadingIcon: "text-primary" },
                  class: "hidden md:flex",
                  color: "neutral",
                  icon: "mdi:phone",
                  variant: "ghost"
                }, null, 8, ["label"])
              ]),
              createVNode("div", { class: "header-end" }, [
                createVNode(_component_ClientOnly, null, {
                  default: withCtx(() => [
                    unref(isIndexRoute) ? (openBlock(), createBlock("div", { key: 0 }, [
                      unref(isLoggedIn) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-x-2"
                      }, [
                        unref(isSupport) ? (openBlock(), createBlock(_component_UButton, {
                          key: 0,
                          label: _ctx.$t("common.labels.admin_panel"),
                          to: unref(localePath)({ name: "admin" })
                        }, null, 8, ["label", "to"])) : createCommentVNode("", true),
                        createVNode(_component_UButton, {
                          label: _ctx.$t("common.labels.dashboard"),
                          to: unref(localePath)({ name: "dashboard" })
                        }, null, 8, ["label", "to"])
                      ])) : (openBlock(), createBlock(_component_UButton, {
                        key: 1,
                        label: _ctx.$t("common.signin_or_signup"),
                        onClick: ($event) => unref(open)("signin")
                      }, null, 8, ["label", "onClick"]))
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(_component_SelectLanguage, {
                  modelValue: unref(showOverlay),
                  "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_ButtonTheme, { toggle: "" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-9584e65a"]]), { __name: "LayoutHeader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const footerLogos = useState("footer_logos");
    const { locale } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$5;
      const _component_UButton = _sfc_main$l;
      const _component_ULink = _sfc_main$m;
      const _component_UIcon = _sfc_main$q;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "max-w-screen bg-black/90 mt-10 text-white py-8" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UContainer, { class: "p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6 pb-6 border-b border-gray-700"${_scopeId2}><div${_scopeId2}></div><div class="flex flex-col sm:flex-row justify-between"${_scopeId2}><span class="text-lg font-semibold mb-4 sm:mb-0"${_scopeId2}>${ssrInterpolate(_ctx.$t("pages.home.social_media_title"))}</span><div class="flex space-x-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    "aria-label": "Instagram",
                    class: "text-white",
                    color: "primary",
                    icon: "i-mdi-instagram",
                    target: "_blank",
                    to: "#",
                    variant: "link"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    "aria-label": "Telegram",
                    class: "text-white",
                    color: "primary",
                    icon: "i-mdi-telegram",
                    target: "_blank",
                    to: "#",
                    variant: "link"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    "aria-label": "Twitter",
                    class: "text-white",
                    color: "primary",
                    icon: "i-mdi-twitter",
                    target: "_blank",
                    to: "#",
                    variant: "link"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    "aria-label": "WhatsApp",
                    class: "text-white",
                    color: "primary",
                    icon: "i-mdi-whatsapp",
                    target: "_blank",
                    to: "#",
                    variant: "link"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6"${_scopeId2}><div class="text-start"${_scopeId2}><h3 class="text-xl font-bold mb-4"${_scopeId2}>${ssrInterpolate(_ctx.$t("footer.erfapay_links_title"))}</h3><ul class="space-y-2"${_scopeId2}><li${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ULink, {
                    class: "text-gray-400 hover:text-primary-400",
                    to: "#"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("footer.rules_regulations"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("footer.rules_regulations")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</li><li${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ULink, {
                    class: "text-gray-400 hover:text-primary-400",
                    to: "#"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("footer.faqs"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("footer.faqs")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</li><li${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ULink, {
                    class: "text-gray-400 hover:text-primary-400",
                    to: "#"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("footer.about_us"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("footer.about_us")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</li><li${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ULink, {
                    class: "text-gray-400 hover:text-primary-400",
                    to: "#"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("footer.privacy_policy"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$t("footer.privacy_policy")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</li></ul></div><div class="text-start"${_scopeId2}><h3 class="text-xl font-bold mb-4"${_scopeId2}>${ssrInterpolate(_ctx.$t("footer.contact_info_title"))}</h3><div class="text-gray-400 mb-2"${_scopeId2}>${ssrInterpolate(_ctx.$t("footer.address"))}</div><div class="text-gray-400 mb-2 flex items-center justify-start"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    class: "ltr:mr-2 rtl:ml-2",
                    name: "i-mdi-email"
                  }, null, _parent3, _scopeId2));
                  _push3(`<a${ssrRenderAttr("href", `mailto:${_ctx.$t("footer.email")}`)} class="hover:text-primary-400"${_scopeId2}>${ssrInterpolate(_ctx.$t("footer.email"))}</a></div><div class="text-gray-400 flex items-center justify-start"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    class: "ltr:mr-2 rtl:ml-2",
                    name: "i-mdi-phone"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p dir="ltr"${_scopeId2}>${ssrInterpolate(("useConvertNumericToLocale" in _ctx ? _ctx.useConvertNumericToLocale : unref(__unimport_useConvertNumericToLocale))(" (+98) 912 999 9999 - (+98) 912 999 9999", unref(locale)))}</p></div></div></div><div class="text-center text-gray-500 text-sm pt-6 border-t border-gray-700"${_scopeId2}><div class="flex gap-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(footerLogos), (logo) => {
                    _push3(`<a${ssrRenderAttr("href", logo.href)}${_scopeId2}><img${ssrRenderAttr("alt", logo.alt)}${ssrRenderAttr("src", logo.img)} class="h-16"${_scopeId2}></a>`);
                  });
                  _push3(`<!--]--></div><p class="p-4"${_scopeId2}>Copyright © ErfaPay.com All rights reserved</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6 pb-6 border-b border-gray-700" }, [
                      createVNode("div"),
                      createVNode("div", { class: "flex flex-col sm:flex-row justify-between" }, [
                        createVNode("span", { class: "text-lg font-semibold mb-4 sm:mb-0" }, toDisplayString(_ctx.$t("pages.home.social_media_title")), 1),
                        createVNode("div", { class: "flex space-x-4" }, [
                          createVNode(_component_UButton, {
                            "aria-label": "Instagram",
                            class: "text-white",
                            color: "primary",
                            icon: "i-mdi-instagram",
                            target: "_blank",
                            to: "#",
                            variant: "link"
                          }),
                          createVNode(_component_UButton, {
                            "aria-label": "Telegram",
                            class: "text-white",
                            color: "primary",
                            icon: "i-mdi-telegram",
                            target: "_blank",
                            to: "#",
                            variant: "link"
                          }),
                          createVNode(_component_UButton, {
                            "aria-label": "Twitter",
                            class: "text-white",
                            color: "primary",
                            icon: "i-mdi-twitter",
                            target: "_blank",
                            to: "#",
                            variant: "link"
                          }),
                          createVNode(_component_UButton, {
                            "aria-label": "WhatsApp",
                            class: "text-white",
                            color: "primary",
                            icon: "i-mdi-whatsapp",
                            target: "_blank",
                            to: "#",
                            variant: "link"
                          })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6" }, [
                      createVNode("div", { class: "text-start" }, [
                        createVNode("h3", { class: "text-xl font-bold mb-4" }, toDisplayString(_ctx.$t("footer.erfapay_links_title")), 1),
                        createVNode("ul", { class: "space-y-2" }, [
                          createVNode("li", null, [
                            createVNode(_component_ULink, {
                              class: "text-gray-400 hover:text-primary-400",
                              to: "#"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("footer.rules_regulations")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("li", null, [
                            createVNode(_component_ULink, {
                              class: "text-gray-400 hover:text-primary-400",
                              to: "#"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("footer.faqs")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("li", null, [
                            createVNode(_component_ULink, {
                              class: "text-gray-400 hover:text-primary-400",
                              to: "#"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("footer.about_us")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("li", null, [
                            createVNode(_component_ULink, {
                              class: "text-gray-400 hover:text-primary-400",
                              to: "#"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("footer.privacy_policy")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "text-start" }, [
                        createVNode("h3", { class: "text-xl font-bold mb-4" }, toDisplayString(_ctx.$t("footer.contact_info_title")), 1),
                        createVNode("div", { class: "text-gray-400 mb-2" }, toDisplayString(_ctx.$t("footer.address")), 1),
                        createVNode("div", { class: "text-gray-400 mb-2 flex items-center justify-start" }, [
                          createVNode(_component_UIcon, {
                            class: "ltr:mr-2 rtl:ml-2",
                            name: "i-mdi-email"
                          }),
                          createVNode("a", {
                            href: `mailto:${_ctx.$t("footer.email")}`,
                            class: "hover:text-primary-400"
                          }, toDisplayString(_ctx.$t("footer.email")), 9, ["href"])
                        ]),
                        createVNode("div", { class: "text-gray-400 flex items-center justify-start" }, [
                          createVNode(_component_UIcon, {
                            class: "ltr:mr-2 rtl:ml-2",
                            name: "i-mdi-phone"
                          }),
                          createVNode("p", { dir: "ltr" }, toDisplayString(("useConvertNumericToLocale" in _ctx ? _ctx.useConvertNumericToLocale : unref(__unimport_useConvertNumericToLocale))(" (+98) 912 999 9999 - (+98) 912 999 9999", unref(locale))), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "text-center text-gray-500 text-sm pt-6 border-t border-gray-700" }, [
                      createVNode("div", { class: "flex gap-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(footerLogos), (logo) => {
                          return openBlock(), createBlock("a", {
                            href: logo.href
                          }, [
                            createVNode("img", {
                              alt: logo.alt,
                              src: logo.img,
                              class: "h-16"
                            }, null, 8, ["alt", "src"])
                          ], 8, ["href"]);
                        }), 256))
                      ]),
                      createVNode("p", { class: "p-4" }, "Copyright © ErfaPay.com All rights reserved")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UContainer, { class: "p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6 pb-6 border-b border-gray-700" }, [
                    createVNode("div"),
                    createVNode("div", { class: "flex flex-col sm:flex-row justify-between" }, [
                      createVNode("span", { class: "text-lg font-semibold mb-4 sm:mb-0" }, toDisplayString(_ctx.$t("pages.home.social_media_title")), 1),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(_component_UButton, {
                          "aria-label": "Instagram",
                          class: "text-white",
                          color: "primary",
                          icon: "i-mdi-instagram",
                          target: "_blank",
                          to: "#",
                          variant: "link"
                        }),
                        createVNode(_component_UButton, {
                          "aria-label": "Telegram",
                          class: "text-white",
                          color: "primary",
                          icon: "i-mdi-telegram",
                          target: "_blank",
                          to: "#",
                          variant: "link"
                        }),
                        createVNode(_component_UButton, {
                          "aria-label": "Twitter",
                          class: "text-white",
                          color: "primary",
                          icon: "i-mdi-twitter",
                          target: "_blank",
                          to: "#",
                          variant: "link"
                        }),
                        createVNode(_component_UButton, {
                          "aria-label": "WhatsApp",
                          class: "text-white",
                          color: "primary",
                          icon: "i-mdi-whatsapp",
                          target: "_blank",
                          to: "#",
                          variant: "link"
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 mb-6" }, [
                    createVNode("div", { class: "text-start" }, [
                      createVNode("h3", { class: "text-xl font-bold mb-4" }, toDisplayString(_ctx.$t("footer.erfapay_links_title")), 1),
                      createVNode("ul", { class: "space-y-2" }, [
                        createVNode("li", null, [
                          createVNode(_component_ULink, {
                            class: "text-gray-400 hover:text-primary-400",
                            to: "#"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("footer.rules_regulations")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("li", null, [
                          createVNode(_component_ULink, {
                            class: "text-gray-400 hover:text-primary-400",
                            to: "#"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("footer.faqs")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("li", null, [
                          createVNode(_component_ULink, {
                            class: "text-gray-400 hover:text-primary-400",
                            to: "#"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("footer.about_us")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("li", null, [
                          createVNode(_component_ULink, {
                            class: "text-gray-400 hover:text-primary-400",
                            to: "#"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("footer.privacy_policy")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "text-start" }, [
                      createVNode("h3", { class: "text-xl font-bold mb-4" }, toDisplayString(_ctx.$t("footer.contact_info_title")), 1),
                      createVNode("div", { class: "text-gray-400 mb-2" }, toDisplayString(_ctx.$t("footer.address")), 1),
                      createVNode("div", { class: "text-gray-400 mb-2 flex items-center justify-start" }, [
                        createVNode(_component_UIcon, {
                          class: "ltr:mr-2 rtl:ml-2",
                          name: "i-mdi-email"
                        }),
                        createVNode("a", {
                          href: `mailto:${_ctx.$t("footer.email")}`,
                          class: "hover:text-primary-400"
                        }, toDisplayString(_ctx.$t("footer.email")), 9, ["href"])
                      ]),
                      createVNode("div", { class: "text-gray-400 flex items-center justify-start" }, [
                        createVNode(_component_UIcon, {
                          class: "ltr:mr-2 rtl:ml-2",
                          name: "i-mdi-phone"
                        }),
                        createVNode("p", { dir: "ltr" }, toDisplayString(("useConvertNumericToLocale" in _ctx ? _ctx.useConvertNumericToLocale : unref(__unimport_useConvertNumericToLocale))(" (+98) 912 999 9999 - (+98) 912 999 9999", unref(locale))), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "text-center text-gray-500 text-sm pt-6 border-t border-gray-700" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(footerLogos), (logo) => {
                        return openBlock(), createBlock("a", {
                          href: logo.href
                        }, [
                          createVNode("img", {
                            alt: logo.alt,
                            src: logo.img,
                            class: "h-16"
                          }, null, 8, ["alt", "src"])
                        ], 8, ["href"]);
                      }), 256))
                    ]),
                    createVNode("p", { class: "p-4" }, "Copyright © ErfaPay.com All rights reserved")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "LayoutFooter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const showOverlay = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Overlay = __nuxt_component_0;
      const _component_LayoutHeader = __nuxt_component_1;
      const _component_LayoutFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col grow min-h-screen min-w-screen" }, _attrs))}>`);
      if (unref(showOverlay)) {
        _push(ssrRenderComponent(_component_Overlay, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_LayoutHeader, {
        modelValue: unref(showOverlay),
        "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BhbbT1t0.mjs.map
