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
          <a target="_blank" :href="websiteConfig.github"
            ><span class="fa fa-github"></span
          ></a>
          <a target="_blank" :href="websiteConfig.email"
            ><span class="fa fa-google"></span
          ></a>
          <a target="_blank" :href="websiteConfig.telegramChanelle"
            ><span class="fa fa-telegram"></span
          ></a>
          <a target="_blank" :href="websiteConfig.twitter"
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
              class="tanha"
              type="text"
              placeholder="جستجو ..."
              @keyup.enter="onSearch"
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
      search: null,
      websiteConfig: null
    }
  },
  created() {
    this.websiteConfig = this.$store.getters.siteConfig
  },
  methods: {
    onSearch() {
      if (!this.search) return
      this.$router.push({ name: 'search', query: { search: this.search } })
    }
  }
}
</script>

<style></style>
