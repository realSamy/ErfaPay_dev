import { _ as _sfc_main$7, a as _sfc_main$3, b as _sfc_main$1$1, c as _sfc_main$3$1, d as _sfc_main$2$1 } from './DashboardPanel-B4YL1rLo.mjs';
import { L as Logo, _ as __nuxt_component_5, a as __nuxt_component_6 } from './Logo-DBf2JVlb.mjs';
import { b as useI18n, a5 as useLocaleRoute, F as useRoute, h as _sfc_main$q, f as _export_sfc, k as useAuth, d as __unimport_directionalIcon, e as __nuxt_component_4$1, _ as _sfc_main$l, a6 as useAuthModal } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, renderSlot, createBlock, createCommentVNode, openBlock, ref, watch, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import 'reka-ui';
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
import 'vaul-vue';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocaleRoute();
    const { user, logout } = useAuth();
    const route = useRoute();
    const menuItems = computed(() => [
      {
        label: t("layout.sidebar.label_dashboard"),
        icon: "material-symbols:dashboard-outline",
        to: localePath("dashboard")
      },
      {
        label: t("layout.sidebar.label_orders"),
        icon: "material-symbols:receipt-outline",
        to: localePath("dashboard-orders"),
        active: route.name?.toString().startsWith("dashboard-orders")
      },
      {
        label: t("layout.sidebar.label_support"),
        icon: "material-symbols:contact-support-outline",
        to: localePath("dashboard-support"),
        active: route.name?.toString().startsWith("dashboard-support"),
        badge: "4",
        children: [
          {
            label: t("pages.tickets.titles.new_ticket"),
            to: localePath("dashboard-support-new")
          }
        ]
      }
    ]);
    const menuLinks = computed(() => [
      {
        label: t("common.labels.contact_us"),
        icon: "mdi:phone"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardSidebar = _sfc_main$3$1;
      const _component_Logo = Logo;
      const _component_UIcon = _sfc_main$q;
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
        header: withCtx(({ collapsed }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!collapsed) {
              _push2(ssrRenderComponent(_component_Logo, { class: "h-5 w-auto shrink-0" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_UIcon, {
                class: "size-5 text-primary mx-auto",
                name: "i-simple-icons-nuxtdotjs"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              !collapsed ? (openBlock(), createBlock(_component_Logo, {
                key: 0,
                class: "h-5 w-auto shrink-0"
              })) : (openBlock(), createBlock(_component_UIcon, {
                key: 1,
                class: "size-5 text-primary mx-auto",
                name: "i-simple-icons-nuxtdotjs"
              }))
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
            _push2(ssrRenderComponent(_component_UNavigationMenu, {
              collapsed,
              items: unref(menuLinks),
              class: "mt-auto",
              orientation: "vertical"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UNavigationMenu, {
                collapsed,
                items: unref(menuItems),
                orientation: "vertical"
              }, null, 8, ["collapsed", "items"]),
              createVNode(_component_UNavigationMenu, {
                collapsed,
                items: unref(menuLinks),
                class: "mt-auto",
                orientation: "vertical"
              }, null, 8, ["collapsed", "items"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/dashboard/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "LayoutDashboardSidebar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
      const _component_UDashboardSidebarCollapse = _sfc_main$2$1;
      const _component_UButton = _sfc_main$l;
      const _component_SelectLanguage = __nuxt_component_5;
      const _component_ButtonTheme = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [{ "shadow-lg shadow-primary/50 bg-[var(--ui-bg-light)] dark:bg-[var(--ui-bg-dark)]": unref(showOverlay) }, "z-2 h-18 rounded flex gap-2 items-center justify-between px-4 ms-0"]
      }, _attrs))} data-v-59256bd6><div class="header-start" data-v-59256bd6>`);
      _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent));
      _push(ssrRenderComponent(Logo, { class: "lg:hidden" }, null, _parent));
      _push(`</div><div class="header-end" data-v-59256bd6>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/dashboard/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-59256bd6"]]), { __name: "LayoutDashboardHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const localePath = useLocaleRoute();
    const route = useRoute();
    const menuItems = computed(() => [
      {
        label: t("layout.sidebar.label_dashboard"),
        icon: "material-symbols:dashboard-outline",
        to: localePath("dashboard")
      },
      {
        label: t("layout.sidebar.label_orders"),
        icon: "material-symbols:receipt-outline",
        active: route.name?.toString().startsWith("dashboard-orders"),
        to: localePath("dashboard-orders")
      },
      {
        label: t("layout.sidebar.label_support"),
        icon: "material-symbols:contact-support-outline",
        active: route.name?.toString().startsWith("dashboard-support"),
        to: localePath("dashboard-support"),
        badge: "4"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardGroup = _sfc_main$7;
      const _component_LayoutDashboardSidebar = __nuxt_component_1;
      const _component_UDashboardPanel = _sfc_main$3;
      const _component_LayoutDashboardHeader = __nuxt_component_3;
      const _component_UNavigationMenu = _sfc_main$1$1;
      const _component_UIcon = _sfc_main$q;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col grow min-h-screen min-w-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UDashboardGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutDashboardSidebar, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UDashboardPanel, { resizable: "" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutDashboardHeader, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutDashboardHeader)
                  ];
                }
              }),
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
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
              createVNode(_component_LayoutDashboardSidebar),
              createVNode(_component_UDashboardPanel, { resizable: "" }, {
                header: withCtx(() => [
                  createVNode(_component_LayoutDashboardHeader)
                ]),
                body: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-cl7wbU9y.mjs.map
