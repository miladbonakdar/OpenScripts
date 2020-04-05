<template>
  <div class="sidebar-box">
    <h3 class="heading">تگ ها</h3>
    <ul class="tags">
      <li v-for="tag in allTags" :key="tag._id">
        <nuxt-link :to="`/page/1?tag=${tag.name}`">
          <span
            :style="{ color: tag.color }"
            class="fa fa-circle"
            style="font-size: x-small;"
          ></span>
          {{ tag.title }} <span>({{ tag.posts.length }})</span>
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
      allTags: 'allTags'
    })
  }
}
</script>

<style></style>
