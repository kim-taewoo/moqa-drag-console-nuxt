<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>메세지/push</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="PUSH 목록" value="push"></v-radio>
          <v-radio label="1:1 메세지 목록" value="message"></v-radio>
        </v-radio-group>
      </v-flex>

      <!-- radio 선택 중에 push 목록을 선택했을 시 나타나는 내용들 -->
      <v-flex class="xs12" v-show="radioBtn == 'push'">

        <!-- 새로 만들기 버튼 클릭시 뜨는 대화창 -->
        <v-dialog v-model="newPushDialog" persistent max-width="900px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-subheader class="primary--text">Push 메세지</v-subheader>

                    <v-text-field label="메세지 내용" required hint="메세지를 입력하세요."></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="메세지 라벨" hint="메세지 닉네임을 입력하세요."></v-text-field>
                  </v-flex>
                  
                  <!-- select 메뉴 목록 -->
                  <v-flex xs12>
                    <v-subheader class="primary--text">전송 날짜</v-subheader>
                  </v-flex>
                  <v-flex xs12 md4 class="d-flex" align-center>
                    <v-select
                      :items="newPushTiming"
                      solo
                      v-model="newPushDefaultDate"
                      hide-details
                    ></v-select>
                  </v-flex>

                  <!-- 지금 보내기가 아닐 때 날짜 고르기 -->
                  <v-flex xs12 md4 class="d-flex" align-center>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="dateDialog"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      :disabled="newPushDefaultDate == '지금 보내기'"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"

                    >
                      <v-text-field
                        slot="activator"
                        v-model="newPushDate"
                        :disabled="newPushDefaultDate == '지금 보내기'"
                        label="Date"
                        prepend-icon="event"
                        readonly
                        hide-details
                      ></v-text-field>
                      <v-date-picker v-model="newPushDate" no-title @input="dateDialog = false" :min="new Date(new Date().setDate(new Date().getDate()-1)).toJSON()"></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <!-- 지금 보내기가 아닐 때 시간 고르기 -->
                  <v-flex xs12 md4 class="d-flex" align-center>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="timeDialog"
                      :nudge-right="40"
                      lazy
                      :disabled="newPushDefaultDate == '지금 보내기'"
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="newPushTime"
                        :disabled="newPushDefaultDate == '지금 보내기'"
                        label="Time"
                        prepend-icon="access_time"
                        readonly
                        hide-details
                      ></v-text-field>
                      <v-time-picker
                        v-model="newPushTime"
                        no-title
                        @input="timeDialog = false"
                        format="24hr"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>

                  <!-- 보낼 대상 설정하기 -->
                  <v-flex xs12>
                    <v-subheader class="primary--text">대상 설정</v-subheader>
                    <v-radio-group v-model="newPushRadioBtn" row hide-details>
                      <v-radio label="안드로이드/iOS 전체" value="all"></v-radio>
                      <v-radio label="그룹 선택하기" value="selectGroup"></v-radio>
                      <v-radio label="설문번호 입력하기" value="setTargetSurvey"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <!-- 타겟 그룹을 불러오는 ajax 가 필요한 부분. 여기서는 아래 data 의 'group' 항목을 임의로 사용중-->
                    <v-select
                      v-if="newPushRadioBtn == 'selectGroup'"
                      :items="groups.rows"
                      :item-text="'memberGroupName'"
                      label="그룹 선택하기"
                      solo
                      v-model="newPushDefaultDate"
                      hide-details
                    ></v-select>
                    <v-text-field v-if="newPushRadioBtn == 'setTargetSurvey'" v-model="targetSurvey" hide-details label="설문번호 입력하기"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-subheader class="primary--text">딥링크</v-subheader>
                    <v-text-field v-model="deepLink" hide-details label="Deep link URL 추가"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="newPushDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="newPushDialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- 새로 만들기 대화창 끝 -->
        <!-- push 메인화면 시작 -->
        <div style="position: relative; height: 28px;">
          <v-btn @click.stop="newPushDialog = true" absolute style="right: 0; top:-15px;">새 메시지</v-btn>
        </div>
        <v-divider></v-divider>
        <v-data-table
            :headers="headers"
            :items="pushes"
            :pagination.sync="pagination"
            :total-items="totalPushes"
            :loading="loading"
            class="elevation-0"
          >
          <template slot="items" slot-scope="props">
            <!-- <tr @click.stop="$router.push({name: 'admin-users-memberSeq', params: props.item})"> -->
              <td class="text-xs-center" >
                <div>
                  {{ props.item.title }}
                </div>
                <div class="grey--text">
                  {{ props.item.content}}}
                </div>
              </td>
              <td class="text-xs-center">{{ props.item.status }}</td>
              <td class="text-xs-center">{{ props.item.date }}</td>
              <td class="text-xs-center">{{ props.item.target }}</td>
              <td class="text-xs-center">{{ props.item.numTarget }} 명</td>
              <td class="text-xs-center">{{ props.item.checkRate }} %</td>
            <!-- </tr> -->
          </template>
        </v-data-table>
      </v-flex>
      <!-- 여기까지가 push 관련 내용 -->



      <!-- 여기서부터는 1:1 메시지 관련 내용 -->
      <v-flex xs12 v-show="radioBtn == 'message'">
        <v-layout>
          <v-flex xs4>
            <v-text-field v-model="search" single-line hide-details label="검색" append-icon="search"></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 class="text-xs-right">
            <v-btn @click.stop="$router.push({name: 'admin-message-newMessage'})">작성하기</v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-data-table
            :headers="headersMessage"
            :items="messages"
            :pagination.sync="paginationMessage"
            :total-items="totalMessages"
            :loading="loading"
            class="elevation-0"
            :search="search"
          >
          <template slot="items" slot-scope="props">
            <!-- <tr @click.stop="$router.push({name: 'admin-users-memberSeq', params: props.item})"> -->
              <td class="text-xs-center">{{ props.item.messageNum }}</td>
              <td class="text-xs-center">{{ props.item.memberSeq }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.gender }}</td>
              <td class="text-xs-center">{{ props.item.messageContent }}</td>
              <td class="text-xs-center">{{ props.item.check }}</td>
            <!-- </tr> -->
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
      radioBtn: "push",
      newPushDialog: false,
      newPushDefaultDate: "지금 보내기",
      dateDialog: false,
      timeDialog: false,
      newPushDate: null,
      newPushTime: null,
      newPushTiming: ["지금 보내기", "나중에 보내기"],
      newPushRadioBtn: "all",
      deepLink: "",
      headers: [
        { text: "메세지", align: "center", value: "title" },
        { text: "상태", align: "center", value: "status" },
        { text: "전송날짜", align: "center", value: "date" },
        { text: "전송타겟", align: "center", value: "target" },
        { text: "전송인원", align: "center", value: "numTarget" },
        { text: "수신확인율", align: "center", value: "checkRate" }
      ],
      loading: true,
      pushes: [],
      totalPushes: 0,
      pagination: {},

      // 삭제되거나 수정예정인 부분
      groups: {
        total: 4,
        rows: [
          {
            memberGroupId: 6,
            memberGroupName: "배현우님",
            registDt: "2018-07-11 13:51:39.197",
            registerId: "admin",
            memberCount: 1
          },
          {
            memberGroupId: 5,
            memberGroupName: "REAL_CONTACT",
            registDt: "2018-06-21 16:30:50.09",
            registerId: "admin",
            memberCount: 1
          },
          {
            memberGroupId: 3,
            memberGroupName: "류대표님",
            registDt: "2018-06-15 19:54:26.893",
            registerId: "admin",
            memberCount: 1
          },
          {
            memberGroupId: 2,
            memberGroupName: "뉴 인데이터랩(류대표포함)",
            registDt: "2018-06-05 20:18:59.59",
            registerId: "admin",
            memberCount: 5
          }
        ],
        search: null
      },
      //여기부터 1:1 관련 변수들
      search: "",
      headersMessage: [
        { text: "메세지 번호", align: "center", value: "messageNum" },
        { text: "회원번호", align: "center", value: "memberSeq" },
        { text: "이메일", align: "center", value: "email" },
        { text: "이름", align: "center", value: "name" },
        { text: "성별", align: "center", value: "gender" },
        { text: "메세지 내용", align: "center", value: "messageContent" },
        { text: "수신확인", align: "center", value: "check" }
      ],
      messages: [],
      totalMessages: 0,
      paginationMessage: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi("push").then(data => {
          this.pushes = data.items;
          this.totalPushes = data.total;
        });
      },
      deep: true
    },
    paginationMessage: {
      handler() {
        this.getDataFromApi("message").then(data => {
          this.messages = data.items;
          this.totalMessages = data.total;
        });
      },
      deep: true
    },
    // 1:1 메세지 기능에서 검색을 했을 경우 이 search 와 관련이 있음.
    // 위 pagination 처럼 ajax 콜을 보낸 후에 this.pushes 에 받은 데이터를 넣어야함.
    // this.totalPushes 에는 해당 검색 결과의 항목 개수가 들어가게 됨.
    search: {
      //로직
    }
  },
  mounted() {
    this.getDataFromApi("push").then(data => {
      this.pushes = data.items;
      this.totalPushes = data.total;
    });
    // 헷갈림을 줄이기 위해 그냥 중복코드작성
    this.getDataFromApi("message").then(data => {
      this.messages = data.items;
      this.totalMessages = data.total;
    });
  },
  methods: {
    getDataFromApi(arg) {
      this.loading = true;
      if (arg == "push") {
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination;

          let dataResult = this.getPushes();
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
          const {
            sortBy,
            descending,
            page,
            rowsPerPage
          } = this.paginationMessage;

          let dataResult = this.getMessages();
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
      }
    },
    // 더미 데이터 가져오기([push 관련])
    getPushes() {
      return {
        total: 25,
        rows: [
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "검색테스트용",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          },
          {
            title: "대입정책에 대한 생각을 공유하고자 합니다.",
            content: "[8/7] 2022 대입개편안 관련 인식 조사",
            status: "완료됨",
            date: "2018-08-23 07:10:02",
            target: "안드로이드",
            numTarget: 5005,
            checkRate: 20
          }
        ]
      };
    },
    getMessages() {
      return {
        total: 25,
        rows: [
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 5px;
}
.v-subheader {
  padding: 0;
  height: 40px;
}
</style>

