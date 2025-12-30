import { defineComponent, withAsyncContext, mergeProps, unref, ref, readonly, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { f as _export_sfc, y as useAuthApi, z as useToast } from './server.mjs';
import { u as useLoadServicesStore, _ as __nuxt_component_0$1 } from './Service-D7mTs20Z.mjs';
import { C as ChargeAccount } from './ChargeAccount-DHOXuuw4.mjs';
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
import './useServices-BjUETh0c.mjs';
import './useApi-_4dZBB2A.mjs';
import './Container-FYbH69tK.mjs';
import './Form-DbM-gQaT.mjs';
import './Badge-B5nYqlG6.mjs';
import './Select-BkNBr6Bu.mjs';
import './InputNumber-LtvFKiY6.mjs';

const useWallet = () => {
  const wallet = ref(null);
  const transactions = ref([]);
  const charges = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const fetchWallet = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await useAuthApi("/api/payments/wallet/");
      wallet.value = data.value;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const fetchTransactions = async () => {
    loading.value = true;
    try {
      const { data } = await useAuthApi("/api/payments/wallet/transactions/");
      transactions.value = data.value;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const fetchCharges = async () => {
    loading.value = true;
    try {
      const { data } = await useAuthApi("/api/payments/charges/");
      charges.value = data.value?.data || [];
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  const createCharge = async (payload) => {
    const { data, error: error2 } = await useAuthApi("/api/payments/charges/create/", {
      method: "POST",
      body: payload
    });
    if (error2.value) {
      useToast().add({
        title: "خطا در ایجاد شارژ",
        description: error2.value?.data?.error || "خطای ناشناخته",
        color: "error"
      });
      return null;
    }
    if (data.value?.approve_url) {
      return { approve_url: data.value.approve_url };
    }
    return data.value;
  };
  return {
    wallet: readonly(wallet),
    transactions: readonly(transactions),
    charges: readonly(charges),
    loading: readonly(loading),
    error: readonly(error),
    fetchWallet,
    fetchTransactions,
    fetchCharges,
    createCharge
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Wallet",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { wallet, fetchWallet } = useWallet();
    [__temp, __restore] = withAsyncContext(() => fetchWallet()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wallet-card" }, _attrs))} data-v-aa4fbe42><h3 class="font-bold text-xl" data-v-aa4fbe42>${ssrInterpolate(_ctx.$t("wallet.balance"))}:</h3>`);
      if (unref(wallet)) {
        _push(`<div data-v-aa4fbe42><p class="text-3xl font-bold" data-v-aa4fbe42><span data-v-aa4fbe42>${ssrInterpolate(_ctx.$n(Number(unref(wallet).balance)))} ${ssrInterpolate(_ctx.$t("common.currencies.text.toman"))}</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/Wallet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-aa4fbe42"]]), { __name: "CardWallet" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { services } = ([__temp, __restore] = withAsyncContext(() => useLoadServicesStore()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CardWallet = __nuxt_component_0;
      const _component_CardService = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10" }, _attrs))}><section><h1 class="font-bold text-3xl">${ssrInterpolate(_ctx.$t("wallet.overview"))}</h1><p>${ssrInterpolate(_ctx.$t("wallet.overview_desc"))}</p></section><section class="space-y-8"><h2 class="font-bold text-2xl">${ssrInterpolate(_ctx.$t("wallet.wallet_overview"))}:</h2><div class="w-full flex justify-center">`);
      _push(ssrRenderComponent(_component_CardWallet, null, null, _parent));
      _push(`</div></section><section class="space-y-8"><h2 class="font-bold text-2xl">${ssrInterpolate(_ctx.$t("wallet.wallet_add_charge"))}:</h2><div class="w-full flex justify-center">`);
      _push(ssrRenderComponent(ChargeAccount, null, null, _parent));
      _push(`</div></section><section class="space-y-8"><h2 class="font-bold text-2xl">${ssrInterpolate(_ctx.$t("wallet.popular_services"))}:</h2><div class="flex flex-wrap justify-center gap-12"><!--[-->`);
      ssrRenderList(unref(services), (service) => {
        _push(ssrRenderComponent(_component_CardService, { item: service }, null, _parent));
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DUuXGoMV.mjs.map
