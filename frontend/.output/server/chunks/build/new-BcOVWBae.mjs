import { _ as _sfc_main$1 } from './Form-DbM-gQaT.mjs';
import { b as useI18n, C as useAdminUsers, r as _sfc_main$d, s as _sfc_main$c, _ as _sfc_main$l, d as __unimport_directionalIcon, z as useToast, D as navigateTo, p as useLocalePath } from './server.mjs';
import { _ as _sfc_main$2 } from './Select-BkNBr6Bu.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useLoadAdminAgentsStore } from './useLoadAdminAgentsStore-RzXeyMA9.mjs';
import '@vueuse/core';
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
import '@iconify/vue';
import 'tailwindcss/colors';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    const agentRoles = [
      { label: $t("common.roles.main_admin"), value: "main_admin" },
      { label: $t("common.roles.senior_support"), value: "senior_support" },
      { label: $t("common.roles.simple_support"), value: "simple_support" }
    ];
    const { createSupportUser } = useAdminUsers();
    const payload = ref({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      role: "simple_support"
    });
    const submit = async () => {
      const { data: response } = await createSupportUser(payload.value);
      if (response.value?.ok) {
        useToast().add({
          title: $t("pages.admin.title.agents_new"),
          description: $t("pages.users.messages.created"),
          color: "success"
        });
        await useLoadAdminAgentsStore(true);
        navigateTo(useLocalePath()("admin-agents"));
      } else {
        useToast().add({
          title: $t("error.title"),
          description: response.value?.error || $t("error.unexpected"),
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = _sfc_main$1;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$c;
      const _component_USelect = _sfc_main$2;
      const _component_UButton = _sfc_main$l;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "page-section" }, _attrs))}><h2 class="font-bold text-2xl">ایجاد پشتیبان جدید</h2>`);
      _push(ssrRenderComponent(_component_UForm, {
        class: "w-full md:w-lg space-y-4",
        onSubmit: submit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_firstname"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).first_name,
                    "onUpdate:modelValue": ($event) => unref(payload).first_name = $event,
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).first_name,
                      "onUpdate:modelValue": ($event) => unref(payload).first_name = $event,
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_lastname"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).last_name,
                    "onUpdate:modelValue": ($event) => unref(payload).last_name = $event,
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).last_name,
                      "onUpdate:modelValue": ($event) => unref(payload).last_name = $event,
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_email"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).email,
                    "onUpdate:modelValue": ($event) => unref(payload).email = $event,
                    autocomplete: "new-email",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "email",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).email,
                      "onUpdate:modelValue": ($event) => unref(payload).email = $event,
                      autocomplete: "new-email",
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      type: "email",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_username"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).username,
                    "onUpdate:modelValue": ($event) => unref(payload).username = $event,
                    value: !unref(payload).username ? unref(payload).email : unref(payload).username,
                    autocomplete: "new-username",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).username,
                      "onUpdate:modelValue": ($event) => unref(payload).username = $event,
                      value: !unref(payload).username ? unref(payload).email : unref(payload).username,
                      autocomplete: "new-username",
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_password"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).password,
                    "onUpdate:modelValue": ($event) => unref(payload).password = $event,
                    autocomplete: "new-password",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "password",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).password,
                      "onUpdate:modelValue": ($event) => unref(payload).password = $event,
                      autocomplete: "new-password",
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      type: "password",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_password_retype"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(payload).confirm_password,
                    "onUpdate:modelValue": ($event) => unref(payload).confirm_password = $event,
                    autocomplete: "new-password",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "password",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(payload).confirm_password,
                      "onUpdate:modelValue": ($event) => unref(payload).confirm_password = $event,
                      autocomplete: "new-password",
                      class: "w-full",
                      dir: "auto",
                      required: "",
                      type: "password",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: unref($t)("modals.profile_setup.label_role"),
              size: "xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_USelect, {
                    modelValue: unref(payload).role,
                    "onUpdate:modelValue": ($event) => unref(payload).role = $event,
                    items: agentRoles,
                    class: "w-full",
                    required: "",
                    variant: "subtle"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_USelect, {
                      modelValue: unref(payload).role,
                      "onUpdate:modelValue": ($event) => unref(payload).role = $event,
                      items: agentRoles,
                      class: "w-full",
                      required: "",
                      variant: "subtle"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    label: unref($t)("pages.admin.title.agents_new"),
                    "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                    size: "lg",
                    type: "submit"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      label: unref($t)("pages.admin.title.agents_new"),
                      "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                      size: "lg",
                      type: "submit"
                    }, null, 8, ["label", "trailing-icon"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_firstname"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).first_name,
                    "onUpdate:modelValue": ($event) => unref(payload).first_name = $event,
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_lastname"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).last_name,
                    "onUpdate:modelValue": ($event) => unref(payload).last_name = $event,
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_email"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).email,
                    "onUpdate:modelValue": ($event) => unref(payload).email = $event,
                    autocomplete: "new-email",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "email",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_username"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).username,
                    "onUpdate:modelValue": ($event) => unref(payload).username = $event,
                    value: !unref(payload).username ? unref(payload).email : unref(payload).username,
                    autocomplete: "new-username",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_password"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).password,
                    "onUpdate:modelValue": ($event) => unref(payload).password = $event,
                    autocomplete: "new-password",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "password",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_password_retype"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(payload).confirm_password,
                    "onUpdate:modelValue": ($event) => unref(payload).confirm_password = $event,
                    autocomplete: "new-password",
                    class: "w-full",
                    dir: "auto",
                    required: "",
                    type: "password",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, {
                label: unref($t)("modals.profile_setup.label_role"),
                size: "xl"
              }, {
                default: withCtx(() => [
                  createVNode(_component_USelect, {
                    modelValue: unref(payload).role,
                    "onUpdate:modelValue": ($event) => unref(payload).role = $event,
                    items: agentRoles,
                    class: "w-full",
                    required: "",
                    variant: "subtle"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_UFormField, null, {
                default: withCtx(() => [
                  createVNode(_component_UButton, {
                    label: unref($t)("pages.admin.title.agents_new"),
                    "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right"),
                    size: "lg",
                    type: "submit"
                  }, null, 8, ["label", "trailing-icon"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/agents/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-BcOVWBae.mjs.map
