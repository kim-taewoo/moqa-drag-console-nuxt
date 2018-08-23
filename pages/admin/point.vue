<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>포인트 관리</h3>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="포인트 사용내역" value="use"></v-radio>
          <v-radio label="포인트 취득내역" value="save"></v-radio>
          <v-spacer></v-spacer>
          <v-btn @click="radioBtn == 'use' ? downloadUse() : downloadSave()">다운로드</v-btn>
        </v-radio-group>
      </v-flex>

      <v-flex class="xs12" v-show="radioBtn == 'use'">
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="points"
          :pagination.sync="pagination"
          :total-items="totalpoints"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.memberId }}</td>
            <td class="text-xs-center">{{ props.item.name }} </td>
            <td class="text-xs-center">{{ props.item.useDt }}</td>
            <td class="text-xs-center">{{ props.item.useReason }}</td>
            <td class="text-xs-center">{{ props.item.usePoint }}</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex class="xs12" v-show="radioBtn == 'save'">
        <v-divider></v-divider>
        <v-data-table
          :headers="headersSave"
          :items="pointsSave"
          :pagination.sync="paginationSave"
          :total-items="totalpointsSave"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.memberId }}</td>
            <td class="text-xs-center">{{ props.item.name }} </td>
            <td class="text-xs-center">{{ props.item.saveDt }}</td>
            <td class="text-xs-center">{{ props.item.saveReason }}</td>
            <td class="text-xs-center">{{ props.item.savePoint }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      radioBtn: "use",
      totalpoints: 0,
      totalpointsSave: 0,
      headers: [
        { text: "사용자ID", align: "center", value: "memberId" },
        { text: "이름", align: "center", value: "name" },
        { text: "사용일시", align: "center", value: "useDt" },
        { text: "사용아이템", align: "center", value: "useReason" },
        { text: "사용포인트", align: "center", value: "usePoint" },
        { text: "처리상태", align: "center", value: "status" }
      ],
      headersSave: [
        { text: "사용자ID", align: "center", value: "memberId" },
        { text: "이름", align: "center", value: "name" },
        { text: "적립일시", align: "center", value: "saveDt" },
        { text: "적립사유", align: "center", value: "saveReason" },
        { text: "적립포인트", align: "center", value: "savePoint" }
      ],
      points: [],
      pointsSave: [],
      loading: true,
      pagination: {},
      paginationSave: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi("use").then(data => {
          this.points = data.items;
          this.totalpoints = data.total;
        });
      },
      deep: true
    },
    paginationSave: {
      handler() {
        this.getDataFromApi("save").then(data => {
          this.pointsSave = data.items;
          this.totalpointsSave = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi("use").then(data => {
      this.points = data.items;
      this.totalpoints = data.total;
    });
    this.getDataFromApi("save").then(data => {
      this.pointsSave = data.items;
      this.totalpointsSave = data.total;
    });
  },
  methods: {
    downloadUse() {
      console.log("use");
    },
    downloadSave() {
      console.log("save");
    },
    getDataFromApi(arg) {
      this.loading = true;
      if (arg == "use") {
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination;

          let items = this.getpoints();
          const total = items.length;

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
      } else {
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.paginationSave;

          let items = this.getpointsSave();
          const total = items.length;

          if (this.paginationSave.sortBy) {
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
      }
    },
    getpoints() {
      return [
        {
          num: 21,
          pointUseId: 476,
          memberSeq: 5932,
          usePoint: 1700,
          useReason: "상품권 구매[롯데)제주사랑제주감귤500ML]",
          useDt: "2018-08-19 03:53:05.307",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "홍우종 ",
          memberId: "ka_894920602",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 22,
          pointUseId: 475,
          memberSeq: 1310,
          usePoint: 2000,
          useReason: "상품권 구매[신화)꾸이꾸이30G]",
          useDt: "2018-08-18 23:27:08.973",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "이영술",
          memberId: "dinicu222@naver.com",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 23,
          pointUseId: 474,
          memberSeq: 5932,
          usePoint: 5600,
          useReason: "상품권 구매[새우버거세트]",
          useDt: "2018-08-18 22:52:56.823",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "홍우종 ",
          memberId: "ka_894920602",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 24,
          pointUseId: 473,
          memberSeq: 2155,
          usePoint: 1800,
          useReason: "상품권 구매[덴마크)요구르트플레인310ML]",
          useDt: "2018-08-18 20:51:48.757",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "박민기",
          memberId: "gg_103476990173022978936",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 25,
          pointUseId: 472,
          memberSeq: 2155,
          usePoint: 2400,
          useReason: "상품권 구매[롯데)칙촉2400]",
          useDt: "2018-08-18 20:51:24.773",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "박민기",
          memberId: "gg_103476990173022978936",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 26,
          pointUseId: 471,
          memberSeq: 8623,
          usePoint: 1500,
          useReason: "설문등록[100명]",
          useDt: "2018-08-18 17:26:17.757",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "이은선",
          memberId: "ka_902236101",
          useType: "targetSurvey",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 27,
          pointUseId: 470,
          memberSeq: 5932,
          usePoint: 2000,
          useReason: "상품권 구매[코카)마운틴블러스트600ML]",
          useDt: "2018-08-18 14:30:42.39",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "홍우종 ",
          memberId: "ka_894920602",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 28,
          pointUseId: 469,
          memberSeq: 5932,
          usePoint: 2000,
          useReason: "상품권 구매[유어스)베이컨소세지100G]",
          useDt: "2018-08-18 14:09:22.71",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "홍우종 ",
          memberId: "ka_894920602",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 29,
          pointUseId: 468,
          memberSeq: 5932,
          usePoint: 1600,
          useReason: "상품권 구매[농심)너구리큰사발]",
          useDt: "2018-08-18 14:07:55.59",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "홍우종 ",
          memberId: "ka_894920602",
          useType: "giftishow",
          pointRevokeMessage: null,
          status: "정상구매"
        },
        {
          num: 30,
          pointUseId: 467,
          memberSeq: 7231,
          usePoint: 3000,
          useReason: "설문등록[200명]",
          useDt: "2018-08-18 11:38:12.247",
          revokeDt: null,
          revokeReason: null,
          revokeYn: "N",
          goods_info: null,
          imgPath: null,
          name: "장현수",
          memberId: "gg_108701664422305942250",
          useType: "targetSurvey",
          pointRevokeMessage: null,
          status: "정상구매"
        }
      ];
    },
    getpointsSave() {
      return [
        {
          num: 11,
          pointSaveId: 118379,
          memberSeq: 1020,
          savePoint: 10,
          saveDt: "2018-08-22 14:36:34.793",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "류유심",
          memberId: "rus1113",
          saveCode: null
        },
        {
          num: 12,
          pointSaveId: 118378,
          memberSeq: 5731,
          savePoint: 10,
          saveDt: "2018-08-22 14:36:33.06",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "노세문",
          memberId: "ka_894226944",
          saveCode: null
        },
        {
          num: 13,
          pointSaveId: 118377,
          memberSeq: 473,
          savePoint: 10,
          saveDt: "2018-08-22 14:33:32.503",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "초블리",
          memberId: "ka_801882993",
          saveCode: null
        },
        {
          num: 14,
          pointSaveId: 118376,
          memberSeq: 474,
          savePoint: 10,
          saveDt: "2018-08-22 14:29:48.327",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "김안수",
          memberId: "ka_801883235",
          saveCode: null
        },
        {
          num: 15,
          pointSaveId: 118375,
          memberSeq: 5557,
          savePoint: 10,
          saveDt: "2018-08-22 14:29:41.89",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "이주열",
          memberId: "lrlrlrnet@naver.com",
          saveCode: null
        },
        {
          num: 16,
          pointSaveId: 118374,
          memberSeq: 8307,
          savePoint: 10,
          saveDt: "2018-08-22 14:27:23.21",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "김경진",
          memberId: "ka_901614654",
          saveCode: null
        },
        {
          num: 17,
          pointSaveId: 118373,
          memberSeq: 7635,
          savePoint: 10,
          saveDt: "2018-08-22 14:25:03.49",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "이수현",
          memberId: "gg_109084692995402288133",
          saveCode: null
        },
        {
          num: 18,
          pointSaveId: 118372,
          memberSeq: 1392,
          savePoint: 10,
          saveDt: "2018-08-22 14:21:37.897",
          saveReason: "오늘의 미션 성공",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "조정숙",
          memberId: "ivy0073@naver.com",
          saveCode: null
        },
        {
          num: 19,
          pointSaveId: 118371,
          memberSeq: 9337,
          savePoint: 500,
          saveDt: "2018-08-22 14:20:27.04",
          saveReason: "회원가입 축하 리워드",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: null,
          surveyTitle: null,
          name: "윤준부",
          memberId: "fb_1717261788396116",
          saveCode: null
        },
        {
          num: 20,
          pointSaveId: 118370,
          memberSeq: 1604,
          savePoint: 50,
          saveDt: "2018-08-22 14:18:45.283",
          saveReason: "설문완료(성공)",
          revokeYn: "N",
          revokeReason: null,
          revokeDt: null,
          surveyId: "Q2018062115",
          surveyTitle: null,
          name: "이만규",
          memberId: "mandoriii1@naver.com",
          saveCode: null
        }
      ];
    }
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 0px;
}
</style>
