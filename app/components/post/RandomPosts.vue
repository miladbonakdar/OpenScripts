<template>
  <MiniPostViewer title="پست های دیگر ..." :posts="posts"></MiniPostViewer>
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
