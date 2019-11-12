<template>
  <div></div>
</template>
<script>
export default {
  props: ['error'],
  layout: 'blog',
  created() {
    this.$router.replace('/not-found')
  }
}
</script>
