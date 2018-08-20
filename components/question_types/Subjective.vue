<template>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        fixed-tabs
      >
        <v-tab>
          문항
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center>
                <v-flex xs10 class="mt-3">
                  <v-text-field label="제목" v-model="qTitle"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
      
</template>

<script>
export default {
  name: "Subjective",
  props: ["questionIndex"],
  data() {
    return {
      panel: [true],
      qTitle: null,
      active: null,
      options: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      options2: ["이상", "이하"],
      logicOption: ["다음문항", "자격박탈", "설문 종료", "3.lorem..."],
      logicCards: [],
      imageUrl: null
    };
  },
  methods: {
    addLogicCard() {
      this.logicCardOrder++;
      this.logicCards.push(this.logicCardOrder);
    },
    deleteLogic(logic) {
      this.logicCards.splice(this.logicCards.indexOf(logic), 1);
    }
  }
};
</script>

<style>
.v-expansion-panel__header {
  background: #00bcd4;
  color: white;
}
.header__icon {
  color: white;
}
.q-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>