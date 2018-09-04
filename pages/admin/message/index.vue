<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>메시지/push</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="PUSH 목록" value="push"></v-radio>
          <v-radio label="1:1 메시지 목록" value="message"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>

      <!-- radio 선택 중에 push 목록을 선택했을 시 나타나는 내용들 -->
    <v-layout wrap v-show="radioBtn == 'push'">
      <v-flex class="xs12" >

        <!-- 새로 만들기 버튼 클릭시 뜨는 대화창 -->
        <v-dialog v-model="newPushDialog" persistent max-width="900px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-subheader class="primary--text">Push 메시지</v-subheader>

                    <v-text-field label="메시지 내용" required hint="메시지를 입력하세요."></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="메시지 라벨" hint="메시지 닉네임을 입력하세요."></v-text-field>
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
                      <v-radio label="설문번호 입력하기" value="setTargetSurvey"></v-radio>
                      <v-radio label="그룹 선택하기" value="selectGroup"></v-radio>
                      <v-radio label="새 그룹 생성" value="newGroup"></v-radio>
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
            :rows-per-page-items="[10,15,20]"
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
    </v-layout>
      <!-- 여기까지가 push 관련 내용 -->


    <v-layout v-show="radioBtn == 'message'">
      <!-- 여기서부터는 1:1 메시지 관련 내용 -->
      <one-to-one-message></one-to-one-message>
    </v-layout>
  </v-container>
</template>

<script>
import oneToOneMessage from "@/components/admin/oneToOneMessage";
export default {
  components: {
    oneToOneMessage
  },
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
        { text: "메시지", align: "center", value: "title" },
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
      }
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
    }
  },
  mounted() {
    this.getDataFromApi("push").then(data => {
      this.pushes = data.items;
      this.totalPushes = data.total;
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

