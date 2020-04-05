<template>
  <nav v-if="pages.length > 1" aria-label="Page navigation" class="text-center">
    <ul class="pagination">
      <li
        v-for="(page, $index) in pages"
        :key="$index"
        :class="{ active: page.number == currentPage }"
        class="page-item"
      >
        <nuxt-link :to="page.link" class="page-link">{{
          page.number
        }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pages: [],
      lastPage: 0,
      currentPage: 1
    }
  },
  watch: {
    total() {
      this.init()
    },
    pageSize() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.pages = []
      this.lastPage = 0
      this.currentPage = 1
      this.lastPage = Math.round(this.total / this.pageSize)
      this.currentPage = this.$route.params.page || 1
      this.currentPage = Math.max(Math.min(this.lastPage, this.currentPage), 1)
      this.createLinks()
    },
    createLinks() {
      if (this.currentPage !== 1)
        this.pages.push(this.createLink(this.currentPage - 1))

      this.pages.push(this.createLink(this.currentPage))

      if (this.isInRange(this.currentPage + 1))
        this.pages.push(this.createLink(this.currentPage + 1))
      else if (this.isInRange(this.currentPage - 2))
        this.pages.unshift(this.createLink(this.currentPage - 2))

      if (this.isInRange(this.currentPage + 2))
        this.pages.push(this.createLink(this.currentPage + 2))
      else if (this.isInRange(this.currentPage - 3))
        this.pages.unshift(this.createLink(this.currentPage - 3))
    },
    createLink(pageNumber) {
      return {
        link: `/page/${pageNumber}` + this.getPageParamsAndQueries(),
        number: pageNumber
      }
    },
    isInRange(pageNumber) {
      return pageNumber <= this.lastPage && pageNumber >= 1
    },
    getPageParamsAndQueries() {
      if (this.$route.name !== 'page-page') return ''
      return this.$route.fullPath.substr(this.$route.path.length)
    }
  }
}
</script>

<style></style>
