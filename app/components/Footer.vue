<template>
  <footer class="site-footer">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-4">
          <NewsLetter></NewsLetter>
          <Description></Description>
        </div>
        <div class="col-md-6 ml-auto">
          <div class="row">
            <NanoPostViewer
              class="col-md-7"
              title="پست های پربازدید"
              :posts="$store.state.mostViewedPosts"
            ></NanoPostViewer>
            <div class="col-md-1"></div>

            <div class="col-md-4">
              <SideFooter></SideFooter>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center" dir="ltr">
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          Copyright &copy;{{ years }} All rights reserved | This website is made
          with <i class="fa fa-heart-o" aria-hidden="true"></i> by
          <a href="https://github.com/miladbonakdar/OpenScripts" target="_blank"
            >Milawd Bonakdar</a
          >
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import NewsLetter from './footer/NewsLetter'
import Description from './footer/Description'
import NanoPostViewer from './post/NanoPostViewer'
import SideFooter from './footer/SideFooter'

export default {
  components: { NewsLetter, NanoPostViewer, Description, SideFooter },
  data() {
    return {
      years: '2019 - ' + new Date().getFullYear()
    }
  }
}
</script>
<style></style>
