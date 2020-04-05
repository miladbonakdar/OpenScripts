<template>
  <div>
    <div class="mb-5">
      <h3>دسترسی آسان</h3>
      <ul class="list-unstyled">
        <li><nuxt-link to="/page/1">جستجو</nuxt-link></li>
        <li><nuxt-link to="/about">درباره ما</nuxt-link></li>
        <li><nuxt-link to="/contact">تماس با ما</nuxt-link></li>
      </ul>
    </div>

    <div class="mb-5">
      <h3>شبکه های اجتماعی</h3>
      <ul class="list-unstyled footer-social">
        <li>
          <a :href="websiteConfig.aparatChanelle" target="_blank"
            ><img
              class="pointer"
              width="18"
              height="18"
              src="/icons/aparat-white.svg"
            />
            &nbsp;&nbsp;آپارات</a
          >
        </li>
        <li>
          <a :href="websiteConfig.instagram" target="_blank"
            ><span class="fa fa-instagram"></span> اینستاگرام</a
          >
        </li>
        <li>
          <a :href="websiteConfig.youtubeChanelle" target="_blank"
            ><span class="fa fa-youtube-play"></span> یوتیوب</a
          >
        </li>
        <li>
          <a :href="websiteConfig.github" target="_blank"
            ><span class="fa fa-github"></span> گیت هاب</a
          >
        </li>
        <li>
          <a :href="websiteConfig.email" target="_blank"
            ><span class="fa fa-google"></span> ایمیل</a
          >
        </li>
        <li>
          <a :href="websiteConfig.telegramChanelle" target="_blank"
            ><span class="fa fa-telegram"></span> تلگرام</a
          >
        </li>
        <li>
          <a :href="websiteConfig.twitter" target="_blank"
            ><span class="fa fa-twitter"></span> توییتر</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    websiteConfig() {
      return this.$store.getters.siteConfig
    }
  }
}
</script>

<style></style>
