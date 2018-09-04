<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
         <h3>공지사항</h3>
         <v-divider></v-divider>
      </v-flex>
      <v-flex class="xs12">
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="앱 공지사항" value="app"></v-radio>
          <v-radio label="웹 공지사항" value="web"></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs12>
        <v-layout>
          <v-flex xs4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="검색"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 class="text-xs-right">
            <v-btn @click.stop="newDialog=true">작성하기</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- 공지사항 새로 만들기 대화창 -->
      <v-dialog lazy v-model="newDialog" max-width="900px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline" v-text="radioBtn == 'app'? '앱 공지사항 글쓰기' : '웹 공지사항 글쓰기'"></span>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-container>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <div class="subheading grey--text text--lighten-1">내용</div>
                  <quill-editor v-model="editedItem.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    style="height: 300px;">
                  </quill-editor>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="save">저장</v-btn>
            <v-btn color="blue darken-1" flat @click.native="close">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 공지사항 새로 만들기 대화창 끝 -->
    </v-layout>
        
    <!-- 앱 공지사항 테이블 시작 -->
    <v-layout v-show="radioBtn == 'app'">
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="notices"
          :pagination.sync="pagination"
          :search="search"
          :total-items="totalNotices"
          :loading="loading"
          class="elevation-0"
          :rows-per-page-items="[10,15,20]"
        >
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({name: 'notice-noticeId', params: props.item})" >
              <td class="text-xs-center">{{ props.item.userId }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ props.item.createDt }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- 앱 공지사항 테이블 끝 -->
    <!-- 웹 공지사항 테이블 -->
    <v-layout v-show="radioBtn == 'web'">
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="noticesWeb"
          :pagination.sync="paginationWeb"
          :search="searchWeb"
          :total-items="totalNoticesWeb"
          :loading="loading"
          :rows-per-page-items="[10,15,20]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({name: 'notice-noticeId', params: props.item})" >
              <td class="text-xs-center">{{ props.item.userId }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ props.item.createDt }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- 웹 공지사항 테이블 끝 -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    radioBtn: "app",
    editorOption: {
      placeholder: "",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"]
        ]
      }
    },
    newDialog: false,
    newRadioBtn: "app",
    editedIndex: -1,
    editedItem: {
      title: "",
      content: ""
    },
    search: "",
    headers: [
      { text: "사용자ID", align: "center", value: "userId" },
      { text: "이름", align: "center", value: "name" },
      { text: "제목", align: "center", value: "title", sortable: false },
      { text: "등록일", align: "center", value: "createDt" }
    ],
    notices: [],
    totalNotices: 0,
    pagination: {},
    loading: true,
    noticesWeb: [],
    totalNoticesWeb: 0,
    paginationWeb: {},
    searchWeb: ""
  }),

  watch: {
    pagination: {
      handler() {
        this.getDataFromApi("app").then(data => {
          this.notices = data.items;
          this.totalNotices = data.total;
        });
      },
      deep: true
    },
    paginationWeb: {
      handler() {
        this.getDataFromApi("web").then(data => {
          this.noticesWeb = data.items;
          this.totalNoticesWeb = data.total;
        });
      },
      deep: true
    }
    // dialog(val) {
    //   val || this.close();
    // }
  },
  mounted() {
    this.getDataFromApi("app").then(data => {
      this.notices = data.items;
      this.totalNotices = data.total;
    });
    this.getDataFromApi("web").then(data => {
      this.noticesWeb = data.items;
      this.totalNoticesWeb = data.total;
    });
  },

  // created() {
  //   this.$nextTick(() => {
  //     this.initialize();
  //   });
  // },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },

  methods: {
    getDataFromApi(arg) {
      this.loading = true;
      if (arg == "app") {
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination;
          let dataResult = this.getNotices("app");
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
          const { sortBy, descending, page, rowsPerPage } = this.paginationWeb;
          let dataResult = this.getNotices("web");
          let items = dataResult.rows;
          const total = dataResult.total;

          if (this.paginationWeb.sortBy) {
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
    getNotices(arg) {
      if (arg == "web") {
        return {
          total: 7,
          rows: [
            {
              num: 1,
              noticeId: 12,
              title: "웹용입니다.[7/27] 올바른 MOQA 이용을 위한 안내 [필독!]",
              contents: null,
              createDt: "2018-07-27 13:30:28",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 2,
              noticeId: 10,
              title:
                "웹용입니다.[7/23] 금주의 BEST 질문상 결과를 발표합니다 :)",
              contents: null,
              createDt: "2018-07-23 14:22:53",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 3,
              noticeId: 9,
              title: "웹용입니다.[7/19] 모카 iOS 서비스 오픈",
              contents: null,
              createDt: "2018-07-19 11:39:00",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 4,
              noticeId: 7,
              title: "웹용입니다.[7/17] 모카 제목학원 당선작 발표",
              contents: null,
              createDt: "2018-07-17 18:28:32",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 5,
              noticeId: 6,
              title:
                "웹용입니다.[7/16] 여러분들과 함께 만드는 모카 결과를 발표합니다 :)",
              contents: null,
              createDt: "2018-07-16 23:03:22",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 6,
              noticeId: 5,
              title: "웹용입니다.[6/19] MOQA 안드로이드 서비스 오픈!",
              contents: null,
              createDt: "2018-06-19 10:00:53",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 7,
              noticeId: 4,
              title:
                "웹용입니다.[2018 5월 30일] 모두의 Q&A 모카 오픈베타가 시작되었습니다!",
              contents: null,
              createDt: "2018-05-30 18:39:43",
              userId: "admin",
              name: "관리자"
            }
          ],
          search: null
        };
      } else {
        return {
          total: 7,
          rows: [
            {
              num: 1,
              noticeId: 12,
              title: "[7/27] 올바른 MOQA 이용을 위한 안내 [필독!]",
              contents: null,
              createDt: "2018-07-27 13:30:28",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 2,
              noticeId: 10,
              title: "[7/23] 금주의 BEST 질문상 결과를 발표합니다 :)",
              contents: null,
              createDt: "2018-07-23 14:22:53",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 3,
              noticeId: 9,
              title: "[7/19] 모카 iOS 서비스 오픈",
              contents: null,
              createDt: "2018-07-19 11:39:00",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 4,
              noticeId: 7,
              title: "[7/17] 모카 제목학원 당선작 발표",
              contents: null,
              createDt: "2018-07-17 18:28:32",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 5,
              noticeId: 6,
              title: "[7/16] 여러분들과 함께 만드는 모카 결과를 발표합니다 :)",
              contents: null,
              createDt: "2018-07-16 23:03:22",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 6,
              noticeId: 5,
              title: "[6/19] MOQA 안드로이드 서비스 오픈!",
              contents: null,
              createDt: "2018-06-19 10:00:53",
              userId: "admin",
              name: "관리자"
            },
            {
              num: 7,
              noticeId: 4,
              title:
                "[2018 5월 30일] 모두의 Q&A 모카 오픈베타가 시작되었습니다!",
              contents: null,
              createDt: "2018-05-30 18:39:43",
              userId: "admin",
              name: "관리자"
            }
          ],
          search: null
        };
      }
    },

    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    // deleteItem(item) {
    //   const index = this.desserts.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.desserts.splice(index, 1);
    // },

    // 아래 close 와 save 함수는 수정 예정
    close() {
      this.newDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
.ql-toolbar {
  background-color: white;
}
.ql-container {
  background-color: #fff;
  color: black;
  min-height: 300px;
}
.v-input {
  margin-top: 5px;
}
</style>

