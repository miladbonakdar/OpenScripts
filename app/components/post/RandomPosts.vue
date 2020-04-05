<template>
  <MiniPostViewer :posts="posts" title="پست های دیگر ..."></MiniPostViewer>
</template>

<script>
import MiniPostViewer from './MiniPostViewer'
export default {
  components: { MiniPostViewer },
  computed: {
    posts() {
      return this.$store.state.randomPosts
    }
  }
}
</script>

<style></style>
