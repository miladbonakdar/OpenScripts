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
            @mouseover="hover.course = true"
            @mouseleave="hover.course = false"
            :class="{ show: hover.course }"
          >
            <nuxt-link
              class="nav-link dropdown-toggle"
              to="/all-categories/all-courses"
              >آموزش ها</nuxt-link
            >
            <div class="dropdown-menu" :class="{ show: hover.course }">
              <nuxt-link
                v-for="course in courses"
                v-bind:key="course._id"
                class="dropdown-item"
                :to="`/${course.category.name}/${course.name}`"
                >{{ course.title }}</nuxt-link
              >
            </div>
          </li>

          <li
            class="nav-item dropdown"
            @mouseover="hover.category = true"
            @mouseleave="hover.category = false"
            :class="{ show: hover.category }"
          >
            <nuxt-link class="nav-link dropdown-toggle" to="/all-categories"
              >دسته بندی ها</nuxt-link
            >

            <div
              class="dropdown-menu"
              :class="{ show: hover.category }"
              aria-labelledby="dropdown05"
            >
              <nuxt-link
                v-for="cat in categories"
                v-bind:key="cat._id"
                class="dropdown-item"
                :to="'/' + cat.name"
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
