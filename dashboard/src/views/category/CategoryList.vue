<template>
  <div>
    <b-card>
      <div slot="header" class="clearfix">
        <b-row>
          <div class="col-md-4">
            <span class="align-middle">
              <i class="fa fa-list-ul"></i>
              {{isEditeMode ? 'Edite' : 'Create'}} Category
            </span>
          </div>
        </b-row>
      </div>

      <div class="animated fadeIn">
        <!-- <b-form validated> -->
        <b-row>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label>Category Name</label>
              <b-form-input type="text" placeholder="Name" v-model="item.name"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label for="name">Category Title</label>
              <b-form-input class="rtl" type="text" placeholder="Title" v-model="item.title"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-4">
            <b-form-group>
              <label>Category Image Url</label>
              <b-form-input type="text" placeholder="Image Url" v-model="item.imageUrl"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12">
            <json-viewer :value="item" :expand-depth="5" copyable boxed sort></json-viewer>
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
              <i class="fa fa-list-ul"></i> Categories
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
          <color-badge :color="row.item.color" v-on:randomize="randomizeColor(row.item._id)"></color-badge>
        </template>

        <template slot-scope="row" slot="imageUrl">
          <b-badge variant="success" v-if="row.item.imageUrl">Yes</b-badge>
          <b-badge variant="warning" v-else>No</b-badge>
        </template>

        <template slot-scope="row" slot="createdAt">
          {{row.item.createdAt | moment("from")}}
          <b-badge>{{row.item.createdAt | moment("YYYY-MM-DD") }}</b-badge>
        </template>

        <template slot="actions" slot-scope="row">
          <crud-actions
            v-on:deleteItem="deleteItem(row.item._id, row.index)"
            v-on:showDetails="showDetails(row.item)"
          />
        </template>
      </b-table>
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
      total: 10,
      items: [],
      fields: [
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        { key: "color", label: "Color" },
        { key: "imageUrl", label: "Has Image" },
        { key: "createdAt", label: "Created At" },
        { key: "actions", label: "Actions" }
      ],
      item: {},
      isEditeMode: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapMutations({
      showLoading: statics.mutations.loading
    }),
    ...mapActions({
      allCategories: statics.actions.allCategories
    }),
    getList() {
      this.showLoading(true);
      this.$gate.category
        .getAll()
        .then(res => {
          this.items = res;
        })
        .catch(err => this.$handleError(err))
        .finally(() => {
          this.showLoading(false);
          this.onCancel();
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
      this.$gate.category
        .delete(id)
        .then(res => {
          this.$toasted.global.deleted();
          this.getList();
          this.allCategories();
        })
        .catch(err => this.$handleError(err));
    },
    showDetails(item) {
      this.item = item;
      this.isEditeMode = true;
    },
    onCancel() {
      this.item = {};
      this.isEditeMode = false;
    },
    onSubmit() {
      if (!this.validate()) return;
      if (this.isEditeMode) {
        this.$gate.category
          .update(this.item)
          .then(res => {
            this.getList();
            this.allCategories();
            this.$toasted.success("item updated");
          })
          .catch(err => this.$handleError(err));
      } else {
        this.$gate.category
          .create(this.item)
          .then(res => {
            this.getList();
            this.allCategories();
            this.$toasted.success("item created");
          })
          .catch(err => this.$handleError(err));
      }
    },
    validate() {
      if (!this.item.name || this.item.name.length < 2)
        return this.error("name is not valid");
      if (!this.item.title || this.item.title.length < 2)
        return this.error("title is not valid");
      return true;
    },
    error(message) {
      this.$toasted.global.warn(message);
      return false;
    },
    randomizeColor(id) {
      this.$gate.category
        .randomizeColor({ id })
        .then(res => {
          this.getList();
          this.$toasted.success("random color generated");
        })
        .catch(err => this.$handleError(err));
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
