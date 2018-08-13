<template>

  <v-container fluid style="height: inherit;" class="workplace" >
    <v-layout row wrap fill-height>
      <v-flex xs12>
        <v-card>
          <v-layout align-center justify-center wrap class="grey lighten-5 py-3">
            <v-flex xs12 sm7 lg5 class="trans-group d-flex" align-center>
              <div style="position:absolute;top:0;right:30px;">
                <v-switch label="모두 열기/닫기" v-model="panel" hide-details></v-switch>
              </div>

              <draggable 
                element="v-expansion-panel" 
                popout 
                expand
                focusable
                :list="questions"
                :options="{
                  ghostClass:'ghost',
                  animation: 150
                }"
              >
                <v-expansion-panel-content
                  v-for="(question,index) in questions"
                  :key="question.order"
                  class="elevation-1"
                  lazy
                  :value="panel"
                >
                  <div slot="header">
                    <span>Q{{index + 1}}.</span> <span>{{question.typeName}}</span> <small v-if="question.typeSubName">{{question.typeSubName}}</small> <span>{{question.title}}</span>
                  </div>
                  <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>


                  <v-card class="workplace-card">
                    <component :is="question.comp" :questionIndex="index" class="card-component"></component>
                  </v-card>

                </v-expansion-panel-content>
              </draggable>
              
          </v-flex>
            <v-flex xs12 pt-3 class="text-xs-center red--text text--lighten-3 mt-3">
              <div class="subheading" ref="addButton">아래 버튼을 클릭해서 질문 추가</div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 class="text-xs-center">
              <v-menu transition="slide-x-transition" top right offset-x>
                <v-btn slot="activator" fab bottom dark color="pink" >
                  <v-icon>add</v-icon>
                </v-btn>
                <v-card width="380px">
                  <v-layout wrap>
                      <v-flex v-for="(type, index) in questionTypes" xs6 v-if="type.typeName" :key="index" @click="addCard(type.id)" class="question-types py-3 pl-3">
                        {{type.typeName}} <small v-if="type.typeSubName">{{type.typeSubName}}</small>
                      </v-flex>
                  </v-layout>
                </v-card>
              </v-menu>
            </v-flex>       
          </v-layout>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  
</template>

<script>
import draggable from "vuedraggable";
import MultipleText from "@/components/question_types/MultipleText";
import MultipleImage from "@/components/question_types/MultipleImage";
import StarRating from "@/components/question_types/StarRating";
import Subjective from "@/components/question_types/Subjective";
import RankingText from "@/components/question_types/RankingText";
import RankingImage from "@/components/question_types/RankingImage";
import TickHorizontal from "@/components/question_types/TickHorizontal";
import TickVertical from "@/components/question_types/TickVertical";
import TickCircle from "@/components/question_types/TickCircle";
import ImageFull from "@/components/question_types/ImageFull";
import VideoFull from "@/components/question_types/VideoFull";

import HelpPopup from "@/components/HelpPopup";
import * as easings from "vuetify/es5/util/easing-patterns";
export default {
  name: "Editor",
  components: {
    draggable,
    MultipleText,
    MultipleImage,
    StarRating,
    Subjective,
    RankingText,
    RankingImage,
    TickHorizontal,
    TickVertical,
    TickCircle,
    ImageFull,
    VideoFull,
    HelpPopup
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    },
    addCard(id) {
      let x = this.questionTypes.filter(type => {
        return type.id == id;
      })[0];
      let y = Object.assign({}, x);
      y.order = this.$options.localData.currentCardNum;
      this.questions.push(y);
      this.$options.localData.currentCardNum++;
      this.$nextTick(() => {
        this.$vuetify.goTo(this.$refs.addButton, {
          offset: 1000,
          duration: 1000,
          easing: "easeInOutCubic"
        });
      });
    }
  },
  localData: {
    currentCardNum: 0
  },
  created() {
    console.log(this.$options.localData);
  },
  data() {
    return {
      panel: true,
      helpPop: false,
      currentHelp: "",
      questionTypes: [
        {
          order: 1,
          id: 0,
          typeName: "객관식",
          typeSubName: "(텍스트)",
          title: "",
          comp: "MultipleText"
        },
        {
          order: 2,
          id: 1,
          typeName: "객관식",
          typeSubName: "(이미지)",
          title: "",
          comp: "MultipleImage"
        },
        {
          order: 3,
          id: 2,
          typeName: "순위 선택형",
          typeSubName: "(텍스트)",
          title: "",
          comp: "RankingText"
        },
        {
          order: 4,
          id: 3,
          typeName: "순위 선택형",
          typeSubName: "(이미지)",
          title: "",
          comp: "RankingImage"
        },
        {
          order: 5,
          id: 4,
          typeName: "별점형",
          title: "",
          comp: "StarRating"
        },
        {
          order: 6,
          id: 5,
          typeName: "주관식",
          title: "",
          comp: "Subjective"
        },
        {
          order: 7,
          id: 6,
          typeName: "척도형",
          typeSubName: "(가로)",
          title: "",
          comp: "TickHorizontal"
        },
        {
          order: 8,
          id: 7,
          typeName: "척도형",
          typeSubName: "(세로)",
          title: "",
          comp: "TickVertical"
        },
        {
          order: 9,
          id: 8,
          typeName: "척도형",
          typeSubName: "(원형)",
          title: "",
          comp: "TickCircle"
        },
        {
          order: 10,
          id: 9,
          typeName: "이미지",
          typeSubName: "(Full)",
          title: "",
          comp: "ImageFull"
        },
        {
          order: 11,
          id: 10,
          typeName: "동영상",
          typeSubName: "(Full)",
          title: "",
          comp: "VideoFull"
        },
        {
          order: 12,
          id: 11,
          typeName: "링크",
          title: "",
          comp: "ToLink"
        }
      ],
      questions: [],
      isDragging: false
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
.trans-group {
  min-height: 330px;
}
.ghost {
  opacity: 0.5;
}
.question {
  height: 200px;
}
.console-card {
  cursor: pointer;
}
.workplace-card {
  cursor: pointer;
}
.subText {
  font-size: 0.8rem;
  color: white;
}
.v-stepper__wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
.question-card {
  border: 1px solid #b3d4fc;
}
.sideToggleActive {
  transform: rotate(-180deg);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.main-workplace-layout {
  transition: flex-basis 1000ms ease;
}
.cardDrawer {
  min-width: 280px;
}
.card-collection {
  position: sticky;
  top: 55px;
  left: 0;
  min-width: 280px;
  overflow: auto;
}
.question-types:hover {
  background: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
</style>