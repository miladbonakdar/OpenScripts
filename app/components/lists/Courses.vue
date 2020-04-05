<template>
  <div class="sidebar-box">
    <h3 class="heading">آموزش ها</h3>
    <ul class="categories">
      <li v-for="course in allCourses" :key="course._id">
        <nuxt-link
          :to="`/category/${course.category.name}/section/${course.name}`"
        >
          <i
            :style="{ color: course.color }"
            class="fa fa-circle"
            style="font-size: x-small;"
          ></i>
          {{ course.title }} <span>({{ course.posts.length }} مطلب)</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      allCourses: 'allCourses'
    })
  }
}
</script>

<style></style>
