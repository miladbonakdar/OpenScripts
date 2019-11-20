<template>
  <div>
    <div class="col-md-12">
      <h3 class="mb-4">{{ title }}</h3>
    </div>

    <div v-for="post in posts" :key="post._id" class="col-md-12">
      <div class="post-entry-horzontal">
        <nuxt-link
          class="w-100"
          :to="
            `/category/${post.category.name}/section/${post.course.name}/${post.name}`
          "
        >
          <div
            v-if="post.imageUrl && post.imageUrl !== ''"
            class="image"
            :style="{ 'background-image': `url(${post.imageUrl})` }"
          ></div>
          <PostBanner v-else class="banner d-sm-none d-md-block" :post="post">
          </PostBanner>
          <span class="text">
            <h2>
              {{ post.title }}
            </h2>
            <div class="post-meta">
              <span class="category">{{ post.category.title }}</span>

              <span class="meta"
                ><span class="fa fa-calendar-o"></span>
                {{ post.createdAt | moment('jYYYY/jM/jD') }}
                <span class="fa fa-comments ml-1"></span
                >{{ post.comments.length }}
                <span class="fa fa-thumbs-o-up ml-1"></span>{{ post.claps }}
                <span class="fa fa-tags ml-1"></span>{{ post.tags.length }}
              </span>
            </div>
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import PostBanner from './PostBanner'
export default {
  components: { PostBanner },
  props: {
    posts: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.banner {
  width: 200px;
  height: 150px;
}
</style>
