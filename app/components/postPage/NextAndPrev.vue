<template>
  <div class="clearfix">
    <nuxt-link
      v-if="prev"
      :to="`/category/${category}/section/${course}/${prev.name}`"
      dir="ltr"
      class="btn btn-primary float-right"
      ><span class="fa fa-chevron-left"></span> {{ prev.title }}</nuxt-link
    >
    <nuxt-link
      v-if="next"
      :to="`/category/${category}/section/${course}/${next.name}`"
      dir="ltr"
      class="btn btn-primary float-left"
    >
      {{ next.title }} <span class="fa fa-chevron-right"></span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: String
    },
    course: {
      required: true,
      type: String
    },
    next: {
      type: Object
    },
    prev: {
      type: Object
    }
  }
}
</script>

<style></style>
