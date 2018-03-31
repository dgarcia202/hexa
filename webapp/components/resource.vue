<template>
  <v-layout>
    <v-flex xs8>
      <v-form v-model="valid">
        <hx-text label="Name"></hx-text>
        <hx-text label="E-Mail"></hx-text>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import SchemaService from '../services/schema.service'

export default {
  mixins: [SchemaService],
  props: ['id'],
  data() {
    return {
    }
  }
}
</script>