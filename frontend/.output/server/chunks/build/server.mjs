import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, computed, ref, watch, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, createBlock, openBlock, toDisplayString as toDisplayString$1, defineAsyncComponent, hasInjectionContext, inject, mergeModels, useSlots, useModel, toRef, useTemplateRef, createTextVNode, createCommentVNode, Fragment, renderList, withModifiers, toHandlers, useId, provide, toValue, getCurrentInstance, shallowRef, cloneVNode, h, createElementBlock, isRef, readonly, onServerPrefetch, toRaw, resolveComponent, shallowReactive, reactive, markRaw, nextTick, useSSRContext, Suspense, createApp, Text, onErrorCaptured, effectScope, isReadonly, isShallow, isReactive, getCurrentScope } from 'vue';
import http from 'node:http';
import https from 'node:https';
import { w as withBase, l as destr, q as withQuery$1, t as i, v as s, x as l, y as serialize, z as defu, A as klona, B as defuFn, i as createError$1, C as headSymbol, D as useHead$1, E as sanitizeStatusCode, F as isEqual$1, G as parse$1, H as getRequestHeader, I as getContext, J as setCookie, K as getCookie, L as deleteCookie, M as baseURL, N as createHooks, O as executeAsync, P as toRouteMatcher, Q as createRouter$1, R as getRequestURL, S as getRequestURL$1, T as getRequestHeader$1 } from '../nitro/nitro.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createPathIndexLanguageParser, parseAcceptLanguage } from '@intlify/utils';
import { createSharedComposable, reactivePick, createReusableTemplate, useDebounceFn, reactiveOmit, useStorage as useStorage$1, useVModel } from '@vueuse/core';
import { Icon, getIcon, loadIcon as loadIcon$1, _api, addAPIProvider, setCustomIconsLoader } from '@iconify/vue';
import colors from 'tailwindcss/colors';
import { ssrRenderVNode, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle, ssrRenderSuspense } from 'vue/server-renderer';
import { Primitive, Slot, useFilter, useForwardPropsEmits, ComboboxItem, ComboboxLabel, ComboboxSeparator, ComboboxItemIndicator, ComboboxRoot, ComboboxAnchor, ComboboxTrigger, ComboboxPortal, ComboboxContent, FocusScope, ComboboxInput, ComboboxEmpty, ComboboxVirtualizer, ComboboxGroup, ComboboxArrow, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay, useForwardProps, Label, CheckboxRoot, CheckboxIndicator, ToastProvider, ToastPortal, ToastViewport, ConfigProvider, TooltipProvider, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose, PinInputRoot, PinInputInput, ProgressRoot, ProgressIndicator } from 'reka-ui';
import { createTV } from 'tailwind-variants';
import { getIconCSS } from '@iconify/utils/lib/css/icon';
import { debounce } from 'perfect-debounce';
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

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery$1(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers, AbortController: AbortController$1 });
const $fetch$1 = ofetch;

function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id2 = appId) {
  return getContext(id2, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.2.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id2) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id2).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id2) {
  const nuxtAppInstance = tryUseNuxtApp(id2);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function isEqual(a, b, options = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}
const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = /* @__PURE__ */ useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = void 0;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_E_uJcFe0luHIDZLEqPsDjVWAAO5cZzqdHeZ5qnY46i0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$2(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$j = {
  layout: "admin",
  title: "pages.admin.title.index"
};
const __nuxt_page_meta$i = {
  layout: "admin",
  title: "pages.admin.title.users_new"
};
const __nuxt_page_meta$h = {
  layout: "dashboard"
};
const __nuxt_page_meta$g = {
  layout: "admin",
  title: "pages.admin.title.agents_new"
};
const __nuxt_page_meta$f = {
  layout: "admin",
  title: "pages.admin.title.users"
};
const __nuxt_page_meta$e = {
  layout: "admin",
  title: "pages.admin.title.agents"
};
const __nuxt_page_meta$d = {
  layout: "admin",
  title: "pages.admin.title.orders_new"
};
const __nuxt_page_meta$c = {
  layout: "admin",
  title: "pages.admin.title.services_edit"
};
const __nuxt_page_meta$b = {
  layout: "admin",
  title: "pages.admin.title.support"
};
const __nuxt_page_meta$a = {
  layout: "admin",
  title: "pages.admin.title.orders"
};
const __nuxt_page_meta$9 = {
  layout: "admin",
  title: "pages.admin.title.financial"
};
const __nuxt_page_meta$8 = {
  layout: "dashboard"
};
const __nuxt_page_meta$7 = {
  layout: "admin",
  title: "pages.admin.title.users_id"
};
const __nuxt_page_meta$6 = {
  layout: "dashboard"
};
const __nuxt_page_meta$5 = {
  layout: "dashboard"
};
const __nuxt_page_meta$4 = {
  layout: "dashboard"
};
const __nuxt_page_meta$3 = {
  layout: "admin",
  title: "pages.admin.title.tickets"
};
const __nuxt_page_meta$2 = {
  layout: "dashboard"
};
const __nuxt_page_meta$1 = {
  layout: "admin",
  title: "pages.admin.title.orders_id"
};
const __nuxt_page_meta = {
  layout: "admin",
  title: "pages.admin.title.ticket_id"
};
const _routes = [
  {
    name: "index___en",
    path: "/en",
    component: () => import('./index-DfuIO5Eu.mjs')
  },
  {
    name: "index___fa",
    path: "/fa",
    component: () => import('./index-DfuIO5Eu.mjs')
  },
  {
    name: "login___en",
    path: "/en/login",
    component: () => import('./login-DiMDGpRU.mjs')
  },
  {
    name: "login___fa",
    path: "/fa/login",
    component: () => import('./login-DiMDGpRU.mjs')
  },
  {
    name: "signUp___en",
    path: "/en/signUp",
    component: () => import('./signUp-DlbyJWN9.mjs')
  },
  {
    name: "signUp___fa",
    path: "/fa/signUp",
    component: () => import('./signUp-DlbyJWN9.mjs')
  },
  {
    name: "admin___en",
    path: "/en/admin",
    meta: { ...__nuxt_page_meta$j || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./index-DYfuM663.mjs')
  },
  {
    name: "admin___fa",
    path: "/fa/admin",
    meta: { ...__nuxt_page_meta$j || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./index-DYfuM663.mjs')
  },
  {
    name: "admin-users-new___en",
    path: "/en/admin/users/new",
    meta: __nuxt_page_meta$i || {},
    component: () => import('./new-BUWmNg8l.mjs')
  },
  {
    name: "admin-users-new___fa",
    path: "/fa/admin/users/new",
    meta: __nuxt_page_meta$i || {},
    component: () => import('./new-BUWmNg8l.mjs')
  },
  {
    name: "dashboard___en",
    path: "/en/dashboard",
    meta: { ...__nuxt_page_meta$h || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DUuXGoMV.mjs')
  },
  {
    name: "dashboard___fa",
    path: "/fa/dashboard",
    meta: { ...__nuxt_page_meta$h || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DUuXGoMV.mjs')
  },
  {
    name: "admin-agents-new___en",
    path: "/en/admin/agents/new",
    meta: __nuxt_page_meta$g || {},
    component: () => import('./new-BcOVWBae.mjs')
  },
  {
    name: "admin-agents-new___fa",
    path: "/fa/admin/agents/new",
    meta: __nuxt_page_meta$g || {},
    component: () => import('./new-BcOVWBae.mjs')
  },
  {
    name: "admin-users___en",
    path: "/en/admin/users",
    meta: __nuxt_page_meta$f || {},
    component: () => import('./index-DNzvjtKZ.mjs')
  },
  {
    name: "admin-users___fa",
    path: "/fa/admin/users",
    meta: __nuxt_page_meta$f || {},
    component: () => import('./index-DNzvjtKZ.mjs')
  },
  {
    name: "admin-agents___en",
    path: "/en/admin/agents",
    meta: __nuxt_page_meta$e || {},
    component: () => import('./index-b7vCdFQo.mjs')
  },
  {
    name: "admin-agents___fa",
    path: "/fa/admin/agents",
    meta: __nuxt_page_meta$e || {},
    component: () => import('./index-b7vCdFQo.mjs')
  },
  {
    name: "admin-services-new___en",
    path: "/en/admin/services/new",
    meta: { ...__nuxt_page_meta$d || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./new-Xs4uP6Qx.mjs')
  },
  {
    name: "admin-services-new___fa",
    path: "/fa/admin/services/new",
    meta: { ...__nuxt_page_meta$d || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./new-Xs4uP6Qx.mjs')
  },
  {
    name: "admin-services-id___en",
    path: "/en/admin/services/:id()",
    meta: { ...__nuxt_page_meta$c || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./_id_-wDW67aC9.mjs')
  },
  {
    name: "admin-services-id___fa",
    path: "/fa/admin/services/:id()",
    meta: { ...__nuxt_page_meta$c || {}, ...{ "middleware": ["auth", "admin"] } },
    component: () => import('./_id_-wDW67aC9.mjs')
  },
  {
    name: "admin-support___en",
    path: "/en/admin/support",
    meta: __nuxt_page_meta$b || {},
    component: () => import('./index-DB6ZZ2Y9.mjs')
  },
  {
    name: "admin-support___fa",
    path: "/fa/admin/support",
    meta: __nuxt_page_meta$b || {},
    component: () => import('./index-DB6ZZ2Y9.mjs')
  },
  {
    name: "admin-services___en",
    path: "/en/admin/services",
    meta: __nuxt_page_meta$a || {},
    component: () => import('./index-CDDl27cZ.mjs')
  },
  {
    name: "admin-services___fa",
    path: "/fa/admin/services",
    meta: __nuxt_page_meta$a || {},
    component: () => import('./index-CDDl27cZ.mjs')
  },
  {
    name: "admin-financial___en",
    path: "/en/admin/financial",
    meta: __nuxt_page_meta$9 || {},
    component: () => import('./index-C1RPWXtB.mjs')
  },
  {
    name: "admin-financial___fa",
    path: "/fa/admin/financial",
    meta: __nuxt_page_meta$9 || {},
    component: () => import('./index-C1RPWXtB.mjs')
  },
  {
    name: "dashboard-support-new___en",
    path: "/en/dashboard/support/new",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./new-Cmnw5P-X.mjs')
  },
  {
    name: "dashboard-support-new___fa",
    path: "/fa/dashboard/support/new",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./new-Cmnw5P-X.mjs')
  },
  {
    name: "admin-users-id___en",
    path: "/en/admin/users/:id()",
    meta: __nuxt_page_meta$7 || {},
    component: () => import('./index-oD21364d.mjs')
  },
  {
    name: "admin-users-id___fa",
    path: "/fa/admin/users/:id()",
    meta: __nuxt_page_meta$7 || {},
    component: () => import('./index-oD21364d.mjs')
  },
  {
    name: "dashboard-orders___en",
    path: "/en/dashboard/orders",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DGgchJsi.mjs')
  },
  {
    name: "dashboard-orders___fa",
    path: "/fa/dashboard/orders",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DGgchJsi.mjs')
  },
  {
    name: "dashboard-support___en",
    path: "/en/dashboard/support",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-CV6YzJEX.mjs')
  },
  {
    name: "dashboard-support___fa",
    path: "/fa/dashboard/support",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-CV6YzJEX.mjs')
  },
  {
    name: "dashboard-orders-new-id___en",
    path: "/en/dashboard/orders/new-:id()",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./new-_id_-Bbp4nQNF.mjs')
  },
  {
    name: "dashboard-orders-new-id___fa",
    path: "/fa/dashboard/orders/new-:id()",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./new-_id_-Bbp4nQNF.mjs')
  },
  {
    name: "admin-support-tickets___en",
    path: "/en/admin/support/tickets",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./index-Cs4iw8T5.mjs')
  },
  {
    name: "admin-support-tickets___fa",
    path: "/fa/admin/support/tickets",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./index-Cs4iw8T5.mjs')
  },
  {
    name: "dashboard-support-ticket-id___en",
    path: "/en/dashboard/support/ticket-:id()",
    meta: { ...__nuxt_page_meta$2 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./ticket-_id_-BsU4iP3C.mjs')
  },
  {
    name: "dashboard-support-ticket-id___fa",
    path: "/fa/dashboard/support/ticket-:id()",
    meta: { ...__nuxt_page_meta$2 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./ticket-_id_-BsU4iP3C.mjs')
  },
  {
    name: "admin-users-id-orders-order___en",
    path: "/en/admin/users/:id()/orders/:order()",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./_order_-pGloARDc.mjs')
  },
  {
    name: "admin-users-id-orders-order___fa",
    path: "/fa/admin/users/:id()/orders/:order()",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./_order_-pGloARDc.mjs')
  },
  {
    name: "admin-support-tickets-ticket-id___en",
    path: "/en/admin/support/tickets/ticket-:id()",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": ["auth", "support"] } },
    component: () => import('./ticket-_id_-lx1l2JzM.mjs')
  },
  {
    name: "admin-support-tickets-ticket-id___fa",
    path: "/fa/admin/support/tickets/ticket-:id()",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": ["auth", "support"] } },
    component: () => import('./ticket-_id_-lx1l2JzM.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const currentModal = ref(null);
function useAuthModal() {
  const currentModalProps = useState("auth-props");
  function open(modal, props = {}) {
    currentModal.value = modal;
    if (Object.keys(props).length) currentModalProps.value = props;
  }
  function close() {
    currentModal.value = null;
  }
  return {
    currentModal,
    currentModalProps,
    open,
    close
  };
}
function _useOverlay() {
  const overlays = shallowReactive([]);
  const create2 = (component, _options) => {
    const { props, defaultOpen, destroyOnClose } = _options || {};
    const options = reactive({
      id: Symbol(""),
      isOpen: !!defaultOpen,
      component: markRaw(component),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      originalProps: props || {},
      props: { ...props }
    });
    overlays.push(options);
    return {
      ...options,
      open: (props2) => open(options.id, props2),
      close: (value) => close(options.id, value),
      patch: (props2) => patch(options.id, props2)
    };
  };
  const open = (id2, props) => {
    const overlay = getOverlay(id2);
    if (props) {
      overlay.props = { ...overlay.originalProps, ...props };
    } else {
      overlay.props = { ...overlay.originalProps };
    }
    overlay.isOpen = true;
    overlay.isMounted = true;
    const result = new Promise((resolve) => overlay.resolvePromise = resolve);
    return Object.assign(result, {
      id: id2,
      isMounted: overlay.isMounted,
      isOpen: overlay.isOpen,
      result
    });
  };
  const close = (id2, value) => {
    const overlay = getOverlay(id2);
    overlay.isOpen = false;
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value);
      overlay.resolvePromise = void 0;
    }
  };
  const closeAll = () => {
    overlays.forEach((overlay) => close(overlay.id));
  };
  const unmount = (id2) => {
    const overlay = getOverlay(id2);
    overlay.isMounted = false;
    if (overlay.destroyOnClose) {
      const index2 = overlays.findIndex((overlay2) => overlay2.id === id2);
      overlays.splice(index2, 1);
    }
  };
  const patch = (id2, props) => {
    const overlay = getOverlay(id2);
    overlay.props = { ...overlay.props, ...props };
  };
  const getOverlay = (id2) => {
    const overlay = overlays.find((overlay2) => overlay2.id === id2);
    if (!overlay) {
      throw new Error("Overlay not found");
    }
    return overlay;
  };
  const isOpen = (id2) => {
    const overlay = getOverlay(id2);
    return overlay.isOpen;
  };
  return {
    overlays,
    open,
    close,
    closeAll,
    create: create2,
    patch,
    unmount,
    isOpen
  };
}
const useOverlay = /* @__PURE__ */ createSharedComposable(_useOverlay);
const LazyModalConfirm = defineAsyncComponent(() => import('./Confirm-DmVW2lVT.mjs').then((r) => r["default"] || r.default || r));
const useConfirm = (options = {}) => {
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  return new Promise((resolve) => {
    const overlay = useOverlay();
    const modal = overlay.create(LazyModalConfirm, {
      props: {
        ...options,
        onConfirm: () => {
          modal.close();
          resolve(true);
        },
        onCancel: () => {
          modal.close();
          resolve(false);
        }
      }
    });
    modal.open();
  });
};
/*!
  * shared v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
const _create = Object.create;
const create = (obj = null) => _create(obj);
function escapeHtml(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern) => {
    html = html.replace(pattern, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator2 = "") {
  return items.reduce((str, item, index2) => index2 === 0 ? str + item : str + separator2 + item, "");
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isObject(src2[key]) && !isObject(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : create();
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
function localeHead$1(options, currentLanguage = options.getCurrentLanguage(), currentDirection = options.getCurrentDirection()) {
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (options.dir) {
    metaObject.htmlAttrs.dir = currentDirection;
  }
  if (options.lang && currentLanguage) {
    metaObject.htmlAttrs.lang = currentLanguage;
  }
  if (options.seo) {
    const alternateLinks = getHreflangLinks(options);
    metaObject.link = metaObject.link.concat(
      alternateLinks,
      getCanonicalLink(options)
    );
    metaObject.meta = metaObject.meta.concat(
      getOgUrl(options),
      getCurrentOgLocale(options),
      getAlternateOgLocales(
        options,
        options.locales.map((x) => x.language || x.code)
      )
    );
  }
  return metaObject;
}
function createLocaleMap(locales2) {
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales2) {
    if (!locale.language) {
      console.warn("Locale `language` ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = locale.language.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(locale.language, locale);
  }
  return localeMap;
}
function getHreflangLinks(options) {
  if (!options.hreflangLinks) return [];
  const links = [];
  const localeMap = createLocaleMap(options.locales);
  for (const [language, locale] of localeMap.entries()) {
    const link = getHreflangLink(language, locale, options);
    if (!link) continue;
    links.push(link);
    if (options.defaultLocale && options.defaultLocale === locale.code && links[0].hreflang !== "x-default") {
      links.unshift(
        { [options.key]: "i18n-xd", rel: "alternate", href: link.href, hreflang: "x-default" }
      );
    }
  }
  return links;
}
function getHreflangLink(language, locale, options, routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0) {
  const localePath2 = options.getLocalizedRoute(locale.code, routeWithoutQuery);
  if (!localePath2) return void 0;
  const href = withQuery(
    hasProtocol(localePath2) ? localePath2 : joinURL(options.baseUrl, localePath2),
    options.strictCanonicals ? getCanonicalQueryParams(options) : {}
  );
  return { [options.key]: `i18n-alt-${language}`, rel: "alternate", href, hreflang: language };
}
function getCanonicalUrl(options, route = options.getCurrentRoute()) {
  const currentRoute = options.getLocaleRoute(
    Object.assign({}, route, { path: void 0, name: options.getRouteBaseName(route) })
  );
  if (!currentRoute) return "";
  return withQuery(joinURL(options.baseUrl, currentRoute.path), getCanonicalQueryParams(options));
}
function getCanonicalLink(options, href = getCanonicalUrl(options)) {
  if (!href) return [];
  return [{ [options.key]: "i18n-can", rel: "canonical", href }];
}
function getCanonicalQueryParams(options, route = options.getCurrentRoute()) {
  const currentRoute = options.getLocaleRoute(
    Object.assign({}, route, { path: void 0, name: options.getRouteBaseName(route) })
  );
  const currentRouteQuery = currentRoute?.query ?? {};
  const params = {};
  for (const param of options.canonicalQueries.filter((x) => x in currentRouteQuery)) {
    params[param] ??= [];
    for (const val of toArray$1(currentRouteQuery[param])) {
      params[param].push(val || "");
    }
  }
  return params;
}
function getOgUrl(options, href = getCanonicalUrl(options)) {
  if (!href) return [];
  return [
    { [options.key]: "i18n-og-url", property: "og:url", content: href }
  ];
}
function getCurrentOgLocale(options, currentLanguage = options.getCurrentLanguage()) {
  if (!currentLanguage) return [];
  return [
    { [options.key]: "i18n-og", property: "og:locale", content: formatOgLanguage(currentLanguage) }
  ];
}
function getAlternateOgLocales(options, languages, currentLanguage = options.getCurrentLanguage()) {
  const alternateLocales = languages.filter((locale) => locale && locale !== currentLanguage);
  return alternateLocales.map(
    (locale) => ({
      [options.key]: `i18n-og-alt-${locale}`,
      property: "og:locale:alternate",
      content: formatOgLanguage(locale)
    })
  );
}
function formatOgLanguage(val = "") {
  return val.replace(/-/g, "_");
}
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
function localePath(ctx, route, locale = ctx.getLocale()) {
  if (isString(route) && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  try {
    return resolveRoute(ctx, route, locale).fullPath;
  } catch {
    return "";
  }
}
function localeRoute(ctx, route, locale = ctx.getLocale()) {
  try {
    return resolveRoute(ctx, route, locale);
  } catch {
    return;
  }
}
function normalizeRawLocation(route) {
  if (!isString(route)) {
    return assign({}, route);
  }
  if (route[0] === "/") {
    const { pathname: path, search, hash } = parsePath(route);
    return { path, query: parseQuery(search), hash };
  }
  return { name: route };
}
function resolveRoute(ctx, route, locale) {
  const normalized = normalizeRawLocation(route);
  const resolved = ctx.router.resolve(ctx.resolveLocalizedRouteObject(normalized, locale));
  if (resolved.name) {
    return resolved;
  }
  return ctx.router.resolve(route);
}
function switchLocalePath(ctx, locale, route = ctx.router.currentRoute.value) {
  const name = ctx.getRouteBaseName(route);
  if (!name) {
    return "";
  }
  const routeCopy = {
    name,
    params: assign({}, route.params, ctx.getLocalizedDynamicParams(locale)),
    fullPath: route.fullPath,
    query: route.query,
    hash: route.hash,
    path: route.path,
    meta: route.meta
  };
  const path = localePath(ctx, routeCopy, locale);
  return ctx.afterSwitchLocalePath(path, locale);
}
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function prerenderRoutes(path) {
  {
    return;
  }
}
function createHeadContext(ctx, config, locale = ctx.getLocale(), locales2 = ctx.getLocales(), baseUrl = ctx.getBaseUrl()) {
  const currentLocale = locales2.find((l) => l.code === locale) || {};
  const canonicalQueries = typeof config.seo === "object" && config.seo?.canonicalQueries || [];
  if (!baseUrl && true && true) {
    console.warn("I18n `baseUrl` is required to generate valid SEO tag links.");
  }
  return {
    ...config,
    key: "id",
    locales: locales2,
    baseUrl,
    canonicalQueries,
    hreflangLinks: ctx.routingOptions.hreflangLinks,
    defaultLocale: ctx.routingOptions.defaultLocale,
    strictCanonicals: ctx.routingOptions.strictCanonicals,
    getRouteBaseName: ctx.getRouteBaseName,
    getCurrentRoute: () => ctx.router.currentRoute.value,
    getCurrentLanguage: () => currentLocale.language,
    getCurrentDirection: () => currentLocale.dir || "ltr",
    getLocaleRoute: (route) => localeRoute(ctx, route),
    getLocalizedRoute: (locale2, route) => switchLocalePath(ctx, locale2, route),
    getRouteWithoutQuery: () => {
      try {
        return assign({}, ctx.router.resolve({ query: {} }), { meta: ctx.router.currentRoute.value.meta });
      } catch {
        return void 0;
      }
    }
  };
}
function localeHead(ctx, { dir = true, lang = true, seo = true }) {
  return localeHead$1(createHeadContext(ctx, { dir, lang, seo }));
}
const separator = "___";
function normalizeRouteName(routeName) {
  if (typeof routeName === "string") return routeName;
  if (routeName != null) return routeName.toString();
  return "";
}
function getRouteBaseName(route) {
  return normalizeRouteName(typeof route === "object" ? route?.name : route).split(separator)[0];
}
function getLocalizedRouteName(routeName, locale, isDefault) {
  return routeName + separator + locale ;
}
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  return input[0] === "/" ? getLocaleFromRoutePath(input) : getLocaleFromRouteName(input);
}
function createLocaleRouteNameGetter(defaultLocale) {
  return (name, locale) => getLocalizedRouteName(normalizeRouteName(name), locale);
}
function createLocalizedRouteByPathResolver(router) {
  return (route) => router.resolve(route);
}
const localeCodes = [
  "en",
  "fa"
];
const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_62bb6904",
      load: () => import(
        './en-DSlwchZb.mjs'
        /* webpackChunkName: "locale_en_46json_62bb6904" */
      ),
      cache: true
    }
  ],
  fa: [
    {
      key: "locale_fa_46json_c57fb6d3",
      load: () => import(
        './fa-CFCKqbdc.mjs'
        /* webpackChunkName: "locale_fa_46json_c57fb6d3" */
      ),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "en",
    name: "English",
    language: void 0
  },
  {
    code: "fa",
    name: "پارسی",
    language: void 0
  }
];
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_4$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        if (asyncData._abortController?.signal.aborted) {
          return;
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return;
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true });
  }
  return controller.signal;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual$1(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate: navigate2, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el2 = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate: navigate2,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el2,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            return props.replace ? router.replace(href.value) : router.push(href.value);
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$3 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const cfg0 = defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "blue",
      neutral: "slate"
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      },
      slots: {
        base: "cursor-pointer dark:text-white",
        label: "dark:text-white",
        leadingIcon: "dark:text-white",
        trailingIcon: "dark:text-white"
      }
    },
    switch: {
      slots: {
        base: "cursor-pointer"
      }
    },
    dropdownMenu: {
      slots: {
        item: "cursor-pointer"
      }
    }
  }
});
const inlineConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    },
    "tv": {
      "twMergeConfig": {}
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "components",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};
const appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(appConfig);
  return nuxtApp._appConfig;
}
const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs2) {
  const nuxtApp = useNuxtApp();
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs2) {
    const resolver = await configFile().then((x) => x.default);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
const isResolvedModule = (val) => isModule(val) || true;
async function getLocaleMessages$1(locale, loader) {
  const nuxtApp = useNuxtApp();
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isResolvedModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message);
  }
}
async function getLocaleMessagesMergedCached(locale, loaders = []) {
  const nuxtApp = useNuxtApp();
  const merged = {};
  for (const loader of loaders) {
    const cached = getCachedMessages(loader);
    const messages = cached || await nuxtApp.runWithContext(async () => await getLocaleMessages$1(locale, loader));
    if (!cached && loader.cache !== false) {
      cacheMessages.set(loader.key, { ttl: Date.now() + 86400 * 1e3, value: messages });
    }
    deepCopy(messages, merged);
  }
  return merged;
}
function getCachedMessages(loader) {
  if (loader.cache === false) return;
  const cache2 = cacheMessages.get(loader.key);
  if (cache2 == null) return;
  return cache2.ttl > Date.now() ? cache2.value : void 0;
}
function getI18nTarget(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n ? i18n.global : i18n;
}
function getComposer$3(i18n) {
  const target = getI18nTarget(i18n);
  return "__composer" in target ? target.__composer : target;
}
function useRuntimeI18n(nuxtApp) {
  if (!nuxtApp) {
    return (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  }
  return nuxtApp.$config.public.i18n;
}
function useI18nDetection(nuxtApp) {
  const detectBrowserLanguage = useRuntimeI18n(nuxtApp).detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) return void 0;
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function matchDomainLocale(locales2, host, pathLocale) {
  const normalizeDomain = (domain = "") => domain.replace(/https?:\/\//, "");
  const matches = locales2.filter(
    (locale) => normalizeDomain(locale.domain) === host || toArray(locale.domains).includes(host)
  );
  if (matches.length <= 1) {
    return matches[0]?.code;
  }
  return (
    // match by current path locale
    matches.find((l) => l.code === pathLocale)?.code || // fallback to default locale for the domain
    matches.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault)?.code
  );
}
function domainFromLocale(domainLocales, url, locale) {
  const lang = normalizedLocales.find((x) => x.code === locale);
  const domain = domainLocales?.[locale]?.domain || lang?.domain || lang?.domains?.find((v) => v === url.host);
  if (!domain) {
    return;
  }
  if (hasProtocol(domain, { strict: true })) {
    return domain;
  }
  return url.protocol + "//" + domain;
}
function getDefaultLocaleForDomain(host) {
  return normalizedLocales.find((l) => !!l.defaultForDomains?.includes(host))?.code;
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");
const resolveSupportedLocale = (locale) => isSupportedLocale(locale) ? locale : void 0;
const useLocaleConfigs = () => useState(
  "i18n:cached-locale-configs",
  () => void 0
);
const useResolvedLocale = () => useState("i18n:resolved-locale", () => "");
function useI18nCookie({ cookieCrossOrigin, cookieDomain, cookieSecure, cookieKey }) {
  const date = /* @__PURE__ */ new Date();
  return useCookie(cookieKey, {
    path: "/",
    readonly: false,
    expires: new Date(date.setDate(date.getDate() + 365)),
    sameSite: cookieCrossOrigin ? "none" : "lax",
    domain: cookieDomain || void 0,
    secure: cookieCrossOrigin || cookieSecure
  });
}
function createNuxtI18nContext(nuxt, vueI18n, defaultLocale) {
  const i18n = getI18nTarget(vueI18n);
  const runtimeI18n = useRuntimeI18n(nuxt);
  const detectConfig = useI18nDetection(nuxt);
  const serverLocaleConfigs = useLocaleConfigs();
  const localeCookie = useI18nCookie(detectConfig);
  const getLocaleConfig = (locale) => serverLocaleConfigs.value[locale];
  const getDomainFromLocale = (locale) => domainFromLocale(runtimeI18n.domainLocales, useRequestURL({ xForwardedHost: true }), locale);
  const baseUrl = createBaseUrlGetter(nuxt, runtimeI18n.baseUrl);
  const resolvedLocale = useResolvedLocale();
  if (nuxt.ssrContext?.event?.context?.nuxtI18n?.detectLocale) {
    resolvedLocale.value = nuxt.ssrContext.event.context.nuxtI18n.detectLocale;
  }
  const loadMessagesFromClient = async (locale) => {
    const locales2 = getLocaleConfig(locale)?.fallbacks ?? [];
    if (!locales2.includes(locale)) locales2.push(locale);
    for (const k of locales2) {
      const msg = await nuxt.runWithContext(() => getLocaleMessagesMergedCached(k, localeLoaders[k]));
      i18n.mergeLocaleMessage(k, msg);
    }
  };
  const loadMessagesFromServer = async (locale) => {
    if (locale in localeLoaders === false) return;
    const headers = getLocaleConfig(locale)?.cacheable ? {} : { "Cache-Control": "no-cache" };
    const messages = await $fetch(`/_i18n/${locale}/messages.json`, { headers });
    for (const k of Object.keys(messages)) {
      i18n.mergeLocaleMessage(k, messages[k]);
    }
  };
  const ctx = {
    vueI18n,
    initial: true,
    preloaded: false,
    config: runtimeI18n,
    rootRedirect: resolveRootRedirect(runtimeI18n.rootRedirect),
    redirectStatusCode: runtimeI18n.redirectStatusCode ?? 302,
    dynamicResourcesSSG: false,
    getDefaultLocale: () => defaultLocale,
    getLocale: () => unref(i18n.locale),
    setLocale: async (locale) => {
      const oldLocale = ctx.getLocale();
      if (locale === oldLocale || !isSupportedLocale(locale)) return;
      if (isRef(i18n.locale)) {
        i18n.locale.value = locale;
      } else {
        i18n.locale = locale;
      }
      await nuxt.callHook("i18n:localeSwitched", { newLocale: locale, oldLocale });
      resolvedLocale.value = locale;
    },
    setLocaleSuspend: async (locale) => {
      if (!isSupportedLocale(locale)) return;
      ctx.vueI18n.__pendingLocale = locale;
      ctx.vueI18n.__pendingLocalePromise = new Promise((resolve) => {
        ctx.vueI18n.__resolvePendingLocalePromise = async () => {
          ctx.setCookieLocale(locale);
          await ctx.setLocale(locale);
          ctx.vueI18n.__pendingLocale = void 0;
          resolve();
        };
      });
      {
        await ctx.vueI18n.__resolvePendingLocalePromise?.();
      }
    },
    getLocales: () => unref(i18n.locales).map((x) => isString(x) ? { code: x } : x),
    setCookieLocale: (locale) => {
      if (detectConfig.useCookie && isSupportedLocale(locale)) {
        localeCookie.value = locale;
      }
    },
    getBaseUrl: (locale) => {
      if (locale) {
        return joinURL(getDomainFromLocale(locale) || baseUrl(), nuxt.$config.app.baseURL);
      }
      return joinURL(baseUrl(), nuxt.$config.app.baseURL);
    },
    loadMessages: async (locale) => {
      try {
        return ctx.dynamicResourcesSSG || false ? await loadMessagesFromClient(locale) : await loadMessagesFromServer(locale);
      } catch (e) {
        console.warn(`Failed to load messages for locale "${locale}"`, e);
      }
    },
    composableCtx: void 0
  };
  ctx.composableCtx = createComposableContext(ctx, nuxt);
  return ctx;
}
function useNuxtI18nContext(nuxt) {
  if (nuxt._nuxtI18n == null) {
    throw new Error("Nuxt I18n context has not been set up yet.");
  }
  return nuxt._nuxtI18n;
}
function matchBrowserLocale(locales2, browserLocales) {
  const matchedLocales = [];
  for (const [index2, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales2.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index2 / browserLocales.length });
      break;
    }
  }
  for (const [index2, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales2.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index2 / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales2, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales2.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}
const getCookieLocale = (event, cookieName) => {
  const cookieValue = getRequestHeader$1(event, "cookie") || "";
  return parse$1(cookieValue)[cookieName];
};
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => {
  return findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader$1(event, "accept-language") || ""));
};
const getHostLocale = (event, path, domainLocales) => {
  const host = getRequestURL$1(event, { xForwardedHost: true }).host;
  const locales2 = normalizedLocales.map((l) => ({
    ...l,
    domain: domainLocales[l.code]?.domain ?? l.domain
  }));
  return matchDomainLocale(locales2, host, getLocaleFromRoutePath(path));
};
const useDetectors = (event, config, nuxtApp) => {
  if (!event) {
    throw new Error("H3Event is required for server-side locale detection");
  }
  const runtimeI18n = useRuntimeI18n(nuxtApp);
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event),
    navigator: () => void 0,
    host: (path) => getHostLocale(event, path, runtimeI18n.domainLocales),
    route: (path) => getRouteLocale(event, path)
  };
};
const isRouteLocationPathRaw = (val) => !!val.path && !val.name;
function useComposableContext(nuxtApp) {
  const context = nuxtApp?._nuxtI18n?.composableCtx;
  if (!context) {
    throw new Error(
      "i18n context is not initialized. Ensure the i18n plugin is installed and the composable is used within a Vue component or setup function."
    );
  }
  return context;
}
const formatTrailingSlash = withoutTrailingSlash;
function createComposableContext(ctx, nuxtApp = useNuxtApp()) {
  const router = useRouter();
  useDetectors(useRequestEvent(), useI18nDetection(nuxtApp), nuxtApp);
  const defaultLocale = ctx.getDefaultLocale();
  const getLocalizedRouteName2 = createLocaleRouteNameGetter();
  function resolveLocalizedRouteByName(route, locale) {
    route.name ||= getRouteBaseName(router.currentRoute.value);
    const localizedName = getLocalizedRouteName2(route.name, locale);
    if (router.hasRoute(localizedName)) {
      route.name = localizedName;
    }
    return route;
  }
  const routeByPathResolver = createLocalizedRouteByPathResolver(router);
  function resolveLocalizedRouteByPath(input, locale) {
    const route = routeByPathResolver(input, locale);
    const baseName = getRouteBaseName(route);
    if (baseName) {
      route.name = getLocalizedRouteName2(baseName, locale);
      return route;
    }
    if (prefixable(locale, defaultLocale)) {
      route.path = "/" + locale + route.path;
    }
    route.path = formatTrailingSlash(route.path, true);
    return route;
  }
  const composableCtx = {
    router,
    head: useHead({}),
    metaState: { htmlAttrs: {}, meta: [], link: [] },
    seoSettings: {
      dir: false,
      lang: false,
      seo: false
    },
    localePathPayload: getLocalePathPayload(),
    routingOptions: {
      defaultLocale,
      strictCanonicals: ctx.config.experimental.alternateLinkCanonicalQueries ?? true,
      hreflangLinks: true
    },
    getLocale: ctx.getLocale,
    getLocales: ctx.getLocales,
    getBaseUrl: ctx.getBaseUrl,
    getRouteBaseName,
    getRouteLocalizedParams: () => router.currentRoute.value.meta["nuxtI18nInternal"] ?? {},
    getLocalizedDynamicParams: (locale) => {
      return composableCtx.getRouteLocalizedParams()?.[locale];
    },
    afterSwitchLocalePath: (path, locale) => {
      composableCtx.getRouteLocalizedParams();
      return path;
    },
    resolveLocalizedRouteObject: (route, locale) => {
      return isRouteLocationPathRaw(route) ? resolveLocalizedRouteByPath(route, locale) : resolveLocalizedRouteByName(route, locale);
    }
  };
  return composableCtx;
}
function getLocalePathPayload(nuxtApp = useNuxtApp()) {
  return JSON.parse("{}");
}
async function loadAndSetLocale(nuxtApp, locale) {
  const ctx = useNuxtI18nContext(nuxtApp);
  const oldLocale = ctx.getLocale();
  if (locale === oldLocale && !ctx.initial) {
    return locale;
  }
  const data = { oldLocale, newLocale: locale, initialSetup: ctx.initial, context: nuxtApp };
  let override = await nuxtApp.callHook("i18n:beforeLocaleSwitch", data);
  if (override != null && false) {
    console.warn("[nuxt-i18n] Do not return in `i18n:beforeLocaleSwitch`, mutate `data.newLocale` instead.");
  }
  override ??= data.newLocale;
  if (isSupportedLocale(override)) {
    locale = override;
  }
  await ctx.loadMessages(locale);
  await ctx.setLocaleSuspend(locale);
  return locale;
}
function skipDetect(detect, path, pathLocale) {
  if (detect.redirectOn === "root" && path !== "/") {
    return true;
  }
  if (detect.redirectOn === "no prefix" && !detect.alwaysRedirect && isSupportedLocale(pathLocale)) {
    return true;
  }
  return false;
}
function detectLocale(nuxtApp, route) {
  const detectConfig = useI18nDetection(nuxtApp);
  const detectors = useDetectors(useRequestEvent(nuxtApp), detectConfig, nuxtApp);
  const ctx = useNuxtI18nContext(nuxtApp);
  const path = isString(route) ? route : route.path;
  function* detect() {
    if (ctx.initial && detectConfig.enabled && !skipDetect(detectConfig, path, detectors.route(path))) {
      yield detectors.cookie();
      yield detectors.header();
      yield detectors.navigator();
      yield detectConfig.fallbackLocale;
    }
    {
      yield detectors.route(route);
    }
  }
  for (const detected of detect()) {
    if (detected && isSupportedLocale(detected)) {
      return detected;
    }
  }
  return ctx.getLocale() || ctx.getDefaultLocale() || "";
}
function navigate(nuxtApp, to, locale) {
  const ctx = useNuxtI18nContext(nuxtApp);
  const _ctx = useComposableContext(nuxtApp);
  if (to.path === "/" && ctx.rootRedirect) {
    return navigateTo(localePath(_ctx, ctx.rootRedirect.path, locale), { redirectCode: ctx.rootRedirect.code });
  }
  if (ctx.vueI18n.__pendingLocale && useNuxtApp()._processingMiddleware) {
    return;
  }
  const detectors = useDetectors(useRequestEvent(), useI18nDetection(nuxtApp), nuxtApp);
  if (detectors.route(to) === locale) {
    return;
  }
  const destination = switchLocalePath(_ctx, locale, to) || localePath(_ctx, to.fullPath, locale);
  if (isEqual(destination, to.fullPath)) {
    return;
  }
  return navigateTo(destination, { redirectCode: ctx.redirectStatusCode });
}
function prefixable(currentLocale, defaultLocale) {
  return (
    // only prefix default locale with strategy prefix
    currentLocale !== defaultLocale || false
  );
}
function createBaseUrlGetter(nuxt, baseUrl, defaultLocale, getDomainFromLocale) {
  if (isFunction(baseUrl)) {
    return () => baseUrl(nuxt);
  }
  return () => {
    return baseUrl ?? "";
  };
}
/*!
  * message-compiler v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14};
const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index22) => _buf[index22] === CHAR_CR && _buf[index22 + 1] === CHAR_LF;
  const isLF = (index22) => _buf[index22] === CHAR_LF;
  const isPS = (index22) => _buf[index22] === CHAR_PS;
  const isLS = (index22) => _buf[index22] === CHAR_LS;
  const isLineEnd = (index22) => isCRLF(index22) || isLF(index22) || isPS(index22) || isLS(index22);
  const index2 = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index: index2,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 13,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 13,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    13
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 7) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 7 || currentType === 11)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "") => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return hasSpace;
      } else if (ch === "@" || !ch) {
        return hasSpace;
      } else if (ch === "|") {
        return !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 4, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 6, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 12, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 11, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 10, readLinkedRefer(scnr));
          }
        }
        if (currentType === 7) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        13
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    // eslint-disable-next-line no-useless-escape
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index2) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index2, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 11) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 8) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 9) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 10:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 4:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 7: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 13 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 13);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 13) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 13) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 13) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    filename,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * core-base v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function isMessageAST(val) {
  return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (hasOwn(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type) {
  return new Error(`unhandled node type: ${type}`);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type = resolveType(body);
  if (type === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = resolveType(node);
  switch (type) {
    case 3: {
      return resolveValue$1(node, type);
    }
    case 9: {
      return resolveValue$1(node, type);
    }
    case 4: {
      const named = node;
      if (hasOwn(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type);
    }
    case 5: {
      const list = node;
      if (hasOwn(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type);
    }
    case 8: {
      return resolveValue$1(node, type);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = create();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: "production" !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve = locale();
        if (isPromise(resolve)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return ch;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index2 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index2 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index2++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index2++;
    c = path[index2];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const key = hit[i];
    if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
      return null;
    }
    const val = last[key];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const VERSION$1 = "11.1.11";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create() });
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales2) {
  const index2 = locales2.indexOf(targetLocale);
  if (index2 === -1) {
    return false;
  }
  for (let i = index2 + 1; i < locales2.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales2[i])) {
      return true;
    }
  }
  return false;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales2 = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id2 = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id2)) {
      continue;
    }
    context.__datetimeFormatters.delete(id2);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales2 = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id2 = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id2 = `${id2}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id2);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id2, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id2 = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id2)) {
      continue;
    }
    context.__numberFormatters.delete(id2);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index2) => _list[index2];
  const _named = options.named || create();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key, true)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign(create(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate$1(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || create()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (escapeParameter && isString(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales2 = localeFallbacker(context, fallbackLocale, locale);
  let message = create();
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    message = messages[targetLocale] || create();
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales2)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = (() => format2);
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create();
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key, useLinked) => {
    let val = resolveValue2(message, key);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
/*!
  * vue-i18n v11.1.11
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "11.1.11";
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32};
function createI18nError(code, ...args) {
  return createCompileError(code, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl2, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl2.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales2 = Object.keys(messages);
  if (locales2.length) {
    locales2.forEach((locale) => {
      gl2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales22 = Object.keys(options.datetimeFormats);
      if (locales22.length) {
        locales22.forEach((locale) => {
          gl2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales22 = Object.keys(options.numberFormats);
      if (locales22.length) {
        locales22.forEach((locale) => {
          gl2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return ((ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  });
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _context.locale = val;
      _locale.value = val;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _context.fallbackLocale = val;
      _fallbackLocale.value = val;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if ("production" !== "production" || false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate$1, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val) || isArray(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate$1, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales2 = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales2.length; i++) {
      const targetLocaleMessages = _messages.value[locales2[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key[0] !== "_");
      const options = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign(create(), attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = create();
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index2) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index2}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign(create(), attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el2, binding) => {
    const [textContent, composer] = _process(binding);
    el2.__composer = composer;
    el2.textContent = textContent;
  };
  const unregister = (el2) => {
    if (el2.__composer) {
      el2.__composer = void 0;
      delete el2.__composer;
    }
  };
  const update = (el2, { value }) => {
    if (el2.__composer) {
      const composer = el2.__composer;
      const parsedValue = parseValue(value);
      el2.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return "composition";
    },
    // install plugin
    async install(app, ...options2) {
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (__globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl2 = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl2, options, componentOptions);
    return gl2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl2;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl2) {
      composerOptions.__root = gl2;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode) {
  const scope = effectScope();
  const obj = scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
function useRouteBaseName(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route) => {
    if (route == null) return;
    return common.getRouteBaseName(route) || void 0;
  };
}
function useLocalePath(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route, locale) => localePath(common, route, locale);
}
function useLocaleRoute(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (route, locale) => localeRoute(common, route, locale);
}
function useSwitchLocalePath(nuxtApp = useNuxtApp()) {
  const common = useComposableContext(nuxtApp);
  return (locale) => switchLocalePath(common, locale);
}
const useAuth = () => {
  const user = useState("auth.user", () => null);
  const accessToken = useStorage$1("auth.access_token", "");
  const refreshToken = useStorage$1("auth.refresh_token", "");
  const isLoggedIn = computed(() => !!user.value && !!accessToken.value);
  const isMainAdmin = computed(() => (user.value?.role || "") === "main_admin");
  const isAdmin = computed(() => ["senior_support", "main_admin"].includes(user.value?.role || ""));
  const isSupport = computed(() => ["simple_support", "senior_support", "main_admin"].includes(user.value?.role || ""));
  const login = (keepOpen = false) => {
    useAuthModal().open("signin", { keepOpen });
  };
  const logout = async (askConfirm = false, t = () => "") => {
    if (askConfirm) {
      const confirmed = await useConfirm({
        title: t("common.labels.logout"),
        message: t("common.messages.confirm_logout"),
        confirmColor: "error",
        confirmLabel: t("common.labels.logout"),
        cancelLabel: t("common.labels.cancel")
      });
      if (confirmed) {
        accessToken.value = "";
        refreshToken.value = "";
        user.value = null;
        navigateTo(useLocalePath()("index"));
      }
    } else {
      accessToken.value = "";
      refreshToken.value = "";
      user.value = null;
      navigateTo(useLocalePath()("index"));
    }
  };
  return {
    user: readonly(user),
    isLoggedIn,
    isMainAdmin,
    isAdmin,
    isSupport,
    accessToken,
    refreshToken,
    login,
    logout,
    setUser: (u) => user.value = u
  };
};
const useAuthApi = async (url, opts = {}) => {
  const data = ref(null);
  const error = ref(null);
  const { accessToken, refreshToken, logout } = useAuth();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const makeRequest = async (token) => {
    return await $fetch(url, {
      baseURL: config.public.apiBase,
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        ...opts.headers
      }
    });
  };
  try {
    data.value = await makeRequest(accessToken.value);
  } catch (err) {
    if (err.status === 401 && refreshToken.value) {
      try {
        const res = await $fetch("/api/auth/refresh/", {
          method: "POST",
          body: { refresh: refreshToken.value }
        });
        accessToken.value = res.access;
        data.value = await makeRequest(res.access);
      } catch {
        await logout();
        if (opts.forceLogin) {
          useAuthModal().open("signin");
        }
      }
    } else {
      error.value = err;
    }
  }
  return { data, error };
};
const loadAuth = async (forceLogin = false) => {
  const user = useState("auth.user", () => null);
  const error = useState("auth.error", () => null);
  if (!user.value) {
    try {
      const { data, error: fetchError } = await useAuthApi("/api/auth/users/me/", { forceLogin });
      if (fetchError.value || !data.value) {
        error.value = {
          message: fetchError.value?.message,
          statusCode: fetchError.value?.statusCode,
          stack: false ? fetchError.value?.stack : void 0
        };
        user.value = null;
      } else {
        if (data.value.ok) {
          user.value = data.value.data;
          error.value = null;
        } else {
          error.value = {
            message: "Failed to load user data.",
            statusCode: 500,
            stack: false ? new Error().stack : void 0
          };
          user.value = null;
        }
      }
    } catch (e) {
      error.value = {
        message: e.value?.message,
        statusCode: e.value?.statusCode,
        stack: void 0
      };
      console.log({ e });
      user.value = null;
    }
  }
  return { user, error };
};
const _01_4501_45dashboard_45auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  return;
});
const useAdminUsers = () => {
  const listUsers = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return await useAuthApi(`/api/auth/admin/users/?${query}`);
  };
  const listActiveUsers = async () => {
    return await listUsers({ active: true });
  };
  const getUserDetail = async (id2) => {
    const { data: response, error } = await useAuthApi(`/api/auth/admin/users/${id2}/`);
    if (response.value?.ok) return ref(response.value.data);
    throw createError({
      message: "User not found"
    });
  };
  const createSupportUser = async (payload) => {
    return await useAuthApi("/api/auth/admin/users/create/", { method: "POST", body: payload });
  };
  const updateUser = async (id2, payload) => {
    return await useAuthApi(`/api/auth/admin/users/${id2}/`, { method: "PATCH", body: payload });
  };
  const deleteUser = async (id2) => {
    return await useAuthApi(`/api/auth/admin/users/${id2}/`, { method: "DELETE" });
  };
  return { listUsers, listActiveUsers, getUserDetail, createSupportUser, updateUser, deleteUser };
};
const _01_45admin_45fetch_45users_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (!to.name?.toString().startsWith("admin-")) return;
  const usersState = useState("admin.users", () => []);
  if (usersState.value.length > 0) return;
  try {
    const { listUsers } = useAdminUsers();
    const response = ([__temp, __restore] = executeAsync(() => listUsers()), __temp = await __temp, __restore(), __temp);
    if (response.data.value?.results.ok) {
      usersState.value = response.data.value?.results;
    }
  } catch (error) {
    console.error("Failed to load users:", error);
  }
});
const useBreadcrumbStore = () => {
  return useState("breadcrumb.state", () => ({}));
};
const _02_45user_45order_45breadcrumb_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  if (!to.name?.toString().startsWith("admin-users-id")) return;
  const id2 = Number(to.params.id);
  const users = useState("admin.users");
  const user = users.value.find((u) => u.id === id2);
  const state = useBreadcrumbStore();
  if (!user) state.value = { name: "Error 404" };
  else if (!to.name?.toString().startsWith("admin-users-id-order")) {
    state.value = { name: user.full_name };
  } else if (to.name?.toString().startsWith("admin-users-id-order")) {
    const order = Number(to.params.order);
    state.value = { name: user.full_name, order };
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  _01_4501_45dashboard_45auth_45global,
  _01_45admin_45fetch_45users_45global,
  _02_45user_45order_45breadcrumb_45global,
  manifest_45route_45rule
];
const namedMiddleware = {
  admin: () => import('./admin-BcbvSly9.mjs'),
  auth: () => import('./auth-Dmug-Tk2.mjs'),
  support: () => import('./support-CoN8D0GY.mjs')
};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[to.matched.length - 1]?.components?.default === from.matched[from.matched.length - 1]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$2(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const VALID_ISLAND_KEY_RE = /^[a-z][a-z\d-]*_[a-z\d]+$/i;
function isValidIslandKey(key) {
  return typeof key === "string" && VALID_ISLAND_KEY_RE.test(key) && key.length <= 100;
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
{
  reducers.push(["Island", (data) => data && data?.__nuxt_island && isValidIslandKey(data.__nuxt_island.key) && data.__nuxt_island]);
}
const revive_payload_server_7WqdT7i4jHpjGKuRR_lojRTKIYpjr1jtMoL3sV8LZ50 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => index).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const server_plugin_aaOH_OyAFrobx0YJVlYVpz6uJThRSc8OUJPxSS2RJgE = /* @__PURE__ */ defineNuxtPlugin(async (_nuxtApp) => {
  let __temp, __restore;
  [__temp, __restore] = executeAsync(() => import('./virtual_nuxt__home_realsamy_PycharmProjects_ErfaPay_old_frontend_node_modules_.cache_nuxt_.nuxt_echarts-8r5E2gMB.mjs')), await __temp, __restore();
});
const identifier = "nuxt-i18n-slp";
const switchLocalePathLinkWrapperExpr = new RegExp(
  [`<!--${identifier}-\\[(\\w+)\\]-->`, `.+?`, `<!--/${identifier}-->`].join(""),
  "g"
);
const switch_locale_path_ssr__H1YkRD2_3hUwNOgce78ktBrzly0eWIWSYx6xySblKE = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:switch-locale-path-ssr",
  dependsOn: ["i18n:plugin"],
  setup(_nuxt) {
    const nuxt = useNuxtApp(_nuxt._id);
    const switchLocalePath2 = useSwitchLocalePath(nuxt);
    nuxt.hook("app:rendered", (ctx) => {
      if (ctx.renderResult?.html == null) return;
      ctx.renderResult.html = ctx.renderResult.html.replaceAll(
        switchLocalePathLinkWrapperExpr,
        (match, p1) => {
          const encoded = encodeURI(switchLocalePath2(p1 ?? ""));
          return match.replace(
            /href="([^"]+)"/,
            `href="${encoded || "#"}" ${""}`
          );
        }
      );
    });
  }
});
const route_locale_detect_xzY7vKj6mWh2XDRl8VkGrfU_ZqLQIpQG2_3jb9bP6C8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:route-locale-detect",
  dependsOn: ["i18n:plugin"],
  async setup(_nuxt) {
    let __temp, __restore;
    const nuxt = useNuxtApp(_nuxt._id);
    const ctx = useNuxtI18nContext(nuxt);
    const resolvedLocale = useResolvedLocale();
    [__temp, __restore] = executeAsync(() => nuxt.runWithContext(
      () => loadAndSetLocale(
        nuxt,
        ctx.initial && resolvedLocale.value || detectLocale(nuxt, nuxt.$router.currentRoute.value)
      )
    )), await __temp, __restore();
    return;
  }
});
const preload_I3B9absSuF2Z7Zybkwrejub_EkTo9Y_5Jr8dGltxsdE = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:preload",
  dependsOn: ["i18n:plugin"],
  async setup(_nuxt) {
    return;
  }
});
function extendI18n(i18n, { extendComposer, extendComposerInstance }) {
  const scope = effectScope();
  const installI18n = i18n.install.bind(i18n);
  i18n.install = (app, ...options) => {
    const pluginOptions = assign({}, options[0]);
    pluginOptions.__composerExtend = (c) => {
      extendComposerInstance(c, getComposer$3(i18n));
      return () => {
      };
    };
    if (i18n.mode === "legacy") {
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendComposerInstance(vueI18n, getComposer$3(vueI18n));
        return () => {
        };
      };
    }
    Reflect.apply(installI18n, i18n, [app, pluginOptions]);
    const globalComposer = getComposer$3(i18n);
    scope.run(() => {
      extendComposer(globalComposer);
      if (i18n.mode === "legacy" && "__composer" in i18n.global) {
        extendComposerInstance(i18n.global, getComposer$3(i18n.global));
      }
    });
    if (i18n.mode === "composition" && app.config.globalProperties.$i18n != null) {
      extendComposerInstance(app.config.globalProperties.$i18n, globalComposer);
    }
    if (app.unmount) {
      const unmountApp = app.unmount.bind(app);
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
}
const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};
const i18n_6qHMlnEtKcu5KXfrnRJ226pw_L_PQCgk8sX_gLo4Jsw = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: false,
  async setup(_nuxt) {
    let __temp, __restore;
    Object.defineProperty(_nuxt.versions, "nuxtI18n", { get: () => "10.0.3" });
    const nuxt = useNuxtApp(_nuxt._id);
    const runtimeI18n = useRuntimeI18n(nuxt);
    const preloadedOptions = nuxt.ssrContext?.event?.context?.nuxtI18n?.vueI18nOptions;
    const _defaultLocale = getDefaultLocaleForDomain(useRequestURL({ xForwardedHost: true }).host) || runtimeI18n.defaultLocale || "";
    const optionsI18n = preloadedOptions || ([__temp, __restore] = executeAsync(() => setupVueI18nOptions(_defaultLocale)), __temp = await __temp, __restore(), __temp);
    const localeConfigs = useLocaleConfigs();
    {
      localeConfigs.value = useRequestEvent().context.nuxtI18n?.localeConfigs || {};
    }
    prerenderRoutes(localeCodes.map((locale) => `/_i18n/${locale}/messages.json`));
    const i18n = createI18n(optionsI18n);
    const detectors = useDetectors(useRequestEvent(nuxt), useI18nDetection(nuxt), nuxt);
    const ctx = createNuxtI18nContext(nuxt, i18n, optionsI18n.defaultLocale);
    nuxt._nuxtI18n = ctx;
    extendI18n(i18n, {
      extendComposer(composer) {
        composer.locales = computed(() => runtimeI18n.locales);
        composer.localeCodes = computed(() => localeCodes);
        const _baseUrl = ref(ctx.getBaseUrl());
        composer.baseUrl = computed(() => _baseUrl.value);
        composer.strategy = "prefix_except_default";
        composer.localeProperties = computed(
          () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
        );
        composer.setLocale = async (locale) => {
          await loadAndSetLocale(nuxt, locale);
          await nuxt.runWithContext(() => navigate(nuxt, nuxt.$router.currentRoute.value, locale));
        };
        composer.loadLocaleMessages = ctx.loadMessages;
        composer.differentDomains = false;
        composer.defaultLocale = optionsI18n.defaultLocale;
        composer.getBrowserLocale = () => resolveSupportedLocale(detectors.header());
        composer.getLocaleCookie = () => resolveSupportedLocale(detectors.cookie());
        composer.setLocaleCookie = ctx.setCookieLocale;
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) return;
          await i18n.__resolvePendingLocalePromise?.();
        };
        composer.waitForPendingLocaleChange = async () => {
          await i18n?.__pendingLocalePromise;
        };
      },
      extendComposerInstance(instance, c) {
        const props = [
          ["locales", () => c.locales],
          ["localeCodes", () => c.localeCodes],
          ["baseUrl", () => c.baseUrl],
          ["strategy", () => "prefix_except_default"],
          ["localeProperties", () => c.localeProperties],
          ["setLocale", () => async (locale) => Reflect.apply(c.setLocale, c, [locale])],
          ["loadLocaleMessages", () => async (locale) => Reflect.apply(c.loadLocaleMessages, c, [locale])],
          ["differentDomains", () => false],
          ["defaultLocale", () => c.defaultLocale],
          ["getBrowserLocale", () => () => Reflect.apply(c.getBrowserLocale, c, [])],
          ["getLocaleCookie", () => () => Reflect.apply(c.getLocaleCookie, c, [])],
          ["setLocaleCookie", () => (locale) => Reflect.apply(c.setLocaleCookie, c, [locale])],
          ["finalizePendingLocaleChange", () => () => Reflect.apply(c.finalizePendingLocaleChange, c, [])],
          ["waitForPendingLocaleChange", () => () => Reflect.apply(c.waitForPendingLocaleChange, c, [])]
        ];
        for (const [key, get2] of props) {
          Object.defineProperty(instance, key, { get: get2 });
        }
      }
    });
    nuxt.vueApp.use(i18n);
    Object.defineProperty(nuxt, "$i18n", { get: () => getI18nTarget(i18n) });
    nuxt.provide("localeHead", (options) => localeHead(nuxt._nuxtI18n.composableCtx, options));
    nuxt.provide("localePath", useLocalePath(nuxt));
    nuxt.provide("localeRoute", useLocaleRoute(nuxt));
    nuxt.provide("routeBaseName", useRouteBaseName(nuxt));
    nuxt.provide("getRouteBaseName", useRouteBaseName(nuxt));
    nuxt.provide("switchLocalePath", useSwitchLocalePath(nuxt));
  }
});
const plugin_WwmOm3c3aH47nl90WGyRPOG29Sj_I9QlaazJugzv4A4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function getColor(color, shade) {
  if (color in colors && typeof colors[color] === "object" && shade in colors[color]) {
    return colors[color][shade];
  }
  return "";
}
function generateShades(key, value, prefix) {
  const prefixStr = prefix ? `${prefix}-` : "";
  return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--${prefixStr}color-${value === "neutral" ? "old-neutral" : value}-${shade}, ${getColor(value, shade)});`).join("\n  ")}`;
}
function generateColor(key, shade) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}
const colors_NTLYp4jntuKvAv_VxPJYw8_aKuFCkSPcKwacqgYS2ko = /* @__PURE__ */ defineNuxtPlugin(() => {
  const appConfig2 = useAppConfig();
  useNuxtApp();
  const root = computed(() => {
    const { neutral, ...colors2 } = appConfig2.ui.colors;
    const prefix = appConfig2.ui.prefix;
    return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig2.ui.colors).map(([key, value]) => generateShades(key, value, prefix)).join("\n  ")}
  }
  :root, :host, .light {
  ${Object.keys(colors2).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors2).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors"
    }]
  };
  useHead(headData);
});
const preference = "system";
const plugin_server_1VsdcVlQN2tv6RG6Fy0EvkojZKbQX61TrTVJeEFBIfo = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const loadAuth__eJK3_FIp7DDMdLehkTSDBxjjLCmGB7bngTJSbT3IDY = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  [__temp, __restore] = executeAsync(() => loadAuth()), await __temp, __restore();
});
const ssg_detect_wXTI9gx8V2AIU1mrAiPsBC_IDSL01bMpieTgjibORE4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:ssg-detect",
  dependsOn: ["i18n:plugin", "i18n:plugin:route-locale-detect"],
  enforce: "post",
  setup(_nuxt) {
    return;
  }
});
const plugins = [
  unhead_E_uJcFe0luHIDZLEqPsDjVWAAO5cZzqdHeZ5qnY46i0,
  plugin,
  revive_payload_server_7WqdT7i4jHpjGKuRR_lojRTKIYpjr1jtMoL3sV8LZ50,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  server_plugin_aaOH_OyAFrobx0YJVlYVpz6uJThRSc8OUJPxSS2RJgE,
  switch_locale_path_ssr__H1YkRD2_3hUwNOgce78ktBrzly0eWIWSYx6xySblKE,
  route_locale_detect_xzY7vKj6mWh2XDRl8VkGrfU_ZqLQIpQG2_3jb9bP6C8,
  preload_I3B9absSuF2Z7Zybkwrejub_EkTo9Y_5Jr8dGltxsdE,
  i18n_6qHMlnEtKcu5KXfrnRJ226pw_L_PQCgk8sX_gLo4Jsw,
  plugin_WwmOm3c3aH47nl90WGyRPOG29Sj_I9QlaazJugzv4A4,
  colors_NTLYp4jntuKvAv_VxPJYw8_aKuFCkSPcKwacqgYS2ko,
  plugin_server_1VsdcVlQN2tv6RG6Fy0EvkojZKbQX61TrTVJeEFBIfo,
  loadAuth__eJK3_FIp7DDMdLehkTSDBxjjLCmGB7bngTJSbT3IDY,
  ssg_detect_wXTI9gx8V2AIU1mrAiPsBC_IDSL01bMpieTgjibORE4
];
function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return value === currentValue;
  }
  if (typeof comparator === "function") {
    return comparator(value, currentValue);
  }
  if (typeof comparator === "string") {
    return get(value, comparator) === get(currentValue, comparator);
  }
  return isEqual$1(value, currentValue);
}
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return false;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (value instanceof Date || value instanceof RegExp || typeof value === "function") {
    return false;
  }
  if (typeof value === "object") {
    for (const _ in value) {
      if (Object.prototype.hasOwnProperty.call(value, _)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function getDisplayValue(items, value, options = {}) {
  const { valueKey, labelKey } = options;
  const foundItem = items.find((item) => {
    const itemValue = typeof item === "object" && item !== null && valueKey ? get(item, valueKey) : item;
    return compare(itemValue, value);
  });
  if (isEmpty(value) && foundItem) {
    return labelKey ? get(foundItem, labelKey) : void 0;
  }
  if (isEmpty(value)) {
    return void 0;
  }
  const source = foundItem ?? value;
  if (source === null || source === void 0) {
    return void 0;
  }
  if (typeof source === "object") {
    return labelKey ? get(source, labelKey) : void 0;
  }
  return String(source);
}
function isArrayOfArray(item) {
  return Array.isArray(item[0]);
}
function mergeClasses(appConfigClass, propClass) {
  if (!appConfigClass && !propClass) {
    return "";
  }
  return [
    ...Array.isArray(appConfigClass) ? appConfigClass : [appConfigClass],
    propClass
  ].filter(Boolean);
}
function transformUI(ui, uiProp) {
  return Object.entries(ui).reduce((acc, [key, value]) => {
    acc[key] = typeof value === "function" ? value({ class: uiProp?.[key] }) : value;
    return acc;
  }, uiProp || {});
}
function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}
// @__NO_SIDE_EFFECTS__
function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}
const en = /* @__PURE__ */ defineLocale({
  name: "English",
  code: "en",
  messages: {
    alert: {
      close: "Close"
    },
    authForm: {
      hidePassword: "Hide password",
      showPassword: "Show password",
      submit: "Continue"
    },
    banner: {
      close: "Close"
    },
    calendar: {
      nextMonth: "Next month",
      nextYear: "Next year",
      prevMonth: "Previous month",
      prevYear: "Previous year"
    },
    carousel: {
      dots: "Choose slide to display",
      goto: "Go to slide {slide}",
      next: "Next",
      prev: "Prev"
    },
    chatPrompt: {
      placeholder: "Type your message here…"
    },
    chatPromptSubmit: {
      label: "Send prompt"
    },
    colorMode: {
      dark: "Dark",
      light: "Light",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      system: "System"
    },
    commandPalette: {
      back: "Back",
      close: "Close",
      noData: "No data",
      noMatch: "No matching data",
      placeholder: "Type a command or search…"
    },
    contentSearch: {
      links: "Links",
      theme: "Theme"
    },
    contentSearchButton: {
      label: "Search…"
    },
    contentToc: {
      title: "On this page"
    },
    dashboardSearch: {
      theme: "Theme"
    },
    dashboardSearchButton: {
      label: "Search…"
    },
    dashboardSidebarCollapse: {
      collapse: "Collapse sidebar",
      expand: "Expand sidebar"
    },
    dashboardSidebarToggle: {
      close: "Close sidebar",
      open: "Open sidebar"
    },
    error: {
      clear: "Back to home"
    },
    fileUpload: {
      removeFile: "Remove {filename}"
    },
    header: {
      close: "Close menu",
      open: "Open menu"
    },
    inputMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data"
    },
    inputNumber: {
      decrement: "Decrement",
      increment: "Increment"
    },
    modal: {
      close: "Close"
    },
    pricingTable: {
      caption: "Pricing plan comparison"
    },
    prose: {
      codeCollapse: {
        closeText: "Collapse",
        name: "code",
        openText: "Expand"
      },
      collapsible: {
        closeText: "Hide",
        name: "properties",
        openText: "Show"
      },
      pre: {
        copy: "Copy code to clipboard"
      }
    },
    selectMenu: {
      create: 'Create "{label}"',
      noData: "No data",
      noMatch: "No matching data",
      search: "Search…"
    },
    slideover: {
      close: "Close"
    },
    table: {
      noData: "No data"
    },
    toast: {
      close: "Close"
    }
  }
});
const localeContextInjectionKey = Symbol.for("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef(inject(localeContextInjectionKey, en));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = _useLocale;
const portalTargetInjectionKey = Symbol("nuxt-ui.portal-target");
function usePortal(portal) {
  const globalPortal = inject(portalTargetInjectionKey, void 0);
  const value = computed(() => portal.value === true ? globalPortal?.value : portal.value);
  const disabled = computed(() => typeof value.value === "boolean" ? !value.value : false);
  const to = computed(() => typeof value.value === "boolean" ? "body" : value.value);
  return computed(() => ({
    to: to.value,
    disabled: disabled.value
  }));
}
const toastMaxInjectionKey = Symbol("nuxt-ui.toast-max");
function useToast() {
  const toasts = useState("toasts", () => []);
  const max = inject(toastMaxInjectionKey, void 0);
  const running = ref(false);
  const queue = [];
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  async function processQueue() {
    if (running.value || queue.length === 0) {
      return;
    }
    running.value = true;
    while (queue.length > 0) {
      const toast = queue.shift();
      await nextTick();
      toasts.value = [...toasts.value, toast].slice(-(max?.value ?? 5));
    }
    running.value = false;
  }
  function add(toast) {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    };
    queue.push(body);
    processQueue();
    return body;
  }
  function update(id2, toast) {
    const index2 = toasts.value.findIndex((t) => t.id === id2);
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
        ...toast
      };
    }
  }
  function remove(id2) {
    const index2 = toasts.value.findIndex((t) => t.id === id2);
    if (index2 !== -1) {
      toasts.value[index2] = {
        ...toasts.value[index2],
        open: false
      };
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id2);
    }, 200);
  }
  function clear() {
    toasts.value = [];
  }
  return {
    toasts,
    add,
    update,
    remove,
    clear
  };
}
const appConfigTv = appConfig;
const tv = /* @__PURE__ */ createTV(appConfigTv.ui?.tv);
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      {
        const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
const __nuxt_component_0$2 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss)
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize: props.customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "UIcon",
  __ssrInlineRender: true,
  props: {
    name: { type: null, required: true },
    mode: { type: String, required: false },
    size: { type: [String, Number], required: false },
    customize: { type: Function, required: false }
  },
  setup(__props) {
    const props = __props;
    const iconProps = useForwardProps(reactivePick(props, "name", "mode", "size", "customize"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$2;
      if (typeof __props.name === "string") {
        _push(ssrRenderComponent(_component_Icon, mergeProps(unref(iconProps), _attrs), null, _parent));
      } else {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.name), _attrs, null), _parent);
      }
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Icon.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const ImageComponent = "img";
const avatarGroupInjectionKey = Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = inject(avatarGroupInjectionKey, void 0);
  const size = computed(() => props.size ?? avatarGroup?.value.size);
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));
  return {
    size
  };
}
const theme$d = {
  "slots": {
    "root": "relative inline-flex items-center justify-center shrink-0",
    "base": "rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap"
  },
  "variants": {
    "color": {
      "primary": "bg-primary",
      "secondary": "bg-secondary",
      "success": "bg-success",
      "info": "bg-info",
      "warning": "bg-warning",
      "error": "bg-error",
      "neutral": "bg-inverted"
    },
    "size": {
      "3xs": "h-[4px] min-w-[4px] text-[4px]",
      "2xs": "h-[5px] min-w-[5px] text-[5px]",
      "xs": "h-[6px] min-w-[6px] text-[6px]",
      "sm": "h-[7px] min-w-[7px] text-[7px]",
      "md": "h-[8px] min-w-[8px] text-[8px]",
      "lg": "h-[9px] min-w-[9px] text-[9px]",
      "xl": "h-[10px] min-w-[10px] text-[10px]",
      "2xl": "h-[11px] min-w-[11px] text-[11px]",
      "3xl": "h-[12px] min-w-[12px] text-[12px]"
    },
    "position": {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0"
    },
    "inset": {
      "false": ""
    },
    "standalone": {
      "false": "absolute"
    }
  },
  "compoundVariants": [
    {
      "position": "top-right",
      "inset": false,
      "class": "-translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "bottom-right",
      "inset": false,
      "class": "translate-y-1/2 translate-x-1/2 transform"
    },
    {
      "position": "top-left",
      "inset": false,
      "class": "-translate-y-1/2 -translate-x-1/2 transform"
    },
    {
      "position": "bottom-left",
      "inset": false,
      "class": "translate-y-1/2 -translate-x-1/2 transform"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "position": "top-right"
  }
};
const _sfc_main$p = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UChip",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    text: { type: [String, Number], required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    position: { type: null, required: false },
    inset: { type: Boolean, required: false, default: false },
    standalone: { type: Boolean, required: false, default: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  }, {
    "show": { type: Boolean, ...{ default: true } },
    "showModifiers": {}
  }),
  emits: ["update:show"],
  setup(__props) {
    const props = __props;
    const show = useModel(__props, "show", { type: Boolean, ...{ default: true } });
    const { size } = useAvatarGroup(props);
    const appConfig2 = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$d), ...appConfig2.ui?.chip || {} })({
      color: props.color,
      size: size.value,
      position: props.position,
      inset: props.inset,
      standalone: props.standalone
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Slot), _ctx.$attrs, {
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
            if (show.value) {
              _push2(`<span data-slot="base" class="${ssrRenderClass(ui.value.base({ class: props.ui?.base }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                _push2(`${ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Slot), _ctx.$attrs, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16),
              show.value ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base })
              }, [
                renderSlot(_ctx.$slots, "content", {}, () => [
                  createTextVNode(toDisplayString$1(__props.text), 1)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Chip.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const theme$c = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle bg-elevated",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-muted truncate",
    "icon": "text-muted shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$o = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UAvatar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    src: { type: String, required: false },
    alt: { type: String, required: false },
    icon: { type: null, required: false },
    text: { type: String, required: false },
    size: { type: null, required: false },
    chip: { type: [Boolean, Object], required: false },
    class: { type: null, required: false },
    style: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const as = computed(() => {
      if (typeof props.as === "string" || typeof props.as?.render === "function") {
        return { root: props.as };
      }
      return defu(props.as, { root: "span" });
    });
    const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const appConfig2 = useAppConfig();
    const { size } = useAvatarGroup(props);
    const ui = computed(() => tv({ extend: tv(theme$c), ...appConfig2.ui?.avatar || {} })({
      size: size.value
    }));
    const sizePx = computed(() => ({
      "3xs": 16,
      "2xs": 20,
      "xs": 24,
      "sm": 28,
      "md": 32,
      "lg": 36,
      "xl": 40,
      "2xl": 44,
      "3xl": 48
    })[props.size || "md"]);
    const error = ref(false);
    watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.chip ? _sfc_main$p : unref(Primitive)), mergeProps({
        as: as.value.root
      }, props.chip ? typeof props.chip === "object" ? { inset: true, ...props.chip } : { inset: true } : {}, {
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        style: props.style
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.src && !error.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(as.value.img || unref(ImageComponent)), mergeProps({
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: props.ui?.image }),
                onError
              }), null), _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(unref(Slot), _ctx.$attrs, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                      if (__props.icon) {
                        _push3(ssrRenderComponent(_sfc_main$q, {
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<span data-slot="fallback" class="${ssrRenderClass(ui.value.fallback({ class: props.ui?.fallback }))}"${_scopeId2}>${ssrInterpolate(fallback.value || " ")}</span>`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        __props.icon ? (openBlock(), createBlock(_sfc_main$q, {
                          key: 0,
                          name: __props.icon,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "fallback",
                          class: ui.value.fallback({ class: props.ui?.fallback })
                        }, toDisplayString$1(fallback.value || " "), 3))
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.src && !error.value ? (openBlock(), createBlock(resolveDynamicComponent(as.value.img || unref(ImageComponent)), mergeProps({
                key: 0,
                src: __props.src,
                alt: __props.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                "data-slot": "image",
                class: ui.value.image({ class: props.ui?.image }),
                onError
              }), null, 16, ["src", "alt", "width", "height", "class"])) : (openBlock(), createBlock(unref(Slot), mergeProps({ key: 1 }, _ctx.$attrs), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    __props.icon ? (openBlock(), createBlock(_sfc_main$q, {
                      key: 0,
                      name: __props.icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: props.ui?.icon })
                    }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "fallback",
                      class: ui.value.fallback({ class: props.ui?.fallback })
                    }, toDisplayString$1(fallback.value || " "), 3))
                  ])
                ]),
                _: 3
              }, 16))
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Avatar.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
function useComponentIcons(componentProps) {
  const appConfig2 = useAppConfig();
  const props = computed(() => toValue(componentProps));
  const isLeading = computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig2.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}
const fieldGroupInjectionKey = Symbol("nuxt-ui.field-group");
function useFieldGroup(props) {
  const fieldGroup = inject(fieldGroupInjectionKey, void 0);
  return {
    orientation: computed(() => fieldGroup?.value.orientation),
    size: computed(() => props?.size ?? fieldGroup?.value.size)
  };
}
const formOptionsInjectionKey = Symbol("nuxt-ui.form-options");
const formBusInjectionKey = Symbol("nuxt-ui.form-events");
const formStateInjectionKey = Symbol("nuxt-ui.form-state");
const formFieldInjectionKey = Symbol("nuxt-ui.form-field");
const inputIdInjectionKey = Symbol("nuxt-ui.input-id");
const formInputsInjectionKey = Symbol("nuxt-ui.form-inputs");
const formLoadingInjectionKey = Symbol("nuxt-ui.form-loading");
const formErrorsInjectionKey = Symbol("nuxt-ui.form-errors");
function useFormField(props, opts) {
  const formOptions = inject(formOptionsInjectionKey, void 0);
  const formBus = inject(formBusInjectionKey, void 0);
  const formField = inject(formFieldInjectionKey, void 0);
  const inputId = inject(inputIdInjectionKey, void 0);
  provide(formFieldInjectionKey, void 0);
  if (formField && inputId) {
    if (opts?.bind === false) {
      inputId.value = void 0;
    } else if (props?.id) {
      inputId.value = props?.id;
    }
  }
  function emitFormEvent(type, name, eager) {
    if (formBus && formField && name) {
      formBus.emit({ type, name, eager });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formField?.value.name);
  }
  function emitFormFocus() {
    emitFormEvent("focus", formField?.value.name);
  }
  function emitFormChange() {
    emitFormEvent("change", formField?.value.name);
  }
  const emitFormInput = useDebounceFn(
    () => {
      emitFormEvent("input", formField?.value.name, !opts?.deferInputValidation || formField?.value.eagerValidation);
    },
    formField?.value.validateOnInputDelay ?? formOptions?.value.validateOnInputDelay ?? 0
  );
  return {
    id: computed(() => props?.id ?? inputId?.value),
    name: computed(() => props?.name ?? formField?.value.name),
    size: computed(() => props?.size ?? formField?.value.size),
    color: computed(() => formField?.value.error ? "error" : props?.color),
    highlight: computed(() => formField?.value.error ? true : props?.highlight),
    disabled: computed(() => formOptions?.value.disabled || props?.disabled),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!formField?.value) return;
      const descriptiveAttrs = ["error", "hint", "description", "help"].filter((type) => formField?.value?.[type]).map((type) => `${formField?.value.ariaId}-${type}`) || [];
      const attrs = {
        "aria-invalid": !!formField?.value.error
      };
      if (descriptiveAttrs.length > 0) {
        attrs["aria-describedby"] = descriptiveAttrs.join(" ");
      }
      return attrs;
    })
  };
}
const linkKeys = [
  "active",
  "activeClass",
  "ariaCurrentValue",
  "as",
  "disabled",
  "download",
  "exact",
  "exactActiveClass",
  "exactHash",
  "exactQuery",
  "external",
  "form",
  "formaction",
  "formenctype",
  "formmethod",
  "formnovalidate",
  "formtarget",
  "href",
  "hreflang",
  "inactiveClass",
  "media",
  "noPrefetch",
  "noRel",
  "onClick",
  "ping",
  "prefetch",
  "prefetchOn",
  "prefetchedClass",
  "referrerpolicy",
  "rel",
  "replace",
  "target",
  "title",
  "to",
  "trailingSlash",
  "type",
  "viewTransition"
];
function pickLinkProps(link) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  const propsToInclude = [
    ...linkKeys,
    ...ariaKeys,
    ...dataKeys
  ];
  return reactivePick(link, ...propsToInclude);
}
function isPartiallyEqual(item1, item2) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") {
      filtered.add(q.key);
    }
    return filtered;
  }, /* @__PURE__ */ new Set());
  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
  return isEqual$1(item1Filtered, item2Filtered);
}
const _sfc_main$n = {
  __name: "ULinkBase",
  __ssrInlineRender: true,
  props: {
    as: { type: String, required: false, default: "button" },
    type: { type: String, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    href: { type: String, required: false },
    navigate: { type: Function, required: false },
    target: { type: [String, Object, null], required: false },
    rel: { type: [String, Object, null], required: false },
    active: { type: Boolean, required: false },
    isExternal: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps(__props.href ? {
        "as": "a",
        "href": __props.disabled ? void 0 : __props.href,
        "aria-disabled": __props.disabled ? "true" : void 0,
        "role": __props.disabled ? "link" : void 0,
        "tabindex": __props.disabled ? -1 : void 0
      } : __props.as === "button" ? {
        as: __props.as,
        type: __props.type,
        disabled: __props.disabled
      } : {
        as: __props.as
      }, {
        rel: __props.rel,
        target: __props.target,
        onClick: onClickWrapper
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/LinkBase.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const theme$b = {
  "base": "focus-visible:outline-primary",
  "variants": {
    "active": {
      "true": "text-primary",
      "false": "text-muted"
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  },
  "compoundVariants": [
    {
      "active": false,
      "disabled": false,
      "class": [
        "hover:text-default",
        "transition-colors"
      ]
    }
  ]
};
const _sfc_main$m = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "ULink",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "button" },
    type: { type: null, required: false, default: "button" },
    disabled: { type: Boolean, required: false },
    active: { type: Boolean, required: false, default: void 0 },
    exact: { type: Boolean, required: false },
    exactQuery: { type: [Boolean, String], required: false },
    exactHash: { type: Boolean, required: false },
    inactiveClass: { type: String, required: false },
    custom: { type: Boolean, required: false },
    raw: { type: Boolean, required: false },
    class: { type: null, required: false },
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
    ariaCurrentValue: { type: String, required: false, default: "page" },
    viewTransition: { type: Boolean, required: false },
    replace: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const appConfig2 = useAppConfig();
    const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "class"));
    const ui = computed(() => tv({
      extend: tv(theme$b),
      ...defu({
        variants: {
          active: {
            true: mergeClasses(appConfig2.ui?.link?.variants?.active?.true, props.activeClass),
            false: mergeClasses(appConfig2.ui?.link?.variants?.active?.false, props.inactiveClass)
          }
        }
      }, appConfig2.ui?.link || {})
    }));
    const to = computed(() => props.to ?? props.href);
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual$1(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive }) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps(unref(nuxtLinkProps), {
        to: to.value,
        custom: ""
      }, _attrs), {
        default: withCtx(({ href, navigate: navigate2, route: linkRoute, rel, target, isExternal, isActive, isExactActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.custom) {
              ssrRenderSlot(_ctx.$slots, "default", {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate: navigate2,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              }, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_sfc_main$n, mergeProps({
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate: navigate2,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {
                      active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                    }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {
                        active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              __props.custom ? renderSlot(_ctx.$slots, "default", mergeProps({ key: 0 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate: navigate2,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })) : (openBlock(), createBlock(_sfc_main$n, mergeProps({ key: 1 }, {
                ..._ctx.$attrs,
                ...__props.exact && isExactActive ? { "aria-current": props.ariaCurrentValue } : {},
                as: __props.as,
                type: __props.type,
                disabled: __props.disabled,
                href,
                navigate: navigate2,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                  })
                ]),
                _: 2
              }, 1040, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Link.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const theme$a = {
  "slots": {
    "base": [
      "rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary hover:bg-secondary/75 active:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success hover:bg-success/75 active:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info hover:bg-info/75 active:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning hover:bg-warning/75 active:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error hover:bg-error/75 active:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary hover:bg-secondary/10 active:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success hover:bg-success/10 active:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info hover:bg-info/10 active:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 active:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error hover:bg-error/10 active:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10 hover:bg-success/15 active:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10 hover:bg-info/15 active:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10 hover:bg-warning/15 active:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10 hover:bg-error/15 active:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 active:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 active:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 active:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 active:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 active:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 active:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-primary hover:bg-primary/10 active:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-secondary hover:bg-secondary/10 active:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-success hover:bg-success/10 active:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-info hover:bg-info/10 active:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-warning hover:bg-warning/10 active:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-error hover:bg-error/10 active:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-primary hover:text-primary/75 active:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-secondary hover:text-secondary/75 active:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-success hover:text-success/75 active:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-info hover:text-info/75 active:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-warning hover:text-warning/75 active:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-error hover:text-error/75 active:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-muted hover:text-default active:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$l = {
  __name: "UButton",
  __ssrInlineRender: true,
  props: {
    label: { type: String, required: false },
    color: { type: null, required: false },
    activeColor: { type: null, required: false },
    variant: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: null, required: false },
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
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig2 = useAppConfig();
    const { orientation, size: buttonSize } = useFieldGroup(props);
    const linkProps = useForwardProps(pickLinkProps(props));
    const loadingAutoState = ref(false);
    const formLoading = inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn?.(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || formLoading?.value && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui = computed(() => tv({
      extend: tv(theme$a),
      ...defu({
        variants: {
          active: {
            true: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.true?.base, props.activeClass)
            },
            false: {
              base: mergeClasses(appConfig2.ui?.button?.variants?.active?.false?.base, props.inactiveClass)
            }
          }
        }
      }, appConfig2.ui?.button || {})
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$m, mergeProps({
        type: __props.type,
        disabled: __props.disabled || isLoading.value
      }, unref(omit)(unref(linkProps), ["type", "disabled", "onClick"]), { custom: "" }, _attrs), {
        default: withCtx(({ active, ...slotProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$n, mergeProps(slotProps, {
              "data-slot": "base",
              class: ui.value.base({
                class: [props.ui?.base, props.class],
                active,
                ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                ...active && __props.activeColor ? { color: __props.activeColor } : {}
              }),
              onClick: onClickWrapper
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                    if (unref(isLeading) && unref(leadingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$q, {
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: props.ui?.leadingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else if (!!__props.avatar) {
                      _push3(ssrRenderComponent(_sfc_main$o, mergeProps({
                        size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar, active })
                      }), null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
                    if (__props.label !== void 0 && __props.label !== null) {
                      _push3(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: props.ui?.label, active }))}"${_scopeId2}>${ssrInterpolate(__props.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                    if (unref(isTrailing) && unref(trailingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$q, {
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: props.ui?.trailingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                        key: 0,
                        name: unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: props.ui?.leadingIcon, active })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                        key: 1,
                        size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "leadingAvatar",
                        class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar, active })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ]),
                    renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                      __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "label",
                        class: ui.value.label({ class: props.ui?.label, active })
                      }, toDisplayString$1(__props.label), 3)) : createCommentVNode("", true)
                    ]),
                    renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                      unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                        key: 0,
                        name: unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: props.ui?.trailingIcon, active })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$n, mergeProps(slotProps, {
                "data-slot": "base",
                class: ui.value.base({
                  class: [props.ui?.base, props.class],
                  active,
                  ...active && __props.activeVariant ? { variant: __props.activeVariant } : {},
                  ...active && __props.activeColor ? { color: __props.activeColor } : {}
                }),
                onClick: onClickWrapper
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                      key: 0,
                      name: unref(leadingIconName),
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: props.ui?.leadingIcon, active })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                      key: 1,
                      size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      "data-slot": "leadingAvatar",
                      class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar, active })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [
                    __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: props.ui?.label, active })
                    }, toDisplayString$1(__props.label), 3)) : createCommentVNode("", true)
                  ]),
                  renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                    unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                      key: 0,
                      name: unref(trailingIconName),
                      "data-slot": "trailingIcon",
                      class: ui.value.trailingIcon({ class: props.ui?.trailingIcon, active })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1040, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Button.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const theme$9 = {
  "slots": {
    "root": "gap-2",
    "base": "relative overflow-hidden rounded-full bg-accented",
    "indicator": "rounded-full size-full transition-transform duration-200 ease-out",
    "status": "flex text-dimmed transition-[width] duration-200",
    "steps": "grid items-end",
    "step": "truncate text-end row-start-1 col-start-1 transition-opacity"
  },
  "variants": {
    "animation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "color": {
      "primary": {
        "indicator": "bg-primary",
        "steps": "text-primary"
      },
      "secondary": {
        "indicator": "bg-secondary",
        "steps": "text-secondary"
      },
      "success": {
        "indicator": "bg-success",
        "steps": "text-success"
      },
      "info": {
        "indicator": "bg-info",
        "steps": "text-info"
      },
      "warning": {
        "indicator": "bg-warning",
        "steps": "text-warning"
      },
      "error": {
        "indicator": "bg-error",
        "steps": "text-error"
      },
      "neutral": {
        "indicator": "bg-inverted",
        "steps": "text-inverted"
      }
    },
    "size": {
      "2xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "xs": {
        "status": "text-xs",
        "steps": "text-xs"
      },
      "sm": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "md": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "lg": {
        "status": "text-sm",
        "steps": "text-sm"
      },
      "xl": {
        "status": "text-base",
        "steps": "text-base"
      },
      "2xl": {
        "status": "text-base",
        "steps": "text-base"
      }
    },
    "step": {
      "active": {
        "step": "opacity-100"
      },
      "first": {
        "step": "opacity-100 text-muted"
      },
      "other": {
        "step": "opacity-0"
      },
      "last": {
        "step": ""
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex flex-col",
        "base": "w-full",
        "status": "flex-row items-center justify-end min-w-fit"
      },
      "vertical": {
        "root": "h-full flex flex-row-reverse",
        "base": "h-full",
        "status": "flex-col justify-end min-h-fit"
      }
    },
    "inverted": {
      "true": {
        "status": "self-end"
      }
    }
  },
  "compoundVariants": [
    {
      "inverted": true,
      "orientation": "horizontal",
      "class": {
        "step": "text-start",
        "status": "flex-row-reverse"
      }
    },
    {
      "inverted": true,
      "orientation": "vertical",
      "class": {
        "steps": "items-start",
        "status": "flex-col-reverse"
      }
    },
    {
      "orientation": "horizontal",
      "size": "2xs",
      "class": "h-px"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "h-0.5"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "h-1"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "h-2"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "h-3"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "h-4"
    },
    {
      "orientation": "horizontal",
      "size": "2xl",
      "class": "h-5"
    },
    {
      "orientation": "vertical",
      "size": "2xs",
      "class": "w-px"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "w-0.5"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "w-1"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "w-2"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "w-3"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "w-4"
    },
    {
      "orientation": "vertical",
      "size": "2xl",
      "class": "w-5"
    },
    {
      "orientation": "horizontal",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "carousel-inverse",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "swing",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "horizontal",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]"
      }
    },
    {
      "orientation": "vertical",
      "animation": "elastic",
      "class": {
        "indicator": "data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "animation": "carousel",
    "color": "primary",
    "size": "md"
  }
};
const _sfc_main$k = {
  __name: "UProgress",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    max: { type: [Number, Array], required: false },
    status: { type: Boolean, required: false },
    inverted: { type: Boolean, required: false, default: false },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    animation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    getValueLabel: { type: Function, required: false },
    getValueText: { type: Function, required: false },
    modelValue: { type: [Number, null], required: false, default: null }
  },
  emits: ["update:modelValue", "update:max"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig2 = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
    const isIndeterminate = computed(() => rootProps.value.modelValue === null);
    const hasSteps = computed(() => Array.isArray(props.max));
    const realMax = computed(() => {
      if (isIndeterminate.value || !props.max) {
        return void 0;
      }
      if (Array.isArray(props.max)) {
        return props.max.length - 1;
      }
      return Number(props.max);
    });
    const percent = computed(() => {
      if (isIndeterminate.value) {
        return void 0;
      }
      switch (true) {
        case rootProps.value.modelValue < 0:
          return 0;
        case rootProps.value.modelValue > (realMax.value ?? 100):
          return 100;
        default:
          return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
      }
    });
    const indicatorStyle = computed(() => {
      if (percent.value === void 0) {
        return;
      }
      if (props.orientation === "vertical") {
        return {
          transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
        };
      } else {
        if (dir.value === "rtl") {
          return {
            transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
          };
        } else {
          return {
            transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
          };
        }
      }
    });
    const statusStyle = computed(() => {
      const value = `${Math.max(percent.value ?? 0, 0)}%`;
      return props.orientation === "vertical" ? { height: value } : { width: value };
    });
    function isActive(index2) {
      return index2 === Number(props.modelValue);
    }
    function isFirst(index2) {
      return index2 === 0;
    }
    function isLast(index2) {
      return index2 === realMax.value;
    }
    function stepVariant(index2) {
      index2 = Number(index2);
      if (isActive(index2) && !isFirst(index2)) {
        return "active";
      }
      if (isFirst(index2) && isActive(index2)) {
        return "first";
      }
      if (isLast(index2) && isActive(index2)) {
        return "last";
      }
      return "other";
    }
    const ui = computed(() => tv({ extend: tv(theme$9), ...appConfig2.ui?.progress || {} })({
      animation: props.animation,
      size: props.size,
      color: props.color,
      orientation: props.orientation,
      inverted: props.inverted
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isIndeterminate.value && (__props.status || !!slots.status)) {
              _push2(`<div data-slot="status" class="${ssrRenderClass(ui.value.status({ class: props.ui?.status }))}" style="${ssrRenderStyle(statusStyle.value)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "status", { percent: percent.value }, () => {
                _push2(`${ssrInterpolate(percent.value)}% `);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(ProgressRoot), mergeProps(unref(rootProps), {
              max: realMax.value,
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base }),
              style: { "transform": "translateZ(0)" }
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ProgressIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator }),
                    style: indicatorStyle.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ProgressIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: props.ui?.indicator }),
                      style: indicatorStyle.value
                    }, null, 8, ["class", "style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (hasSteps.value) {
              _push2(`<div data-slot="steps" class="${ssrRenderClass(ui.value.steps({ class: props.ui?.steps }))}"${_scopeId}><!--[-->`);
              ssrRenderList(__props.max, (step, index2) => {
                _push2(`<div data-slot="step" class="${ssrRenderClass(ui.value.step({ class: props.ui?.step, step: stepVariant(index2) }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, `step-${index2}`, { step }, () => {
                  _push2(`${ssrInterpolate(step)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !isIndeterminate.value && (__props.status || !!slots.status) ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "status",
                class: ui.value.status({ class: props.ui?.status }),
                style: statusStyle.value
              }, [
                renderSlot(_ctx.$slots, "status", { percent: percent.value }, () => [
                  createTextVNode(toDisplayString$1(percent.value) + "% ", 1)
                ])
              ], 6)) : createCommentVNode("", true),
              createVNode(unref(ProgressRoot), mergeProps(unref(rootProps), {
                max: realMax.value,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base }),
                style: { "transform": "translateZ(0)" }
              }), {
                default: withCtx(() => [
                  createVNode(unref(ProgressIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator }),
                    style: indicatorStyle.value
                  }, null, 8, ["class", "style"])
                ]),
                _: 1
              }, 16, ["max", "class"]),
              hasSteps.value ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "steps",
                class: ui.value.steps({ class: props.ui?.steps })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.max, (step, index2) => {
                  return openBlock(), createBlock("div", {
                    key: index2,
                    "data-slot": "step",
                    class: ui.value.step({ class: props.ui?.step, step: stepVariant(index2) })
                  }, [
                    renderSlot(_ctx.$slots, `step-${index2}`, { step }, () => [
                      createTextVNode(toDisplayString$1(step), 1)
                    ])
                  ], 2);
                }), 128))
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Progress.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const theme$8 = {
  "slots": {
    "root": "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-highlighted",
    "description": "text-sm text-muted",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
        "icon": "text-success"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
        "icon": "text-highlighted"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary"
  }
};
const _sfc_main$j = {
  __name: "UToast",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: [String, Object, Function], required: false },
    description: { type: [String, Object, Function], required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    actions: { type: Array, required: false },
    progress: { type: [Boolean, Object], required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    type: { type: String, required: false },
    duration: { type: Number, required: false }
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig2 = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
    const ui = computed(() => tv({ extend: tv(theme$8), ...appConfig2.ui?.toast || {} })({
      color: props.color,
      orientation: props.orientation,
      title: !!props.title || !!slots.title
    }));
    const rootRef = useTemplateRef("rootRef");
    const height = ref(0);
    __expose({
      height
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastRoot), mergeProps({
        ref_key: "rootRef",
        ref: rootRef
      }, unref(rootProps), {
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        style: { "--height": height.value }
      }, _attrs), {
        default: withCtx(({ remaining, duration: duration2, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
              if (__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$o, mergeProps({
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, _parent2, _scopeId));
              } else if (__props.icon) {
                _push2(ssrRenderComponent(_sfc_main$q, {
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: props.ui?.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
            if (__props.title || !!slots.title) {
              _push2(ssrRenderComponent(unref(ToastTitle), {
                "data-slot": "title",
                class: ui.value.title({ class: props.ui?.title })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                      if (typeof __props.title === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.title()), null, null), _parent3, _scopeId2);
                      } else if (typeof __props.title === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.title), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(__props.title)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        typeof __props.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 })) : typeof __props.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString$1(__props.title), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(ssrRenderComponent(unref(ToastDescription), {
                "data-slot": "description",
                class: ui.value.description({ class: props.ui?.description })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                      if (typeof __props.description === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.description()), null, null), _parent3, _scopeId2);
                      } else if (typeof __props.description === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.description), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(__props.description)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "description", {}, () => [
                        typeof __props.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 })) : typeof __props.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString$1(__props.description), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.orientation === "vertical" && (__props.actions?.length || !!slots.actions)) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: props.ui?.actions }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(__props.actions, (action, index2) => {
                  _push2(ssrRenderComponent(unref(ToastAction), {
                    key: index2,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                          size: "xs",
                          color: __props.color
                        }, { ref_for: true }, action), null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_sfc_main$l, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, 16, ["color"])
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
            if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close) {
              _push2(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: props.ui?.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (__props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions)) {
                ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(__props.actions, (action, index2) => {
                    _push2(ssrRenderComponent(unref(ToastAction), {
                      key: index2,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: () => {
                      }
                    }, {
                      default: withCtx((_, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_sfc_main$l, mergeProps({
                              size: "xs",
                              color: __props.color
                            }, { ref_for: true }, action), null, 16, ["color"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.close || !!slots.close) {
                _push2(ssrRenderComponent(unref(ToastClose), { "as-child": "" }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                        if (__props.close) {
                          _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)("toast.close")
                          }, typeof __props.close === "object" ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: props.ui?.close }),
                            onClick: () => {
                            }
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                          __props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                            key: 0,
                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)("toast.close")
                          }, typeof __props.close === "object" ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: props.ui?.close }),
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.progress && open && remaining > 0 && duration2) {
              _push2(ssrRenderComponent(_sfc_main$k, mergeProps({
                "model-value": remaining / duration2 * 100,
                color: __props.color
              }, typeof __props.progress === "object" ? __props.progress : {}, {
                size: "sm",
                "data-slot": "progress",
                class: ui.value.progress({ class: props.ui?.progress })
              }), null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                __props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                  key: 0,
                  size: props.ui?.avatarSize || ui.value.avatarSize()
                }, __props.avatar, {
                  "data-slot": "avatar",
                  class: ui.value.avatar({ class: props.ui?.avatar })
                }), null, 16, ["size", "class"])) : __props.icon ? (openBlock(), createBlock(_sfc_main$q, {
                  key: 1,
                  name: __props.icon,
                  "data-slot": "icon",
                  class: ui.value.icon({ class: props.ui?.icon })
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ]),
              createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.title || !!slots.title ? (openBlock(), createBlock(unref(ToastTitle), {
                  key: 0,
                  "data-slot": "title",
                  class: ui.value.title({ class: props.ui?.title })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      typeof __props.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title()), { key: 0 })) : typeof __props.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString$1(__props.title), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock(unref(ToastDescription), {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      typeof __props.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description()), { key: 0 })) : typeof __props.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(__props.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString$1(__props.description), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                __props.orientation === "vertical" && (__props.actions?.length || !!slots.actions) ? (openBlock(), createBlock("div", {
                  key: 2,
                  "data-slot": "actions",
                  class: ui.value.actions({ class: props.ui?.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                      return openBlock(), createBlock(unref(ToastAction), {
                        key: index2,
                        "alt-text": action.label || "Action",
                        "as-child": "",
                        onClick: withModifiers(() => {
                        }, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$l, mergeProps({
                            size: "xs",
                            color: __props.color
                          }, { ref_for: true }, action), null, 16, ["color"])
                        ]),
                        _: 2
                      }, 1032, ["alt-text", "onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) || __props.close ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "actions",
                class: ui.value.actions({ class: props.ui?.actions, orientation: "horizontal" })
              }, [
                __props.orientation === "horizontal" && (__props.actions?.length || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.actions, (action, index2) => {
                    return openBlock(), createBlock(unref(ToastAction), {
                      key: index2,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$l, mergeProps({
                          size: "xs",
                          color: __props.color
                        }, { ref_for: true }, action), null, 16, ["color"])
                      ]),
                      _: 2
                    }, 1032, ["alt-text", "onClick"]);
                  }), 128))
                ]) : createCommentVNode("", true),
                __props.close || !!slots.close ? (openBlock(), createBlock(unref(ToastClose), {
                  key: 1,
                  "as-child": ""
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                      __props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                        key: 0,
                        icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                        color: "neutral",
                        variant: "link",
                        "aria-label": unref(t)("toast.close")
                      }, typeof __props.close === "object" ? __props.close : {}, {
                        "data-slot": "close",
                        class: ui.value.close({ class: props.ui?.close }),
                        onClick: withModifiers(() => {
                        }, ["stop"])
                      }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 3
                })) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true),
              __props.progress && open && remaining > 0 && duration2 ? (openBlock(), createBlock(_sfc_main$k, mergeProps({
                key: 1,
                "model-value": remaining / duration2 * 100,
                color: __props.color
              }, typeof __props.progress === "object" ? __props.progress : {}, {
                size: "sm",
                "data-slot": "progress",
                class: ui.value.progress({ class: props.ui?.progress })
              }), null, 16, ["model-value", "color", "class"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Toast.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const theme$7 = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:opacity-0 data-[front=false]:*:transition-opacity data-[front=false]:*:duration-100 data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};
const __default__$1 = {
  name: "Toaster"
};
const _sfc_main$i = /* @__PURE__ */ Object.assign(__default__$1, {
  __ssrInlineRender: true,
  props: {
    position: { type: null, required: false },
    expand: { type: Boolean, required: false, default: true },
    progress: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    max: { type: Number, required: false, default: 5 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    label: { type: String, required: false },
    duration: { type: Number, required: false, default: 5e3 },
    disableSwipe: { type: Boolean, required: false },
    swipeThreshold: { type: Number, required: false }
  },
  setup(__props) {
    const props = __props;
    const { toasts, remove } = useToast();
    const appConfig2 = useAppConfig();
    provide(toastMaxInjectionKey, toRef(() => props.max));
    const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold", "disableSwipe"));
    const portalProps = usePortal(toRef(() => props.portal));
    const swipeDirection = computed(() => {
      switch (props.position) {
        case "top-center":
          return "up";
        case "top-right":
        case "bottom-right":
          return "right";
        case "bottom-center":
          return "down";
        case "top-left":
        case "bottom-left":
          return "left";
      }
      return "right";
    });
    const ui = computed(() => tv({ extend: tv(theme$7), ...appConfig2.ui?.toaster || {} })({
      position: props.position,
      swipeDirection: swipeDirection.value
    }));
    function onUpdateOpen(value, id2) {
      if (value) {
        return;
      }
      remove(id2);
    }
    const hovered = ref(false);
    const expanded = computed(() => props.expand || hovered.value);
    const refs = ref([]);
    const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
    const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);
    function getOffset(index2) {
      return refs.value.slice(index2 + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastProvider), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList(unref(toasts), (toast, index2) => {
              _push2(ssrRenderComponent(_sfc_main$j, mergeProps({
                key: toast.id,
                ref_for: true,
                ref_key: "refs",
                ref: refs,
                progress: __props.progress
              }, { ref_for: true }, unref(omit)(toast, ["id", "close"]), {
                close: toast.close,
                "data-expanded": expanded.value,
                "data-front": !expanded.value && index2 === unref(toasts).length - 1,
                style: {
                  "--index": index2 - unref(toasts).length + unref(toasts).length,
                  "--before": unref(toasts).length - 1 - index2,
                  "--offset": getOffset(index2),
                  "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                  "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                  "--transform": "translateY(var(--translate)) scale(var(--scale))"
                },
                "data-slot": "base",
                class: ui.value.base({ class: [props.ui?.base, toast.onClick ? "cursor-pointer" : void 0] }),
                "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                onClick: ($event) => toast.onClick && toast.onClick(toast)
              }), null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(ToastPortal), unref(portalProps), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ToastViewport), {
                    "data-expanded": expanded.value,
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                    style: {
                      "--scale-factor": "0.05",
                      "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                      "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                      "--front-height": `${frontHeight.value}px`,
                      "--height": `${height.value}px`
                    },
                    onMouseenter: ($event) => hovered.value = true,
                    onMouseleave: ($event) => hovered.value = false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ToastViewport), {
                      "data-expanded": expanded.value,
                      "data-slot": "viewport",
                      class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                      style: {
                        "--scale-factor": "0.05",
                        "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                        "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                        "--front-height": `${frontHeight.value}px`,
                        "--height": `${height.value}px`
                      },
                      onMouseenter: ($event) => hovered.value = true,
                      onMouseleave: ($event) => hovered.value = false
                    }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(toasts), (toast, index2) => {
                return openBlock(), createBlock(_sfc_main$j, mergeProps({
                  key: toast.id,
                  ref_for: true,
                  ref_key: "refs",
                  ref: refs,
                  progress: __props.progress
                }, { ref_for: true }, unref(omit)(toast, ["id", "close"]), {
                  close: toast.close,
                  "data-expanded": expanded.value,
                  "data-front": !expanded.value && index2 === unref(toasts).length - 1,
                  style: {
                    "--index": index2 - unref(toasts).length + unref(toasts).length,
                    "--before": unref(toasts).length - 1 - index2,
                    "--offset": getOffset(index2),
                    "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                    "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                    "--transform": "translateY(var(--translate)) scale(var(--scale))"
                  },
                  "data-slot": "base",
                  class: ui.value.base({ class: [props.ui?.base, toast.onClick ? "cursor-pointer" : void 0] }),
                  "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                  onClick: ($event) => toast.onClick && toast.onClick(toast)
                }), null, 16, ["progress", "close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]);
              }), 128)),
              createVNode(unref(ToastPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(ToastViewport), {
                    "data-expanded": expanded.value,
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: [props.ui?.viewport, props.class] }),
                    style: {
                      "--scale-factor": "0.05",
                      "--translate-factor": __props.position?.startsWith("top") ? "1px" : "-1px",
                      "--gap": __props.position?.startsWith("top") ? "16px" : "-16px",
                      "--front-height": `${frontHeight.value}px`,
                      "--height": `${height.value}px`
                    },
                    onMouseenter: ($event) => hovered.value = true,
                    onMouseleave: ($event) => hovered.value = false
                  }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Toaster.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const UToaster = Object.assign(_sfc_main$i, { __name: "UToaster" });
const _sfc_main$h = {
  __name: "UOverlayProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const { overlays, unmount, close } = useOverlay();
    const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
    const onAfterLeave = (id2) => {
      close(id2);
      unmount(id2);
    };
    const onClose = (id2, value) => {
      close(id2, value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(mountedOverlays.value, (overlay) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(overlay.component), mergeProps({
          key: overlay.id
        }, { ref_for: true }, overlay.props, {
          open: overlay.isOpen,
          "onUpdate:open": ($event) => overlay.isOpen = $event,
          onClose: (value) => onClose(overlay.id, value),
          "onAfter:leave": ($event) => onAfterLeave(overlay.id)
        }), null), _parent);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/OverlayProvider.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __default__ = {
  name: "App"
};
const _sfc_main$g = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  props: {
    tooltip: { type: Object, required: false },
    toaster: { type: [Object, null], required: false },
    locale: { type: Object, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: "body" },
    dir: { type: String, required: false },
    scrollBody: { type: [Boolean, Object], required: false },
    nonce: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
    const tooltipProps = toRef(() => props.tooltip);
    const toasterProps = toRef(() => props.toaster);
    const locale = toRef(() => props.locale);
    provide(localeContextInjectionKey, locale);
    const portal = toRef(() => props.portal);
    provide(portalTargetInjectionKey, portal);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ConfigProvider), mergeProps({
        "use-id": () => useId(),
        dir: props.dir || locale.value?.dir,
        locale: locale.value?.code
      }, unref(configProviderProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TooltipProvider), tooltipProps.value, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.toaster !== null) {
                    _push3(ssrRenderComponent(UToaster, toasterProps.value, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  }
                  _push3(ssrRenderComponent(_sfc_main$h, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    __props.toaster !== null ? (openBlock(), createBlock(UToaster, mergeProps({ key: 0 }, toasterProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                    createVNode(_sfc_main$h)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TooltipProvider), tooltipProps.value, {
                default: withCtx(() => [
                  __props.toaster !== null ? (openBlock(), createBlock(UToaster, mergeProps({ key: 0 }, toasterProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                  createVNode(_sfc_main$h)
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/App.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$g, { __name: "UApp" });
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "PreLoading",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          id: "preloading",
          class: "w-screen h-screen fixed bg-white z-1000 flex flex-col gap-30 justify-center font-[Poppins] items-center",
          dir: "ltr"
        }, _attrs))} data-v-c6ca06d0><div class="boxes" data-v-c6ca06d0><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="box" data-v-c6ca06d0><!--[-->`);
          ssrRenderList(4, (j) => {
            _push(`<div data-v-c6ca06d0></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div><div class="text" data-v-c6ca06d0><!--[-->`);
        ssrRenderList("ErfaPay", (c, i) => {
          _push(`<span style="${ssrRenderStyle(`--c: ${i}`)}" data-v-c6ca06d0>${ssrInterpolate(c)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PreLoading.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$f, [["__scopeId", "data-v-c6ca06d0"]]), { __name: "PreLoading" });
function defaultEstimatedProgress(duration2, elapsed) {
  const completionPercentage = elapsed / duration2 * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration: duration2 = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = shallowRef(0);
  const isLoading = shallowRef(false);
  const error = shallowRef(false);
  const start = (opts2 = {}) => {
    error.value = false;
    set(0, opts2);
  };
  function set(at = 0, opts2 = {}) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish({ force: opts2.force });
    }
    progress.value = at < 0 ? 0 : at;
    opts2.force ? 0 : throttle;
    {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator ||= createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_2 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    hideDelay: {
      type: Number,
      default: 500
    },
    resetDelay: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      hideDelay: props.hideDelay,
      resetDelay: props.resetDelay,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${progress.value > 0 ? 100 / progress.value * 100 : 0}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  admin: defineAsyncComponent(() => import('./admin-D2Zr_Ogh.mjs').then((m) => m.default || m)),
  dashboard: defineAsyncComponent(() => import('./dashboard-cl7wbU9y.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./default-BhbbT1t0.mjs').then((m) => m.default || m))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_4 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const theme$6 = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main$e = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig2 = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      if (props.scrollable) {
        return {
          // FIXME: This is a workaround to prevent the modal from closing when clicking on the scrollbar https://reka-ui.com/docs/components/dialog#scrollable-overlay but it's not working on Mac OS.
          pointerDownOutside: (e) => {
            const originalEvent = e.detail.originalEvent;
            const target = originalEvent.target;
            if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
              e.preventDefault();
            }
          }
        };
      }
      return {};
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme$6), ...appConfig2.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DefineContentTemplate), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString$1(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString$1(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString$1(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString$1(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: props.ui?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString$1(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: props.ui?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString$1(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$l, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString$1(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString$1(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: props.ui?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: props.ui?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: props.ui?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString$1(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: props.ui?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString$1(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("modal.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: props.ui?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: props.ui?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: props.ui?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString$1(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString$1(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: props.ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: props.ui?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: props.ui?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString$1(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: props.ui?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString$1(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("modal.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: props.ui?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          !!slots.body ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: props.ui?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : createCommentVNode("", true),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: props.ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.scrollable) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ReuseContentTemplate))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (__props.overlay) {
                      _push3(ssrRenderComponent(unref(DialogOverlay), {
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: props.ui?.overlay })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: props.ui?.overlay })
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DefineContentTemplate), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString$1(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString$1(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: props.ui?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: props.ui?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: props.ui?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString$1(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: props.ui?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString$1(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig2).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("modal.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: props.ui?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        !!slots.body ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: props.ui?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : createCommentVNode("", true),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: props.ui?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64))
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const theme$5 = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between",
    "label": "block font-medium text-default",
    "container": "mt-1 relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$d = {
  __name: "UFormField",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    name: { type: String, required: false },
    errorPattern: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    help: { type: String, required: false },
    error: { type: [Boolean, String], required: false },
    hint: { type: String, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    eagerValidation: { type: Boolean, required: false },
    validateOnInputDelay: { type: Number, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig2 = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme$5), ...appConfig2.ui?.formField || {} })({
      size: props.size,
      required: props.required
    }));
    const formErrors = inject(formErrorsInjectionKey, null);
    const error = computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
    const id2 = ref(useId());
    const ariaId = id2.value;
    const formInputs = inject(formInputsInjectionKey, void 0);
    watch(id2, () => {
      if (formInputs && props.name) {
        formInputs.value[props.name] = { id: id2.value, pattern: props.errorPattern };
      }
    }, { immediate: true });
    provide(inputIdInjectionKey, id2);
    provide(formFieldInjectionKey, computed(() => ({
      error: error.value,
      name: props.name,
      size: props.size,
      eagerValidation: props.eagerValidation,
      validateOnInputDelay: props.validateOnInputDelay,
      errorPattern: props.errorPattern,
      hint: props.hint,
      description: props.description,
      help: props.help,
      ariaId
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
            if (__props.label || !!slots.label) {
              _push2(`<div data-slot="labelWrapper" class="${ssrRenderClass(ui.value.labelWrapper({ class: props.ui?.labelWrapper }))}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Label), {
                for: id2.value,
                "data-slot": "label",
                class: ui.value.label({ class: props.ui?.label })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                      _push3(`${ssrInterpolate(__props.label)}`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        createTextVNode(toDisplayString$1(__props.label), 1)
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              if (__props.hint || !!slots.hint) {
                _push2(`<span${ssrRenderAttr("id", `${unref(ariaId)}-hint`)} data-slot="hint" class="${ssrRenderClass(ui.value.hint({ class: props.ui?.hint }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => {
                  _push2(`${ssrInterpolate(__props.hint)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(`<p${ssrRenderAttr("id", `${unref(ariaId)}-description`)} data-slot="description" class="${ssrRenderClass(ui.value.description({ class: props.ui?.description }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                _push2(`${ssrInterpolate(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass([(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: props.ui?.container })])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { error: error.value }, null, _push2, _parent2, _scopeId);
            if (typeof error.value === "string" && error.value || !!slots.error) {
              _push2(`<div${ssrRenderAttr("id", `${unref(ariaId)}-error`)} data-slot="error" class="${ssrRenderClass(ui.value.error({ class: props.ui?.error }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "error", { error: error.value }, () => {
                _push2(`${ssrInterpolate(error.value)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else if (__props.help || !!slots.help) {
              _push2(`<div${ssrRenderAttr("id", `${unref(ariaId)}-help`)} data-slot="help" class="${ssrRenderClass(ui.value.help({ class: props.ui?.help }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "help", { help: __props.help }, () => {
                _push2(`${ssrInterpolate(__props.help)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "labelWrapper",
                  class: ui.value.labelWrapper({ class: props.ui?.labelWrapper })
                }, [
                  createVNode(unref(Label), {
                    for: id2.value,
                    "data-slot": "label",
                    class: ui.value.label({ class: props.ui?.label })
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        createTextVNode(toDisplayString$1(__props.label), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["for", "class"]),
                  __props.hint || !!slots.hint ? (openBlock(), createBlock("span", {
                    key: 0,
                    id: `${unref(ariaId)}-hint`,
                    "data-slot": "hint",
                    class: ui.value.hint({ class: props.ui?.hint })
                  }, [
                    renderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => [
                      createTextVNode(toDisplayString$1(__props.hint), 1)
                    ])
                  ], 10, ["id"])) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  id: `${unref(ariaId)}-description`,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString$1(__props.description), 1)
                  ])
                ], 10, ["id"])) : createCommentVNode("", true)
              ], 2),
              createVNode("div", {
                class: [(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: props.ui?.container })]
              }, [
                renderSlot(_ctx.$slots, "default", { error: error.value }),
                typeof error.value === "string" && error.value || !!slots.error ? (openBlock(), createBlock("div", {
                  key: 0,
                  id: `${unref(ariaId)}-error`,
                  "data-slot": "error",
                  class: ui.value.error({ class: props.ui?.error })
                }, [
                  renderSlot(_ctx.$slots, "error", { error: error.value }, () => [
                    createTextVNode(toDisplayString$1(error.value), 1)
                  ])
                ], 10, ["id"])) : __props.help || !!slots.help ? (openBlock(), createBlock("div", {
                  key: 1,
                  id: `${unref(ariaId)}-help`,
                  "data-slot": "help",
                  class: ui.value.help({ class: props.ui?.help })
                }, [
                  renderSlot(_ctx.$slots, "help", { help: __props.help }, () => [
                    createTextVNode(toDisplayString$1(__props.help), 1)
                  ])
                ], 10, ["id"])) : createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const theme$4 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$c = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig2 = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id: id2, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme$4), ...appConfig2.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const inputRef = useTemplateRef("inputRef");
    function updateInput(value) {
      if (props.modelModifiers?.trim) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id2),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$q, {
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
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
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$q, {
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id2),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: props.ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                    key: 0,
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                    key: 1,
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: props.ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                    key: 0,
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
function __unimport_directionalIcon(leftIcon, rightIcon) {
  const { locale } = useI18n();
  const isRTL = computed(() => ["fa", "ar"].includes(locale.value));
  return isRTL.value ? leftIcon : rightIcon;
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentModal: currentModal2, open, close, currentModalProps } = useAuthModal();
    const isOpen = computed({
      get: () => currentModal2.value === "signup",
      set: (val) => !val && close()
    });
    const loading = ref(false);
    const authInfo = ref({
      email: ""
    });
    function switchToSignin() {
      open("signin");
    }
    function switchTo2fa() {
      open("2fa", { isSignup: true });
    }
    async function submit() {
      loading.value = true;
      try {
        const response = await $fetch("/api/auth/signup/", {
          method: "POST",
          body: authInfo.value
        });
        if (response.ok) {
          useState("login-state", () => ({
            state: "otp",
            loginInfo: authInfo.value
          }));
          switchTo2fa();
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        close: unref(currentModalProps)?.keepOpen !== true,
        dismissible: unref(currentModalProps)?.keepOpen !== true
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-extrabold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("common.site_title"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-extrabold text-xl" }, toDisplayString$1(_ctx.$t("common.site_title")), 1)
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("modals.signup.title_new_account"))}</h2><form class="p-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.signup.label_email")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    modelValue: unref(authInfo).email,
                    "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                    placeholder: _ctx.$t("modals.signup.placeholder_email"),
                    class: "w-full",
                    required: "",
                    type: "email"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      modelValue: unref(authInfo).email,
                      "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                      placeholder: _ctx.$t("modals.signup.placeholder_email"),
                      class: "w-full",
                      required: "",
                      type: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("modals.2fa.label_code_get"),
              "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
              size: "xl",
              type: "submit"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-sm text-muted"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("modals.signup.text_already_has_account"))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
              variant: "link",
              onClick: switchToSignin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("modals.signup.label_switch_signin"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString$1(_ctx.$t("modals.signup.label_switch_signin")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("h2", { class: "font-bold text-xl" }, toDisplayString$1(_ctx.$t("modals.signup.title_new_account")), 1),
                createVNode("form", {
                  class: "p-6 space-y-4",
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.signup.label_email")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        modelValue: unref(authInfo).email,
                        "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                        placeholder: _ctx.$t("modals.signup.placeholder_email"),
                        class: "w-full",
                        required: "",
                        type: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode("div", { class: "w-full text-center" }, [
                    createVNode(_component_UButton, {
                      label: _ctx.$t("modals.2fa.label_code_get"),
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
                      size: "xl",
                      type: "submit"
                    }, null, 8, ["label", "trailing-icon"])
                  ]),
                  createVNode("div", { class: "text-sm text-muted" }, [
                    createVNode("span", null, toDisplayString$1(_ctx.$t("modals.signup.text_already_has_account")), 1),
                    createVNode(_component_UButton, {
                      ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                      variant: "link",
                      onClick: switchToSignin
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString$1(_ctx.$t("modals.signup.label_switch_signin")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/signup.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$b, { __name: "ModalSignup" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "signin",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentModal: currentModal2, open, close, currentModalProps } = useAuthModal();
    const { t } = useI18n();
    const loginInfo = ref({
      email: "",
      password: ""
    });
    const loading = ref(false);
    const isOpen = computed({
      get: () => currentModal2.value === "signin",
      set: (val) => !val && close()
    });
    function switchToSignup() {
      open("signup");
    }
    function switchTo2fa() {
      open("2fa");
    }
    async function submit() {
      loading.value = true;
      try {
        const response = await $fetch("/api/auth/signin/", {
          method: "POST",
          body: loginInfo.value
        });
        if (response.ok) {
          useState("login-state", () => ({
            state: "otp",
            loginInfo: loginInfo.value
          }));
          switchTo2fa();
        } else {
          useToast().add({
            color: "error",
            title: t("common.titles.error"),
            description: response.error
          });
        }
      } catch (error) {
        console.log({ error });
        const err_msg = error?.data?.errors["non_field_errors"]?.[0];
        if (err_msg) {
          useToast().add({
            color: "error",
            title: t("common.titles.error"),
            description: t(err_msg)
          });
        }
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        close: unref(currentModalProps)?.keepOpen !== true,
        dismissible: unref(currentModalProps)?.keepOpen !== true
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-extrabold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("common.site_title"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-extrabold text-xl" }, toDisplayString$1(_ctx.$t("common.site_title")), 1)
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("modals.signin.title_login"))}</h2><form class="p-6 space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: _ctx.$t("modals.signin.label_email"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(loginInfo).email,
                    "onUpdate:modelValue": ($event) => unref(loginInfo).email = $event,
                    placeholder: _ctx.$t("modals.signin.placeholder_email"),
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "email"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(loginInfo).email,
                      "onUpdate:modelValue": ($event) => unref(loginInfo).email = $event,
                      placeholder: _ctx.$t("modals.signin.placeholder_email"),
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      type: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: _ctx.$t("modals.signin.label_password"),
              size: "xl"
            }, {
              help: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                    class: "px-0",
                    variant: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$t("modals.signin.label_restore_password"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString$1(_ctx.$t("modals.signin.label_restore_password")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                      class: "px-0",
                      variant: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString$1(_ctx.$t("modals.signin.label_restore_password")), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(loginInfo).password,
                    "onUpdate:modelValue": ($event) => unref(loginInfo).password = $event,
                    placeholder: _ctx.$t("modals.signin.placeholder_password"),
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(loginInfo).password,
                      "onUpdate:modelValue": ($event) => unref(loginInfo).password = $event,
                      placeholder: _ctx.$t("modals.signin.placeholder_password"),
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      type: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("modals.2fa.label_code_get"),
              loading: unref(loading),
              "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
              size: "xl",
              type: "submit"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-sm text-muted"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("modals.signin.text_has_no_account_yet"))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
              variant: "link",
              onClick: switchToSignup
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("modals.signin.label_switch_signup"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString$1(_ctx.$t("modals.signin.label_switch_signup")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("h2", { class: "font-bold text-xl" }, toDisplayString$1(_ctx.$t("modals.signin.title_login")), 1),
                createVNode("form", {
                  class: "p-6 space-y-4",
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode(_component_UFormField, {
                    label: _ctx.$t("modals.signin.label_email"),
                    size: "xl"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(loginInfo).email,
                        "onUpdate:modelValue": ($event) => unref(loginInfo).email = $event,
                        placeholder: _ctx.$t("modals.signin.placeholder_email"),
                        class: "w-full",
                        dir: "auto",
                        required: "",
                        type: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    label: _ctx.$t("modals.signin.label_password"),
                    size: "xl"
                  }, {
                    help: withCtx(() => [
                      createVNode(_component_UButton, {
                        ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                        class: "px-0",
                        variant: "link"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString$1(_ctx.$t("modals.signin.label_restore_password")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: unref(loginInfo).password,
                        "onUpdate:modelValue": ($event) => unref(loginInfo).password = $event,
                        placeholder: _ctx.$t("modals.signin.placeholder_password"),
                        class: "w-full",
                        dir: "auto",
                        required: "",
                        type: "password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode("div", { class: "w-full text-center" }, [
                    createVNode(_component_UButton, {
                      label: _ctx.$t("modals.2fa.label_code_get"),
                      loading: unref(loading),
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
                      size: "xl",
                      type: "submit"
                    }, null, 8, ["label", "loading", "trailing-icon"])
                  ]),
                  createVNode("div", { class: "text-sm text-muted" }, [
                    createVNode("span", null, toDisplayString$1(_ctx.$t("modals.signin.text_has_no_account_yet")), 1),
                    createVNode(_component_UButton, {
                      ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                      variant: "link",
                      onClick: switchToSignup
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString$1(_ctx.$t("modals.signin.label_switch_signup")), 1)
                      ]),
                      _: 1
                    })
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/signin.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$a, { __name: "ModalSignin" });
const theme$3 = {
  "slots": {
    "root": "relative inline-flex items-center gap-1.5",
    "base": [
      "rounded-md border-0 placeholder:text-dimmed text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ]
  },
  "variants": {
    "size": {
      "xs": {
        "base": "size-6 text-xs"
      },
      "sm": {
        "base": "size-7 text-xs"
      },
      "md": {
        "base": "size-8 text-sm"
      },
      "lg": {
        "base": "size-9 text-sm"
      },
      "xl": {
        "base": "size-10 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$9 = {
  __name: "UPinInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    length: { type: [Number, String], required: false, default: 5 },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: Array, required: false },
    disabled: { type: Boolean, required: false },
    id: { type: String, required: false },
    mask: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    name: { type: String, required: false },
    otp: { type: Boolean, required: false },
    placeholder: { type: String, required: false },
    required: { type: Boolean, required: false },
    type: { type: null, required: false, default: "text" }
  },
  emits: ["update:modelValue", "complete", "change", "blur"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const appConfig2 = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "disabled", "id", "mask", "name", "otp", "required", "type"), emits);
    const { emitFormInput, emitFormFocus, emitFormChange, emitFormBlur, size, color, id: id2, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig2.ui?.pinInput || {} })({
      color: color.value,
      variant: props.variant,
      size: size.value,
      highlight: highlight.value
    }));
    const inputsRef = ref([]);
    const completed = ref(false);
    function onComplete(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
    }
    function onBlur(event) {
      if (!event.relatedTarget || completed.value) {
        emits("blur", event);
        emitFormBlur();
      }
    }
    __expose({
      inputsRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PinInputRoot), mergeProps({ ...unref(rootProps), ...unref(ariaAttrs) }, {
        id: unref(id2),
        name: unref(name),
        placeholder: __props.placeholder,
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        "onUpdate:modelValue": ($event) => unref(emitFormInput)(),
        onComplete
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(looseToNumber)(props.length), (ids, index2) => {
              _push2(ssrRenderComponent(unref(PinInputInput), {
                key: ids,
                ref_for: true,
                ref: (el2) => inputsRef.value[index2] = el2,
                index: index2,
                "data-slot": "base",
                class: ui.value.base({ class: props.ui?.base }),
                disabled: unref(disabled),
                onBlur,
                onFocus: unref(emitFormFocus)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(looseToNumber)(props.length), (ids, index2) => {
                return openBlock(), createBlock(unref(PinInputInput), {
                  key: ids,
                  ref_for: true,
                  ref: (el2) => inputsRef.value[index2] = el2,
                  index: index2,
                  "data-slot": "base",
                  class: ui.value.base({ class: props.ui?.base }),
                  disabled: unref(disabled),
                  onBlur,
                  onFocus: unref(emitFormFocus)
                }, null, 8, ["index", "class", "disabled", "onFocus"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/PinInput.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const duration = 75;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "2faCode",
  __ssrInlineRender: true,
  props: {
    isSignup: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { currentModal: currentModal2, open, close, currentModalProps } = useAuthModal();
    const isOpen = computed({
      get: () => currentModal2.value === "2fa",
      set: (val) => !val && close()
    });
    const loading = ref(false);
    const loginState = useState("login-state");
    const otpCode = ref([]);
    const otpInfo = computed(() => ({
      otp: Number(otpCode.value.join("")),
      ...loginState.value?.loginInfo
    }));
    const remaining = ref(0);
    const interval = ref(null);
    const timer = ref(
      {
        done: computed(() => remaining.value <= 0),
        current: computed(() => {
          const minutes = Math.floor(remaining.value / 60);
          const seconds = remaining.value % 60;
          return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }),
        start() {
          remaining.value = duration;
          if (interval.value) clearInterval(interval.value);
          interval.value = setInterval();
        },
        stop() {
          if (interval.value) {
            clearInterval(interval.value);
            interval.value = null;
          }
        }
      }
    );
    watch(isOpen, () => {
      if (currentModal2.value === "2fa") {
        timer.value.start();
      }
    });
    async function codeResend() {
      const response = await $fetch("/api/auth/otp-resend/", {
        method: "POST",
        body: {
          ...loginState.value?.loginInfo
        }
      });
      console.log({ response });
      timer.value.start();
    }
    function switchToSignin() {
      otpCode.value = [];
      open("signin");
    }
    function switchToSignup() {
      otpCode.value = [];
      open("signup");
    }
    function switchToCompleteSignup() {
      otpCode.value = [];
      open("profileSetup");
    }
    function changeEmail() {
      if (currentModalProps.value?.isSignup || __props.isSignup) {
        return switchToSignup();
      }
      return switchToSignin();
    }
    async function submitLogin() {
      loading.value = true;
      try {
        const response = await $fetch("/api/auth/signin/otp/", {
          method: "POST",
          body: otpInfo.value
        });
        if (response.ok) {
          const accessToken = useStorage$1("auth.access_token", "");
          const refreshToken = useStorage$1("auth.refresh_token", "");
          const user = useState("auth.user", () => null);
          accessToken.value = response.data.access;
          refreshToken.value = response.data.refresh;
          user.value = response.data.user;
          close();
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }
    async function submitSignup() {
      loading.value = true;
      try {
        const response = await $fetch("/api/auth/signup/otp/", {
          method: "POST",
          body: otpInfo.value
        });
        if (response.ok) {
          useState("login-state", () => ({
            state: "otp",
            loginInfo: otpInfo.value
          }));
          return switchToCompleteSignup();
        }
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    }
    const handleSubmit = computed(() => currentModalProps.value?.isSignup || __props.isSignup ? submitSignup : submitLogin);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UButton = _sfc_main$l;
      const _component_UPinInput = _sfc_main$9;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        close: unref(currentModalProps)?.keepOpen !== true,
        dismissible: unref(currentModalProps)?.keepOpen !== true
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-extrabold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("common.site_title"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-extrabold text-xl" }, toDisplayString$1(_ctx.$t("common.site_title")), 1)
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.isSignup ? "modals.2fa.title_verify_email" : "modals.2fa.title_login"))}</h2><span${_scopeId}>${ssrInterpolate(_ctx.$t("modals.2fa.text_code_sent_email", [unref(loginState).loginInfo.email]))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("modals.2fa.label_change_email"),
              ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
              class: "px-0",
              variant: "link",
              onClick: changeEmail
            }, null, _parent2, _scopeId));
            _push2(`<form class="p-6 space-y-8"${_scopeId}><div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UPinInput, {
              modelValue: unref(otpCode),
              "onUpdate:modelValue": ($event) => isRef(otpCode) ? otpCode.value = $event : null,
              autofocus: "",
              dir: "ltr",
              otp: "",
              required: "",
              size: "xl",
              type: "number",
              variant: "subtle"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("modals.2fa.label_code_check"),
              "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
              size: "xl",
              type: "submit"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text-sm text-muted"${_scopeId}><span${_scopeId}>${ssrInterpolate(_ctx.$t("modals.2fa.text_code_not_received"))}</span>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: !unref(timer).done ? "neutral" : "primary",
              disabled: !unref(timer).done,
              ui: { base: "dark:text-primary-300" },
              variant: "link",
              onClick: codeResend
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(timer).done) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("modals.2fa.text_code_timer", [unref(timer).current]))}</span>`);
                  } else {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(_ctx.$t("modals.2fa.label_code_resend"))}</span>`);
                  }
                } else {
                  return [
                    !unref(timer).done ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString$1(_ctx.$t("modals.2fa.text_code_timer", [unref(timer).current])), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString$1(_ctx.$t("modals.2fa.label_code_resend")), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("h2", { class: "font-bold text-xl" }, toDisplayString$1(_ctx.$t(__props.isSignup ? "modals.2fa.title_verify_email" : "modals.2fa.title_login")), 1),
                createVNode("span", null, toDisplayString$1(_ctx.$t("modals.2fa.text_code_sent_email", [unref(loginState).loginInfo.email])), 1),
                createVNode(_component_UButton, {
                  label: _ctx.$t("modals.2fa.label_change_email"),
                  ui: { label: "dark:text-primary-300", base: "dark:text-primary-300" },
                  class: "px-0",
                  variant: "link",
                  onClick: changeEmail
                }, null, 8, ["label"]),
                createVNode("form", {
                  class: "p-6 space-y-8",
                  onSubmit: withModifiers(unref(handleSubmit), ["prevent"])
                }, [
                  createVNode("div", { class: "w-full text-center" }, [
                    createVNode(_component_UPinInput, {
                      modelValue: unref(otpCode),
                      "onUpdate:modelValue": ($event) => isRef(otpCode) ? otpCode.value = $event : null,
                      autofocus: "",
                      dir: "ltr",
                      otp: "",
                      required: "",
                      size: "xl",
                      type: "number",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "w-full text-center" }, [
                    createVNode(_component_UButton, {
                      label: _ctx.$t("modals.2fa.label_code_check"),
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
                      size: "xl",
                      type: "submit"
                    }, null, 8, ["label", "trailing-icon"])
                  ]),
                  createVNode("div", { class: "text-sm text-muted" }, [
                    createVNode("span", null, toDisplayString$1(_ctx.$t("modals.2fa.text_code_not_received")), 1),
                    createVNode(_component_UButton, {
                      color: !unref(timer).done ? "neutral" : "primary",
                      disabled: !unref(timer).done,
                      ui: { base: "dark:text-primary-300" },
                      variant: "link",
                      onClick: codeResend
                    }, {
                      default: withCtx(() => [
                        !unref(timer).done ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString$1(_ctx.$t("modals.2fa.text_code_timer", [unref(timer).current])), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString$1(_ctx.$t("modals.2fa.label_code_resend")), 1))
                      ]),
                      _: 1
                    }, 8, ["color", "disabled"])
                  ])
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/2faCode.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$8, { __name: "Modal2faCode" });
function hasDescription(item, descriptionKey) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const value = get(item, descriptionKey);
  return value !== void 0 && value !== null && value !== "";
}
function getSize(size, hasDescription2) {
  if (hasDescription2) {
    return {
      xs: 44,
      sm: 48,
      md: 52,
      lg: 56,
      xl: 60
    }[size];
  }
  return {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40
  }[size];
}
function getEstimateSize(items, size, descriptionKey) {
  const anyHasDescription = descriptionKey ? items.some((item) => hasDescription(item, descriptionKey)) : false;
  return getSize(size, anyHasDescription);
}
const theme$2 = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    virtualize: { type: [Boolean, Object], required: false, default: false },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig2 = useAppConfig();
    const { contains } = useFilter({ sensitivity: "base" });
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const virtualizerProps = toRef(() => {
      if (!props.virtualize) return false;
      return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
        estimateSize: getEstimateSize(items.value, props.size || "md", props.descriptionKey)
      });
    });
    const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id: id2, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig2.ui.icons.chevronDown })));
    const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: {
          type: [Object, String, Number, Boolean],
          required: true
        },
        index: {
          type: Number,
          required: false
        }
      }
    });
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig2.ui?.selectMenu || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value,
      virtualize: !!props.virtualize
    }));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const groups = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return groups.value.map((items2) => items2.filter((item) => {
        if (item === void 0 || item === null) {
          return false;
        }
        if (typeof item !== "object") {
          return contains(String(item), searchTerm.value);
        }
        if (item.type && ["label", "separator"].includes(item.type)) {
          return true;
        }
        return fields.some((field) => {
          const value = get(item, field);
          return value !== void 0 && value !== null && contains(String(value), searchTerm.value);
        });
      })).filter((group) => group.filter(
        (item) => !isSelectItem(item) || (!item.type || !["label", "separator"].includes(item.type))
      ).length > 0);
    });
    const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare(item, newItem, props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    const triggerRef = useTemplateRef("triggerRef");
    function onUpdate(value) {
      if (toRaw(props.modelValue) === value) {
        return;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onCreate(e) {
      e.preventDefault();
      e.stopPropagation();
      emits("create", searchTerm.value);
    }
    function onSelect(e, item) {
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      item.onSelect?.(e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef: toRef(() => triggerRef.value?.$el)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineCreateItemTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxItem), {
              "data-slot": "item",
              class: ui.value.item({ class: props.ui?.item }),
              value: searchTerm.value,
              onSelect: onCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-slot="itemLabel" class="${ssrRenderClass(ui.value.itemLabel({ class: props.ui?.itemLabel }))}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                    _push3(`${ssrInterpolate(unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", {
                      "data-slot": "itemLabel",
                      class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                    }, [
                      renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                        createTextVNode(toDisplayString$1(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxItem), {
                "data-slot": "item",
                class: ui.value.item({ class: props.ui?.item }),
                value: searchTerm.value,
                onSelect: onCreate
              }, {
                default: withCtx(() => [
                  createVNode("span", {
                    "data-slot": "itemLabel",
                    class: ui.value.itemLabel({ class: props.ui?.itemLabel })
                  }, [
                    renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                      createTextVNode(toDisplayString$1(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                    ])
                  ], 2)
                ]),
                _: 3
              }, 8, ["class", "value"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
        default: withCtx(({ item, index: index2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSelectItem(item) && item.type === "label") {
              _push2(ssrRenderComponent(unref(ComboboxLabel), {
                "data-slot": "label",
                class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString$1(unref(get)(item, props.labelKey)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (isSelectItem(item) && item.type === "separator") {
              _push2(ssrRenderComponent(unref(ComboboxSeparator), {
                "data-slot": "separator",
                class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(ComboboxItem), {
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "item", {
                      item,
                      index: index2,
                      ui: ui.value
                    }, () => {
                      ssrRenderSlot(_ctx.$slots, "item-leading", {
                        item,
                        index: index2,
                        ui: ui.value
                      }, () => {
                        if (isSelectItem(item) && item.icon) {
                          _push3(ssrRenderComponent(_sfc_main$q, {
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.avatar) {
                          _push3(ssrRenderComponent(_sfc_main$o, mergeProps({
                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.chip) {
                          _push3(ssrRenderComponent(_sfc_main$p, mergeProps({
                            size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                      _push3(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId2}><span data-slot="itemLabel" class="${ssrRenderClass(ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] }))}"${_scopeId2}>`);
                      ssrRenderSlot(_ctx.$slots, "item-label", {
                        item,
                        index: index2
                      }, () => {
                        _push3(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                      }, _push3, _parent3, _scopeId2);
                      _push3(`</span>`);
                      if (isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                        _push3(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId2}>`);
                        ssrRenderSlot(_ctx.$slots, "item-description", {
                          item,
                          index: index2
                        }, () => {
                          _push3(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
                        }, _push3, _parent3, _scopeId2);
                        _push3(`</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span><span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId2}>`);
                      ssrRenderSlot(_ctx.$slots, "item-trailing", {
                        item,
                        index: index2,
                        ui: ui.value
                      }, null, _push3, _parent3, _scopeId2);
                      _push3(ssrRenderComponent(unref(ComboboxItemIndicator), { "as-child": "" }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_sfc_main$q, {
                              name: __props.selectedIcon || unref(appConfig2).ui.icons.check,
                              "data-slot": "itemTrailingIcon",
                              class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_sfc_main$q, {
                                name: __props.selectedIcon || unref(appConfig2).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</span>`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "item", {
                        item,
                        index: index2,
                        ui: ui.value
                      }, () => [
                        renderSlot(_ctx.$slots, "item-leading", {
                          item,
                          index: index2,
                          ui: ui.value
                        }, () => [
                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                            key: 1,
                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$p, mergeProps({
                            key: 2,
                            size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ]),
                        createVNode("span", {
                          "data-slot": "itemWrapper",
                          class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                        }, [
                          createVNode("span", {
                            "data-slot": "itemLabel",
                            class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                          }, [
                            renderSlot(_ctx.$slots, "item-label", {
                              item,
                              index: index2
                            }, () => [
                              createTextVNode(toDisplayString$1(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                            ])
                          ], 2),
                          isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "itemDescription",
                            class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                          }, [
                            renderSlot(_ctx.$slots, "item-description", {
                              item,
                              index: index2
                            }, () => [
                              createTextVNode(toDisplayString$1(unref(get)(item, props.descriptionKey)), 1)
                            ])
                          ], 2)) : createCommentVNode("", true)
                        ], 2),
                        createVNode("span", {
                          "data-slot": "itemTrailing",
                          class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                        }, [
                          renderSlot(_ctx.$slots, "item-trailing", {
                            item,
                            index: index2,
                            ui: ui.value
                          }),
                          createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$q, {
                                name: __props.selectedIcon || unref(appConfig2).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 2)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                key: 0,
                "data-slot": "label",
                class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString$1(unref(get)(item, props.labelKey)), 1)
                ]),
                _: 2
              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                key: 1,
                "data-slot": "separator",
                class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
              }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                key: 2,
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "item", {
                    item,
                    index: index2,
                    ui: ui.value
                  }, () => [
                    renderSlot(_ctx.$slots, "item-leading", {
                      item,
                      index: index2,
                      ui: ui.value
                    }, () => [
                      isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$q, {
                        key: 0,
                        name: item.icon,
                        "data-slot": "itemLeadingIcon",
                        class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                      }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                        key: 1,
                        size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, item.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                      }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$p, mergeProps({
                        key: 2,
                        size: props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                        inset: "",
                        standalone: ""
                      }, item.chip, {
                        "data-slot": "itemLeadingChip",
                        class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ]),
                    createVNode("span", {
                      "data-slot": "itemWrapper",
                      class: ui.value.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                    }, [
                      createVNode("span", {
                        "data-slot": "itemLabel",
                        class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                      }, [
                        renderSlot(_ctx.$slots, "item-label", {
                          item,
                          index: index2
                        }, () => [
                          createTextVNode(toDisplayString$1(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                        ])
                      ], 2),
                      isSelectItem(item) && (unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "itemDescription",
                        class: ui.value.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                      }, [
                        renderSlot(_ctx.$slots, "item-description", {
                          item,
                          index: index2
                        }, () => [
                          createTextVNode(toDisplayString$1(unref(get)(item, props.descriptionKey)), 1)
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ], 2),
                    createVNode("span", {
                      "data-slot": "itemTrailing",
                      class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                    }, [
                      renderSlot(_ctx.$slots, "item-trailing", {
                        item,
                        index: index2,
                        ui: ui.value
                      }),
                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$q, {
                            name: __props.selectedIcon || unref(appConfig2).ui.icons.check,
                            "data-slot": "itemTrailingIcon",
                            class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                          }, null, 8, ["name", "class"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 2)
                  ])
                ]),
                _: 2
              }, 1032, ["class", "disabled", "value", "onSelect"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps({ id: unref(id2) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: unref(name),
        disabled: unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxAnchor), { "as-child": "" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxTrigger), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (unref(isLeading) && unref(leadingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$q, {
                                name: unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$o, mergeProps({
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => {
                          _push4(`<!--[-->`);
                          ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                            _push4(`<!--[-->`);
                            if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                              _push4(`<span data-slot="value" class="${ssrRenderClass(ui.value.value({ class: props.ui?.value }))}"${_scopeId3}>${ssrInterpolate(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span data-slot="placeholder" class="${ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))}"${_scopeId3}>${ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (unref(isTrailing) || !!slots.trailing) {
                          _push4(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (unref(trailingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$q, {
                                name: unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                            key: 0,
                            "data-slot": "leading",
                            class: ui.value.leading({ class: props.ui?.leading })
                          }, [
                            renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                                key: 0,
                                name: unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                              }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                                key: 1,
                                size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  "data-slot": "value",
                                  class: ui.value.value({ class: props.ui?.value })
                                }, toDisplayString$1(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  "data-slot": "placeholder",
                                  class: ui.value.placeholder({ class: props.ui?.placeholder })
                                }, toDisplayString$1(__props.placeholder ?? " "), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            "data-slot": "trailing",
                            class: ui.value.trailing({ class: props.ui?.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                                key: 0,
                                name: unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      "data-slot": "base",
                      class: ui.value.base({ class: [props.ui?.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: withCtx(() => [
                        unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                          key: 0,
                          "data-slot": "leading",
                          class: ui.value.leading({ class: props.ui?.leading })
                        }, [
                          renderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                              key: 0,
                              name: unref(leadingIconName),
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                            }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                              key: 1,
                              size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                            }, __props.avatar, {
                              "data-slot": "itemLeadingAvatar",
                              class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                            return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                              displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                key: 0,
                                "data-slot": "value",
                                class: ui.value.value({ class: props.ui?.value })
                              }, toDisplayString$1(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                key: 1,
                                "data-slot": "placeholder",
                                class: ui.value.placeholder({ class: props.ui?.placeholder })
                              }, toDisplayString$1(__props.placeholder ?? " "), 3))
                            ], 64);
                          }), 128))
                        ]),
                        unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                          key: 1,
                          "data-slot": "trailing",
                          class: ui.value.trailing({ class: props.ui?.trailing })
                        }, [
                          renderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                              key: 0,
                              name: unref(trailingIconName),
                              "data-slot": "trailingIcon",
                              class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FocusScope), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(ssrRenderComponent(unref(ComboboxInput), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_sfc_main$c, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        "data-slot": "input",
                                        class: ui.value.input({ class: props.ui?.input }),
                                        onChange: () => {
                                        }
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$c, mergeProps({
                                          autofocus: "",
                                          autocomplete: "off",
                                          size: __props.size
                                        }, searchInputProps.value, {
                                          "data-slot": "input",
                                          class: ui.value.input({ class: props.ui?.input }),
                                          onChange: withModifiers(() => {
                                          }, ["stop"])
                                        }), null, 16, ["size", "class", "onChange"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(unref(ComboboxEmpty), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${ssrInterpolate(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        createTextVNode(toDisplayString$1(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId4}>`);
                              if (!!__props.virtualize) {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(ssrRenderComponent(unref(ComboboxVirtualizer), mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: withCtx(({ option: item, virtualItem }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              } else {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--[-->`);
                                ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                                  _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<!--[-->`);
                                        ssrRenderList(group, (item, index2) => {
                                          _push6(ssrRenderComponent(unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index2}`,
                                            item,
                                            index: index2
                                          }, null, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]-->`);
                                      } else {
                                        return [
                                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                            return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index2}`,
                                              item,
                                              index: index2
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              }
                              _push5(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$c, mergeProps({
                                      autofocus: "",
                                      autocomplete: "off",
                                      size: __props.size
                                    }, searchInputProps.value, {
                                      "data-slot": "input",
                                      class: ui.value.input({ class: props.ui?.input }),
                                      onChange: withModifiers(() => {
                                      }, ["stop"])
                                    }), null, 16, ["size", "class", "onChange"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  "data-slot": "empty",
                                  class: ui.value.empty({ class: props.ui?.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString$1(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: props.ui?.viewport })
                                }, [
                                  !!__props.virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                    createVNode(unref(ComboboxVirtualizer), mergeProps({
                                      options: filteredItems.value,
                                      "text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, props.labelKey) : String(item2)
                                    }, virtualizerProps.value), {
                                      default: withCtx(({ option: item, virtualItem }) => [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 1
                                    }, 16, ["options", "text-content"]),
                                    createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: 0,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : createCommentVNode("", true),
                                    (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                      return openBlock(), createBlock(unref(ComboboxGroup), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: props.ui?.group })
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                            return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index2}`,
                                              item,
                                              index: index2
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128)),
                                    createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: 1,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : createCommentVNode("", true)
                                  ], 64))
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(ComboboxArrow), mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            "data-slot": "focusScope",
                            class: ui.value.focusScope({ class: props.ui?.focusScope })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "content-top"),
                              !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                key: 0,
                                modelValue: searchTerm.value,
                                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                "display-value": () => searchTerm.value,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$c, mergeProps({
                                    autofocus: "",
                                    autocomplete: "off",
                                    size: __props.size
                                  }, searchInputProps.value, {
                                    "data-slot": "input",
                                    class: ui.value.input({ class: props.ui?.input }),
                                    onChange: withModifiers(() => {
                                    }, ["stop"])
                                  }), null, 16, ["size", "class", "onChange"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                              createVNode(unref(ComboboxEmpty), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: props.ui?.empty })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                    createTextVNode(toDisplayString$1(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"]),
                              createVNode("div", {
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: props.ui?.viewport })
                              }, [
                                !!__props.virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  createVNode(unref(ComboboxVirtualizer), mergeProps({
                                    options: filteredItems.value,
                                    "text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, props.labelKey) : String(item2)
                                  }, virtualizerProps.value), {
                                    default: withCtx(({ option: item, virtualItem }) => [
                                      createVNode(unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 1
                                  }, 16, ["options", "text-content"]),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                    key: 0,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: props.ui?.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                          return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index2}`,
                                            item,
                                            index: index2
                                          }, null, 8, ["item", "index"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                    key: 1,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 64))
                              ], 2),
                              renderSlot(_ctx.$slots, "content-bottom")
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: props.ui?.content })
                    }, contentProps.value), {
                      default: withCtx(() => [
                        createVNode(unref(FocusScope), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: props.ui?.focusScope })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "content-top"),
                            !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                              key: 0,
                              modelValue: searchTerm.value,
                              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                              "display-value": () => searchTerm.value,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$c, mergeProps({
                                  autofocus: "",
                                  autocomplete: "off",
                                  size: __props.size
                                }, searchInputProps.value, {
                                  "data-slot": "input",
                                  class: ui.value.input({ class: props.ui?.input }),
                                  onChange: withModifiers(() => {
                                  }, ["stop"])
                                }), null, 16, ["size", "class", "onChange"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                            createVNode(unref(ComboboxEmpty), {
                              "data-slot": "empty",
                              class: ui.value.empty({ class: props.ui?.empty })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                  createTextVNode(toDisplayString$1(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                ])
                              ]),
                              _: 3
                            }, 8, ["class"]),
                            createVNode("div", {
                              role: "presentation",
                              "data-slot": "viewport",
                              class: ui.value.viewport({ class: props.ui?.viewport })
                            }, [
                              !!__props.virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                createVNode(unref(ComboboxVirtualizer), mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: withCtx(({ option: item, virtualItem }) => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item,
                                      index: virtualItem.index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 1
                                }, 16, ["options", "text-content"]),
                                createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                  key: 0,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                  return openBlock(), createBlock(unref(ComboboxGroup), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: props.ui?.group })
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                        return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                          key: `group-${groupIndex}-${index2}`,
                                          item,
                                          index: index2
                                        }, null, 8, ["item", "index"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128)),
                                createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                  key: 1,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 64))
                            ], 2),
                            renderSlot(_ctx.$slots, "content-bottom")
                          ]),
                          _: 3
                        }, 8, ["class"]),
                        !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxAnchor), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(ComboboxTrigger), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [props.ui?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx(() => [
                      unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                        key: 0,
                        "data-slot": "leading",
                        class: ui.value.leading({ class: props.ui?.leading })
                      }, [
                        renderSlot(_ctx.$slots, "leading", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                            key: 0,
                            name: unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$o, mergeProps({
                            key: 1,
                            size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "default", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                          return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                            displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                              key: 0,
                              "data-slot": "value",
                              class: ui.value.value({ class: props.ui?.value })
                            }, toDisplayString$1(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                              key: 1,
                              "data-slot": "placeholder",
                              class: ui.value.placeholder({ class: props.ui?.placeholder })
                            }, toDisplayString$1(__props.placeholder ?? " "), 3))
                          ], 64);
                        }), 128))
                      ]),
                      unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                        key: 1,
                        "data-slot": "trailing",
                        class: ui.value.trailing({ class: props.ui?.trailing })
                      }, [
                        renderSlot(_ctx.$slots, "trailing", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$q, {
                            key: 0,
                            name: unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ])
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ]),
                _: 2
              }, 1024),
              createVNode(unref(ComboboxPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(ComboboxContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx(() => [
                      createVNode(unref(FocusScope), {
                        trapped: "",
                        "data-slot": "focusScope",
                        class: ui.value.focusScope({ class: props.ui?.focusScope })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "content-top"),
                          !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                            key: 0,
                            modelValue: searchTerm.value,
                            "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                            "display-value": () => searchTerm.value,
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$c, mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: __props.size
                              }, searchInputProps.value, {
                                "data-slot": "input",
                                class: ui.value.input({ class: props.ui?.input }),
                                onChange: withModifiers(() => {
                                }, ["stop"])
                              }), null, 16, ["size", "class", "onChange"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                          createVNode(unref(ComboboxEmpty), {
                            "data-slot": "empty",
                            class: ui.value.empty({ class: props.ui?.empty })
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                createTextVNode(toDisplayString$1(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          createVNode("div", {
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: props.ui?.viewport })
                          }, [
                            !!__props.virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                              createVNode(unref(ComboboxVirtualizer), mergeProps({
                                options: filteredItems.value,
                                "text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, props.labelKey) : String(item2)
                              }, virtualizerProps.value), {
                                default: withCtx(({ option: item, virtualItem }) => [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item,
                                    index: virtualItem.index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 1
                              }, 16, ["options", "text-content"]),
                              createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                key: 0,
                                "data-slot": "group",
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                return openBlock(), createBlock(unref(ComboboxGroup), {
                                  key: `group-${groupIndex}`,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: props.ui?.group })
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index2) => {
                                      return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                        key: `group-${groupIndex}-${index2}`,
                                        item,
                                        index: index2
                                      }, null, 8, ["item", "index"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128)),
                              createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup), {
                                key: 1,
                                "data-slot": "group",
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 64))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom")
                        ]),
                        _: 3
                      }, 8, ["class"]),
                      !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
function getCountries() {
  return [{
    name: { en: "Afghanistan", fa: "افغانستان" },
    code: "AF",
    emoji: "🇦🇫",
    phone: "93",
    search: "Afghanistan افغانستان AF +93 🇦🇫"
  }, {
    name: { en: "Albania", fa: "آلبانی" },
    code: "AL",
    emoji: "🇦🇱",
    phone: "355",
    search: "Albania آلبانی AL +355 🇦🇱"
  }, {
    name: { en: "Algeria", fa: "الجزایر" },
    code: "DZ",
    emoji: "🇩🇿",
    phone: "213",
    search: "Algeria الجزایر DZ +213 🇩🇿"
  }, {
    name: { en: "Andorra", fa: "آندورا" },
    code: "AD",
    emoji: "🇦🇩",
    phone: "376",
    search: "Andorra آندورا AD +376 🇦🇩"
  }, {
    name: { en: "Angola", fa: "آنگولا" },
    code: "AO",
    emoji: "🇦🇴",
    phone: "244",
    search: "Angola آنگولا AO +244 🇦🇴"
  }, {
    name: { en: "Antigua and Barbuda", fa: "آنتیگوا و باربودا" },
    code: "AG",
    emoji: "🇦🇬",
    phone: "1268",
    search: "Antigua and Barbuda آنتیگوا و باربودا AG +1268 🇦🇬"
  }, {
    name: { en: "Argentina", fa: "آرژانتین" },
    code: "AR",
    emoji: "🇦🇷",
    phone: "54",
    search: "Argentina آرژانتین AR +54 🇦🇷"
  }, {
    name: { en: "Armenia", fa: "ارمنستان" },
    code: "AM",
    emoji: "🇦🇲",
    phone: "374",
    search: "Armenia ارمنستان AM +374 🇦🇲"
  }, {
    name: { en: "Australia", fa: "استرالیا" },
    code: "AU",
    emoji: "🇦🇺",
    phone: "61",
    search: "Australia استرالیا AU +61 🇦🇺"
  }, {
    name: { en: "Austria", fa: "اتریش" },
    code: "AT",
    emoji: "🇦🇹",
    phone: "43",
    search: "Austria اتریش AT +43 🇦🇹"
  }, {
    name: { en: "Azerbaijan", fa: "جمهوری آذربایجان" },
    code: "AZ",
    emoji: "🇦🇿",
    phone: "994",
    search: "Azerbaijan جمهوری آذربایجان AZ +994 🇦🇿"
  }, {
    name: { en: "Bahamas", fa: "باهاما" },
    code: "BS",
    emoji: "🇧🇸",
    phone: "1242",
    search: "Bahamas باهاما BS +1242 🇧🇸"
  }, {
    name: { en: "Bahrain", fa: "بحرین" },
    code: "BH",
    emoji: "🇧🇭",
    phone: "973",
    search: "Bahrain بحرین BH +973 🇧🇭"
  }, {
    name: { en: "Bangladesh", fa: "بنگلادش" },
    code: "BD",
    emoji: "🇧🇩",
    phone: "880",
    search: "Bangladesh بنگلادش BD +880 🇧🇩"
  }, {
    name: { en: "Barbados", fa: "باربادوس" },
    code: "BB",
    emoji: "🇧🇧",
    phone: "1246",
    search: "Barbados باربادوس BB +1246 🇧🇧"
  }, {
    name: { en: "Belarus", fa: "بلاروس" },
    code: "BY",
    emoji: "🇧🇾",
    phone: "375",
    search: "Belarus بلاروس BY +375 🇧🇾"
  }, {
    name: { en: "Belgium", fa: "بلژیک" },
    code: "BE",
    emoji: "🇧🇪",
    phone: "32",
    search: "Belgium بلژیک BE +32 🇧🇪"
  }, {
    name: { en: "Belize", fa: "بلیز" },
    code: "BZ",
    emoji: "🇧🇿",
    phone: "501",
    search: "Belize بلیز BZ +501 🇧🇿"
  }, {
    name: { en: "Benin", fa: "بنین" },
    code: "BJ",
    emoji: "🇧🇯",
    phone: "229",
    search: "Benin بنین BJ +229 🇧🇯"
  }, {
    name: { en: "Bhutan", fa: "بوتان" },
    code: "BT",
    emoji: "🇧🇹",
    phone: "975",
    search: "Bhutan بوتان BT +975 🇧🇹"
  }, {
    name: { en: "Bolivia", fa: "بولیوی" },
    code: "BO",
    emoji: "🇧🇴",
    phone: "591",
    search: "Bolivia بولیوی BO +591 🇧🇴"
  }, {
    name: { en: "Bosnia and Herzegovina", fa: "بوسنی و هرزگوین" },
    code: "BA",
    emoji: "🇧🇦",
    phone: "387",
    search: "Bosnia and Herzegovina بوسنی و هرزگوین BA +387 🇧🇦"
  }, {
    name: { en: "Botswana", fa: "بوتسوانا" },
    code: "BW",
    emoji: "🇧🇼",
    phone: "267",
    search: "Botswana بوتسوانا BW +267 🇧🇼"
  }, {
    name: { en: "Brazil", fa: "برزیل" },
    code: "BR",
    emoji: "🇧🇷",
    phone: "55",
    search: "Brazil برزیل BR +55 🇧🇷"
  }, {
    name: { en: "Brunei", fa: "برونئی" },
    code: "BN",
    emoji: "🇧🇳",
    phone: "673",
    search: "Brunei برونئی BN +673 🇧🇳"
  }, {
    name: { en: "Bulgaria", fa: "بلغارستان" },
    code: "BG",
    emoji: "🇧🇬",
    phone: "359",
    search: "Bulgaria بلغارستان BG +359 🇧🇬"
  }, {
    name: { en: "Burkina Faso", fa: "بورکینافاسو" },
    code: "BF",
    emoji: "🇧🇫",
    phone: "226",
    search: "Burkina Faso بورکینافاسو BF +226 🇧🇫"
  }, {
    name: { en: "Burundi", fa: "بوروندی" },
    code: "BI",
    emoji: "🇧🇮",
    phone: "257",
    search: "Burundi بوروندی BI +257 🇧🇮"
  }, {
    name: { en: "Cambodia", fa: "کامبوج" },
    code: "KH",
    emoji: "🇰🇭",
    phone: "855",
    search: "Cambodia کامبوج KH +855 🇰🇭"
  }, {
    name: { en: "Cameroon", fa: "کامرون" },
    code: "CM",
    emoji: "🇨🇲",
    phone: "237",
    search: "Cameroon کامرون CM +237 🇨🇲"
  }, {
    name: { en: "Canada", fa: "کانادا" },
    code: "CA",
    emoji: "🇨🇦",
    phone: "1",
    search: "Canada کانادا CA +1 🇨🇦"
  }, {
    name: { en: "Cape Verde", fa: "کیپ ورد" },
    code: "CV",
    emoji: "🇨🇻",
    phone: "238",
    search: "Cape Verde کیپ ورد CV +238 🇨🇻"
  }, {
    name: { en: "Central African Republic", fa: "جمهوری آفریقای مرکزی" },
    code: "CF",
    emoji: "🇨🇫",
    phone: "236",
    search: "Central African Republic جمهوری آفریقای مرکزی CF +236 🇨🇫"
  }, {
    name: { en: "Chad", fa: "چاد" },
    code: "TD",
    emoji: "🇹🇩",
    phone: "235",
    search: "Chad چاد TD +235 🇹🇩"
  }, {
    name: { en: "Chile", fa: "شیلی" },
    code: "CL",
    emoji: "🇨🇱",
    phone: "56",
    search: "Chile شیلی CL +56 🇨🇱"
  }, {
    name: { en: "China", fa: "چین" },
    code: "CN",
    emoji: "🇨🇳",
    phone: "86",
    search: "China چین CN +86 🇨🇳"
  }, {
    name: { en: "Colombia", fa: "کلمبیا" },
    code: "CO",
    emoji: "🇨🇴",
    phone: "57",
    search: "Colombia کلمبیا CO +57 🇨🇴"
  }, {
    name: { en: "Comoros", fa: "کومور" },
    code: "KM",
    emoji: "🇰🇲",
    phone: "269",
    search: "Comoros کومور KM +269 🇰🇲"
  }, {
    name: { en: "Congo", fa: "کنگو" },
    code: "CG",
    emoji: "🇨🇬",
    phone: "242",
    search: "Congo کنگو CG +242 🇨🇬"
  }, {
    name: { en: "Costa Rica", fa: "کاستاریکا" },
    code: "CR",
    emoji: "🇨🇷",
    phone: "506",
    search: "Costa Rica کاستاریکا CR +506 🇨🇷"
  }, {
    name: { en: "Croatia", fa: "کرواسی" },
    code: "HR",
    emoji: "🇭🇷",
    phone: "385",
    search: "Croatia کرواسی HR +385 🇭🇷"
  }, {
    name: { en: "Cuba", fa: "کوبا" },
    code: "CU",
    emoji: "🇨🇺",
    phone: "53",
    search: "Cuba کوبا CU +53 🇨🇺"
  }, {
    name: { en: "Cyprus", fa: "قبرس" },
    code: "CY",
    emoji: "🇨🇾",
    phone: "357",
    search: "Cyprus قبرس CY +357 🇨🇾"
  }, {
    name: { en: "Czech Republic", fa: "جمهوری چک" },
    code: "CZ",
    emoji: "🇨🇿",
    phone: "420",
    search: "Czech Republic جمهوری چک CZ +420 🇨🇿"
  }, {
    name: { en: "Denmark", fa: "دانمارک" },
    code: "DK",
    emoji: "🇩🇰",
    phone: "45",
    search: "Denmark دانمارک DK +45 🇩🇰"
  }, {
    name: { en: "Djibouti", fa: "جیبوتی" },
    code: "DJ",
    emoji: "🇩🇯",
    phone: "253",
    search: "Djibouti جیبوتی DJ +253 🇩🇯"
  }, {
    name: { en: "Dominica", fa: "دومینیکا" },
    code: "DM",
    emoji: "🇩🇲",
    phone: "767",
    search: "Dominica دومینیکا DM +767 🇩🇲"
  }, {
    name: { en: "Dominican Republic", fa: "جمهوری دومینیکن" },
    code: "DO",
    emoji: "🇩🇴",
    phone: "1",
    search: "Dominican Republic جمهوری دومینیکن DO +1 🇩🇴"
  }, {
    name: { en: "East Timor", fa: "تیمور شرقی" },
    code: "TL",
    emoji: "🇹🇱",
    phone: "670",
    search: "East Timor تیمور شرقی TL +670 🇹🇱"
  }, {
    name: { en: "Ecuador", fa: "اکوادور" },
    code: "EC",
    emoji: "🇪🇨",
    phone: "593",
    search: "Ecuador اکوادور EC +593 🇪🇨"
  }, {
    name: { en: "Egypt", fa: "مصر" },
    code: "EG",
    emoji: "🇪🇬",
    phone: "20",
    search: "Egypt مصر EG +20 🇪🇬"
  }, {
    name: { en: "El Salvador", fa: "السالوادور" },
    code: "SV",
    emoji: "🇸🇻",
    phone: "503",
    search: "El Salvador السالوادور SV +503 🇸🇻"
  }, {
    name: { en: "Equatorial Guinea", fa: "گینه استوایی" },
    code: "GQ",
    emoji: "🇬🇶",
    phone: "240",
    search: "Equatorial Guinea گینه استوایی GQ +240 🇬🇶"
  }, {
    name: { en: "Eritrea", fa: "اریتره" },
    code: "ER",
    emoji: "🇪🇷",
    phone: "291",
    search: "Eritrea اریتره ER +291 🇪🇷"
  }, {
    name: { en: "Estonia", fa: "استونی" },
    code: "EE",
    emoji: "🇪🇪",
    phone: "372",
    search: "Estonia استونی EE +372 🇪🇪"
  }, {
    name: { en: "Ethiopia", fa: "اتیوپی" },
    code: "ET",
    emoji: "🇪🇹",
    phone: "251",
    search: "Ethiopia اتیوپی ET +251 🇪🇹"
  }, {
    name: { en: "Fiji", fa: "فیجی" },
    code: "FJ",
    emoji: "🇫🇯",
    phone: "679",
    search: "Fiji فیجی FJ +679 🇫🇯"
  }, {
    name: { en: "Finland", fa: "فنلاند" },
    code: "FI",
    emoji: "🇫🇮",
    phone: "358",
    search: "Finland فنلاند FI +358 🇫🇮"
  }, {
    name: { en: "France", fa: "فرانسه" },
    code: "FR",
    emoji: "🇫🇷",
    phone: "33",
    search: "France فرانسه FR +33 🇫🇷"
  }, {
    name: { en: "Gabon", fa: "گابن" },
    code: "GA",
    emoji: "🇬🇦",
    phone: "241",
    search: "Gabon گابن GA +241 🇬🇦"
  }, {
    name: { en: "Gambia", fa: "گامبیا" },
    code: "GM",
    emoji: "🇬🇲",
    phone: "220",
    search: "Gambia گامبیا GM +220 🇬🇲"
  }, {
    name: { en: "Georgia", fa: "گرجستان" },
    code: "GE",
    emoji: "🇬🇪",
    phone: "995",
    search: "Georgia گرجستان GE +995 🇬🇪"
  }, {
    name: { en: "Germany", fa: "آلمان" },
    code: "DE",
    emoji: "🇩🇪",
    phone: "49",
    search: "Germany آلمان DE +49 🇩🇪"
  }, {
    name: { en: "Ghana", fa: "غنا" },
    code: "GH",
    emoji: "🇬🇭",
    phone: "233",
    search: "Ghana غنا GH +233 🇬🇭"
  }, {
    name: { en: "Greece", fa: "یونان" },
    code: "GR",
    emoji: "🇬🇷",
    phone: "30",
    search: "Greece یونان GR +30 🇬🇷"
  }, {
    name: { en: "Grenada", fa: "گرنادا" },
    code: "GD",
    emoji: "🇬🇩",
    phone: "1473",
    search: "Grenada گرنادا GD +1473 🇬🇩"
  }, {
    name: { en: "Guatemala", fa: "گواتمالا" },
    code: "GT",
    emoji: "🇬🇹",
    phone: "502",
    search: "Guatemala گواتمالا GT +502 🇬🇹"
  }, {
    name: { en: "Guinea", fa: "گینه" },
    code: "GN",
    emoji: "🇬🇳",
    phone: "224",
    search: "Guinea گینه GN +224 🇬🇳"
  }, {
    name: { en: "Guinea-Bissau", fa: "گینه بیسائو" },
    code: "GW",
    emoji: "🇬🇼",
    phone: "245",
    search: "Guinea-Bissau گینه بیسائو GW +245 🇬🇼"
  }, {
    name: { en: "Guyana", fa: "گویان" },
    code: "GY",
    emoji: "🇬🇾",
    phone: "592",
    search: "Guyana گویان GY +592 🇬🇾"
  }, {
    name: { en: "Haiti", fa: "هائیتی" },
    code: "HT",
    emoji: "🇭🇹",
    phone: "509",
    search: "Haiti هائیتی HT +509 🇭🇹"
  }, {
    name: { en: "Honduras", fa: "هندوراس" },
    code: "HN",
    emoji: "🇭🇳",
    phone: "504",
    search: "Honduras هندوراس HN +504 🇭🇳"
  }, {
    name: { en: "Hungary", fa: "مجارستان" },
    code: "HU",
    emoji: "🇭🇺",
    phone: "36",
    search: "Hungary مجارستان HU +36 🇭🇺"
  }, {
    name: { en: "Iceland", fa: "ایسلند" },
    code: "IS",
    emoji: "🇮🇸",
    phone: "354",
    search: "Iceland ایسلند IS +354 🇮🇸"
  }, {
    name: { en: "India", fa: "هند" },
    code: "IN",
    emoji: "🇮🇳",
    phone: "91",
    search: "India هند IN +91 🇮🇳"
  }, {
    name: { en: "Indonesia", fa: "اندونزی" },
    code: "ID",
    emoji: "🇮🇩",
    phone: "62",
    search: "Indonesia اندونزی ID +62 🇮🇩"
  }, {
    name: { en: "Iran", fa: "ایران" },
    code: "IR",
    emoji: "🇮🇷",
    phone: "98",
    search: "Iran ایران IR +98 🇮🇷"
  }, {
    name: { en: "Iraq", fa: "عراق" },
    code: "IQ",
    emoji: "🇮🇶",
    phone: "964",
    search: "Iraq عراق IQ +964 🇮🇶"
  }, {
    name: { en: "Ireland", fa: "ایرلند" },
    code: "IE",
    emoji: "🇮🇪",
    phone: "353",
    search: "Ireland ایرلند IE +353 🇮🇪"
  }, {
    name: { en: "Israel", fa: "اسرائیل" },
    code: "IL",
    emoji: "🇮🇱",
    phone: "972",
    search: "Israel اسرائیل IL +972 🇮🇱"
  }, {
    name: { en: "Italy", fa: "ایتالیا" },
    code: "IT",
    emoji: "🇮🇹",
    phone: "39",
    search: "Italy ایتالیا IT +39 🇮🇹"
  }, {
    name: { en: "Jamaica", fa: "جامائیکا" },
    code: "JM",
    emoji: "🇯🇲",
    phone: "876",
    search: "Jamaica جامائیکا JM +876 🇯🇲"
  }, {
    name: { en: "Japan", fa: "ژاپن" },
    code: "JP",
    emoji: "🇯🇵",
    phone: "81",
    search: "Japan ژاپن JP +81 🇯🇵"
  }, {
    name: { en: "Jordan", fa: "اردن" },
    code: "JO",
    emoji: "🇯🇴",
    phone: "962",
    search: "Jordan اردن JO +962 🇯🇴"
  }, {
    name: { en: "Kazakhstan", fa: "قزاقستان" },
    code: "KZ",
    emoji: "🇰🇿",
    phone: "7",
    search: "Kazakhstan قزاقستان KZ +7 🇰🇿"
  }, {
    name: { en: "Kenya", fa: "کنیا" },
    code: "KE",
    emoji: "🇰🇪",
    phone: "254",
    search: "Kenya کنیا KE +254 🇰🇪"
  }, {
    name: { en: "Kiribati", fa: "کیریباتی" },
    code: "KI",
    emoji: "🇰🇷",
    phone: "686",
    search: "Kiribati کیریباتی KI +686 🇰🇷"
  }, {
    name: { en: "Kuwait", fa: "کویت" },
    code: "KW",
    emoji: "🇰🇼",
    phone: "965",
    search: "Kuwait کویت KW +965 🇰🇼"
  }, {
    name: { en: "Kyrgyzstan", fa: "قرقیزستان" },
    code: "KG",
    emoji: "🇰🇬",
    phone: "996",
    search: "Kyrgyzstan قرقیزستان KG +996 🇰🇬"
  }, {
    name: { en: "Laos", fa: "لائوس" },
    code: "LA",
    emoji: "🇱🇦",
    phone: "856",
    search: "Laos لائوس LA +856 🇱🇦"
  }, {
    name: { en: "Latvia", fa: "لتونی" },
    code: "LV",
    emoji: "🇱🇻",
    phone: "371",
    search: "Latvia لتونی LV +371 🇱🇻"
  }, {
    name: { en: "Lebanon", fa: "لبنان" },
    code: "LB",
    emoji: "🇱🇧",
    phone: "961",
    search: "Lebanon لبنان LB +961 🇱🇧"
  }, {
    name: { en: "Lesotho", fa: "لسوتو" },
    code: "LS",
    emoji: "🇱🇸",
    phone: "266",
    search: "Lesotho لسوتو LS +266 🇱🇸"
  }, {
    name: { en: "Liberia", fa: "لیبریا" },
    code: "LR",
    emoji: "🇱🇷",
    phone: "231",
    search: "Liberia لیبریا LR +231 🇱🇷"
  }, {
    name: { en: "Libya", fa: "لیبی" },
    code: "LY",
    emoji: "🇱🇾",
    phone: "218",
    search: "Libya لیبی LY +218 🇱🇾"
  }, {
    name: { en: "Liechtenstein", fa: "لیختن‌اشتاین" },
    code: "LI",
    emoji: "🇱🇮",
    phone: "423",
    search: "Liechtenstein لیختن‌اشتاین LI +423 🇱🇮"
  }, {
    name: { en: "Lithuania", fa: "لیتوانی" },
    code: "LT",
    emoji: "🇱🇹",
    phone: "370",
    search: "Lithuania لیتوانی LT +370 🇱🇹"
  }, {
    name: { en: "Luxembourg", fa: "لوکزامبورگ" },
    code: "LU",
    emoji: "🇱🇺",
    phone: "352",
    search: "Luxembourg لوکزامبورگ LU +352 🇱🇺"
  }, {
    name: { en: "Madagascar", fa: "ماداگاسکار" },
    code: "MG",
    emoji: "🇲🇬",
    phone: "261",
    search: "Madagascar ماداگاسکار MG +261 🇲🇬"
  }, {
    name: { en: "Malawi", fa: "مالاوی" },
    code: "MW",
    emoji: "🇲🇼",
    phone: "265",
    search: "Malawi مالاوی MW +265 🇲🇼"
  }, {
    name: { en: "Malaysia", fa: "مالزی" },
    code: "MY",
    emoji: "🇲🇾",
    phone: "60",
    search: "Malaysia مالزی MY +60 🇲🇾"
  }, {
    name: { en: "Maldives", fa: "مالدیو" },
    code: "MV",
    emoji: "🇲🇻",
    phone: "960",
    search: "Maldives مالدیو MV +960 🇲🇻"
  }, {
    name: { en: "Mali", fa: "مالی" },
    code: "ML",
    emoji: "🇲🇱",
    phone: "223",
    search: "Mali مالی ML +223 🇲🇱"
  }, {
    name: { en: "Malta", fa: "مالت" },
    code: "MT",
    emoji: "🇲🇹",
    phone: "356",
    search: "Malta مالت MT +356 🇲🇹"
  }, {
    name: { en: "Marshall Islands", fa: "جزایر مارشال" },
    code: "MH",
    emoji: "🇲🇭",
    phone: "692",
    search: "Marshall Islands جزایر مارشال MH +692 🇲🇭"
  }, {
    name: { en: "Mauritania", fa: "موریتانی" },
    code: "MR",
    emoji: "🇲🇦",
    phone: "222",
    search: "Mauritania موریتانی MR +222 🇲🇦"
  }, {
    name: { en: "Mauritius", fa: "موریس" },
    code: "MU",
    emoji: "🇲🇺",
    phone: "230",
    search: "Mauritius موریس MU +230 🇲🇺"
  }, {
    name: { en: "Mexico", fa: "مکزیک" },
    code: "MX",
    emoji: "🇲🇽",
    phone: "52",
    search: "Mexico مکزیک MX +52 🇲🇽"
  }, {
    name: { en: "Micronesia", fa: "میکرونزی" },
    code: "FM",
    emoji: "🇫🇲",
    phone: "691",
    search: "Micronesia میکرونزی FM +691 🇫🇲"
  }, {
    name: { en: "Moldova", fa: "مولداوی" },
    code: "MD",
    emoji: "🇲🇩",
    phone: "373",
    search: "Moldova مولداوی MD +373 🇲🇩"
  }, {
    name: { en: "Monaco", fa: "موناکو" },
    code: "MC",
    emoji: "🇲🇨",
    phone: "377",
    search: "Monaco موناکو MC +377 🇲🇨"
  }, {
    name: { en: "Mongolia", fa: "مغولستان" },
    code: "MN",
    emoji: "🇲🇳",
    phone: "976",
    search: "Mongolia مغولستان MN +976 🇲🇳"
  }, {
    name: { en: "Montenegro", fa: "مونته‌نگرو" },
    code: "ME",
    emoji: "🇲🇪",
    phone: "382",
    search: "Montenegro مونته‌نگرو ME +382 🇲🇪"
  }, {
    name: { en: "Morocco", fa: "مراکش" },
    code: "MA",
    emoji: "🇲🇦",
    phone: "212",
    search: "Morocco مراکش MA +212 🇲🇦"
  }, {
    name: { en: "Mozambique", fa: "موزامبیک" },
    code: "MZ",
    emoji: "🇲🇿",
    phone: "258",
    search: "Mozambique موزامبیک MZ +258 🇲🇿"
  }, {
    name: { en: "Myanmar", fa: "میانمار" },
    code: "MM",
    emoji: "🇲🇲",
    phone: "95",
    search: "Myanmar میانمار MM +95 🇲🇲"
  }, {
    name: { en: "Namibia", fa: "نامیبیا" },
    code: "NA",
    emoji: "🇳🇦",
    phone: "264",
    search: "Namibia نامیبیا NA +264 🇳🇦"
  }, {
    name: { en: "Nauru", fa: "نائورو" },
    code: "NR",
    emoji: "🇳🇷",
    phone: "674",
    search: "Nauru نائورو NR +674 🇳🇷"
  }, {
    name: { en: "Nepal", fa: "نپال" },
    code: "NP",
    emoji: "🇳🇵",
    phone: "977",
    search: "Nepal نپال NP +977 🇳🇵"
  }, {
    name: { en: "Netherlands", fa: "هلند" },
    code: "NL",
    emoji: "🇳🇱",
    phone: "31",
    search: "Netherlands هلند NL +31 🇳🇱"
  }, {
    name: { en: "New Zealand", fa: "نیوزلند" },
    code: "NZ",
    emoji: "🇳🇿",
    phone: "64",
    search: "New Zealand نیوزلند NZ +64 🇳🇿"
  }, {
    name: { en: "Nicaragua", fa: "نیکاراگوئه" },
    code: "NI",
    emoji: "🇳🇮",
    phone: "505",
    search: "Nicaragua نیکاراگوئه NI +505 🇳🇮"
  }, {
    name: { en: "Niger", fa: "نیجر" },
    code: "NE",
    emoji: "🇳🇪",
    phone: "227",
    search: "Niger نیجر NE +227 🇳🇪"
  }, {
    name: { en: "Nigeria", fa: "نیجریه" },
    code: "NG",
    emoji: "🇳🇬",
    phone: "234",
    search: "Nigeria نیجریه NG +234 🇳🇬"
  }, {
    name: { en: "North Macedonia", fa: "مقدونیه شمالی" },
    code: "MK",
    emoji: "🇲🇰",
    phone: "389",
    search: "North Macedonia مقدونیه شمالی MK +389 🇲🇰"
  }, {
    name: { en: "Norway", fa: "نروژ" },
    code: "NO",
    emoji: "🇳🇴",
    phone: "47",
    search: "Norway نروژ NO +47 🇳🇴"
  }, {
    name: { en: "Oman", fa: "عمان" },
    code: "OM",
    emoji: "🇴🇲",
    phone: "968",
    search: "Oman عمان OM +968 🇴🇲"
  }, {
    name: { en: "Pakistan", fa: "پاکستان" },
    code: "PK",
    emoji: "🇵🇰",
    phone: "92",
    search: "Pakistan پاکستان PK +92 🇵🇰"
  }, {
    name: { en: "Palau", fa: "پالائو" },
    code: "PW",
    emoji: "🇵🇼",
    phone: "680",
    search: "Palau پالائو PW +680 🇵🇼"
  }, {
    name: { en: "Palestine", fa: "فلسطین" },
    code: "PS",
    emoji: "🇵🇸",
    phone: "970",
    search: "Palestine فلسطین PS +970 🇵🇸"
  }, {
    name: { en: "Panama", fa: "پاناما" },
    code: "PA",
    emoji: "🇵🇦",
    phone: "507",
    search: "Panama پاناما PA +507 🇵🇦"
  }, {
    name: { en: "Papua New Guinea", fa: "پاپوآ گینه نو" },
    code: "PG",
    emoji: "🇵🇬",
    phone: "675",
    search: "Papua New Guinea پاپوآ گینه نو PG +675 🇵🇬"
  }, {
    name: { en: "Paraguay", fa: "پاراگوئه" },
    code: "PY",
    emoji: "🇵🇾",
    phone: "595",
    search: "Paraguay پاراگوئه PY +595 🇵🇾"
  }, {
    name: { en: "Peru", fa: "پرو" },
    code: "PE",
    emoji: "🇵🇪",
    phone: "51",
    search: "Peru پرو PE +51 🇵🇪"
  }, {
    name: { en: "Philippines", fa: "فیلیپین" },
    code: "PH",
    emoji: "🇵🇭",
    phone: "63",
    search: "Philippines فیلیپین PH +63 🇵🇭"
  }, {
    name: { en: "Poland", fa: "لهستان" },
    code: "PL",
    emoji: "🇵🇱",
    phone: "48",
    search: "Poland لهستان PL +48 🇵🇱"
  }, {
    name: { en: "Portugal", fa: "پرتغال" },
    code: "PT",
    emoji: "🇵🇹",
    phone: "351",
    search: "Portugal پرتغال PT +351 🇵🇹"
  }, {
    name: { en: "Qatar", fa: "قطر" },
    code: "QA",
    emoji: "🇶🇦",
    phone: "974",
    search: "Qatar قطر QA +974 🇶🇦"
  }, {
    name: { en: "Romania", fa: "رومانی" },
    code: "RO",
    emoji: "🇷🇴",
    phone: "40",
    search: "Romania رومانی RO +40 🇷🇴"
  }, {
    name: { en: "Russia", fa: "روسیه" },
    code: "RU",
    emoji: "🇷🇺",
    phone: "7",
    search: "Russia روسیه RU +7 🇷🇺"
  }, {
    name: { en: "Rwanda", fa: "رواندا" },
    code: "RW",
    emoji: "🇷🇼",
    phone: "250",
    search: "Rwanda رواندا RW +250 🇷🇼"
  }, {
    name: { en: "Saint Kitts and Nevis", fa: "سنت کیتس و نویس" },
    code: "KN",
    emoji: "🇰🇳",
    phone: "1869",
    search: "Saint Kitts and Nevis سنت کیتس و نویس KN +1869 🇰🇳"
  }, {
    name: { en: "Saint Lucia", fa: "سنت لوسیا" },
    code: "LC",
    emoji: "🇱🇨",
    phone: "1758",
    search: "Saint Lucia سنت لوسیا LC +1758 🇱🇨"
  }, {
    name: { en: "Saint Vincent and the Grenadines", fa: "سنت وینسنت و گرنادین‌ها" },
    code: "VC",
    emoji: "🇻🇨",
    phone: "1784",
    search: "Saint Vincent and the Grenadines سنت وینسنت و گرنادین‌ها VC +1784 🇻🇨"
  }, {
    name: { en: "Samoa", fa: "ساموآ" },
    code: "WS",
    emoji: "🇼🇸",
    phone: "685",
    search: "Samoa ساموآ WS +685 🇼🇸"
  }, {
    name: { en: "San Marino", fa: "سان مارینو" },
    code: "SM",
    emoji: "🇸🇲",
    phone: "378",
    search: "San Marino سان مارینو SM +378 🇸🇲"
  }, {
    name: { en: "Sao Tome and Principe", fa: "سائوتومه و پرینسیپ" },
    code: "ST",
    emoji: "🇸🇹",
    phone: "239",
    search: "Sao Tome and Principe سائوتومه و پرینسیپ ST +239 🇸🇹"
  }, {
    name: { en: "Saudi Arabia", fa: "عربستان سعودی" },
    code: "SA",
    emoji: "🇸🇦",
    phone: "966",
    search: "Saudi Arabia عربستان سعودی SA +966 🇸🇦"
  }, {
    name: { en: "Senegal", fa: "سنگال" },
    code: "SN",
    emoji: "🇸🇳",
    phone: "221",
    search: "Senegal سنگال SN +221 🇸🇳"
  }, {
    name: { en: "Serbia", fa: "صربستان" },
    code: "RS",
    emoji: "🇷🇸",
    phone: "381",
    search: "Serbia صربستان RS +381 🇷🇸"
  }, {
    name: { en: "Seychelles", fa: "سیشل" },
    code: "SC",
    emoji: "🇸🇨",
    phone: "248",
    search: "Seychelles سیشل SC +248 🇸🇨"
  }, {
    name: { en: "Sierra Leone", fa: "سیرالئون" },
    code: "SL",
    emoji: "🇸🇱",
    phone: "232",
    search: "Sierra Leone سیرالئون SL +232 🇸🇱"
  }, {
    name: { en: "Singapore", fa: "سنگاپور" },
    code: "SG",
    emoji: "🇸🇬",
    phone: "65",
    search: "Singapore سنگاپور SG +65 🇸🇬"
  }, {
    name: { en: "Slovakia", fa: "اسلواکی" },
    code: "SK",
    emoji: "🇸🇰",
    phone: "421",
    search: "Slovakia اسلواکی SK +421 🇸🇰"
  }, {
    name: { en: "Slovenia", fa: "اسلوونی" },
    code: "SI",
    emoji: "🇸🇮",
    phone: "386",
    search: "Slovenia اسلوونی SI +386 🇸🇮"
  }, {
    name: { en: "Solomon Islands", fa: "جزایر سلیمان" },
    code: "SB",
    emoji: "🇸🇧",
    phone: "677",
    search: "Solomon Islands جزایر سلیمان SB +677 🇸🇧"
  }, {
    name: { en: "Somalia", fa: "سومالی" },
    code: "SO",
    emoji: "🇸🇴",
    phone: "252",
    search: "Somalia سومالی SO +252 🇸🇴"
  }, {
    name: { en: "South Africa", fa: "آفریقای جنوبی" },
    code: "ZA",
    emoji: "🇿🇦",
    phone: "27",
    search: "South Africa آفریقای جنوبی ZA +27 🇿🇦"
  }, {
    name: { en: "South Korea", fa: "کره جنوبی" },
    code: "KR",
    emoji: "🇰🇷",
    phone: "82",
    search: "South Korea کره جنوبی KR +82 🇰🇷"
  }, {
    name: { en: "South Sudan", fa: "سودان جنوبی" },
    code: "SS",
    emoji: "🇸🇸",
    phone: "211",
    search: "South Sudan سودان جنوبی SS +211 🇸🇸"
  }, {
    name: { en: "Spain", fa: "اسپانیا" },
    code: "ES",
    emoji: "🇪🇸",
    phone: "34",
    search: "Spain اسپانیا ES +34 🇪🇸"
  }, {
    name: { en: "Sri Lanka", fa: "سری‌لانکا" },
    code: "LK",
    emoji: "🇱🇰",
    phone: "94",
    search: "Sri Lanka سری‌لانکا LK +94 🇱🇰"
  }, {
    name: { en: "Sudan", fa: "سودان" },
    code: "SD",
    emoji: "🇸🇩",
    phone: "249",
    search: "Sudan سودان SD +249 🇸🇩"
  }, {
    name: { en: "Suriname", fa: "سورینام" },
    code: "SR",
    emoji: "🇸🇷",
    phone: "597",
    search: "Suriname سورینام SR +597 🇸🇷"
  }, {
    name: { en: "Sweden", fa: "سوئد" },
    code: "SE",
    emoji: "🇸🇪",
    phone: "46",
    search: "Sweden سوئد SE +46 🇸🇪"
  }, {
    name: { en: "Switzerland", fa: "سوئیس" },
    code: "CH",
    emoji: "🇨🇭",
    phone: "41",
    search: "Switzerland سوئیس CH +41 🇨🇭"
  }, {
    name: { en: "Syria", fa: "سوریه" },
    code: "SY",
    emoji: "🇸🇾",
    phone: "963",
    search: "Syria سوریه SY +963 🇸🇾"
  }, {
    name: { en: "Taiwan", fa: "تایوان" },
    code: "TW",
    emoji: "🇹🇼",
    phone: "886",
    search: "Taiwan تایوان TW +886 🇹🇼"
  }, {
    name: { en: "Tajikistan", fa: "تاجیکستان" },
    code: "TJ",
    emoji: "🇹🇯",
    phone: "992",
    search: "Tajikistan تاجیکستان TJ +992 🇹🇯"
  }, {
    name: { en: "Tanzania", fa: "تانزانیا" },
    code: "TZ",
    emoji: "🇹🇿",
    phone: "255",
    search: "Tanzania تانزانیا TZ +255 🇹🇿"
  }, {
    name: { en: "Thailand", fa: "تایلند" },
    code: "TH",
    emoji: "🇹🇭",
    phone: "66",
    search: "Thailand تایلند TH +66 🇹🇭"
  }, {
    name: { en: "Togo", fa: "توگو" },
    code: "TG",
    emoji: "🇹🇬",
    phone: "228",
    search: "Togo توگو TG +228 🇹🇬"
  }, {
    name: { en: "Tonga", fa: "تونگا" },
    code: "TO",
    emoji: "🇹🇴",
    phone: "676",
    search: "Tonga تونگا TO +676 🇹🇴"
  }, {
    name: { en: "Trinidad and Tobago", fa: "ترینیداد و توباگو" },
    code: "TT",
    emoji: "🇹🇹",
    phone: "868",
    search: "Trinidad and Tobago ترینیداد و توباگو TT +868 🇹🇹"
  }, {
    name: { en: "Tunisia", fa: "تونس" },
    code: "TN",
    emoji: "🇹🇳",
    phone: "216",
    search: "Tunisia تونس TN +216 🇹🇳"
  }, {
    name: { en: "Turkey", fa: "ترکیه" },
    code: "TR",
    emoji: "🇹🇷",
    phone: "90",
    search: "Turkey ترکیه TR +90 🇹🇷"
  }, {
    name: { en: "Turkmenistan", fa: "ترکمنستان" },
    code: "TM",
    emoji: "🇹🇲",
    phone: "993",
    search: "Turkmenistan ترکمنستان TM +993 🇹🇲"
  }, {
    name: { en: "Tuvalu", fa: "تووالو" },
    code: "TV",
    emoji: "🇹🇻",
    phone: "688",
    search: "Tuvalu تووالو TV +688 🇹🇻"
  }, {
    name: { en: "Uganda", fa: "اوگاندا" },
    code: "UG",
    emoji: "🇺🇬",
    phone: "256",
    search: "Uganda اوگاندا UG +256 🇺🇬"
  }, {
    name: { en: "Ukraine", fa: "اوکراین" },
    code: "UA",
    emoji: "🇺🇦",
    phone: "380",
    search: "Ukraine اوکراین UA +380 🇺🇦"
  }, {
    name: { en: "United Arab Emirates", fa: "امارات متحده عربی" },
    code: "AE",
    emoji: "🇦🇪",
    phone: "971",
    search: "United Arab Emirates امارات متحده عربی AE +971 🇦🇪"
  }, {
    name: { en: "United Kingdom", fa: "پادشاهی متحد" },
    code: "GB",
    emoji: "🇬🇧",
    phone: "44",
    search: "United Kingdom پادشاهی متحد GB +44 🇬🇧"
  }, {
    name: { en: "United States", fa: "ایالات متحده" },
    code: "US",
    emoji: "🇺🇸",
    phone: "1",
    search: "United States ایالات متحده US +1 🇺🇸"
  }, {
    name: { en: "Uruguay", fa: "اروگوئه" },
    code: "UY",
    emoji: "🇺🇾",
    phone: "598",
    search: "Uruguay اروگوئه UY +598 🇺🇾"
  }, {
    name: { en: "Uzbekistan", fa: "ازبکستان" },
    code: "UZ",
    emoji: "🇺🇿",
    phone: "998",
    search: "Uzbekistan ازبکستان UZ +998 🇺🇿"
  }, {
    name: { en: "Vanuatu", fa: "وانواتو" },
    code: "VU",
    emoji: "🇻🇺",
    phone: "678",
    search: "Vanuatu وانواتو VU +678 🇻🇺"
  }, {
    name: { en: "Vatican City", fa: "واتیکان" },
    code: "VA",
    emoji: "🇻🇦",
    phone: "39",
    search: "Vatican City واتیکان VA +39 🇻🇦"
  }, {
    name: { en: "Venezuela", fa: "ونزوئلا" },
    code: "VE",
    emoji: "🇻🇪",
    phone: "58",
    search: "Venezuela ونزوئلا VE +58 🇻🇪"
  }, {
    name: { en: "Vietnam", fa: "ویتنام" },
    code: "VN",
    emoji: "🇻🇳",
    phone: "84",
    search: "Vietnam ویتنام VN +84 🇻🇳"
  }, {
    name: { en: "Yemen", fa: "یمن" },
    code: "YE",
    emoji: "🇾🇪",
    phone: "967",
    search: "Yemen یمن YE +967 🇾🇪"
  }, {
    name: { en: "Zambia", fa: "زامبیا" },
    code: "ZM",
    emoji: "🇿🇲",
    phone: "260",
    search: "Zambia زامبیا ZM +260 🇿🇲"
  }, {
    name: { en: "Zimbabwe", fa: "زیمبابوه" },
    code: "ZW",
    emoji: "🇿🇼",
    phone: "263",
    search: "Zimbabwe زیمبابوه ZW +263 🇿🇼"
  }];
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CountryCode",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const countries = ref([]);
    function onOpen() {
      if (!countries.value?.length) {
        countries.value = getCountries();
      }
    }
    const { locale } = useI18n();
    const selectedCountry = ref(void 0);
    const emit = __emit;
    watch(selectedCountry, (val) => {
      emit("update:modelValue", val?.code);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = _sfc_main$7;
      const _component_UIcon = _sfc_main$q;
      _push(ssrRenderComponent(_component_USelectMenu, mergeProps({
        dir: "ltr",
        arrow: false,
        items: unref(countries),
        modelValue: unref(selectedCountry),
        "onUpdate:modelValue": ($event) => isRef(selectedCountry) ? selectedCountry.value = $event : null,
        "search-input": { icon: "mdi:search" },
        ui: { itemLabel: "w-full", content: "w-64", input: "direction-auto", arrow: "text-black dark:text-white" },
        "label-key": "search",
        "trailing-icon": "",
        "onUpdate:open": onOpen
      }, _attrs), {
        "item-label": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between w-full"${_scopeId}><span${_scopeId}>${ssrInterpolate(item?.name[unref(locale)])}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between w-full" }, [
                createVNode("span", null, toDisplayString$1(item?.name[unref(locale)]), 1)
              ])
            ];
          }
        }),
        default: withCtx(({ modelValue }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}>`);
            if (modelValue) {
              _push2(`<span${_scopeId}>${ssrInterpolate(modelValue?.name[unref(locale)])}</span>`);
            } else {
              _push2(`<span class="text-muted" dir="ltr"${_scopeId}>${ssrInterpolate(_ctx.$t("common.labels.choose_country"))}</span>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                modelValue ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString$1(modelValue?.name[unref(locale)]), 1)) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-muted",
                  dir: "ltr"
                }, toDisplayString$1(_ctx.$t("common.labels.choose_country")), 1))
              ])
            ];
          }
        }),
        leading: withCtx(({ modelValue, ui }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (modelValue) {
              _push2(`<span class="size-5 text-center"${_scopeId}>${ssrInterpolate(modelValue?.emoji)}</span>`);
            } else {
              _push2(ssrRenderComponent(_component_UIcon, {
                class: ui.leadingIcon(),
                name: "mdi:earth"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              modelValue ? (openBlock(), createBlock("span", {
                key: 0,
                class: "size-5 text-center"
              }, toDisplayString$1(modelValue?.emoji), 1)) : (openBlock(), createBlock(_component_UIcon, {
                key: 1,
                class: ui.leadingIcon(),
                name: "mdi:earth"
              }, null, 8, ["class"]))
            ];
          }
        }),
        "item-leading": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="size-5 text-center"${_scopeId}>${ssrInterpolate(item.emoji)}</span>`);
          } else {
            return [
              createVNode("span", { class: "size-5 text-center" }, toDisplayString$1(item.emoji), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/select/CountryCode.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$6, { __name: "SelectCountryCode" });
const theme$1 = {
  "slots": {
    "root": "relative flex items-start",
    "container": "flex items-center",
    "base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full text-inverted",
    "icon": "shrink-0 size-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "root": ""
      },
      "card": {
        "root": "border border-muted rounded-lg"
      }
    },
    "indicator": {
      "start": {
        "root": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "root": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75",
        "base": "cursor-not-allowed",
        "label": "cursor-not-allowed",
        "description": "cursor-not-allowed"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": "card",
      "class": {
        "root": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": "card",
      "class": {
        "root": "p-3"
      }
    },
    {
      "size": "md",
      "variant": "card",
      "class": {
        "root": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": "card",
      "class": {
        "root": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": "card",
      "class": {
        "root": "p-4.5"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "root": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "variant": "card",
      "disabled": true,
      "class": {
        "root": "cursor-not-allowed"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "list",
    "indicator": "start"
  }
};
const _sfc_main$5 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UCheckbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    indicator: { type: null, required: false },
    icon: { type: null, required: false },
    indeterminateIcon: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    name: { type: String, required: false },
    value: { type: null, required: false },
    id: { type: String, required: false },
    defaultValue: { type: [Boolean, String], required: false }
  }, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue", { type: [Boolean, String], ...{ default: void 0 } });
    const appConfig2 = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id2 = _id.value ?? useId();
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig2.ui?.checkbox || {} })({
      size: size.value,
      color: color.value,
      variant: props.variant,
      indicator: props.indicator,
      required: props.required,
      disabled: disabled.value
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: !__props.variant || __props.variant === "list" ? __props.as : unref(Label),
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id2) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              "data-slot": "base",
              class: ui.value.base({ class: props.ui?.base })
            }), {
              default: withCtx(({ modelValue: modelValue2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckboxIndicator), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (modelValue2 === "indeterminate") {
                          _push4(ssrRenderComponent(_sfc_main$q, {
                            name: __props.indeterminateIcon || unref(appConfig2).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$q, {
                            name: __props.icon || unref(appConfig2).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$q, {
                            key: 0,
                            name: __props.indeterminateIcon || unref(appConfig2).ui.icons.minus,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$q, {
                            key: 1,
                            name: __props.icon || unref(appConfig2).ui.icons.check,
                            "data-slot": "icon",
                            class: ui.value.icon({ class: props.ui?.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CheckboxIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$q, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig2).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$q, {
                          key: 1,
                          name: __props.icon || unref(appConfig2).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.label || !!slots.label || (__props.description || !!slots.description)) {
              _push2(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId}>`);
              if (__props.label || !!slots.label) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  for: unref(id2),
                  "data-slot": "label",
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
                        _push3(`${ssrInterpolate(__props.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                          createTextVNode(toDisplayString$1(__props.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              if (__props.description || !!slots.description) {
                _push2(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({ class: props.ui?.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
                  _push2(`${ssrInterpolate(__props.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                "data-slot": "container",
                class: ui.value.container({ class: props.ui?.container })
              }, [
                createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id2) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled),
                  "data-slot": "base",
                  class: ui.value.base({ class: props.ui?.base })
                }), {
                  default: withCtx(({ modelValue: modelValue2 }) => [
                    createVNode(unref(CheckboxIndicator), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, {
                      default: withCtx(() => [
                        modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$q, {
                          key: 0,
                          name: __props.indeterminateIcon || unref(appConfig2).ui.icons.minus,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$q, {
                          key: 1,
                          name: __props.icon || unref(appConfig2).ui.icons.check,
                          "data-slot": "icon",
                          class: ui.value.icon({ class: props.ui?.icon })
                        }, null, 8, ["name", "class"]))
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ]),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              __props.label || !!slots.label || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: props.ui?.wrapper })
              }, [
                __props.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                  key: 0,
                  for: unref(id2),
                  "data-slot": "label",
                  class: ui.value.label({ class: props.ui?.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                      createTextVNode(toDisplayString$1(__props.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                __props.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  "data-slot": "description",
                  class: ui.value.description({ class: props.ui?.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    createTextVNode(toDisplayString$1(__props.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "profileSetup",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentModal: currentModal2, close, currentModalProps } = useAuthModal();
    const isOpen = computed({
      get: () => currentModal2.value === "profileSetup",
      set: (val) => !val && close()
    });
    const loading = ref(false);
    const authState = useState("login-state");
    const authInfo = ref({
      first_name: "",
      last_name: "",
      email: authState.value?.loginInfo?.email || "",
      country_code: "",
      password: "",
      confirm_password: "",
      tos_agreed: false
    });
    async function submit() {
      loading.value = true;
      try {
        const response = await $fetch("/api/auth/signup/complete/", {
          method: "POST",
          body: authInfo.value
        });
        if (response.ok) {
          useState("login-state", () => ({
            state: "complete",
            loginInfo: authInfo.value
          }));
          const store = useStorage();
          return close();
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$e;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_SelectCountryCode = __nuxt_component_3;
      const _component_UCheckbox = _sfc_main$5;
      const _component_I18nT = resolveComponent("I18nT");
      const _component_ULink = _sfc_main$m;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: unref(isOpen),
        "onUpdate:open": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        close: unref(currentModalProps)?.keepOpen !== true,
        dismissible: unref(currentModalProps)?.keepOpen !== true
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-extrabold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("common.site_title"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "font-extrabold text-xl" }, toDisplayString$1(_ctx.$t("common.site_title")), 1)
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col"${_scopeId}><h2 class="font-bold text-xl"${_scopeId}>${ssrInterpolate(_ctx.$t("modals.signup.title_new_account"))}</h2><form class="p-6 space-y-6" autocomplete="off"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.label_firstname")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    modelValue: unref(authInfo).first_name,
                    "onUpdate:modelValue": ($event) => unref(authInfo).first_name = $event,
                    placeholder: _ctx.$t("modals.profile_setup.placeholder_firstname"),
                    autocomplete: "given-name",
                    autofocus: "",
                    class: "w-full",
                    required: "",
                    type: "text"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      modelValue: unref(authInfo).first_name,
                      "onUpdate:modelValue": ($event) => unref(authInfo).first_name = $event,
                      placeholder: _ctx.$t("modals.profile_setup.placeholder_firstname"),
                      autocomplete: "given-name",
                      autofocus: "",
                      class: "w-full",
                      required: "",
                      type: "text"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.label_lastname")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    modelValue: unref(authInfo).last_name,
                    "onUpdate:modelValue": ($event) => unref(authInfo).last_name = $event,
                    placeholder: _ctx.$t("modals.profile_setup.placeholder_lastname"),
                    autocomplete: "family-name",
                    autofocus: "",
                    class: "w-full",
                    required: "",
                    type: "text"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      modelValue: unref(authInfo).last_name,
                      "onUpdate:modelValue": ($event) => unref(authInfo).last_name = $event,
                      placeholder: _ctx.$t("modals.profile_setup.placeholder_lastname"),
                      autocomplete: "family-name",
                      autofocus: "",
                      class: "w-full",
                      required: "",
                      type: "text"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.residence_country")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SelectCountryCode, {
                    modelValue: unref(authInfo).country_code,
                    "onUpdate:modelValue": ($event) => unref(authInfo).country_code = $event,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SelectCountryCode, {
                      modelValue: unref(authInfo).country_code,
                      "onUpdate:modelValue": ($event) => unref(authInfo).country_code = $event,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.label_email")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    disabled: "",
                    modelValue: unref(authInfo).email,
                    "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                    placeholder: _ctx.$t("modals.profile_setup.placeholder_email"),
                    autocomplete: "email",
                    class: "w-full",
                    required: "",
                    type: "email"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      disabled: "",
                      modelValue: unref(authInfo).email,
                      "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                      placeholder: _ctx.$t("modals.profile_setup.placeholder_email"),
                      autocomplete: "email",
                      class: "w-full",
                      required: "",
                      type: "email"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.label_password")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    modelValue: unref(authInfo).password,
                    "onUpdate:modelValue": ($event) => unref(authInfo).password = $event,
                    placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                    autocomplete: "new-password",
                    class: "w-full",
                    required: "",
                    type: "password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      modelValue: unref(authInfo).password,
                      "onUpdate:modelValue": ($event) => unref(authInfo).password = $event,
                      placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                      autocomplete: "new-password",
                      class: "w-full",
                      required: "",
                      type: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              size: "xl",
              label: _ctx.$t("modals.profile_setup.label_password_retype")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    dir: "auto",
                    modelValue: unref(authInfo).confirm_password,
                    "onUpdate:modelValue": ($event) => unref(authInfo).confirm_password = $event,
                    placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                    autocomplete: "new-password",
                    class: "w-full",
                    required: "",
                    type: "password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      dir: "auto",
                      modelValue: unref(authInfo).confirm_password,
                      "onUpdate:modelValue": ($event) => unref(authInfo).confirm_password = $event,
                      placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                      autocomplete: "new-password",
                      class: "w-full",
                      required: "",
                      type: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: unref(authInfo).tos_agreed,
              "onUpdate:modelValue": ($event) => unref(authInfo).tos_agreed = $event,
              required: ""
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_I18nT, { keypath: "modals.profile_setup.text_tos_agreement" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ULink, { to: "/" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("modals.profile_setup.label_tos"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString$1(_ctx.$t("modals.profile_setup.label_tos")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ULink, { to: "/" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString$1(_ctx.$t("modals.profile_setup.label_tos")), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_I18nT, { keypath: "modals.profile_setup.text_tos_agreement" }, {
                      default: withCtx(() => [
                        createVNode(_component_ULink, { to: "/" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString$1(_ctx.$t("modals.profile_setup.label_tos")), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="w-full text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              label: _ctx.$t("modals.profile_setup.label_create_account"),
              "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
              size: "xl"
            }, null, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("h2", { class: "font-bold text-xl" }, toDisplayString$1(_ctx.$t("modals.signup.title_new_account")), 1),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "p-6 space-y-6",
                  autocomplete: "off"
                }, [
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.label_firstname")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        modelValue: unref(authInfo).first_name,
                        "onUpdate:modelValue": ($event) => unref(authInfo).first_name = $event,
                        placeholder: _ctx.$t("modals.profile_setup.placeholder_firstname"),
                        autocomplete: "given-name",
                        autofocus: "",
                        class: "w-full",
                        required: "",
                        type: "text"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.label_lastname")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        modelValue: unref(authInfo).last_name,
                        "onUpdate:modelValue": ($event) => unref(authInfo).last_name = $event,
                        placeholder: _ctx.$t("modals.profile_setup.placeholder_lastname"),
                        autocomplete: "family-name",
                        autofocus: "",
                        class: "w-full",
                        required: "",
                        type: "text"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.residence_country")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_SelectCountryCode, {
                        modelValue: unref(authInfo).country_code,
                        "onUpdate:modelValue": ($event) => unref(authInfo).country_code = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.label_email")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        disabled: "",
                        modelValue: unref(authInfo).email,
                        "onUpdate:modelValue": ($event) => unref(authInfo).email = $event,
                        placeholder: _ctx.$t("modals.profile_setup.placeholder_email"),
                        autocomplete: "email",
                        class: "w-full",
                        required: "",
                        type: "email"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.label_password")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        modelValue: unref(authInfo).password,
                        "onUpdate:modelValue": ($event) => unref(authInfo).password = $event,
                        placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                        autocomplete: "new-password",
                        class: "w-full",
                        required: "",
                        type: "password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UFormField, {
                    size: "xl",
                    label: _ctx.$t("modals.profile_setup.label_password_retype")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        dir: "auto",
                        modelValue: unref(authInfo).confirm_password,
                        "onUpdate:modelValue": ($event) => unref(authInfo).confirm_password = $event,
                        placeholder: _ctx.$t("modals.profile_setup.placeholder_password"),
                        autocomplete: "new-password",
                        class: "w-full",
                        required: "",
                        type: "password"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_UCheckbox, {
                    modelValue: unref(authInfo).tos_agreed,
                    "onUpdate:modelValue": ($event) => unref(authInfo).tos_agreed = $event,
                    required: ""
                  }, {
                    label: withCtx(() => [
                      createVNode(_component_I18nT, { keypath: "modals.profile_setup.text_tos_agreement" }, {
                        default: withCtx(() => [
                          createVNode(_component_ULink, { to: "/" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString$1(_ctx.$t("modals.profile_setup.label_tos")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "w-full text-center" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      label: _ctx.$t("modals.profile_setup.label_create_account"),
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:arrow-back", "mdi:arrow-forward"),
                      size: "xl"
                    }, null, 8, ["label", "trailing-icon"])
                  ])
                ], 32)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/profileSetup.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$4, { __name: "ModalProfileSetup" });
const ar = /* @__PURE__ */ defineLocale({
  name: "العربية",
  code: "ar",
  dir: "rtl",
  messages: {
    alert: {
      close: "إغلاق"
    },
    authForm: {
      hidePassword: "إخفاء كلمة المرور",
      showPassword: "إظهار كلمة المرور",
      submit: "متابعة"
    },
    banner: {
      close: "إغلاق"
    },
    calendar: {
      nextMonth: "الشهر المقبل",
      nextYear: "السنة المقبلة",
      prevMonth: "الشهر السابق",
      prevYear: "السنة السابقة"
    },
    carousel: {
      dots: "اختر الشريحة المراد عرضها",
      goto: "الذهاب إلى شريحة {slide}",
      next: "التالي",
      prev: "السابق"
    },
    chatPrompt: {
      placeholder: "اكتب رسالتك هنا…"
    },
    chatPromptSubmit: {
      label: "إرسال"
    },
    colorMode: {
      dark: "داكن",
      light: "فاتح",
      switchToDark: "التبديل إلى الوضع الداكن",
      switchToLight: "التبديل إلى الوضع الفاتح",
      system: "النظام"
    },
    commandPalette: {
      back: "رجوع",
      close: "إغلاق",
      noData: "لا توجد بيانات",
      noMatch: "لا توجد نتائج مطابقة",
      placeholder: "اكتب أمرًا أو ابحث…"
    },
    contentSearch: {
      links: "الروابط",
      theme: "السمة"
    },
    contentSearchButton: {
      label: "بحث…"
    },
    contentToc: {
      title: "في هذه الصفحة"
    },
    dashboardSearch: {
      theme: "السمة"
    },
    dashboardSearchButton: {
      label: "بحث…"
    },
    dashboardSidebarCollapse: {
      collapse: "طي الشريط الجانبي",
      expand: "توسيع الشريط الجانبي"
    },
    dashboardSidebarToggle: {
      close: "إغلاق الشريط الجانبي",
      open: "فتح الشريط الجانبي"
    },
    error: {
      clear: "العودة إلى الصفحة الرئيسية"
    },
    fileUpload: {
      removeFile: "إزالة {filename}"
    },
    header: {
      close: "إغلاق القائمة",
      open: "فتح القائمة"
    },
    inputMenu: {
      create: 'إنشاء "{label}"',
      noData: "لا توجد بيانات",
      noMatch: "لا توجد نتائج مطابقة"
    },
    inputNumber: {
      decrement: "تقليل",
      increment: "زيادة"
    },
    modal: {
      close: "إغلاق"
    },
    pricingTable: {
      caption: "مقارنة الخطط السعرية"
    },
    prose: {
      codeCollapse: {
        closeText: "طي",
        name: "كود",
        openText: "توسيع"
      },
      collapsible: {
        closeText: "إخفاء",
        name: "خصائص",
        openText: "إظهار"
      },
      pre: {
        copy: "نسخ الكود إلى الحافظة"
      }
    },
    selectMenu: {
      create: 'إنشاء "{label}"',
      noData: "لا توجد بيانات",
      noMatch: "لا توجد نتائج مطابقة",
      search: "بحث…"
    },
    slideover: {
      close: "إغلاق"
    },
    table: {
      noData: "لا توجد بيانات"
    },
    toast: {
      close: "إغلاق"
    }
  }
});
const az = /* @__PURE__ */ defineLocale({
  name: "Azərbaycanca",
  code: "az",
  messages: {
    alert: {
      close: "Bağla"
    },
    authForm: {
      hidePassword: "Şifrəni gizlət",
      showPassword: "Şifrəni göstər",
      submit: "Davam et"
    },
    banner: {
      close: "Bağla"
    },
    calendar: {
      nextMonth: "Növbəti ay",
      nextYear: "Növbəti il",
      prevMonth: "Əvvəlki ay",
      prevYear: "Əvvəlki il"
    },
    carousel: {
      dots: "Göstərmək üçün slayd seçin",
      goto: "Slayd {slide} keç",
      next: "Növbəti",
      prev: "Əvvəlki"
    },
    chatPrompt: {
      placeholder: "Buraya mesajınızı yazın…"
    },
    chatPromptSubmit: {
      label: "Göndər"
    },
    colorMode: {
      dark: "Qaranlıq",
      light: "İşıqlı",
      switchToDark: "Qaranlıq rejimə keç",
      switchToLight: "İşıqlı rejimə keç",
      system: "Sistem"
    },
    commandPalette: {
      back: "Geri",
      close: "Bağla",
      noData: "Məlumat yoxdur",
      noMatch: "Uyğun məlumat tapılmadı",
      placeholder: "Əmr daxil edin və ya axtarın…"
    },
    contentSearch: {
      links: "Bağlantılar",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Axtar…"
    },
    contentToc: {
      title: "Bu səhifədə"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Axtar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Yan paneli daralt",
      expand: "Yan paneli genişlət"
    },
    dashboardSidebarToggle: {
      close: "Yan paneli bağla",
      open: "Yan paneli aç"
    },
    error: {
      clear: "Ana səhifəyə qayıt"
    },
    fileUpload: {
      removeFile: "{filename} sil"
    },
    header: {
      close: "Menyunu bağla",
      open: "Menyunu aç"
    },
    inputMenu: {
      create: '"{label}" yarat',
      noData: "Məlumat yoxdur",
      noMatch: "Uyğun məlumat tapılmadı"
    },
    inputNumber: {
      decrement: "Azalt",
      increment: "Artır"
    },
    modal: {
      close: "Bağla"
    },
    pricingTable: {
      caption: "Qiymət planlarının müqayisəsi"
    },
    prose: {
      codeCollapse: {
        closeText: "Daralt",
        name: "kod",
        openText: "Genişlət"
      },
      collapsible: {
        closeText: "Gizlət",
        name: "xüsusiyyətlər",
        openText: "Göstər"
      },
      pre: {
        copy: "Kodu buferə kopyala"
      }
    },
    selectMenu: {
      create: '"{label}" yarat',
      noData: "Məlumat yoxdur",
      noMatch: "Uyğun məlumat tapılmadı",
      search: "Axtar…"
    },
    slideover: {
      close: "Bağla"
    },
    table: {
      noData: "Məlumat yoxdur"
    },
    toast: {
      close: "Bağla"
    }
  }
});
const bg = /* @__PURE__ */ defineLocale({
  name: "Български",
  code: "bg",
  messages: {
    alert: {
      close: "Затворете"
    },
    authForm: {
      hidePassword: "Скрий паролата",
      showPassword: "Покажи паролата",
      submit: "Продължи"
    },
    banner: {
      close: "Затвори"
    },
    calendar: {
      nextMonth: "Следващ месец",
      nextYear: "Следваща година",
      prevMonth: "Предишен месец",
      prevYear: "Предишна година"
    },
    carousel: {
      dots: "Изберете слайд за показване",
      goto: "Отидете на слайд {slide}",
      next: "Напред",
      prev: "Назад"
    },
    chatPrompt: {
      placeholder: "Въведете съобщение…"
    },
    chatPromptSubmit: {
      label: "Изпрати"
    },
    colorMode: {
      dark: "Тъмно",
      light: "Светло",
      switchToDark: "Превключи към тъмен режим",
      switchToLight: "Превключи към светъл режим",
      system: "Система"
    },
    commandPalette: {
      back: "Назад",
      close: "Затворете",
      noData: "Няма данни",
      noMatch: "Няма съвпадение на данни",
      placeholder: "Въведете команда или потърсете…"
    },
    contentSearch: {
      links: "Връзки",
      theme: "Тема"
    },
    contentSearchButton: {
      label: "Търсене"
    },
    contentToc: {
      title: "Съдържание"
    },
    dashboardSearch: {
      theme: "Тема"
    },
    dashboardSearchButton: {
      label: "Търсене"
    },
    dashboardSidebarCollapse: {
      collapse: "Свий",
      expand: "Разшири"
    },
    dashboardSidebarToggle: {
      close: "Затвори",
      open: "Отвори"
    },
    error: {
      clear: "Изчисти"
    },
    fileUpload: {
      removeFile: "Премахни {filename}"
    },
    header: {
      close: "Затвори",
      open: "Отвори"
    },
    inputMenu: {
      create: 'Създайте "{label}"',
      noData: "Няма данни",
      noMatch: "Няма съвпадение на данни"
    },
    inputNumber: {
      decrement: "Намаляване",
      increment: "Увеличаване"
    },
    modal: {
      close: "Затворете"
    },
    pricingTable: {
      caption: "Ценова таблица"
    },
    prose: {
      codeCollapse: {
        closeText: "Сгъни",
        name: "код",
        openText: "Разгъни"
      },
      collapsible: {
        closeText: "Скрий",
        name: "свойства",
        openText: "Покажи"
      },
      pre: {
        copy: "Копирай кода в клипборда"
      }
    },
    selectMenu: {
      create: 'Създайте "{label}"',
      noData: "Няма данни",
      noMatch: "Няма съвпадение на данни",
      search: "Потърсете…"
    },
    slideover: {
      close: "Затворете"
    },
    table: {
      noData: "Няма данни"
    },
    toast: {
      close: "Затворете"
    }
  }
});
const bn = /* @__PURE__ */ defineLocale({
  name: "বাংলা",
  code: "bn",
  messages: {
    alert: {
      close: "বন্ধ করুন"
    },
    authForm: {
      hidePassword: "পাসওয়ার্ড লুকান",
      showPassword: "পাসওয়ার্ড দেখান",
      submit: "চালিয়ে যান"
    },
    banner: {
      close: "বন্ধ করুন"
    },
    calendar: {
      nextMonth: "পরবর্তী মাস",
      nextYear: "পরবর্তী বছর",
      prevMonth: "পূর্ববর্তী মাস",
      prevYear: "পূর্ববর্তী বছর"
    },
    carousel: {
      dots: "প্রদর্শনের জন্য স্লাইড নির্বাচন করুন",
      goto: "স্লাইড {slide} এ যান",
      next: "পরবর্তী",
      prev: "পূর্ববর্তী"
    },
    chatPrompt: {
      placeholder: "এখানে আপনার বার্তা লিখুন…"
    },
    chatPromptSubmit: {
      label: "প্রেরণ করুন"
    },
    colorMode: {
      dark: "গাঢ়",
      light: "হালকা",
      switchToDark: "গাঢ় মোডে পরিবর্তন করুন",
      switchToLight: "হালকা মোডে পরিবর্তন করুন",
      system: "সিস্টেম"
    },
    commandPalette: {
      back: "পেছনে",
      close: "বন্ধ করুন",
      noData: "কোন তথ্য নেই",
      noMatch: "কোন মিল পাওয়া যায়নি",
      placeholder: "কমান্ড টাইপ করুন বা অনুসন্ধান করুন…"
    },
    contentSearch: {
      links: "লিংকসমূহ",
      theme: "থিম"
    },
    contentSearchButton: {
      label: "অনুসন্ধান করুন…"
    },
    contentToc: {
      title: "এই পৃষ্ঠায়"
    },
    dashboardSearch: {
      theme: "থিম"
    },
    dashboardSearchButton: {
      label: "অনুসন্ধান করুন…"
    },
    dashboardSidebarCollapse: {
      collapse: "সাইডবার সংকুচিত করুন",
      expand: "সাইডবার প্রসারিত করুন"
    },
    dashboardSidebarToggle: {
      close: "সাইডবার বন্ধ করুন",
      open: "সাইডবার খুলুন"
    },
    error: {
      clear: "হোম পেজে ফিরে যান"
    },
    fileUpload: {
      removeFile: "{filename} সরান"
    },
    header: {
      close: "মেনু বন্ধ করুন",
      open: "মেনু খুলুন"
    },
    inputMenu: {
      create: '"{label}" তৈরি করুন',
      noData: "কোন তথ্য নেই",
      noMatch: "কোন মিল পাওয়া যায়নি"
    },
    inputNumber: {
      decrement: "হ্রাস করুন",
      increment: "বৃদ্ধি করুন"
    },
    modal: {
      close: "বন্ধ করুন"
    },
    pricingTable: {
      caption: "প্রাইসিং প্ল্যানের তুলনা"
    },
    prose: {
      codeCollapse: {
        closeText: "সংকুচিত করুন",
        name: "কোড",
        openText: "প্রসারিত করুন"
      },
      collapsible: {
        closeText: "লুকান",
        name: "বৈশিষ্ট্যসমূহ",
        openText: "দেখান"
      },
      pre: {
        copy: "কোড ক্লিপবোর্ডে কপি করুন"
      }
    },
    selectMenu: {
      create: '"{label}" তৈরি করুন',
      noData: "কোন তথ্য নেই",
      noMatch: "কোন মিল পাওয়া যায়নি",
      search: "অনুসন্ধান করুন…"
    },
    slideover: {
      close: "বন্ধ করুন"
    },
    table: {
      noData: "কোন তথ্য নেই"
    },
    toast: {
      close: "বন্ধ করুন"
    }
  }
});
const ca = /* @__PURE__ */ defineLocale({
  name: "Català",
  code: "ca",
  messages: {
    alert: {
      close: "Tancar"
    },
    authForm: {
      hidePassword: "Amagar contrasenya",
      showPassword: "Mostrar contrasenya",
      submit: "Continuar"
    },
    banner: {
      close: "Tancar"
    },
    calendar: {
      nextMonth: "Mes següent",
      nextYear: "Any següent",
      prevMonth: "Mes anterior",
      prevYear: "Any anterior"
    },
    carousel: {
      dots: "Tria la diapositiva a mostrar",
      goto: "Anar a la diapositiva {slide}",
      next: "Següent",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Escriu el teu missatge aquí…"
    },
    chatPromptSubmit: {
      label: "Enviar"
    },
    colorMode: {
      dark: "Fosc",
      light: "Clar",
      switchToDark: "Canviar a mode fosc",
      switchToLight: "Canviar a mode clar",
      system: "Sistema"
    },
    commandPalette: {
      back: "Enrere",
      close: "Tancar",
      noData: "Sense dades",
      noMatch: "No hi ha dades coincidents",
      placeholder: "Escriu una ordre o cerca…"
    },
    contentSearch: {
      links: "Enllaços",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Cercar…"
    },
    contentToc: {
      title: "En aquesta pàgina"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Cercar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Contraure barra lateral",
      expand: "Expandir barra lateral"
    },
    dashboardSidebarToggle: {
      close: "Tancar barra lateral",
      open: "Obrir barra lateral"
    },
    error: {
      clear: "Tornar a l'inici"
    },
    fileUpload: {
      removeFile: "Eliminar {filename}"
    },
    header: {
      close: "Tancar menú",
      open: "Obrir menú"
    },
    inputMenu: {
      create: 'Crear "{label}"',
      noData: "Sense dades",
      noMatch: "No hi ha dades coincidents"
    },
    inputNumber: {
      decrement: "Decrementar",
      increment: "Incrementar"
    },
    modal: {
      close: "Tancar"
    },
    pricingTable: {
      caption: "Comparació de plans de preu"
    },
    prose: {
      codeCollapse: {
        closeText: "Replega",
        name: "codi",
        openText: "Desplega"
      },
      collapsible: {
        closeText: "Amaga",
        name: "propietats",
        openText: "Mostra"
      },
      pre: {
        copy: "Copiar codi al portapapers"
      }
    },
    selectMenu: {
      create: 'Crear "{label}"',
      noData: "Sense dades",
      noMatch: "No hi ha dades coincidents",
      search: "Cerca…"
    },
    slideover: {
      close: "Tancar"
    },
    table: {
      noData: "Sense dades"
    },
    toast: {
      close: "Tancar"
    }
  }
});
const ckb = /* @__PURE__ */ defineLocale({
  name: "کوردی",
  code: "ckb",
  dir: "rtl",
  messages: {
    alert: {
      close: "داخستن"
    },
    authForm: {
      hidePassword: "شاردنەوەی تێپەڕەوشە",
      showPassword: "پیشاندانی تێپەڕەوشە",
      submit: "بەردەوام بە"
    },
    banner: {
      close: "داخستن"
    },
    calendar: {
      nextMonth: "مانگی داهاتوو",
      nextYear: "ساڵی داهاتوو",
      prevMonth: "مانگی پێشوو",
      prevYear: "ساڵی پێشوو"
    },
    carousel: {
      dots: "سلایدێک هەڵبژێرە بۆ پیشاندان",
      goto: "بڕۆ بۆ سلایدی {slide}",
      next: "دواتر",
      prev: "پێشتر"
    },
    chatPrompt: {
      placeholder: "نامەکەت لێرە بنوسە..."
    },
    chatPromptSubmit: {
      label: "ناردن"
    },
    colorMode: {
      dark: "تاریک",
      light: "ڕووناک",
      switchToDark: "گۆڕین بۆ دۆخی تاریک",
      switchToLight: "گۆڕین بۆ دۆخی ڕووناک",
      system: "سیستەم"
    },
    commandPalette: {
      back: "گەڕانەوە",
      close: "داخستن",
      noData: "هیچ داتایەک نییە",
      noMatch: "هیچ ئەنجامێک نەدۆزرایەوە",
      placeholder: "فەرمانێک بنووسە یان بگەڕێ…"
    },
    contentSearch: {
      links: "بەستەرەکان",
      theme: "ڕووکار"
    },
    contentSearchButton: {
      label: "گەڕان…"
    },
    contentToc: {
      title: "لەم پەڕەیەدا"
    },
    dashboardSearch: {
      theme: "ڕووکار"
    },
    dashboardSearchButton: {
      label: "گەڕان…"
    },
    dashboardSidebarCollapse: {
      collapse: "داخستنی لای تەنیشت",
      expand: "فراوانکردنی لای تەنیشت"
    },
    dashboardSidebarToggle: {
      close: "داخستنی لاتەنیشت",
      open: "کردنەوەی لاتەنیشت"
    },
    error: {
      clear: "گەڕانەوە بۆ سەرەتا"
    },
    fileUpload: {
      removeFile: "{filename} بسڕەوە"
    },
    header: {
      close: "داخستنی پێڕست",
      open: "کردنەوەی پێڕست"
    },
    inputMenu: {
      create: '"{label}" زیادکردنی',
      noData: "هیچ داتایەک نییە",
      noMatch: "هیچ ئەنجامێک نەدۆزرایەوە"
    },
    inputNumber: {
      decrement: "کەمکردنەوە",
      increment: "زیادکردن"
    },
    modal: {
      close: "داخستن"
    },
    pricingTable: {
      caption: "بەراورکردنی پلانی نرخدانان"
    },
    prose: {
      codeCollapse: {
        closeText: "داخستن",
        name: "کۆد",
        openText: "فراوانکردن"
      },
      collapsible: {
        closeText: "شاردنەوە",
        name: "تایبەتمەندییەکان",
        openText: "پیشاندان"
      },
      pre: {
        copy: "لەبەرگرتنەوەی کۆد"
      }
    },
    selectMenu: {
      create: '"{label}" زیادکردنی',
      noData: "هیچ داتایەک نییە",
      noMatch: "هیچ ئەنجامێک نەدۆزرایەوە",
      search: "گەڕان…"
    },
    slideover: {
      close: "داخستن"
    },
    table: {
      noData: "هیچ داتایەک نییە"
    },
    toast: {
      close: "داخستن"
    }
  }
});
const cs = /* @__PURE__ */ defineLocale({
  name: "Čeština",
  code: "cs",
  messages: {
    alert: {
      close: "Zavřít"
    },
    authForm: {
      hidePassword: "Skrýt heslo",
      showPassword: "Zobrazit heslo",
      submit: "Pokračovat"
    },
    banner: {
      close: "Zavřít"
    },
    calendar: {
      nextMonth: "Další měsíc",
      nextYear: "Další rok",
      prevMonth: "Předchozí měsíc",
      prevYear: "Předchozí rok"
    },
    carousel: {
      dots: "Vyberte snímek k zobrazení",
      goto: "Přejít na {slide}",
      next: "Další",
      prev: "Předchozí"
    },
    chatPrompt: {
      placeholder: "Zde napište svůj text…"
    },
    chatPromptSubmit: {
      label: "Odeslat"
    },
    colorMode: {
      dark: "Tmavý",
      light: "Světlý",
      switchToDark: "Přepnout na tmavý režim",
      switchToLight: "Přepnout na světlý režim",
      system: "Systémový"
    },
    commandPalette: {
      back: "Zpět",
      close: "Zavřít",
      noData: "Žádná data",
      noMatch: "Žádná shoda",
      placeholder: "Zadejte příkaz nebo hledejte…"
    },
    contentSearch: {
      links: "Odkazy",
      theme: "Téma"
    },
    contentSearchButton: {
      label: "Hledat…"
    },
    contentToc: {
      title: "Na této stránce"
    },
    dashboardSearch: {
      theme: "Téma"
    },
    dashboardSearchButton: {
      label: "Hledat…"
    },
    dashboardSidebarCollapse: {
      collapse: "Sbalit postranní panel",
      expand: "Rozbalit postranní panel"
    },
    dashboardSidebarToggle: {
      close: "Zavřít postranní panel",
      open: "Otevřít postranní panel"
    },
    error: {
      clear: "Zpět na úvod"
    },
    fileUpload: {
      removeFile: "Odebrat {filename}"
    },
    header: {
      close: "Zavřít menu",
      open: "Otevřít menu"
    },
    inputMenu: {
      create: 'Vytvořit "{label}"',
      noData: "Žádná data",
      noMatch: "Žádná shoda"
    },
    inputNumber: {
      decrement: "Snížit",
      increment: "Zvýšit"
    },
    modal: {
      close: "Zavřít"
    },
    pricingTable: {
      caption: "Porovnání cenových plánů"
    },
    prose: {
      codeCollapse: {
        closeText: "Sbalit",
        name: "kód",
        openText: "Rozbalit"
      },
      collapsible: {
        closeText: "Skrýt",
        name: "vlastnosti",
        openText: "Zobrazit"
      },
      pre: {
        copy: "Kopírovat kód do schránky"
      }
    },
    selectMenu: {
      create: 'Vytvořit "{label}"',
      noData: "Žádná data",
      noMatch: "Žádná shoda",
      search: "Hledat…"
    },
    slideover: {
      close: "Zavřít"
    },
    table: {
      noData: "Žádná data"
    },
    toast: {
      close: "Zavřít"
    }
  }
});
const da = /* @__PURE__ */ defineLocale({
  name: "Danish",
  code: "da",
  messages: {
    alert: {
      close: "Luk"
    },
    authForm: {
      hidePassword: "Skjul adgangskode",
      showPassword: "Vis adgangskode",
      submit: "Fortsæt"
    },
    banner: {
      close: "Luk"
    },
    calendar: {
      nextMonth: "Næste måned",
      nextYear: "Næste år",
      prevMonth: "Forrige måned",
      prevYear: "Forrige år"
    },
    carousel: {
      dots: "Vælg dias til visning",
      goto: "Gå til slide {slide}",
      next: "Næste",
      prev: "Forrige"
    },
    chatPrompt: {
      placeholder: "Skriv din besked her…"
    },
    chatPromptSubmit: {
      label: "Send"
    },
    colorMode: {
      dark: "Mørk",
      light: "Lys",
      switchToDark: "Skift til mørk tilstand",
      switchToLight: "Skift til lys tilstand",
      system: "System"
    },
    commandPalette: {
      back: "Tilbage",
      close: "Luk",
      noData: "Ingen data",
      noMatch: "Ingen matchende data",
      placeholder: "Skriv en kommando eller søg…"
    },
    contentSearch: {
      links: "Links",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Søg…"
    },
    contentToc: {
      title: "På denne side"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Søg…"
    },
    dashboardSidebarCollapse: {
      collapse: "Sammenfold sidemenu",
      expand: "Udvid sidemenu"
    },
    dashboardSidebarToggle: {
      close: "Luk sidemenu",
      open: "Åbn sidemenu"
    },
    error: {
      clear: "Tilbage til forsiden"
    },
    fileUpload: {
      removeFile: "Fjern {filename}"
    },
    header: {
      close: "Luk menu",
      open: "Åbn menu"
    },
    inputMenu: {
      create: 'Opret "{label}"',
      noData: "Ingen data",
      noMatch: "Ingen matchende data"
    },
    inputNumber: {
      decrement: "Reducer",
      increment: "Øg"
    },
    modal: {
      close: "Luk"
    },
    pricingTable: {
      caption: "Prisplaneringssammenligning"
    },
    prose: {
      codeCollapse: {
        closeText: "Sammenfold",
        name: "kode",
        openText: "Udvid"
      },
      collapsible: {
        closeText: "Skjul",
        name: "egenskaber",
        openText: "Vis"
      },
      pre: {
        copy: "Kopiér kode til udklipsholder"
      }
    },
    selectMenu: {
      create: 'Opret "{label}"',
      noData: "Ingen data",
      noMatch: "Ingen matchende data",
      search: "Søg…"
    },
    slideover: {
      close: "Luk"
    },
    table: {
      noData: "Ingen data"
    },
    toast: {
      close: "Luk"
    }
  }
});
const de = /* @__PURE__ */ defineLocale({
  name: "Deutsch",
  code: "de",
  messages: {
    alert: {
      close: "Schließen"
    },
    authForm: {
      hidePassword: "Passwort verbergen",
      showPassword: "Passwort anzeigen",
      submit: "Weiter"
    },
    banner: {
      close: "Schließen"
    },
    calendar: {
      nextMonth: "Nächster Monat",
      nextYear: "Nächstes Jahr",
      prevMonth: "Vorheriger Monat",
      prevYear: "Vorheriges Jahr"
    },
    carousel: {
      dots: "Folie zur Anzeige auswählen",
      goto: "Gehe zu {slide}",
      next: "Weiter",
      prev: "Zurück"
    },
    chatPrompt: {
      placeholder: "Hier schreiben Sie Ihre Nachricht…"
    },
    chatPromptSubmit: {
      label: "Senden"
    },
    colorMode: {
      dark: "Dunkel",
      light: "Hell",
      switchToDark: "Zum dunklen Modus wechseln",
      switchToLight: "Zum hellen Modus wechseln",
      system: "System"
    },
    commandPalette: {
      back: "Zurück",
      close: "Schließen",
      noData: "Keine Daten",
      noMatch: "Nichts gefunden",
      placeholder: "Geben Sie einen Befehl ein oder suchen Sie…"
    },
    contentSearch: {
      links: "Links",
      theme: "Thema"
    },
    contentSearchButton: {
      label: "Suchen…"
    },
    contentToc: {
      title: "Auf dieser Seite"
    },
    dashboardSearch: {
      theme: "Thema"
    },
    dashboardSearchButton: {
      label: "Suchen…"
    },
    dashboardSidebarCollapse: {
      collapse: "Seitenleiste einklappen",
      expand: "Seitenleiste erweitern"
    },
    dashboardSidebarToggle: {
      close: "Seitenleiste schließen",
      open: "Seitenleiste öffnen"
    },
    error: {
      clear: "Zurück zur Startseite"
    },
    fileUpload: {
      removeFile: "{filename} entfernen"
    },
    header: {
      close: "Menü schließen",
      open: "Menü öffnen"
    },
    inputMenu: {
      create: '"{label}" erstellen',
      noData: "Keine Daten",
      noMatch: "Nichts gefunden"
    },
    inputNumber: {
      decrement: "Verringern",
      increment: "Erhöhen"
    },
    modal: {
      close: "Schließen"
    },
    pricingTable: {
      caption: "Preisplanvergleich"
    },
    prose: {
      codeCollapse: {
        closeText: "Reduzieren",
        name: "Code",
        openText: "Erweitern"
      },
      collapsible: {
        closeText: "Ausblenden",
        name: "Eigenschaften",
        openText: "Anzeigen"
      },
      pre: {
        copy: "Code in die Zwischenablage kopieren"
      }
    },
    selectMenu: {
      create: '"{label}" erstellen',
      noData: "Keine Daten",
      noMatch: "Nichts gefunden",
      search: "Suchen…"
    },
    slideover: {
      close: "Schließen"
    },
    table: {
      noData: "Keine Daten"
    },
    toast: {
      close: "Schließen"
    }
  }
});
const de_ch = /* @__PURE__ */ defineLocale({
  name: "Schweizerdeutsch",
  code: "de-CH",
  messages: {
    alert: {
      close: "Schliessen"
    },
    authForm: {
      hidePassword: "Passwort verbergen",
      showPassword: "Passwort anzeigen",
      submit: "Weiter"
    },
    banner: {
      close: "Schliessen"
    },
    calendar: {
      nextMonth: "Nächster Monat",
      nextYear: "Nächstes Jahr",
      prevMonth: "Vorheriger Monat",
      prevYear: "Vorheriges Jahr"
    },
    carousel: {
      dots: "Folie zur Anzeige auswählen",
      goto: "Gehe zu {slide}",
      next: "Weiter",
      prev: "Zurück"
    },
    chatPrompt: {
      placeholder: "Hier schreiben Sie Ihre Nachricht…"
    },
    chatPromptSubmit: {
      label: "Senden"
    },
    colorMode: {
      dark: "Dunkel",
      light: "Hell",
      switchToDark: "Zum dunklen Modus wechseln",
      switchToLight: "Zum hellen Modus wechseln",
      system: "System"
    },
    commandPalette: {
      back: "Zurück",
      close: "Schliessen",
      noData: "Keine Daten",
      noMatch: "Nichts gefunden",
      placeholder: "Geben Sie einen Befehl ein oder suchen Sie…"
    },
    contentSearch: {
      links: "Links",
      theme: "Thema"
    },
    contentSearchButton: {
      label: "Suchen…"
    },
    contentToc: {
      title: "Auf dieser Seite"
    },
    dashboardSearch: {
      theme: "Thema"
    },
    dashboardSearchButton: {
      label: "Suchen…"
    },
    dashboardSidebarCollapse: {
      collapse: "Seitenleiste einklappen",
      expand: "Seitenleiste erweitern"
    },
    dashboardSidebarToggle: {
      close: "Seitenleiste schliessen",
      open: "Seitenleiste öffnen"
    },
    error: {
      clear: "Zurück zur Startseite"
    },
    fileUpload: {
      removeFile: "{filename} entfernen"
    },
    header: {
      close: "Menü schliessen",
      open: "Menü öffnen"
    },
    inputMenu: {
      create: '"{label}" erstellen',
      noData: "Keine Daten",
      noMatch: "Nichts gefunden"
    },
    inputNumber: {
      decrement: "Verringern",
      increment: "Erhöhen"
    },
    modal: {
      close: "Schliessen"
    },
    pricingTable: {
      caption: "Preisplanvergleich"
    },
    prose: {
      codeCollapse: {
        closeText: "Reduzieren",
        name: "Code",
        openText: "Erweitern"
      },
      collapsible: {
        closeText: "Ausblenden",
        name: "Eigenschaften",
        openText: "Anzeigen"
      },
      pre: {
        copy: "Code in die Zwischenablage kopieren"
      }
    },
    selectMenu: {
      create: '"{label}" erstellen',
      noData: "Keine Daten",
      noMatch: "Nichts gefunden",
      search: "Suchen…"
    },
    slideover: {
      close: "Schliessen"
    },
    table: {
      noData: "Keine Daten"
    },
    toast: {
      close: "Schliessen"
    }
  }
});
const el = /* @__PURE__ */ defineLocale({
  name: "Ελληνικά",
  code: "el",
  messages: {
    alert: {
      close: "Κλείσιμο"
    },
    authForm: {
      hidePassword: "Απόκρυψη κωδικού",
      showPassword: "Εμφάνιση κωδικού",
      submit: "Συνέχεια"
    },
    banner: {
      close: "Κλείσιμο"
    },
    calendar: {
      nextMonth: "Επόμενος μήνας",
      nextYear: "Επόμενο έτος",
      prevMonth: "Προηγούμενος μήνας",
      prevYear: "Προηγούμενο έτος"
    },
    carousel: {
      dots: "Επιλέξτε διαφάνεια για εμφάνιση",
      goto: "Μετάβαση στη διαφάνεια {slide}",
      next: "Επόμενο",
      prev: "Προηγούμενο"
    },
    chatPrompt: {
      placeholder: "Εδώ γράψτε το μήνυμά σας…"
    },
    chatPromptSubmit: {
      label: "Αποστολή"
    },
    colorMode: {
      dark: "Σκοτεινό",
      light: "Φωτεινό",
      switchToDark: "Αλλαγή σε σκοτεινή λειτουργία",
      switchToLight: "Αλλαγή σε φωτεινή λειτουργία",
      system: "Σύστημα"
    },
    commandPalette: {
      back: "Πίσω",
      close: "Κλείσιμο",
      noData: "Δεν υπάρχουν δεδομένα",
      noMatch: "Δεν βρέθηκαν δεδομένα",
      placeholder: "Πληκτρολογήστε μια εντολή ή αναζητήστε…"
    },
    contentSearch: {
      links: "Σύνδεσμοι",
      theme: "Θέμα"
    },
    contentSearchButton: {
      label: "Αναζήτηση…"
    },
    contentToc: {
      title: "Σε αυτή τη σελίδα"
    },
    dashboardSearch: {
      theme: "Θέμα"
    },
    dashboardSearchButton: {
      label: "Αναζήτηση…"
    },
    dashboardSidebarCollapse: {
      collapse: "Σύμπτυξη πλευρικής μπάρας",
      expand: "Επέκταση πλευρικής μπάρας"
    },
    dashboardSidebarToggle: {
      close: "Κλείσιμο πλευρικής μπάρας",
      open: "Άνοιγμα πλευρικής μπάρας"
    },
    error: {
      clear: "Επιστροφή στην αρχική"
    },
    fileUpload: {
      removeFile: "Αφαίρεση {filename}"
    },
    header: {
      close: "Κλείσιμο μενού",
      open: "Άνοιγμα μενού"
    },
    inputMenu: {
      create: 'Δημιουργία "{label}"',
      noData: "Δεν υπάρχουν δεδομένα",
      noMatch: "Δεν βρέθηκαν δεδομένα"
    },
    inputNumber: {
      decrement: "Μείωση",
      increment: "Αύξηση"
    },
    modal: {
      close: "Κλείσιμο"
    },
    pricingTable: {
      caption: "Σύγκριση προγραμμάτων τιμολόγησης"
    },
    prose: {
      codeCollapse: {
        closeText: "Σύμπτυξη",
        name: "κώδικας",
        openText: "Επέκταση"
      },
      collapsible: {
        closeText: "Απόκρυψη",
        name: "ιδιότητες",
        openText: "Εμφάνιση"
      },
      pre: {
        copy: "Αντιγραφή κώδικα στο πρόχειρο"
      }
    },
    selectMenu: {
      create: 'Δημιουργία "{label}"',
      noData: "Δεν υπάρχουν δεδομένα",
      noMatch: "Δεν βρέθηκαν δεδομένα",
      search: "Αναζήτηση…"
    },
    slideover: {
      close: "Κλείσιμο"
    },
    table: {
      noData: "Δεν υπάρχουν δεδομένα"
    },
    toast: {
      close: "Κλείσιμο"
    }
  }
});
const es = /* @__PURE__ */ defineLocale({
  name: "Español",
  code: "es",
  messages: {
    alert: {
      close: "Cerrar"
    },
    authForm: {
      hidePassword: "Ocultar contraseña",
      showPassword: "Mostrar contraseña",
      submit: "Continuar"
    },
    banner: {
      close: "Cerrar"
    },
    calendar: {
      nextMonth: "Mes siguiente",
      nextYear: "Año siguiente",
      prevMonth: "Mes anterior",
      prevYear: "Año anterior"
    },
    carousel: {
      dots: "Elegir diapositiva a mostrar",
      goto: "Ir a la diapositiva {slide}",
      next: "Siguiente",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Escribe tu mensaje aquí…"
    },
    chatPromptSubmit: {
      label: "Enviar"
    },
    colorMode: {
      dark: "Oscuro",
      light: "Claro",
      switchToDark: "Cambiar a modo oscuro",
      switchToLight: "Cambiar a modo claro",
      system: "Sistema"
    },
    commandPalette: {
      back: "Atrás",
      close: "Cerrar",
      noData: "Sin datos",
      noMatch: "No hay datos coincidentes",
      placeholder: "Escribe un comando o busca…"
    },
    contentSearch: {
      links: "Enlaces",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Buscar…"
    },
    contentToc: {
      title: "En esta página"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Buscar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Colapsar barra lateral",
      expand: "Expandir barra lateral"
    },
    dashboardSidebarToggle: {
      close: "Cerrar barra lateral",
      open: "Abrir barra lateral"
    },
    error: {
      clear: "Volver al inicio"
    },
    fileUpload: {
      removeFile: "Eliminar {filename}"
    },
    header: {
      close: "Cerrar menú",
      open: "Abrir menú"
    },
    inputMenu: {
      create: 'Crear "{label}"',
      noData: "Sin datos",
      noMatch: "No hay datos coincidentes"
    },
    inputNumber: {
      decrement: "Decrementar",
      increment: "Incrementar"
    },
    modal: {
      close: "Cerrar"
    },
    pricingTable: {
      caption: "Comparación de planes de precios"
    },
    prose: {
      codeCollapse: {
        closeText: "Colapsar",
        name: "código",
        openText: "Expandir"
      },
      collapsible: {
        closeText: "Ocultar",
        name: "propiedades",
        openText: "Mostrar"
      },
      pre: {
        copy: "Copiar código al portapapeles"
      }
    },
    selectMenu: {
      create: 'Crear "{label}"',
      noData: "Sin datos",
      noMatch: "No hay datos coincidentes",
      search: "Buscar…"
    },
    slideover: {
      close: "Cerrar"
    },
    table: {
      noData: "Sin datos"
    },
    toast: {
      close: "Cerrar"
    }
  }
});
const et = /* @__PURE__ */ defineLocale({
  name: "Eesti",
  code: "et",
  messages: {
    alert: {
      close: "Sulge"
    },
    authForm: {
      hidePassword: "Peida parool",
      showPassword: "Näita parooli",
      submit: "Jätka"
    },
    banner: {
      close: "Sulge"
    },
    calendar: {
      nextMonth: "Järgmine kuu",
      nextYear: "Järgmine aasta",
      prevMonth: "Eelmine kuu",
      prevYear: "Eelmine aasta"
    },
    carousel: {
      dots: "Valige kuvatav slaid",
      goto: "Mine slaidile {slide}",
      next: "Järg",
      prev: "Eel"
    },
    chatPrompt: {
      placeholder: "Siia kirjutage oma sõnum…"
    },
    chatPromptSubmit: {
      label: "Saada"
    },
    colorMode: {
      dark: "Tume",
      light: "Hele",
      switchToDark: "Lülitu tumedasse režiimi",
      switchToLight: "Lülitu heledasse režiimi",
      system: "Süsteem"
    },
    commandPalette: {
      back: "Tagasi",
      close: "Sulge",
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid",
      placeholder: "Sisesta käsk või otsi…"
    },
    contentSearch: {
      links: "Lingid",
      theme: "Teema"
    },
    contentSearchButton: {
      label: "Otsi…"
    },
    contentToc: {
      title: "Sellel lehel"
    },
    dashboardSearch: {
      theme: "Teema"
    },
    dashboardSearchButton: {
      label: "Otsi…"
    },
    dashboardSidebarCollapse: {
      collapse: "Ahenda külgriba",
      expand: "Laienda külgriba"
    },
    dashboardSidebarToggle: {
      close: "Sulge külgriba",
      open: "Ava külgriba"
    },
    error: {
      clear: "Tagasi avalehele"
    },
    fileUpload: {
      removeFile: "Eemalda {filename}"
    },
    header: {
      close: "Sulge menüü",
      open: "Ava menüü"
    },
    inputMenu: {
      create: 'Loo "{label}"',
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid"
    },
    inputNumber: {
      decrement: "Vähenda",
      increment: "Suurenda"
    },
    modal: {
      close: "Sulge"
    },
    pricingTable: {
      caption: "Hinna plaanide võrdlus"
    },
    prose: {
      codeCollapse: {
        closeText: "Ahenda",
        name: "kood",
        openText: "Laienda"
      },
      collapsible: {
        closeText: "Peida",
        name: "omadused",
        openText: "Näita"
      },
      pre: {
        copy: "Kopeeri kood lõikelauale"
      }
    },
    selectMenu: {
      create: 'Loo "{label}"',
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid",
      search: "Otsi…"
    },
    slideover: {
      close: "Sulge"
    },
    table: {
      noData: "Pole andmeid"
    },
    toast: {
      close: "Sulge"
    }
  }
});
const fa_ir = /* @__PURE__ */ defineLocale({
  name: "فارسی",
  code: "fa-IR",
  dir: "rtl",
  messages: {
    alert: {
      close: "بستن"
    },
    authForm: {
      hidePassword: "پنهان کردن رمز عبور",
      showPassword: "نمایش رمز عبور",
      submit: "ادامه"
    },
    banner: {
      close: "بستن"
    },
    calendar: {
      nextMonth: "ماه آینده",
      nextYear: "سال آینده",
      prevMonth: "ماه گذشته",
      prevYear: "سال گذشته"
    },
    carousel: {
      dots: "اسلاید مورد نظر برای نمایش را انتخاب کنید",
      goto: "رفتن به اسلاید {slide}",
      next: "بعدی",
      prev: "قبلی"
    },
    chatPrompt: {
      placeholder: "اینجا پیام خود را بنویسید…"
    },
    chatPromptSubmit: {
      label: "ارسال"
    },
    colorMode: {
      dark: "تیره",
      light: "روشن",
      switchToDark: "تغییر به حالت تیره",
      switchToLight: "تغییر به حالت روشن",
      system: "سیستم"
    },
    commandPalette: {
      back: "بازگشت",
      close: "بستن",
      noData: "داده‌ای موجود نیست",
      noMatch: "داده‌ای یافت نشد",
      placeholder: "یک دستور وارد کنید یا جستجو کنید…"
    },
    contentSearch: {
      links: "پیوندها",
      theme: "تم"
    },
    contentSearchButton: {
      label: "جستجو…"
    },
    contentToc: {
      title: "در این صفحه"
    },
    dashboardSearch: {
      theme: "تم"
    },
    dashboardSearchButton: {
      label: "جستجو…"
    },
    dashboardSidebarCollapse: {
      collapse: "جمع کردن نوار کناری",
      expand: "گسترش نوار کناری"
    },
    dashboardSidebarToggle: {
      close: "بستن نوار کناری",
      open: "باز کردن نوار کناری"
    },
    error: {
      clear: "بازگشت به صفحه اصلی"
    },
    fileUpload: {
      removeFile: "حذف {filename}"
    },
    header: {
      close: "بستن منو",
      open: "باز کردن منو"
    },
    inputMenu: {
      create: 'ایجاد "{label}"',
      noData: "داده‌ای موجود نیست",
      noMatch: "داده‌ای یافت نشد"
    },
    inputNumber: {
      decrement: "کاهش",
      increment: "افزایش"
    },
    modal: {
      close: "بستن"
    },
    pricingTable: {
      caption: "مقایسه طرح قیمت"
    },
    prose: {
      codeCollapse: {
        closeText: "جمع کردن",
        name: "کد",
        openText: "گسترش"
      },
      collapsible: {
        closeText: "پنهان",
        name: "ویژگی‌ها",
        openText: "نمایش"
      },
      pre: {
        copy: "کپی کد در کلیپ‌بورد"
      }
    },
    selectMenu: {
      create: 'ایجاد "{label}"',
      noData: "داده‌ای موجود نیست",
      noMatch: "داده‌ای یافت نشد",
      search: "جستجو…"
    },
    slideover: {
      close: "بستن"
    },
    table: {
      noData: "داده‌ای موجود نیست"
    },
    toast: {
      close: "بستن"
    }
  }
});
const fi = /* @__PURE__ */ defineLocale({
  name: "Suomeksi",
  code: "fi",
  messages: {
    alert: {
      close: "Sulje"
    },
    authForm: {
      hidePassword: "Piilota salasana",
      showPassword: "Näytä salasana",
      submit: "Jatka"
    },
    banner: {
      close: "Sulje"
    },
    calendar: {
      nextMonth: "Seuraava kuukausi",
      nextYear: "Seuraava vuosi",
      prevMonth: "Edellinen kuukausi",
      prevYear: "Edellinen vuosi"
    },
    carousel: {
      dots: "Valitse näytettävä dia",
      goto: "Siirry sivulle {slide}",
      next: "Seuraava",
      prev: "Edellinen"
    },
    chatPrompt: {
      placeholder: "Kirjoita viestisi tähän…"
    },
    chatPromptSubmit: {
      label: "Lähetä"
    },
    colorMode: {
      dark: "Tumma",
      light: "Vaalea",
      switchToDark: "Vaihda tummaan tilaan",
      switchToLight: "Vaihda vaaleaan tilaan",
      system: "Järjestelmä"
    },
    commandPalette: {
      back: "Takaisin",
      close: "Sulje",
      noData: "Ei tietoja",
      noMatch: "Ei vastaavia tietoja",
      placeholder: "Kirjoita komento tai hae…"
    },
    contentSearch: {
      links: "Linkit",
      theme: "Teema"
    },
    contentSearchButton: {
      label: "Hae…"
    },
    contentToc: {
      title: "Tällä sivulla"
    },
    dashboardSearch: {
      theme: "Teema"
    },
    dashboardSearchButton: {
      label: "Hae…"
    },
    dashboardSidebarCollapse: {
      collapse: "Supista sivupalkki",
      expand: "Laajenna sivupalkki"
    },
    dashboardSidebarToggle: {
      close: "Sulje sivupalkki",
      open: "Avaa sivupalkki"
    },
    error: {
      clear: "Takaisin etusivulle"
    },
    fileUpload: {
      removeFile: "Poista {filename}"
    },
    header: {
      close: "Sulje valikko",
      open: "Avaa valikko"
    },
    inputMenu: {
      create: 'Luo "{label}"',
      noData: "Ei tietoja",
      noMatch: "Ei vastaavia tietoja"
    },
    inputNumber: {
      decrement: "Vähennä",
      increment: "Kasvata"
    },
    modal: {
      close: "Sulje"
    },
    pricingTable: {
      caption: "Hinnoitellut suunnitelmat"
    },
    prose: {
      codeCollapse: {
        closeText: "Supista",
        name: "koodi",
        openText: "Laajenna"
      },
      collapsible: {
        closeText: "Piilota",
        name: "ominaisuudet",
        openText: "Näytä"
      },
      pre: {
        copy: "Kopioi koodi leikepöydälle"
      }
    },
    selectMenu: {
      create: 'Luo "{label}"',
      noData: "Ei tietoja",
      noMatch: "Ei vastaavia tietoja",
      search: "Hae…"
    },
    slideover: {
      close: "Sulje"
    },
    table: {
      noData: "Ei tietoja"
    },
    toast: {
      close: "Sulje"
    }
  }
});
const fr = /* @__PURE__ */ defineLocale({
  name: "Français",
  code: "fr",
  messages: {
    alert: {
      close: "Fermer"
    },
    authForm: {
      hidePassword: "Masquer le mot de passe",
      showPassword: "Afficher le mot de passe",
      submit: "Continuer"
    },
    banner: {
      close: "Fermer"
    },
    calendar: {
      nextMonth: "Mois suivant",
      nextYear: "Année suivante",
      prevMonth: "Mois précédent",
      prevYear: "Année précédente"
    },
    carousel: {
      dots: "Choisir la diapositive à afficher",
      goto: "Aller à {slide}",
      next: "Suivant",
      prev: "Précédent"
    },
    chatPrompt: {
      placeholder: "Écrivez votre message ici…"
    },
    chatPromptSubmit: {
      label: "Envoyer"
    },
    colorMode: {
      dark: "Sombre",
      light: "Clair",
      switchToDark: "Passer en mode sombre",
      switchToLight: "Passer en mode clair",
      system: "Système"
    },
    commandPalette: {
      back: "Retour",
      close: "Fermer",
      noData: "Aucune donnée",
      noMatch: "Aucune donnée correspondante",
      placeholder: "Tapez une commande ou recherchez…"
    },
    contentSearch: {
      links: "Liens",
      theme: "Thème"
    },
    contentSearchButton: {
      label: "Rechercher…"
    },
    contentToc: {
      title: "Sur cette page"
    },
    dashboardSearch: {
      theme: "Thème"
    },
    dashboardSearchButton: {
      label: "Rechercher…"
    },
    dashboardSidebarCollapse: {
      collapse: "Replier la barre latérale",
      expand: "Déployer la barre latérale"
    },
    dashboardSidebarToggle: {
      close: "Fermer la barre latérale",
      open: "Ouvrir la barre latérale"
    },
    error: {
      clear: "Retour à l'accueil"
    },
    fileUpload: {
      removeFile: "Supprimer {filename}"
    },
    header: {
      close: "Fermer le menu",
      open: "Ouvrir le menu"
    },
    inputMenu: {
      create: 'Créer "{label}"',
      noData: "Aucune donnée",
      noMatch: "Aucune donnée correspondante"
    },
    inputNumber: {
      decrement: "Diminuer",
      increment: "Augmenter"
    },
    modal: {
      close: "Fermer"
    },
    pricingTable: {
      caption: "Comparaison des plans de prix"
    },
    prose: {
      codeCollapse: {
        closeText: "Réduire",
        name: "code",
        openText: "Développer"
      },
      collapsible: {
        closeText: "Masquer",
        name: "propriétés",
        openText: "Afficher"
      },
      pre: {
        copy: "Copier le code dans le presse-papiers"
      }
    },
    selectMenu: {
      create: 'Créer "{label}"',
      noData: "Aucune donnée",
      noMatch: "Aucune donnée correspondante",
      search: "Rechercher…"
    },
    slideover: {
      close: "Fermer"
    },
    table: {
      noData: "Aucune donnée"
    },
    toast: {
      close: "Fermer"
    }
  }
});
const gl = /* @__PURE__ */ defineLocale({
  name: "Galego",
  code: "gl",
  messages: {
    alert: {
      close: "Pechar"
    },
    authForm: {
      hidePassword: "Ocultar contrasinal",
      showPassword: "Amosar contrasinal",
      submit: "Continuar"
    },
    banner: {
      close: "Pechar"
    },
    calendar: {
      nextMonth: "Mes seguinte",
      nextYear: "Ano seguinte",
      prevMonth: "Mes anterior",
      prevYear: "Ano anterior"
    },
    carousel: {
      dots: "Escoller diapositiva a amostrar",
      goto: "Ir á diapositiva {slide}",
      next: "Seguinte",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Escribe a túa mensaxe aquí…"
    },
    chatPromptSubmit: {
      label: "Enviar"
    },
    colorMode: {
      dark: "Oscuro",
      light: "Claro",
      switchToDark: "Cambiar a modo oscuro",
      switchToLight: "Cambiar a modo claro",
      system: "Sistema"
    },
    commandPalette: {
      back: "Atrás",
      close: "Pechar",
      noData: "Sen datos",
      noMatch: "Non hai datos coincidentes",
      placeholder: "Escribe un comando ou busca…"
    },
    contentSearch: {
      links: "Ligazóns",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Buscar…"
    },
    contentToc: {
      title: "Nesta páxina"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Buscar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Contraer barra lateral",
      expand: "Despregar barra lateral"
    },
    dashboardSidebarToggle: {
      close: "Pechar barra lateral",
      open: "Abrir barra lateral"
    },
    error: {
      clear: "Volver ao inicio"
    },
    fileUpload: {
      removeFile: "Eliminar {filename}"
    },
    header: {
      close: "Pechar menú",
      open: "Abrir menú"
    },
    inputMenu: {
      create: 'Crear "{label}"',
      noData: "Sen datos",
      noMatch: "Non hai datos coincidentes"
    },
    inputNumber: {
      decrement: "Diminuír",
      increment: "Aumentar"
    },
    modal: {
      close: "Pechar"
    },
    pricingTable: {
      caption: "Comparación de plans de prezos"
    },
    prose: {
      codeCollapse: {
        closeText: "Contraer",
        name: "código",
        openText: "Despregar"
      },
      collapsible: {
        closeText: "Ocultar",
        name: "propiedades",
        openText: "Amosar"
      },
      pre: {
        copy: "Copiar código ao portapapeis"
      }
    },
    selectMenu: {
      create: 'Crear "{label}"',
      noData: "Sen datos",
      noMatch: "Non hai datos coincidentes",
      search: "Buscar…"
    },
    slideover: {
      close: "Pechar"
    },
    table: {
      noData: "Sen datos"
    },
    toast: {
      close: "Pechar"
    }
  }
});
const he = /* @__PURE__ */ defineLocale({
  name: "Hebrew",
  code: "he",
  dir: "rtl",
  messages: {
    alert: {
      close: "סגור"
    },
    authForm: {
      hidePassword: "הסתר סיסמה",
      showPassword: "הצג סיסמה",
      submit: "המשך"
    },
    banner: {
      close: "סגור"
    },
    calendar: {
      nextMonth: "חודש הבא",
      nextYear: "שנה הבאה",
      prevMonth: "חודש קודם",
      prevYear: "שנה קודמת"
    },
    carousel: {
      dots: "בחר שקופית להצגה",
      goto: "מעבר ל {slide}",
      next: "הבא",
      prev: "הקודם"
    },
    chatPrompt: {
      placeholder: "כתוב את ההודעה שלך כאן…"
    },
    chatPromptSubmit: {
      label: "שלח"
    },
    colorMode: {
      dark: "כהה",
      light: "בהיר",
      switchToDark: "עבור למצב כהה",
      switchToLight: "עבור למצב בהיר",
      system: "מערכת"
    },
    commandPalette: {
      back: "חזור",
      close: "סגור",
      noData: "אין נתונים זמינים",
      noMatch: "לא נמצאה התאמה",
      placeholder: "הקלד פקודה…"
    },
    contentSearch: {
      links: "קישורים",
      theme: "ערכת נושא"
    },
    contentSearchButton: {
      label: "חיפוש…"
    },
    contentToc: {
      title: "בדף זה"
    },
    dashboardSearch: {
      theme: "ערכת נושא"
    },
    dashboardSearchButton: {
      label: "חיפוש…"
    },
    dashboardSidebarCollapse: {
      collapse: "כווץ סרגל צד",
      expand: "הרחב סרגל צד"
    },
    dashboardSidebarToggle: {
      close: "סגור סרגל צד",
      open: "פתח סרגל צד"
    },
    error: {
      clear: "חזרה לדף הבית"
    },
    fileUpload: {
      removeFile: "הסר {filename}"
    },
    header: {
      close: "סגור תפריט",
      open: "פתח תפריט"
    },
    inputMenu: {
      create: 'צור "{label}"',
      noData: "אין נתונים",
      noMatch: "אין התאמה"
    },
    inputNumber: {
      decrement: "הפחת",
      increment: "הוסף"
    },
    modal: {
      close: "סגור"
    },
    pricingTable: {
      caption: "שיפור מחירון"
    },
    prose: {
      codeCollapse: {
        closeText: "כווץ",
        name: "קוד",
        openText: "הרחב"
      },
      collapsible: {
        closeText: "הסתר",
        name: "מאפיינים",
        openText: "הצג"
      },
      pre: {
        copy: "העתק קוד ללוח"
      }
    },
    selectMenu: {
      create: 'צור "{label}"',
      noData: "אין נתונים",
      noMatch: "לא נמצאה התאמה",
      search: "חפש…"
    },
    slideover: {
      close: "סגור"
    },
    table: {
      noData: "אין נתונים להצגה"
    },
    toast: {
      close: "סגור"
    }
  }
});
const hi = /* @__PURE__ */ defineLocale({
  name: "Hindi",
  code: "hi",
  messages: {
    alert: {
      close: "बंद करें"
    },
    authForm: {
      hidePassword: "पासवर्ड छिपाएं",
      showPassword: "पासवर्ड दिखाएं",
      submit: "जारी रखें"
    },
    banner: {
      close: "बंद करें"
    },
    calendar: {
      nextMonth: "अगला महीना",
      nextYear: "अगला वर्ष",
      prevMonth: "पिछला महीना",
      prevYear: "पिछला वर्ष"
    },
    carousel: {
      dots: "प्रदर्शित करने के लिए स्लाइड चुनें",
      goto: "स्लाइड {slide} पर जाएं",
      next: "अगला",
      prev: "पिछला"
    },
    chatPrompt: {
      placeholder: "यहाँ आपका संदेश लिखें…"
    },
    chatPromptSubmit: {
      label: "भेजें"
    },
    colorMode: {
      dark: "गहरा",
      light: "हल्का",
      switchToDark: "गहरे मोड में बदलें",
      switchToLight: "हल्के मोड में बदलें",
      system: "सिस्टम"
    },
    commandPalette: {
      back: "वापस",
      close: "बंद करें",
      noData: "कोई डेटा नहीं",
      noMatch: "कोई मेल खाता डेटा नहीं",
      placeholder: "एक आदेश या खोज टाइप करें…"
    },
    contentSearch: {
      links: "लिंक्स",
      theme: "थीम"
    },
    contentSearchButton: {
      label: "खोजें…"
    },
    contentToc: {
      title: "इस पृष्ठ पर"
    },
    dashboardSearch: {
      theme: "थीम"
    },
    dashboardSearchButton: {
      label: "खोजें…"
    },
    dashboardSidebarCollapse: {
      collapse: "साइडबार संकुचित करें",
      expand: "साइडबार विस्तारित करें"
    },
    dashboardSidebarToggle: {
      close: "साइडबार बंद करें",
      open: "साइडबार खोलें"
    },
    error: {
      clear: "होम पेज पर वापस जाएं"
    },
    fileUpload: {
      removeFile: "{filename} हटाएं"
    },
    header: {
      close: "मेनू बंद करें",
      open: "मेनू खोलें"
    },
    inputMenu: {
      create: '"{label}" बनाएँ',
      noData: "कोई डेटा नहीं",
      noMatch: "कोई मेल खाता डेटा नहीं"
    },
    inputNumber: {
      decrement: "घटाना",
      increment: "बढ़ाना"
    },
    modal: {
      close: "बंद करें"
    },
    pricingTable: {
      caption: "कीमत योजनाओं की तुलना"
    },
    prose: {
      codeCollapse: {
        closeText: "संकुचित करें",
        name: "कोड",
        openText: "विस्तार करें"
      },
      collapsible: {
        closeText: "छिपाएँ",
        name: "गुण",
        openText: "दिखाएँ"
      },
      pre: {
        copy: "कोड को क्लिपबोर्ड पर कॉपी करें"
      }
    },
    selectMenu: {
      create: '"{label}" बनाएँ',
      noData: "कोई डेटा नहीं",
      noMatch: "कोई मेल खाता डेटा नहीं",
      search: "खोजें…"
    },
    slideover: {
      close: "बंद करें"
    },
    table: {
      noData: "कोई डेटा नहीं"
    },
    toast: {
      close: "बंद करें"
    }
  }
});
const hr = /* @__PURE__ */ defineLocale({
  name: "Hrvatski",
  code: "hr",
  messages: {
    alert: {
      close: "Zatvori"
    },
    authForm: {
      hidePassword: "Sakrij lozinku",
      showPassword: "Prikaži lozinku",
      submit: "Nastavi"
    },
    banner: {
      close: "Zatvori"
    },
    calendar: {
      nextMonth: "Sljedeći mjesec",
      nextYear: "Sljedeća godina",
      prevMonth: "Prethodni mjesec",
      prevYear: "Prethodna godina"
    },
    carousel: {
      dots: "Odaberite slajd za prikaz",
      goto: "Idi na slajd {slide}",
      next: "Sljedeći",
      prev: "Prethodni"
    },
    chatPrompt: {
      placeholder: "Upišite svoju poruku ovdje…"
    },
    chatPromptSubmit: {
      label: "Pošalji upit"
    },
    colorMode: {
      dark: "Tamno",
      light: "Svijetlo",
      switchToDark: "Prebaci na tamni način rada",
      switchToLight: "Prebaci na svijetli način rada",
      system: "Sustav"
    },
    commandPalette: {
      back: "Natrag",
      close: "Zatvori",
      noData: "Nema podataka",
      noMatch: "Nema odgovarajućih podataka",
      placeholder: "Upišite naredbu ili pretraživanje…"
    },
    contentSearch: {
      links: "Poveznice",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Pretraživanje…"
    },
    contentToc: {
      title: "Na ovoj stranici"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Pretraživanje…"
    },
    dashboardSidebarCollapse: {
      collapse: "Smanji bočnu traku",
      expand: "Proširi bočnu traku"
    },
    dashboardSidebarToggle: {
      close: "Zatvori bočnu traku",
      open: "Otvori bočnu traku"
    },
    error: {
      clear: "Natrag na početnu"
    },
    fileUpload: {
      removeFile: "Ukloni {filename}"
    },
    header: {
      close: "Zatvori izbornik",
      open: "Otvori izbornik"
    },
    inputMenu: {
      create: 'Stvori "{label}"',
      noData: "Nema podataka",
      noMatch: "Nema odgovarajućih podataka"
    },
    inputNumber: {
      decrement: "Smanji",
      increment: "Povećaj"
    },
    modal: {
      close: "Zatvori"
    },
    pricingTable: {
      caption: "Usporedba cjenovnih planova"
    },
    prose: {
      codeCollapse: {
        closeText: "Smanji",
        name: "kod",
        openText: "Proširi"
      },
      collapsible: {
        closeText: "Sakrij",
        name: "svojstva",
        openText: "Prikaži"
      },
      pre: {
        copy: "Kopiraj kod u međuspremnik"
      }
    },
    selectMenu: {
      create: 'Stvori "{label}"',
      noData: "Nema podataka",
      noMatch: "Nema odgovarajućih podataka",
      search: "Pretraživanje…"
    },
    slideover: {
      close: "Zatvori"
    },
    table: {
      noData: "Nema podataka"
    },
    toast: {
      close: "Zatvori"
    }
  }
});
const hu = /* @__PURE__ */ defineLocale({
  name: "Magyar",
  code: "hu",
  messages: {
    alert: {
      close: "Bezárás"
    },
    authForm: {
      hidePassword: "Jelszó elrejtése",
      showPassword: "Jelszó megjelenítése",
      submit: "Folytatás"
    },
    banner: {
      close: "Bezárás"
    },
    calendar: {
      nextMonth: "Következő hónap",
      nextYear: "Következő év",
      prevMonth: "Előző hónap",
      prevYear: "Előző év"
    },
    carousel: {
      dots: "Válassza ki a megjelenítendő diát",
      goto: "Ugrás ide {slide}",
      next: "Következő",
      prev: "Előző"
    },
    chatPrompt: {
      placeholder: "Írd be a kérdésedet itt…"
    },
    chatPromptSubmit: {
      label: "Küldés"
    },
    colorMode: {
      dark: "Sötét",
      light: "Világos",
      switchToDark: "Váltás sötét módra",
      switchToLight: "Váltás világos módra",
      system: "Rendszer"
    },
    commandPalette: {
      back: "Vissza",
      close: "Bezárás",
      noData: "Nincs adat",
      noMatch: "Nincs találat",
      placeholder: "Írjon be egy parancsot vagy keressen…"
    },
    contentSearch: {
      links: "Linkek",
      theme: "Téma"
    },
    contentSearchButton: {
      label: "Keresés…"
    },
    contentToc: {
      title: "Ezen az oldalon"
    },
    dashboardSearch: {
      theme: "Téma"
    },
    dashboardSearchButton: {
      label: "Keresés…"
    },
    dashboardSidebarCollapse: {
      collapse: "Oldalsáv összecsukása",
      expand: "Oldalsáv kinyitása"
    },
    dashboardSidebarToggle: {
      close: "Oldalsáv bezárása",
      open: "Oldalsáv megnyitása"
    },
    error: {
      clear: "Vissza a főoldalra"
    },
    fileUpload: {
      removeFile: "{filename} eltávolítása"
    },
    header: {
      close: "Menü bezárása",
      open: "Menü megnyitása"
    },
    inputMenu: {
      create: '"{label}" létrehozása',
      noData: "Nincs adat",
      noMatch: "Nincs találat"
    },
    inputNumber: {
      decrement: "Csökkent",
      increment: "Növel"
    },
    modal: {
      close: "Bezárás"
    },
    pricingTable: {
      caption: "Árlista összehasonlítása"
    },
    prose: {
      codeCollapse: {
        closeText: "Összecsuk",
        name: "kód",
        openText: "Kinyit"
      },
      collapsible: {
        closeText: "Elrejt",
        name: "tulajdonságok",
        openText: "Mutat"
      },
      pre: {
        copy: "Kód másolása a vágólapra"
      }
    },
    selectMenu: {
      create: '"{label}" létrehozása',
      noData: "Nincs adat",
      noMatch: "Nincs találat",
      search: "Keresés…"
    },
    slideover: {
      close: "Bezárás"
    },
    table: {
      noData: "Nincs adat"
    },
    toast: {
      close: "Bezárás"
    }
  }
});
const hy = /* @__PURE__ */ defineLocale({
  name: "Հայերեն",
  code: "hy",
  messages: {
    alert: {
      close: "Փակել"
    },
    authForm: {
      hidePassword: "Թաքցնել գաղտնաբառը",
      showPassword: "Ցույց տալ գաղտնաբառը",
      submit: "Շարունակել"
    },
    banner: {
      close: "Փակել"
    },
    calendar: {
      nextMonth: "Հաջորդ ամիս",
      nextYear: "Հաջորդ տարի",
      prevMonth: "Նախորդ ամիս",
      prevYear: "Նախորդ տարի"
    },
    carousel: {
      dots: "Ընտրեք ցուցադրելու սլայդը",
      goto: "Անցնել {slide}-ին",
      next: "Առաջ",
      prev: "Հետ"
    },
    chatPrompt: {
      placeholder: "Շարունակել"
    },
    chatPromptSubmit: {
      label: "Շարունակել"
    },
    colorMode: {
      dark: "Մուգ",
      light: "Լուսավոր",
      switchToDark: "Անցնել մուգ ռեժիմի",
      switchToLight: "Անցնել լուսավոր ռեժիմի",
      system: "Համակարգային"
    },
    commandPalette: {
      back: "Հետ",
      close: "Փակել",
      noData: "Տվյալներ չկան",
      noMatch: "Համընկնումներ չեն գտնվել",
      placeholder: "Մուտքագրեք հրաման կամ որոնեք…"
    },
    contentSearch: {
      links: "Հղումներ",
      theme: "Թեմա"
    },
    contentSearchButton: {
      label: "Որոնել…"
    },
    contentToc: {
      title: "Այս էջում"
    },
    dashboardSearch: {
      theme: "Թեմա"
    },
    dashboardSearchButton: {
      label: "Որոնել…"
    },
    dashboardSidebarCollapse: {
      collapse: "Կոլապսել կողային վահանակը",
      expand: "Ընդլայնել կողային վահանակը"
    },
    dashboardSidebarToggle: {
      close: "Փակել կողային վահանակը",
      open: "Բացել կողային վահանակը"
    },
    error: {
      clear: "Վերադառնալ գլխավոր էջ"
    },
    fileUpload: {
      removeFile: "Ջնջել {filename}"
    },
    header: {
      close: "Փակել ընտրացանկը",
      open: "Բացել ընտրացանկը"
    },
    inputMenu: {
      create: 'Ստեղծել "{label}"',
      noData: "Տվյալներ չկան",
      noMatch: "Համընկնումներ չեն գտնվել"
    },
    inputNumber: {
      decrement: "Պակասեցնել",
      increment: "Ավելացնել"
    },
    modal: {
      close: "Փակել"
    },
    pricingTable: {
      caption: "Գնումների համեմատություն"
    },
    prose: {
      codeCollapse: {
        closeText: "Կոլապսել",
        name: "կոդ",
        openText: "Ընդլայնել"
      },
      collapsible: {
        closeText: "Թաքցնել",
        name: "հատկություններ",
        openText: "Ցույց տալ"
      },
      pre: {
        copy: "Պատճենել կոդը սեղմատախտակին"
      }
    },
    selectMenu: {
      create: 'Ստեղծել "{label}"',
      noData: "Տվյալներ չկան",
      noMatch: "Համընկնումներ չեն գտնվել",
      search: "Որոնում…"
    },
    slideover: {
      close: "Փակել"
    },
    table: {
      noData: "Տվյալներ չկան"
    },
    toast: {
      close: "Փակել"
    }
  }
});
const id = /* @__PURE__ */ defineLocale({
  name: "Bahasa Indonesia",
  code: "id",
  messages: {
    alert: {
      close: "Tutup"
    },
    authForm: {
      hidePassword: "Sembunyikan kata sandi",
      showPassword: "Tampilkan kata sandi",
      submit: "Lanjutkan"
    },
    banner: {
      close: "Tutup"
    },
    calendar: {
      nextMonth: "Bulan berikutnya",
      nextYear: "Tahun berikutnya",
      prevMonth: "Bulan sebelumnya",
      prevYear: "Tahun sebelumnya"
    },
    carousel: {
      dots: "Pilih slide untuk ditampilkan",
      goto: "Pergi ke slide {slide}",
      next: "Berikutnya",
      prev: "Sebelumnya"
    },
    chatPrompt: {
      placeholder: "Tulis pesan Anda di sini…"
    },
    chatPromptSubmit: {
      label: "Kirim"
    },
    colorMode: {
      dark: "Gelap",
      light: "Terang",
      switchToDark: "Beralih ke mode gelap",
      switchToLight: "Beralih ke mode terang",
      system: "Sistem"
    },
    commandPalette: {
      back: "Kembali",
      close: "Tutup",
      noData: "Tidak ada data",
      noMatch: "Tidak ada data yang cocok",
      placeholder: "Ketik perintah atau cari…"
    },
    contentSearch: {
      links: "Tautan",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Cari…"
    },
    contentToc: {
      title: "Pada halaman ini"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Cari…"
    },
    dashboardSidebarCollapse: {
      collapse: "Ciutkan sidebar",
      expand: "Perluas sidebar"
    },
    dashboardSidebarToggle: {
      close: "Tutup sidebar",
      open: "Buka sidebar"
    },
    error: {
      clear: "Kembali ke beranda"
    },
    fileUpload: {
      removeFile: "Hapus {filename}"
    },
    header: {
      close: "Tutup menu",
      open: "Buka menu"
    },
    inputMenu: {
      create: 'Buat "{label}"',
      noData: "Tidak ada data",
      noMatch: "Tidak ada data yang cocok"
    },
    inputNumber: {
      decrement: "Kurangi",
      increment: "Tambah"
    },
    modal: {
      close: "Tutup"
    },
    pricingTable: {
      caption: "Perbandingan Harga"
    },
    prose: {
      codeCollapse: {
        closeText: "Ciutkan",
        name: "kode",
        openText: "Perluas"
      },
      collapsible: {
        closeText: "Sembunyikan",
        name: "properti",
        openText: "Tampilkan"
      },
      pre: {
        copy: "Salin kode ke clipboard"
      }
    },
    selectMenu: {
      create: 'Buat "{label}"',
      noData: "Tidak ada data",
      noMatch: "Tidak ada data yang cocok",
      search: "Cari…"
    },
    slideover: {
      close: "Tutup"
    },
    table: {
      noData: "Tidak ada data"
    },
    toast: {
      close: "Tutup"
    }
  }
});
const it = /* @__PURE__ */ defineLocale({
  name: "Italiano",
  code: "it",
  messages: {
    alert: {
      close: "Chiudi"
    },
    authForm: {
      hidePassword: "Nascondi password",
      showPassword: "Mostra password",
      submit: "Continua"
    },
    banner: {
      close: "Chiudi"
    },
    calendar: {
      nextMonth: "Mese successivo",
      nextYear: "Anno successivo",
      prevMonth: "Mese precedente",
      prevYear: "Anno precedente"
    },
    carousel: {
      dots: "Scegli diapositiva da visualizzare",
      goto: "Vai alla slide {slide}",
      next: "Successiva",
      prev: "Precedente"
    },
    chatPrompt: {
      placeholder: "Scrivi il tuo messaggio qui…"
    },
    chatPromptSubmit: {
      label: "Invia"
    },
    colorMode: {
      dark: "Scuro",
      light: "Chiaro",
      switchToDark: "Passa alla modalità scura",
      switchToLight: "Passa alla modalità chiara",
      system: "Sistema"
    },
    commandPalette: {
      back: "Indietro",
      close: "Chiudi",
      noData: "Nessun dato",
      noMatch: "Nessun dato corrispondente",
      placeholder: "Digita un comando o cerca…"
    },
    contentSearch: {
      links: "Collegamenti",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Cerca…"
    },
    contentToc: {
      title: "In questa pagina"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Cerca…"
    },
    dashboardSidebarCollapse: {
      collapse: "Comprimi barra laterale",
      expand: "Espandi barra laterale"
    },
    dashboardSidebarToggle: {
      close: "Chiudi barra laterale",
      open: "Apri barra laterale"
    },
    error: {
      clear: "Torna alla home"
    },
    fileUpload: {
      removeFile: "Rimuovi {filename}"
    },
    header: {
      close: "Chiudi menu",
      open: "Apri menu"
    },
    inputMenu: {
      create: 'Crea "{label}"',
      noData: "Nessun dato",
      noMatch: "Nessun dato corrispondente"
    },
    inputNumber: {
      decrement: "Diminuisci",
      increment: "Aumenta"
    },
    modal: {
      close: "Chiudi"
    },
    pricingTable: {
      caption: "Confronto dei piani di prezzo"
    },
    prose: {
      codeCollapse: {
        closeText: "Comprimi",
        name: "codice",
        openText: "Espandi"
      },
      collapsible: {
        closeText: "Nascondi",
        name: "proprietà",
        openText: "Mostra"
      },
      pre: {
        copy: "Copia codice negli appunti"
      }
    },
    selectMenu: {
      create: 'Crea "{label}"',
      noData: "Nessun dato",
      noMatch: "Nessun dato corrispondente",
      search: "Cerca…"
    },
    slideover: {
      close: "Chiudi"
    },
    table: {
      noData: "Nessun dato"
    },
    toast: {
      close: "Chiudi"
    }
  }
});
const ja = /* @__PURE__ */ defineLocale({
  name: "日本語",
  code: "ja",
  messages: {
    alert: {
      close: "閉じる"
    },
    authForm: {
      hidePassword: "パスワードを隠す",
      showPassword: "パスワードを表示",
      submit: "続ける"
    },
    banner: {
      close: "閉じる"
    },
    calendar: {
      nextMonth: "翌月",
      nextYear: "翌年",
      prevMonth: "前月",
      prevYear: "前年"
    },
    carousel: {
      dots: "表示するスライドを選択",
      goto: "スライド {slide} に移動",
      next: "次へ",
      prev: "前へ"
    },
    chatPrompt: {
      placeholder: "ここにメッセージを入力してください…"
    },
    chatPromptSubmit: {
      label: "送信"
    },
    colorMode: {
      dark: "ダーク",
      light: "ライト",
      switchToDark: "ダークモードに切り替え",
      switchToLight: "ライトモードに切り替え",
      system: "システム"
    },
    commandPalette: {
      back: "戻る",
      close: "閉じる",
      noData: "データがありません",
      noMatch: "一致するデータがありません",
      placeholder: "コマンドを入力するか検索…"
    },
    contentSearch: {
      links: "リンク",
      theme: "テーマ"
    },
    contentSearchButton: {
      label: "検索…"
    },
    contentToc: {
      title: "このページ内"
    },
    dashboardSearch: {
      theme: "テーマ"
    },
    dashboardSearchButton: {
      label: "検索…"
    },
    dashboardSidebarCollapse: {
      collapse: "サイドバーを折りたたむ",
      expand: "サイドバーを展開"
    },
    dashboardSidebarToggle: {
      close: "サイドバーを閉じる",
      open: "サイドバーを開く"
    },
    error: {
      clear: "ホームに戻る"
    },
    fileUpload: {
      removeFile: "{filename}を削除"
    },
    header: {
      close: "メニューを閉じる",
      open: "メニューを開く"
    },
    inputMenu: {
      create: '"{label}"を作成',
      noData: "データがありません",
      noMatch: "一致するデータがありません"
    },
    inputNumber: {
      decrement: "減らす",
      increment: "増やす"
    },
    modal: {
      close: "閉じる"
    },
    pricingTable: {
      caption: "価格プランの比較"
    },
    prose: {
      codeCollapse: {
        closeText: "折りたたむ",
        name: "コード",
        openText: "展開"
      },
      collapsible: {
        closeText: "非表示",
        name: "プロパティ",
        openText: "表示"
      },
      pre: {
        copy: "コードをクリップボードにコピー"
      }
    },
    selectMenu: {
      create: '"{label}"を作成',
      noData: "データがありません",
      noMatch: "一致するデータがありません",
      search: "検索…"
    },
    slideover: {
      close: "閉じる"
    },
    table: {
      noData: "データがありません"
    },
    toast: {
      close: "閉じる"
    }
  }
});
const ka = /* @__PURE__ */ defineLocale({
  name: "ქართული",
  code: "ka",
  messages: {
    alert: {
      close: "დახურვა"
    },
    authForm: {
      hidePassword: "პაროლის დამალვა",
      showPassword: "პაროლის ჩვენება",
      submit: "გაგრძელება"
    },
    banner: {
      close: "დახურვა"
    },
    calendar: {
      nextMonth: "შემდეგი თვე",
      nextYear: "შემდეგი წელი",
      prevMonth: "წინა თვე",
      prevYear: "წინა წელი"
    },
    carousel: {
      dots: "აირჩიეთ სლაიდი საჩვენებლად",
      goto: "გადასვლა სლაიდ {slide}-ზე",
      next: "შემდეგი",
      prev: "წინა"
    },
    chatPrompt: {
      placeholder: "დაწერეთ თქვენი მესიჯი აქ…"
    },
    chatPromptSubmit: {
      label: "შეტყობინების გაგზავნა"
    },
    colorMode: {
      dark: "ბნელი",
      light: "ნათელი",
      switchToDark: "ბნელ რეჯიმზე გადასვლა",
      switchToLight: "ნათელ რეჯიმზე გადასვლა",
      system: "სისტემური"
    },
    commandPalette: {
      back: "უკან",
      close: "დახურვა",
      noData: "მონაცემები არ არის",
      noMatch: "შესატყვისი მონაცემები არ არის",
      placeholder: "ჩაწერეთ ბრძანება ან ძიება…"
    },
    contentSearch: {
      links: "ბმულები",
      theme: "თემა"
    },
    contentSearchButton: {
      label: "ძიება…"
    },
    contentToc: {
      title: "ამ გვერდზე"
    },
    dashboardSearch: {
      theme: "თემა"
    },
    dashboardSearchButton: {
      label: "ძიება…"
    },
    dashboardSidebarCollapse: {
      collapse: "გვერდითი ზოლის ჩაკეცვა",
      expand: "გვერდითი ზოლის გაშლა"
    },
    dashboardSidebarToggle: {
      close: "გვერდითი ზოლის დახურვა",
      open: "გვერდითი ზოლის გახსნა"
    },
    error: {
      // While "home" translates as "სახლი", I chose to use "მთავარი" (meaning "main") as contextually this sounds better.
      // If any Georgian prefers literal translation, please submit patch.
      clear: "მთავარზე დაბრუნება"
    },
    fileUpload: {
      removeFile: "მოაშორე {filename}"
    },
    header: {
      close: "მენიუს დახურვა",
      open: "მენიუს გახსნა"
    },
    inputMenu: {
      create: 'შექმენი "{label}"',
      noData: "მონაცემები არ არის",
      noMatch: "შესატყვისი მონაცემები არ არის"
    },
    inputNumber: {
      decrement: "დაკლება",
      increment: "დამატება"
    },
    modal: {
      close: "დახურვა"
    },
    pricingTable: {
      caption: "ფასის გეგმების შედარება"
    },
    prose: {
      codeCollapse: {
        closeText: "ჩაკეცვა",
        name: "კოდი",
        openText: "გაშლა"
      },
      collapsible: {
        closeText: "დახურვა",
        name: "თვისებები",
        openText: "ჩვენება"
      },
      pre: {
        copy: "კოდის კოპირება ბუფერში"
      }
    },
    selectMenu: {
      create: 'დაამატე "{label}"',
      // "Create" translates as "შექმნა", but since we are simply adding new choice, creating sounds wrong, thus I chose to use "დაამატე", meaning "add".
      noData: "მონაცემები არ არის",
      noMatch: "შესატყვისი მონაცემები არ არის",
      search: "ძიება…"
    },
    slideover: {
      close: "დახურვა"
    },
    table: {
      noData: "მონაცემები არ არის"
    },
    toast: {
      close: "დახურვა"
    }
  }
});
const kk = /* @__PURE__ */ defineLocale({
  name: "Қазақша",
  code: "kk",
  messages: {
    alert: {
      close: "Жабу"
    },
    authForm: {
      hidePassword: "Құпия сөзді жасыру",
      showPassword: "Құпия сөзді көрсету",
      submit: "Жалғастыру"
    },
    banner: {
      close: "Жабу"
    },
    calendar: {
      nextMonth: "Келесі ай",
      nextYear: "Келесі жыл",
      prevMonth: "Алдыңғы ай",
      prevYear: "Алдыңғы жыл"
    },
    carousel: {
      dots: "Көрсету үшін слайдты таңдаңыз",
      goto: "{slide} слайдқа өту",
      next: "Келесі",
      prev: "Алдыңғы"
    },
    chatPrompt: {
      placeholder: "Хабар енгізіңіз…"
    },
    chatPromptSubmit: {
      label: "Жіберу"
    },
    colorMode: {
      dark: "Қараңғы",
      light: "Ашық",
      switchToDark: "Қараңғы режимге ауысу",
      switchToLight: "Ашық режимге ауысу",
      system: "Жүйе"
    },
    commandPalette: {
      back: "Артқа",
      close: "Жабу",
      noData: "Деректер жоқ",
      noMatch: "Сәйкес келетін деректер жоқ",
      placeholder: "Команда енгізіңіз немесе іздеңіз…"
    },
    contentSearch: {
      links: "Сілтемелер",
      theme: "Тақырып"
    },
    contentSearchButton: {
      label: "Іздеу"
    },
    contentToc: {
      title: "Мазмұны"
    },
    dashboardSearch: {
      theme: "Тақырып"
    },
    dashboardSearchButton: {
      label: "Іздеу"
    },
    dashboardSidebarCollapse: {
      collapse: "Жию",
      expand: "Кеңейту"
    },
    dashboardSidebarToggle: {
      close: "Жабу",
      open: "Ашу"
    },
    error: {
      clear: "Тазалау"
    },
    fileUpload: {
      removeFile: "{filename} жою"
    },
    header: {
      close: "Жабу",
      open: "Ашу"
    },
    inputMenu: {
      create: '"{label}" жасау',
      noData: "Деректер жоқ",
      noMatch: "Сәйкес келетін деректер жоқ"
    },
    inputNumber: {
      decrement: "Азайту",
      increment: "Арттыру"
    },
    modal: {
      close: "Жабу"
    },
    pricingTable: {
      caption: "Баға кестесі"
    },
    prose: {
      codeCollapse: {
        closeText: "Жиыру",
        name: "код",
        openText: "Кеңейту"
      },
      collapsible: {
        closeText: "Жасыру",
        name: "қасиеттер",
        openText: "Көрсету"
      },
      pre: {
        copy: "Кодты алмасу буферіне көшіру"
      }
    },
    selectMenu: {
      create: '"{label}" жасау',
      noData: "Деректер жоқ",
      noMatch: "Сәйкес келетін деректер жоқ",
      search: "Іздеу…"
    },
    slideover: {
      close: "Жабу"
    },
    table: {
      noData: "Деректер жоқ"
    },
    toast: {
      close: "Жабу"
    }
  }
});
const km = /* @__PURE__ */ defineLocale({
  name: "ភាសាខ្មែរ",
  code: "km",
  messages: {
    alert: {
      close: "បិទ"
    },
    authForm: {
      hidePassword: "លាក់ពាក្យសម្ងាត់",
      showPassword: "បង្ហាញពាក្យសម្ងាត់",
      submit: "បន្ត"
    },
    banner: {
      close: "បិទ"
    },
    calendar: {
      nextMonth: "ខែបន្ទាប់",
      nextYear: "ឆ្នាំបន្ទាប់",
      prevMonth: "ខែមុន",
      prevYear: "ឆ្នាំមុន"
    },
    carousel: {
      dots: "ជ្រើសរើស​ស្លាយ​ដើម្បី​បង្ហាញ",
      goto: "ឡើងទៅស្លាយ {slide}",
      next: "បន្ទាប់",
      prev: "មុន"
    },
    chatPrompt: {
      placeholder: "សួរស្រឡាញ់មួយបីនេះមានប្រភេទបានទាមទារទេ…"
    },
    chatPromptSubmit: {
      label: "សាក់"
    },
    colorMode: {
      dark: "ងងឹត",
      light: "ភ្លឺ",
      switchToDark: "ប្តូរទៅរបៀបងងឹត",
      switchToLight: "ប្តូរទៅរបៀបភ្លឺ",
      system: "ប្រព័ន្ធ"
    },
    commandPalette: {
      back: "ត្រឡប់",
      close: "បិទ",
      noData: "មិនមានទិន្នន័យ",
      noMatch: "មិនមានទិន្នន័យដែលត្រូវគ្នាទេ",
      placeholder: "វាយពាក្យបញ្ជា ឬស្វែងរក…"
    },
    contentSearch: {
      links: "តំណភ្ជាប់",
      theme: "រូបរាង"
    },
    contentSearchButton: {
      label: "ស្វែងរក…"
    },
    contentToc: {
      title: "នៅលើទំព័រនេះ"
    },
    dashboardSearch: {
      theme: "រូបរាង"
    },
    dashboardSearchButton: {
      label: "ស្វែងរក…"
    },
    dashboardSidebarCollapse: {
      collapse: "បង្រួមបារចំហៀង",
      expand: "ពង្រីកបារចំហៀង"
    },
    dashboardSidebarToggle: {
      close: "បិទបារចំហៀង",
      open: "បើកបារចំហៀង"
    },
    error: {
      clear: "ត្រឡប់ទៅទំព័រដើម"
    },
    fileUpload: {
      removeFile: "លុប {filename}"
    },
    header: {
      close: "បិទម៉ឺនុយ",
      open: "បើកម៉ឺនុយ"
    },
    inputMenu: {
      create: 'បង្កើត "{label}"',
      noData: "មិនមានទិន្នន័យ",
      noMatch: "មិនមានទិន្នន័យដែលត្រូវគ្នាទេ"
    },
    inputNumber: {
      decrement: "បន្ថយ",
      increment: "បង្កើន"
    },
    modal: {
      close: "បិទ"
    },
    pricingTable: {
      caption: "បញ្ជីតម្លៃបន្ទប់បន្ទប់"
    },
    prose: {
      codeCollapse: {
        closeText: "បង្រួម",
        name: "កូដ",
        openText: "ពង្រីក"
      },
      collapsible: {
        closeText: "លាក់",
        name: "លក្ខណៈសម្បត្តិ",
        openText: "បង្ហាញ"
      },
      pre: {
        copy: "ចម្លងកូដទៅក្ដារតម្បៀតខ្ទាស់"
      }
    },
    selectMenu: {
      create: 'បង្កើត "{label}"',
      noData: "មិនមានទិន្នន័យ",
      noMatch: "មិនមានទិន្នន័យដែលត្រូវគ្នាទេ",
      search: "ស្វែងរក…"
    },
    slideover: {
      close: "បិទ"
    },
    table: {
      noData: "មិនមានទិន្នន័យ"
    },
    toast: {
      close: "បិទ"
    }
  }
});
const ko = /* @__PURE__ */ defineLocale({
  name: "한국어",
  code: "ko",
  messages: {
    alert: {
      close: "닫기"
    },
    authForm: {
      hidePassword: "비밀번호 숨기기",
      showPassword: "비밀번호 표시",
      submit: "계속"
    },
    banner: {
      close: "닫기"
    },
    calendar: {
      nextMonth: "다음 달",
      nextYear: "다음 해",
      prevMonth: "이전 달",
      prevYear: "이전 해"
    },
    carousel: {
      dots: "표시할 슬라이드 선택",
      goto: "{slide} 페이지로 이동",
      next: "다음",
      prev: "이전"
    },
    chatPrompt: {
      placeholder: "여기에 메시지를 입력하세요…"
    },
    chatPromptSubmit: {
      label: "전송"
    },
    colorMode: {
      dark: "다크",
      light: "라이트",
      switchToDark: "다크 모드로 전환",
      switchToLight: "라이트 모드로 전환",
      system: "시스템"
    },
    commandPalette: {
      back: "뒤로",
      close: "닫기",
      noData: "데이터가 없습니다.",
      noMatch: "일치하는 데이터가 없습니다.",
      placeholder: "명령을 입력하거나 검색…"
    },
    contentSearch: {
      links: "링크",
      theme: "테마"
    },
    contentSearchButton: {
      label: "검색…"
    },
    contentToc: {
      title: "이 페이지에서"
    },
    dashboardSearch: {
      theme: "테마"
    },
    dashboardSearchButton: {
      label: "검색…"
    },
    dashboardSidebarCollapse: {
      collapse: "사이드바 축소",
      expand: "사이드바 확장"
    },
    dashboardSidebarToggle: {
      close: "사이드바 닫기",
      open: "사이드바 열기"
    },
    error: {
      clear: "홈으로 돌아가기"
    },
    fileUpload: {
      removeFile: "{filename} 제거"
    },
    header: {
      close: "메뉴 닫기",
      open: "메뉴 열기"
    },
    inputMenu: {
      create: '"{label}" 생성',
      noData: "데이터가 없습니다.",
      noMatch: "일치하는 데이터가 없습니다."
    },
    inputNumber: {
      decrement: "감소",
      increment: "증가"
    },
    modal: {
      close: "닫기"
    },
    pricingTable: {
      caption: "가격 플랜 비교"
    },
    prose: {
      codeCollapse: {
        closeText: "접기",
        name: "코드",
        openText: "펼치기"
      },
      collapsible: {
        closeText: "숨기기",
        name: "속성",
        openText: "보기"
      },
      pre: {
        copy: "코드를 클립보드에 복사"
      }
    },
    selectMenu: {
      create: '"{label}" 생성',
      noData: "데이터가 없습니다.",
      noMatch: "일치하는 데이터가 없습니다.",
      search: "검색…"
    },
    slideover: {
      close: "닫기"
    },
    table: {
      noData: "데이터가 없습니다."
    },
    toast: {
      close: "닫기"
    }
  }
});
const ky = /* @__PURE__ */ defineLocale({
  name: "Кыргызча",
  code: "ky",
  messages: {
    alert: {
      close: "Жабуу"
    },
    authForm: {
      hidePassword: "Сырсөздү жашыруу",
      showPassword: "Сырсөздү көрсөтүү",
      submit: "Улантуу"
    },
    banner: {
      close: "Жабуу"
    },
    calendar: {
      nextMonth: "Кийинки ай",
      nextYear: "Кийинки жыл",
      prevMonth: "Алдыңкы ай",
      prevYear: "Алдыңкы жыл"
    },
    carousel: {
      dots: "Көрсөтүү үчүн слайдды тандаңыз",
      goto: "{slide} слайдга өтүү",
      next: "Кийинки",
      prev: "Алдыңкы"
    },
    chatPrompt: {
      placeholder: "Бул жерге билдирүүңүздү жазыңыз…"
    },
    chatPromptSubmit: {
      label: "Билдирүү жөнөтүү"
    },
    colorMode: {
      dark: "Караңгы",
      light: "Жарык",
      switchToDark: "Караңгы режимге өтүү",
      switchToLight: "Жарык режимге өтүү",
      system: "Система"
    },
    commandPalette: {
      back: "Артка",
      close: "Жабуу",
      noData: "Маалымат жок",
      noMatch: "Эч нерсе табылган жок",
      placeholder: "Буйрук киргизиңиз же издөө…"
    },
    contentSearch: {
      links: "Шилтемелер",
      theme: "Тема"
    },
    contentSearchButton: {
      label: "Издөө…"
    },
    contentToc: {
      title: "Бул бетте"
    },
    dashboardSearch: {
      theme: "Тема"
    },
    dashboardSearchButton: {
      label: "Издөө…"
    },
    dashboardSidebarCollapse: {
      collapse: "Каптал тилкесин жыйноо",
      expand: "Каптал тилкесин кеңейтүү"
    },
    dashboardSidebarToggle: {
      close: "Каптал тилкесин жабуу",
      open: "Каптал тилкесин ачуу"
    },
    error: {
      clear: "Башкы бетке кайтуу"
    },
    fileUpload: {
      removeFile: "{filename} өчүрүү"
    },
    header: {
      close: "Менюну жабуу",
      open: "Менюну ачуу"
    },
    inputMenu: {
      create: '"{label}" жасоо',
      noData: "Маалымат жок",
      noMatch: "Эч нерсе табылган жок"
    },
    inputNumber: {
      decrement: "Азайтуу",
      increment: "Кошуу"
    },
    modal: {
      close: "Жабуу"
    },
    pricingTable: {
      caption: "Баалардын салыштыруу таблицасы"
    },
    prose: {
      codeCollapse: {
        closeText: "Жыйноо",
        name: "код",
        openText: "Кеңейтүү"
      },
      collapsible: {
        closeText: "Жашыруу",
        name: "касиеттер",
        openText: "Көрсөтүү"
      },
      pre: {
        copy: "Кодду алмашуу буферине көчүрүү"
      }
    },
    selectMenu: {
      create: '"{label}" жасоо',
      noData: "Маалымат жок",
      noMatch: "Сүйлөшкөн маалыматтар жок",
      search: "Издөө…"
    },
    slideover: {
      close: "Жабуу"
    },
    table: {
      noData: "Маалымат жок"
    },
    toast: {
      close: "Жабуу"
    }
  }
});
const lb = /* @__PURE__ */ defineLocale({
  name: "Lëtzebuergesch",
  code: "lb",
  messages: {
    alert: {
      close: "Zoumaachen"
    },
    authForm: {
      hidePassword: "Passwuert verstoppen",
      showPassword: "Passwuert uweisen",
      submit: "Fortschécken"
    },
    banner: {
      close: "Zoumaachen"
    },
    calendar: {
      nextMonth: "Nächste Mount",
      nextYear: "Nächst Joer",
      prevMonth: "Virege Mount",
      prevYear: "Viregt Joer"
    },
    carousel: {
      dots: "Wielt Dia fir ze weisen",
      goto: "Gitt op d'Slide {Slide}",
      next: "Näch.",
      prev: "Präz."
    },
    chatPrompt: {
      placeholder: "Tippt hei Äre Message…"
    },
    chatPromptSubmit: {
      label: "Prompt schécken"
    },
    colorMode: {
      dark: "Donkel",
      light: "Liicht",
      switchToDark: "Op de Donkelmodus wiesselen",
      switchToLight: "Op de Liichtmodus wiesselen",
      system: "System"
    },
    commandPalette: {
      back: "Zréck",
      close: "Zoumaachen",
      noData: "Keng Donnéeën",
      noMatch: "Keng entspriechend Donnéeën",
      placeholder: "Tippt e Befeel oder sicht…"
    },
    contentSearch: {
      links: "Linken",
      theme: "Thema"
    },
    contentSearchButton: {
      label: "Sichen…"
    },
    contentToc: {
      title: "Op dëser Säit"
    },
    dashboardSearch: {
      theme: "Thema"
    },
    dashboardSearchButton: {
      label: "Sichen…"
    },
    dashboardSidebarCollapse: {
      collapse: "Sidebar zouklappen",
      expand: "Sidebar opklappen"
    },
    dashboardSidebarToggle: {
      close: "Sidebar zoumaachen",
      open: "Sidebar opmaachen"
    },
    error: {
      clear: "Zréck op d'Startsäit"
    },
    fileUpload: {
      removeFile: "{filename} ewechhuelen"
    },
    header: {
      close: "Menü zoumaachen",
      open: "Menü opmaachen"
    },
    inputMenu: {
      create: '"{label}" erstellen',
      noData: "Keng Donnéeën",
      noMatch: "Keng entspriechend Donnéeën"
    },
    inputNumber: {
      decrement: "Dekrementéieren",
      increment: "Inkrementéieren"
    },
    modal: {
      close: "Zoumaachen"
    },
    pricingTable: {
      caption: "Vergläich vun de Präispläng"
    },
    prose: {
      codeCollapse: {
        closeText: "Zouklappen",
        name: "code",
        openText: "Opklappen"
      },
      collapsible: {
        closeText: "Verstoppen",
        name: "eegenschaften",
        openText: "Uweisen"
      },
      pre: {
        copy: "Code an d'Zwëschspäicher kopéieren"
      }
    },
    selectMenu: {
      create: '"{label}" erstellen',
      noData: "Keng Donnéeën",
      noMatch: "Keng entspriechend Donnéeën",
      search: "Sichen.."
    },
    slideover: {
      close: "Zoumaachen"
    },
    table: {
      noData: "Keng Donnéeën"
    },
    toast: {
      close: "Zoumaachen"
    }
  }
});
const lt = /* @__PURE__ */ defineLocale({
  name: "Lietuvių",
  code: "lt",
  messages: {
    alert: {
      close: "Uždaryti"
    },
    authForm: {
      hidePassword: "Slėpti slaptažodį",
      showPassword: "Rodyti slaptažodį",
      submit: "Tęsti"
    },
    banner: {
      close: "Uždaryti"
    },
    calendar: {
      nextMonth: "Kitas mėnuo",
      nextYear: "Kiti metai",
      prevMonth: "Ankstesnis mėnuo",
      prevYear: "Ankstesni metai"
    },
    carousel: {
      dots: "Pasirinkite skaidrę rodymui",
      goto: "Eiti į skaidrę {slide}",
      next: "Pirmyn",
      prev: "Atgal"
    },
    chatPrompt: {
      placeholder: "Įveskite savo žinutę čia…"
    },
    chatPromptSubmit: {
      label: "Siųsti žinutę"
    },
    colorMode: {
      dark: "Tamsus",
      light: "Šviesus",
      switchToDark: "Perjungti į tamsų režimą",
      switchToLight: "Perjungti į šviesų režimą",
      system: "Sistema"
    },
    commandPalette: {
      back: "Atgal",
      close: "Uždaryti",
      noData: "Nėra duomenų",
      noMatch: "Nėra atitinkančių duomenų",
      placeholder: "Įveskite komandą arba ieškokite…"
    },
    contentSearch: {
      links: "Nuorodos",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Ieškoti…"
    },
    contentToc: {
      title: "Šiame puslapyje"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Ieškoti…"
    },
    dashboardSidebarCollapse: {
      collapse: "Suskleisti šoninę juostą",
      expand: "Išplėsti šoninę juostą"
    },
    dashboardSidebarToggle: {
      close: "Uždaryti šoninę juostą",
      open: "Atidaryti šoninę juostą"
    },
    error: {
      clear: "Grįžti į pradžią"
    },
    fileUpload: {
      removeFile: "Pašalinti {filename}"
    },
    header: {
      close: "Uždaryti meniu",
      open: "Atidaryti meniu"
    },
    inputMenu: {
      create: 'Sukurti „{label}"',
      noData: "Nėra duomenų",
      noMatch: "Nėra atitinkančių duomenų"
    },
    inputNumber: {
      decrement: "Sumažinti",
      increment: "Padidinti"
    },
    modal: {
      close: "Uždaryti"
    },
    pricingTable: {
      caption: "Kainų planų palyginimas"
    },
    prose: {
      codeCollapse: {
        closeText: "Suskleisti",
        name: "kodas",
        openText: "Išplėsti"
      },
      collapsible: {
        closeText: "Slėpti",
        name: "savybės",
        openText: "Rodyti"
      },
      pre: {
        copy: "Kopijuoti kodą į iškarpinę"
      }
    },
    selectMenu: {
      create: 'Sukurti „{label}"',
      noData: "Nėra duomenų",
      noMatch: "Nėra atitinkančių duomenų",
      search: "Ieškoti…"
    },
    slideover: {
      close: "Uždaryti"
    },
    table: {
      noData: "Nėra duomenų"
    },
    toast: {
      close: "Uždaryti"
    }
  }
});
const mn = /* @__PURE__ */ defineLocale({
  name: "Монгол",
  code: "mn",
  messages: {
    alert: {
      close: "Хаах"
    },
    authForm: {
      hidePassword: "Нууц үгийг нуух",
      showPassword: "Нууц үгийг харуулах",
      submit: "Үргэлжлүүлэх"
    },
    banner: {
      close: "Хаах"
    },
    calendar: {
      nextMonth: "Дараа сар",
      nextYear: "Дараа жил",
      prevMonth: "Өмнөх сар",
      prevYear: "Өмнөх жил"
    },
    carousel: {
      dots: "Харуулах слайдыг сонгоно уу",
      goto: "{slide}-р хуудсанд шилжих",
      next: "Дараах",
      prev: "Өмнөх"
    },
    chatPrompt: {
      placeholder: "Энд мессежээ бичнэ үү…"
    },
    chatPromptSubmit: {
      label: "Мессеж илгээх"
    },
    colorMode: {
      dark: "Хар",
      light: "Цагаан",
      switchToDark: "Хар горимд шилжих",
      switchToLight: "Цагаан горимд шилжих",
      system: "Систем"
    },
    commandPalette: {
      back: "Буцах",
      close: "Хаах",
      noData: "Мэдээлэл байхгүй",
      noMatch: "Тохирох мэдээлэл олдсонгүй",
      placeholder: "Комманд бичих эсвэл хайлт хийх…"
    },
    contentSearch: {
      links: "Холбоосууд",
      theme: "Загвар"
    },
    contentSearchButton: {
      label: "Хайх…"
    },
    contentToc: {
      title: "Энэ хуудсанд"
    },
    dashboardSearch: {
      theme: "Загвар"
    },
    dashboardSearchButton: {
      label: "Хайх…"
    },
    dashboardSidebarCollapse: {
      collapse: "Хажуугийн самбарыг хураах",
      expand: "Хажуугийн самбарыг дэлгэх"
    },
    dashboardSidebarToggle: {
      close: "Хажуугийн самбарыг хаах",
      open: "Хажуугийн самбарыг нээх"
    },
    error: {
      clear: "Нүүр хуудас руу буцах"
    },
    fileUpload: {
      removeFile: "{filename} устгах"
    },
    header: {
      close: "Цэсийг хаах",
      open: "Цэсийг нээх"
    },
    inputMenu: {
      create: '"{label}" үүсгэх',
      noData: "Мэдээлэл байхгүй",
      noMatch: "Тохирох мэдээлэл олдсонгүй"
    },
    inputNumber: {
      decrement: "Хасах",
      increment: "Нэмэх"
    },
    modal: {
      close: "Хаах"
    },
    pricingTable: {
      caption: "Үнийн төлөвлөгөөний харьцуулалт"
    },
    prose: {
      codeCollapse: {
        closeText: "Хураах",
        name: "код",
        openText: "Дэлгэх"
      },
      collapsible: {
        closeText: "Нуух",
        name: "шинж чанарууд",
        openText: "Харуулах"
      },
      pre: {
        copy: "Кодыг санах ойд хуулах"
      }
    },
    selectMenu: {
      create: '"{label}" үүсгэх',
      noData: "Мэдээлэл байхгүй",
      noMatch: "Тохирох мэдээлэл олдсонгүй",
      search: "Хайх…"
    },
    slideover: {
      close: "Хаах"
    },
    table: {
      noData: "Мэдээлэл байхгүй"
    },
    toast: {
      close: "Хаах"
    }
  }
});
const ms = /* @__PURE__ */ defineLocale({
  name: "Melayu",
  code: "ms",
  messages: {
    alert: {
      close: "Tutup"
    },
    authForm: {
      hidePassword: "Sembunyikan kata laluan",
      showPassword: "Tunjukkan kata laluan",
      submit: "Teruskan"
    },
    banner: {
      close: "Tutup"
    },
    calendar: {
      nextMonth: "Bulan seterusnya",
      nextYear: "Tahun seterusnya",
      prevMonth: "Bulan sebelum",
      prevYear: "Tahun sebelum"
    },
    carousel: {
      dots: "Pilih slaid untuk dipaparkan",
      goto: "Pergi ke slaid {slide}",
      next: "Seterusnya",
      prev: "Sebelum"
    },
    chatPrompt: {
      placeholder: "Taip mesej anda di sini…"
    },
    chatPromptSubmit: {
      label: "Hantar mesej"
    },
    colorMode: {
      dark: "Gelap",
      light: "Cerah",
      switchToDark: "Tukar ke mod gelap",
      switchToLight: "Tukar ke mod cerah",
      system: "Sistem"
    },
    commandPalette: {
      back: "Kembali",
      close: "Tutup",
      noData: "Tiada data",
      noMatch: "Tiada data yang sepadan",
      placeholder: "Taip arahan atau carian…"
    },
    contentSearch: {
      links: "Pautan",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Cari…"
    },
    contentToc: {
      title: "Di halaman ini"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Cari…"
    },
    dashboardSidebarCollapse: {
      collapse: "Runtuhkan bar sisi",
      expand: "Kembangkan bar sisi"
    },
    dashboardSidebarToggle: {
      close: "Tutup bar sisi",
      open: "Buka bar sisi"
    },
    error: {
      clear: "Kembali ke laman utama"
    },
    fileUpload: {
      removeFile: "Buang {filename}"
    },
    header: {
      close: "Tutup menu",
      open: "Buka menu"
    },
    inputMenu: {
      create: 'Cipta "{label}"',
      noData: "Tiada data",
      noMatch: "Tiada data yang sepadan"
    },
    inputNumber: {
      decrement: "Kurangkan",
      increment: "Naikkan"
    },
    modal: {
      close: "Tutup"
    },
    pricingTable: {
      caption: "Perbandingan pelan harga"
    },
    prose: {
      codeCollapse: {
        closeText: "Runtuhkan",
        name: "kod",
        openText: "Kembangkan"
      },
      collapsible: {
        closeText: "Sembunyikan",
        name: "ciri",
        openText: "Tunjukkan"
      },
      pre: {
        copy: "Salin kod ke papan klip"
      }
    },
    selectMenu: {
      create: 'Cipta "{label}"',
      noData: "Tiada data",
      noMatch: "Tiada data yang sepadan",
      search: "Cari…"
    },
    slideover: {
      close: "Tutup"
    },
    table: {
      noData: "Tiada data"
    },
    toast: {
      close: "Tutup"
    }
  }
});
const nb_no = /* @__PURE__ */ defineLocale({
  name: "Norsk Bokmål",
  code: "nb-NO",
  messages: {
    alert: {
      close: "Lukk"
    },
    authForm: {
      hidePassword: "Skjul passord",
      showPassword: "Vis passord",
      submit: "Fortsett"
    },
    banner: {
      close: "Lukk"
    },
    calendar: {
      nextMonth: "Neste måned",
      nextYear: "Neste år",
      prevMonth: "Forrige måned",
      prevYear: "Forrige år"
    },
    carousel: {
      dots: "Velg lysbilde som skal vises",
      goto: "Gå til lysbilde {slide}",
      next: "Neste",
      prev: "Forrige"
    },
    chatPrompt: {
      placeholder: "Skriv din melding her…"
    },
    chatPromptSubmit: {
      label: "Send"
    },
    colorMode: {
      dark: "Mørk",
      light: "Lys",
      switchToDark: "Bytt til mørk modus",
      switchToLight: "Bytt til lys modus",
      system: "System"
    },
    commandPalette: {
      back: "Tilbake",
      close: "Lukk",
      noData: "Ingen data",
      noMatch: "Ingen samsvarende data",
      placeholder: "Skriv inn en kommando eller søk…"
    },
    contentSearch: {
      links: "Lenker",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Søk…"
    },
    contentToc: {
      title: "På denne siden"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Søk…"
    },
    dashboardSidebarCollapse: {
      collapse: "Skjul sidepanel",
      expand: "Utvid sidepanel"
    },
    dashboardSidebarToggle: {
      close: "Lukk sidepanel",
      open: "Åpne sidepanel"
    },
    error: {
      clear: "Tilbake til forsiden"
    },
    fileUpload: {
      removeFile: "Fjern {filename}"
    },
    header: {
      close: "Lukk meny",
      open: "Åpne meny"
    },
    inputMenu: {
      create: 'Opprett "{label}"',
      noData: "Ingen data",
      noMatch: "Ingen samsvarende data"
    },
    inputNumber: {
      decrement: "Reduser",
      increment: "Øk"
    },
    modal: {
      close: "Lukk"
    },
    pricingTable: {
      caption: "Prisplaneringssammenligning"
    },
    prose: {
      codeCollapse: {
        closeText: "Skjul",
        name: "kode",
        openText: "Utvid"
      },
      collapsible: {
        closeText: "Skjul",
        name: "egenskaper",
        openText: "Vis"
      },
      pre: {
        copy: "Kopier kode til utklippstavle"
      }
    },
    selectMenu: {
      create: 'Opprett "{label}"',
      noData: "Ingen data",
      noMatch: "Ingen samsvarende data",
      search: "Søk…"
    },
    slideover: {
      close: "Lukk"
    },
    table: {
      noData: "Ingen data"
    },
    toast: {
      close: "Lukk"
    }
  }
});
const nl = /* @__PURE__ */ defineLocale({
  name: "Nederlands",
  code: "nl",
  messages: {
    alert: {
      close: "Sluiten"
    },
    authForm: {
      hidePassword: "Wachtwoord verbergen",
      showPassword: "Wachtwoord tonen",
      submit: "Doorgaan"
    },
    banner: {
      close: "Sluiten"
    },
    calendar: {
      nextMonth: "Volgende maand",
      nextYear: "Volgend jaar",
      prevMonth: "Vorige maand",
      prevYear: "Vorig jaar"
    },
    carousel: {
      dots: "Kies dia om weer te geven",
      goto: "Ga naar dia {slide}",
      next: "Volgende",
      prev: "Vorige"
    },
    chatPrompt: {
      placeholder: "Schrijf hier je bericht…"
    },
    chatPromptSubmit: {
      label: "Versturen"
    },
    colorMode: {
      dark: "Donker",
      light: "Licht",
      switchToDark: "Overschakelen naar donkere modus",
      switchToLight: "Overschakelen naar lichte modus",
      system: "Systeem"
    },
    commandPalette: {
      back: "Terug",
      close: "Sluiten",
      noData: "Geen gegevens",
      noMatch: "Geen overeenkomende gegevens",
      placeholder: "Typ een commando of zoek…"
    },
    contentSearch: {
      links: "Links",
      theme: "Thema"
    },
    contentSearchButton: {
      label: "Zoeken…"
    },
    contentToc: {
      title: "Op deze pagina"
    },
    dashboardSearch: {
      theme: "Thema"
    },
    dashboardSearchButton: {
      label: "Zoeken…"
    },
    dashboardSidebarCollapse: {
      collapse: "Zijbalk invouwen",
      expand: "Zijbalk uitvouwen"
    },
    dashboardSidebarToggle: {
      close: "Zijbalk sluiten",
      open: "Zijbalk openen"
    },
    error: {
      clear: "Terug naar home"
    },
    fileUpload: {
      removeFile: "{filename} verwijderen"
    },
    header: {
      close: "Menu sluiten",
      open: "Menu openen"
    },
    inputMenu: {
      create: '"{label}" creëren',
      noData: "Geen gegevens",
      noMatch: "Geen overeenkomende gegevens"
    },
    inputNumber: {
      decrement: "Verlagen",
      increment: "Verhogen"
    },
    modal: {
      close: "Sluiten"
    },
    pricingTable: {
      caption: "Prijsplanvergelijking"
    },
    prose: {
      codeCollapse: {
        closeText: "Invouwen",
        name: "code",
        openText: "Uitvouwen"
      },
      collapsible: {
        closeText: "Verbergen",
        name: "eigenschappen",
        openText: "Tonen"
      },
      pre: {
        copy: "Code naar klembord kopiëren"
      }
    },
    selectMenu: {
      create: '"{label}" creëren',
      noData: "Geen gegevens",
      noMatch: "Geen overeenkomende gegevens",
      search: "Zoeken…"
    },
    slideover: {
      close: "Sluiten"
    },
    table: {
      noData: "Geen gegevens"
    },
    toast: {
      close: "Sluiten"
    }
  }
});
const pl = /* @__PURE__ */ defineLocale({
  name: "Polski",
  code: "pl",
  messages: {
    alert: {
      close: "Zamknij"
    },
    authForm: {
      hidePassword: "Ukryj hasło",
      showPassword: "Pokaż hasło",
      submit: "Kontynuuj"
    },
    banner: {
      close: "Zamknij"
    },
    calendar: {
      nextMonth: "Przyszły miesiąc",
      nextYear: "Przyszły rok",
      prevMonth: "Poprzedni miesiąc",
      prevYear: "Poprzedni rok"
    },
    carousel: {
      dots: "Wybierz slajd do wyświetlenia",
      goto: "Idź do {slide}",
      next: "Następny",
      prev: "Poprzedni"
    },
    chatPrompt: {
      placeholder: "Tutaj wpisz swoją wiadomość…"
    },
    chatPromptSubmit: {
      label: "Wyślij"
    },
    colorMode: {
      dark: "Ciemny",
      light: "Jasny",
      switchToDark: "Przełącz na tryb ciemny",
      switchToLight: "Przełącz na tryb jasny",
      system: "System"
    },
    commandPalette: {
      back: "Wstecz",
      close: "Zamknij",
      noData: "Brak danych",
      noMatch: "Brak pasujących danych",
      placeholder: "Wpisz polecenie lub wyszukaj…"
    },
    contentSearch: {
      links: "Linki",
      theme: "Motyw"
    },
    contentSearchButton: {
      label: "Szukaj…"
    },
    contentToc: {
      title: "Na tej stronie"
    },
    dashboardSearch: {
      theme: "Motyw"
    },
    dashboardSearchButton: {
      label: "Szukaj…"
    },
    dashboardSidebarCollapse: {
      collapse: "Zwiń pasek boczny",
      expand: "Rozwiń pasek boczny"
    },
    dashboardSidebarToggle: {
      close: "Zamknij pasek boczny",
      open: "Otwórz pasek boczny"
    },
    error: {
      clear: "Powrót do strony głównej"
    },
    fileUpload: {
      removeFile: "Usuń {filename}"
    },
    header: {
      close: "Zamknij menu",
      open: "Otwórz menu"
    },
    inputMenu: {
      create: 'Utwórz "{label}"',
      noData: "Brak danych",
      noMatch: "Brak pasujących danych"
    },
    inputNumber: {
      decrement: "Zmniejsz",
      increment: "Zwiększ"
    },
    modal: {
      close: "Zamknij"
    },
    pricingTable: {
      caption: "Porównanie planów cenowych"
    },
    prose: {
      codeCollapse: {
        closeText: "Zwiń",
        name: "kod",
        openText: "Rozwiń"
      },
      collapsible: {
        closeText: "Ukryj",
        name: "właściwości",
        openText: "Pokaż"
      },
      pre: {
        copy: "Kopiuj kod do schowka"
      }
    },
    selectMenu: {
      create: 'Utwórz "{label}"',
      noData: "Brak danych",
      noMatch: "Brak pasujących danych",
      search: "Szukaj…"
    },
    slideover: {
      close: "Zamknij"
    },
    table: {
      noData: "Brak danych"
    },
    toast: {
      close: "Zamknij"
    }
  }
});
const pt = /* @__PURE__ */ defineLocale({
  name: "Português",
  code: "pt",
  messages: {
    alert: {
      close: "Fechar"
    },
    authForm: {
      hidePassword: "Ocultar senha",
      showPassword: "Mostrar senha",
      submit: "Continuar"
    },
    banner: {
      close: "Fechar"
    },
    calendar: {
      nextMonth: "Próximo mês",
      nextYear: "Próximo ano",
      prevMonth: "Mês anterior",
      prevYear: "Ano anterior"
    },
    carousel: {
      dots: "Escolher slide para exibir",
      goto: "Ir ao diapositivo {slide}",
      next: "Próximo",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Escreva a sua mensagem aqui…"
    },
    chatPromptSubmit: {
      label: "Enviar"
    },
    colorMode: {
      dark: "Escuro",
      light: "Claro",
      switchToDark: "Mudar para modo escuro",
      switchToLight: "Mudar para modo claro",
      system: "Sistema"
    },
    commandPalette: {
      back: "Voltar",
      close: "Fechar",
      noData: "Sem dados",
      noMatch: "Nenhum dado correspondente",
      placeholder: "Digite um comando ou pesquise…"
    },
    contentSearch: {
      links: "Links",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Pesquisar…"
    },
    contentToc: {
      title: "Nesta página"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Pesquisar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Recolher barra lateral",
      expand: "Expandir barra lateral"
    },
    dashboardSidebarToggle: {
      close: "Fechar barra lateral",
      open: "Abrir barra lateral"
    },
    error: {
      clear: "Voltar para a página inicial"
    },
    fileUpload: {
      removeFile: "Remover {filename}"
    },
    header: {
      close: "Fechar menu",
      open: "Abrir menu"
    },
    inputMenu: {
      create: 'Criar "{label}"',
      noData: "Sem dados",
      noMatch: "Nenhum dado correspondente"
    },
    inputNumber: {
      decrement: "Decrementar",
      increment: "Incrementar"
    },
    modal: {
      close: "Fechar"
    },
    pricingTable: {
      caption: "Comparação de planos de preços"
    },
    prose: {
      codeCollapse: {
        closeText: "Recolher",
        name: "código",
        openText: "Expandir"
      },
      collapsible: {
        closeText: "Ocultar",
        name: "propriedades",
        openText: "Mostrar"
      },
      pre: {
        copy: "Copiar código para a área de transferência"
      }
    },
    selectMenu: {
      create: 'Criar "{label}"',
      noData: "Sem dados",
      noMatch: "Nenhum dado correspondente",
      search: "Pesquisar…"
    },
    slideover: {
      close: "Fechar"
    },
    table: {
      noData: "Sem dados"
    },
    toast: {
      close: "Fechar"
    }
  }
});
const pt_br = /* @__PURE__ */ defineLocale({
  name: "Português (Brasil)",
  code: "pt-BR",
  messages: {
    alert: {
      close: "Fechar"
    },
    authForm: {
      hidePassword: "Ocultar senha",
      showPassword: "Mostrar senha",
      submit: "Continuar"
    },
    banner: {
      close: "Fechar"
    },
    calendar: {
      nextMonth: "Próximo mês",
      nextYear: "Próximo ano",
      prevMonth: "Mês anterior",
      prevYear: "Ano anterior"
    },
    carousel: {
      dots: "Escolher slide para exibir",
      goto: "Ir para a slide {slide}",
      next: "Próximo",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Escreva sua mensagem aqui…"
    },
    chatPromptSubmit: {
      label: "Enviar"
    },
    colorMode: {
      dark: "Escuro",
      light: "Claro",
      switchToDark: "Mudar para modo escuro",
      switchToLight: "Mudar para modo claro",
      system: "Sistema"
    },
    commandPalette: {
      back: "Voltar",
      close: "Fechar",
      noData: "Nenhum dado",
      noMatch: "Nenhum dado correspondente",
      placeholder: "Digite um comando ou pesquise…"
    },
    contentSearch: {
      links: "Links",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Pesquisar…"
    },
    contentToc: {
      title: "Nesta página"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Pesquisar…"
    },
    dashboardSidebarCollapse: {
      collapse: "Recolher barra lateral",
      expand: "Expandir barra lateral"
    },
    dashboardSidebarToggle: {
      close: "Fechar barra lateral",
      open: "Abrir barra lateral"
    },
    error: {
      clear: "Voltar para a página inicial"
    },
    fileUpload: {
      removeFile: "Remover {filename}"
    },
    header: {
      close: "Fechar menu",
      open: "Abrir menu"
    },
    inputMenu: {
      create: 'Criar "{label}"',
      noData: "Nenhum dado",
      noMatch: "Nenhum dado correspondente"
    },
    inputNumber: {
      decrement: "Decrementar",
      increment: "Incrementar"
    },
    modal: {
      close: "Fechar"
    },
    pricingTable: {
      caption: "Comparação de planos de preços"
    },
    prose: {
      codeCollapse: {
        closeText: "Recolher",
        name: "código",
        openText: "Expandir"
      },
      collapsible: {
        closeText: "Ocultar",
        name: "propriedades",
        openText: "Mostrar"
      },
      pre: {
        copy: "Copiar código para a área de transferência"
      }
    },
    selectMenu: {
      create: 'Criar "{label}"',
      noData: "Nenhum dado",
      noMatch: "Nenhum dado correspondente",
      search: "Pesquisar…"
    },
    slideover: {
      close: "Fechar"
    },
    table: {
      noData: "Nenhum dado"
    },
    toast: {
      close: "Fechar"
    }
  }
});
const ro = /* @__PURE__ */ defineLocale({
  name: "Română",
  code: "ro",
  messages: {
    alert: {
      close: "Închide"
    },
    authForm: {
      hidePassword: "Ascunde parola",
      showPassword: "Arată parola",
      submit: "Continuă"
    },
    banner: {
      close: "Închide"
    },
    calendar: {
      nextMonth: "Luna următoare",
      nextYear: "Anul următor",
      prevMonth: "Luna precedentă",
      prevYear: "Anul precedent"
    },
    carousel: {
      dots: "Alegeți diapozitivul de afișat",
      goto: "Mergi la diapozitivul {slide}",
      next: "Următor",
      prev: "Anterior"
    },
    chatPrompt: {
      placeholder: "Scrieți mesajul dvs. aici…"
    },
    chatPromptSubmit: {
      label: "Trimite"
    },
    colorMode: {
      dark: "Întunecat",
      light: "Luminos",
      switchToDark: "Comută la modul întunecat",
      switchToLight: "Comută la modul luminos",
      system: "Sistem"
    },
    commandPalette: {
      back: "Înapoi",
      close: "Închide",
      noData: "Nu există date",
      noMatch: "Nu există date corespunzătoare",
      placeholder: "Tastează o comandă sau caută…"
    },
    contentSearch: {
      links: "Linkuri",
      theme: "Temă"
    },
    contentSearchButton: {
      label: "Caută…"
    },
    contentToc: {
      title: "Pe această pagină"
    },
    dashboardSearch: {
      theme: "Temă"
    },
    dashboardSearchButton: {
      label: "Caută…"
    },
    dashboardSidebarCollapse: {
      collapse: "Restrânge bara laterală",
      expand: "Extinde bara laterală"
    },
    dashboardSidebarToggle: {
      close: "Închide bara laterală",
      open: "Deschide bara laterală"
    },
    error: {
      clear: "Înapoi la pagina principală"
    },
    fileUpload: {
      removeFile: "Elimină {filename}"
    },
    header: {
      close: "Închide meniul",
      open: "Deschide meniul"
    },
    inputMenu: {
      create: 'Creează "{label}"',
      noData: "Nu există date",
      noMatch: "Nu există date corespunzătoare"
    },
    inputNumber: {
      decrement: "Scade",
      increment: "Crește"
    },
    modal: {
      close: "Închide"
    },
    pricingTable: {
      caption: "Comparare prețuri"
    },
    prose: {
      codeCollapse: {
        closeText: "Restrânge",
        name: "cod",
        openText: "Extinde"
      },
      collapsible: {
        closeText: "Ascunde",
        name: "proprietăți",
        openText: "Afișează"
      },
      pre: {
        copy: "Copiază codul în clipboard"
      }
    },
    selectMenu: {
      create: 'Creează "{label}"',
      noData: "Nu există date",
      noMatch: "Nu există date corespunzătoare",
      search: "Caută…"
    },
    slideover: {
      close: "Închide"
    },
    table: {
      noData: "Nu există date"
    },
    toast: {
      close: "Închide"
    }
  }
});
const ru = /* @__PURE__ */ defineLocale({
  name: "Русский",
  code: "ru",
  messages: {
    alert: {
      close: "Закрыть"
    },
    authForm: {
      hidePassword: "Скрыть пароль",
      showPassword: "Показать пароль",
      submit: "Продолжить"
    },
    banner: {
      close: "Закрыть"
    },
    calendar: {
      nextMonth: "Следующий месяц",
      nextYear: "Следующий год",
      prevMonth: "Предыдущий месяц",
      prevYear: "Предыдущий год"
    },
    carousel: {
      dots: "Выберите слайд для отображения",
      goto: "Перейти к {slide}",
      next: "Далее",
      prev: "Назад"
    },
    chatPrompt: {
      placeholder: "Введите ваше сообщение здесь…"
    },
    chatPromptSubmit: {
      label: "Отправить"
    },
    colorMode: {
      dark: "Тёмная",
      light: "Светлая",
      switchToDark: "Переключиться на тёмный режим",
      switchToLight: "Переключиться на светлый режим",
      system: "Системная"
    },
    commandPalette: {
      back: "Назад",
      close: "Закрыть",
      noData: "Нет данных",
      noMatch: "Совпадений не найдено",
      placeholder: "Введите команду или выполните поиск…"
    },
    contentSearch: {
      links: "Ссылки",
      theme: "Тема"
    },
    contentSearchButton: {
      label: "Поиск…"
    },
    contentToc: {
      title: "На этой странице"
    },
    dashboardSearch: {
      theme: "Тема"
    },
    dashboardSearchButton: {
      label: "Поиск…"
    },
    dashboardSidebarCollapse: {
      collapse: "Свернуть боковую панель",
      expand: "Развернуть боковую панель"
    },
    dashboardSidebarToggle: {
      close: "Закрыть боковую панель",
      open: "Открыть боковую панель"
    },
    error: {
      clear: "Вернуться на главную"
    },
    fileUpload: {
      removeFile: "Удалить {filename}"
    },
    header: {
      close: "Закрыть меню",
      open: "Открыть меню"
    },
    inputMenu: {
      create: 'Создать "{label}"',
      noData: "Нет данных",
      noMatch: "Совпадений не найдено"
    },
    inputNumber: {
      decrement: "Уменьшить",
      increment: "Увеличить"
    },
    modal: {
      close: "Закрыть"
    },
    pricingTable: {
      caption: "Сравнение ценных планов"
    },
    prose: {
      codeCollapse: {
        closeText: "Свернуть",
        name: "код",
        openText: "Развернуть"
      },
      collapsible: {
        closeText: "Скрыть",
        name: "свойства",
        openText: "Показать"
      },
      pre: {
        copy: "Скопировать код в буфер обмена"
      }
    },
    selectMenu: {
      create: 'Создать "{label}"',
      noData: "Нет данных",
      noMatch: "Совпадений не найдено",
      search: "Поиск…"
    },
    slideover: {
      close: "Закрыть"
    },
    table: {
      noData: "Нет данных"
    },
    toast: {
      close: "Закрыть"
    }
  }
});
const sk = /* @__PURE__ */ defineLocale({
  name: "Slovenčina",
  code: "sk",
  messages: {
    alert: {
      close: "Zatvoriť"
    },
    authForm: {
      hidePassword: "Skryť heslo",
      showPassword: "Zobraziť heslo",
      submit: "Pokračovať"
    },
    banner: {
      close: "Zatvoriť"
    },
    calendar: {
      nextMonth: "Nasledujúci mesiac",
      nextYear: "Nasledujúci rok",
      prevMonth: "Predchádzajúci mesiac",
      prevYear: "Predchádzajúci rok"
    },
    carousel: {
      dots: "Vyberte snímku na zobrazenie",
      goto: "Prejsť na {slide}",
      next: "Nasledujúci",
      prev: "Predchádzajúci"
    },
    chatPrompt: {
      placeholder: "Tu napíšte svoje správu…"
    },
    chatPromptSubmit: {
      label: "Odoslať"
    },
    colorMode: {
      dark: "Tmavý",
      light: "Svetlý",
      switchToDark: "Prepnúť na tmavý režim",
      switchToLight: "Prepnúť na svetlý režim",
      system: "Systém"
    },
    commandPalette: {
      back: "Späť",
      close: "Zavrieť",
      noData: "Žiadne dáta",
      noMatch: "Žiadna zhoda",
      placeholder: "Zadajte príkaz alebo vyhľadajte…"
    },
    contentSearch: {
      links: "Odkazy",
      theme: "Téma"
    },
    contentSearchButton: {
      label: "Hľadať…"
    },
    contentToc: {
      title: "Na tejto stránke"
    },
    dashboardSearch: {
      theme: "Téma"
    },
    dashboardSearchButton: {
      label: "Hľadať…"
    },
    dashboardSidebarCollapse: {
      collapse: "Zbaliť bočný panel",
      expand: "Rozbaliť bočný panel"
    },
    dashboardSidebarToggle: {
      close: "Zatvoriť bočný panel",
      open: "Otvoriť bočný panel"
    },
    error: {
      clear: "Späť na domovskú stránku"
    },
    fileUpload: {
      removeFile: "Odobrať {filename}"
    },
    header: {
      close: "Zatvoriť menu",
      open: "Otvoriť menu"
    },
    inputMenu: {
      create: 'Vytvoriť "{label}"',
      noData: "Žiadne dáta",
      noMatch: "Žiadna zhoda"
    },
    inputNumber: {
      decrement: "Znížiť",
      increment: "Zvýšiť"
    },
    modal: {
      close: "Zatvoriť"
    },
    pricingTable: {
      caption: "Porovnanie cien"
    },
    prose: {
      codeCollapse: {
        closeText: "Zbaliť",
        name: "kód",
        openText: "Rozbaliť"
      },
      collapsible: {
        closeText: "Skryť",
        name: "vlastnosti",
        openText: "Zobraziť"
      },
      pre: {
        copy: "Kopírovať kód do schránky"
      }
    },
    selectMenu: {
      create: 'Vytvoriť "{label}"',
      noData: "Žiadne dáta",
      noMatch: "Žiadna zhoda",
      search: "Hľadať…"
    },
    slideover: {
      close: "Zatvoriť"
    },
    table: {
      noData: "Žiadne dáta"
    },
    toast: {
      close: "Zatvoriť"
    }
  }
});
const sl = /* @__PURE__ */ defineLocale({
  name: "Slovenščina",
  code: "sl",
  messages: {
    alert: {
      close: "Zapri"
    },
    authForm: {
      hidePassword: "Skrij geslo",
      showPassword: "Prikaži geslo",
      submit: "Nadaljuj"
    },
    banner: {
      close: "Zapri"
    },
    calendar: {
      nextMonth: "Naslednji mesec",
      nextYear: "Naslednje leto",
      prevMonth: "Prejšnji mesec",
      prevYear: "Prejšnje leto"
    },
    carousel: {
      dots: "Izberite diapozitiv za prikaz",
      goto: "Pojdi na {slide}",
      next: "Naprej",
      prev: "Nazaj"
    },
    chatPrompt: {
      placeholder: "Tukaj napišite svoje sporočilo…"
    },
    chatPromptSubmit: {
      label: "Pošlji sporočilo"
    },
    colorMode: {
      dark: "Temno",
      light: "Svetlo",
      switchToDark: "Preklopi na temni način",
      switchToLight: "Preklopi na svetli način",
      system: "Sistem"
    },
    commandPalette: {
      back: "Nazaj",
      close: "Zapri",
      noData: "Ni podatkov",
      noMatch: "Ni ujemanj",
      placeholder: "Vpiši ukaz ali išči…"
    },
    contentSearch: {
      links: "Povezave",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Išči…"
    },
    contentToc: {
      title: "Na tej strani"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Išči…"
    },
    dashboardSidebarCollapse: {
      collapse: "Strni stransko vrstico",
      expand: "Razširi stransko vrstico"
    },
    dashboardSidebarToggle: {
      close: "Zapri stransko vrstico",
      open: "Odpri stransko vrstico"
    },
    error: {
      clear: "Nazaj na domačo stran"
    },
    fileUpload: {
      removeFile: "Odstrani {filename}"
    },
    header: {
      close: "Zapri meni",
      open: "Odpri meni"
    },
    inputMenu: {
      create: 'Ustvari "{label}"',
      noData: "Ni podatkov",
      noMatch: "Ni ujemanj"
    },
    inputNumber: {
      decrement: "Zmanjšaj",
      increment: "Povišaj"
    },
    modal: {
      close: "Zapri"
    },
    pricingTable: {
      caption: "Primerjava cenovnih načrtov"
    },
    prose: {
      codeCollapse: {
        closeText: "Strni",
        name: "koda",
        openText: "Razširi"
      },
      collapsible: {
        closeText: "Skrij",
        name: "lastnosti",
        openText: "Prikaži"
      },
      pre: {
        copy: "Kopiraj kodo v odložišče"
      }
    },
    selectMenu: {
      create: 'Ustvari "{label}"',
      noData: "Ni podatkov",
      noMatch: "Ni ujemanj",
      search: "Išči…"
    },
    slideover: {
      close: "Zapri"
    },
    table: {
      noData: "Ni podatkov"
    },
    toast: {
      close: "Zapri"
    }
  }
});
const sq = /* @__PURE__ */ defineLocale({
  name: "Shqip",
  code: "sq",
  messages: {
    alert: {
      close: "Mbyll"
    },
    authForm: {
      hidePassword: "Fshih fjalëkalimin",
      showPassword: "Shfaq fjalëkalimin",
      submit: "Vazhdo"
    },
    banner: {
      close: "Mbyll"
    },
    calendar: {
      nextMonth: "Muaji tjetër",
      nextYear: "Viti tjetër",
      prevMonth: "Muaji i kaluar",
      prevYear: "Viti i kaluar"
    },
    carousel: {
      dots: "Zgjidh slajdin për të shfaqur",
      goto: "Shko te slajdi {slide}",
      next: "Tjetri",
      prev: "Para"
    },
    chatPrompt: {
      placeholder: "Shkruaj mesazhin tënd këtu…"
    },
    chatPromptSubmit: {
      label: "Dërgo mesazhin"
    },
    colorMode: {
      dark: "Errët",
      light: "Ndritshëm",
      switchToDark: "Kalo në modalitetin e errët",
      switchToLight: "Kalo në modalitetin e ndritshëm",
      system: "Sistem"
    },
    commandPalette: {
      back: "Pas",
      close: "Mbyll",
      noData: "Nuk ka të dhëna",
      noMatch: "Nuk ka të dhëna që përputhen",
      placeholder: "Shkruaj një komandë ose kërko…"
    },
    contentSearch: {
      links: "Lidhje",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Kërko…"
    },
    contentToc: {
      title: "Në këtë faqe"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Kërko…"
    },
    dashboardSidebarCollapse: {
      collapse: "Palos panelin anësor",
      expand: "Zgjero panelin anësor"
    },
    dashboardSidebarToggle: {
      close: "Mbyll panelin anësor",
      open: "Hap panelin anësor"
    },
    error: {
      clear: "Kthehu në kryefaqe"
    },
    fileUpload: {
      removeFile: "Hiq {filename}"
    },
    header: {
      close: "Mbyll menunë",
      open: "Hap menunë"
    },
    inputMenu: {
      create: 'Krijo "{label}"',
      noData: "Nuk ka të dhëna",
      noMatch: "Nuk ka të dhëna që përputhen"
    },
    inputNumber: {
      decrement: "Zvogëlo",
      increment: "Rrit"
    },
    modal: {
      close: "Mbyll"
    },
    pricingTable: {
      caption: "Krahasimi i planeve të çmimeve"
    },
    prose: {
      codeCollapse: {
        closeText: "Palos",
        name: "kodi",
        openText: "Zgjero"
      },
      collapsible: {
        closeText: "Fshih",
        name: "vetitë",
        openText: "Shfaq"
      },
      pre: {
        copy: "Kopjo kodin në kujtesë"
      }
    },
    selectMenu: {
      create: 'Krijo "{label}"',
      noData: "Nuk ka të dhëna",
      noMatch: "Nuk ka të dhëna që përputhen",
      search: "Kërko…"
    },
    slideover: {
      close: "Mbyll"
    },
    table: {
      noData: "Nuk ka të dhëna"
    },
    toast: {
      close: "Mbyll"
    }
  }
});
const sv = /* @__PURE__ */ defineLocale({
  name: "Svenska",
  code: "sv",
  messages: {
    alert: {
      close: "Stäng"
    },
    authForm: {
      hidePassword: "Dölj lösenord",
      showPassword: "Visa lösenord",
      submit: "Fortsätt"
    },
    banner: {
      close: "Stäng"
    },
    calendar: {
      nextMonth: "Nästa månad",
      nextYear: "Nästa år",
      prevMonth: "Föregående månad",
      prevYear: "Föregående år"
    },
    carousel: {
      dots: "Välj bild att visa",
      goto: "Gå till {slide}",
      next: "Nästa",
      prev: "Föregående"
    },
    chatPrompt: {
      placeholder: "Skriv ditt meddelande här…"
    },
    chatPromptSubmit: {
      label: "Skicka"
    },
    colorMode: {
      dark: "Mörkt",
      light: "Ljust",
      switchToDark: "Byt till mörkt läge",
      switchToLight: "Byt till ljust läge",
      system: "System"
    },
    commandPalette: {
      back: "Tillbaka",
      close: "Stäng",
      noData: "Inga data",
      noMatch: "Inga matchande data",
      placeholder: "Skriv ett kommando eller sök…"
    },
    contentSearch: {
      links: "Länkar",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Sök…"
    },
    contentToc: {
      title: "På denna sida"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Sök…"
    },
    dashboardSidebarCollapse: {
      collapse: "Minimera sidofältet",
      expand: "Expandera sidofältet"
    },
    dashboardSidebarToggle: {
      close: "Stäng sidofältet",
      open: "Öppna sidofältet"
    },
    error: {
      clear: "Tillbaka till startsidan"
    },
    fileUpload: {
      removeFile: "Ta bort {filename}"
    },
    header: {
      close: "Stäng menyn",
      open: "Öppna menyn"
    },
    inputMenu: {
      create: 'Skapa "{label}"',
      noData: "Inga data",
      noMatch: "Inga matchande data"
    },
    inputNumber: {
      decrement: "Minska",
      increment: "Öka"
    },
    modal: {
      close: "Stäng"
    },
    pricingTable: {
      caption: "Prisplanering"
    },
    prose: {
      codeCollapse: {
        closeText: "Minimera",
        name: "kod",
        openText: "Expandera"
      },
      collapsible: {
        closeText: "Dölj",
        name: "egenskaper",
        openText: "Visa"
      },
      pre: {
        copy: "Kopiera kod till urklipp"
      }
    },
    selectMenu: {
      create: 'Skapa "{label}"',
      noData: "Inga data",
      noMatch: "Inga matchande data",
      search: "Sök…"
    },
    slideover: {
      close: "Stäng"
    },
    table: {
      noData: "Inga data"
    },
    toast: {
      close: "Stäng"
    }
  }
});
const th = /* @__PURE__ */ defineLocale({
  name: "ไทย",
  code: "th",
  messages: {
    alert: {
      close: "ปิด"
    },
    authForm: {
      hidePassword: "ซ่อนรหัสผ่าน",
      showPassword: "แสดงรหัสผ่าน",
      submit: "ดำเนินการต่อ"
    },
    banner: {
      close: "ปิด"
    },
    calendar: {
      nextMonth: "เดือนถัดไป",
      nextYear: "ปีถัดไป",
      prevMonth: "เดือนก่อนหน้า",
      prevYear: "ปีก่อนหน้า"
    },
    carousel: {
      dots: "เลือกสไลด์ที่จะแสดง",
      goto: "ไปที่ {slide}",
      next: "ถัดไป",
      prev: "ย้อนกลับ"
    },
    chatPrompt: {
      placeholder: "กรุณาป้อนข้อความของคุณที่นี่…"
    },
    chatPromptSubmit: {
      label: "ส่ง"
    },
    colorMode: {
      dark: "มืด",
      light: "สว่าง",
      switchToDark: "เปลี่ยนเป็นโหมดมืด",
      switchToLight: "เปลี่ยนเป็นโหมดสว่าง",
      system: "ระบบ"
    },
    commandPalette: {
      back: "ย้อนกลับ",
      close: "ปิด",
      noData: "ไม่มีข้อมูล",
      noMatch: "ไม่พบข้อมูลที่ตรงกัน",
      placeholder: "พิมพ์คำสั่งหรือค้นหา…"
    },
    contentSearch: {
      links: "ลิงก์",
      theme: "ธีม"
    },
    contentSearchButton: {
      label: "ค้นหา…"
    },
    contentToc: {
      title: "ในหน้านี้"
    },
    dashboardSearch: {
      theme: "ธีม"
    },
    dashboardSearchButton: {
      label: "ค้นหา…"
    },
    dashboardSidebarCollapse: {
      collapse: "ย่อแถบด้านข้าง",
      expand: "ขยายแถบด้านข้าง"
    },
    dashboardSidebarToggle: {
      close: "ปิดแถบด้านข้าง",
      open: "เปิดแถบด้านข้าง"
    },
    error: {
      clear: "กลับไปยังหน้าหลัก"
    },
    fileUpload: {
      removeFile: "ลบ {filename}"
    },
    header: {
      close: "ปิดเมนู",
      open: "เปิดเมนู"
    },
    inputMenu: {
      create: 'สร้าง "{label}"',
      noData: "ไม่มีข้อมูล",
      noMatch: "ไม่พบข้อมูลที่ตรงกัน"
    },
    inputNumber: {
      decrement: "ลด",
      increment: "เพิ่ม"
    },
    modal: {
      close: "ปิด"
    },
    pricingTable: {
      caption: "การเปรียบเทียบราคาสินค้า"
    },
    prose: {
      codeCollapse: {
        closeText: "ย่อ",
        name: "โค้ด",
        openText: "ขยาย"
      },
      collapsible: {
        closeText: "ซ่อน",
        name: "คุณสมบัติ",
        openText: "แสดง"
      },
      pre: {
        copy: "คัดลอกโค้ดไปยังคลิปบอร์ด"
      }
    },
    selectMenu: {
      create: 'สร้าง "{label}"',
      noData: "ไม่มีข้อมูล",
      noMatch: "ไม่พบข้อมูลที่ตรงกัน",
      search: "ค้นหา…"
    },
    slideover: {
      close: "ปิด"
    },
    table: {
      noData: "ไม่มีข้อมูล"
    },
    toast: {
      close: "ปิด"
    }
  }
});
const tj = /* @__PURE__ */ defineLocale({
  name: "Тоҷикӣ",
  code: "tj",
  messages: {
    alert: {
      close: "Бастан"
    },
    authForm: {
      hidePassword: "Пинҳон кардани парол",
      showPassword: "Намоиши парол",
      submit: "Идома додан"
    },
    banner: {
      close: "Пӯшидан"
    },
    calendar: {
      nextMonth: "Моҳи оянда",
      nextYear: "Соли оянда",
      prevMonth: "Моҳи гузашта",
      prevYear: "Соли гузашта"
    },
    carousel: {
      dots: "Слайдро барои намоиш интихоб кунед",
      goto: "Ба слайди {slide} гузаред",
      next: "Баъдӣ",
      prev: "Қаблӣ"
    },
    chatPrompt: {
      placeholder: "Пайём ворид кунед…"
    },
    chatPromptSubmit: {
      label: "Фиристодан"
    },
    colorMode: {
      dark: "Торик",
      light: "Рӯшно",
      switchToDark: "Гузариш ба ҳолати торик",
      switchToLight: "Гузариш ба ҳолати рӯшно",
      system: "Система"
    },
    commandPalette: {
      back: "Бозгашт",
      close: "Бастан",
      noData: "Маълумот нест",
      noMatch: "Маълумоти мувофиқ ёфт нашуд",
      placeholder: "Фармонро нависед ё ҷустуҷӯ кунед…"
    },
    contentSearch: {
      links: "Пайвандҳо",
      theme: "Мавзӯъ"
    },
    contentSearchButton: {
      label: "Ҷустуҷӯ"
    },
    contentToc: {
      title: "Мундариҷа"
    },
    dashboardSearch: {
      theme: "Мавзӯъ"
    },
    dashboardSearchButton: {
      label: "Ҷустуҷӯ"
    },
    dashboardSidebarCollapse: {
      collapse: "Кам кардан",
      expand: "Васеъ кардан"
    },
    dashboardSidebarToggle: {
      close: "Пӯшидан",
      open: "Кушодан"
    },
    error: {
      clear: "Тоза кардан"
    },
    fileUpload: {
      removeFile: "{filename}-ро хориҷ кунед"
    },
    header: {
      close: "Пӯшидан",
      open: "Кушодан"
    },
    inputMenu: {
      create: '"{label}" созед',
      noData: "Маълумот нест",
      noMatch: "Маълумоти мувофиқ ёфт нашуд"
    },
    inputNumber: {
      decrement: "Кам кардан",
      increment: "Зиёд кардан"
    },
    modal: {
      close: "Бастан"
    },
    pricingTable: {
      caption: "Ҷадвали нархҳо"
    },
    prose: {
      codeCollapse: {
        closeText: "Кам кардан",
        name: "код",
        openText: "Васеъ кардан"
      },
      collapsible: {
        closeText: "Пинҳон кардан",
        name: "хусусиятҳо",
        openText: "Намоиш додан"
      },
      pre: {
        copy: "Нусха бардоштан"
      }
    },
    selectMenu: {
      create: '"{label}" созед',
      noData: "Маълумот нест",
      noMatch: "Маълумоти мувофиқ ёфт нашуд",
      search: "Ҷустуҷӯ…"
    },
    slideover: {
      close: "Бастан"
    },
    table: {
      noData: "Маълумот нест"
    },
    toast: {
      close: "Бастан"
    }
  }
});
const tr = /* @__PURE__ */ defineLocale({
  name: "Türkçe",
  code: "tr",
  messages: {
    alert: {
      close: "Kapat"
    },
    authForm: {
      hidePassword: "Şifreyi gizle",
      showPassword: "Şifreyi göster",
      submit: "Devam et"
    },
    banner: {
      close: "Kapat"
    },
    calendar: {
      nextMonth: "Sonraki ay",
      nextYear: "Sonraki yıl",
      prevMonth: "Önceki ay",
      prevYear: "Önceki yıl"
    },
    carousel: {
      dots: "Görüntülenecek slaydı seçin",
      goto: "{slide}. slayda git",
      next: "Sonraki",
      prev: "Önceki"
    },
    chatPrompt: {
      placeholder: "Buraya mesajınızı yazın…"
    },
    chatPromptSubmit: {
      label: "Gönder"
    },
    colorMode: {
      dark: "Koyu",
      light: "Açık",
      switchToDark: "Koyu moda geç",
      switchToLight: "Açık moda geç",
      system: "Sistem"
    },
    commandPalette: {
      back: "Geri",
      close: "Kapat",
      noData: "Veri yok",
      noMatch: "Eşleşen veri yok",
      placeholder: "Bir komut yazın veya arama yapın…"
    },
    contentSearch: {
      links: "Bağlantılar",
      theme: "Tema"
    },
    contentSearchButton: {
      label: "Ara…"
    },
    contentToc: {
      title: "Bu sayfada"
    },
    dashboardSearch: {
      theme: "Tema"
    },
    dashboardSearchButton: {
      label: "Ara…"
    },
    dashboardSidebarCollapse: {
      collapse: "Kenar çubuğunu daralt",
      expand: "Kenar çubuğunu genişlet"
    },
    dashboardSidebarToggle: {
      close: "Kenar çubuğunu kapat",
      open: "Kenar çubuğunu aç"
    },
    error: {
      clear: "Ana sayfaya dön"
    },
    fileUpload: {
      removeFile: "{filename} kaldır"
    },
    header: {
      close: "Menüyü kapat",
      open: "Menüyü aç"
    },
    inputMenu: {
      create: '"{label}" oluştur',
      noData: "Veri yok",
      noMatch: "Eşleşen veri yok"
    },
    inputNumber: {
      decrement: "Azalt",
      increment: "Arttır"
    },
    modal: {
      close: "Kapat"
    },
    pricingTable: {
      caption: "Fiyat planlarını karşılaştır"
    },
    prose: {
      codeCollapse: {
        closeText: "Daralt",
        name: "kod",
        openText: "Genişlet"
      },
      collapsible: {
        closeText: "Gizle",
        name: "özellikler",
        openText: "Göster"
      },
      pre: {
        copy: "Kodu panoya kopyala"
      }
    },
    selectMenu: {
      create: '"{label}" oluştur',
      noData: "Veri yok",
      noMatch: "Eşleşen veri yok",
      search: "Ara…"
    },
    slideover: {
      close: "Kapat"
    },
    table: {
      noData: "Veri yok"
    },
    toast: {
      close: "Kapat"
    }
  }
});
const ug_cn = /* @__PURE__ */ defineLocale({
  name: "ئۇيغۇرچە",
  code: "ug-CN",
  dir: "rtl",
  messages: {
    alert: {
      close: "تاقاش"
    },
    authForm: {
      hidePassword: "پارولنى يوشۇرۇش",
      showPassword: "پارولنى كۆرسىتىش",
      submit: "دەۋام قىلىش"
    },
    banner: {
      close: "تاقاش"
    },
    calendar: {
      nextMonth: "كېلەر ئاي",
      nextYear: "كېلەر يىل",
      prevMonth: "ئالدىنقى ئاي",
      prevYear: "ئالدىنقى يىل"
    },
    carousel: {
      dots: "كۆرسىتىدىغان سلايدنى تاللاڭ",
      goto: "{slide}-بەتكە ئاتلاش",
      next: "كېيىنكى بەت",
      prev: "ئالدىنقى بەت"
    },
    chatPrompt: {
      placeholder: "خەت كىرگۈزۈڭ…"
    },
    chatPromptSubmit: {
      label: "يوللاش"
    },
    colorMode: {
      dark: "قاراڭغۇ",
      light: "يورۇق",
      switchToDark: "قاراڭغۇ ھالەتكە ئالماشتۇرۇش",
      switchToLight: "يورۇق ھالەتكە ئالماشتۇرۇش",
      system: "سىستېما"
    },
    commandPalette: {
      back: "قايتىش",
      close: "تاقاش",
      noData: "سانلىق مەلۇمات يوق",
      noMatch: "ماس كېلىدىغان سانلىق مەلۇمات يوق",
      placeholder: "بۇيرۇق كىرگۈزۈڭ ياكى ئىزدەڭ…"
    },
    contentSearch: {
      links: "ئۇلانمىلار",
      theme: "تېما"
    },
    contentSearchButton: {
      label: "ئىزدەش"
    },
    contentToc: {
      title: "مەزمۇن"
    },
    dashboardSearch: {
      theme: "تېما"
    },
    dashboardSearchButton: {
      label: "ئىزدەش"
    },
    dashboardSidebarCollapse: {
      collapse: "تارايتىش",
      expand: "كېڭەيتىش"
    },
    dashboardSidebarToggle: {
      close: "تاقاش",
      open: "ئېچىش"
    },
    error: {
      clear: "تازىلاش"
    },
    fileUpload: {
      removeFile: "{filename} ئۆچۈرۈش"
    },
    header: {
      close: "تاقاش",
      open: "ئېچىش"
    },
    inputMenu: {
      create: '"{label}" نى قۇرۇش',
      noData: "سانلىق مەلۇمات يوق",
      noMatch: "ماس كېلىدىغان سانلىق مەلۇمات يوق"
    },
    inputNumber: {
      decrement: "ئازايتىش",
      increment: "كۆپەيتىش"
    },
    modal: {
      close: "تاقاش"
    },
    pricingTable: {
      caption: "باھا جەدۋىلى"
    },
    prose: {
      codeCollapse: {
        closeText: "تارايتىش",
        name: "كود",
        openText: "كېڭەيتىش"
      },
      collapsible: {
        closeText: "يوشۇرۇش",
        name: "خاسلىقلار",
        openText: "كۆرسىتىش"
      },
      pre: {
        copy: "كۆچۈرۈش"
      }
    },
    selectMenu: {
      create: '"{label}" نى قۇرۇش',
      noData: "سانلىق مەلۇمات يوق",
      noMatch: "ماس كېلىدىغان سانلىق مەلۇمات يوق",
      search: "ئىزدەش…"
    },
    slideover: {
      close: "تاقاش"
    },
    table: {
      noData: "سانلىق مەلۇمات يوق"
    },
    toast: {
      close: "تاقاش"
    }
  }
});
const uk = /* @__PURE__ */ defineLocale({
  name: "Українська",
  code: "uk",
  messages: {
    alert: {
      close: "Закрити"
    },
    authForm: {
      hidePassword: "Приховати пароль",
      showPassword: "Показати пароль",
      submit: "Продовжити"
    },
    banner: {
      close: "Закрити"
    },
    calendar: {
      nextMonth: "Наступний місяць",
      nextYear: "Наступний рік",
      prevMonth: "Попередній місяць",
      prevYear: "Попередній рік"
    },
    carousel: {
      dots: "Виберіть слайд для відображення",
      goto: "Перейти до {slide}",
      next: "Далі",
      prev: "Назад"
    },
    chatPrompt: {
      placeholder: "Введіть ваше повідомлення тут…"
    },
    chatPromptSubmit: {
      label: "Відправити"
    },
    colorMode: {
      dark: "Темна",
      light: "Світла",
      switchToDark: "Перейти до темного режиму",
      switchToLight: "Перейти до світлого режиму",
      system: "Системна"
    },
    commandPalette: {
      back: "Назад",
      close: "Закрити",
      noData: "Немає даних",
      noMatch: "Збігів не знайдено",
      placeholder: "Введіть команду або шукайте…"
    },
    contentSearch: {
      links: "Посилання",
      theme: "Тема"
    },
    contentSearchButton: {
      label: "Пошук…"
    },
    contentToc: {
      title: "На цій сторінці"
    },
    dashboardSearch: {
      theme: "Тема"
    },
    dashboardSearchButton: {
      label: "Пошук…"
    },
    dashboardSidebarCollapse: {
      collapse: "Згорнути бічну панель",
      expand: "Розгорнути бічну панель"
    },
    dashboardSidebarToggle: {
      close: "Закрити бічну панель",
      open: "Відкрити бічну панель"
    },
    error: {
      clear: "Повернутися на головну"
    },
    fileUpload: {
      removeFile: "Видалити {filename}"
    },
    header: {
      close: "Закрити меню",
      open: "Відкрити меню"
    },
    inputMenu: {
      create: 'Створити "{label}"',
      noData: "Немає даних",
      noMatch: "Збігів не знайдено"
    },
    inputNumber: {
      decrement: "Зменшити",
      increment: "Збільшити"
    },
    modal: {
      close: "Закрити"
    },
    pricingTable: {
      caption: "Порівняння планів цін"
    },
    prose: {
      codeCollapse: {
        closeText: "Згорнути",
        name: "код",
        openText: "Розгорнути"
      },
      collapsible: {
        closeText: "Сховати",
        name: "властивості",
        openText: "Показати"
      },
      pre: {
        copy: "Копіювати код у буфер обміну"
      }
    },
    selectMenu: {
      create: 'Створити "{label}"',
      noData: "Немає даних",
      noMatch: "Збігів не знайдено",
      search: "Пошук…"
    },
    slideover: {
      close: "Закрити"
    },
    table: {
      noData: "Немає даних"
    },
    toast: {
      close: "Закрити"
    }
  }
});
const ur = /* @__PURE__ */ defineLocale({
  name: "Urdu",
  code: "ur",
  dir: "rtl",
  messages: {
    alert: {
      close: "بند کریں"
    },
    authForm: {
      hidePassword: "پاس ورڈ چھپائیں",
      showPassword: "پاس ورڈ دکھائیں",
      submit: "جاری رکھیں"
    },
    banner: {
      close: "بند کریں"
    },
    calendar: {
      nextMonth: "اگلا مہینہ",
      nextYear: "اگلا سال",
      prevMonth: "پچھلا مہینہ",
      prevYear: "پچھلا سال"
    },
    carousel: {
      dots: "دکھانے کے لیے سلائیڈ منتخب کریں",
      goto: "سلائیڈ {slide} پر جائیں",
      next: "اگلا",
      prev: "پچھلا"
    },
    chatPrompt: {
      placeholder: "یہاں اپنا پیغام لکھیں"
    },
    chatPromptSubmit: {
      label: "پیغام بھیجیں"
    },
    colorMode: {
      dark: "تاریک",
      light: "روشن",
      switchToDark: "تاریک موڈ میں تبدیل کریں",
      switchToLight: "روشن موڈ میں تبدیل کریں",
      system: "سسٹم"
    },
    commandPalette: {
      back: "واپس",
      close: "بند کریں",
      noData: "کوئی ڈیٹا نہیں",
      noMatch: "کوئی ملتا جلتا ڈیٹا نہیں ملا",
      placeholder: "کمانڈ ٹائپ کریں یا تلاش کریں…"
    },
    contentSearch: {
      links: "لنکس",
      theme: "تھیم"
    },
    contentSearchButton: {
      label: "تلاش کریں…"
    },
    contentToc: {
      title: "اس صفحے پر"
    },
    dashboardSearch: {
      theme: "تھیم"
    },
    dashboardSearchButton: {
      label: "تلاش کریں…"
    },
    dashboardSidebarCollapse: {
      collapse: "سائیڈ بار کو سکیڑیں",
      expand: "سائیڈ بار کو پھیلائیں"
    },
    dashboardSidebarToggle: {
      close: "سائیڈ بار بند کریں",
      open: "سائیڈ بار کھولیں"
    },
    error: {
      clear: "ہوم پیج پر واپس جائیں"
    },
    fileUpload: {
      removeFile: "{filename} ہٹائیں"
    },
    header: {
      close: "مینو بند کریں",
      open: "مینو کھولیں"
    },
    inputMenu: {
      create: '"{label}" بنائیں',
      noData: "کوئی ڈیٹا نہیں",
      noMatch: "کوئی ملتا جلتا ڈیٹا نہیں ملا"
    },
    inputNumber: {
      decrement: "کمی",
      increment: "اضافہ"
    },
    modal: {
      close: "بند کریں"
    },
    pricingTable: {
      caption: "قیمت پلنز کی مقایسہ"
    },
    prose: {
      codeCollapse: {
        closeText: "سکیڑیں",
        name: "کوڈ",
        openText: "پھیلائیں"
      },
      collapsible: {
        closeText: "چھپائیں",
        name: "خصوصیات",
        openText: "دکھائیں"
      },
      pre: {
        copy: "کوڈ کاپی کریں"
      }
    },
    selectMenu: {
      create: '"{label}" بنائیں',
      noData: "کوئی ڈیٹا نہیں",
      noMatch: "کوئی ملتا جلتا ڈیٹا نہیں ملا",
      search: "تلاش کریں…"
    },
    slideover: {
      close: "بند کریں"
    },
    table: {
      noData: "کوئی ڈیٹا نہیں"
    },
    toast: {
      close: "بند کریں"
    }
  }
});
const uz = /* @__PURE__ */ defineLocale({
  name: "Oʻzbek",
  code: "uz",
  messages: {
    alert: {
      close: "Yopish"
    },
    authForm: {
      hidePassword: "Parolni yashirish",
      showPassword: "Parolni ko'rsatish",
      submit: "Davom etish"
    },
    banner: {
      close: "Yopish"
    },
    calendar: {
      nextMonth: "Keyingi oy",
      nextYear: "Keyingi yil",
      prevMonth: "Oldingi oy",
      prevYear: "Oldingi yil"
    },
    carousel: {
      dots: "Koʻrsatish uchun slaydni tanlang",
      goto: "{slide}-slaydga o'tish",
      next: "Oldinga",
      prev: "Ortga"
    },
    chatPrompt: {
      placeholder: "Bu yerda savolingizni yozing…"
    },
    chatPromptSubmit: {
      label: "Jo'natish"
    },
    colorMode: {
      dark: "Qorong'i",
      light: "Yorug'",
      switchToDark: "Qorong'i rejimga o'tish",
      switchToLight: "Yorug' rejimga o'tish",
      system: "Tizim"
    },
    commandPalette: {
      back: "Orqaga",
      close: "Yopish",
      noData: "Maʼlumot yoʻq",
      noMatch: "Mos keluvchi natija topilmadi",
      placeholder: "Buyruq kiriting yoki qidiring…"
    },
    contentSearch: {
      links: "Havolalar",
      theme: "Mavzu"
    },
    contentSearchButton: {
      label: "Qidirish…"
    },
    contentToc: {
      title: "Ushbu sahifada"
    },
    dashboardSearch: {
      theme: "Mavzu"
    },
    dashboardSearchButton: {
      label: "Qidirish…"
    },
    dashboardSidebarCollapse: {
      collapse: "Yon panelni yig'ish",
      expand: "Yon panelni kengaytirish"
    },
    dashboardSidebarToggle: {
      close: "Yon panelni yopish",
      open: "Yon panelni ochish"
    },
    error: {
      clear: "Bosh sahifaga qaytish"
    },
    fileUpload: {
      removeFile: "{filename}ni oʻchirish"
    },
    header: {
      close: "Menyuni yopish",
      open: "Menyuni ochish"
    },
    inputMenu: {
      create: '"{label}" yaratish',
      noData: "Maʼlumot yoʻq",
      noMatch: "Mos keluvchi natija topilmadi"
    },
    inputNumber: {
      decrement: "Ayirish",
      increment: "Qoʻshish"
    },
    modal: {
      close: "Yopish"
    },
    pricingTable: {
      caption: "Narx planlarini taqqoslash"
    },
    prose: {
      codeCollapse: {
        closeText: "Yig'ish",
        name: "kod",
        openText: "Kengaytirish"
      },
      collapsible: {
        closeText: "Yashirish",
        name: "xususiyatlar",
        openText: "Ko'rsatish"
      },
      pre: {
        copy: "Koddan buferga nusxa olish"
      }
    },
    selectMenu: {
      create: '"{label}" yaratish',
      noData: "Maʼlumot yoʻq",
      noMatch: "Mos keluvchi natija topilmadi",
      search: "Qidirish…"
    },
    slideover: {
      close: "Yopish"
    },
    table: {
      noData: "Maʼlumot yoʻq"
    },
    toast: {
      close: "Yopish"
    }
  }
});
const vi = /* @__PURE__ */ defineLocale({
  name: "Tiếng Việt",
  code: "vi",
  messages: {
    alert: {
      close: "Đóng"
    },
    authForm: {
      hidePassword: "Ẩn mật khẩu",
      showPassword: "Hiển thị mật khẩu",
      submit: "Tiếp tục"
    },
    banner: {
      close: "Đóng"
    },
    calendar: {
      nextMonth: "Tháng sau",
      nextYear: "Năm sau",
      prevMonth: "Tháng trước",
      prevYear: "Năm trước"
    },
    carousel: {
      dots: "Chọn slide để hiển thị",
      goto: "Đi tới ô {slide}",
      next: "Sau",
      prev: "Trước"
    },
    chatPrompt: {
      placeholder: "Nhập tin nhắn của bạn ở đây…"
    },
    chatPromptSubmit: {
      label: "Gửi"
    },
    colorMode: {
      dark: "Tối",
      light: "Sáng",
      switchToDark: "Chuyển sang chế độ tối",
      switchToLight: "Chuyển sang chế độ sáng",
      system: "Hệ thống"
    },
    commandPalette: {
      back: "Quay lại",
      close: "Đóng",
      noData: "Không có dữ liệu",
      noMatch: "Không có kết quả phù hợp",
      placeholder: "Nhập lệnh hoặc tìm kiếm…"
    },
    contentSearch: {
      links: "Liên kết",
      theme: "Chủ đề"
    },
    contentSearchButton: {
      label: "Tìm kiếm…"
    },
    contentToc: {
      title: "Trong trang này"
    },
    dashboardSearch: {
      theme: "Chủ đề"
    },
    dashboardSearchButton: {
      label: "Tìm kiếm…"
    },
    dashboardSidebarCollapse: {
      collapse: "Thu gọn thanh bên",
      expand: "Mở rộng thanh bên"
    },
    dashboardSidebarToggle: {
      close: "Đóng thanh bên",
      open: "Mở thanh bên"
    },
    error: {
      clear: "Quay lại trang chủ"
    },
    fileUpload: {
      removeFile: "Xóa {filename}"
    },
    header: {
      close: "Đóng menu",
      open: "Mở menu"
    },
    inputMenu: {
      create: 'Tạo "{label}"',
      noData: "Không có dữ liệu",
      noMatch: "Không có kết quả phù hợp"
    },
    inputNumber: {
      decrement: "Giảm",
      increment: "Tăng"
    },
    modal: {
      close: "Đóng"
    },
    pricingTable: {
      caption: "So sánh các kế hoạch giá"
    },
    prose: {
      codeCollapse: {
        closeText: "Thu gọn",
        name: "mã",
        openText: "Mở rộng"
      },
      collapsible: {
        closeText: "Ẩn",
        name: "thuộc tính",
        openText: "Hiển thị"
      },
      pre: {
        copy: "Sao chép mã vào bộ nhớ tạm"
      }
    },
    selectMenu: {
      create: 'Tạo "{label}"',
      noData: "Không có dữ liệu",
      noMatch: "Không có kết quả phù hợp",
      search: "Tìm kiếm…"
    },
    slideover: {
      close: "Đóng"
    },
    table: {
      noData: "Không có dữ liệu"
    },
    toast: {
      close: "Đóng"
    }
  }
});
const zh_cn = /* @__PURE__ */ defineLocale({
  name: "简体中文",
  code: "zh-CN",
  messages: {
    alert: {
      close: "关闭"
    },
    authForm: {
      hidePassword: "隐藏密码",
      showPassword: "显示密码",
      submit: "继续"
    },
    banner: {
      close: "关闭"
    },
    calendar: {
      nextMonth: "下个月",
      nextYear: "明年",
      prevMonth: "上个月",
      prevYear: "去年"
    },
    carousel: {
      dots: "选择要显示的幻灯片",
      goto: "跳转到第 {slide} 页",
      next: "下一页",
      prev: "上一页"
    },
    chatPrompt: {
      placeholder: "在这里输入你的消息…"
    },
    chatPromptSubmit: {
      label: "发送"
    },
    colorMode: {
      dark: "深色",
      light: "浅色",
      switchToDark: "切换到深色模式",
      switchToLight: "切换到浅色模式",
      system: "系统"
    },
    commandPalette: {
      back: "返回",
      close: "关闭",
      noData: "没有数据",
      noMatch: "没有匹配的数据",
      placeholder: "输入命令或搜索…"
    },
    contentSearch: {
      links: "链接",
      theme: "主题"
    },
    contentSearchButton: {
      label: "搜索…"
    },
    contentToc: {
      title: "本页内容"
    },
    dashboardSearch: {
      theme: "主题"
    },
    dashboardSearchButton: {
      label: "搜索…"
    },
    dashboardSidebarCollapse: {
      collapse: "收起侧边栏",
      expand: "展开侧边栏"
    },
    dashboardSidebarToggle: {
      close: "关闭侧边栏",
      open: "打开侧边栏"
    },
    error: {
      clear: "返回首页"
    },
    fileUpload: {
      removeFile: "删除 {filename}"
    },
    header: {
      close: "关闭菜单",
      open: "打开菜单"
    },
    inputMenu: {
      create: '创建 "{label}"',
      noData: "没有数据",
      noMatch: "没有匹配的数据"
    },
    inputNumber: {
      decrement: "减少",
      increment: "增加"
    },
    modal: {
      close: "关闭"
    },
    pricingTable: {
      caption: "价格计划比较"
    },
    prose: {
      codeCollapse: {
        closeText: "收起",
        name: "代码",
        openText: "展开"
      },
      collapsible: {
        closeText: "隐藏",
        name: "属性",
        openText: "显示"
      },
      pre: {
        copy: "复制代码到剪贴板"
      }
    },
    selectMenu: {
      create: '创建 "{label}"',
      noData: "没有数据",
      noMatch: "没有匹配的数据",
      search: "搜索…"
    },
    slideover: {
      close: "关闭"
    },
    table: {
      noData: "没有数据"
    },
    toast: {
      close: "关闭"
    }
  }
});
const zh_tw = /* @__PURE__ */ defineLocale({
  name: "繁體中文",
  code: "zh-TW",
  messages: {
    alert: {
      close: "關閉"
    },
    authForm: {
      hidePassword: "隱藏密碼",
      showPassword: "顯示密碼",
      submit: "繼續"
    },
    banner: {
      close: "關閉"
    },
    calendar: {
      nextMonth: "下個月",
      nextYear: "明年",
      prevMonth: "上個月",
      prevYear: "去年"
    },
    carousel: {
      dots: "選擇要顯示的投影片",
      goto: "跳轉到第 {slide} 頁",
      next: "下一頁",
      prev: "上一頁"
    },
    chatPrompt: {
      placeholder: "在這裡輸入你的消息…"
    },
    chatPromptSubmit: {
      label: "發送"
    },
    colorMode: {
      dark: "深色",
      light: "淺色",
      switchToDark: "切換到深色模式",
      switchToLight: "切換到淺色模式",
      system: "系統"
    },
    commandPalette: {
      back: "返回",
      close: "關閉",
      noData: "沒有資料",
      noMatch: "沒有相符的資料",
      placeholder: "輸入命令或搜尋…"
    },
    contentSearch: {
      links: "連結",
      theme: "主題"
    },
    contentSearchButton: {
      label: "搜尋…"
    },
    contentToc: {
      title: "本頁內容"
    },
    dashboardSearch: {
      theme: "主題"
    },
    dashboardSearchButton: {
      label: "搜尋…"
    },
    dashboardSidebarCollapse: {
      collapse: "收起側邊欄",
      expand: "展開側邊欄"
    },
    dashboardSidebarToggle: {
      close: "關閉側邊欄",
      open: "開啟側邊欄"
    },
    error: {
      clear: "返回首頁"
    },
    fileUpload: {
      removeFile: "移除 {filename}"
    },
    header: {
      close: "關閉選單",
      open: "開啟選單"
    },
    inputMenu: {
      create: "建立「{label}」",
      noData: "沒有資料",
      noMatch: "沒有相符的資料"
    },
    inputNumber: {
      decrement: "減少",
      increment: "增加"
    },
    modal: {
      close: "關閉"
    },
    pricingTable: {
      caption: "價格計畫比較"
    },
    prose: {
      codeCollapse: {
        closeText: "收起",
        name: "程式碼",
        openText: "展開"
      },
      collapsible: {
        closeText: "隱藏",
        name: "屬性",
        openText: "顯示"
      },
      pre: {
        copy: "複製程式碼到剪貼簿"
      }
    },
    selectMenu: {
      create: "建立「{label}」",
      noData: "沒有資料",
      noMatch: "沒有相符的資料",
      search: "搜尋…"
    },
    slideover: {
      close: "關閉"
    },
    table: {
      noData: "沒有資料"
    },
    toast: {
      close: "關閉"
    }
  }
});
const locales = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ar,
  az,
  bg,
  bn,
  ca,
  ckb,
  cs,
  da,
  de,
  de_ch,
  el,
  en,
  es,
  et,
  fa_ir,
  fi,
  fr,
  gl,
  he,
  hi,
  hr,
  hu,
  hy,
  id,
  it,
  ja,
  ka,
  kk,
  km,
  ko,
  ky,
  lb,
  lt,
  mn,
  ms,
  nb_no,
  nl,
  pl,
  pt,
  pt_br,
  ro,
  ru,
  sk,
  sl,
  sq,
  sv,
  th,
  tj,
  tr,
  ug_cn,
  uk,
  ur,
  uz,
  vi,
  zh_cn,
  zh_tw
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, t } = useI18n();
    const getLocale2 = (_l) => {
      const map = {
        fa: "fa_ir"
      };
      return locales[map[_l] || _l];
    };
    const resolvedLocale = computed(() => getLocale2(locale.value));
    const lang = computed(() => resolvedLocale.value.code);
    const dir = computed(() => resolvedLocale.value.dir);
    useHead({
      htmlAttrs: {
        lang,
        dir
      },
      titleTemplate: (titleChunk) => {
        const siteName = t("common.site_title");
        const separator2 = "-";
        return titleChunk ? `${titleChunk} ${separator2} ${siteName}` : siteName;
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0f52ba" }
      ]
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = __nuxt_component_0$1;
      const _component_PreLoading = __nuxt_component_1;
      const _component_NuxtLoadingIndicator = __nuxt_component_2;
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_4;
      const _component_ModalSignup = __nuxt_component_5;
      const _component_ModalSignin = __nuxt_component_6;
      const _component_Modal2faCode = __nuxt_component_7;
      const _component_ModalProfileSetup = __nuxt_component_8;
      _push(ssrRenderComponent(_component_UApp, mergeProps({ locale: unref(resolvedLocale) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PreLoading, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLoadingIndicator, {
              class: "bg-primary dark:bg-primary-300",
              color: false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLayout, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalSignup, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalSignin, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Modal2faCode, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalProfileSetup, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PreLoading),
              createVNode(_component_NuxtLoadingIndicator, {
                class: "bg-primary dark:bg-primary-300",
                color: false
              }),
              createVNode(_component_NuxtLayout, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              }),
              createVNode(_component_ModalSignup),
              createVNode(_component_ModalSignin),
              createVNode(_component_Modal2faCode),
              createVNode(_component_ModalProfileSetup)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$2 = {
  __name: "UCard",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig2 = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig2.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] })
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
            if (!!slots.default) {
              _push2(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
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
              !!slots.default ? (openBlock(), createBlock("div", {
                key: 1,
                "data-slot": "body",
                class: ui.value.body({ class: props.ui?.body })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("", true),
              !!slots.footer ? (openBlock(), createBlock("div", {
                key: 2,
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
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    const { t, locale } = useI18n();
    const redirectHome = () => clearError({ redirect: useLocalePath()(props.error.data?.returnRoute || "index") });
    const isRTL = computed(() => ["fa", "ar"].includes(locale.value));
    useHead({
      htmlAttrs: {
        dir: isRTL.value ? "rtl" : "ltr",
        lang: locale.value
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_UCard = _sfc_main$2;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCard, { class: "w-full max-w-lg shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center space-y-4 py-6"${_scopeId2}><div class="text-red-500 text-5xl font-bold"${_scopeId2}>${ssrInterpolate(__props.error?.statusCode || "Error")}</div><h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100"${_scopeId2}>${ssrInterpolate(__props.error?.message)}</h1>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: redirectHome,
                    size: "md",
                    color: "primary",
                    icon: "mdi:home-outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("navigation.home"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString$1(unref(t)("navigation.home")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center space-y-4 py-6" }, [
                      createVNode("div", { class: "text-red-500 text-5xl font-bold" }, toDisplayString$1(__props.error?.statusCode || "Error"), 1),
                      createVNode("h1", { class: "text-xl font-semibold text-gray-900 dark:text-gray-100" }, toDisplayString$1(__props.error?.message), 1),
                      createVNode(_component_UButton, {
                        onClick: redirectHome,
                        size: "md",
                        color: "primary",
                        icon: "mdi:home-outline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString$1(unref(t)("navigation.home")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4" }, [
                createVNode(_component_UCard, { class: "w-full max-w-lg shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center space-y-4 py-6" }, [
                      createVNode("div", { class: "text-red-500 text-5xl font-bold" }, toDisplayString$1(__props.error?.statusCode || "Error"), 1),
                      createVNode("h1", { class: "text-xl font-semibold text-gray-900 dark:text-gray-100" }, toDisplayString$1(__props.error?.message), 1),
                      createVNode(_component_UButton, {
                        onClick: redirectHome,
                        size: "md",
                        color: "primary",
                        icon: "mdi:home-outline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString$1(unref(t)("navigation.home")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer-f8uZCY6z.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.2.0_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.1.0_@vue+compiler-_5809a22b77bcfdba995ffd2bcbaa93a4/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { pickLinkProps as $, _sfc_main$o as A, get as B, useAdminUsers as C, navigateTo as D, useConfirm as E, useRoute as F, _sfc_main$7 as G, _sfc_main$e as H, _sfc_main$5 as I, useBreadcrumbStore as J, formBusInjectionKey as K, formStateInjectionKey as L, formErrorsInjectionKey as M, formInputsInjectionKey as N, formLoadingInjectionKey as O, formOptionsInjectionKey as P, usePortal as Q, useFormField as R, useFieldGroup as S, useComponentIcons as T, isArrayOfArray as U, _sfc_main$p as V, getDisplayValue as W, fieldGroupInjectionKey as X, omit as Y, _sfc_main$m as Z, _sfc_main$l as _, useAppConfig as a, _sfc_main$n as a0, looseToNumber as a1, transformUI as a2, useOverlay as a3, defineNuxtRouteMiddleware as a4, useLocaleRoute as a5, useAuthModal as a6, useNuxtApp as a7, useI18n as b, createError as c, __unimport_directionalIcon as d, entry$1 as default, __nuxt_component_4$1 as e, _export_sfc as f, _sfc_main$2 as g, _sfc_main$q as h, injectHead as i, useState as j, useAuth as k, fetchDefaults as l, useAsyncData as m, useRequestFetch as n, useRouter as o, useLocalePath as p, useHead as q, _sfc_main$d as r, _sfc_main$c as s, tv as t, useLocale as u, useCookie as v, loadAuth as w, __nuxt_component_3 as x, useAuthApi as y, useToast as z };
//# sourceMappingURL=server.mjs.map
