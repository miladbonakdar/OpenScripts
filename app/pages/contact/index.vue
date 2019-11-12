<template>
  <div class="col-md-12 col-lg-8 main-content">
    <form action="#" method="post">
      <div class="row">
        <div class="col-md-4 form-group">
          <label for="name">Name</label>
          <input id="name" type="text" class="form-control " />
        </div>
        <div class="col-md-4 form-group">
          <label for="phone">Phone</label>
          <input id="phone" type="text" class="form-control " />
        </div>
        <div class="col-md-4 form-group">
          <label for="email">Email</label>
          <input id="email" type="email" class="form-control " />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-group">
          <label for="message">Write Message</label>
          <textarea
            id="message"
            name="message"
            class="form-control "
            cols="30"
            rows="8"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <input type="submit" value="Send Message" class="btn btn-primary" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'routeValidator',
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    })
  },
  created() {
    this.setBreadCrumbItems([
      {
        text: 'تماس با ما',
        href: `/contact`
      }
    ])
  }
}
</script>

<style></style>
