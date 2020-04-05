<template>
  <div>
    <Head></Head>

    <section class="site-section py-sm">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <b-breadcrumb
              v-if="items.length > 1"
              :items="items"
              class="mb-4 mt-2"
            ></b-breadcrumb>
            <div v-else style="height: 60px"></div>
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
import { mapGetters } from 'vuex'
import Footer from '../components/Footer'
import Head from '../components/Head'
import SideBar from '../components/SideBar'

export default {
  components: { Footer, Head, SideBar },
  data() {
    return {
      years: '2019 - ' + new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters({
      items: 'breadCrumbItems'
    })
  }
}
</script>
<style></style>
