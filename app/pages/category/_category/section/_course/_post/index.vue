<template>
  <div class="col-md-12 col-lg-8 main-content">
    <NextAndPrev
      :next="next"
      :prev="prev"
      :category="$route.params.category"
      :course="$route.params.course"
      class="mb-4"
    ></NextAndPrev>
    <h4 class="pb-3" style="border-bottom: 1px solid #e6e6e6;">
      <span class="fa fa-angle-left"></span> {{ post.title }}
    </h4>
    <div style="font-size: small;" dir="rtl">
      <span class="fa fa-clock-o mx-1">
        زمان مطالعه {{ post.readTime }} دقیقه</span
      >
      <span class="fa fa-calendar-o mx-1">
        در تاریخ {{ post.createdAt | moment('jYYYY/jM/jD') }}</span
      >
      <span class="fa fa-play-circle mx-1"> پست {{ post.postNumber }}</span>
      <span class="fa fa-bolt mx-1"> {{ difficulty }}</span>
      <span class="fa fa-list-ul mx-1"> {{ post.category.title }}</span>
      <span class="fa fa-television mx-1"> {{ post.course.title }}</span>
      <span class="fa fa-user-o mx-1">
        توسط
        {{ post.createdBy.firstName + ' ' + post.createdBy.lastName }}</span
      >
    </div>
    <div
      class="pl-4 mt-5"
      :style="{ 'border-right': '3px solid ' + post.color }"
    >
      <div style="height:300px"></div>
    </div>
    <NextAndPrev
      :next="next"
      :prev="prev"
      :category="$route.params.category"
      :course="$route.params.course"
    ></NextAndPrev>

    <RandomPosts class="row mb-5 mt-5"></RandomPosts>
  </div>
</template>

<script>
import RandomPosts from '../../../../../../components/post/RandomPosts'
import NextAndPrev from '../../../../../../components/postPage/NextAndPrev'

export default {
  components: { RandomPosts, NextAndPrev },
  async asyncData({ $axios, params, store }) {
    console.log(params)
    const postData = await $axios.get('/post/appPost/' + params.post)
    store.commit('PUSH_BREADCRUMB_ITEM', {
      text: postData.data.data.post.title,
      href: `/category/${params.category}/section/${params.course}/${postData.data.data.post.name}`
    })
    return {
      post: postData.data.data.post,
      prev: postData.data.data.prev || null,
      next: postData.data.data.next || null
    }
  },
  created() {},
  middleware: 'routeValidator',
  methods: {},
  computed: {
    difficulty() {
      switch (this.post.difficulty) {
        case 0:
          return 'بسیار آسان'
        case 1:
          return 'آسان'
        case 2:
          return 'معمولی'
        case 3:
          return 'دشوار'
        case 4:
          return 'بسیار دشوار'
        default:
          return 'معمولی'
      }
    }
  }
}
</script>

<style></style>
