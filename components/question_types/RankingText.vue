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
                <v-flex @click="onPickFile" v-if="!imageUrl" style="position: absolute; top:0; height: 40px; left:0; right: 0;" xs12 class="text-xs-center grey lighten-3">
                 
                  <span><v-icon>image_search</v-icon> 이미지 삽입하기 </span>
                  <v-menu
                    open-on-hover
                    offset-x
                  >
                    <v-btn slot="activator" icon class="mb-2 mx-0" color="grey--text"><v-icon style="font-size:20px;">help_outline</v-icon></v-btn>

                    <v-card>
                      <v-list>
                        <v-list-tile>

                          <v-list-tile-content>
                            <v-list-tile-title><span>예시 이미지</span></v-list-tile-title>
                            <v-list-tile-sub-title>앱에서 문항 위쪽에 들어갈 이미지입니다.</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>

                      <v-divider></v-divider>

                      <div class="example-image-container">
                        <img class="example-image" :src="require('@/assets/typeExamples/BackgroundImage.png')" alt="">
                      </div>

                    </v-card>
                  </v-menu>               
                 
                </v-flex>
                <v-flex v-else class="xs10 text-xs-center">
                  <img
                  v-for="(img,index) in imageUrl"
                  :key="index"
                  :src="img"
                  width="40%"
                  alt="">
                  <div>
                    <v-btn small color="primary" @click="onPickFile">이미지 변경<v-icon right dark>cloud_upload</v-icon></v-btn>
                  </div>
                </v-flex>
                <v-flex xs10 class="mt-3">
                  <v-text-field label="제목" v-model="qTitle"></v-text-field>
                  <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">
                </v-flex>
                <v-flex xs9 offset-xs1 v-for="(option,index) in options" :key="index">
                  <v-text-field @click:append="deleteOption(option)" append-icon="delete" :label="(index+1).toString()" v-model="options[index]"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1>
                  <v-text-field label="선택지 (Enter 키로 추가)" v-model="anotherOption" @keydown.enter.prevent="addOption"></v-text-field>
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
                <v-flex xs6 v-if="type == 'quiz'">
                  <v-switch
                    label="퀴즈 타이머(초)"
                    v-model="quizTimerSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4 v-if="type == 'quiz'">
                  <v-text-field v-model="quizTime" :disabled="!quizTimerSwitch" type="number"></v-text-field>
                </v-flex>

                <v-flex xs6 v-if="type == 'survey'">
                  <v-switch
                    label="응답시간 제한(초)"
                    v-model="surveyTimerSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4 v-if="type == 'survey'">
                  <v-text-field v-model="surveyTime" :disabled="!surveyTimerSwitch" type="number"></v-text-field>
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
  props: ["questionIndex", 'type'],
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
      this.imageUrl = [];
      const files = event.target.files;
      console.log("1:", files);
      const file = files[0];
      let filename = file.name;
      this.filename = filename;
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
      imageUrl: null,
      quizTimerSwitch: false,
      quizTime: 0,
      surveyTimerSwitch: false,
      surveyTime: 0,
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
