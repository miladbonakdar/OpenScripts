<template>
  <div class="col-md-12 col-lg-8 main-content">
    <div
      v-if="$route.params.category !== 'all' && courses.length !== 0"
      class="row"
    >
      <div class="col-md-12 mb-5">
        <h5
          class="heading pb-4 pt-2 mb-4"
          style="border-bottom: 1px solid #e6e6e6;"
        >
          آموزش ها
        </h5>
        <ul class="tags">
          <li v-for="course in courses" :key="course._id">
            <nuxt-link
              style="font-size:smaller"
              :to="`/category/${course.category.name}/section/${course.name}`"
            >
              <span
                class="fa fa-circle"
                style="font-size: x-small;"
                :style="{ color: course.color }"
              ></span>
              {{ course.title }} <span>({{ course.posts.length }})</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="postsPage.total !== 0" class="row">
      <PostCard
        v-for="post in postsPage.items"
        :key="post._id"
        :post="post"
        class="col-md-6"
      >
      </PostCard>
    </div>
    <div v-else class="row text-center">
      <h2 class="col-xs-12 w-100">موردی یافت نشد</h2>
    </div>
    <div v-if="loaded < postsPage.total" class="row text-center">
      <button
        class="btn btn-primary btn-sm mx-auto"
        :disabled="loadingPosts"
        @click="loadMorePosts"
      >
        پست های بیشتر...
      </button>
    </div>
    <div
      v-if="$route.params.category !== 'all' && categories.length !== 0"
      class="row"
    >
      <div class="col-md-12 mb-5">
        <h5 class="heading py-4 mb-4" style="border-bottom: 1px solid #e6e6e6;">
          دسته بندی های دیگر
        </h5>
        <ul class="tags">
          <li v-for="cat in allCategories" :key="cat._id">
            <nuxt-link :to="`/category/${cat.name}`" style="font-size:smaller">
              <span
                class="fa fa-circle"
                style="font-size: x-small;"
                :style="{ color: cat.color }"
              ></span>
              {{ cat.title }} <span>({{ cat.posts.length }})</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <RandomPosts class="row mb-5 mt-5"></RandomPosts>
  </div>
</template>

<script>
import RandomPosts from '../../../components/post/RandomPosts'
import PostCard from '../../../components/post/PostCard'
export default {
  components: { RandomPosts, PostCard },
  async asyncData({ $axios, params, store }) {
    const postsPage = await $axios.get(
      params.category === 'all'
        ? '/post/page/1/10'
        : '/post/page/1/10?category=' + params.category
    )
    const categories =
      params.category === 'all'
        ? store.state.allCategories
        : store.state.allCategories.filter((i) => i.name !== params.category)
    const courses =
      params.category === 'all'
        ? store.state.allCourses
        : store.state.allCourses.filter(
            (i) => i.category.name === params.category
          )
    return {
      postsPage: postsPage.data.data,
      allCategories: categories,
      loaded: postsPage.data.data.count,
      current: 1,
      loadingPosts: false,
      courses
    }
  },
  created() {},
  middleware: 'routeValidator',
  methods: {
    async loadMorePosts() {
      try {
        this.loadingPosts = true
        let postsPage = await this.$axios.get(
          this.$route.params.category === 'all'
            ? `/page/${this.current + 1}/10`
            : `/page/${this.current + 1}/10?category=${
                this.$route.params.category
              }`
        )
        postsPage = postsPage.data.data
        this.current++
        this.postsPage.items = [...this.postsPage.items, ...postsPage.items]
        this.loaded += postsPage.count
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingPosts = false
      }
    }
  }
}
</script>

<style></style>
