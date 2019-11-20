<template>
  <div>
    <div
      v-b-tooltip.hover
      class="banner-category"
      :style="{ 'background-color': post.category.color }"
      :title="post.category.title"
    ></div>

    <div
      v-b-tooltip.hover
      class="banner-course"
      :style="{ 'background-color': post.course.color }"
      :title="post.course.title"
    ></div>

    <div
      v-b-tooltip.hover
      class="banner-post"
      :style="{ 'background-color': post.color }"
      :title="post.title"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>
.banner-post {
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 43%;
  height: 100%;
}
.banner-course {
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 32%;
  height: 100%;
}
.banner-category {
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 13%;
  height: 100%;
}
</style>
