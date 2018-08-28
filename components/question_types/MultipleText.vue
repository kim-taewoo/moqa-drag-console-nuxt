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
                <v-flex v-if="!imageUrl" style="position: absolute; top:0; height: 40px; left:0; right: 0;align-items:center;justify-content:center" xs12 class="text-xs-center grey lighten-3 d-flex">
                  <span @click="onPickFile"><v-icon>image_search</v-icon> <span> 배경 이미지 삽입하기</span></span>
                </v-flex>
                <v-flex v-else class="xs10 text-xs-center">
                  <img
                  v-for="(img,index) in imageUrl"
                  :key="index"
                  :src="img"
                  width="40%"
                  alt="">
                  <div>
                    <v-btn small color="primary" @click="onPickFile">배경이미지<v-icon right dark>cloud_upload</v-icon></v-btn>
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
                <v-flex xs6>
                  <v-switch
                    label="중복 선택 가능"
                    v-model="multiselectSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!multiselectSwitch" v-model="multiselectMax" type="number"></v-text-field>
                </v-flex>
                
                <v-flex xs6>
                  <v-switch
                    label="퀴즈 타이머(초)"
                    v-model="quizTimerSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="quizTime" :disabled="!quizTimerSwitch" type="number"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab>
          로직
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container class="pa-1">
              <v-layout justify-center>
                <v-flex xs12>
                  <LogicCard @deletelogic="deleteLogic(logicCard)" v-for="(logicCard, index) in logicCards" :key="index" :questionIndex="questionIndex" :options="options" />
                  <v-card class="logicCard pa-3 ma-2 elevation-2">
                    <v-layout wrap align-baseline style="position:relative">
                        <v-flex xs12>
                            <p class="mb-2">만약 이 문항 {{questionIndex + 1}}의 답변이</p> 
                        </v-flex>
                        <v-flex xs9 align-center>
                            <v-select
                                :items="options"
                                label="답변 고르기"
                                outline
                                hide-details
                                height="24px"
                                offset-y no-data-text="선택지가 없습니다." browser-autocomplete="off"
                            ></v-select>
                        </v-flex>
                        <v-flex xs3 align-center class="text-xs-left align-end">
                            <div class="ml-3">이라면</div> 
                        </v-flex>
                        <v-flex xs9 class="mt-2">
                            <v-select :items="questionsIndexList" offset-y no-data-text="다른 문항이 없습니다." browser-autocomplete="off" height="24px" outline hide-details label="목표 문항 고르기">                          
                            </v-select>
                        </v-flex>
                        <v-flex xs3>
                            <div class="ml-3">으로 간다.</div>
                        </v-flex>
                    </v-layout>
                  </v-card>

                  <v-layout style="position: relative">
                    <v-btn
                      absolute
                      dark
                      fab
                      bottom
                      right
                      small
                      color="orange"
                      style="top:-28px"
                      @click="addLogicCard"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-layout>
                  <v-layout wrap class="ma-3" align-baseline>
                    <v-flex class="xs12">
                      <p class="my-2">그 밖의 모든 경우</p>
                    </v-flex>
                    <v-flex class="xs9">
                      <v-select offset-y browser-autocomplete="off" height="24px" outline hide-details label="다음 문항" :items="logicOption">
                      </v-select>
                    </v-flex>
                    <v-flex class="xs3">
                      <div class="ml-3">으로 간다.</div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
</template>

<script>
import LogicCard from "@/components/question_types/LogicCard";

export default {
  name: "MultipleText",
  props: ["questionIndex", 'questions'],
  components: {
    LogicCard
  },
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
    addLogicCard() {
      this.logicCardOrder++;
      this.logicCards.push(this.logicCardOrder);
    },
    deleteLogic(logic) {
      this.logicCards.splice(this.logicCards.indexOf(logic), 1);
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
  watch: {
    multiselectSwitch(val) {
      if (val == false) {
        this.multiselectMax = 0;
      }
    }
  },
  computed : {
    questionsIndexList () {
      if (!this.questions) {return}
      let lengthList = []
      for (let i = 1; i <= this.questions.length; i++) {
        lengthList.push(i + '번 문항')
      }
      lengthList.push('자격박탈')
      lengthList.push('설문 종료')
      return lengthList
    }
  },
  data() {
    return {
      rules: {
        option: [val => (val || "").length > 0 || this.feedback]
      },
      feedback: null,
      deleteMenu: ["test", "test2"],
      anotherOption: null,
      logicCardOrder: 0,
      logicCards: [],
      options: [],
      logicOption: ["다음문항", "자격박탈", "설문 종료", "3.lorem..."],
      multiselectSwitch: false,
      multiselectMax: 0,
      quizTimerSwitch: false,
      quizTime: 0,
      qTitle: null,
      panel: [true],
      active: null,
      imageUrl: null,
      filename: null,
      multimediaSwitch: false,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      form: {
        qTitle: this.qTitle,
        options: this.options,
        multiselectMax: this.multiselectMax,
        imageUrl: this.imageUrl
      }
    };
  }
};
</script>

<style scoped>
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
