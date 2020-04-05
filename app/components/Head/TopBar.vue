<template>
  <div class="top-bar">
    <div class="container">
      <div class="row">
        <div class="col-9 social">
          <a :href="websiteConfig.aparatChanelle" target="_blank"
            ><img
              class="pointer"
              width="18"
              height="18"
              src="/icons/aparat-white.svg"
          /></a>
          <a :href="websiteConfig.instagram" target="_blank"
            ><span class="fa fa-instagram"></span
          ></a>
          <a :href="websiteConfig.youtubeChanelle" target="_blank"
            ><span class="fa fa-youtube-play"></span
          ></a>
          <a :href="websiteConfig.github" target="_blank"
            ><span class="fa fa-github"></span
          ></a>
          <a :href="websiteConfig.email" target="_blank"
            ><span class="fa fa-google"></span
          ></a>
          <a :href="websiteConfig.telegramChanelle" target="_blank"
            ><span class="fa fa-telegram"></span
          ></a>
          <a :href="websiteConfig.twitter" target="_blank"
            ><span class="fa fa-twitter"></span
          ></a>
        </div>
        <div class="col-3 search-top">
          <!-- <a href="#"><span class="fa fa-search"></span></a> -->
          <div class="search-top-form">
            <span class="icon fa fa-search"></span>
            <input
              id="s"
              v-model="search"
              @keyup.enter="onSearch"
              class="tanha"
              type="text"
              placeholder="جستجو ..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: null
    }
  },
  computed: {
    websiteConfig() {
      return this.$store.getters.siteConfig
    }
  },
  methods: {
    onSearch() {
      if (!this.search) return
      this.$router.push({
        name: 'page-page',
        query: { search: this.search },
        params: { page: 1 }
      })
    }
  }
}
</script>

<style></style>
