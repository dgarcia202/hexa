<template>
  <v-layout>
    <v-flex xs8>
      <v-form>
        <v-btn color="success" @click="addComponent">Add component</v-btn>
        <hx-text label="Name" ></hx-text>
        <hx-text label="E-Mail"></hx-text>
        <template v-for="child in childComponents">
          <component :is="child" :key="child.name" v-bind="{label: 'hola'}"></component>
        </template>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from '../../node_modules/vue/dist/vue'
import SchemaService from '../services/schema.service'
import TextComponent from './text.vue'

export default {
  mixins: [SchemaService],
  props: ['id'],
  data() {
    return {
      childComponents: []
    }
  },
  methods: {
    addComponent() {
      this.childComponents.push(TextComponent);
    }
  },
  created() {

    // TODO: remove this
    console.log('>>>>>');
    console.log(this.getSchemaById(this.id));

    this.childComponents.push(TextComponent);
    this.childComponents.push(TextComponent);
    this.childComponents.push(TextComponent);
  }
}
</script>