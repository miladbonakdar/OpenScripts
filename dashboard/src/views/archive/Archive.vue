<template>
  <div>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle">
              <i class="fa fa-trash-o"></i> Archive Item
            </span>
          </div>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-12">
            <json-viewer :value="item" :expand-depth="5" copyable boxed sort></json-viewer>
          </div>
        </b-row>
      </div>
    </b-card>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle">
              <i class="fa fa-trash-o"></i> Archived
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
        <template slot-scope="row" slot="archivedAt">
          {{row.item.archivedAt | moment("from")}}
          <b-badge>{{row.item.archivedAt | moment("YYYY-MM-DD") }}</b-badge>
        </template>
        <template
          slot-scope="row"
          slot="archivedBy"
        >{{row.item.archivedBy.firstName +' '+row.item.archivedBy.lastName}}</template>

        <template slot="collectionName" slot-scope="row">
          <b-badge variant="warning">{{row.item.collectionName }}</b-badge>
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
          <b-form-select v-model="pageSize" :options="pageOptions" @change="changePage"></b-form-select>
        </b-form-group>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { statics } from "../../store/types";

export default {
  components: {},
  data() {
    return {
      item: {},
      pageNumber: 1,
      pageSize: 5,
      total: 10,
      items: [],
      fields: [
        { key: "collectionName", label: "Collection Name" },
        { key: "archivedBy", label: "Archived By" },
        { key: "archivedAt", label: "Archived At" },
        { key: "actions", label: "Actions" }
      ],
      pageOptions: [5, 10, 15]
    };
  },
  created() {
    this.getList();
  },
  watch: {
    pageNumber() {
      this.changePage();
    },
    items() {
      this.$forceUpdate();
    }
  },
  methods: {
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    getList() {
      this.showLoading(true);
      this.$gate.archive
        .page(this.pageSize, this.pageNumber - 1)
        .then(res => {
          this.items = res.items;
          this.total = res.total;
          this.item = {};
        })
        .catch(err => this.$handleError(err))
        .finally(() => {
          this.showLoading(false);
        });
    },
    deleteItem(id) {
      this.$toasted.show("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              this.deleteItemFromDb(id);
              toastObject.goAway(0);
            }
          },
          {
            text: "No",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        ]
      });
    },
    deleteItemFromDb(id) {
      this.$gate.archive
        .delete(id)
        .then(res => {
          this.$toasted.global.deleted();
          this.getList();
        })
        .catch(err => this.$handleError(err));
    },
    changePage(page) {
      this.getList();
    },
    showDetails(item) {
      this.item = item;
    }
  }
};
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
