<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-xs-12 form-group search-top-form w-100">
        <label>خبرنامه</label>
        <input
          v-model="newsLetter.email"
          type="email"
          class="tanha news-letter text-center"
          placeholder="ایمیل خود را وارد کنید"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 form-group">
        <input
          type="submit"
          value="عضویت در خبرنامه"
          class="btn btn-primary btn-sm"
          @click="addToNewsLetter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsLetter: {
        email: null
      }
    }
  },
  methods: {
    async addToNewsLetter() {
      if (!this.newsLetter.email)
        return this.$toast.error('لطفا ایمیل خود را وارد کنید')
      if (!this.$utils.validateEmail(this.newsLetter.email))
        return this.$toast.error('ایمیل وارد شده صحیح نیست')
      try {
        await this.$axios.post('/news-letter', this.newsLetter)
        this.newsLetter.email = null
        this.$toast.success(
          'ایمیل شما ثبت شد. برای فعال سازی ایمیل خود را بررسی کنید'
        )
      } catch (error) {
        this.$toast.error(' این ایمیل پیشتر ثبت شده است')
      }
    }
  }
}
</script>

<style>
.news-letter {
  direction: ltr;
  width: 100%;
  color: #fff;
  background: #212121;
  border: none;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s all ease;
  padding: 4px 15px 4px 30px;
  font-size: 16px;
}
</style>
