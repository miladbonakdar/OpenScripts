<template>
  <span class="badge" v-bind:style="{'background-color':color , color: 'white'}">{{color}}</span>
</template>
<script>
export default {
  name: "color-badge",
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
