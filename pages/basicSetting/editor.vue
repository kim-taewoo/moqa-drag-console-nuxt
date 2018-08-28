<template>

  <v-container fluid style="height: inherit;" class="workplace" >
    <v-layout row wrap fill-height>
      <v-flex xs12>
        <v-card>
          <v-layout align-center justify-center wrap class="grey lighten-5 py-3">
            <v-flex xs12 sm7 lg4 class="trans-group d-flex mt-4" align-center>
              <div style="position:absolute;top:0;right:30px;">
                <v-switch label="모두 열기/닫기" v-model="panel" hide-details></v-switch>
              </div>
              <div style="position:absolute;top:35px;right:30px;">
                <v-switch label="문항 순서 드래그" v-model="dragAllow" hide-details></v-switch>
              </div>

              <draggable 
                element="v-expansion-panel" 
                popout 
                expand
                focusable
                :list="questions"
                :options="{
                  ghostClass:'ghost',
                  animation: 150,
                  disabled: !dragAllow
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
                    <span style="position: absolute; top: 0; right: 50px;"><v-btn dark icon @click.stop="deleteQ(question)"><v-icon>delete</v-icon></v-btn></span>
                    <span>Q{{index + 1}}.</span> <span>{{question.typeName}}</span> <small v-if="question.typeSubName">{{question.typeSubName}}</small> <span>{{question.title}}</span>
                  </div>
                  <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>


                  <v-card class="workplace-card">
                    <component :is="question.comp" :questionIndex="index" class="card-component" :type="type" :questions="questions"></component>
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
              <v-menu transition="slide-x-transition" top right>
                <v-btn slot="activator" fab bottom dark color="pink" >
                  <v-icon>add</v-icon>
                </v-btn>
                <v-card width="380px">
                  <v-layout wrap>
                    <v-flex v-for="(type, index) in questionTypes" xs6 v-if="type.typeName" :key="index" @click="addCard(type.id)" style="border: 1px solid #F5F5F5" class="question-types px-3 py-2 text-xs-right">
                      <span>{{type.typeName}} <small v-if="type.typeSubName">{{type.typeSubName}}</small></span> 

                      <v-menu
                        open-on-hover
                        :nudge-width="200"
                        offset-x
                      >
                        <v-btn slot="activator"  icon class="ma-0" color="grey--text"><v-icon>help_outline</v-icon></v-btn>
                      <v-card>
                      <v-list>
                        <v-list-tile>

                          <v-list-tile-content>
                            <v-list-tile-title><span>{{type.typeName}} <small v-if="type.typeSubName">{{type.typeSubName}}</small></span></v-list-tile-title>
                            <v-list-tile-sub-title>{{type.description}}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>

                      <v-divider></v-divider>

                      <div class="example-image-container">
                        <img class="example-image" v-if="type.id == 6 || type.id == 7" :src="require('@/assets/typeExamples/'+ type.comp + '.jpg')" alt="">
                        <img class="example-image" v-else-if="type.id == 9" src="" alt="">
                        <img class="example-image" v-else :src="require('@/assets/typeExamples/'+ type.comp + '.png')" alt="">
                      </div>

                    </v-card>
                  </v-menu>
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
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  created () {
    if (!this.type) {
      this.$router.push('/')
    }
  },
  methods: {
    checkblur(target) {
      console.log("blur", target);
    },
    addCard(id) {
      if(this.type =='quick' && this.questions.length == 1) {
        alert('퀵폴은 문항 한 개만 생성 가능합니다. 기존 것을 삭제 후 추가해주세요.')
        return
      }
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
    },
    deleteQ(target) {
      const r = confirm("문항을 삭제할까요?");
      if (r == true) {
        this.questions = this.questions.filter(question => {
          return question.order != target.order;
        });
      } else {
        return [

        ]
      }
    }
  },
  localData: {
    currentCardNum: 0
  },
  
  data() {
    return {
      menu: false,
      fav: true,
      message: false,
      hints: true,
      dragAllow: false,
      panel: true,
      helpPop: false,
      currentHelp: "",
      questions: [],
      isDragging: false
    };
  },
  computed : {
    questionTypes () {
      if (this.type == 'quick') {
        return [
          {
            order: 1,
            id: 0,
            typeName: "객관식",
            typeSubName: "(텍스트)",
            title: "",
            comp: "MultipleText",
            description: "선택지를 텍스트로 제공합니다."
          },
          {
            order: 2,
            id: 1,
            typeName: "객관식",
            typeSubName: "(이미지)",
            title: "",
            comp: "MultipleImage",
            description: "선택지를 이미지로 제공합니다."
          },
          {
            order: 3,
            id: 2,
            typeName: "순위 선택형",
            typeSubName: "(텍스트)",
            title: "",
            comp: "RankingText",
            description: "텍스트 선택지 순위를 매기도록 합니다."
          },
          {
            order: 4,
            id: 3,
            typeName: "순위 선택형",
            typeSubName: "(이미지)",
            title: "",
            comp: "RankingImage",
            description: "이미지 선택지 순위를 매기도록 합니다."
          },
          {
            order: 5,
            id: 4,
            typeName: "별점형",
            title: "",
            comp: "StarRating",
            description: "5점 만점의 별점을 매기도록 합니다."
          },
        ]
      } else if (this.type=='survey') {
        return [
          {
            order: 1,
            id: 0,
            typeName: "객관식",
            typeSubName: "(텍스트)",
            title: "",
            comp: "MultipleText",
            description: "선택지를 텍스트로 제공합니다."
          },
          {
            order: 2,
            id: 1,
            typeName: "객관식",
            typeSubName: "(이미지)",
            title: "",
            comp: "MultipleImage",
            description: "선택지를 이미지로 제공합니다."
          },
          {
            order: 3,
            id: 2,
            typeName: "순위 선택형",
            typeSubName: "(텍스트)",
            title: "",
            comp: "RankingText",
            description: "텍스트 선택지 순위를 매기도록 합니다."
          },
          {
            order: 4,
            id: 3,
            typeName: "순위 선택형",
            typeSubName: "(이미지)",
            title: "",
            comp: "RankingImage",
            description: "이미지 선택지 순위를 매기도록 합니다."
          },
          {
            order: 5,
            id: 4,
            typeName: "별점형",
            title: "",
            comp: "StarRating",
            description: "5점 만점의 별점을 매기도록 합니다."
          },
          {
            order: 6,
            id: 5,
            typeName: "주관식",
            title: "",
            comp: "Subjective",
            description: "주관식으로 답을 받습니다."
          },
          {
            order: 7,
            id: 6,
            typeName: "척도형",
            typeSubName: "(가로)",
            title: "",
            comp: "TickHorizontal",
            description: "가로형 척도를 제공합니다."
          },
          {
            order: 8,
            id: 7,
            typeName: "척도형",
            typeSubName: "(세로)",
            title: "",
            comp: "TickVertical",
            description: "세로형 척도를 제공합니다."
          },
          {
            order: 9,
            id: 8,
            typeName: "척도형",
            typeSubName: "(원형)",
            title: "",
            comp: "TickCircle",
            description: "원형 척도를 제공합니다."
          },
          {
            order: 10,
            id: 9,
            typeName: "이미지",
            typeSubName: "(Full)",
            title: "",
            comp: "ImageFull",
            description: "질문에 답하기 전 보여줄 이미지를 설정합니다."
          },
          {
            order: 11,
            id: 10,
            typeName: "동영상",
            typeSubName: "(Full)",
            title: "",
            comp: "VideoFull",
            description: "질문에 답하기 전 보여줄 영상을 설정합니다."
          }
        ]
      } else {
        return [
          {
            order: 1,
            id: 0,
            typeName: "객관식",
            typeSubName: "(텍스트)",
            title: "",
            comp: "MultipleText",
            description: "선택지를 텍스트로 제공합니다."
          },
          {
            order: 2,
            id: 1,
            typeName: "객관식",
            typeSubName: "(이미지)",
            title: "",
            comp: "MultipleImage",
            description: "선택지를 이미지로 제공합니다."
          },
          {
            order: 3,
            id: 2,
            typeName: "순위 선택형",
            typeSubName: "(텍스트)",
            title: "",
            comp: "RankingText",
            description: "텍스트 선택지 순위를 매기도록 합니다."
          },
          {
            order: 4,
            id: 3,
            typeName: "순위 선택형",
            typeSubName: "(이미지)",
            title: "",
            comp: "RankingImage",
            description: "이미지 선택지 순위를 매기도록 합니다."
          },
        ]
      }
    }
  },
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

.example-image-container {
  width: 300px;
}
.example-image {
  width: 100%;
  height: auto;
}
</style>