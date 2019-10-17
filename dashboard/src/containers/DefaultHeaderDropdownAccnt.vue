<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img src="/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com" />
    </template>
    <template slot="dropdown">
      <b-dropdown-item v-on:click="gotoPosts">
        <i class="fa fa-file" /> Posts
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

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  methods: {
    gotoPosts() {
      this.$router.psuh("/post/list");
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
    }
  }
};
</script>
