<template>
  <v-container class="pa-0">
    <v-layout class="mt-3" wrap justify-center>
      <v-flex xs12 sm4 class="px-3" :class="{'mb-2': isAddGroup}">
        <v-select
          v-model="searchStatus"
          :items="filter_status"
          label="설문 상태 필터"
          hide-details
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 :class="{'mb-2': isAddGroup}">
        <v-text-field
          label="제목으로 검색"
          append-icon="search"
          v-model="searchTitle"
          hide-details
          single-line
        ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md3 class="text-xs-right">
        <v-btn v-if="!isAddGroup" :block="$vuetify.breakpoint.xsOnly" large class="primary" @click.stop="typeDialog = true"><v-icon dark>add</v-icon>새로 만들기</v-btn>

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
                    <v-card-media :src="require('@/assets/quiz.jpg')" height="200px" @click="choseSurvey">

                    </v-card-media>
                    <v-card-text @click="choseSurvey">
                      <h3 class="text-xs-center title">퀴즈</h3>
                      <p class="text-xs-center body-1 grey--text mt-2">"시간 제한이 있는 퀴즈를 진행하고 싶을 때!"</p>
                      <p class="text-xs-center body-1 mb-0">
                        타이머 설정
                      </p>
                      <p class="text-xs-center body-1 my-0">보상리워드 지정</p>
                      <p class="text-xs-center body-1 my-0">특정 타입의 질문 등록 가능</p>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>

          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12>
        <v-divider></v-divider>

        <v-dialog
          v-model="surveyDetailDialog"
          width="980"
        >
          <SurveyDetail v-if="surveyDetailDialog" :item="selectedItem" :is-add-group="isAddGroup" @closeDialog="surveyDetailDialog=false"></SurveyDetail>
        </v-dialog>

        <v-data-table
          :headers="headers"
          :items="filteredSurveys"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>{{ props.item.surveyId }}</td>
              <td class="text-xs-left" @click.stop="itemSelected($event,props.item)" >{{ props.item.title }}</td>
              <td class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.num_participate }}</td>
              <td class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.num_max_participate }}</td>
              <td class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.num_distribute }}</td>
              <td class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.time_period }}</td>
              <td v-if="!isAddGroup" class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.status }}</td>
              <td v-if="!isAddGroup" class="justify-end layout px-0">
                <v-menu bottom left transition="slide-x-transition">
                  <v-btn
                    slot="activator"
                    icon
                  >
                    <v-icon small >more_vert</v-icon>
                  </v-btn>

                  <v-list>
                    <v-list-tile
                      v-for="(item, i) in moreItems"
                      :key="i"
                      @click="$router.push('/'+ item.link)"
                    >
                      <v-list-tile-title class="text-xs-center" >{{item.title}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                </td>
              </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const SurveyDetail = () => import("@/components/SurveyDetail");
// import SurveyDetail from "@/components/SurveyDetail";

export default {
  props: {
    isAddGroup: {
      type: Boolean,
      default: false
    }
  },
  name: "SurveyList",
  components: {
    SurveyDetail
  },
  methods: {
    choseQuick() {
      this.$router.push("/basicSetting");
    },
    choseSurvey() {
      this.$router.push("/basicSetting");
    },
    itemSelected(e, item) {
      this.openDialogKey++;
      this.selectedItem = item;
      this.surveyDetailDialog = true;
    }
  },
  computed: {
    filteredSurveys() {
      if (this.searchStatus == "모든 설문" && this.searchTitle == "") {
        return this.loadedSurveys;
      } else if (this.searchStatus != "모든 설문" && this.searchTitle == "") {
        return this.loadedSurveys.filter(survey => {
          return survey.status == this.searchStatus;
        });
      } else if (this.searchStatus != "모든 설문" && this.searchTitle) {
        return this.loadedSurveys.filter(survey => {
          return (
            survey.status == this.searchStatus &&
            survey.title.toLowerCase().includes(this.searchTitle.toLowerCase())
          );
        });
      } else if (this.searchStatus == "모든 설문" && this.searchTitle) {
        return this.loadedSurveys.filter(survey => {
          return survey.title
            .toLowerCase()
            .includes(this.searchTitle.toLowerCase());
        });
      }
    },

    headers() {
      return this.isAddGroup
        ? [
            {
              text: "ID",
              align: "left",
              value: "surveyId"
            },
            { text: "제목", value: "title", align: "left", sortable: false },
            { text: "참여인원", value: "num_participate", align: "right" },
            {
              text: "최대참여인원",
              value: "num_max_participate",
              align: "right"
            },
            { text: "배포인원", value: "num_distribute", align: "right" },
            { text: "설문기간", value: "time_period", align: "right" }
          ]
        : [
            {
              text: "ID",
              align: "left",
              value: "surveyId"
            },
            { text: "제목", value: "title", align: "left", sortable: false },
            { text: "참여인원", value: "num_participate", align: "right" },
            {
              text: "최대참여인원",
              value: "num_max_participate",
              align: "right"
            },
            { text: "배포인원", value: "num_distribute", align: "right" },
            { text: "설문기간", value: "time_period", align: "right" },
            { text: "상태", value: "status", align: "right" },
            { text: "기타", align: "right", value: "status" }
          ];
    }
  },
  data() {
    return {
      surveyDetailDialog: false,
      selectedItem: null,
      moreItems: [
        { title: "결과 다운로드" },
        { title: "통계 보기", link: "surveyStatistics" }
      ],
      filter_status: ["모든 설문", "작성중", "심사 대기중", "진행중", "완료"],
      searchStatus: "모든 설문",
      searchTitle: "",
      typeDialog: false,
      search: "",
      loadedSurveys: [
        {
          value: false,
          surveyId: "1",
          title: "예시 제목 1",
          num_max_participate: 120,
          num_participate: 24,
          num_distribute: 1120,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "작성중"
        },
        {
          value: false,
          surveyId: "2",
          title: "예시 제목 2",
          num_max_participate: 99,
          num_participate: 37,
          num_distribute: 1230,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "심사 대기중"
        },
        {
          value: false,
          surveyId: "3",
          title: "예시 제목 3",
          num_max_participate: 33,
          num_participate: 23,
          num_distribute: 820,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "진행중"
        },
        {
          value: false,
          surveyId: "4",
          title: "예시 제목 4",
          num_max_participate: 98,
          num_participate: 67,
          num_distribute: 1520,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "완료"
        },
        {
          value: false,
          surveyId: "5",
          title: "예시 제목 5",
          num_max_participate: 75,
          num_participate: 49,
          num_distribute: 880,
          time_period: "2018-09-01 00:00 ~ 2018-08-12 00:00",
          status: "작성중"
        },
        {
          value: false,
          surveyId: "6",
          title: "예시 제목 6",
          num_max_participate: 96,
          num_participate: 94,
          num_distribute: 2020,
          time_period: "2018-02-12 00:00 ~ 2018-08-12 00:00",
          status: "진행중"
        },
        {
          value: false,
          surveyId: "7",
          title: "예시 제목 7",
          num_max_participate: 160,
          num_participate: 98,
          num_distribute: 1777,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "심사대기중"
        },
        {
          value: false,
          surveyId: "8",
          title: "예시 제목 8",
          num_max_participate: 444,
          num_participate: 87,
          num_distribute: 3230,
          time_period: "2018-08-12 00:00 ~ 2018-08-12 00:00",
          status: "진행중"
        },
        {
          value: false,
          surveyId: "9",
          title: "예시 제목 9",
          num_max_participate: 214,
          num_participate: 51,
          num_distribute: 1122,
          time_period: "2018-07-12 00:00 ~ 2018-08-12 00:00",
          status: "작성중"
        },
        {
          value: false,
          surveyId: "10",
          title: "예시 제목 10",
          num_max_participate: 424,
          num_participate: 65,
          num_distribute: 1127,
          time_period: "2018-07-15 00:00 ~ 2018-08-12 00:00",
          status: "완료"
        }
      ]
    };
  }
};
</script>

<style>
.type-card {
  cursor: pointer;
}
.type-card:hover {
  opacity: 0.7;
}
</style>

