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
                <v-flex xs9 offset-xs1>
                  <v-text-field type="number" label="최소값을 입력해주세요" v-model="circleMin"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1>
                  <v-text-field type="number" label="최대값을 입력해주세요" v-model="circleMax"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1>
                  <v-text-field type="number" label="단위를 입력해주세요" v-model="circleUnit"></v-text-field>
                </v-flex>
                <v-flex xs12 md8 class="mt-3">
                    <v-layout justify-center>
                        <circle-slider v-model="sliderValue"></circle-slider>
                    </v-layout>
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
        <v-tab>
          로직
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container class="pa-1">
              <v-layout justify-center>
                <v-flex xs12>
                  <LogicCardStar @deletelogic="deleteLogic(logicCard)" v-for="(logicCard, index) in logicCards" :key="index" :questionIndex="questionIndex" :options="options" :options2="options2" />
                  <v-card class="logicCard pa-3 ma-2 elevation-2">
                    <v-layout wrap align-baseline style="position:relative">
                        <v-flex xs12>
                            <p class="mb-2">만약 이 문항 {{questionIndex + 1}}의 선택값이</p> 
                        </v-flex>
                        <v-flex xs6 align-center class="pr-2">
                          <v-select
                            :items="radioOptions"
                            label="선택값 고르기"
                            outline
                            hide-details
                            height="24px"
                            offset-y browser-autocomplete="off"
                          ></v-select>
                        </v-flex>
                        <v-flex class="xs6 pl-2">
                          <v-select
                            :items="options2"
                            label="이상,이하"
                            outline
                            hide-details
                            height="24px"
                            offset-y browser-autocomplete="off"
                          >
                          </v-select>
                        </v-flex>
                        <v-flex xs12 align-center class="text-xs-left">
                            <div class="mt-2">이라면</div> 
                        </v-flex>
                        <v-flex xs9 class="mt-2">
                            <v-select offset-y no-data-text="다른 문항이 없습니다." browser-autocomplete="off" height="24px" outline hide-details label="목표 문항 고르기">                          
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
import LogicCardStar from "@/components/question_types/LogicCardStar";

export default {
  name: "TickCircle",
  props: ["questionIndex"],
  components: {
    LogicCardStar
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
      logicCardOrder: 0,
      logicCards: [],
      options: [],
      options2: ["이상", "이하"],
      logicOption: ["다음문항", "자격박탈", "설문 종료", "3.lorem..."],
      radioOptions: ["0", "1", "2"],
      sliderValue: null,
      circleMin: null,
      circleMax: null,
      circleUnit: null,
      multimediaSwitch: false,
      qTitle: null,
      panel: [true],
      active: null,
      imageUrl: []
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
/* .tick-option {
  max-width: 115px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>
