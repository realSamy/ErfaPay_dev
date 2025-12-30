import { o as useRouter, p as useLocalePath, b as useI18n, q as useHead, g as _sfc_main$2, r as _sfc_main$d, s as _sfc_main$c, _ as _sfc_main$l, v as useCookie, w as loadAuth, l as fetchDefaults, m as useAsyncData, n as useRequestFetch } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, computed, toValue, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { U as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import 'node:http';
import 'node:https';
import 'vue-router';
import '@intlify/utils';
import '@vueuse/core';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import '@iconify/utils';
import 'consola';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    const router = useRouter();
    const errorShake = ref(false);
    const success = ref(false);
    const localePath = useLocalePath();
    const { t } = useI18n();
    useHead({
      title: t("common.titles.login")
    });
    const handleLogin = async () => {
      loading.value = true;
      error.value = "";
      const { data, error: fetchError } = await useFetch("/api/token/", {
        method: "POST",
        body: {
          username: username.value,
          password: password.value
        }
      }, "$dyHcPqwtHn");
      loading.value = false;
      if (fetchError.value || !data.value?.access) {
        error.value = t("error.invalid_login");
        errorShake.value = true;
        setTimeout(() => {
          errorShake.value = false;
        }, 500);
        return;
      }
      const accessToken = useCookie("access_token");
      const refreshToken = useCookie("refresh_token");
      accessToken.value = data.value.access;
      refreshToken.value = data.value.refresh;
      await loadAuth();
      success.value = true;
      await router.push(localePath("index"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center p-4 grow" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, {
        class: ["w-full max-w-md shadow-xl rounded-xl", { "animate-shake bg-error": unref(errorShake) }]
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-center"${_scopeId}>${ssrInterpolate(unref(t)("common.titles.login"))}</h1>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-center" }, toDisplayString(unref(t)("common.titles.login")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-4" method="post"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref(t)("common.labels.username")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    class: "w-full",
                    modelValue: unref(username),
                    "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                    placeholder: "you@example.com | YourUserName",
                    type: "text",
                    name: "username",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      class: "w-full",
                      modelValue: unref(username),
                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                      placeholder: "you@example.com | YourUserName",
                      type: "text",
                      name: "username",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref(t)("common.labels.password")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    class: "w-full",
                    modelValue: unref(password),
                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                    placeholder: "••••••••",
                    type: "password",
                    name: "password",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      class: "w-full",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      placeholder: "••••••••",
                      type: "password",
                      name: "password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(success)) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "success",
                block: "",
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
                class: "",
                type: "submit",
                color: "primary",
                block: "",
                loading: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("common.labels.login"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("common.labels.login")), 1)
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
            _push2(`<span${_scopeId}>${ssrInterpolate(unref(t)("common.titles.signup_notice"))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              to: unref(localePath)("signUp"),
              label: unref(t)("common.labels.signup")
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(handleLogin, ["prevent"]),
                class: "space-y-4",
                method: "post"
              }, [
                createVNode(_component_UFormField, {
                  label: unref(t)("common.labels.username")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      class: "w-full",
                      modelValue: unref(username),
                      "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                      placeholder: "you@example.com | YourUserName",
                      type: "text",
                      name: "username",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                createVNode(_component_UFormField, {
                  label: unref(t)("common.labels.password")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      class: "w-full",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      placeholder: "••••••••",
                      type: "password",
                      name: "password",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["label"]),
                unref(success) ? (openBlock(), createBlock(_component_UButton, {
                  key: 0,
                  color: "success",
                  block: "",
                  loading: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.titles.redirecting")), 1)
                  ]),
                  _: 1
                })) : (openBlock(), createBlock(_component_UButton, {
                  key: 1,
                  class: "",
                  type: "submit",
                  color: "primary",
                  block: "",
                  loading: unref(loading)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.labels.login")), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])),
                unref(error) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-error text-sm text-center"
                }, toDisplayString(unref(error)), 1)) : createCommentVNode("", true),
                createVNode("span", null, toDisplayString(unref(t)("common.titles.signup_notice")), 1),
                createVNode(_component_UButton, {
                  variant: "link",
                  to: unref(localePath)("signUp"),
                  label: unref(t)("common.labels.signup")
                }, null, 8, ["to", "label"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DiMDGpRU.mjs.map
