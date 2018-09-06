<template>
  <v-flex xs12>

    <v-layout wrap>
      <v-flex xs12 sm4 v-if="!isUserInfo" class="mr-2">
        <v-select
          v-model="searchStatus"
          :items="filter_status"
          label="설문 상태 필터"
          hide-details
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          label="검색"
          append-icon="search"
          v-model="searchTitle"
          hide-details
          single-line
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout wrap class="mt-3">
      <v-flex xs12>
        <v-dialog
          v-model="surveyDetailDialog"
          width="980"
          lazy
        >
          <SurveyDetail v-if="surveyDetailDialog" :item="selectedItem" :is-add-group="isAddGroup" @closeDialog="surveyDetailDialog=false"></SurveyDetail>
        </v-dialog>
        
        <v-data-table
          :headers="headers"
          :items="loadedSurveys"
          :pagination.sync="pagination"
          :total-items="totalSurveys"
          :loading="loading"
          class="elevation-0"
          :rows-per-page-items="[10,25,50,100]"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyId }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)" >{{ props.item.surveyTitle }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.savePoint }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.joinCount }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.maxUserCount }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.targetUserCount }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyStartDt }} ~ {{props.item.surveyEndDt}}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">
                <span v-if="props.item.state == '01'">진행중</span>
                <span v-if="props.item.state == '02'">종료</span>
                <span v-if="props.item.state == '03'">중단</span>
              </td>
              <!-- <td v-if="!isAddGroup" class="text-xs-right" @click.stop="itemSelected($event,props.item)">{{ props.item.status }}</td> -->
              <td v-if="!isAddGroup" class="justify-end layout px-0">
                <v-menu bottom left transition="slide-x-transition">
                  <v-btn slot="activator" icon>
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
  </v-flex>
</template>

<script>
import qs from 'qs'
const SurveyDetail = () => import("@/components/SurveyDetail");
// import SurveyDetail from "@/components/SurveyDetail";

export default {
  props: {
    isUserInfo: {
      type: Boolean,
      default: false
    },
    isAddGroup: {
      type: Boolean,
      default: false
    },
    surveyTypeCode: {
      type: String,
      default: "user"
    }
  },
  components: {
    SurveyDetail
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
            {
              text: "제목",
              value: "surveyTitle",
              align: "left",
              sortable: false
            },
            { text: "참여인원", value: "joinCount", align: "right" },
            {
              text: "최대참여인원",
              value: "maxUserCount",
              align: "right"
            },
            { text: "배포인원", value: "targetUserCount", align: "right" },
            { text: "설문기간", value: "surveyStartDt", align: "right" }
          ]
        : [
            {
              text: "ID",
              align: "left",
              value: "surveyId"
            },
            {
              text: "제목",
              value: "surveyTitle",
              align: "left",
              sortable: false
            },
            { text: "포인트", value: "savePoint", align: "center" },
            { text: "참여인원", value: "joinCount", align: "right" },
            {
              text: "최대참여인원",
              value: "maxUserCount",
              align: "right"
            },
            { text: "배포인원", value: "targetUserCount", align: "right" },
            { text: "설문기간", value: "surveyStartDt", align: "right" },
            { text: "상태", value: "state", align: "right" },
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
      search: "",
      loadedSurveys: [],
      totalSurveys: 0,
      pagination: {descending: true},
      loading: true
    };
  },
  watch: {
    pagination: {
      handler() {
        console.log('watch')
        this.getDataFromApi().then(data => {
          this.loadedSurveys = data.rows;
          this.totalSurveys = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.loadedSurveys = data.rows;
      this.totalSurveys = data.total;
      console.log('mount')
    });
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
    },
    getDataFromApi() {
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/pointUseList.do?' + qs.stringify({
          pageSize:10,
          offset:0,
          surveyTypeCode: this.surveyTypeCode,
          pageNum:this.pagination.page,
        }), {
        withCredentials: true,
        crossdomain : true,
      })
    },
    
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

