<template>
  <div class="sidebar-box mt-5">
    <div class="bio text-center">
      <img :src="user.photoUrl" :alt="user.email" class="img-fluid" />
      <div class="bio-body">
        <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
        <p>
          {{ user.info }}
        </p>
        <p>
          <nuxt-link to="/about" class="btn btn-primary btn-sm"
            >درباره ی من</nuxt-link
          >
        </p>
        <p class="social">
          <a :href="user.telegramLink" target="_blank" class="p-2"
            ><span class="fa fa-telegram"></span
          ></a>
          <a :href="user.whatsappLink" target="_blank" class="p-2"
            ><span class="fa fa-whatsapp"></span
          ></a>
          <a :href="user.twitterLink" target="_blank" class="p-2"
            ><span class="fa fa-twitter"></span
          ></a>
          <a :href="user.instagramLink" target="_blank" class="p-2"
            ><span class="fa fa-instagram"></span
          ></a>
          <a :href="'mailto:' + user.email" class="p-2"
            ><span class="fa fa-google"></span
          ></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'randomUser'
    })
  }
}
</script>

<style></style>
