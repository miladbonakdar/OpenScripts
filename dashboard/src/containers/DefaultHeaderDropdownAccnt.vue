<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img v-if="user" :src="user.photoUrl" class="img-avatar" alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">
      <b-dropdown-item v-on:click="gotoPosts">
        <i class="fa fa-file" /> Posts
      </b-dropdown-item>
      <b-dropdown-item v-on:click="sync">
        <i class="fa fa-refresh" /> Sync
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item v-on:click="logOut">
        <i class="fa fa-lock" /> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { statics } from "../store/types";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  computed: {
    ...mapGetters({
      user: statics.getters.user
    })
  },
  methods: {
    ...mapActions({
      init: statics.actions.init
    }),
    ...mapMutations({
      setLoading: statics.mutations.loading
    }),
    gotoPosts() {
      this.$router.push("/post/list");
    },
    logOut() {
      this.$toasted.show("Are you sure you want to logout?", {
        action: [
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              localStorage.removeItem("user");
              localStorage.removeItem("loggedOn");
              localStorage.removeItem("token");
              document.location.href = `/auth/login`;
              toastObject.goAway(0);
            }
          },
          {
            text: "No",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        ]
      });
    },
    gotoProjects() {
      this.$router.replace("/agent/requests");
    },
    sync() {
      this.setLoading(true);
      this.init(() => this.setLoading(false));
    }
  }
};
</script>
