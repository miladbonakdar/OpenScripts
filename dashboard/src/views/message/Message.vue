<template>
  <div>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-4">
            <span class="align-middle">
              <i class="fa fa-bell-o"></i>
              Message Item
            </span>
          </div>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
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
            <span class="align-middle">
              <i class="fa fa-bell-o"></i> Messages
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
        <template slot-scope="row" slot="createdAt">
          {{ row.item.createdAt | moment('from') }}
          <b-badge>{{ row.item.createdAt | moment('YYYY-MM-DD') }}</b-badge>
        </template>

        <template slot-scope="row" slot="color">
          <color-badge
            :color="row.item.color"
            v-on:randomize="randomizeColor(row.item._id)"
          ></color-badge>
        </template>

        <template slot-scope="row" slot="text">
          <span v-b-tooltip.hover :title="row.item.text">{{
            row.item.text | sub(15)
          }}</span>
        </template>

        <template slot-scope="row" slot="telegramUsername">
          <b-badge v-if="!row.item.telegramUsername">Empty</b-badge>
          <b-badge
            variant="info"
            v-else
            v-b-tooltip.hover
            :title="row.item.telegramUsername"
            >{{ row.item.telegramUsername | sub(10) }}</b-badge
          >
        </template>

        <template slot-scope="row" slot="phone">
          <b-badge v-if="!row.item.phone">Empty</b-badge>
          <b-badge variant="info" v-else>{{ row.item.phone }}</b-badge>
        </template>

        <template slot-scope="row" slot="readed">
          <b-badge v-if="row.item.readed" variant="success">Yes</b-badge>
          <template v-else>
            <b-badge variant="warning">Not yet</b-badge>
            <span
              @click="readMessage(row.item._id)"
              class="text-info mx-1 action-item"
            >
              <i class="ml-1 fa fa-eye pointer">Read</i>
            </span>
          </template>
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
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'color', label: 'Color' },
        { key: 'text', label: 'Text' },
        { key: 'readed', label: 'Readed' },
        { key: 'telegramUsername', label: 'Telegram' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'actions', label: 'Actions' }
      ],
      pageOptions: [5, 10, 15],
      item: {}
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
    ...mapActions({
      notReadedMessages: statics.actions.notReadedMessages
    }),
    showDetails(item) {
      this.item = item
    },
    getList() {
      this.showLoading(true)
      this.$gate.message
        .page(this.pageSize, this.pageNumber - 1)
        .then(res => {
          this.items = res.items
          this.total = res.total
          this.item = {}
        })
        .catch(err => this.$handleError(err))
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
      this.$gate.message
        .delete(id)
        .then(res => {
          this.$toasted.global.deleted()
          this.getList()
          this.notReadedMessages()
        })
        .catch(err => this.$handleError(err))
    },
    changePage(page) {
      this.getList()
    },
    randomizeColor(id) {
      this.$gate.message
        .randomizeColor({ id })
        .then(res => {
          this.getList()
          this.notReadedMessages()
          this.$toasted.success('random color generated')
        })
        .catch(err => this.$handleError(err))
    },
    readMessage(id) {
      this.$gate.message
        .read({ id })
        .then(res => {
          this.getList()
          this.notReadedMessages()
          this.$toasted.success('updated')
        })
        .catch(err => this.$handleError(err))
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
