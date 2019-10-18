<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img
          class="navbar-brand-full"
          src="/img/logo.png"
          width="35"
          height="35"
          alt="HomeShare Logo"
        />
        <img
          class="navbar-brand-minimized"
          src="/img/logo.png"
          width="35"
          height="35"
          alt="HomeShare Logo"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />
      <b-navbar-nav class="d-md-down">
        <b-nav-item class="px-3 d-md-down-none" to="'/dashboard'">Dashboard</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="font-lg" v-if="staticsLoaded && user">
          <b-link to="'/dashboard'">
            <i>
              {{ user.firstName | upperChar }}
              {{ user.lastName | upperChar }}
            </i>
          </b-link>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt />
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
      <AsideToggler class="d-lg-none" mobile />
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav v-if="staticsLoaded" :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view v-if="staticsLoaded"></router-view>
        </div>
      </main>
      <AppAside class="overflow-auto" fixed>
        <DefaultAside />
        <!--aside-->
      </AppAside>
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
import nav from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { statics } from "../store/types";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: null,
      bellHovered: false,
      ignoreForBreadCrumb: ["Estate detail"],
      staticsLoaded: false,
      loadingEvents: false
    };
  },
  created() {
    this.showLoading(true);
    this.$errorBus.$on("internal-server", this.handleInternalServerError);
    this.$errorBus.$on("bad-request", this.handleBadRequestError);
    this.$errorBus.$on("access-denied", this.handleAccessDeniedError);
    this.init({
      done: err => {
        if (err) {
          console.error(err);
          this.$toasted.info("please refresh the page to sync again");
          this.$toasted.global.error("problem in syncing statics data.");
        } else {
          this.staticsLoaded = true;
          this.nav = nav.items;
        }
        this.showLoading(false);
      }
    });
  },
  beforeDestroy() {
    this.$errorBus.$off("internal-server", this.handleInternalServerError);
    this.$errorBus.$off("bad-request", this.handleBadRequestError);
    this.$errorBus.$off("access-denied", this.handleAccessDeniedError);
  },
  computed: {
    ...mapGetters({
      user: statics.getters.user
    }),
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route =>
          (route.name || route.meta.label) &&
          this.ignoreForBreadCrumb.indexOf(route.name) < 0
      );
    }
  },
  methods: {
    ...mapActions({
      init: statics.actions.init
    }),
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    handleInternalServerError(msg) {
      this.$toasted.global.error(msg);
    },
    handleBadRequestError(msg) {
      this.$toasted.global.error(msg);
    },
    handleAccessDeniedError(msg) {
      this.$toasted.global.error(msg);
    }
  }
};
</script>
<style scoped>
.btn-secondary {
  color: white !important;
  background-color: transparent !important;
  border-color: transparent !important;
}

.badge {
  top: 50% !important;
  left: 40% !important;
  font-size: 14px;
}

button {
  cursor: pointer !important;
}

.icon-item {
  font-size: 1.5rem;
  font-weight: bold;
  color: #20a8d8;
  cursor: pointer;
}
</style>
