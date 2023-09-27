import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from '../pages/Home.vue';
import Dashboard from '../pages/Dashboard.vue';
import GuildPage from '../pages/GuildPage.vue';
import SingleGuildPlugin from '../pages/SingleGuildPlugin.vue';

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/dashboard/:guildId", name: "GuildPage", component: GuildPage },
  { path: "/dashboard/:guildId/:plugin", name: "SingleGuildPlugin", component: SingleGuildPlugin}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;