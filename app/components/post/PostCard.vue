<template>
  <div>
    <nuxt-link
      :to="
        `/category/${post.category.name}/section/${post.course.name}/${post.name}`
      "
      class="blog-entry hvr-underline-from-right"
    >
      <img src="/images/img_6.jpg" alt="Image placeholder" />
      <div class="blog-content-body">
        <div class="post-meta">
          <span class="category">Travel</span>
          <span class="mr-2">March 15, 2018 </span> &bull;
          <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
        </div>
        <h2>
          {{ post.title }}
        </h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true
    }
  }
}
</script>

<style></style>
