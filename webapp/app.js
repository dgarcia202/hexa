import '../node_modules/vuetify/dist/vuetify.css'

import Vue from '../node_modules/vue/dist/vue.js'
import Vuetify from '../node_modules/vuetify/dist/vuetify.js'

import HelloWorldComponent from './components/hello-world.vue'
import MenuComponent from './components/menu.vue'

Vue.use(Vuetify);

Vue.component('hello-world', HelloWorldComponent);
Vue.component('hx-menu', MenuComponent);

var app = new Vue({
  el: '#app',
  data: {
    title: 'HEXA',
    copyright: 'HexaSoft 2018',
    drawer: true,
  },
  props: {
    source: String
  }
}) ;

