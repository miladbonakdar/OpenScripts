<template>
  <div class="col-md-12 col-lg-8 main-content">
    <div class="row">
      <div class="col-md-12 text-center">
        <Pagination :total="136" :page-size="10" :current-page="1"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Pagination from '../../../components/pagination/Pagination'
export default {
  middleware: 'routeValidator',
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    })
  },
  components: { Pagination },
  created() {
    if (!this.$route.params.page || isNaN(this.$route.params.page))
      this.$router.replace('/page/1')
    this.setBreadCrumbItems([
      {
        text: 'پست ها',
        href: `/page/${this.$route.params.page}?text=${this.$route.params.text}`
      }
    ])

    console.log(this.$route)
  }
}
</script>

<style></style>
