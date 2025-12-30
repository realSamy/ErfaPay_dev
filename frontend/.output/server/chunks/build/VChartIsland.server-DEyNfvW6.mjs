import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import * as echarts from 'echarts';

const _sfc_main = {
  __name: "VChartIsland",
  __ssrInlineRender: true,
  props: {
    option: { type: null, required: false },
    initOptions: { type: null, required: false },
    theme: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const svgStr = ref("");
    const initOptions = echarts.util.merge(
      { renderer: "svg", ssr: true },
      props.initOptions || {}
    );
    const chart = echarts.init(null, props.theme, initOptions);
    chart.setOption(props.option || {});
    svgStr.value = chart.renderToSVGString();
    chart.dispose();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "vue-echarts-container" }, _attrs))}><div class="vue-echarts-inner">${svgStr.value ?? ""}</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt-echarts@1.0.1_echarts@6.0.0_magicast@0.5.1_vue-echarts@8.0.1_echarts@6.0.0_vue@3.5.22_typescript@5.8.3__/node_modules/nuxt-echarts/dist/runtime/components/VChartIsland.server.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=VChartIsland.server-DEyNfvW6.mjs.map
