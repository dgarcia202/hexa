<template>
  <v-layout>
    <v-flex xs8>
      <v-form>
        <template v-for="control in propertyControls">
          <component :is="control.component" :key="control.name" v-bind="control.props"></component>
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
      propertyControls: []
    }
  },
  created() {
    this.buildPropertyControls();
  },
  watch: {
    '$route': 'buildPropertyControls'
  },
  methods: {
    buildPropertyControls() {
      this.propertyControls = [];
      this.getSchemaById(this.id).then(schema => {
        for (var key in schema.properties) {
          if (schema.properties.hasOwnProperty(key)) {
            this.propertyControls.push({
              component: TextComponent,
              name: key,
              props: {
                label: key
              }
            });
          }
        }      
      });
    }
  },
}
</script>