<template>
  <v-flex xs12>

    <v-layout wrap>
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
          <SurveyDetail v-if="surveyDetailDialog" :item="selectedItem" @closeDialog="surveyDetailDialog=false"></SurveyDetail>
        </v-dialog>
        
        <v-data-table
          :headers="headers"
          :items="filteredSurveys"
          :pagination.sync="pagination"
          :total-items="totalSurveys"
          :loading="loading"
          :rows-per-page-items="[10,15,20]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyId }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)" >{{ props.item.name }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyTitle }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.reportReason }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.registDt }}</td>
              <td class="text-xs-center"><v-btn @click="closeSurvey(props.item)">설문중지</v-btn></td>
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
      return [
        {
          text: "ID",
          align: "center",
          value: "surveyId"
        },
        {
          text: "신고자명",
          value: "name",
          align: "center",
        },
        { text: "설문제목", value: "surveyTitle", align: "center" },
        {
          text: "신고사유",
          value: "reportReason",
          align: "center"
        },
        { text: "신고등록일", value: "registDt", align: "center" },
        { text: "설문중지", value: "", align: "center" },
      ];
    }
  },
  data() {
    return {
      surveyDetailDialog: false,
      selectedItem: null,
      searchTitle: "",
      search: "",
      loadedSurveys: [],
      totalSurveys: 0,
      pagination: {},
      loading: true
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.loadedSurveys = data.rows;
          this.totalSurveys = data.total;
          this.loading = false
        }).catch(err => console.log(err))
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.loadedSurveys = data.rows;
      this.totalSurveys = data.total;
      this.loading = false
    }).catch(err => console.log(err))
  },
  methods: {
    itemSelected(e, item) {
      this.openDialogKey++;
      this.selectedItem = item;
      this.surveyDetailDialog = true;
    },
    closeSurvey(item) {
      this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/closeSurvey.do?' + qs.stringify({
        surveyId: item.surveyId
      }), {
        withCredentials: true,
        crossdomain: true
      })
    },
    getDataFromApi() {
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/reportSurveyList.do?' + qs.stringify({
          pageNum:this.pagination.page,
          pageSize: 10
        }), {
        withCredentials: true,
        crossdomain : true,
      })
    }
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

