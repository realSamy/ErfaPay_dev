import { _ as _sfc_main$6 } from './Container-FYbH69tK.mjs';
import { b as useI18n, j as useState, k as useAuth, e as __nuxt_component_4$1, _ as _sfc_main$l, a as useAppConfig, t as tv, f as _export_sfc, d as __unimport_directionalIcon, g as _sfc_main$2$1, h as _sfc_main$q, u as useLocale } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, createBlock, openBlock, Fragment, renderList, createTextVNode, computed, renderSlot, ref, withAsyncContext, watch, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import useEmblaCarousel from 'embla-carousel-vue';
import { Primitive, useForwardProps } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { C as ChargeAccount, u as useLoadCurrenciesStore } from './ChargeAccount-DHOXuuw4.mjs';
import { _ as __unimport_useConvertNumericToLocale } from './useConvertNumericToLocale-CAtKRlJ-.mjs';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import './Form-DbM-gQaT.mjs';
import './Badge-B5nYqlG6.mjs';
import './Select-BkNBr6Bu.mjs';
import './InputNumber-LtvFKiY6.mjs';
import './useApi-_4dZBB2A.mjs';

const theme$1 = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-accented rounded-full",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
        "next": "end-4 sm:-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "data-[state=active]:bg-inverted"
      }
    }
  }
};
const _sfc_main$5 = {
  __name: "UCarousel",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    prev: { type: Object, required: false },
    prevIcon: { type: null, required: false },
    next: { type: Object, required: false },
    nextIcon: { type: null, required: false },
    arrows: { type: Boolean, required: false, default: false },
    dots: { type: Boolean, required: false, default: false },
    orientation: { type: null, required: false, default: "horizontal" },
    items: { type: Array, required: false },
    autoplay: { type: [Boolean, Object], required: false, default: false },
    autoScroll: { type: [Boolean, Object], required: false, default: false },
    autoHeight: { type: [Boolean, Object], required: false, default: false },
    classNames: { type: [Boolean, Object], required: false, default: false },
    fade: { type: [Boolean, Object], required: false, default: false },
    wheelGestures: { type: [Boolean, Object], required: false, default: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    align: { type: [String, Function], required: false, default: "center" },
    containScroll: { type: [Boolean, String], required: false, default: "trimSnaps" },
    slidesToScroll: { type: [String, Number], required: false, default: 1 },
    dragFree: { type: Boolean, required: false, default: false },
    dragThreshold: { type: Number, required: false, default: 10 },
    inViewThreshold: { type: null, required: false, default: 0 },
    loop: { type: Boolean, required: false, default: false },
    skipSnaps: { type: Boolean, required: false, default: false },
    duration: { type: Number, required: false, default: 25 },
    startIndex: { type: Number, required: false, default: 0 },
    watchDrag: { type: [Boolean, Function], required: false, default: true },
    watchResize: { type: [Boolean, Function], required: false, default: true },
    watchSlides: { type: [Boolean, Function], required: false, default: true },
    watchFocus: { type: [Boolean, Function], required: false, default: true },
    active: { type: Boolean, required: false, default: true },
    breakpoints: { type: Object, required: false, default: () => ({}) }
  },
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { dir, t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
    const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
    const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.carousel || {} })({
      orientation: props.orientation
    }));
    const options = computed(() => ({
      ...props.fade ? { align: "center", containScroll: false } : {},
      ...rootProps.value,
      axis: props.orientation === "horizontal" ? "x" : "y",
      direction: dir.value === "rtl" ? "rtl" : "ltr"
    }));
    const plugins = ref([]);
    async function loadPlugins() {
      const emblaPlugins = [];
      if (props.autoplay) {
        const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default);
        emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
      }
      if (props.autoScroll) {
        const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
        emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
      }
      if (props.autoHeight) {
        const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
        emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
      }
      if (props.classNames) {
        const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
        emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
      }
      if (props.fade) {
        const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
        emblaPlugins.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
      }
      if (props.wheelGestures) {
        const { WheelGesturesPlugin } = await import('../_/embla-carousel-wheel-gestures.esm.mjs');
        emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
      }
      plugins.value = emblaPlugins;
    }
    watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
      await loadPlugins();
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { immediate: true });
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
    watch(options, () => {
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { flush: "post" });
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }
    function scrollTo(index) {
      emblaApi.value?.scrollTo(index);
    }
    function onKeyDown(event) {
      let prevKey;
      let nextKey;
      if (props.orientation === "horizontal") {
        prevKey = dir.value === "ltr" ? "ArrowLeft" : "ArrowRight";
        nextKey = dir.value === "ltr" ? "ArrowRight" : "ArrowLeft";
      } else {
        prevKey = "ArrowUp";
        nextKey = "ArrowDown";
      }
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
        return;
      }
      if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    const selectedIndex = ref(0);
    const scrollSnaps = ref([]);
    function isCarouselItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      emblaRef,
      emblaApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        role: "region",
        "aria-roledescription": "carousel",
        "data-orientation": __props.orientation,
        tabindex: "0",
        "data-slot": "root",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        onKeydown: onKeyDown
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId}><div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item, index) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                "data-slot": "item",
                class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
              }))}${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {
                item,
                index
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (__props.arrows || __props.dots) {
              _push2(`<div data-slot="controls" class="${ssrRenderClass(ui.value.controls({ class: props.ui?.controls }))}"${_scopeId}>`);
              if (__props.arrows) {
                _push2(`<div data-slot="arrows" class="${ssrRenderClass(ui.value.arrows({ class: props.ui?.arrows }))}"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$l, mergeProps({
                  disabled: !canScrollPrev.value,
                  icon: prevIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.prev")
                }, typeof __props.prev === "object" ? __props.prev : void 0, {
                  "data-slot": "prev",
                  class: ui.value.prev({ class: props.ui?.prev }),
                  onClick: scrollPrev
                }), null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$l, mergeProps({
                  disabled: !canScrollNext.value,
                  icon: nextIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.next")
                }, typeof __props.next === "object" ? __props.next : void 0, {
                  "data-slot": "next",
                  class: ui.value.next({ class: props.ui?.next }),
                  onClick: scrollNext
                }), null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.dots) {
                _push2(`<div role="tablist"${ssrRenderAttr("aria-label", unref(t)("carousel.dots"))} data-slot="dots" class="${ssrRenderClass(ui.value.dots({ class: props.ui?.dots }))}"${_scopeId}><!--[-->`);
                ssrRenderList(scrollSnaps.value, (_2, index) => {
                  _push2(`<button type="button" role="tab"${ssrRenderAttr("aria-label", unref(t)("carousel.goto", { slide: index + 1 }))}${ssrRenderAttr("aria-selected", selectedIndex.value === index)} data-slot="dot" class="${ssrRenderClass(ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }))}"${ssrRenderAttr("data-state", selectedIndex.value === index ? "active" : void 0)}${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
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
                ref_key: "emblaRef",
                ref: emblaRef,
                "data-slot": "viewport",
                class: ui.value.viewport({ class: props.ui?.viewport })
              }, [
                createVNode("div", {
                  "data-slot": "container",
                  class: ui.value.container({ class: props.ui?.container })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock("div", mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                      "data-slot": "item",
                      class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
                    }), [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index
                      })
                    ], 16);
                  }), 128))
                ], 2)
              ], 2),
              __props.arrows || __props.dots ? (openBlock(), createBlock("div", {
                key: 0,
                "data-slot": "controls",
                class: ui.value.controls({ class: props.ui?.controls })
              }, [
                __props.arrows ? (openBlock(), createBlock("div", {
                  key: 0,
                  "data-slot": "arrows",
                  class: ui.value.arrows({ class: props.ui?.arrows })
                }, [
                  createVNode(_sfc_main$l, mergeProps({
                    disabled: !canScrollPrev.value,
                    icon: prevIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.prev")
                  }, typeof __props.prev === "object" ? __props.prev : void 0, {
                    "data-slot": "prev",
                    class: ui.value.prev({ class: props.ui?.prev }),
                    onClick: scrollPrev
                  }), null, 16, ["disabled", "icon", "aria-label", "class"]),
                  createVNode(_sfc_main$l, mergeProps({
                    disabled: !canScrollNext.value,
                    icon: nextIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.next")
                  }, typeof __props.next === "object" ? __props.next : void 0, {
                    "data-slot": "next",
                    class: ui.value.next({ class: props.ui?.next }),
                    onClick: scrollNext
                  }), null, 16, ["disabled", "icon", "aria-label", "class"])
                ], 2)) : createCommentVNode("", true),
                __props.dots ? (openBlock(), createBlock("div", {
                  key: 1,
                  role: "tablist",
                  "aria-label": unref(t)("carousel.dots"),
                  "data-slot": "dots",
                  class: ui.value.dots({ class: props.ui?.dots })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(scrollSnaps.value, (_2, index) => {
                    return openBlock(), createBlock("button", {
                      key: index,
                      type: "button",
                      role: "tab",
                      "aria-label": unref(t)("carousel.goto", { slide: index + 1 }),
                      "aria-selected": selectedIndex.value === index,
                      "data-slot": "dot",
                      class: ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }),
                      "data-state": selectedIndex.value === index ? "active" : void 0,
                      onClick: ($event) => scrollTo(index)
                    }, null, 10, ["aria-label", "aria-selected", "data-state", "onClick"]);
                  }), 128))
                ], 10, ["aria-label"])) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Carousel.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Services",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const { t: $t } = useI18n();
    const { locale } = useI18n();
    const isRTL = computed(() => ["fa", "ar"].includes(locale.value));
    const dir = computed(() => isRTL.value ? "rtl" : "ltr");
    const ctaIcon = __unimport_directionalIcon("mdi:chevron-left", "mdi:chevron-right");
    const services = ref([]);
    const serviceSlides = computed(() => services.value.map((service) => {
      return {
        title: locale.value === "en" ? service.title_en : service.title_fa,
        message: locale.value === "en" ? service.description_en : service.description_fa,
        cta_label: $t("pages.home.hero_section_cta"),
        image: service.banner
      };
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$5;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UCarousel, mergeProps({
        items: __props.items ?? unref(serviceSlides),
        ui: {
          dot: "data-[state=active]:bg-primary",
          next: "ring-transparent scale-150",
          prev: "ring-transparent scale-150",
          container: "items-center"
        },
        arrows: "",
        autoplay: {
          stopOnFocusIn: false,
          stopOnMouseEnter: true,
          stopOnInteraction: false
        },
        dots: "",
        loop: "",
        "prev-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-right", "mdi:chevron-left"),
        "next-icon": ("directionalIcon" in _ctx ? _ctx.directionalIcon : unref(__unimport_directionalIcon))("mdi:chevron-left", "mdi:chevron-right")
      }, _attrs), {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttr("dir", unref(dir))} class="flex flex-col items-center md:flex-row w-full justify-between gap-10"${_scopeId}><div${_scopeId}><h4 class="font-black text-2xl"${_scopeId}>${ssrInterpolate(item.title)}</h4><p class="text-muted mt-1"${_scopeId}>${ssrInterpolate(item.message)}</p>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: item.cta_label,
              "trailing-icon": unref(ctaIcon),
              class: "mt-3",
              size: "xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grow flex justify-center"${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} class="w-100"${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", {
                dir: unref(dir),
                class: "flex flex-col items-center md:flex-row w-full justify-between gap-10"
              }, [
                createVNode("div", null, [
                  createVNode("h4", { class: "font-black text-2xl" }, toDisplayString(item.title), 1),
                  createVNode("p", { class: "text-muted mt-1" }, toDisplayString(item.message), 1),
                  createVNode(_component_UButton, {
                    label: item.cta_label,
                    "trailing-icon": unref(ctaIcon),
                    class: "mt-3",
                    size: "xl"
                  }, null, 8, ["label", "trailing-icon"])
                ]),
                createVNode("div", { class: "grow flex justify-center" }, [
                  createVNode("img", {
                    src: item.image,
                    alt: item.title,
                    class: "w-100"
                  }, null, 8, ["src", "alt"])
                ])
              ], 8, ["dir"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/Services.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$4, { __name: "CarouselServices" });
const theme = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main$3 = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: props.class })
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.2.1_@babel+parser@7.28.5_@netlify+blobs@9.1.2_@nuxt+content@3.7.1_better-sql_f6f2022a8b01d1cc100b720dbfba0629/node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Currencies",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => useLoadCurrenciesStore()), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_4$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel/Currencies.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-a456f92b"]]), { __name: "CarouselCurrencies" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Benefit",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const cta_icon = computed(() => __unimport_directionalIcon(...props.item.cta_icon));
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2$1;
      const _component_UIcon = _sfc_main$q;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        ui: {
          body: "grow",
          root: "flex flex-col"
        },
        class: "w-full md:w-55 bg-ui-highlight"
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between items-center"${_scopeId}><h3 class="font-bold text-md"${_scopeId}>${ssrInterpolate(_ctx.$t(__props.item.title))}</h3>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.item.icon,
              class: "text-primary",
              size: "30"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between items-center" }, [
                createVNode("h3", { class: "font-bold text-md" }, toDisplayString(_ctx.$t(__props.item.title)), 1),
                createVNode(_component_UIcon, {
                  name: __props.item.icon,
                  class: "text-primary",
                  size: "30"
                }, null, 8, ["name"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t(__props.item.cta_label),
              "trailing-icon": unref(cta_icon),
              class: "mt-3",
              size: "xl"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full flex justify-center items-center" }, [
                createVNode(_component_UButton, {
                  label: _ctx.$t(__props.item.cta_label),
                  "trailing-icon": unref(cta_icon),
                  class: "mt-3",
                  size: "xl"
                }, null, 8, ["label", "trailing-icon"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.$t(__props.item.description))}</p>`);
          } else {
            return [
              createVNode("p", null, toDisplayString(_ctx.$t(__props.item.description)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/Benefit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "CardBenefit" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale } = useI18n();
    const benefits = useState("benefits");
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$6;
      const _component_ClientOnly = __nuxt_component_4$1;
      const _component_CarouselServices = __nuxt_component_2;
      const _component_USkeleton = _sfc_main$3;
      const _component_CarouselCurrencies = __nuxt_component_4;
      const _component_CardBenefit = __nuxt_component_5;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-20 flex flex-col gap-16 max-w-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "flex flex-col gap-16" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center md:flex-row w-full justify-between gap-10"${_scopeId2}><div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_USkeleton, { class: "w-40 h-6" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_USkeleton, { class: "w-70 h-6" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_USkeleton, { class: "w-30 h-6" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grow flex justify-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_USkeleton, { class: "w-80 h-45" }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center md:flex-row w-full justify-between gap-10" }, [
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode(_component_USkeleton, { class: "w-40 h-6" }),
                        createVNode(_component_USkeleton, { class: "w-70 h-6" }),
                        createVNode(_component_USkeleton, { class: "w-30 h-6" })
                      ]),
                      createVNode("div", { class: "grow flex justify-center" }, [
                        createVNode(_component_USkeleton, { class: "w-80 h-45" })
                      ])
                    ])
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-col justify-center items-center"${_scopeId}><h3 class="text-xl mb-2 text-muted"${_scopeId}>${ssrInterpolate(_ctx.$t("pages.home.current_prices"))}</h3>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UContainer, { class: "flex flex-col md:flex-row items-center justify-between gap-10" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USkeleton, { class: "w-80 h-20" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_USkeleton, { class: "w-80 h-20" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_USkeleton, { class: "w-80 h-20" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                          createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                          createVNode(_component_USkeleton, { class: "w-80 h-20" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UContainer, { class: "flex flex-col md:flex-row items-center justify-between gap-10" }, {
                      default: withCtx(() => [
                        createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                        createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                        createVNode(_component_USkeleton, { class: "w-80 h-20" })
                      ]),
                      _: 1
                    })
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_ClientOnly, null, {
                fallback: withCtx(() => [
                  createVNode("div", { class: "flex flex-col items-center md:flex-row w-full justify-between gap-10" }, [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_component_USkeleton, { class: "w-40 h-6" }),
                      createVNode(_component_USkeleton, { class: "w-70 h-6" }),
                      createVNode(_component_USkeleton, { class: "w-30 h-6" })
                    ]),
                    createVNode("div", { class: "grow flex justify-center" }, [
                      createVNode(_component_USkeleton, { class: "w-80 h-45" })
                    ])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_CarouselServices)
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex flex-col justify-center items-center" }, [
                createVNode("h3", { class: "text-xl mb-2 text-muted" }, toDisplayString(_ctx.$t("pages.home.current_prices")), 1),
                createVNode(_component_ClientOnly, null, {
                  fallback: withCtx(() => [
                    createVNode(_component_UContainer, { class: "flex flex-col md:flex-row items-center justify-between gap-10" }, {
                      default: withCtx(() => [
                        createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                        createVNode(_component_USkeleton, { class: "w-80 h-20" }),
                        createVNode(_component_USkeleton, { class: "w-80 h-20" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(_component_CarouselCurrencies)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user)) {
        _push(ssrRenderComponent(ChargeAccount, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UContainer, { class: "max-w-screen bg-primary py-10" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UContainer, { class: "space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="font-extrabold text-4xl text-white"${_scopeId2}>${ssrInterpolate(_ctx.$t("pages.home.why_erfapay_title"))}</h2><p class="text-xl text-white/80"${_scopeId2}>${ssrInterpolate(_ctx.$t("pages.home.why_erfapay_description"))}</p><div class="flex flex-col md:flex-row flex-wrap gap-6 mt-10"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(benefits), (item) => {
                    _push3(ssrRenderComponent(_component_CardBenefit, { item }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("h2", { class: "font-extrabold text-4xl text-white" }, toDisplayString(_ctx.$t("pages.home.why_erfapay_title")), 1),
                    createVNode("p", { class: "text-xl text-white/80" }, toDisplayString(_ctx.$t("pages.home.why_erfapay_description")), 1),
                    createVNode("div", { class: "flex flex-col md:flex-row flex-wrap gap-6 mt-10" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(benefits), (item) => {
                        return openBlock(), createBlock(_component_CardBenefit, { item }, null, 8, ["item"]);
                      }), 256))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UContainer, { class: "space-y-3" }, {
                default: withCtx(() => [
                  createVNode("h2", { class: "font-extrabold text-4xl text-white" }, toDisplayString(_ctx.$t("pages.home.why_erfapay_title")), 1),
                  createVNode("p", { class: "text-xl text-white/80" }, toDisplayString(_ctx.$t("pages.home.why_erfapay_description")), 1),
                  createVNode("div", { class: "flex flex-col md:flex-row flex-wrap gap-6 mt-10" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(benefits), (item) => {
                      return openBlock(), createBlock(_component_CardBenefit, { item }, null, 8, ["item"]);
                    }), 256))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-10 text-center space-y-4"${_scopeId}><h2 class="font-extrabold text-2xl"${_scopeId}>${ssrInterpolate(_ctx.$t("pages.home.cta_section_title"))}</h2>`);
            _push2(ssrRenderComponent(_component_UButton, {
              label: _ctx.$t("common.labels.signup"),
              class: "mt-3",
              size: "xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between text-xl"${_scopeId}><h2${_scopeId}>${ssrInterpolate(_ctx.$t("common.messages.support_24_7"))}</h2><p${_scopeId}>${ssrInterpolate(_ctx.$t("pages.home.support_phone"))} <span dir="ltr"${_scopeId}>${ssrInterpolate(("useConvertNumericToLocale" in _ctx ? _ctx.useConvertNumericToLocale : unref(__unimport_useConvertNumericToLocale))("(+98) 912 999 9999 - (+98) 912 999 9999", unref(locale)))}</span></p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-10 text-center space-y-4" }, [
                createVNode("h2", { class: "font-extrabold text-2xl" }, toDisplayString(_ctx.$t("pages.home.cta_section_title")), 1),
                createVNode(_component_UButton, {
                  label: _ctx.$t("common.labels.signup"),
                  class: "mt-3",
                  size: "xl"
                }, null, 8, ["label"])
              ]),
              createVNode("div", { class: "flex flex-col-reverse md:flex-row items-center justify-center md:justify-between text-xl" }, [
                createVNode("h2", null, toDisplayString(_ctx.$t("common.messages.support_24_7")), 1),
                createVNode("p", null, [
                  createTextVNode(toDisplayString(_ctx.$t("pages.home.support_phone")) + " ", 1),
                  createVNode("span", { dir: "ltr" }, toDisplayString(("useConvertNumericToLocale" in _ctx ? _ctx.useConvertNumericToLocale : unref(__unimport_useConvertNumericToLocale))("(+98) 912 999 9999 - (+98) 912 999 9999", unref(locale))), 1)
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DfuIO5Eu.mjs.map
