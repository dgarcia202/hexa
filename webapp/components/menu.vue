<template>
  <v-navigation-drawer
    fixed
    v-model="isVisible"
    app
  >
    <v-list dense>
      <v-list-tile @click="loadHome">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-for="resource in resources" :key="resource.id" @click="loadResource">
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ resource.title }}</v-list-tile-title>
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
    this.getAllDefinitions().then((result) => {
      this.resources = result.data;
    });
  },
  methods: {
    loadResource() {
      this.$router.push('/resource/card.json');
    },
    loadHome() {
      this.$router.push('/');
    }    
  }
}
</script>