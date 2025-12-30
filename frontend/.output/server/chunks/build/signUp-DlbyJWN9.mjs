import { p as useLocalePath, b as useI18n, q as useHead, g as _sfc_main$2, r as _sfc_main$d, x as __nuxt_component_3, s as _sfc_main$c, _ as _sfc_main$l } from './server.mjs';
import { _ as _sfc_main$1 } from './FieldGroup-bZqqUUeP.mjs';
import { defineComponent, ref, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signUp",
  __ssrInlineRender: true,
  setup(__props) {
    const phone = ref("");
    const error = ref("");
    const loading = ref(false);
    const errorShake = ref(false);
    const success = ref(false);
    const localePath = useLocalePath();
    const { t, locale } = useI18n();
    const selectedCountry = ref(void 0);
    useHead({
      title: t("common.titles.signup")
    });
    const handleSignUp = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_UFormField = _sfc_main$d;
      const _component_UFieldGroup = _sfc_main$1;
      const _component_SelectCountryCode = __nuxt_component_3;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(`<!--[-->isIndexRoute <div class="flex items-center justify-center p-4 grow">`);
      _push(ssrRenderComponent(_component_UCard, {
        class: [{ "animate-shake bg-error": unref(errorShake) }, "w-full max-w-md shadow-xl rounded-xl"]
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-center"${_scopeId}>${ssrInterpolate(unref(t)("common.titles.signup"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-center" }, toDisplayString(unref(t)("common.titles.signup")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-4" method="post"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref(t)("common.labels.phone")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UFieldGroup, {
                    dir: "ltr",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SelectCountryCode, {
                          modelValue: unref(selectedCountry),
                          "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(phone),
                          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                          class: "w-full",
                          name: "phone",
                          placeholder: "",
                          required: "",
                          type: "phone"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SelectCountryCode, {
                            modelValue: unref(selectedCountry),
                            "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UInput, {
                            modelValue: unref(phone),
                            "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                            class: "w-full",
                            name: "phone",
                            placeholder: "",
                            required: "",
                            type: "phone"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UFieldGroup, {
                      dir: "ltr",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectCountryCode, {
                          modelValue: unref(selectedCountry),
                          "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UInput, {
                          modelValue: unref(phone),
                          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                          class: "w-full",
                          name: "phone",
                          placeholder: "",
                          required: "",
                          type: "phone"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(success)) {
              _push2(ssrRenderComponent(_component_UButton, {
                block: "",
                color: "success",
                loading: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("common.titles.redirecting"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("common.titles.redirecting")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_UButton, {
                loading: unref(loading),
                block: "",
                class: "",
                color: "primary",
                type: "submit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("common.labels.signup"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("common.labels.signup")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            if (unref(error)) {
              _push2(`<div class="text-error text-sm text-center"${_scopeId}>${ssrInterpolate(unref(error))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(t)("common.titles.login_notice"))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: unref(t)("common.labels.login"),
              to: unref(localePath)("login"),
              variant: "link"
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: "space-y-4",
                method: "post",
                onSubmit: withModifiers(handleSignUp, ["prevent"])
              }, [
                createVNode(_component_UFormField, {
                  label: unref(t)("common.labels.phone")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UFieldGroup, {
                      dir: "ltr",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_SelectCountryCode, {
                          modelValue: unref(selectedCountry),
                          "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UInput, {
                          modelValue: unref(phone),
                          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                          class: "w-full",
                          name: "phone",
                          placeholder: "",
                          required: "",
                          type: "phone"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["label"]),
                unref(success) ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  block: "",
                  color: "success",
                  loading: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.titles.redirecting")), 1)
                  ]),
                  _: 1
                })) : (openBlock(), createBlock(_component_UButton, {
                  key: 1,
                  loading: unref(loading),
                  block: "",
                  class: "",
                  color: "primary",
                  type: "submit"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.labels.signup")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])),
                unref(error) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-error text-sm text-center"
                }, toDisplayString(unref(error)), 1)) : createCommentVNode("", true),
                createVNode("span", null, toDisplayString(unref(t)("common.titles.login_notice")), 1),
                createVNode(_component_UButton, {
                  label: unref(t)("common.labels.login"),
                  to: unref(localePath)("login"),
                  variant: "link"
                }, null, 8, ["label", "to"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signUp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signUp-DlbyJWN9.mjs.map
