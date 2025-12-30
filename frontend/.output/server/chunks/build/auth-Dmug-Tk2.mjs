import { a4 as defineNuxtRouteMiddleware } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@iconify/utils';
import 'consola';
import '@vueuse/core';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  return;
});

export { auth as default };
//# sourceMappingURL=auth-Dmug-Tk2.mjs.map
