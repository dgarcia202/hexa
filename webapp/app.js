import '../node_modules/vuetify/dist/vuetify.css'

import Vue from '../node_modules/vue/dist/vue'
import VueRouter from '../node_modules/vue-router/dist/vue-router'
import Vuetify from '../node_modules/vuetify/dist/vuetify'

import MenuComponent from './components/menu.vue'
import HomeComponent from './components/home.vue'
import ResourceComponent from './components/resource.vue'

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.component('hx-menu', MenuComponent);

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/resource/:id', component: ResourceComponent, props: true }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  router,
  data: {
    title: 'HEXA',
    copyright: 'HexaSoft 2018',
    drawer: true,
  },
  props: {
    source: String
  }
}) ;

