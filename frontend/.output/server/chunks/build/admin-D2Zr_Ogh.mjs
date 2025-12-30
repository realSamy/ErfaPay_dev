import { _ as _sfc_main$7, a as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$3$1, d as _sfc_main$2$1 } from './DashboardPanel-B4YL1rLo.mjs';
import { b as useI18n, F as useRoute, a5 as useLocaleRoute, h as _sfc_main$q, e as __nuxt_component_4$1, f as _export_sfc, k as useAuth, d as __unimport_directionalIcon, _ as _sfc_main$l, o as useRouter, p as useLocalePath, J as useBreadcrumbStore, a6 as useAuthModal, u as useLocale, a as useAppConfig, t as tv, Z as _sfc_main$m, $ as pickLinkProps, a0 as _sfc_main$n, A as _sfc_main$o, B as get } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, renderSlot, createBlock, createCommentVNode, openBlock, ref, watch, isRef, useSlots, createTextVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { L as Logo, _ as __nuxt_component_5, a as __nuxt_component_6 } from './Logo-DBf2JVlb.mjs';
import { Primitive } from 'reka-ui';
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
import '@vueuse/core';
import './Badge-B5nYqlG6.mjs';
import './Popover-WJI12U2G.mjs';
import 'reka-ui/namespaced';
import './Tooltip-BFGZkN6r.mjs';
import './Kbd-4P_ljKMp.mjs';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'vaul-vue';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AdminLogo",
  __ssrInlineRender: true,
  props: {
    collapsed: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UButton, mergeProps({
        class: "font-extrabold text-2xl",
        size: "xl",
        variant: "link",
        label: __props.collapsed ? "E" : _ctx.$t("common.site_title")
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$5, { __name: "AdminLogo" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocaleRoute();
    const route = useRoute();
    const { user, logout } = useAuth();
    const menuItems = computed(() => [
      {
        label: t("common.layouts.sidebars.admin.labels.finance"),
        icon: "material-symbols:finance-mode",
        to: localePath("admin-financial")
      },
      {
        label: t("common.layouts.sidebars.admin.labels.services"),
        icon: "material-symbols:receipt-outline",
        to: localePath("admin-services"),
        active: route.name?.toString().startsWith("admin-services"),
        children: [
          {
            label: t("common.layouts.sidebars.admin.labels.services_new"),
            to: localePath("admin-services-new")
          }
        ]
      },
      {
        label: t("common.layouts.sidebars.admin.labels.users"),
        icon: "material-symbols:dashboard-outline",
        to: localePath("admin-users"),
        active: route.name?.toString().startsWith("admin-users"),
        children: [
          {
            label: t("common.layouts.sidebars.admin.labels.users_new"),
            to: localePath("admin-users-new")
          }
        ]
      },
      {
        label: t("common.layouts.sidebars.admin.labels.agents"),
        icon: "material-symbols:contact-support-outline",
        to: localePath("admin-agents"),
        active: route.name?.toString().startsWith("admin-agents"),
        children: [
          {
            label: t("common.layouts.sidebars.admin.labels.agents_new"),
            to: localePath("admin-agents-new")
          }
        ]
      },
      {
        label: t("common.layouts.sidebars.admin.labels.support"),
        icon: "material-symbols:campaign-outline",
        to: localePath("admin-support"),
        children: [
          {
            label: t("layout.sidebar.label_tickets"),
            to: localePath("admin-support-tickets")
          }
        ]
      }
    ]);
    computed(() => [
      {
        label: t("common.labels.contact_us"),
        icon: "mdi:phone"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardSidebar = _sfc_main$3$1;
      const _component_AdminLogo = __nuxt_component_1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$2$1;
      const _component_UNavigationMenu = _sfc_main$1$1;
      const _component_ClientOnly = __nuxt_component_4$1;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UDashboardSidebar, mergeProps({
        menu: { side: ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("right", "left") },
        ui: { footer: "border-t border-default", root: "bg-white dark:bg-primary/20" },
        collapsible: "",
        mode: "slideover",
        resizable: ""
      }, _attrs), {
        header: withCtx(({ collapsed, collapse }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!collapsed) {
              _push2(`<div class="w-full flex justify-between"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AdminLogo, { class: "h-5 w-auto shrink-0" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(ssrRenderComponent(_component_AdminLogo, {
                collapsed,
                onClick: ($event) => collapse(false)
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              !collapsed ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full flex justify-between"
              }, [
                createVNode(_component_AdminLogo, { class: "h-5 w-auto shrink-0" }),
                createVNode(_component_UDashboardSidebarCollapse)
              ])) : (openBlock(), createBlock(_component_AdminLogo, {
                key: 1,
                collapsed,
                onClick: ($event) => collapse(false)
              }, null, 8, ["collapsed", "onClick"]))
            ];
          }
        }),
        default: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UNavigationMenu, {
              collapsed,
              items: unref(menuItems),
              orientation: "vertical"
            }, null, _parent2, _scopeId));
            {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UNavigationMenu, {
                collapsed,
                items: unref(menuItems),
                orientation: "vertical"
              }, null, 8, ["collapsed", "items"]),
              createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-full flex justify-between" }, [
                    createVNode(_component_UButton, {
                      block: collapsed,
                      label: collapsed ? void 0 : unref(user)?.full_name,
                      class: "w-full",
                      color: "neutral",
                      icon: "material-symbols:person",
                      variant: "ghost"
                    }, null, 8, ["block", "label"]),
                    !collapsed ? (openBlock(), createBlock(_component_UButton, {
                      key: 0,
                      title: _ctx.$t("common.labels.logout"),
                      color: "neutral",
                      icon: "material-symbols:logout",
                      variant: "link",
                      onClick: () => unref(logout)(true, _ctx.$t)
                    }, null, 8, ["title", "onClick"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/admin/Sidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$4, { __name: "LayoutAdminSidebar" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const isIndexRoute = computed(() => route.name?.toString().includes("index"));
    const showOverlay = ref(false);
    const emit = __emit;
    watch(showOverlay, (val) => {
      emit("update:modelValue", val);
    });
    const { open } = useAuthModal();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      const _component_SelectLanguage = __nuxt_component_5;
      const _component_ButtonTheme = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [{ "shadow-lg shadow-primary/50 bg-(--ui-bg-light) dark:bg-(--ui-bg-dark)": unref(showOverlay) }, "z-2 h-18 rounded flex gap-2 items-center justify-between px-4 ms-0"]
      }, _attrs))} data-v-a8f8b0cc><div class="header-start" data-v-a8f8b0cc>`);
      _push(ssrRenderComponent(Logo, { class: "lg:hidden" }, null, _parent));
      _push(`</div><div class="header-end" data-v-a8f8b0cc>`);
      if (unref(isIndexRoute)) {
        _push(ssrRenderComponent(_component_UButton, {
          label: _ctx.$t("common.signin_or_signup"),
          onClick: ($event) => unref(open)("signin")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_SelectLanguage, {
        modelValue: unref(showOverlay),
        "onUpdate:modelValue": ($event) => isRef(showOverlay) ? showOverlay.value = $event : null
      }, null, _parent));
      _push(ssrRenderComponent(_component_ButtonTheme, { toggle: "" }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/admin/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-a8f8b0cc"]]), { __name: "LayoutAdminHeader" });
const theme = {
  "slots": {
    "root": "relative min-w-0",
    "list": "flex items-center gap-1.5",
    "item": "flex min-w-0",
    "link": "group relative flex items-center gap-1.5 text-sm min-w-0 focus-visible:outline-primary",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkLabel": "truncate",
    "separator": "flex",
    "separatorIcon": "shrink-0 size-5 text-muted"
  },
  "variants": {
    "active": {
      "true": {
        "link": "text-primary font-semibold"
      },
      "false": {
        "link": "text-muted font-medium"
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "to": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "disabled": false,
      "active": false,
      "to": true,
      "class": {
        "link": [
          "hover:text-default",
          "transition-colors"
        ]
      }
    }
  ]
};
const _sfc_main$2 = {
  __name: "UBreadcrumb",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "nav" },
    items: { type: Array, required: false },
    separatorIcon: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const separatorIcon = computed(() => props.separatorIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.breadcrumb || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "aria-label": "breadcrumb",
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ol data-slot="list" class="${ssrRenderClass(ui.value.list({ class: props.ui?.list }))}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item, index) => {
              _push2(`<!--[--><li data-slot="item" class="${ssrRenderClass(ui.value.item({ class: [props.ui?.item, item.ui?.item] }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$m, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                default: withCtx(({ active, ...slotProps }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$n, mergeProps({ ref_for: true }, slotProps, {
                      as: "span",
                      "aria-current": (item.active ?? active) && index === __props.items.length - 1 ? "page" : void 0,
                      "data-slot": "link",
                      class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: item.active ?? index === __props.items.length - 1, disabled: !!item.disabled, to: !!item.to })
                    }), {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                            item,
                            active: item.active ?? index === __props.items.length - 1,
                            index,
                            ui: ui.value
                          }, () => {
                            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                              item,
                              active: item.active ?? index === __props.items.length - 1,
                              index,
                              ui: ui.value
                            }, () => {
                              if (item.icon) {
                                _push4(ssrRenderComponent(_sfc_main$q, {
                                  name: item.icon,
                                  "data-slot": "linkLeadingIcon",
                                  class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === __props.items.length - 1 })
                                }, null, _parent4, _scopeId3));
                              } else if (item.avatar) {
                                _push4(ssrRenderComponent(_sfc_main$o, mergeProps({
                                  size: props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  "data-slot": "linkLeadingAvatar",
                                  class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === __props.items.length - 1 })
                                }), null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) {
                              _push4(`<span data-slot="linkLabel" class="${ssrRenderClass(ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId3}>`);
                              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                                item,
                                active: item.active ?? index === __props.items.length - 1,
                                index
                              }, () => {
                                _push4(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                              }, _push4, _parent4, _scopeId3);
                              _push4(`</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                              item,
                              active: item.active ?? index === __props.items.length - 1,
                              index
                            }, null, _push4, _parent4, _scopeId3);
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, item.slot || "item", {
                              item,
                              active: item.active ?? index === __props.items.length - 1,
                              index,
                              ui: ui.value
                            }, () => [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                                item,
                                active: item.active ?? index === __props.items.length - 1,
                                index,
                                ui: ui.value
                              }, () => [
                                item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                                  key: 0,
                                  name: item.icon,
                                  "data-slot": "linkLeadingIcon",
                                  class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === __props.items.length - 1 })
                                }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                                  key: 1,
                                  size: props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                                }, { ref_for: true }, item.avatar, {
                                  "data-slot": "linkLeadingAvatar",
                                  class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === __props.items.length - 1 })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ]),
                              unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createBlock("span", {
                                key: 0,
                                "data-slot": "linkLabel",
                                class: ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })
                              }, [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                                  item,
                                  active: item.active ?? index === __props.items.length - 1,
                                  index
                                }, () => [
                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                ])
                              ], 2)) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                                item,
                                active: item.active ?? index === __props.items.length - 1,
                                index
                              })
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$n, mergeProps({ ref_for: true }, slotProps, {
                        as: "span",
                        "aria-current": (item.active ?? active) && index === __props.items.length - 1 ? "page" : void 0,
                        "data-slot": "link",
                        class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: item.active ?? index === __props.items.length - 1, disabled: !!item.disabled, to: !!item.to })
                      }), {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot || "item", {
                            item,
                            active: item.active ?? index === __props.items.length - 1,
                            index,
                            ui: ui.value
                          }, () => [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                              item,
                              active: item.active ?? index === __props.items.length - 1,
                              index,
                              ui: ui.value
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "linkLeadingIcon",
                                class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === __props.items.length - 1 })
                              }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                                key: 1,
                                size: props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "linkLeadingAvatar",
                                class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === __props.items.length - 1 })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "linkLabel",
                              class: ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })
                            }, [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                                item,
                                active: item.active ?? index === __props.items.length - 1,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                              item,
                              active: item.active ?? index === __props.items.length - 1,
                              index
                            })
                          ])
                        ]),
                        _: 2
                      }, 1040, ["aria-current", "class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
              if (index < __props.items.length - 1) {
                _push2(`<li role="presentation" aria-hidden="true" data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: [props.ui?.separator, item.ui?.separator] }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "separator", { ui: ui.value }, () => {
                  _push2(ssrRenderComponent(_sfc_main$q, {
                    name: separatorIcon.value,
                    "data-slot": "separatorIcon",
                    class: ui.value.separatorIcon({ class: [props.ui?.separatorIcon, item.ui?.separatorIcon] })
                  }, null, _parent2, _scopeId));
                }, _push2, _parent2, _scopeId);
                _push2(`</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></ol>`);
          } else {
            return [
              createVNode("ol", {
                "data-slot": "list",
                class: ui.value.list({ class: props.ui?.list })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                  return openBlock(), createBlock(Fragment, { key: index }, [
                    createVNode("li", {
                      "data-slot": "item",
                      class: ui.value.item({ class: [props.ui?.item, item.ui?.item] })
                    }, [
                      createVNode(_sfc_main$m, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                        default: withCtx(({ active, ...slotProps }) => [
                          createVNode(_sfc_main$n, mergeProps({ ref_for: true }, slotProps, {
                            as: "span",
                            "aria-current": (item.active ?? active) && index === __props.items.length - 1 ? "page" : void 0,
                            "data-slot": "link",
                            class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: item.active ?? index === __props.items.length - 1, disabled: !!item.disabled, to: !!item.to })
                          }), {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, item.slot || "item", {
                                item,
                                active: item.active ?? index === __props.items.length - 1,
                                index,
                                ui: ui.value
                              }, () => [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                                  item,
                                  active: item.active ?? index === __props.items.length - 1,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                                    key: 0,
                                    name: item.icon,
                                    "data-slot": "linkLeadingIcon",
                                    class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === __props.items.length - 1 })
                                  }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                                    key: 1,
                                    size: props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                                  }, { ref_for: true }, item.avatar, {
                                    "data-slot": "linkLeadingAvatar",
                                    class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === __props.items.length - 1 })
                                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                ]),
                                unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  "data-slot": "linkLabel",
                                  class: ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })
                                }, [
                                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                                    item,
                                    active: item.active ?? index === __props.items.length - 1,
                                    index
                                  }, () => [
                                    createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                  ])
                                ], 2)) : createCommentVNode("", true),
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                                  item,
                                  active: item.active ?? index === __props.items.length - 1,
                                  index
                                })
                              ])
                            ]),
                            _: 2
                          }, 1040, ["aria-current", "class"])
                        ]),
                        _: 2
                      }, 1040)
                    ], 2),
                    index < __props.items.length - 1 ? (openBlock(), createBlock("li", {
                      key: 0,
                      role: "presentation",
                      "aria-hidden": "true",
                      "data-slot": "separator",
                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator] })
                    }, [
                      renderSlot(_ctx.$slots, "separator", { ui: ui.value }, () => [
                        createVNode(_sfc_main$q, {
                          name: separatorIcon.value,
                          "data-slot": "separatorIcon",
                          class: ui.value.separatorIcon({ class: [props.ui?.separatorIcon, item.ui?.separatorIcon] })
                        }, null, 8, ["name", "class"])
                      ])
                    ], 2)) : createCommentVNode("", true)
                  ], 64);
                }), 128))
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Breadcrumb.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DynamicBreadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const { t } = useI18n();
    const breadcrumbState = useBreadcrumbStore();
    function normalizeName(name) {
      return name.replace(/___[a-z]{2}$/, "");
    }
    const breadcrumbItems = computed(() => {
      const name = route.name;
      if (!name) return [];
      const baseName = normalizeName(name);
      const parts = baseName.split("-");
      const items = [];
      let current = "";
      parts.forEach((p, index) => {
        current = index === 0 ? p : `${current}-${p}`;
        const staticRoute = router.getRoutes().find((r) => normalizeName(r.name) === current);
        if (!staticRoute) return;
        const activeMatch = route.matched.find((r) => normalizeName(r.name) === current);
        const metaTitle = activeMatch?.meta?.title || staticRoute.meta?.title;
        if (!metaTitle) return;
        const label = t(metaTitle, breadcrumbState.value);
        const isLast = index === parts.length - 1;
        items.push({ label, ...isLast ? {} : { to: localePath(normalizeName(staticRoute?.name)) } });
      });
      return items;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBreadcrumb = _sfc_main$2;
      _push(ssrRenderComponent(_component_UBreadcrumb, mergeProps({
        items: unref(breadcrumbItems),
        "separator-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("material-symbols:chevron-left-rounded", "material-symbols:chevron-right-rounded")
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DynamicBreadcrumb.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DynamicBreadcrumb = Object.assign(_sfc_main$1, { __name: "DynamicBreadcrumb" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useRoute();
    useLocaleRoute();
    const menuItems = computed(() => []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardGroup = _sfc_main$7;
      const _component_LayoutAdminSidebar = __nuxt_component_1;
      const _component_UDashboardPanel = _sfc_main$6;
      const _component_LayoutAdminHeader = __nuxt_component_3;
      const _component_ClientOnly = __nuxt_component_4$1;
      const _component_UNavigationMenu = _sfc_main$1$1;
      const _component_UIcon = _sfc_main$q;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col grow min-h-screen min-w-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UDashboardGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutAdminSidebar, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UDashboardPanel, { resizable: "" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutAdminHeader, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutAdminHeader)
                  ];
                }
              }),
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_ClientOnly, null, {}, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_ClientOnly, null, {
                      default: withCtx(() => [
                        createVNode(DynamicBreadcrumb),
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UNavigationMenu, {
                    class: "lg:hidden",
                    ui: { list: "w-screen flex justify-around", content: "grow" },
                    items: unref(menuItems)
                  }, {
                    item: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: item.icon,
                          size: "30"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>${ssrInterpolate(item.label)}</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center" }, [
                            createVNode(_component_UIcon, {
                              name: item.icon,
                              size: "30"
                            }, null, 8, ["name"]),
                            createVNode("span", null, toDisplayString(item.label), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UNavigationMenu, {
                      class: "lg:hidden",
                      ui: { list: "w-screen flex justify-around", content: "grow" },
                      items: unref(menuItems)
                    }, {
                      item: withCtx(({ item }) => [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          createVNode(_component_UIcon, {
                            name: item.icon,
                            size: "30"
                          }, null, 8, ["name"]),
                          createVNode("span", null, toDisplayString(item.label), 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["items"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutAdminSidebar),
              createVNode(_component_UDashboardPanel, { resizable: "" }, {
                header: withCtx(() => [
                  createVNode(_component_LayoutAdminHeader)
                ]),
                body: withCtx(() => [
                  createVNode(_component_ClientOnly, null, {
                    default: withCtx(() => [
                      createVNode(DynamicBreadcrumb),
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  })
                ]),
                footer: withCtx(() => [
                  createVNode(_component_UNavigationMenu, {
                    class: "lg:hidden",
                    ui: { list: "w-screen flex justify-around", content: "grow" },
                    items: unref(menuItems)
                  }, {
                    item: withCtx(({ item }) => [
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        createVNode(_component_UIcon, {
                          name: item.icon,
                          size: "30"
                        }, null, 8, ["name"]),
                        createVNode("span", null, toDisplayString(item.label), 1)
                      ])
                    ]),
                    _: 1
                  }, 8, ["items"])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-D2Zr_Ogh.mjs.map
