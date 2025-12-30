import { f as _export_sfc, F as useRoute, C as useAdminUsers, J as useBreadcrumbStore, b as useI18n, z as useToast, o as useRouter, c as createError, h as _sfc_main$q, e as __nuxt_component_4$1 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const userId = Number(route.params.id);
    const { getUserDetail } = useAdminUsers();
    const user = ([__temp, __restore] = withAsyncContext(() => getUserDetail(userId)), __temp = await __temp, __restore(), __temp);
    const breadcrumbState = useBreadcrumbStore();
    breadcrumbState.value.name = user.value.full_name || user.value.email;
    const { t } = useI18n();
    if (!user.value) {
      useToast().add({
        title: t("error.title"),
        description: t("error.user_not_found"),
        color: "error"
      });
      useRouter().back();
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
        message: t("error.user_not_found")
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$q;
      const _component_ClientOnly = __nuxt_component_4$1;
      if (unref(user)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-77e0b836><section class="space-y-8" data-v-77e0b836><h2 class="text-2xl font-medium" data-v-77e0b836>${ssrInterpolate(_ctx.$t("common.titles.user_info"))}</h2><div class="profile-section" data-v-77e0b836><div class="flex align-middle gap-2" data-v-77e0b836>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: `cif:${unref(user).country_code?.toLowerCase()}`,
          class: "rounded-md",
          size: "25"
        }, null, _parent));
        _push(`<span class="text-xl font-bold" data-v-77e0b836>${ssrInterpolate(unref(user).full_name)}</span></div></div><div class="profile-section" data-v-77e0b836><h3 class="profile-title" data-v-77e0b836>${ssrInterpolate(_ctx.$t("common.titles.email"))}</h3><span data-v-77e0b836>${ssrInterpolate(unref(user).email)}</span></div></section><section class="page-section" data-v-77e0b836><h2 class="text-2xl font-medium" data-v-77e0b836>${ssrInterpolate(_ctx.$t("common.titles.user_orders"))}</h2>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</section></div>`);
      } else {
        _push(`<section${ssrRenderAttrs(_attrs)} data-v-77e0b836></section>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77e0b836"]]);

export { index as default };
//# sourceMappingURL=index-oD21364d.mjs.map
