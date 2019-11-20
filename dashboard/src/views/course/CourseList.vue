<template>
  <div>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle">
              <i class="fa fa-television"></i>
              {{ isEditeMode ? 'Edite' : 'Create' }} Course
            </span>
          </div>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label>Course Name</label>
              <b-form-input
                type="text"
                placeholder="Name"
                v-model="item.name"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label for="name">Course Title</label>
              <b-form-input
                class="rtl"
                type="text"
                placeholder="Title"
                v-model="item.title"
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
            <b-form-group>
              <label for="name">Category</label>
              <multi-select
                class="pointer"
                :internal-search="true"
                :allow-empty="false"
                v-model="selectedCategory"
                track-by="_id"
                label="name"
                :options="allCategories"
              ></multi-select>
            </b-form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label>Course Image Url</label>
              <b-form-input
                type="text"
                placeholder="Image Url"
                v-model="item.imageUrl"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12">
            <json-viewer
              :value="item"
              :expand-depth="5"
              copyable
              boxed
              sort
            ></json-viewer>
          </div>
        </b-row>
        <submit-group v-on:onCancel="onCancel" v-on:onSubmit="onSubmit" />
      </div>
    </b-card>

    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle">
              <i class="fa fa-television"></i> Courses
            </span>
          </div>
        </b-row>
      </div>
      <b-table
        hover
        fixed
        :items="items"
        :fields="fields"
        show-empty
        empty-html="<h6>There are no item to show!</h6>"
      >
        <template slot-scope="row" slot="color">
          <color-badge
            :color="row.item.color"
            v-on:randomize="randomizeColor(row.item._id)"
          ></color-badge>
        </template>

        <template slot-scope="row" slot="createdAt">
          {{ row.item.createdAt | moment('from') }}
          <b-badge>{{ row.item.createdAt | moment('YYYY-MM-DD') }}</b-badge>
        </template>

        <template slot-scope="row" slot="difficulty">
          <b-badge variant="danger" v-if="row.item.difficulty === 4"
            >Ya Khoda</b-badge
          >
          <b-badge variant="warning" v-else-if="row.item.difficulty === 3"
            >Very Hard</b-badge
          >
          <b-badge variant="primary" v-else-if="row.item.difficulty === 2"
            >Hard</b-badge
          >
          <b-badge variant="info" v-else-if="row.item.difficulty === 1"
            >Medium</b-badge
          >
          <b-badge variant="success" v-else>Easy</b-badge>
        </template>

        <template slot-scope="row" slot="imageUrl">
          <b-badge variant="success" v-if="row.item.imageUrl">Yes</b-badge>
          <b-badge variant="warning" v-else>No</b-badge>
        </template>

        <template slot="actions" slot-scope="row">
          <crud-actions
            v-on:deleteItem="deleteItem(row.item._id, row.index)"
            v-on:showDetails="showDetails(row.item)"
          />
        </template>
      </b-table>
      <b-row class="px-3">
        <b-pagination
          v-model="pageNumber"
          :total-rows="total"
          :per-page="pageSize"
          class="my-1 float-left"
        ></b-pagination>
        <b-form-group class="sortComp">
          <b-form-select
            v-model="pageSize"
            :options="pageOptions"
            @change="changePage"
          ></b-form-select>
        </b-form-group>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { statics } from '../../store/types'

export default {
  components: {},
  data() {
    return {
      pageNumber: 1,
      pageSize: 5,
      total: 10,
      items: [],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'title', label: 'Title' },
        { key: 'color', label: 'Color' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'imageUrl', label: 'Has Image' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'actions', label: 'Actions' }
      ],
      pageOptions: [5, 10, 15],
      selectedDifficulty: null,
      item: {},
      isEditeMode: false,
      selectedCategory: null
    }
  },
  created() {
    this.getList()
    this.selectedDifficulty = this.difficulties[0]
  },
  watch: {
    pageNumber() {
      this.changePage()
    },
    items() {
      this.$forceUpdate()
    }
  },
  computed: {
    ...mapGetters({
      allCategories: statics.getters.allCategories,
      difficulties: statics.getters.difficulties
    })
  },
  methods: {
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    ...mapActions({
      allCourses: statics.actions.allCourses
    }),
    getList() {
      this.showLoading(true)
      this.$gate.course
        .page(this.pageSize, this.pageNumber - 1)
        .then((res) => {
          this.items = res.items
          this.total = res.total
        })
        .catch((err) => this.$handleError(err))
        .finally(() => {
          this.showLoading(false)
          this.onCancel()
        })
    },
    deleteItem(id) {
      this.$toasted.show('Are you sure you want to delete this item?', {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              this.deleteItemFromDb(id)
              toastObject.goAway(0)
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    deleteItemFromDb(id) {
      this.$gate.course
        .delete(id)
        .then((res) => {
          this.$toasted.global.deleted()
          this.getList()
          this.allCourses()
        })
        .catch((err) => this.$handleError(err))
    },
    changePage(page) {
      this.getList()
    },
    showDetails(item) {
      this.item = item
      this.selectedDifficulty = this.difficulties.filter(
        (i) => i.value == item.difficulty
      )[0]
      this.selectedCategory = this.allCategories.filter(
        (i) => i._id == item.category
      )[0]
      this.isEditeMode = true
    },
    onCancel() {
      this.item = {}
      this.isEditeMode = false
      this.selectedDifficulty = this.difficulties[0]
      this.selectedCategory = this.allCategories[0]
    },
    onSubmit() {
      if (!this.validate()) return
      if (this.isEditeMode) {
        this.$gate.course
          .update(this.item)
          .then((res) => {
            this.getList()
            this.allCourses()
            this.$toasted.success('item updated')
          })
          .catch((err) => this.$handleError(err))
      } else {
        this.$gate.course
          .create(this.item)
          .then((res) => {
            this.getList()
            this.allCourses()
            this.$toasted.success('item created')
          })
          .catch((err) => this.$handleError(err))
      }
    },
    validate() {
      if (!this.item.name || this.item.name.length < 2)
        return this.error('name is not valid')
      if (!this.selectedCategory || !this.selectedCategory._id)
        return this.error('category is not valid')
      if (!this.item.title || this.item.title.length < 2)
        return this.error('title is not valid')
      this.item.difficulty = this.selectedDifficulty.value
      this.item.category = this.selectedCategory._id
      return true
    },
    error(message) {
      this.$toasted.global.warn(message)
      return false
    },
    randomizeColor(id) {
      this.$gate.course
        .randomizeColor({ id })
        .then((res) => {
          this.getList()
          this.$toasted.success('random color generated')
        })
        .catch((err) => this.$handleError(err))
    }
  }
}
</script>

<style>
.sortComp {
  width: 100px;
  padding-left: 10px;
  padding-top: 4px;
}

.newButton {
  margin-bottom: 10px;
}
</style>
