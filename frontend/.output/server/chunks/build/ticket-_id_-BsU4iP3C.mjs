import { b as useI18n, F as useRoute, J as useBreadcrumbStore, k as useAuth, _ as _sfc_main$l, d as __unimport_directionalIcon, p as useLocalePath, h as _sfc_main$q, V as _sfc_main$p, E as useConfirm } from './server.mjs';
import { _ as _sfc_main$4, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$5 } from './ChatPromptSubmit-BBk5xNIc.mjs';
import { _ as _sfc_main$6 } from './Badge-B5nYqlG6.mjs';
import { _ as _sfc_main$3 } from './FileUpload-DYR6EaNq.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { a as useReplyTicket, b as useCloseTicket } from './useTickets-CnXAgghv.mjs';
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
import './Tooltip-BFGZkN6r.mjs';
import './Kbd-4P_ljKMp.mjs';
import './Textarea-C6RFyJZc.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ticket-[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    const { t: $t } = useI18n();
    const fullDate = {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };
    const ticket_id = useRoute().params.id;
    const payload = ref({
      message: "",
      attachments: []
    });
    const breadcrumbState = useBreadcrumbStore();
    breadcrumbState.value = { ticket: ticket_id };
    const ticket = ref();
    const { reply: ticketReply } = useReplyTicket(ticket_id);
    const { close } = useCloseTicket(ticket_id);
    const messages = computed(() => ticket.value?.messages || []);
    const { user } = useAuth();
    const statusMap = computed(() => ({
      open: $t("pages.tickets.titles.waiting_open"),
      in_progress: $t("common.ticket_status.in_progress"),
      closed: $t("common.ticket_status.closed"),
      resolved: $t("common.ticket_status.resolved"),
      waiting_user: $t("common.ticket_status.waiting_user")
    }));
    const isSendDisabled = computed(() => {
      if (ticket.value?.assigned_to?.id !== user.value?.id && user.value?.role !== "main_admin") {
        return true;
      }
      if (["closed", "resolved"].includes(ticket.value?.status ?? "")) {
        return true;
      }
      return false;
    });
    const replyHandler = async () => {
      if (!ticket.value)
        return;
      const { data: response, error } = await ticketReply(payload.value);
      if (response.value?.ok) {
        ticket.value = response.value.data;
        payload.value = {
          message: "",
          attachments: []
        };
      }
    };
    const handleCloseTicket = async () => {
      const confirmed = await useConfirm({
        title: $t("pages.tickets.labels.mark_as_closed"),
        message: $t("pages.tickets.messages.mark_as_closed", [ticket_id]),
        confirmLabel: $t("pages.tickets.labels.mark_as_closed"),
        confirmColor: "error"
      });
      if (!confirmed) {
        return;
      }
      const { data: response } = await close();
      if (response.value?.ok)
        ticket.value = response.value.data;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$l;
      const _component_UChatPalette = _sfc_main$4;
      const _component_UChatMessages = _sfc_main$2;
      const _component_UIcon = _sfc_main$q;
      const _component_UChatPrompt = _sfc_main$1;
      const _component_UChip = _sfc_main$p;
      const _component_UBadge = _sfc_main$6;
      const _component_UFileUpload = _sfc_main$3;
      const _component_UChatPromptSubmit = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-h-full h-full flex flex-col lg:flex-row-reverse gap-4 relative" }, _attrs))}>`);
      if (unref(ticket)) {
        _push(`<section class="bg-blue-400 text-white dark:bg-blue-900 w-full p-2 h-100 lg:w-[400px] lg:h-full rounded-md shadow-sm"><div class="justify-end lg:hidden flex">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "link",
          class: "text-white",
          label: unref($t)("navigation.back_tickets"),
          to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()("dashboard-support"),
          "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right")
        }, null, _parent));
        _push(`</div><div class="w-full flex justify-center items-center py-8 font-bold text-xl"><span>${ssrInterpolate(unref(ticket).user.full_name)}</span></div><div class="flex lg:flex-col justify-between gap-6"><div class="space-y-4"><div class="flex flex-col lg:flex-row lg:justify-between"><h2>${ssrInterpolate(unref($t)("pages.tickets.titles.subject"))}</h2><span class="font-bold text-lg">${ssrInterpolate(unref(ticket).subject)}</span></div><div class="flex flex-col lg:flex-row lg:justify-between"><h2>${ssrInterpolate(unref($t)("common.tables.operations"))}</h2><div class="space-x-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          disabled: ["closed", "resolved"].includes(unref(ticket).status) || !unref(ticket).assigned_to,
          title: unref($t)("pages.tickets.labels.mark_as_closed"),
          color: "success",
          icon: "material-symbols:task-rounded",
          size: "xl",
          variant: "soft",
          onClick: handleCloseTicket
        }, null, _parent));
        _push(`</div></div></div><div class="space-y-3"><h2 class="font-medium text-center">جزییات تیکت ارسالی</h2><div class="space-y-1"><div class="grid grid-cols-2"><span>زمان ایجاد تیکت:</span><span class="font-bold text-end">${ssrInterpolate(_ctx.$d(new Date(unref(ticket).created_at), fullDate))}</span></div><div class="grid grid-cols-2"><span>زمان آخرین بروزرسانی:</span><span class="font-bold text-end">${ssrInterpolate(_ctx.$d(new Date(unref(ticket).updated_at), fullDate))}</span></div><div class="grid grid-cols-2"><span>نام پشتیبان:</span><span class="font-bold text-end">${ssrInterpolate(unref(ticket).assigned_to ? unref(ticket).assigned_to.full_name : "-")}</span></div><div class="grid grid-cols-2"><span>${ssrInterpolate(unref($t)("common.tables.category"))}:</span><span class="font-bold text-end">${ssrInterpolate(unref(ticket).category.title_fa)}</span></div><div class="grid grid-cols-2"><span>${ssrInterpolate(unref($t)("pages.tickets.titles.current_state"))}:</span><span class="font-bold text-end">${ssrInterpolate(unref(statusMap)[unref(ticket).status])}</span></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="h-full flex flex-col grow contain-size"><div class="justify-between hidden lg:flex"><div><h2 class="font-bold">${ssrInterpolate(unref(ticket)?.subject)}</h2></div><div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "link",
        color: "neutral",
        label: unref($t)("navigation.back_tickets"),
        to: ("useLocalePath" in _ctx ? _ctx.useLocalePath : unref(useLocalePath))()("dashboard-support"),
        "trailing-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right")
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UChatPalette, null, {
        prompt: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (["closed", "resolved"].includes(unref(ticket)?.status || "")) {
              _push2(ssrRenderComponent(_component_UButton, {
                label: unref($t)("pages.tickets.messages.is_closed"),
                block: "",
                color: "warning",
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!unref(ticket)?.assigned_to) {
              _push2(ssrRenderComponent(_component_UButton, {
                label: unref($t)("pages.tickets.messages.is_waiting_assign"),
                block: "",
                color: "neutral",
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_UChatPrompt, {
                modelValue: unref(payload).message,
                "onUpdate:modelValue": ($event) => unref(payload).message = $event,
                disabled: unref(isSendDisabled),
                maxrows: 4,
                autofocus: "",
                variant: "subtle",
                onSubmit: replyHandler
              }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(payload).attachments?.length) {
                      _push3(`<ul class="inline-flex gap-2 flex-wrap"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(payload).attachments, (attachment) => {
                        _push3(`<li${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UChip, {
                          ui: { root: "rounded-none" },
                          color: "neutral",
                          size: "xl"
                        }, {
                          content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_UIcon, {
                                class: "cursor-pointer",
                                name: "material-symbols:close",
                                onClick: () => {
                                  unref(payload).attachments = unref(payload).attachments?.filter((a) => a.name !== attachment.name);
                                }
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_UIcon, {
                                  class: "cursor-pointer",
                                  name: "material-symbols:close",
                                  onClick: () => {
                                    unref(payload).attachments = unref(payload).attachments?.filter((a) => a.name !== attachment.name);
                                  }
                                }, null, 8, ["onClick"])
                              ];
                            }
                          }),
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_UBadge, {
                                label: attachment.name,
                                class: "text-white",
                                icon: "material-symbols:attach-file"
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode(_component_UBadge, {
                                    label: attachment.name,
                                    class: "text-white",
                                    icon: "material-symbols:attach-file"
                                  }, null, 8, ["label"])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(payload).attachments?.length ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "inline-flex gap-2 flex-wrap"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(payload).attachments, (attachment) => {
                          return openBlock(), createBlock("li", null, [
                            createVNode(_component_UChip, {
                              ui: { root: "rounded-none" },
                              color: "neutral",
                              size: "xl"
                            }, {
                              content: withCtx(() => [
                                createVNode(_component_UIcon, {
                                  class: "cursor-pointer",
                                  name: "material-symbols:close",
                                  onClick: () => {
                                    unref(payload).attachments = unref(payload).attachments?.filter((a) => a.name !== attachment.name);
                                  }
                                }, null, 8, ["onClick"])
                              ]),
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode(_component_UBadge, {
                                    label: attachment.name,
                                    class: "text-white",
                                    icon: "material-symbols:attach-file"
                                  }, null, 8, ["label"])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]);
                        }), 256))
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UFileUpload, {
                      modelValue: unref(payload).attachments,
                      "onUpdate:modelValue": ($event) => unref(payload).attachments = $event,
                      disabled: unref(isSendDisabled),
                      ui: { base: "border-transparent" },
                      class: "border-transparent",
                      multiple: "",
                      variant: "button"
                    }, {
                      default: withCtx(({ open }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UChatPromptSubmit, {
                            disabled: unref(isSendDisabled),
                            class: "rtl:rotate-180",
                            icon: "material-symbols:attach-file",
                            variant: "ghost",
                            onClick: ($event) => open()
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UChatPromptSubmit, {
                              disabled: unref(isSendDisabled),
                              class: "rtl:rotate-180",
                              icon: "material-symbols:attach-file",
                              variant: "ghost",
                              onClick: withModifiers(($event) => open(), ["prevent"])
                            }, null, 8, ["disabled", "onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UChatPromptSubmit, {
                      disabled: unref(isSendDisabled),
                      class: "rtl:rotate-180",
                      icon: "material-symbols:send-rounded",
                      variant: "ghost"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UFileUpload, {
                        modelValue: unref(payload).attachments,
                        "onUpdate:modelValue": ($event) => unref(payload).attachments = $event,
                        disabled: unref(isSendDisabled),
                        ui: { base: "border-transparent" },
                        class: "border-transparent",
                        multiple: "",
                        variant: "button"
                      }, {
                        default: withCtx(({ open }) => [
                          createVNode(_component_UChatPromptSubmit, {
                            disabled: unref(isSendDisabled),
                            class: "rtl:rotate-180",
                            icon: "material-symbols:attach-file",
                            variant: "ghost",
                            onClick: withModifiers(($event) => open(), ["prevent"])
                          }, null, 8, ["disabled", "onClick"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                      createVNode(_component_UChatPromptSubmit, {
                        disabled: unref(isSendDisabled),
                        class: "rtl:rotate-180",
                        icon: "material-symbols:send-rounded",
                        variant: "ghost"
                      }, null, 8, ["disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
          } else {
            return [
              ["closed", "resolved"].includes(unref(ticket)?.status || "") ? (openBlock(), createBlock(_component_UButton, {
                key: 0,
                label: unref($t)("pages.tickets.messages.is_closed"),
                block: "",
                color: "warning",
                disabled: ""
              }, null, 8, ["label"])) : createCommentVNode("", true),
              !unref(ticket)?.assigned_to ? (openBlock(), createBlock(_component_UButton, {
                key: 1,
                label: unref($t)("pages.tickets.messages.is_waiting_assign"),
                block: "",
                color: "neutral",
                disabled: ""
              }, null, 8, ["label"])) : (openBlock(), createBlock(_component_UChatPrompt, {
                key: 2,
                modelValue: unref(payload).message,
                "onUpdate:modelValue": ($event) => unref(payload).message = $event,
                disabled: unref(isSendDisabled),
                maxrows: 4,
                autofocus: "",
                variant: "subtle",
                onSubmit: withModifiers(replyHandler, ["prevent"])
              }, {
                header: withCtx(() => [
                  unref(payload).attachments?.length ? (openBlock(), createBlock("ul", {
                    key: 0,
                    class: "inline-flex gap-2 flex-wrap"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(payload).attachments, (attachment) => {
                      return openBlock(), createBlock("li", null, [
                        createVNode(_component_UChip, {
                          ui: { root: "rounded-none" },
                          color: "neutral",
                          size: "xl"
                        }, {
                          content: withCtx(() => [
                            createVNode(_component_UIcon, {
                              class: "cursor-pointer",
                              name: "material-symbols:close",
                              onClick: () => {
                                unref(payload).attachments = unref(payload).attachments?.filter((a) => a.name !== attachment.name);
                              }
                            }, null, 8, ["onClick"])
                          ]),
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(_component_UBadge, {
                                label: attachment.name,
                                class: "text-white",
                                icon: "material-symbols:attach-file"
                              }, null, 8, ["label"])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]);
                    }), 256))
                  ])) : createCommentVNode("", true)
                ]),
                default: withCtx(() => [
                  createVNode(_component_UFileUpload, {
                    modelValue: unref(payload).attachments,
                    "onUpdate:modelValue": ($event) => unref(payload).attachments = $event,
                    disabled: unref(isSendDisabled),
                    ui: { base: "border-transparent" },
                    class: "border-transparent",
                    multiple: "",
                    variant: "button"
                  }, {
                    default: withCtx(({ open }) => [
                      createVNode(_component_UChatPromptSubmit, {
                        disabled: unref(isSendDisabled),
                        class: "rtl:rotate-180",
                        icon: "material-symbols:attach-file",
                        variant: "ghost",
                        onClick: withModifiers(($event) => open(), ["prevent"])
                      }, null, 8, ["disabled", "onClick"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]),
                  createVNode(_component_UChatPromptSubmit, {
                    disabled: unref(isSendDisabled),
                    class: "rtl:rotate-180",
                    icon: "material-symbols:send-rounded",
                    variant: "ghost"
                  }, null, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "disabled"]))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UChatMessages, {
              assistant: { variant: "subtle", icon: "material-symbols:support-agent-rounded", ui: { container: "rtl:flex-row-reverse rtl:justify-start" } },
              messages: unref(messages),
              user: { variant: "subtle", icon: "material-symbols:person", ui: { container: "rtl:ms-0 ltr:flex-row-reverse ltr:justify-start" } },
              "auto-scroll": ""
            }, {
              content: withCtx(({ message }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                  ssrRenderList(message.parts, (part) => {
                    _push3(`<div${_scopeId2}>`);
                    if (part.type === "text") {
                      _push3(`<p class="${ssrRenderClass({ "mb-6": message.parts.length > 1 })}"${_scopeId2}>${ssrInterpolate(part.text)}</p>`);
                    } else if (part.type === "file") {
                      _push3(`<a${ssrRenderAttr("href", part.url)} class="rounded-md font-medium w-40 inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors cursor-pointer dark:text-white px-2.5 py-1.5 text-sm gap-1.5 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10" target="_blank"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, { name: "material-symbols:attach-file" }, null, _parent3, _scopeId2));
                      _push3(`<span class="truncate max-w-30"${_scopeId2}>${ssrInterpolate(part.filename || "Download file")}</span></a>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(message.parts, (part) => {
                        return openBlock(), createBlock("div", null, [
                          part.type === "text" ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: { "mb-6": message.parts.length > 1 }
                          }, toDisplayString(part.text), 3)) : part.type === "file" ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: part.url,
                            class: "rounded-md font-medium w-40 inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors cursor-pointer dark:text-white px-2.5 py-1.5 text-sm gap-1.5 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
                            target: "_blank"
                          }, [
                            createVNode(_component_UIcon, { name: "material-symbols:attach-file" }),
                            createVNode("span", { class: "truncate max-w-30" }, toDisplayString(part.filename || "Download file"), 1)
                          ], 8, ["href"])) : createCommentVNode("", true)
                        ]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UChatMessages, {
                assistant: { variant: "subtle", icon: "material-symbols:support-agent-rounded", ui: { container: "rtl:flex-row-reverse rtl:justify-start" } },
                messages: unref(messages),
                user: { variant: "subtle", icon: "material-symbols:person", ui: { container: "rtl:ms-0 ltr:flex-row-reverse ltr:justify-start" } },
                "auto-scroll": ""
              }, {
                content: withCtx(({ message }) => [
                  createVNode("div", { class: "space-y-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(message.parts, (part) => {
                      return openBlock(), createBlock("div", null, [
                        part.type === "text" ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: { "mb-6": message.parts.length > 1 }
                        }, toDisplayString(part.text), 3)) : part.type === "file" ? (openBlock(), createBlock("a", {
                          key: 1,
                          href: part.url,
                          class: "rounded-md font-medium w-40 inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors cursor-pointer dark:text-white px-2.5 py-1.5 text-sm gap-1.5 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10",
                          target: "_blank"
                        }, [
                          createVNode(_component_UIcon, { name: "material-symbols:attach-file" }),
                          createVNode("span", { class: "truncate max-w-30" }, toDisplayString(part.filename || "Download file"), 1)
                        ], 8, ["href"])) : createCommentVNode("", true)
                      ]);
                    }), 256))
                  ])
                ]),
                _: 1
              }, 8, ["messages"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/support/ticket-[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ticket-_id_-BsU4iP3C.mjs.map
