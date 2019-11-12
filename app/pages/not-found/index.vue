<template>
  <div class="col-md-12 col-lg-8 main-content">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1>صفحه یافت نشد <smaller>404</smaller></h1>
        <h5>
          <nuxt-link to="/"
            ><span class="fa fa-angle-left"></span> خانه</nuxt-link
          >
        </h5>
        <img width="350" src="/icons/not-found.svg" />
      </div>
    </div>

    <div class="row mb-5 mt-5">
      <div class="col-md-12">
        <h2 class="mb-4">More Blog Posts</h2>
      </div>

      <div class="col-md-12">
        <div class="post-entry-horzontal">
          <a href="blog-single.html">
            <div
              class="image"
              style="background-image: url(/images/img_10.jpg);"
            ></div>
            <span class="text">
              <div class="post-meta">
                <span class="category">Travel</span>
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
              <h2>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h2>
            </span>
          </a>
        </div>
        <!-- END post -->

        <div class="post-entry-horzontal">
          <a href="blog-single.html">
            <div
              class="image"
              style="background-image: url(/images/img_11.jpg);"
            ></div>
            <span class="text">
              <div class="post-meta">
                <span class="category">Lifestyle</span>
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
              <h2>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h2>
            </span>
          </a>
        </div>
        <!-- END post -->

        <div class="post-entry-horzontal">
          <a href="blog-single.html">
            <div
              class="image"
              style="background-image: url(/images/img_12.jpg);"
            ></div>
            <span class="text">
              <div class="post-meta">
                <span class="category">Food</span>
                <span class="mr-2">March 15, 2018 </span> &bull;
                <span class="ml-2"><span class="fa fa-comments"></span> 3</span>
              </div>
              <h2>
                There’s a Cool New Way for Men to Wear Socks and Sandals
              </h2>
            </span>
          </a>
        </div>
        <!-- END post -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    })
  },
  created() {
    this.setBreadCrumbItems([
      {
        text: 'صفحه یافت نشد',
        href: `/not-found`
      }
    ])
  }
}
</script>

<style></style>
