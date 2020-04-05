<template>
  <div class="sidebar-box">
    <h3 class="heading">دسته بندی ها</h3>
    <ul class="categories">
      <li v-for="cat in allCategories" :key="cat._id">
        <nuxt-link :to="`category/${cat.name}`">
          <i
            :style="{ color: cat.color }"
            class="fa fa-circle"
            style="font-size: x-small;"
          ></i>
          {{ cat.title }}
          <span
            >({{ cat.courses.length }} آموزش و {{ cat.posts.length }} مطلب
            )</span
          >
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
      allCategories: 'allCategories'
    })
  }
}
</script>

<style></style>
