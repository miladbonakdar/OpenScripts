<template>
  <div>
    <h3 class="heading">{{ title }}</h3>
    <div class="post-entry-sidebar">
      <ul>
        <li v-for="post in posts" :key="post._id">
          <nuxt-link
            :to="
              `/category/${post.category.name}/section/${post.course.name}/${post.name}`
            "
          >
            <img
              v-if="post.imageUrl && post.imageUrl !== ''"
              :src="post.imageUrl"
              :alt="post.title"
              class="mr-4"
            />
            <PostBanner v-else class="banner mr-4" :post="post"> </PostBanner>
            <div class="text">
              <h4>
                {{ post.title }}
              </h4>
              <div class="post-meta">
                <span class="meta"
                  ><span class="fa fa-calendar-o"></span>
                  {{ post.createdAt | moment('jYYYY/jM/jD') }}</span
                >
                <span class="meta">
                  <span class="fa fa-comments ml-1"></span
                  >{{ post.comments.length }}
                  <span class="fa fa-thumbs-o-up ml-1"></span>{{ post.claps }}
                  <span class="fa fa-tags ml-1"></span>{{ post.tags.length }}
                </span>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PostBanner from './PostBanner'
export default {
  components: { PostBanner },
  props: {
    title: {
      required: true
    },
    posts: {
      required: true
    }
  }
}
</script>

<style scoped>
.meta {
  width: 100%;
  display: block;
}
.banner {
  width: 84px;
  height: 67px;
}
</style>
