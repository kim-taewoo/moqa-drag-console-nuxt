<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>기업회원</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex class="xs12 text-xs-right mt-3">
        <v-btn nuxt to="/admin/usersBiz/newBizUser">새로 만들기</v-btn>
      </v-flex>

      <v-flex class="xs12">
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="bizUsers"
          :pagination.sync="pagination"
          :total-items="totalBizUsers"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click.stop="$router.push({name: 'admin-usersBiz-userId', params: props.item})">
              <td class="text-xs-center">{{ props.item.userId }}</td>
              <td class="text-xs-center">{{ props.item.name }} </td>
              <td class="text-xs-center">{{ props.item.adminYn }}</td>
              <td class="text-xs-center">{{ props.item.createDt }}</td>
              <td class="text-xs-center">{{ props.item.mobile }}</td>
              <td class="text-xs-center">{{ props.item.code }}</td>
            </tr>
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
      totalBizUsers: 0,
      headers: [
        { text: "기업회원ID", align: "center", value: "userId" },
        { text: "이름", align: "center", value: "name" },
        { text: "관리자여부", align: "center", value: "adminYn" },
        { text: "생성일", align: "center", value: "createDt" },
        { text: "휴대전화번호", align: "center", value: "mobile" },
        { text: "기업회원코드", align: "center", value: "code" }
      ],
      bizUsers: [],
      loading: true,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.bizUsers = data.items;
          this.totalBizUsers = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.bizUsers = data.items;
      this.totalBizUsers = data.total;
    });
  },
  methods: {
    downloadUse() {
      console.log("bizUsers");
    },
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let dataResult = this.getBizUsers();
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
    getBizUsers() {
      return {
        total: 4,
        rows: [
          {
            userId: "netpoint",
            password: "ee1f9e2c0d4a209f28bce992a57aa8df88f37cb9a089bfc",
            name: "넷포인트",
            adminYn: "N",
            code: "1410",
            createDt: "2018-06-15 18:34:35.543",
            email: "contact@in-datalab.com",
            mobile: "010-7120-7156",
            authUserList: "Y",
            authUserGroup: "Y",
            authSurveyList: "N",
            authReportSurveyList: "N",
            authCompleteSurveyList: "N",
            authSurveyAdd: "N"
          },
          {
            userId: "admin_idl",
            password: "9cdff2c29efcb04c1998efb8cdc693fc84a19b9eccfd",
            name: "사전신청",
            adminYn: "N",
            code: "0719",
            createDt: "2018-06-14 12:27:01.307",
            email: "tj0605@in-datalab.com",
            mobile: "010-8732-2816",
            authUserList: "N",
            authUserGroup: "N",
            authSurveyList: "N",
            authReportSurveyList: "N",
            authCompleteSurveyList: "N",
            authSurveyAdd: "N"
          },
          {
            userId: "admin",
            password: "9cdff2c29efcb04c1998efb8cdc693fc84a19b9eccfd",
            name: "관리자",
            adminYn: "Y",
            code: null,
            createDt: null,
            email: "contact@in-datalab.com",
            mobile: "",
            authUserList: null,
            authUserGroup: null,
            authSurveyList: null,
            authReportSurveyList: null,
            authCompleteSurveyList: null,
            authSurveyAdd: null
          },
          {
            userId: "test_comp",
            password: "feabda133c23d6e01e95eec4582a71af8ff7aca5",
            name: "TEST 회사",
            adminYn: "Y",
            code: "A001",
            createDt: null,
            email: null,
            mobile: null,
            authUserList: null,
            authUserGroup: null,
            authSurveyList: null,
            authReportSurveyList: null,
            authCompleteSurveyList: null,
            authSurveyAdd: null
          }
        ],
        search: null
      };
    }
  }
};
</script>

