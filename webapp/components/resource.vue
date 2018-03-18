<template>
<h2>{{id}}</h2>
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