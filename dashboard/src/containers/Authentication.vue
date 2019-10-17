<template>
  <div class="app">
    <AppHeader fixed>
      <b-link class="navbar-brand" to="#">
        <img
          class="navbar-brand-full"
          src="/img/logo.png"
          width="120"
          height="35"
          alt="Home&Share Logo"
        />
      </b-link>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <TheFooter>
      <!--footer-->
      <div class="w-100 clearfix">
        <a href>Milawd</a>
        <span class="ml-1">&copy; 2019 Milawd</span>
        <span class="float-right">
          Version :
          <i class="font-xs badge-danger badge mr-1">1</i>
        </span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import { Header as AppHeader, Footer as TheFooter } from "@coreui/vue";
import { mapGetters } from "vuex";
import { statics } from "../store/types";

export default {
  name: "Authentication",
  components: {
    AppHeader,
    TheFooter
  }
};
</script>
