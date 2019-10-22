<template>
  <b-tabs>
    <b-tab>
      <template slot="title">
        <i class="fa fa-comments-o"></i>
      </template>
      <b-list-group class="list-group-accent">
        <b-list-group-item
          class="bg-info text-center font-weight-bold text-uppercase small"
        >Comments</b-list-group-item>
        <b-list-group-item
          v-for="comment in notAcceptedComments"
          v-bind:key="comment._id"
          class="list-group-item-divider"
          :style="{'border-left' : '4px solid' + comment.color}"
        >
          <div>
            <span class="fa fa-user-o"></span> User:
            <strong>{{comment.name}}</strong>
          </div>
          <div class="mt-1">
            <i class="icon-calendar"></i>&nbsp;&nbsp;
            <b-badge>{{comment.createdAt | moment("from") }}</b-badge>
          </div>
          <div class="w-100 mt-1">
            <i class="fa fa-pencil text-info"></i>&nbsp;&nbsp;
            <span class="text-muted mt-2">{{comment.text}}</span>
          </div>
          <small class="text-danger mr-3 pointer" @click="deleteItem(comment._id,'comment')">
            <i class="fa fa-trash-o"></i>&nbsp;&nbsp;Delete
          </small>
          <small class="text-success pointer" @click="acceptComment(comment._id)">
            <i class="fa fa-check"></i>&nbsp;&nbsp;Accept
          </small>
        </b-list-group-item>
      </b-list-group>
    </b-tab>
    <b-tab>
      <template slot="title">
        <i class="fa fa-bell-o"></i>
      </template>
      <b-list-group class="list-group-accent">
        <b-list-group-item
          class="bg-success text-center font-weight-bold text-uppercase small"
        >Messages</b-list-group-item>

        <b-list-group-item
          v-for="message in notReadedMessages"
          v-bind:key="message._id"
          class="list-group-item-divider"
          :style="{'border-left' : '4px solid' + message.color}"
        >
          <div>
            <span class="fa fa-user-o"></span> User:
            <strong>{{message.name}}</strong>
          </div>
          <div>
            <span class="fa fa-mail"></span> email:
            <strong>{{message.email}}</strong>
          </div>
          <div class="mt-1">
            <i class="icon-calendar"></i>&nbsp;&nbsp;
            <b-badge>{{message.createdAt | moment("from") }}</b-badge>
          </div>
          <div class="w-100 mt-1">
            <i class="fa fa-pencil text-info"></i>&nbsp;&nbsp;
            <span class="text-muted mt-2">{{message.text}}</span>
          </div>
          <small class="text-danger mr-3 pointer" @click="deleteItem(message._id,'message')">
            <i class="fa fa-trash-o"></i>&nbsp;&nbsp;Delete
          </small>
          <small class="text-success pointer" @click="readMessage(message._id)">
            <i class="fa fa-eye"></i>&nbsp;&nbsp;Read
          </small>
        </b-list-group-item>
        <b-list-group-item
          v-if="notReadedMessages.length > 0"
          class="bg-danger text-center font-weight-bold small pointer"
          @click="readAll()"
        >
          <span class="fa fa-check"></span> Read All
        </b-list-group-item>
      </b-list-group>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Switch as cSwitch } from "@coreui/vue";
import { mapGetters, mapActions } from "vuex";
import { statics } from "../store/types";

export default {
  name: "DefaultAside",
  components: {
    cSwitch
  },
  methods: {
    ...mapActions({
      getMessages: statics.actions.notReadedMessages,
      getComments: statics.actions.notAcceptedComments
    }),
    acceptComment(id) {
      this.$gate.comment
        .accept({ id })
        .then(res => {
          this.$toasted.success("accepted");
          this.getComments();
        })
        .catch(err => this.$handleError(err));
    },
    readMessage(id) {
      this.$gate.message
        .read({ id })
        .then(res => {
          this.$toasted.success("updated");
          this.getMessages();
        })
        .catch(err => this.$handleError(err));
    },
    readAll() {
      this.$gate.message
        .readAll()
        .then(res => {
          this.$toasted.success("all messages seted as readed");
          this.getMessages();
        })
        .catch(err => this.$handleError(err));
    },
    deleteItem(id, controller) {
      this.$toasted.show("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              this.deleteItemFromDb(id, controller);
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
    deleteItemFromDb(id, controller) {
      this.$gate[controller]
        .delete(id)
        .then(res => {
          this.$toasted.global.deleted();
          this.getMessages();
          this.getComments();
        })
        .catch(err => this.$handleError(err));
    }
  },
  computed: {
    ...mapGetters({
      notAcceptedComments: statics.getters.notAcceptedComments,
      notReadedMessages: statics.getters.notReadedMessages
    })
  }
};
</script>
