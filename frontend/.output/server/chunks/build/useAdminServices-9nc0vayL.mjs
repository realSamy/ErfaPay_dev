import { _ as _sfc_main$3 } from './Form-DbM-gQaT.mjs';
import { y as useAuthApi, r as _sfc_main$d, s as _sfc_main$c, _ as _sfc_main$l, I as _sfc_main$5$1, G as _sfc_main$7$1, h as _sfc_main$q, b as useI18n, H as _sfc_main$e, g as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$4 } from './Textarea-C6RFyJZc.mjs';
import { _ as _sfc_main$5 } from './Select-BkNBr6Bu.mjs';
import { _ as _sfc_main$6 } from './InputNumber-LtvFKiY6.mjs';
import { _ as _sfc_main$8 } from './FieldGroup-bZqqUUeP.mjs';
import { ref, defineComponent, toRaw, computed, watch, mergeProps, unref, withCtx, createVNode, isRef, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$7 } from './FileUpload-DYR6EaNq.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    size: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedIcon = computed({
      get: () => props.modelValue || "",
      set: (val) => emit("update:modelValue", val)
    });
    const items = ref([
      "material-symbols:finance-chip-outline",
      "material-symbols:finance-mode-rounded",
      "material-symbols:finance-rounded",
      "material-symbols:encrypted-rounded",
      "material-symbols:send-money-rounded",
      "material-symbols:attach-money-rounded",
      "material-symbols:payments-rounded",
      "material-symbols:currency-exchange-rounded",
      "material-symbols:receipt-rounded",
      "material-symbols:currency-bitcoin-rounded",
      "material-symbols:admin-panel-settings-rounded",
      "material-symbols:support-agent-rounded",
      "material-symbols:shopping-cart-rounded",
      "material-symbols:savings-rounded",
      "material-symbols:transfer-within-a-station-rounded",
      "material-symbols:request-quote-rounded",
      "material-symbols:description-rounded",
      "material-symbols:euro-symbol-rounded",
      "material-symbols:currency-pound-rounded",
      "material-symbols:trending-up-rounded",
      "material-symbols:local-atm-rounded",
      "material-symbols:money-rounded",
      "material-symbols:local-taxi-rounded",
      "material-symbols:local-shipping-rounded",
      "material-symbols:local-dining-rounded",
      "material-symbols:local-bar-rounded",
      "material-symbols:local-car-wash-rounded"
    ]);
    function onCreate(item) {
      items.value.push(item);
      selectedIcon.value = item;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFieldGroup = _sfc_main$8;
      const _component_USelectMenu = _sfc_main$7$1;
      const _component_UIcon = _sfc_main$q;
      _push(ssrRenderComponent(_component_UFieldGroup, mergeProps({
        label: __props.label,
        size: __props.size
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: unref(selectedIcon),
              "onUpdate:modelValue": ($event) => isRef(selectedIcon) ? selectedIcon.value = $event : null,
              icon: unref(selectedIcon),
              items: unref(items),
              ui: { group: "flex flex-wrap", item: "w-auto" },
              class: "w-full",
              "create-item": "",
              placeholder: "جستجو و انتخاب نماد...",
              onCreate
            }, {
              item: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: item,
                    size: "40"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: item,
                      size: "40"
                    }, null, 8, ["name"])
                  ];
                }
              }),
              "create-item-label": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: item,
                    size: "40"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: item,
                      size: "40"
                    }, null, 8, ["name"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: unref(selectedIcon),
                "onUpdate:modelValue": ($event) => isRef(selectedIcon) ? selectedIcon.value = $event : null,
                icon: unref(selectedIcon),
                items: unref(items),
                ui: { group: "flex flex-wrap", item: "w-auto" },
                class: "w-full",
                "create-item": "",
                placeholder: "جستجو و انتخاب نماد...",
                onCreate
              }, {
                item: withCtx(({ item }) => [
                  createVNode(_component_UIcon, {
                    name: item,
                    size: "40"
                  }, null, 8, ["name"])
                ]),
                "create-item-label": withCtx(({ item }) => [
                  createVNode(_component_UIcon, {
                    name: item,
                    size: "40"
                  }, null, 8, ["name"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "icon", "items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/picker/Icon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$2, { __name: "PickerIcon" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RequiredField",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue", "delete"],
  setup(__props, { emit: __emit }) {
    const { t: $t } = useI18n();
    const props = __props;
    const emit = __emit;
    const incomplete = computed(() => {
      return !props.modelValue.label_fa || !props.modelValue.label_en;
    });
    const { t } = useI18n();
    const isOpen = ref(false);
    const localField = ref(JSON.parse(JSON.stringify(toRaw(props.modelValue))));
    const optionsText = ref("");
    const typeIcons = {
      text: "material-symbols:edit-outline",
      number: "material-symbols:numbers-rounded",
      textarea: "material-symbols:text-ad",
      file: "material-symbols:upload-file",
      select: "material-symbols:list-alt"
    };
    const typeOptions = [
      { value: "text", label: t("common.field_types.text") },
      { value: "number", label: t("common.field_types.number") },
      { value: "textarea", label: t("common.field_types.textarea") },
      // {value: 'file', label: t('common.field_types.file')},
      { value: "select", label: t("common.field_types.select") }
    ];
    const buttonLabel = computed(() => {
      return props.modelValue.label_fa || props.modelValue.label_en || $t("modals.required_fields.unnamed");
    });
    watch(() => props.modelValue, (newVal) => {
      localField.value = toRaw(newVal);
      if (localField.value.options) {
        optionsText.value = localField.value.options.join("\n");
      }
    }, { deep: true });
    watch(isOpen, () => {
      localField.value = JSON.parse(JSON.stringify(toRaw(props.modelValue)));
      if (localField.value.options) {
        optionsText.value = localField.value.options.join("\n");
      } else {
        optionsText.value = "";
      }
    });
    watch(optionsText, (newVal) => {
      localField.value.options = newVal.split("\n").filter((opt) => opt.trim());
    });
    const handleSave = () => {
      emit("update:modelValue", localField.value);
      isOpen.value = false;
    };
    const handleClose = () => {
      if (incomplete.value) {
        return handleDelete();
      }
      isOpen.value = false;
    };
    const handleDelete = () => {
      emit("delete");
      isOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UButton = _sfc_main$l;
      const _component_UForm = _sfc_main$3;
      const _component_UCard = _sfc_main$2$1;
      const _component_UFormField = _sfc_main$d;
      const _component_USelect = _sfc_main$5;
      const _component_UInput = _sfc_main$c;
      const _component_UTextarea = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5$1;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        description: unref($t)("modals.required_fields.title"),
        dismissible: false,
        title: unref($t)("modals.required_fields.title"),
        transition: ""
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              ref: "form",
              onSubmit: handleSave
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCard, null, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-between items-center"${_scopeId3}><h3${_scopeId3}>${ssrInterpolate(unref($t)("modals.required_fields.title"))}</h3>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          class: "-mr-2",
                          color: "neutral",
                          icon: "i-heroicons-x-mark-20-solid",
                          variant: "ghost",
                          onClick: handleClose
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("h3", null, toDisplayString(unref($t)("modals.required_fields.title")), 1),
                            createVNode(_component_UButton, {
                              class: "-mr-2",
                              color: "neutral",
                              icon: "i-heroicons-x-mark-20-solid",
                              variant: "ghost",
                              onClick: handleClose
                            })
                          ])
                        ];
                      }
                    }),
                    footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-between"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          label: unref($t)("common.labels.delete"),
                          color: "error",
                          size: "lg",
                          variant: "outline",
                          onClick: handleDelete
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="flex gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          label: unref($t)("common.labels.cancel"),
                          color: "neutral",
                          size: "lg",
                          variant: "outline",
                          onClick: handleClose
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          label: unref($t)("common.labels.save"),
                          size: "lg",
                          type: "submit"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode(_component_UButton, {
                              label: unref($t)("common.labels.delete"),
                              color: "error",
                              size: "lg",
                              variant: "outline",
                              onClick: handleDelete
                            }, null, 8, ["label"]),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(_component_UButton, {
                                label: unref($t)("common.labels.cancel"),
                                color: "neutral",
                                size: "lg",
                                variant: "outline",
                                onClick: handleClose
                              }, null, 8, ["label"]),
                              createVNode(_component_UButton, {
                                label: unref($t)("common.labels.save"),
                                size: "lg",
                                type: "submit"
                              }, null, 8, ["label"])
                            ])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: unref($t)("modals.required_fields.type"),
                          name: "type",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(localField).type,
                                "onUpdate:modelValue": ($event) => unref(localField).type = $event,
                                items: typeOptions,
                                class: "w-full"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(localField).type,
                                  "onUpdate:modelValue": ($event) => unref(localField).type = $event,
                                  items: typeOptions,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: unref($t)("modals.required_fields.label_fa"),
                          name: "label_fa",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(localField).label_fa,
                                "onUpdate:modelValue": ($event) => unref(localField).label_fa = $event,
                                class: "w-full",
                                required: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(localField).label_fa,
                                  "onUpdate:modelValue": ($event) => unref(localField).label_fa = $event,
                                  class: "w-full",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: unref($t)("modals.required_fields.label_en"),
                          name: "label_en",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(localField).label_en,
                                "onUpdate:modelValue": ($event) => unref(localField).label_en = $event,
                                class: "w-full",
                                required: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(localField).label_en,
                                  "onUpdate:modelValue": ($event) => unref(localField).label_en = $event,
                                  class: "w-full",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: unref($t)("modals.required_fields.description_fa"),
                          name: "description_fa",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UTextarea, {
                                modelValue: unref(localField).description_fa,
                                "onUpdate:modelValue": ($event) => unref(localField).description_fa = $event,
                                class: "w-full"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(localField).description_fa,
                                  "onUpdate:modelValue": ($event) => unref(localField).description_fa = $event,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: unref($t)("modals.required_fields.description_en"),
                          name: "description_en",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UTextarea, {
                                modelValue: unref(localField).description_en,
                                "onUpdate:modelValue": ($event) => unref(localField).description_en = $event,
                                class: "w-full"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(localField).description_en,
                                  "onUpdate:modelValue": ($event) => unref(localField).description_en = $event,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(localField).type === "select") {
                          _push4(ssrRenderComponent(_component_UFormField, {
                            label: unref($t)("modals.required_fields.options"),
                            name: "options",
                            required: "",
                            size: "lg"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UTextarea, {
                                  modelValue: unref(optionsText),
                                  "onUpdate:modelValue": ($event) => isRef(optionsText) ? optionsText.value = $event : null,
                                  placeholder: unref($t)("modals.required_fields.options_placeholder"),
                                  class: "w-full",
                                  required: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UTextarea, {
                                    modelValue: unref(optionsText),
                                    "onUpdate:modelValue": ($event) => isRef(optionsText) ? optionsText.value = $event : null,
                                    placeholder: unref($t)("modals.required_fields.options_placeholder"),
                                    class: "w-full",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_UFormField, {
                          name: "is_required",
                          size: "lg"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UCheckbox, {
                                modelValue: unref(localField).is_required,
                                "onUpdate:modelValue": ($event) => unref(localField).is_required = $event,
                                label: unref($t)("modals.required_fields.is_required"),
                                class: "cursor-pointer",
                                variant: "card"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(localField).is_required,
                                  "onUpdate:modelValue": ($event) => unref(localField).is_required = $event,
                                  label: unref($t)("modals.required_fields.is_required"),
                                  class: "cursor-pointer",
                                  variant: "card"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode(_component_UFormField, {
                              label: unref($t)("modals.required_fields.type"),
                              name: "type",
                              required: "",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelect, {
                                  modelValue: unref(localField).type,
                                  "onUpdate:modelValue": ($event) => unref(localField).type = $event,
                                  items: typeOptions,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            createVNode(_component_UFormField, {
                              label: unref($t)("modals.required_fields.label_fa"),
                              name: "label_fa",
                              required: "",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(localField).label_fa,
                                  "onUpdate:modelValue": ($event) => unref(localField).label_fa = $event,
                                  class: "w-full",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            createVNode(_component_UFormField, {
                              label: unref($t)("modals.required_fields.label_en"),
                              name: "label_en",
                              required: "",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(localField).label_en,
                                  "onUpdate:modelValue": ($event) => unref(localField).label_en = $event,
                                  class: "w-full",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            createVNode(_component_UFormField, {
                              label: unref($t)("modals.required_fields.description_fa"),
                              name: "description_fa",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(localField).description_fa,
                                  "onUpdate:modelValue": ($event) => unref(localField).description_fa = $event,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            createVNode(_component_UFormField, {
                              label: unref($t)("modals.required_fields.description_en"),
                              name: "description_en",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(localField).description_en,
                                  "onUpdate:modelValue": ($event) => unref(localField).description_en = $event,
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }, 8, ["label"]),
                            unref(localField).type === "select" ? (openBlock(), createBlock(_component_UFormField, {
                              key: 0,
                              label: unref($t)("modals.required_fields.options"),
                              name: "options",
                              required: "",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(optionsText),
                                  "onUpdate:modelValue": ($event) => isRef(optionsText) ? optionsText.value = $event : null,
                                  placeholder: unref($t)("modals.required_fields.options_placeholder"),
                                  class: "w-full",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                              ]),
                              _: 1
                            }, 8, ["label"])) : createCommentVNode("", true),
                            createVNode(_component_UFormField, {
                              name: "is_required",
                              size: "lg"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(localField).is_required,
                                  "onUpdate:modelValue": ($event) => unref(localField).is_required = $event,
                                  label: unref($t)("modals.required_fields.is_required"),
                                  class: "cursor-pointer",
                                  variant: "card"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCard, null, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("h3", null, toDisplayString(unref($t)("modals.required_fields.title")), 1),
                          createVNode(_component_UButton, {
                            class: "-mr-2",
                            color: "neutral",
                            icon: "i-heroicons-x-mark-20-solid",
                            variant: "ghost",
                            onClick: handleClose
                          })
                        ])
                      ]),
                      footer: withCtx(() => [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode(_component_UButton, {
                            label: unref($t)("common.labels.delete"),
                            color: "error",
                            size: "lg",
                            variant: "outline",
                            onClick: handleDelete
                          }, null, 8, ["label"]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(_component_UButton, {
                              label: unref($t)("common.labels.cancel"),
                              color: "neutral",
                              size: "lg",
                              variant: "outline",
                              onClick: handleClose
                            }, null, 8, ["label"]),
                            createVNode(_component_UButton, {
                              label: unref($t)("common.labels.save"),
                              size: "lg",
                              type: "submit"
                            }, null, 8, ["label"])
                          ])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_component_UFormField, {
                            label: unref($t)("modals.required_fields.type"),
                            name: "type",
                            required: "",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_USelect, {
                                modelValue: unref(localField).type,
                                "onUpdate:modelValue": ($event) => unref(localField).type = $event,
                                items: typeOptions,
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          createVNode(_component_UFormField, {
                            label: unref($t)("modals.required_fields.label_fa"),
                            name: "label_fa",
                            required: "",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(localField).label_fa,
                                "onUpdate:modelValue": ($event) => unref(localField).label_fa = $event,
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          createVNode(_component_UFormField, {
                            label: unref($t)("modals.required_fields.label_en"),
                            name: "label_en",
                            required: "",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(localField).label_en,
                                "onUpdate:modelValue": ($event) => unref(localField).label_en = $event,
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          createVNode(_component_UFormField, {
                            label: unref($t)("modals.required_fields.description_fa"),
                            name: "description_fa",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UTextarea, {
                                modelValue: unref(localField).description_fa,
                                "onUpdate:modelValue": ($event) => unref(localField).description_fa = $event,
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          createVNode(_component_UFormField, {
                            label: unref($t)("modals.required_fields.description_en"),
                            name: "description_en",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UTextarea, {
                                modelValue: unref(localField).description_en,
                                "onUpdate:modelValue": ($event) => unref(localField).description_en = $event,
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }, 8, ["label"]),
                          unref(localField).type === "select" ? (openBlock(), createBlock(_component_UFormField, {
                            key: 0,
                            label: unref($t)("modals.required_fields.options"),
                            name: "options",
                            required: "",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UTextarea, {
                                modelValue: unref(optionsText),
                                "onUpdate:modelValue": ($event) => isRef(optionsText) ? optionsText.value = $event : null,
                                placeholder: unref($t)("modals.required_fields.options_placeholder"),
                                class: "w-full",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                            ]),
                            _: 1
                          }, 8, ["label"])) : createCommentVNode("", true),
                          createVNode(_component_UFormField, {
                            name: "is_required",
                            size: "lg"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UCheckbox, {
                                modelValue: unref(localField).is_required,
                                "onUpdate:modelValue": ($event) => unref(localField).is_required = $event,
                                label: unref($t)("modals.required_fields.is_required"),
                                class: "cursor-pointer",
                                variant: "card"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                ref: "form",
                onSubmit: withModifiers(handleSave, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_UCard, null, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("h3", null, toDisplayString(unref($t)("modals.required_fields.title")), 1),
                        createVNode(_component_UButton, {
                          class: "-mr-2",
                          color: "neutral",
                          icon: "i-heroicons-x-mark-20-solid",
                          variant: "ghost",
                          onClick: handleClose
                        })
                      ])
                    ]),
                    footer: withCtx(() => [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode(_component_UButton, {
                          label: unref($t)("common.labels.delete"),
                          color: "error",
                          size: "lg",
                          variant: "outline",
                          onClick: handleDelete
                        }, null, 8, ["label"]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_UButton, {
                            label: unref($t)("common.labels.cancel"),
                            color: "neutral",
                            size: "lg",
                            variant: "outline",
                            onClick: handleClose
                          }, null, 8, ["label"]),
                          createVNode(_component_UButton, {
                            label: unref($t)("common.labels.save"),
                            size: "lg",
                            type: "submit"
                          }, null, 8, ["label"])
                        ])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode(_component_UFormField, {
                          label: unref($t)("modals.required_fields.type"),
                          name: "type",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_USelect, {
                              modelValue: unref(localField).type,
                              "onUpdate:modelValue": ($event) => unref(localField).type = $event,
                              items: typeOptions,
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: unref($t)("modals.required_fields.label_fa"),
                          name: "label_fa",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(localField).label_fa,
                              "onUpdate:modelValue": ($event) => unref(localField).label_fa = $event,
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: unref($t)("modals.required_fields.label_en"),
                          name: "label_en",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(localField).label_en,
                              "onUpdate:modelValue": ($event) => unref(localField).label_en = $event,
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: unref($t)("modals.required_fields.description_fa"),
                          name: "description_fa",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(localField).description_fa,
                              "onUpdate:modelValue": ($event) => unref(localField).description_fa = $event,
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        createVNode(_component_UFormField, {
                          label: unref($t)("modals.required_fields.description_en"),
                          name: "description_en",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(localField).description_en,
                              "onUpdate:modelValue": ($event) => unref(localField).description_en = $event,
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }, 8, ["label"]),
                        unref(localField).type === "select" ? (openBlock(), createBlock(_component_UFormField, {
                          key: 0,
                          label: unref($t)("modals.required_fields.options"),
                          name: "options",
                          required: "",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UTextarea, {
                              modelValue: unref(optionsText),
                              "onUpdate:modelValue": ($event) => isRef(optionsText) ? optionsText.value = $event : null,
                              placeholder: unref($t)("modals.required_fields.options_placeholder"),
                              class: "w-full",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                          ]),
                          _: 1
                        }, 8, ["label"])) : createCommentVNode("", true),
                        createVNode(_component_UFormField, {
                          name: "is_required",
                          size: "lg"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UCheckbox, {
                              modelValue: unref(localField).is_required,
                              "onUpdate:modelValue": ($event) => unref(localField).is_required = $event,
                              label: unref($t)("modals.required_fields.is_required"),
                              class: "cursor-pointer",
                              variant: "card"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 512)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: typeIcons[__props.modelValue.type] || "material-symbols:indeterminate-question-box",
              class: "mb-2",
              color: "neutral",
              variant: "outline",
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="font-bold"${_scopeId2}>[${ssrInterpolate(unref($t)(`common.field_types.${props.modelValue.type}`))}]</span><span class="${ssrRenderClass({ "text-error": unref(incomplete) })}"${_scopeId2}>${ssrInterpolate(unref(buttonLabel))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "font-bold" }, "[" + toDisplayString(unref($t)(`common.field_types.${props.modelValue.type}`)) + "]", 1),
                    createVNode("span", {
                      class: { "text-error": unref(incomplete) }
                    }, toDisplayString(unref(buttonLabel)), 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: typeIcons[__props.modelValue.type] || "material-symbols:indeterminate-question-box",
                class: "mb-2",
                color: "neutral",
                variant: "outline",
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "font-bold" }, "[" + toDisplayString(unref($t)(`common.field_types.${props.modelValue.type}`)) + "]", 1),
                  createVNode("span", {
                    class: { "text-error": unref(incomplete) }
                  }, toDisplayString(unref(buttonLabel)), 3)
                ]),
                _: 1
              }, 8, ["icon"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/RequiredField.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "ModalRequiredField" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Service",
  __ssrInlineRender: true,
  props: {
    payload: {},
    existingService: {},
    pending: { type: Boolean },
    isEdit: { type: Boolean }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localPayload = ref(JSON.parse(JSON.stringify(toRaw(props.payload))));
    const existingBanner = computed(() => props.existingService?.banner || null);
    const commissionTypes = [
      { label: "درصدی", value: "percent" },
      { label: "مقداری ثابت", value: "fixed" }
    ];
    const commissionValue = computed({
      get() {
        return localPayload.value.commission_type === "percent" ? Number(localPayload.value.commission_percent) : Number(localPayload.value.commission_fixed);
      },
      set(val) {
        if (localPayload.value.commission_type === "percent") {
          localPayload.value.commission_percent = val.toFixed(2);
        } else {
          localPayload.value.commission_fixed = val;
        }
      }
    });
    watch(() => localPayload.value.commission_type, (newVal) => {
      if (newVal === "percent") {
        localPayload.value.user_pricing = true;
      }
    });
    const addNewField = () => {
      localPayload.value.required_fields ??= [];
      localPayload.value.required_fields.push({
        type: "text",
        label_fa: "",
        label_en: "",
        description_fa: "",
        description_en: "",
        is_required: true,
        options: []
      });
    };
    const handleDeleteField = (index) => {
      localPayload.value.required_fields?.splice(index, 1);
    };
    const handleSubmit = () => {
      emit("submit", localPayload.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = _sfc_main$3;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_UTextarea = _sfc_main$4;
      const _component_USelect = _sfc_main$5;
      const _component_UInputNumber = _sfc_main$6;
      const _component_PickerIcon = __nuxt_component_6;
      const _component_UFileUpload = _sfc_main$7;
      const _component_UButton = _sfc_main$l;
      const _component_UCheckbox = _sfc_main$5$1;
      const _component_ModalRequiredField = __nuxt_component_10;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "page-section" }, _attrs))}><h2 class="font-bold text-2xl mb-8">${ssrInterpolate(__props.isEdit ? "ویرایش سرویس" : "ایجاد سرویس جدید")}</h2>`);
      _push(ssrRenderComponent(_component_UForm, {
        state: unref(localPayload),
        class: "max-w-4xl space-y-8",
        onSubmit: handleSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "عنوان سرویس",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(localPayload).title_fa,
                    "onUpdate:modelValue": ($event) => unref(localPayload).title_fa = $event,
                    dir: "rtl",
                    icon: "i-heroicons-language",
                    placeholder: "عنوان به فارسی (مثلاً: پرداخت قبض)",
                    required: "",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(localPayload).title_en,
                    "onUpdate:modelValue": ($event) => unref(localPayload).title_en = $event,
                    dir: "ltr",
                    placeholder: "Title in English (optional)",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(localPayload).title_fa,
                        "onUpdate:modelValue": ($event) => unref(localPayload).title_fa = $event,
                        dir: "rtl",
                        icon: "i-heroicons-language",
                        placeholder: "عنوان به فارسی (مثلاً: پرداخت قبض)",
                        required: "",
                        size: "xl"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UInput, {
                        modelValue: unref(localPayload).title_en,
                        "onUpdate:modelValue": ($event) => unref(localPayload).title_en = $event,
                        dir: "ltr",
                        placeholder: "Title in English (optional)",
                        size: "xl"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "توضیحات سرویس",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(localPayload).description_fa,
                    "onUpdate:modelValue": ($event) => unref(localPayload).description_fa = $event,
                    rows: 5,
                    dir: "rtl",
                    placeholder: "توضیحات کامل به فارسی...",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: unref(localPayload).description_en,
                    "onUpdate:modelValue": ($event) => unref(localPayload).description_en = $event,
                    rows: 5,
                    dir: "ltr",
                    placeholder: "Description in English (optional)"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode(_component_UTextarea, {
                        modelValue: unref(localPayload).description_fa,
                        "onUpdate:modelValue": ($event) => unref(localPayload).description_fa = $event,
                        rows: 5,
                        dir: "rtl",
                        placeholder: "توضیحات کامل به فارسی...",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UTextarea, {
                        modelValue: unref(localPayload).description_en,
                        "onUpdate:modelValue": ($event) => unref(localPayload).description_en = $event,
                        rows: 5,
                        dir: "ltr",
                        placeholder: "Description in English (optional)"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "نوع کارمزد",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(localPayload).commission_type,
                    "onUpdate:modelValue": ($event) => unref(localPayload).commission_type = $event,
                    items: commissionTypes,
                    size: "lg"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(localPayload).commission_type,
                      "onUpdate:modelValue": ($event) => unref(localPayload).commission_type = $event,
                      items: commissionTypes,
                      size: "lg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref(localPayload).commission_type === "percent" ? "درصد کارمزد (%)" : "کارمزد ثابت (تومان)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInputNumber, {
                    modelValue: unref(commissionValue),
                    "onUpdate:modelValue": ($event) => isRef(commissionValue) ? commissionValue.value = $event : null,
                    "format-options": unref(localPayload).commission_type === "percent" ? { style: "percent", minimumFractionDigits: 2 } : void 0,
                    max: unref(localPayload).commission_type === "percent" ? 1 : void 0,
                    min: 0,
                    step: unref(localPayload).commission_type === "percent" ? 1e-4 : 1e3,
                    required: "",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(commissionValue),
                      "onUpdate:modelValue": ($event) => isRef(commissionValue) ? commissionValue.value = $event : null,
                      "format-options": unref(localPayload).commission_type === "percent" ? { style: "percent", minimumFractionDigits: 2 } : void 0,
                      max: unref(localPayload).commission_type === "percent" ? 1 : void 0,
                      min: 0,
                      step: unref(localPayload).commission_type === "percent" ? 1e-4 : 1e3,
                      required: "",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "format-options", "max", "step"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "مالیات (%)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInputNumber, {
                    modelValue: unref(localPayload).tax_rate,
                    "onUpdate:modelValue": ($event) => unref(localPayload).tax_rate = $event,
                    "format-options": { style: "percent", minimumFractionDigits: 2 },
                    max: 1,
                    min: 0,
                    step: 0.01,
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).tax_rate,
                      "onUpdate:modelValue": ($event) => unref(localPayload).tax_rate = $event,
                      "format-options": { style: "percent", minimumFractionDigits: 2 },
                      max: 1,
                      min: 0,
                      step: 0.01,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "حداقل مبلغ (تومان)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInputNumber, {
                    modelValue: unref(localPayload).min_amount,
                    "onUpdate:modelValue": ($event) => unref(localPayload).min_amount = $event,
                    min: 1e3,
                    step: 1e4,
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).min_amount,
                      "onUpdate:modelValue": ($event) => unref(localPayload).min_amount = $event,
                      min: 1e3,
                      step: 1e4,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "حداکثر مبلغ (تومان)",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInputNumber, {
                    modelValue: unref(localPayload).max_amount,
                    "onUpdate:modelValue": ($event) => unref(localPayload).max_amount = $event,
                    min: 1e5,
                    step: 1e4,
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).max_amount,
                      "onUpdate:modelValue": ($event) => unref(localPayload).max_amount = $event,
                      min: 1e5,
                      step: 1e4,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "نماد سرویس",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_PickerIcon, {
                    modelValue: unref(localPayload).icon,
                    "onUpdate:modelValue": ($event) => unref(localPayload).icon = $event,
                    "max-size": 5 * 1024 * 1024,
                    accept: "image/*",
                    description: "حداکثر ۵ مگابایت",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_PickerIcon, {
                      modelValue: unref(localPayload).icon,
                      "onUpdate:modelValue": ($event) => unref(localPayload).icon = $event,
                      "max-size": 5 * 1024 * 1024,
                      accept: "image/*",
                      description: "حداکثر ۵ مگابایت",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "تصویر بنر",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4 items-start w-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFileUpload, {
                    modelValue: unref(localPayload).banner,
                    "onUpdate:modelValue": ($event) => unref(localPayload).banner = $event,
                    "max-size": 10 * 1024 * 1024,
                    accept: "image/*",
                    class: "flex-1",
                    description: "حداکثر ۱۰ مگابایت",
                    size: "xl"
                  }, null, _parent3, _scopeId2));
                  if (!unref(localPayload).banner && unref(existingBanner)) {
                    _push3(`<img${ssrRenderAttr("src", unref(existingBanner))} alt="Current banner" class="w-32 h-32 object-cover rounded-lg border"${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4 items-start w-full" }, [
                      createVNode(_component_UFileUpload, {
                        modelValue: unref(localPayload).banner,
                        "onUpdate:modelValue": ($event) => unref(localPayload).banner = $event,
                        "max-size": 10 * 1024 * 1024,
                        accept: "image/*",
                        class: "flex-1",
                        description: "حداکثر ۱۰ مگابایت",
                        size: "xl"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      !unref(localPayload).banner && unref(existingBanner) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: unref(existingBanner),
                        alt: "Current banner",
                        class: "w-32 h-32 object-cover rounded-lg border"
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: _ctx.$t("common.titles.required_fields")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: _ctx.$t("common.labels.add"),
                    size: "xl",
                    "trailing-icon": "material-symbols:add",
                    onClick: addNewField
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      label: _ctx.$t("common.labels.add"),
                      size: "xl",
                      "trailing-icon": "material-symbols:add",
                      onClick: addNewField
                    }, null, 8, ["label"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="inline-flex gap-2 flex-wrap"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(localPayload).user_pricing,
              "onUpdate:modelValue": ($event) => unref(localPayload).user_pricing = $event,
              description: _ctx.$t("services.messages.user_pricing"),
              disabled: unref(localPayload).commission_type === "percent",
              label: _ctx.$t("common.labels.user_pricing"),
              size: "lg",
              variant: "card"
            }, {
              description: withCtx(({ description }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><p${_scopeId2}>${ssrInterpolate(description)}</p>`);
                  if (unref(localPayload).commission_type === "percent") {
                    _push3(`<p${_scopeId2}>${ssrInterpolate(_ctx.$t("services.messages.user_pricing_forced"))}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("p", null, toDisplayString(description), 1),
                      unref(localPayload).commission_type === "percent" ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(_ctx.$t("services.messages.user_pricing_forced")), 1)) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(localPayload).required_fields, (field, index) => {
              _push2(`<!--[-->`);
              if (unref(localPayload).required_fields?.[index]) {
                _push2(ssrRenderComponent(_component_ModalRequiredField, {
                  modelValue: unref(localPayload).required_fields[index],
                  "onUpdate:modelValue": ($event) => unref(localPayload).required_fields[index] = $event,
                  onDelete: ($event) => handleDeleteField(index)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div><div class="flex justify-start pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              disabled: __props.pending,
              label: __props.isEdit ? _ctx.$t("pages.admin.labels.services.button_save") : "ایجاد سرویس جدید",
              loading: __props.pending,
              color: "primary",
              size: "xl",
              "trailing-icon": "material-symbols:save",
              type: "submit"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_UFormField, {
                label: "عنوان سرویس",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode(_component_UInput, {
                      modelValue: unref(localPayload).title_fa,
                      "onUpdate:modelValue": ($event) => unref(localPayload).title_fa = $event,
                      dir: "rtl",
                      icon: "i-heroicons-language",
                      placeholder: "عنوان به فارسی (مثلاً: پرداخت قبض)",
                      required: "",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UInput, {
                      modelValue: unref(localPayload).title_en,
                      "onUpdate:modelValue": ($event) => unref(localPayload).title_en = $event,
                      dir: "ltr",
                      placeholder: "Title in English (optional)",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UFormField, {
                label: "توضیحات سرویس",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode(_component_UTextarea, {
                      modelValue: unref(localPayload).description_fa,
                      "onUpdate:modelValue": ($event) => unref(localPayload).description_fa = $event,
                      rows: 5,
                      dir: "rtl",
                      placeholder: "توضیحات کامل به فارسی...",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UTextarea, {
                      modelValue: unref(localPayload).description_en,
                      "onUpdate:modelValue": ($event) => unref(localPayload).description_en = $event,
                      rows: 5,
                      dir: "ltr",
                      placeholder: "Description in English (optional)"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                createVNode(_component_UFormField, {
                  label: "نوع کارمزد",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_USelect, {
                      modelValue: unref(localPayload).commission_type,
                      "onUpdate:modelValue": ($event) => unref(localPayload).commission_type = $event,
                      items: commissionTypes,
                      size: "lg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: unref(localPayload).commission_type === "percent" ? "درصد کارمزد (%)" : "کارمزد ثابت (تومان)",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(commissionValue),
                      "onUpdate:modelValue": ($event) => isRef(commissionValue) ? commissionValue.value = $event : null,
                      "format-options": unref(localPayload).commission_type === "percent" ? { style: "percent", minimumFractionDigits: 2 } : void 0,
                      max: unref(localPayload).commission_type === "percent" ? 1 : void 0,
                      min: 0,
                      step: unref(localPayload).commission_type === "percent" ? 1e-4 : 1e3,
                      required: "",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "format-options", "max", "step"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                createVNode(_component_UFormField, {
                  label: "مالیات (%)",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).tax_rate,
                      "onUpdate:modelValue": ($event) => unref(localPayload).tax_rate = $event,
                      "format-options": { style: "percent", minimumFractionDigits: 2 },
                      max: 1,
                      min: 0,
                      step: 0.01,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode(_component_UFormField, {
                  label: "حداقل مبلغ (تومان)",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).min_amount,
                      "onUpdate:modelValue": ($event) => unref(localPayload).min_amount = $event,
                      min: 1e3,
                      step: 1e4,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: "حداکثر مبلغ (تومان)",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInputNumber, {
                      modelValue: unref(localPayload).max_amount,
                      "onUpdate:modelValue": ($event) => unref(localPayload).max_amount = $event,
                      min: 1e5,
                      step: 1e4,
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode(_component_UFormField, {
                  label: "نماد سرویس",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_PickerIcon, {
                      modelValue: unref(localPayload).icon,
                      "onUpdate:modelValue": ($event) => unref(localPayload).icon = $event,
                      "max-size": 5 * 1024 * 1024,
                      accept: "image/*",
                      description: "حداکثر ۵ مگابایت",
                      size: "xl"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: "تصویر بنر",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex gap-4 items-start w-full" }, [
                      createVNode(_component_UFileUpload, {
                        modelValue: unref(localPayload).banner,
                        "onUpdate:modelValue": ($event) => unref(localPayload).banner = $event,
                        "max-size": 10 * 1024 * 1024,
                        accept: "image/*",
                        class: "flex-1",
                        description: "حداکثر ۱۰ مگابایت",
                        size: "xl"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      !unref(localPayload).banner && unref(existingBanner) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: unref(existingBanner),
                        alt: "Current banner",
                        class: "w-32 h-32 object-cover rounded-lg border"
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UFormField, {
                  label: _ctx.$t("common.titles.required_fields")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      label: _ctx.$t("common.labels.add"),
                      size: "xl",
                      "trailing-icon": "material-symbols:add",
                      onClick: addNewField
                    }, null, 8, ["label"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                createVNode("div", { class: "inline-flex gap-2 flex-wrap" }, [
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(localPayload).user_pricing,
                    "onUpdate:modelValue": ($event) => unref(localPayload).user_pricing = $event,
                    description: _ctx.$t("services.messages.user_pricing"),
                    disabled: unref(localPayload).commission_type === "percent",
                    label: _ctx.$t("common.labels.user_pricing"),
                    size: "lg",
                    variant: "card"
                  }, {
                    description: withCtx(({ description }) => [
                      createVNode("div", null, [
                        createVNode("p", null, toDisplayString(description), 1),
                        unref(localPayload).commission_type === "percent" ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(_ctx.$t("services.messages.user_pricing_forced")), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "description", "disabled", "label"]),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(localPayload).required_fields, (field, index) => {
                    return openBlock(), createBlock(Fragment, null, [
                      unref(localPayload).required_fields?.[index] ? (openBlock(), createBlock(_component_ModalRequiredField, {
                        key: 0,
                        modelValue: unref(localPayload).required_fields[index],
                        "onUpdate:modelValue": ($event) => unref(localPayload).required_fields[index] = $event,
                        onDelete: ($event) => handleDeleteField(index)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onDelete"])) : createCommentVNode("", true)
                    ], 64);
                  }), 256))
                ])
              ]),
              createVNode("div", { class: "flex justify-start pt-6" }, [
                createVNode(_component_UButton, {
                  disabled: __props.pending,
                  label: __props.isEdit ? _ctx.$t("pages.admin.labels.services.button_save") : "ایجاد سرویس جدید",
                  loading: __props.pending,
                  color: "primary",
                  size: "xl",
                  "trailing-icon": "material-symbols:save",
                  type: "submit"
                }, null, 8, ["disabled", "label", "loading"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/form/admin/Service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "FormAdminService" });
const buildServiceFormData = (form) => {
  const fd = new FormData();
  const textFields = [
    // 'category',
    "title_fa",
    "title_en",
    "description_fa",
    "description_en",
    "commission_type",
    "commission_percent",
    "commission_fixed",
    "min_amount",
    "max_amount",
    "tax_rate",
    "icon",
    "delivery_time_fa",
    "delivery_time_en",
    "order"
  ];
  textFields.forEach((key) => {
    const value = form[key];
    if (value !== void 0 && value !== null && value !== "") {
      fd.append(key, String(value));
    }
  });
  if (form.requires_manual_review !== void 0) {
    fd.append("requires_manual_review", form.requires_manual_review ? "true" : "false");
  }
  if (form.is_active !== void 0) {
    fd.append("is_active", form.is_active ? "true" : "false");
  }
  if (form.required_fields !== void 0) {
    fd.append("required_fields", JSON.stringify(form.required_fields));
  }
  if (form.user_pricing) {
    fd.append("user_pricing", form.user_pricing ? "true" : "false");
  }
  if (form.banner instanceof File) fd.append("banner", form.banner);
  return fd;
};
const useAdminServiceDetail = (id) => {
  return useAuthApi(`/api/services/admin/services/${id}/`);
};
const useAdminCreateService = () => {
  const pending = ref(false);
  const error = ref(null);
  const create = async (payload) => {
    const fd = buildServiceFormData(payload);
    pending.value = true;
    try {
      const result = await useAuthApi("/api/services/admin/services/", {
        method: "POST",
        body: fd
      });
      pending.value = false;
      return result;
    } catch (_error) {
      error.value = _error;
      return { data: ref(null), error };
    } finally {
      pending.value = false;
    }
  };
  return { create, pending, error };
};
const useAdminUpdateService = (id) => {
  const update = async (payload) => {
    const fd = buildServiceFormData(payload);
    return await useAuthApi(`/api/services/admin/services/${id}/`, {
      method: "PATCH",
      body: fd
    });
  };
  return { update };
};

export { __nuxt_component_0 as _, useAdminServiceDetail as a, useAdminUpdateService as b, useAdminCreateService as u };
//# sourceMappingURL=useAdminServices-9nc0vayL.mjs.map
