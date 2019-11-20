<template>
  <div class="navbar navbar-expand-md  navbar-light bg-light">
    <div class="container">
      <div id="navbarMenu" class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <nuxt-link to="/">
              <a class="nav-link">خانه</a>
            </nuxt-link>
          </li>
          <li
            class="nav-item dropdown"
            :class="{ show: hover.course }"
            @mouseover="hover.course = true"
            @mouseleave="hover.course = false"
          >
            <nuxt-link
              class="nav-link dropdown-toggle"
              to="/category/all/section/all"
              >آموزش ها</nuxt-link
            >
            <div class="dropdown-menu" :class="{ show: hover.course }">
              <nuxt-link
                v-for="course in courses"
                :key="course._id"
                class="dropdown-item"
                :to="`/category/${course.category.name}/section/${course.name}`"
                >{{ course.title }}</nuxt-link
              >
            </div>
          </li>

          <li
            class="nav-item dropdown"
            :class="{ show: hover.category }"
            @mouseover="hover.category = true"
            @mouseleave="hover.category = false"
          >
            <nuxt-link class="nav-link dropdown-toggle" to="/category/all"
              >دسته بندی ها</nuxt-link
            >

            <div
              class="dropdown-menu"
              :class="{ show: hover.category }"
              aria-labelledby="dropdown05"
            >
              <nuxt-link
                v-for="cat in categories"
                :key="cat._id"
                class="dropdown-item"
                :to="'/category/' + cat.name"
                >{{ cat.title }}</nuxt-link
              >
            </div>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/about">درباره ما</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/contact">تماس با ما</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: {
        category: false,
        course: false
      },
      categories: [],
      courses: []
    }
  },
  created() {
    this.categories = this.$store.getters.allCategories
    this.courses = this.$store.getters.allCourses
  }
}
</script>

<style></style>
