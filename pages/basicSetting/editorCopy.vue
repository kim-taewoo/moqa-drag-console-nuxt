<template>
  <v-container fluid class="pa-2" style="height:inherit">
    

    <v-layout fill-height>     
      <!-- <v-flex v-if="drawer" class="cardDrawer">
        <v-layout wrap >
          <v-flex class="xs12" style="position: relative">
            <v-card id="edit-console" class="ma-2 pa-2 card-collection" v-resize="onResize" :style="{maxHeight: calcHeight}">
              <v-flex xs12>
                <h2 class="primary--text text--darken-2 mx-1">질문 카드</h2>
              </v-flex>
              <v-flex class="xs12">
                <v-divider></v-divider>
              </v-flex>
              <draggable 
                @start="isDragging=true" 
                @end="isDragging=false" 
                xs12 
                element="v-flex" 
                v-model="types" 
                :options="{
                  sort: false, 
                  ghostClass:'ghost', 
                  group: { name: 'question_cards', pull: 'clone', put: false}}"
                >
                  <template v-for="(type,index) in types">
                    <v-subheader v-if="type.header" :key="index" class="mt-2 pl-1" style="height:24px">{{ type.header }}</v-subheader>
                    <v-card 
                      v-else-if="type.title" 
                      :key="type.order"
                      :id="type.id"
                      class="mx-1 my-2 pa-2 drag-item question-card"
                      hover>
                      <v-card-title class="py-0 px-0">
                        <div class="subheading" v-html="type.title"></div>
                        <v-spacer></v-spacer>

                        <HelpPopup />

                        
                      </v-card-title>
                    </v-card>
                  </template>
              </draggable>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex> -->

      <!-- <v-flex class="main-workplace-layout mx-2" :class="drawer ? 'xs10':'xs12'"> -->
      <v-flex class="main-workplace-layout mx-2" xs12>
        <v-layout wrap fill-height>
          <v-flex xs12>
            <v-card id="main-workplace" class="ma-2">
            <!-- <v-btn fab dark absolute color="cyan" @click="drawer=!drawer">
              <v-icon dark :class="{sideToggleActive: drawer}">arrow_forward</v-icon>
            </v-btn> -->
              <v-layout justify-center class="grey lighten-5">
                <v-flex xs12 sm7 md7 lg5 class="text-xs-center">
                  <draggable
                    class="main-workplace"
                    v-model="workplace" 
                    :options="{
                      ghostClass:'ghost', 
                      scrollSensitivity: 80, 
                      scrollSpeed: 30, 
                      animation: 150,
                      group: { name: 'question_cards'}}"
                    >
                    <transition-group name="'list-complete'" tag="div" type="transition" class="trans-group">

                      <v-card class="my-3 drag-item workplace-card" v-for="(work,index) in workplace" :key="'a-'+index">
                        <component :is="work.comp" :questionIndex="index" class="card-component"></component>
                      </v-card>

                    </transition-group>
                  </draggable>
                  <v-layout justify-center class="text-xs-center red--text text--lighten-3">
                    <v-flex xs12 pb-3 >
                      <!-- <div>
                        카드를 왼쪽에서 끌어오거나 
                      </div> -->
                      <div>아래 버튼을 클릭해서 질문 추가</div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout justify-center>
                <v-flex xs12 class="text-xs-center">
                  <v-menu transition="slide-x-transition" top right>
                    <v-btn slot="activator" fab bottom dark color="pink">
                      <v-icon>add</v-icon>
                    </v-btn>
                    <v-card width="380px">
                      <v-layout wrap>
                        <template v-for="(type, index) in types" >
                          <v-flex xs6 v-if="type.title" :key="'b-'+index" >
                            <v-btn flat v-html="type.title" @click="addCard(type.id)"></v-btn>
                          </v-flex>
                        </template>
                      </v-layout>
                    </v-card>
                  </v-menu>
                </v-flex>                
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        
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
  mounted() {
    this.onResize();
  },
  methods: {
    showHelp(id) {
      if (id == 0) {
        this.workplace.push({
          id: 0,
          title: '객관식 <span class="subText">(텍스트)</span>',
          comp: "MultipleText"
        });
      } else if (id == 1) {
        this.workplace.push({
          id: 1,
          title: '객관식 <span class="subText">(이미지)</span>',
          comp: "MultipleImage"
        });
      } else if (id == 4) {
        this.workplace.push({
          id: 4,
          title: "별점형",
          comp: "StarRating"
        });
      } else if (id == 5) {
        this.workplace.push({
          id: 5,
          title: "주관식형",
          comp: "Subjective"
        });
      } else if (id == 2) {
        this.workplace.push({
          id: 2,
          title: '순위 선택형 <span class="subText">(텍스트)</span>',
          comp: "RankingText"
        });
      } else if (id == 3) {
        this.workplace.push({
          id: 3,
          title: '순위 선택형 <span class="subText">(이미지)</span>',
          comp: "RankingImage"
        });
      } else if (id == 6) {
        this.workplace.push({
          id: 6,
          title: '척도형 <span class="subText">(가로)</span>',
          comp: "TickHorizontal"
        });
      } else if (id == 7) {
        this.workplace.push({
          id: 7,
          title: '척도형 <span class="subText">(세로)</span>',
          comp: "TickVertical"
        });
      } else if (id == 8) {
        this.workplace.push({
          id: 8,
          title: '척도형 <span class="subText">(원형)</span>',
          comp: "TickCircle"
        });
      } else if (id == 9) {
        this.workplace.push({
          id: 9,
          title: '이미지 <span class="subText">(Full)</span>',
          comp: "ImageFull"
        });
      } else if (id == 10) {
        this.workplace.push({
          id: 10,
          title: '동영상 <span class="subText">(Full)</span>',
          comp: "VideoFull"
        });
      }
    },
    onResize(e) {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    },
    addCard(id) {
      if (id == 0) {
        this.workplace.push({
          id: 0,
          title: '객관식 <span class="subText">(텍스트)</span>',
          comp: "MultipleText"
        });
      } else if (id == 1) {
        this.workplace.push({
          id: 1,
          title: '객관식 <span class="subText">(이미지)</span>',
          comp: "MultipleImage"
        });
      } else if (id == 4) {
        this.workplace.push({
          id: 4,
          title: "별점형",
          comp: "StarRating"
        });
      } else if (id == 5) {
        this.workplace.push({
          id: 5,
          title: "주관식형",
          comp: "Subjective"
        });
      } else if (id == 2) {
        this.workplace.push({
          id: 2,
          title: '순위 선택형 <span class="subText">(텍스트)</span>',
          comp: "RankingText"
        });
      } else if (id == 3) {
        this.workplace.push({
          id: 3,
          title: '순위 선택형 <span class="subText">(이미지)</span>',
          comp: "RankingImage"
        });
      } else if (id == 6) {
        this.workplace.push({
          id: 6,
          title: '척도형 <span class="subText">(가로)</span>',
          comp: "TickHorizontal"
        });
      } else if (id == 7) {
        this.workplace.push({
          id: 7,
          title: '척도형 <span class="subText">(세로)</span>',
          comp: "TickVertical"
        });
      } else if (id == 8) {
        this.workplace.push({
          id: 8,
          title: '척도형 <span class="subText">(원형)</span>',
          comp: "TickCircle"
        });
      } else if (id == 9) {
        this.workplace.push({
          id: 9,
          title: '이미지 <span class="subText">(Full)</span>',
          comp: "ImageFull"
        });
      } else if (id == 10) {
        this.workplace.push({
          id: 10,
          title: '동영상 <span class="subText">(Full)</span>',
          comp: "VideoFull"
        });
      }
    }
    // onMove ({relatedContext, draggedContext}) {
    //   const relatedElement = relatedContext.element;
    //   const draggedElement = draggedContext.element;
    //   return (!relatedElement || !relatedElement.fixed)
    // }
  },
  computed: {
    calcHeight() {
      return this.windowSize.y - 120;
    }
  },
  data() {
    return {
      helpPop: false,
      currentHelp: "",
      drawer: true,
      windowSize: {
        x: 0,
        y: 0
      },
      currentCardNum: 0,
      types: [
        { order: 0, header: "객관식" },
        {
          order: 1,
          id: 0,
          title: '객관식 <span class="subText">(텍스트)</span>',
          comp: "MultipleText"
        },
        {
          order: 2,
          id: 1,
          title: '객관식 <span class="subText">(이미지)</span>',
          comp: "MultipleImage"
        },
        { order: 3, header: "순위 선택형" },
        {
          order: 4,
          id: 2,
          title: '순위 선택형 <span class="subText">(텍스트)</span>',
          comp: "RankingText"
        },
        {
          order: 5,
          id: 3,
          title: '순위 선택형 <span class="subText">(이미지)</span>',
          comp: "RankingImage"
        },
        { order: 6, header: "별점형" },
        { order: 7, id: 4, title: "별점형", comp: "StarRating" },
        { order: 8, header: "주관식형" },
        { order: 9, id: 5, title: "주관식형", comp: "Subjective" },
        { order: 10, header: "척도형" },
        {
          order: 11,
          id: 6,
          title: '척도형 <span class="subText">(가로)</span>',
          comp: "TickHorizontal"
        },
        {
          order: 12,
          id: 7,
          title: '척도형 <span class="subText">(세로)</span>',
          comp: "TickVertical"
        },
        {
          order: 13,
          id: 8,
          title: '척도형 <span class="subText">(원형)</span>',
          comp: "TickCircle"
        },
        { order: 14, header: "멀티미디어" },
        {
          order: 15,
          id: 9,
          title: '이미지 <span class="subText">(Full)</span>',
          comp: "ImageFull"
        },
        {
          order: 16,
          id: 10,
          title: '동영상 <span class="subText">(Full)</span>',
          comp: "VideoFull"
        }
      ],
      workplace: [],
      isDragging: false
    };
  }
};
</script>

<style>
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
  color: grey;
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
</style>