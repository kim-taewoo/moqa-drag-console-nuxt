<template>
    <v-flex xs12 class="px-3">
        <v-subheader class="px-0 primary--text">{{label}}</v-subheader>
        <v-layout wrap>
            <v-flex class="xs12 sm4">
                <v-checkbox color="light-blue" label="전체" v-model="optionAll" hide-details @change="checkChanged"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm4 v-for="(option,index) in options" :key="index">
                <v-checkbox color="light-blue" :label="option" :value="option" v-model="selectedOption" hide-details @change="checkChanged"></v-checkbox>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
export default {
  name: "CheckBox",
  props: ["options", "label"],
  data() {
    return {
      selectedOption: []
    };
  },
  created() {
    this.selectedOption = this.options.slice();
  },
  methods: {
    checkChanged() {
      if (this.selectedOption.length == this.options.length) {
        var result = 'ALL'
      } else {
        var result = this.selectedOption
      }
      this.$emit("checkChanged", result);
    }
  },
  computed: {
    optionAll: {
      get() {
        if (this.selectedOption.length == this.options.length) {
          return true;
        } else {
          return false;
        }
      },
      set(event) {
        if (event) {
          this.selectedOption = this.options.slice();
        } else {
          this.selectedOption = [];
        }
      }
    }
  }
};
</script>

