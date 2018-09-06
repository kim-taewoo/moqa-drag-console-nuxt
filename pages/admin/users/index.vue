<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>회원목록</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-layout>
          <v-flex xs2 class="mr-3">
            <v-select
              :items="searchTypes"
              v-model="searchType"
              hide-details
              label="검색 기준"
            ></v-select>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="검색"
              @keydown.enter.prevent="searchByType"
              :hint="`${searchType} 로 검색`"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 class="text-xs-right">
            <v-btn v-if="!isAddGroup" @click.stop="downloadUserList">회원목록 다운로드</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="mt-2">
        <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="filteredUsers"
            :pagination.sync="pagination"
            :total-items="totalUsers"
            :loading="loading"
            class="elevation-0"
            :select-all="isAddGroup"
            item-key="memberSeq"
            v-model="selected"
            :rows-per-page-items="[10,15,20]"
          >
            <template slot="items" slot-scope="props">
              <tr @click.stop="rowSelected(props.item)">
                <td v-if="isAddGroup">
                  <v-checkbox
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td class="text-xs-center">{{ props.item.memberSeq }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.gender }}</td>
                <td class="text-xs-center">{{ props.item.mobileNum }}</td>
                <td class="text-xs-center">{{ props.item.point }}</td>
                <td class="text-xs-center">{{ props.item.joinDt }}</td>
                <td class="text-xs-center"></td>
                <td class="text-xs-center">{{ props.item.birth }}</td>
                <td class="text-xs-center">{{ props.item.deviceType }}</td>
                <td class="text-xs-center">{{ props.item.version }}</td>
                <td class="text-xs-center" v-text="props.item.useYn == 'Y' ? '사용중' : '탈퇴'"></td>
              </tr>
            </template>
          </v-data-table>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    isAddGroup: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      search: "",
      selected: [],
      searchTypes: [
        {
          text: "이름",
          value: "name"
        },
        {
          text: "휴대전화",
          value: "mobile"
        },
        {
          text: "회원번호",
          value: "userNum"
        },
        {
          text: "메일",
          value: "email"
        }
      ],
      searchType: "name",

      //테이블 관련 데이터들
      headers: [
        { text: "회원번호", align: "center", value: "memberSeq" },
        { text: "이메일", align: "center", value: "email" },
        { text: "이름", align: "center", value: "name" },
        { text: "성별", align: "center", value: "gender" },
        { text: "전화번호", align: "center", value: "mobileNum" },
        { text: "보유포인트", align: "center", value: "point" },
        { text: "가입일", align: "center", value: "joinDt" },
        { text: "마지막접속", align: "center", value: "" },
        { text: "생일", align: "center", value: "birth" },
        { text: "로그인기기", align: "center", value: "deviceType" },
        { text: "앱버전", align: "center", value: "version" },
        { text: "회원상태", align: "center", value: "useYn" }
      ],
      loading: true,
      pagination: {},
      users: [],
      filteredUsers: [],
      totalUsers: 0
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.users = data.rows;
          this.totalUsers = data.total;
          this.filteredUsers = data.rows
          this.loading - false
        });
      },
      deep: true
    },
    search (val) {
      // 지금은 더미 데이터에서만 검색이 되지만, 아래 함수를 전체 서버에서 가져오는 것으로
      // 수정하고 나면 전체 데이터에서 검색이 가능할 것. 
      if (this.searchType == "name") {
        this.filteredUsers=  this.users.filter(user => {
          return user.name.includes(val)
        });
      } else if (this.searchType == "mobile") {
        // this.filteredUsers = this.users.filter(user => {
        //   return user.mobileNum.indexOf(val) > -1
        // })
        console.log(this.users[1].mobileNum)
        console.log("모바일로 검색중", val);
        console.log(typeof(val))
      } else if (this.searchType == "userNum") {
        this.filteredUsers = this.users.filter(user => {
          return String(user.memberSeq).indexOf(val) > -1
        })
        console.log("회원번호로 검색중", val);
      } else {
        this.filteredUsers = this.users.filter(user => {
          return user.email.includes(val)
        })
        console.log("메일로 검색중");
      }
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.users = data.rows;
      this.totalUsers = data.total;
      this.filteredUsers = data.rows
      this.loading = false
    });
  },
  methods: {
    downloadUserList() {
      // 회원목록 다운로드 버튼 클릭시 실행되는 함수. 회원목록을 다운 받는 엑셀 request 실행되어야 함
      // 예시
      // this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/downloadExcelUsers.do')
      console.log("리스트 다운로드");
    },
    // 테이블 row 를 클릭했을 때 발생 이벤트.
    rowSelected (item) {
      if (this.isAddGroup) {
        return
      } else {
        this.$router.push({name: 'admin-users-memberSeq', params: item})
      }
    },
    searchByType() {
      //검색 유형에 따른 다른 함수 적용. 물론 하나의 함수에 인자만 다르게 넣어도 됨.
      // this.search 가 사용자가 검색입력창에 입력한 값이고 this.searchType 가 검색기준(이름,휴대전화,메일, 회원번호)이다.
      if (this.searchType == "name") {

        this.filteredUsers=  this.users.filter(user => {
          return user.name.includes(this.search);
        });
      } else if (this.searchType == "mobile") {
        console.log("모바일로 검색중");
      } else if (this.searchType == "userNum") {
        console.log("회원번호로 검색중");
      } else {
        console.log("메일로 검색중");
      }
    },

    getDataFromApi() {
      this.loading = true;
      // 필요 여부 알수 없음
      this.$axios.setHeader('Cookie', 'JSESSIONID=19D55D5DD4E1A5417A4D42F78C15CF18')
      this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
        'post'
      ])
      //
      // POST 리퀘스트. 어떤 라이브러리를 쓸지, 어떤 방식으로 request 를 넣을지 미정. 프론트단에서의 테스트를 위해 임시로 axios 라는 모듈로 테스트를 진행하였음
      return this.$axios.$post('http://13.125.135.167/admin/ajax/ajaxMemberList.do' + qs.stringify({
          limit: 10,
          offset: 0,
          pageNum: 1,
          pageSize: 10,
        }), {
        withCredentials: true,
        crossdomain : true,
      })
    },
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 5px;
}
.v-input__control {
  min-height: 25px;
}
</style>
