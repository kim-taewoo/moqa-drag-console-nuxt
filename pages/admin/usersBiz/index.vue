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
          :rows-per-page-items="[10,15,20]"
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
import qs from 'qs'
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
          this.bizUsers = data.rows;
          this.totalBizUsers = data.total;
          this.loading = false
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.bizUsers = data.rows;
      this.totalBizUsers = data.total;
      this.loading = false
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxAdminUserList.do?' + qs.stringify({
          pageSize:10,
          offset:0,
          pageNum:this.pagination.page,
        }), {
        withCredentials: true,
        crossdomain : true,
      })
    },
    
  }
};
</script>

