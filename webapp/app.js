import '../node_modules/vuetify/dist/vuetify.css'

import Vue from '../node_modules/vue/dist/vue.js'
import Vuetify from '../node_modules/vuetify/dist/vuetify.js'

import HelloWorldComponent from './components/hello-world.vue'

Vue.use(Vuetify);

Vue.component('hello-world', HelloWorldComponent);

var app = new Vue({
  el: '#app',
  data: () => ({
    title: 'HEXA',
    copyright: 'HexaSoft 2018',
    drawer: null,

  }),
  props: {
    source: String
  }
}) ;

