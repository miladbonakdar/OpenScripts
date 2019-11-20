<template>
  <div class="col-md-12 col-lg-4 sidebar">
    <div class="sidebar-box">
      <NanoPostViewer
        title="پست های برتر"
        :posts="$store.state.popularPosts"
      ></NanoPostViewer>
    </div>

    <Categories></Categories>
    <Courses></Courses>
    <Tags></Tags>
    <Bio></Bio>
  </div>
</template>
<script>
import NanoPostViewer from './post/NanoPostViewer'
import Categories from './lists/Categories'
import Tags from './lists/Tags'
import Courses from './lists/Courses'
import Bio from './Bio'

export default {
  components: { NanoPostViewer, Categories, Courses, Tags, Bio },
  data() {
    return {}
  }
}
</script>
<style></style>
