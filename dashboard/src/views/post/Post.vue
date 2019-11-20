<template>
  <div>
    <b-card :header="isEditMode ? 'Edite Post' : 'Create Post'">
      <b-row>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="name">
            <b-form-input
              type="text"
              v-model="post.name"
              placeholder="Enter the name"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group>
            <label for="name">Title</label>
            <b-form-input
              class="rtl"
              type="text"
              placeholder="Title"
              v-model="post.title"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Tags">
            <multiSelect
              v-model="post.tags"
              :options="allTags"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Pick some"
              label="name"
              track-by="_id"
            ></multiSelect>
          </b-form-group>
        </div>

        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Course">
            <multi-select
              class="pointer"
              v-model="post.course"
              track-by="_id"
              label="name"
              @select="getCourseDetails"
              :options="allCourses"
            ></multi-select>
          </b-form-group>
        </div>

        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Category">
            <multi-select
              class="pointer"
              v-model="selectedCategory"
              track-by="_id"
              label="name"
              disabled
              :options="allCategories"
            ></multi-select>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Post Number">
            <b-form-input
              type="number"
              v-model="post.postNumber"
              placeholder="Post Number"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group>
            <label>Difficulty</label>
            <multi-select
              class="pointer"
              :internal-search="true"
              :allow-empty="false"
              track-by="value"
              label="name"
              :options="difficulties"
              v-model="selectedDifficulty"
            ></multi-select>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Read Time">
            <b-form-input
              type="number"
              v-model="post.readTime"
              placeholder="Read Time"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Image Url">
            <b-form-input
              type="text"
              v-model="post.imageUrl"
              placeholder="Image url"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Youtube Url">
            <b-form-input
              type="text"
              v-model="post.video.youTubeVideoUrl"
              placeholder="Youtube Url"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="Aparat Url">
            <b-form-input
              type="text"
              v-model="post.video.aparatVideoUrl"
              placeholder="Aparat Url"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="video Length (seconds)">
            <b-form-input
              type="number"
              v-model="post.video.length"
              placeholder="video length (seconds)"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-4">
          <b-form-group label="video size (bytes)">
            <b-form-input
              type="number"
              v-model="post.video.size"
              placeholder="video size (bytes)"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12">
          <b-form-group label="summary">
            <b-form-textarea
              class="rtl"
              style="overflow-y: hidden !important"
              v-model="post.summary"
              placeholder="summary"
              rows="3"
            ></b-form-textarea>
          </b-form-group>
        </div>
      </b-row>
      <submit-group v-on:onCancel="onCancel" v-on:onSubmit="checkUpdate" />
    </b-card>

    <b-card>
      <div slot="header">
        <b-row>
          <span class="align-middle col-12">
            <i class="fa fa-pencil"></i>
            Post Content
          </span>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-12">
            <b-button-group>
              <b-button
                size="sm"
                @click="selectedPanel = 'md'"
                :variant="selectedPanel == 'md' ? 'primary' : ''"
              >
                <i class="fa fa-pencil"></i> Markdown
              </b-button>
              <b-button
                size="sm"
                @click="
                  selectedPanel = 'demo'
                  generateHtml()
                "
                :variant="selectedPanel == 'demo' ? 'primary' : ''"
              >
                <i class="fa fa-code"></i> Demo
              </b-button>
            </b-button-group>
          </div>
          <div class="col-12 mt-2">
            <quill-editor
              class="editor-example bubble"
              v-show="selectedPanel == 'md'"
              v-model="post.contentMarkdown"
              placeholder="متن"
            ></quill-editor>
            <div
              class="card card-body bg-light"
              v-html="post.content"
              v-show="selectedPanel == 'demo'"
            ></div>
          </div>
        </b-row>

        <submit-group v-on:onCancel="onCancel" v-on:onSubmit="checkUpdate" />
      </div>
    </b-card>

    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <span class="align-middle col-12">
            <i class="fa fa-paw"></i>
            Post Item
          </span>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-12">
            <json-viewer
              :value="post"
              :expand-depth="5"
              copyable
              boxed
              sort
            ></json-viewer>
          </div>
        </b-row>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { statics } from '../../store/types'

export default {
  data() {
    return {
      post: {
        video: {}
      },
      selectedDifficulty: null,
      selectedPanel: 'md',
      selectedCategory: null
    }
  },
  created() {
    if (this.isEditMode) this.setPost()
  },
  methods: {
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    validate() {
      if (!this.post.name || this.post.name.length < 2)
        return this.error('name is not valid')
      if (!this.post.title || this.post.title.length < 2)
        return this.error('title is not valid')
      if (!this.post.readTime) return this.error('readTime is not valid')
      if (!this.post.summary || this.post.summary.length < 10)
        return this.error('summary is not valid')
      if (!this.post.postNumber) return this.error('postNumber is not valid')
      if (!this.selectedCategory) return this.error('category is not valid')
      if (!this.post.course) return this.error('course is not valid')

      this.post.category = this.selectedCategory
      this.post.difficulty = this.selectedDifficulty.value
      this.generateHtml()
      return true
    },
    error(message) {
      this.$toasted.global.warn(message)
      return false
    },
    setPost() {
      this.showLoading(true)
      this.$gate.post
        .get(this.$route.params.id)
        .then((res) => {
          this.post = res
          this.selectedDifficulty = this.difficulties.filter(
            (d) => d.value == res.difficulty
          )[0]
          this.selectedCategory = this.allCategories.filter(
            (c) => c._id == res.category._id
          )[0]
          this.generateHtml()
        })
        .catch((err) => this.$handleError(err))
        .finally(() => this.showLoading(false))
    },
    createPost() {
      this.showLoading(true)
      this.$gate.post
        .create(this.post)
        .then((res) => {
          this.$toasted.success('post created successfully.')
          this.$router.push(`/post/list`)
        })
        .catch((err) => this.$handleError(err))
        .finally(() => {
          this.showLoading(false)
        })
    },
    updatePost() {
      this.showLoading(true)
      this.$gate.post
        .update(this.post)
        .then((res) => {
          this.$toasted.success('post updated.')
        })
        .catch((err) => this.$handleError(err))
        .finally(() => this.showLoading(false))
    },
    onCancel() {
      this.$router.push('/post/list')
    },
    checkUpdate() {
      if (!this.validate()) return
      this.isEditMode ? this.updatePost() : this.createPost()
    },
    getCourseDetails(item) {
      this.$gate.post
        .courseDetails(item._id)
        .then((res) => {
          this.post.postNumber = res.postNumber
          this.selectedDifficulty = this.difficulties.filter(
            (i) => i.value == res.difficulty
          )[0]
          this.post.category = this.allCategories.filter(
            (i) => i._id == res.category
          )[0]
          this.selectedCategory = this.post.category
          this.$forceUpdate()
        })
        .catch((err) => this.$handleError(err))
        .finally(() => this.showLoading(false))
    },
    generateHtml() {
      this.post.content = this.post.contentMarkdown
      setTimeout(() => {
        hljs.configure({ useBR: false })
        document.querySelectorAll('pre.ql-syntax').forEach((block) => {
          hljs.highlightBlock(block)
        })
      })
    }
  },
  computed: {
    isEditMode() {
      return this.$route.params.id !== 'new'
    },
    ...mapGetters({
      allTags: statics.getters.allTags,
      allCategories: statics.getters.allCategories,
      difficulties: statics.getters.difficulties,
      allCourses: statics.getters.allCourses
    })
  }
}
</script>
<style scoped></style>
