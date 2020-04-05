<template>
  <div class="col-md-12 col-lg-8 main-content">
    <p>
      ممنون میشم نظرات ،پیشنهادات و یا انتقادات خودتون رو با من درمیون بذارید.
    </p>
    <div>
      <div class="row">
        <div class="col-md-4 form-group">
          <label for="name">نام</label>
          <input
            id="name"
            v-model="contact.name"
            type="text"
            class="form-control"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="phone">شماره تلفن</label>
          <input
            id="phone"
            v-model="contact.phone"
            dir="ltr"
            type="text"
            class="form-control"
          />
        </div>
        <div class="col-md-4 form-group">
          <label for="email">ایمیل</label>
          <input
            id="email"
            v-model="contact.email"
            dir="ltr"
            type="email"
            class="form-control "
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-group">
          <label for="message">پیام</label>
          <textarea
            id="message"
            v-model="contact.text"
            name="message"
            class="form-control "
            cols="30"
            rows="8"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <input
            @click="sendMessage"
            type="button"
            value="ارسال پیام"
            class="btn btn-primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      contact: {
        email: null,
        phone: null,
        name: null,
        text: null
      }
    }
  },
  middleware: 'routeValidator',
  methods: {
    ...mapMutations({
      setBreadCrumbItems: 'SET_BREADCRUMB_ITEMS'
    }),
    async sendMessage() {
      if (!this.contact.name) return this.$toast.error('نام وارد شده صحیح نیست')
      if (!this.contact.email || !this.$utils.validateEmail(this.contact.email))
        return this.$toast.error('ایمیل وارد شده صحیح نیست')
      if (!this.contact.text) return this.$toast.error('متن پیام صحیح نیست')

      try {
        await this.$axios.post('/message', this.contact)
        this.contact = {
          email: null,
          phone: null,
          name: null,
          text: null
        }
        this.$toast.success('پیام شما با موفقیت ثبت شد')
      } catch (error) {
        this.$toast.error('لطفا دوباره امتحان کنید')
      }
    }
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
