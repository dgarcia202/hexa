<template>
  <v-layout>
    <v-flex xs8>
      <v-form v-model="valid">
        <hx-text label="hola"></hx-text>
        <v-text-field
          label="E-mail"
          required
        ></v-text-field>
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