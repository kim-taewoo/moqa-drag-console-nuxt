<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="ma-3 title" xs12>
         <span class="pa-2 notice-title">공지사항</span> 
      </v-flex>
      <v-flex xs12 sm6 lg4 class="pl-3 text-xs-left">
        <v-text-field
            v-model="search"
            append-icon="search"
            label="검색"
            single-line
            hide-details
          ></v-text-field>
      </v-flex>
    </v-layout>
        
    <v-divider></v-divider>

    <v-layout>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="notices"
          :total-items="totalNotices"
          :search="search"
          :pagination.sync="pagination"
          :loading="loading"
          :rows-per-page-items="[10,25,50,100]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({name: 'notice-id', params: props.item})" >
              <td class="text-xs-center">{{ props.item.userId }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ props.item.createDt }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "사용자ID", align: "center", value: "writerId",sortable: false },
      { text: "이름", align: "center", value: "name" ,sortable: false},
      { text: "제목", align: "center", value: "title", sortable: false },
      { text: "등록일", align: "center", value: "created_date" ,sortable: false}
      // { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    notices: [],
    totalNotices: 0,
    pagination: {descending: true},
    loading: true,
  }),

  watch: {
    pagination: {
      handler () {
        this.getDataFromApi().then(data => {
          this.notices = data.rows;
          this.totalNotices = data.total
          this.loading = false
          console.log(data)
        }).catch(err => console.log(err))
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi().then(data => {
      this.notices = data.rows;
      this.totalNotices = data.total
      this.loading = false
      console.log(this.pagination)
    })
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/noticeList.do', {
        withCredentials: true,
        crossdomain : true,
        data: {
          pageNum: 1,
          pageSize: 10,
          limit: 10,
          offset: 0
        }
      })
    },
  }
};
</script>

<style scoped>
.notice-title {
  display: inline-block;
  border-bottom: 2px solid #1976d2;
}
</style>

