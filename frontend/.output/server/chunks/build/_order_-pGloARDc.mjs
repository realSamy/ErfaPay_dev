import { f as _export_sfc, b as useI18n, F as useRoute, J as useBreadcrumbStore, h as _sfc_main$q, _ as _sfc_main$l, z as useToast, a3 as useOverlay } from './server.mjs';
import { _ as _sfc_main$1 } from './Badge-B5nYqlG6.mjs';
import { _ as _sfc_main$2 } from './Popover-WJI12U2G.mjs';
import { defineComponent, withAsyncContext, computed, ref, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, defineAsyncComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { a as useAdminFetchOrder, b as useUpdateAdminOrder } from './useOrders-C3kKfnWR.mjs';
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

const LazyModalPrompt = defineAsyncComponent(() => import('./Prompt-4pYmaK3y.mjs').then((r) => r["default"] || r.default || r));
const usePrompt = () => {
  const overlay = useOverlay();
  return (modelValue, fields = {}, extra_props = {}) => {
    return new Promise((resolve) => {
      const modal = overlay.create(LazyModalPrompt, {
        props: {
          ...extra_props,
          modelValue,
          fields,
          onConfirm: (val) => {
            modal.close();
            resolve(val);
          },
          onCancel: () => {
            modal.close();
            resolve(null);
          }
        }
      });
      modal.open();
    });
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[order]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { locale, t } = useI18n();
    const route = useRoute();
    const order_id = route.params.order;
    const breadcrumbStore = useBreadcrumbStore();
    const { order } = ([__temp, __restore] = withAsyncContext(() => useAdminFetchOrder(order_id)), __temp = await __temp, __restore(), __temp);
    breadcrumbStore.value = {
      name: order.value.user.full_name,
      order: order_id
    };
    const DATEFORMAT = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    const statusBadge = computed(() => {
      const map = {
        pending: { label: t("common.states.orders.pending"), color: "neutral" },
        processing: { label: t("common.states.orders.processing"), color: "info" },
        done: { label: t("common.states.orders.done"), color: "success" },
        rejected: { label: t("common.states.orders.rejected"), color: "error" }
      };
      return map[order.value.status];
    });
    const statusItems = ref([
      { label: t("common.states.orders.pending"), value: "pending" },
      { label: t("common.states.orders.processing"), value: "processing" },
      { label: t("common.states.orders.done"), value: "done" },
      { label: t("common.states.orders.rejected"), value: "rejected" }
    ]);
    const handleUpdateStatus = async () => {
      const payload = await usePrompt()(
        {
          status: order.value.status,
          admin_notes: order.value.admin_notes
        },
        {
          status: { label: t("common.labels.order_status"), type: "select", options: statusItems },
          admin_notes: { label: t("common.labels.admin_notes"), type: "textarea" }
        },
        {
          title: t("common.titles.orders_update")
        }
      );
      if (payload) {
        const { updateOrder, updatedOrder } = useUpdateAdminOrder();
        await updateOrder(order_id, payload);
        order.value = updatedOrder.value;
        useToast().add({
          title: t("common.titles.orders_update"),
          description: t("orders.messages.order_updated"),
          color: "success"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$q;
      const _component_UBadge = _sfc_main$1;
      const _component_UButton = _sfc_main$l;
      const _component_UPopover = _sfc_main$2;
      if (unref(order)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))} data-v-b2098c56><section class="flex flex-col xl:flex-row justify-between gap-12" data-v-b2098c56><div class="column" data-v-b2098c56><div class="has-hr" data-v-b2098c56><h2 class="title" data-v-b2098c56>کاربر سفارش دهنده:</h2><div class="tr-value" data-v-b2098c56><span class="font-bold" data-v-b2098c56>${ssrInterpolate(unref(order).user.full_name)}</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: `cif:${unref(order).user.country_code.toLowerCase()}`,
          class: "rounded-md",
          size: "20"
        }, null, _parent));
        _push(`</div></div><div data-v-b2098c56><h2 class="title" data-v-b2098c56>مشخصات کاربری:</h2><div class="tr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>ایمیل:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(unref(order).user.email)}</span></div><div class="tr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>وضعیت حساب:</span><span class="tr-value" data-v-b2098c56>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(order).user.is_blocked ? "error" : "success",
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(order).user.is_blocked ? "مسدود شده" : "فعال")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(order).user.is_blocked ? "مسدود شده" : "فعال"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span></div></div></div><div class="column" data-v-b2098c56><h2 class="title" data-v-b2098c56>مشخصات کلی سفارش:</h2><div data-v-b2098c56><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>شماره سفارش:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(_ctx.$n(Number(unref(order).id), { useGrouping: false }))}</span></div><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>نوع درخواست:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(unref(order).service[`title_${unref(locale)}`])}</span></div><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>مبلغ سفارش:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(_ctx.$n(Number(unref(order).user_amount_irt)))} تومان </span></div><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>تاریخ ثبت:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(_ctx.$d(new Date(unref(order).created_at), DATEFORMAT))}</span></div></div></div><div class="column" data-v-b2098c56><h2 class="title" data-v-b2098c56>وضعیت سفارش:</h2><div data-v-b2098c56><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>اپراتور:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(unref(order).processed_by?.full_name || "—")}</span></div><div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>آخرین وضعیت:</span><div class="tr-value" data-v-b2098c56>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(statusBadge).color,
          label: unref(statusBadge).label,
          class: "capitalize"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          class: "mr-2",
          icon: "material-symbols:edit-square-outline",
          size: "xs",
          variant: "link",
          onClick: handleUpdateStatus
        }, null, _parent));
        _push(`</div></div>`);
        if (unref(order).admin_notes) {
          _push(`<div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>توضیحات پشتیبان:</span>`);
          _push(ssrRenderComponent(_component_UPopover, { mode: "hover" }, {
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-100 p-2" data-v-b2098c56${_scopeId}><span class="max-w-10 wrap-normal" data-v-b2098c56${_scopeId}>${ssrInterpolate(unref(order).admin_notes)}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "w-100 p-2" }, [
                    createVNode("span", { class: "max-w-10 wrap-normal" }, toDisplayString(unref(order).admin_notes), 1)
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-info tr-value max-h-6 overflow-hidden truncate" data-v-b2098c56${_scopeId}>${ssrInterpolate(unref(order).admin_notes)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-info tr-value max-h-6 overflow-hidden truncate" }, toDisplayString(unref(order).admin_notes), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tr has-hr" data-v-b2098c56><span class="tr-title" data-v-b2098c56>تاریخ بروزرسانی:</span><span class="tr-value" data-v-b2098c56>${ssrInterpolate(unref(order).updated_at ? _ctx.$d(new Date(unref(order).updated_at), DATEFORMAT) : "—")}</span></div></div></div></section><section class="space-y-2" data-v-b2098c56><h2 class="title" data-v-b2098c56>توضیحات:</h2><div class="w-full bg-ui-highlight p-4 grid md:grid-cols-2 gap-4" data-v-b2098c56><!--[-->`);
        ssrRenderList(unref(order).custom_data, (data) => {
          _push(`<div class="space-y-2" data-v-b2098c56><div data-v-b2098c56><h4 class="font-bold" data-v-b2098c56>${ssrInterpolate(data[`label_${unref(locale)}`])}</h4><p class="text-muted" data-v-b2098c56>${ssrInterpolate(data[`description_${unref(locale)}`])}</p></div><p class="font-medium bg-elevated p-2 rounded-md" data-v-b2098c56>${ssrInterpolate(data.value)}</p></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(order).attachments) {
          _push(`<div class="inline-flex gap-2 flex-wrap" data-v-b2098c56><!--[-->`);
          ssrRenderList(unref(order).attachments, (attachment) => {
            _push(ssrRenderComponent(_component_UButton, {
              href: attachment.url,
              label: attachment.filename,
              external: "",
              icon: "material-symbols:attachment",
              target: "_blank",
              variant: "soft"
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/[id]/orders/[order].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _order_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2098c56"]]);

export { _order_ as default };
//# sourceMappingURL=_order_-pGloARDc.mjs.map
