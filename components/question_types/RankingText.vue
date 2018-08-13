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
                <v-flex xs10>
                  <v-text-field label="제목" v-model="qTitle"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1 v-for="(option,index) in options" :key="index">
                  <v-text-field @click:append="deleteOption(option)" append-icon="delete" :label="(index+1).toString()" v-model="options[index]"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1>
                  <v-text-field label="선택지 (Tab 키로 추가)" v-model="anotherOption" @keydown.tab.prevent="addOption"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab>
          옵션
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center align-center>
                <v-flex xs6>
                  <v-switch
                    label="멀티미디어형"
                    v-model="multimediaSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                    <v-btn @click="onPickFile" :disabled="!multimediaSwitch" class="primary">
                        Upload <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">
                </v-flex>
                <v-flex class="xs12">
                    <img
                    v-for="(img,index) in imageUrl"
                    :key="index"
                    :src="img"
                    width="100%"
                    alt="">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>        
      </v-tabs>
</template>

<script>
export default {
  name: "RankingText",
  props: ["questionIndex"],
  methods: {
    addOption() {
      if (this.anotherOption) {
        this.options.push(this.anotherOption);
        this.anotherOption = null;
        this.feedback = null;
      } else {
        this.feedback = "빈칸 선택지는 사용할 수 없습니다.";
      }
    },
    deleteOption(option) {
      this.options = this.options.filter(opt => {
        return opt != option;
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      console.log("1:", files);
      const file = files[0];
      let filename = file.name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("유효한 이미지 파일을 업로드 해주세요!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl.push(fileReader.result);
      });
      fileReader.readAsDataURL(file);
    }
  },
  data() {
    return {
      rules: {
        option: [val => (val || "").length > 0 || this.feedback]
      },
      feedback: null,
      anotherOption: null,
      options: [],
      imageUrlQ: ["none", "none", "none", "none", "none", "none"],
      imageUrl: [],
      multimediaSwitch: false,
      qTitle: null,
      panel: [true],
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
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
