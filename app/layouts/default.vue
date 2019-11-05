<template>
  <div>
    <Heade></Heade>

    <section class="site-section py-sm">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <b-breadcrumb class="mb-4 mt-2" :items="items"></b-breadcrumb>
          </div>
        </div>
        <div class="row blog-entries">
          <nuxt />
          <!-- END main-content -->

          <SideBar></SideBar>
          <!-- END sidebar -->
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '../components/Footer'
import Heade from '../components/Heade'
import SideBar from '../components/SideBar'

export default {
  components: { Footer, Heade, SideBar },
  data() {
    return {
      items: [
        {
          text: 'خانه',
          href: '#'
        },
        {
          text: 'جاوااسکریدت',
          href: '#'
        },
        {
          text: 'آموزش جاوااسکریدت',
          href: '#'
        },
        {
          text: 'چگونه می شه اینجوری میشه؟',
          active: true
        }
      ],
      years: '2019 - ' + new Date().getFullYear()
    }
  }
}
</script>
<style></style>
