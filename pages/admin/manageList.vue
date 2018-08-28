<template>
  <v-container>
    <v-layout wrap v-if="!isAddGroup">
      <v-flex xs6 class="d-flex" align-end>
        <h3>설문관리</h3>
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <v-btn flat @click.stop="typeDialog = true"><v-icon>add</v-icon> 새로 만들기</v-btn>
      </v-flex>

      <!-- 새로만들기했을때 뜨는 대화창 시작 -->
      <v-dialog
        v-model="typeDialog"
        max-width="780px"
      >
        <v-card>
          <v-container style="user-select: none;" class="px-1">
            <v-layout>
              <v-card-title class="title">
                <v-icon class="mr-3">how_to_vote</v-icon>
                  타입을 선택해 주세요!
              </v-card-title>
            </v-layout>
            <v-layout>
              <v-flex xs4>
                <v-card class="type-card" height="380px">
                  <v-card-media
                    :src="require('@/assets/quick.jpg')" height="200px"
                    @click="choseQuick">                      
                  </v-card-media>
                  <v-card-text @click="choseQuick">
                    <h3 class="text-xs-center title">퀵폴</h3>
                    <p class="text-xs-center body-1 grey--text mt-2">"빠르고 간단히 묻고 싶을 때!"</p>
                    <p class="text-xs-center body-1 mb-0">
                      오직 1개 문항
                    </p>
                    <p class="text-xs-center body-1 my-0">객관식 / 순위선택형 / 별점타입</p>
                    <p class="text-xs-center body-1 my-0">설문 등록 가능</p>
                  </v-card-text>
                </v-card>

              </v-flex>
              <v-flex xs4>
                <v-card class="type-card mx-1">
                  <v-card-media :src="require('@/assets/survey.jpg')" height="200px" @click="choseSurvey">

                  </v-card-media>
                  <v-card-text @click="choseSurvey">
                    <h3 class="text-xs-center title">서베이</h3>
                    <p class="text-xs-center body-1 grey--text mt-2">"마켓 트렌드 및 학술 조사가 필요할 때!"</p>
                    <p class="text-xs-center body-1 mb-0">
                      2개 이상의 문항
                    </p>
                    <p class="text-xs-center body-1 my-0">보상리워드 지정</p>
                    <p class="text-xs-center body-1 my-0">모든 타입의 설문 등록 가능</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs4>
                <v-card class="type-card">
                  <v-card-media :src="require('@/assets/quiz.jpg')" height="200px" @click="choseQuiz">

                  </v-card-media>
                  <v-card-text @click="choseQuiz">
                    <h3 class="text-xs-center title">퀴즈</h3>
                    <p class="text-xs-center body-1 grey--text mt-2">"시간 제한이 있는 퀴즈를 진행하고 싶을 때!"</p>
                    <p class="text-xs-center body-1 mb-0">
                      타이머 설정
                    </p>
                    <p class="text-xs-center body-1 my-0">보상리워드 지정</p>
                    <p class="text-xs-center body-1 my-0">객관식 / 순위선택형 등록 가능</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-dialog>
      <!-- 새로 만들기 대화창 끝 -->


      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-layout wrap class="mt-1">
      <v-flex xs12>
        <v-divider v-if="isAddGroup"></v-divider>
        <v-tabs
          v-model="active"
          slider-color="primary"
          color="transparent"
        >
          <v-tab
            v-for="(tab, index) in adminSurveyTabs"
            :key="index"
            ripple
            class="title"
          >
            {{tab.name}}
          </v-tab>

          <v-tab-item
            v-for="(tab, index) in adminSurveyTabs"
            :key="index"
            class="mt-1"
          >
            <component :is="tab.comp" :surveyTypeCode="tab.surveyTypeCode" isUserInfo class="tabComponent" :isAddGroup="isAddGroup"></component>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import adminSurveyList from "@/components/admin/adminSurveyList";
import reportedSurveyList from '@/components/admin/reportedSurveyList'
import confirmSurveyList from '@/components/admin/confirmSurveyList'

export default {
  components: {
    adminSurveyList,
    reportedSurveyList,
    confirmSurveyList
  },
  props: {
    isAddGroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    adminSurveyTabs () {
      return this.isAddGroup ? [
        {
          name: "일반설문",
          comp: adminSurveyList,
          surveyTypeCode: '01'
        },
        {
          name: "타겟설문",
          comp: adminSurveyList,
          surveyTypeCode: '02'
        },
        {
          name: "퀵폴",
          comp: adminSurveyList,
          surveyTypeCode: '03'
        },
        {
          name: "서베이",
          comp: adminSurveyList,
          surveyTypeCode: '04'
        },
      ]
      : [
          {
            name: "일반설문",
            comp: adminSurveyList,
            surveyTypeCode: '01'
          },
          {
            name: "타겟설문",
            comp: adminSurveyList,
            surveyTypeCode: '02'
          },
          {
            name: "퀵폴",
            comp: adminSurveyList,
            surveyTypeCode: '03'
          },
          {
            name: "서베이",
            comp: adminSurveyList,
            surveyTypeCode: '04'
          },
          {
            name: "신고설문",
            comp: reportedSurveyList,
          },
          {
            name: "심사요청",
            comp: confirmSurveyList
          }
      ]
    }
  },
  data () {
    return {
      active: null,
      typeDialog: false
    }
  },
  methods: {
    choseQuick() {
      this.$router.push({name: 'basicSetting', params: {type: 'quick'}});
    },
    choseSurvey() {
      this.$router.push({name: 'basicSetting', params: {type: 'survey'}});
    },
    choseQuiz () {
      this.$router.push({name: 'basicSetting', params: {type: 'quiz'}})
    }
  }
};
</script>
