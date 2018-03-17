<template>
  <v-navigation-drawer
    fixed
    v-model="isVisible"
    app
  >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-for="resource in resources" :key="resource.name" @click="">
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ resource.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SchemaService from '../services/schema.service'

export default {
  mixins: [SchemaService],
  props: ['isVisible'],
  data() {
    return {
      resources: []
    }
  },
  created() {
    this.resources = this.getAllDefinitions();
  }
}
</script>