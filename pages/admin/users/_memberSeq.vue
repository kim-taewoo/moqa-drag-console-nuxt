<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>회원정보</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="기본 정보" value="status"></v-radio>
          <v-radio label="설문등록 이력" value="surveys"></v-radio>
          <v-radio label="포인트 적립 및 사용" value="points"></v-radio>
          <v-radio label="1:1 메시지" value="message"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>

    <!-- '기본정보' 라디오버튼 클릭시 페이지 -->
    <v-layout wrap v-show="radioBtn == 'status'">
      <v-flex class="xs12">
        <userProfileAdmin :profile="content"/>
      </v-flex>
    </v-layout>

    <!-- '설문등록 이력' 페이지 -->
    <v-layout wrap v-show="radioBtn == 'surveys'">
      <admin-survey-list isUserInfo></admin-survey-list>
    </v-layout>

    <!-- '포인트 적립 및 사용' 페이지 -->
    <v-layout wrap v-show="radioBtn == 'points'">
      <v-flex xs12 >
        <div><span class="font-weight-bold">{{content.name}}</span> 회원님의 현재 포인트는 <span class="pink--text">{{content.point}} P</span> 입니다. </div>
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
            <td class="text-xs-center" v-text="props.item.type == 'save' ? '적립' : '사용'"></td>
            <td class="text-xs-center">{{ props.item.point }} </td>
            <td class="text-xs-center">{{ props.item.reason }}</td>
            <td class="text-xs-center">{{ props.item.date }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- '1:1 메세지 페이지' -->
    <v-layout wrap v-show="radioBtn == 'message'">
      <v-flex xs12 >
        <one-to-one-message></one-to-one-message>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import userProfileAdmin from "@/components/profile/userProfileAdmin";
import oneToOneMessage from "@/components/admin/oneToOneMessage";
import adminSurveyList from '@/components/admin/adminSurveyList'

export default {
  components: {
    userProfileAdmin,
    oneToOneMessage,
    adminSurveyList
  },
  data() {
    return {
      content: { ...this.$route.params },
      radioBtn: "status",
      headers: [
        { text: "유형", align: "center", value: "type" },
        { text: "포인트", align: "center", value: "point" },
        { text: "사유", align: "center", value: "reason" },
        { text: "적립일", align: "center", value: "date" }
      ],
      points: [],
      totalpoints: 0,
      loading: true,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi("points").then(data => {
          this.points = data.items;
          this.totalpoints = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi("points").then(data => {
      this.points = data.items;
      this.totalpoints = data.total;
    });
  },
  methods: {
    getDataFromApi(arg) {
      this.loading = true;
      if (arg == "points") {
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination;

          let dataResult = this.getUserPoints();
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
    getUserPoints() {
      return {
        total: 5,
        rows: [
          {
            point: 500,
            reason: "회원가입 축하 리워드",
            memberSeq: 9452,
            type: "save",
            date: "2018-08-23 06:58:06"
          },
          {
            point: 50,
            reason: "설문완료(성공)",
            memberSeq: 9452,
            type: "save",
            date: "2018-08-23 06:59:21"
          },
          {
            point: 50,
            reason: "설문완료(성공)",
            memberSeq: 9452,
            type: "save",
            date: "2018-08-23 07:05:52"
          },
          {
            point: 100,
            reason: "설문완료(성공)",
            memberSeq: 9452,
            type: "save",
            date: "2018-08-23 07:07:54"
          },
          {
            point: 50,
            reason: "설문완료(성공)",
            memberSeq: 9452,
            type: "save",
            date: "2018-08-23 07:10:02"
          }
        ],
        search: null
      };
    }
  }
};
</script>
