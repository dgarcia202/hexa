<template>
    <v-text-field
        :label="label"
        required
    ></v-text-field>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
    }
  }
}
</script>