<template>
  <header role="banner">
    <TopBar></TopBar>
    <div class="container logo-wrap">
      <div class="row pt-5">
        <div class="col-12 text-center">
          <a
            class="absolute-toggle d-block d-md-none"
            data-toggle="collapse"
            href="#navbarMenu"
            role="button"
            aria-expanded="false"
            aria-controls="navbarMenu"
            ><span class="burger-lines"></span
          ></a>
          <nuxt-link to="/">
            <h1 dir="ltr" class="site-logo">
              <img
                width="60"
                height="60"
                src="/logo.png"
                alt="Open Scrips"
              />pen scripts
            </h1>
          </nuxt-link>
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </header>
</template>
<script>
import NavBar from './Head/NavBar'
import TopBar from './Head/TopBar'
export default {
  components: { NavBar, TopBar },
  data() {
    return {}
  }
}
</script>
<style></style>
