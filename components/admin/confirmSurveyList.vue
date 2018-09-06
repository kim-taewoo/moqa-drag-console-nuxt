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
          :rows-per-page-items="[10,15,20]"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyId }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)" >{{ props.item.name }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.surveyTitle }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)">{{ props.item.registDt }}</td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)"><v-btn>반려</v-btn></td>
              <td class="text-xs-center" @click.stop="itemSelected($event,props.item)"><v-btn>배포</v-btn></td>
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
          text: "요청자명",
          value: "name",
          align: "center",
        },
        { text: "설문제목", value: "surveyTitle", align: "center" },
        { text: "심사요청일", value: "registDt", align: "center" },
        { text: "반려", value: "", align: "center" },
        { text: "배포", value: "", align: "center" },
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
          this.loadedSurveys = data.items;
          this.totalSurveys = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.loadedSurveys = data.items;
      this.totalSurveys = data.total;
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
      // 사실 이 getDataFromApi 함수와 바로 다음 함수인 getSurveys 는
      // 별개의 함수로 둘 필요가 없고, 정확한 URL 로 ajax 요청을 해서 데이터를 받아온 후
      // .then 을 통해 이 getDataFromApi 의 내용만 충실히 수행하면 된다.
      // 예를 들어 유저 한명의 설문들을 가져오기 위해서는
      // 본래 관리자 페이지의 http://admin.moqa.co.kr/admin/ajax/myRegisteredSurveyInfo.do
      // 로 요청을 넣어 데이터를 받아오면되고, (memberSeq=5 같은 인자를 포함시켜 POST)
      // 전체 설문 목록을 가져올 경우에는
      // http://admin.moqa.co.kr/admin/ajax/surveyListForWeb.do 으로
      // surveyTypeCode=01&limit=10&offset=0&pageNum=1&order=asc&pageSize=10
      // 와 같은 인자를 넣어 POST 해주면 되는거 같다.
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let dataResult = this.getSurveys();
        let items = dataResult.rows;
        const total = dataResult.total;

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }
        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getSurveys() {
      // 'user' 는 임의로 설정한 특정 memberSeq 한명의 유저의 surveyList
      return {
        total: 346,
        rows: [
          {
            reportSurveyId: 321,
            surveyId: "Q2018082130",
            memberSeq: 0,
            reportReason: "비속어, 욕설, 인신공격",
            registDt: "2018-08-21 14:07:26.963",
            surveyTitle:
              "자신의 애인이 유흥업소에 간 것을 알게 되었다.\n나의 선택은?",
            name: "IDL"
          },
          {
            reportSurveyId: 322,
            surveyId: "Q2018082126",
            memberSeq: 0,
            reportReason: "같은내용의 반복게시",
            registDt: "2018-08-21 14:07:34.543",
            surveyTitle: "아리아나 그란데 새 앨범 sweetener 중 최애곡은? ",
            name: "IDL"
          },
          {
            reportSurveyId: 323,
            surveyId: "Q2018082125",
            memberSeq: 0,
            reportReason: "같은내용의 반복게시",
            registDt: "2018-08-21 14:07:42.917",
            surveyTitle: "아리아나 그란데 신규 앨범 sweetener \n어떤가요?",
            name: "IDL"
          },
          {
            reportSurveyId: 305,
            surveyId: "Q2018081769",
            memberSeq: 0,
            reportReason: "음란/선정성",
            registDt: "2018-08-17 22:08:47.94",
            surveyTitle: "남자들만 해줘",
            name: "IDL"
          },
          {
            reportSurveyId: 299,
            surveyId: "Q2018081748",
            memberSeq: 0,
            reportReason: "유해성 컨텐츠(음란물, 불법게시물 등)",
            registDt: "2018-08-17 18:02:50.42",
            surveyTitle: "ㄱㅆ\n",
            name: "성국2"
          },
          {
            reportSurveyId: 135,
            surveyId: "Q2018073113",
            memberSeq: 0,
            reportReason:
              "이걸 내 얼굴이 안 예쁜지 예쁜지는 자신이 알아야지 굳이 이렇게 글을 남겨서 자존심 안 좋게 해야하나,,?",
            registDt: "2018-08-01 14:13:48.777",
            surveyTitle: "타고난 외모에서 선택한다면?",
            name: "조혜영"
          },
          {
            reportSurveyId: 123,
            surveyId: "Q2018072773",
            memberSeq: 0,
            reportReason: "돈이적다",
            registDt: "2018-07-27 21:24:10.35",
            surveyTitle: "자신의 외모점수??",
            name: "운식"
          },
          {
            reportSurveyId: 134,
            surveyId: "Q2018072734",
            memberSeq: 0,
            reportReason: "부적절한 어휘 사용(비속어, 욕설 등)",
            registDt: "2018-07-30 11:50:03.81",
            surveyTitle: "로이조VS보겸(ㅂㅇㄹ)",
            name: "양송이"
          },
          {
            reportSurveyId: 109,
            surveyId: "Q2018072724",
            memberSeq: 0,
            reportReason: "gg",
            registDt: "2018-07-27 11:54:45.313",
            surveyTitle: "갓겜은?",
            name: "IDL"
          }
        ],
        search: null
      };
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

