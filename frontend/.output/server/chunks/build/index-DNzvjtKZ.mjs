import { y as useAuthApi, _ as _sfc_main$l, e as __nuxt_component_4$1, g as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$3 } from './Popover-WJI12U2G.mjs';
import { _ as _sfc_main$4 } from './Badge-B5nYqlG6.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import 'reka-ui/namespaced';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SimpleReport",
  __ssrInlineRender: true,
  props: {
    header: {},
    body: {},
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_UPopover = _sfc_main$3;
      const _component_UBadge = _sfc_main$4;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ class: "w-full divide-y-0" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.header)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.header), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex w-full justify-between"${_scopeId}><span class="font-medium text-5xl"${_scopeId}>${ssrInterpolate(_ctx.$n(__props.body))}</span>`);
            if (__props.stats) {
              _push2(ssrRenderComponent(_component_UPopover, { mode: "hover" }, {
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-row gap-1 p-2"${_scopeId2}><div class="flex flex-col gap-2"${_scopeId2}><span class="text-sm text-muted text-center"${_scopeId2}>روز</span>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: __props.stats.day < 0 ? "error" : "success",
                      label: _ctx.$n(__props.stats.day) + "%",
                      "trailing-icon": __props.stats.day < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                      class: "self-end",
                      size: "sm",
                      title: "در مقایسه با دیروز",
                      variant: "subtle"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="flex flex-col gap-2"${_scopeId2}><span class="text-sm text-muted text-center"${_scopeId2}>هفته</span>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: __props.stats.week < 0 ? "error" : "success",
                      label: _ctx.$n(__props.stats.week) + "%",
                      "trailing-icon": __props.stats.week < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                      class: "self-end",
                      size: "sm",
                      title: "در مقایسه با هفته قبل",
                      variant: "subtle"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="flex flex-col gap-2"${_scopeId2}><span class="text-sm text-muted text-center"${_scopeId2}>ماه</span>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: __props.stats.month < 0 ? "error" : "success",
                      label: _ctx.$n(__props.stats.month) + "%",
                      "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                      class: "self-end",
                      size: "sm",
                      title: "در مقایسه با ماه قبل",
                      variant: "subtle"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-row gap-1 p-2" }, [
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("span", { class: "text-sm text-muted text-center" }, "روز"),
                          createVNode(_component_UBadge, {
                            color: __props.stats.day < 0 ? "error" : "success",
                            label: _ctx.$n(__props.stats.day) + "%",
                            "trailing-icon": __props.stats.day < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                            class: "self-end",
                            size: "sm",
                            title: "در مقایسه با دیروز",
                            variant: "subtle"
                          }, null, 8, ["color", "label", "trailing-icon"])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("span", { class: "text-sm text-muted text-center" }, "هفته"),
                          createVNode(_component_UBadge, {
                            color: __props.stats.week < 0 ? "error" : "success",
                            label: _ctx.$n(__props.stats.week) + "%",
                            "trailing-icon": __props.stats.week < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                            class: "self-end",
                            size: "sm",
                            title: "در مقایسه با هفته قبل",
                            variant: "subtle"
                          }, null, 8, ["color", "label", "trailing-icon"])
                        ]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("span", { class: "text-sm text-muted text-center" }, "ماه"),
                          createVNode(_component_UBadge, {
                            color: __props.stats.month < 0 ? "error" : "success",
                            label: _ctx.$n(__props.stats.month) + "%",
                            "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                            class: "self-end",
                            size: "sm",
                            title: "در مقایسه با ماه قبل",
                            variant: "subtle"
                          }, null, 8, ["color", "label", "trailing-icon"])
                        ])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: __props.stats.month < 0 ? "error" : "success",
                      label: _ctx.$n(__props.stats.month) + "%",
                      "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                      class: "self-end",
                      size: "sm",
                      title: "در مقایسه با ماه قبل",
                      variant: "subtle"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UBadge, {
                        color: __props.stats.month < 0 ? "error" : "success",
                        label: _ctx.$n(__props.stats.month) + "%",
                        "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                        class: "self-end",
                        size: "sm",
                        title: "در مقایسه با ماه قبل",
                        variant: "subtle"
                      }, null, 8, ["color", "label", "trailing-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex w-full justify-between" }, [
                createVNode("span", { class: "font-medium text-5xl" }, toDisplayString(_ctx.$n(__props.body)), 1),
                __props.stats ? (openBlock(), createBlock(_component_UPopover, {
                  key: 0,
                  mode: "hover"
                }, {
                  content: withCtx(() => [
                    createVNode("div", { class: "flex flex-row gap-1 p-2" }, [
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("span", { class: "text-sm text-muted text-center" }, "روز"),
                        createVNode(_component_UBadge, {
                          color: __props.stats.day < 0 ? "error" : "success",
                          label: _ctx.$n(__props.stats.day) + "%",
                          "trailing-icon": __props.stats.day < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                          class: "self-end",
                          size: "sm",
                          title: "در مقایسه با دیروز",
                          variant: "subtle"
                        }, null, 8, ["color", "label", "trailing-icon"])
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("span", { class: "text-sm text-muted text-center" }, "هفته"),
                        createVNode(_component_UBadge, {
                          color: __props.stats.week < 0 ? "error" : "success",
                          label: _ctx.$n(__props.stats.week) + "%",
                          "trailing-icon": __props.stats.week < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                          class: "self-end",
                          size: "sm",
                          title: "در مقایسه با هفته قبل",
                          variant: "subtle"
                        }, null, 8, ["color", "label", "trailing-icon"])
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("span", { class: "text-sm text-muted text-center" }, "ماه"),
                        createVNode(_component_UBadge, {
                          color: __props.stats.month < 0 ? "error" : "success",
                          label: _ctx.$n(__props.stats.month) + "%",
                          "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                          class: "self-end",
                          size: "sm",
                          title: "در مقایسه با ماه قبل",
                          variant: "subtle"
                        }, null, 8, ["color", "label", "trailing-icon"])
                      ])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_UBadge, {
                      color: __props.stats.month < 0 ? "error" : "success",
                      label: _ctx.$n(__props.stats.month) + "%",
                      "trailing-icon": __props.stats.month < 0 ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward",
                      class: "self-end",
                      size: "sm",
                      title: "در مقایسه با ماه قبل",
                      variant: "subtle"
                    }, null, 8, ["color", "label", "trailing-icon"])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/admin/SimpleReport.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "CardAdminSimpleReport" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const userStats = ref();
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useAuthApi("/api/auth/admin/users/stats/")), __temp = await __temp, __restore(), __temp);
    if (response.value?.ok) {
      userStats.value = response.value.data;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      const _component_CardAdminSimpleReport = __nuxt_component_1;
      const _component_ClientOnly = __nuxt_component_4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        label: "دانلود CSV",
        size: "lg",
        "trailing-icon": "material-symbols:download-rounded"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        label: "کاربر جدید",
        to: _ctx.$localePath("admin-users-new"),
        size: "lg",
        "trailing-icon": "material-symbols:add"
      }, null, _parent));
      _push(`</div>`);
      if (unref(userStats)) {
        _push(`<div class="flex flex-col md:flex-row gap-6">`);
        _push(ssrRenderComponent(_component_CardAdminSimpleReport, {
          header: "سفارش های فعال",
          body: unref(userStats).total_active_orders
        }, null, _parent));
        _push(ssrRenderComponent(_component_CardAdminSimpleReport, {
          header: "اعضای خریدار",
          body: unref(userStats).total_active_users,
          stats: unref(userStats).active_users_growth
        }, null, _parent));
        _push(ssrRenderComponent(_component_CardAdminSimpleReport, {
          header: "تعداد کل اعضا",
          body: unref(userStats).total_users,
          stats: unref(userStats).new_users_growth
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="page-section">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DNzvjtKZ.mjs.map
