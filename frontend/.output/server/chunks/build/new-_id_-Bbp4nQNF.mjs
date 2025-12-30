import { b as useI18n, F as useRoute, c as createError, _ as _sfc_main$l, d as __unimport_directionalIcon, p as useLocalePath, r as _sfc_main$d, z as useToast, D as navigateTo, s as _sfc_main$c } from './server.mjs';
import { _ as _sfc_main$2 } from './Form-DbM-gQaT.mjs';
import { _ as _sfc_main$5 } from './InputNumber-LtvFKiY6.mjs';
import { _ as _sfc_main$8 } from './Textarea-C6RFyJZc.mjs';
import { _ as _sfc_main$9 } from './Select-BkNBr6Bu.mjs';
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, mergeProps, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './FileUpload-DYR6EaNq.mjs';
import { _ as _sfc_main$4 } from './FieldGroup-bZqqUUeP.mjs';
import { _ as _sfc_main$6 } from './Badge-B5nYqlG6.mjs';
import { _ as _sfc_main$7 } from './Separator-D0HCwUEr.mjs';
import { u as useCreateOrder } from './useOrders-C3kKfnWR.mjs';
import { a as useService } from './useServices-BjUETh0c.mjs';
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
import './useApi-_4dZBB2A.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ServiceField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { locale } = useI18n();
    const localValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });
    const currentLabel = computed(() => {
      return locale.value === "fa" ? props.field.label_fa : props.field.label_en || props.field.label_fa;
    });
    const currentDescription = computed(() => {
      if (!props.field.description_fa && !props.field.description_en) return void 0;
      return locale.value === "fa" ? props.field.description_fa || props.field.description_en : props.field.description_en || props.field.description_fa;
    });
    const selectOptions = computed(() => {
      return (props.field.options || []).map((option) => ({
        label: option,
        value: option
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_UInputNumber = _sfc_main$5;
      const _component_UTextarea = _sfc_main$8;
      const _component_USelect = _sfc_main$9;
      _push(ssrRenderComponent(_component_UFormField, mergeProps({
        label: unref(currentLabel),
        description: unref(currentDescription),
        required: __props.field.is_required,
        name: __props.field.label_en || __props.field.label_fa || "field",
        size: "xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.field.type === "text") {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                size: "lg",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else if (__props.field.type === "number") {
              _push2(ssrRenderComponent(_component_UInputNumber, {
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                size: "lg",
                min: 0,
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else if (__props.field.type === "textarea") {
              _push2(ssrRenderComponent(_component_UTextarea, {
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                rows: 5,
                size: "lg",
                class: "w-full"
              }, null, _parent2, _scopeId));
            } else if (__props.field.type === "select" && __props.field.options?.length) {
              _push2(ssrRenderComponent(_component_USelect, {
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                items: unref(selectOptions),
                placeholder: unref(currentLabel),
                class: "w-full",
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.field.type === "text" ? (openBlock(), createBlock(_component_UInput, {
                key: 0,
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                size: "lg",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : __props.field.type === "number" ? (openBlock(), createBlock(_component_UInputNumber, {
                key: 1,
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                size: "lg",
                min: 0,
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : __props.field.type === "textarea" ? (openBlock(), createBlock(_component_UTextarea, {
                key: 2,
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                placeholder: unref(currentLabel),
                rows: 5,
                size: "lg",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : __props.field.type === "select" && __props.field.options?.length ? (openBlock(), createBlock(_component_USelect, {
                key: 3,
                modelValue: unref(localValue),
                "onUpdate:modelValue": ($event) => isRef(localValue) ? localValue.value = $event : null,
                items: unref(selectOptions),
                placeholder: unref(currentLabel),
                class: "w-full",
                size: "lg"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "placeholder"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/ServiceField.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "InputServiceField" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new-[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale, n } = useI18n();
    const service_id = useRoute().params.id;
    const { createOrder, loading } = useCreateOrder();
    const service = ref();
    const orderPayload = ref({
      service_id: Number(service_id),
      user_amount_irt: 0,
      custom_data: [],
      attachments: []
    });
    const { data: response, error } = ([__temp, __restore] = withAsyncContext(() => useService(service_id)), __temp = await __temp, __restore(), __temp);
    if (response.value?.ok) {
      service.value = response.value.data;
      orderPayload.value.custom_data = service.value.required_fields.map(
        ({ label_en, label_fa, description_en, description_fa, is_required, type, options }) => ({
          label_fa,
          label_en,
          description_fa,
          description_en,
          is_required,
          type,
          options,
          value: type === "number" ? 0 : ""
        })
      );
      if (!service.value.user_pricing) {
        orderPayload.value.user_amount_irt = Number(service.value.min_amount);
      }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: error.value?.message || "Unknown error",
        data: { returnRoute: "dashboard-orders" }
      });
    }
    const userAmount = computed(() => {
      return service.value?.user_pricing ? Number(orderPayload.value.user_amount_irt || 0) : Number(service.value?.min_amount || 0);
    });
    const commissionAmount = computed(() => {
      if (!service.value) return 0;
      if (service.value.commission_type === "percent") {
        return Math.round(userAmount.value * Number(service.value.commission_percent));
      }
      return Number(service.value.commission_fixed);
    });
    const commissionShow = computed(() => {
      if (!service.value) return "";
      if (service.value.commission_type === "percent") {
        return n(Number(service.value.commission_percent), {
          style: "percent"
        });
      } else {
        return n(Number(service.value.commission_fixed)) + " " + t("common.currencies.text.toman");
      }
    });
    const taxShow = computed(() => {
      if (!service.value) return "";
      return n(Number(service.value.tax_rate), {
        style: "percent"
      });
    });
    const taxAmount = computed(() => {
      if (!service.value) return 0;
      const subtotal = userAmount.value;
      return Math.round(subtotal * Number(service.value.tax_rate));
    });
    const totalPayable = computed(() => {
      return userAmount.value + commissionAmount.value + taxAmount.value;
    });
    const isFormValid = computed(() => {
      if (!service.value) return false;
      const hasMissingRequired = orderPayload.value.custom_data?.some((field) => {
        if (!field.is_required) return false;
        return field.value === "" || field.value === void 0 || field.value === null;
      });
      if (hasMissingRequired) return false;
      if (service.value.user_pricing) {
        const amount = Number(orderPayload.value.user_amount_irt);
        return amount >= Number(service.value.min_amount) && amount <= Number(service.value.max_amount);
      }
      return true;
    });
    const formatIRT = (amount) => {
      return n(amount) + " تومان";
    };
    const submitOrder = async () => {
      if (!isFormValid.value) return;
      const payload = {
        ...orderPayload.value,
        custom_data: orderPayload.value.custom_data?.map(({ value, ...field }) => ({
          ...field,
          value
        }))
      };
      const data = await createOrder(payload);
      if (data.ok) {
        useToast().add({
          title: t("orders.messages.order_created"),
          color: "success"
        });
        await navigateTo(useLocalePath()("dashboard-orders"));
      } else {
        useToast().add({
          title: t("common.titles.error"),
          description: data.errors?.[0] || t("common.errors.unknown"),
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      const _component_UForm = _sfc_main$2;
      const _component_InputServiceField = __nuxt_component_2;
      const _component_UFormField = _sfc_main$d;
      const _component_UFileUpload = _sfc_main$3;
      const _component_UFieldGroup = _sfc_main$4;
      const _component_UInputNumber = _sfc_main$5;
      const _component_UBadge = _sfc_main$6;
      const _component_USeparator = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(service)) {
        _push(`<div class="space-y-8"><section class="flex justify-between items-center"><h2 class="font-bold text-2xl">${ssrInterpolate(unref(service)[`title_${unref(locale)}`])}</h2>`);
        _push(ssrRenderComponent(_component_UButton, {
          label: _ctx.$t("navigation.back_orders"),
          to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()("dashboard-orders"),
          "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
          color: "neutral",
          variant: "link"
        }, null, _parent));
        _push(`</section><section class="max-w-2xl">`);
        _push(ssrRenderComponent(_component_UForm, { onSubmit: submitOrder }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(orderPayload).custom_data, (field, index) => {
                _push2(`<!--[-->`);
                if (unref(orderPayload).custom_data?.[index]) {
                  _push2(ssrRenderComponent(_component_InputServiceField, {
                    modelValue: unref(orderPayload).custom_data[index].value,
                    "onUpdate:modelValue": ($event) => unref(orderPayload).custom_data[index].value = $event,
                    field
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_component_UFormField, {
                description: _ctx.$t("services.messages.order_attachments"),
                label: _ctx.$t("services.labels.order_attachments"),
                size: "xl"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UFileUpload, {
                      modelValue: unref(orderPayload).attachments,
                      "onUpdate:modelValue": ($event) => unref(orderPayload).attachments = $event,
                      multiple: "",
                      layout: "list"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UFileUpload, {
                        modelValue: unref(orderPayload).attachments,
                        "onUpdate:modelValue": ($event) => unref(orderPayload).attachments = $event,
                        multiple: "",
                        layout: "list"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(service).user_pricing) {
                _push2(ssrRenderComponent(_component_UFormField, {
                  description: _ctx.$t("services.messages.order_price"),
                  label: _ctx.$t("services.labels.order_price"),
                  required: "",
                  size: "xl"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UFieldGroup, { class: "w-full" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UInputNumber, {
                              modelValue: unref(orderPayload).user_amount_irt,
                              "onUpdate:modelValue": ($event) => unref(orderPayload).user_amount_irt = $event,
                              decrement: false,
                              increment: false,
                              max: Number(unref(service).max_amount),
                              min: Number(unref(service).min_amount),
                              placeholder: _ctx.$t("services.labels.order_price"),
                              class: "w-full",
                              dir: "ltr",
                              required: ""
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UBadge, {
                              label: _ctx.$t("common.currencies.text.toman"),
                              color: "neutral"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UInputNumber, {
                                modelValue: unref(orderPayload).user_amount_irt,
                                "onUpdate:modelValue": ($event) => unref(orderPayload).user_amount_irt = $event,
                                decrement: false,
                                increment: false,
                                max: Number(unref(service).max_amount),
                                min: Number(unref(service).min_amount),
                                placeholder: _ctx.$t("services.labels.order_price"),
                                class: "w-full",
                                dir: "ltr",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "placeholder"]),
                              createVNode(_component_UBadge, {
                                label: _ctx.$t("common.currencies.text.toman"),
                                color: "neutral"
                              }, null, 8, ["label"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UFieldGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_UInputNumber, {
                              modelValue: unref(orderPayload).user_amount_irt,
                              "onUpdate:modelValue": ($event) => unref(orderPayload).user_amount_irt = $event,
                              decrement: false,
                              increment: false,
                              max: Number(unref(service).max_amount),
                              min: Number(unref(service).min_amount),
                              placeholder: _ctx.$t("services.labels.order_price"),
                              class: "w-full",
                              dir: "ltr",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "placeholder"]),
                            createVNode(_component_UBadge, {
                              label: _ctx.$t("common.currencies.text.toman"),
                              color: "neutral"
                            }, null, 8, ["label"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="rounded-lg border border-accented bg-ui-highlight p-6 space-y-4"${_scopeId}><h3 class="font-semibold text-lg"${_scopeId}>${ssrInterpolate(_ctx.$t("orders.labels.payment_summary"))}</h3><div class="space-y-2 text-sm"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.labels.base_amount"))}</span><span class="font-medium" dir="ltr"${_scopeId}>${ssrInterpolate(formatIRT(unref(userAmount)))}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.labels.commission"))} (${ssrInterpolate(unref(commissionShow))})</span><span class="font-medium" dir="ltr"${_scopeId}>${ssrInterpolate(formatIRT(unref(commissionAmount)))}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.labels.tax"))} (${ssrInterpolate(unref(taxShow))})</span><span class="font-medium" dir="ltr"${_scopeId}>${ssrInterpolate(formatIRT(unref(taxAmount)))}</span></div>`);
              _push2(ssrRenderComponent(_component_USeparator, null, null, _parent2, _scopeId));
              _push2(`<div class="flex justify-between text-base font-bold"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("orders.labels.total_payable"))}</span><span class="text-primary" dir="ltr"${_scopeId}>${ssrInterpolate(formatIRT(unref(totalPayable)))}</span></div></div></div><div class="flex justify-end pt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                disabled: unref(loading) || !unref(isFormValid),
                loading: unref(loading),
                color: "primary",
                size: "xl",
                "trailing-icon": "material-symbols:credit-card",
                type: "submit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("orders.labels.pay_and_submit"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("orders.labels.pay_and_submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(orderPayload).custom_data, (field, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      unref(orderPayload).custom_data?.[index] ? (openBlock(), createBlock(_component_InputServiceField, {
                        key: 0,
                        modelValue: unref(orderPayload).custom_data[index].value,
                        "onUpdate:modelValue": ($event) => unref(orderPayload).custom_data[index].value = $event,
                        field
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "field"])) : createCommentVNode("", true)
                    ], 64);
                  }), 128)),
                  createVNode(_component_UFormField, {
                    description: _ctx.$t("services.messages.order_attachments"),
                    label: _ctx.$t("services.labels.order_attachments"),
                    size: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UFileUpload, {
                        modelValue: unref(orderPayload).attachments,
                        "onUpdate:modelValue": ($event) => unref(orderPayload).attachments = $event,
                        multiple: "",
                        layout: "list"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 8, ["description", "label"]),
                  unref(service).user_pricing ? (openBlock(), createBlock(_component_UFormField, {
                    key: 0,
                    description: _ctx.$t("services.messages.order_price"),
                    label: _ctx.$t("services.labels.order_price"),
                    required: "",
                    size: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UFieldGroup, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_UInputNumber, {
                            modelValue: unref(orderPayload).user_amount_irt,
                            "onUpdate:modelValue": ($event) => unref(orderPayload).user_amount_irt = $event,
                            decrement: false,
                            increment: false,
                            max: Number(unref(service).max_amount),
                            min: Number(unref(service).min_amount),
                            placeholder: _ctx.$t("services.labels.order_price"),
                            class: "w-full",
                            dir: "ltr",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "min", "placeholder"]),
                          createVNode(_component_UBadge, {
                            label: _ctx.$t("common.currencies.text.toman"),
                            color: "neutral"
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["description", "label"])) : createCommentVNode("", true),
                  createVNode("div", { class: "rounded-lg border border-accented bg-ui-highlight p-6 space-y-4" }, [
                    createVNode("h3", { class: "font-semibold text-lg" }, toDisplayString(_ctx.$t("orders.labels.payment_summary")), 1),
                    createVNode("div", { class: "space-y-2 text-sm" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, toDisplayString(_ctx.$t("orders.labels.base_amount")), 1),
                        createVNode("span", {
                          class: "font-medium",
                          dir: "ltr"
                        }, toDisplayString(formatIRT(unref(userAmount))), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, toDisplayString(_ctx.$t("orders.labels.commission")) + " (" + toDisplayString(unref(commissionShow)) + ")", 1),
                        createVNode("span", {
                          class: "font-medium",
                          dir: "ltr"
                        }, toDisplayString(formatIRT(unref(commissionAmount))), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, toDisplayString(_ctx.$t("orders.labels.tax")) + " (" + toDisplayString(unref(taxShow)) + ")", 1),
                        createVNode("span", {
                          class: "font-medium",
                          dir: "ltr"
                        }, toDisplayString(formatIRT(unref(taxAmount))), 1)
                      ]),
                      createVNode(_component_USeparator),
                      createVNode("div", { class: "flex justify-between text-base font-bold" }, [
                        createVNode("span", null, toDisplayString(_ctx.$t("orders.labels.total_payable")), 1),
                        createVNode("span", {
                          class: "text-primary",
                          dir: "ltr"
                        }, toDisplayString(formatIRT(unref(totalPayable))), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end pt-4" }, [
                    createVNode(_component_UButton, {
                      disabled: unref(loading) || !unref(isFormValid),
                      loading: unref(loading),
                      color: "primary",
                      size: "xl",
                      "trailing-icon": "material-symbols:credit-card",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("orders.labels.pay_and_submit")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "loading"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/orders/new-[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-_id_-Bbp4nQNF.mjs.map
