<template>
  <div class="col-md-12 col-lg-8 main-content">
    <div class="row">
      <PostCard
        v-for="post in postsPage.items"
        :key="post._id"
        :post="post"
        class="col-md-6"
      >
      </PostCard>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <Pagination
          :total="postsPage.total"
          :page-size="10"
          :current-page="1"
        ></Pagination>
      </div>
    </div>

    <RandomPosts class="row mb-5 mt-5"></RandomPosts>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Pagination from '../components/pagination/Pagination'
import RandomPosts from '../components/post/RandomPosts'
import PostCard from '../components/post/PostCard'

export default {
  components: { Pagination, RandomPosts, PostCard },
  async asyncData({ $axios }) {
    const postsPage = await $axios.get('/post/page/1/10')
    return { postsPage: postsPage.data.data }
  },
  created() {
    this.setBreadCrumbItems([])
  },
  middleware: 'routeValidator',
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    })
  }
}
</script>

<style></style>
