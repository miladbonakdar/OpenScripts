<template>
  <div>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-4">
            <span class="align-middle">
              <i class="fa fa-paw"></i>
              Post Item
            </span>
          </div>
          <div class="col-8">
            <b-link to="/post/item/new">
              <b-button size="sm" variant="primary" class="pull-right">
                <span class="fa fa-plus"></span> Create new post
              </b-button>
            </b-link>
          </div>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-8 my-1" v-if="item && item._id">
            <b-link :to="'/post/item/' + item._id">
              <b-button size="sm" variant="warning">
                <span class="fa fa-pencil"></span> Edit post
              </b-button>
            </b-link>
          </div>
          <div class="col-12 my-1">
            <json-viewer
              :value="itemSummary"
              :expand-depth="5"
              copyable
            ></json-viewer>
          </div>
          <div class="col-12 my-1">
            <json-viewer
              :value="item"
              :expand-depth="5"
              copyable
              boxed
              sort
            ></json-viewer>
          </div>
        </b-row>
      </div>
    </b-card>

    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle"> <i class="fa fa-paw"></i> Posts </span>
          </div>
        </b-row>
      </div>
      <b-table
        fixed
        hover
        :items="items"
        :fields="fields"
        empty-html="<h6>There are no item to show!</h6>"
      >
        <template slot-scope="row" slot="createdAt">
          {{ row.item.createdAt | moment('from') }}
          <b-badge>{{ row.item.createdAt | moment('YYYY-MM-DD') }}</b-badge>
        </template>

        <template slot-scope="row" slot="title">
          {{ row.item.title }}
          <b-badge variant="info">{{ row.item.readTime }} min</b-badge>
        </template>

        <template slot-scope="row" slot="createdBy">
          <b-badge variant="info">{{
            row.item.createdBy.firstName + ' ' + row.item.createdBy.lastName
          }}</b-badge>
        </template>

        <template slot-scope="row" slot="published">
          <template v-if="!row.item.published">
            <b-badge variant="warning">Not Yet </b-badge
            ><span
              @click="publishPost(row.item._id)"
              class="text-success mx-1 action-item"
              v-b-tooltip.hover
              title="Publish ?"
            >
              <i class="fa fa-check pointer"></i>
            </span>
          </template>
          <template v-else>
            <b-badge variant="success"
              >{{ row.item.publishedAt | moment('from') }}</b-badge
            ><span
              @click="unPublishPost(row.item._id)"
              class="text-danger mx-1 action-item"
              v-b-tooltip.hover
              title="Unpublish ?"
            >
              <i class="fa fa-times pointer"></i>
            </span>
          </template>
        </template>

        <template slot-scope="row" slot="color">
          <color-badge
            :color="row.item.color"
            v-on:randomize="randomizeColor(row.item._id)"
          ></color-badge>
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
import { mapMutations, mapActions } from 'vuex'
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
        { key: 'createdAt', label: 'Created At' },
        { key: 'createdBy', label: 'Created By' },
        { key: 'published', label: 'Published' },
        { key: 'actions', label: 'Actions' }
      ],
      pageOptions: [5, 10, 15],
      item: {},
      isEditeMode: false,
      itemSummary: {}
    }
  },
  created() {
    this.getList()
  },
  watch: {
    pageNumber() {
      this.changePage()
    },
    items() {
      this.$forceUpdate()
    }
  },
  methods: {
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    getList() {
      this.showLoading(true)
      this.$gate.post
        .page(this.pageSize, this.pageNumber - 1)
        .then((res) => {
          this.items = res.items
          this.total = res.total
          this.item = {}
          this.itemSummary = {}
        })
        .catch((err) => this.$handleError(err))
        .finally(() => {
          this.showLoading(false)
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
      this.$gate.post
        .delete(id)
        .then((res) => {
          this.$toasted.global.deleted()
          this.getList()
          this.allTags()
        })
        .catch((err) => this.$handleError(err))
    },
    changePage(page) {
      this.getList()
    },
    showDetails(item) {
      this.item = item
      this.itemSummary = {
        name: item.name,
        title: item.title,
        claps: item.claps,
        summary: item.summary,
        comments: item.comments,
        readTime: item.readTime,
        tags: item.tags.map((t) => t.name),
        createdBy: item.createdBy.firstName + item.createdBy.lastName,
        category: item.category.name,
        course: item.course.name,
        difficulty: item.difficulty
      }
      this.isEditeMode = true
    },
    randomizeColor(id) {
      this.$gate.post
        .randomizeColor({ id })
        .then((res) => {
          this.getList()
          this.$toasted.success('random color generated')
        })
        .catch((err) => this.$handleError(err))
    },
    publishPost(id) {
      this.$gate.post
        .publish({  postId: id })
        .then((res) => {
          this.getList()
          this.$toasted.success('post has been published')
        })
        .catch((err) => this.$handleError(err))
    },
    unPublishPost(id) {
      this.$gate.post
        .unPublish({  postId: id })
        .then((res) => {
          this.getList()
          this.$toasted.error('post has been unpublished')
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
