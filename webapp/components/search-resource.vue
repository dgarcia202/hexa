<template>
  <v-layout>
    <v-flex xs6>
        <v-text-field solo append-icon="search"></v-text-field>
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