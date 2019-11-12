<template>
  <div class="container">
    <div>
      <h1 class="title">
        search
      </h1>
      <h2 class="subtitle">
        search
      </h2>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'routeValidator',
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    })
  },
  created() {
    if (!this.$route.params.page || isNaN(this.$route.params.page))
      this.$router.replace('/page/1')
    this.setBreadCrumbItems([
      {
        text: 'پست ها',
        href: `/page/${this.$route.params.page}?text=${this.$route.params.text}`
      }
    ])
  }
}
</script>

<style></style>
