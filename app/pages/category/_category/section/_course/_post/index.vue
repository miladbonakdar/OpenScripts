<template>
  <div class="col-md-12 col-lg-8 main-content">
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
          <li v-for="cat in categories" :key="cat._id">
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

    <div
      v-if="$route.params.course !== 'all' && courses.length !== 0"
      class="row"
    >
      <div class="col-md-12 mb-5">
        <h5 class="heading py-4 mb-4" style="border-bottom: 1px solid #e6e6e6;">
          آموزش های دیگر
        </h5>
        <ul class="tags">
          <li v-for="course in courses" :key="course._id">
            <nuxt-link
              :to="`/category/${course.category.name}/section/${course.name}`"
              style="font-size:smaller"
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

    <RandomPosts class="row mb-5 mt-5"></RandomPosts>
  </div>
</template>

<script>
import RandomPosts from '../../../../../../components/post/RandomPosts'

export default {
  components: { RandomPosts },
  async asyncData({ $axios, params, store }) {
    const postsPage = await $axios.get()
    const categories =
      params.category === 'all'
        ? store.state.allCategories
        : store.state.allCategories.filter((i) => i.name !== params.category)
    const courses =
      params.course === 'all'
        ? store.state.allCourses
        : store.state.allCourses.filter((i) => i.name !== params.course)

    return {
      postsPage: postsPage.data.data,
      categories,
      courses
    }
  },
  created() {},
  middleware: 'routeValidator',
  methods: {}
}
</script>

<style></style>
