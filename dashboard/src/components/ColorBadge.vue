<template>
  <div>
    <span class="badge" v-bind:style="{'background-color':color , color: 'white'}">{{color}}</span>
    <span
      @click="randomColor"
      class="text-warning mx-1 action-item"
      v-b-tooltip.hover
      title="Random color"
    >
      <i class="fa fa-refresh pointer"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "color-badge",
  props: {
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    randomColor(id) {
      this.$toasted.show("Are you sure you want randomize the color?", {
        action: [
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              this.randomize(id);
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
    randomize(id) {
      this.$emit("randomize");
    }
  }
};
</script>

<style scoped>
</style>
