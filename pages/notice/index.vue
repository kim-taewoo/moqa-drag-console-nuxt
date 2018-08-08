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
      <v-spacer></v-spacer>
      <v-flex class="xs12 sm6 text-xs-right">
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn large slot="activator" color="primary" dark class="mb-2"><v-icon>add</v-icon> 글쓰기</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">공지사항 글쓰기</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea v-model="editedItem.content" label="내용"></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">저장</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-flex>
    </v-layout>
        
    <v-divider></v-divider>

    <v-layout>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="notices"
          :search="search"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({name: 'notice-id', params: props.item})" >
              <td class="text-xs-center">{{ props.item.writerId }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ props.item.created_date }}</td>
              <!-- <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >
                  delete
                </v-icon>
              </td> -->
            </tr>
          </template>
          <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "사용자ID",
        align: "center",
        value: "writerId"
      },
      { text: "이름", align: "center", value: "name" },
      { text: "제목", align: "center", value: "title", sortable: false },
      { text: "등록일", align: "center", value: "created_date" }
      // { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    notices: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      content: ""
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$nextTick(() => {
      this.initialize();
    });
  },

  methods: {
    check(item) {
      console.log(item);
    },
    initialize() {
      this.notices = [
        {
          id: 1,
          writerId: "admin",
          name: "관리자",
          title: "[7/27] 올바른 MOQA 이용을 위한 안내 [필독!]",
          created_date: "2018-07-27 13:30:28"
        },
        {
          id: 2,
          writerId: "admin",
          name: "김태우",
          title: "[7/21] 금주의 베스트 질문상 [필독!]",
          created_date: "2018-07-21 13:30:28"
        },
        {
          id: 3,
          writerId: "admin",
          name: "이하영",
          title: "[6/19] 모카 아이오에스 오픈",
          created_date: "2018-06-19 13:35:28"
        },
        {
          id: 4,
          writerId: "admin",
          name: "안주은",
          title: "[6/19] 모두와 함께 만드는 모카",
          created_date: "2018-06-19 13:30:28"
        },
        {
          id: 5,
          writerId: "admin",
          name: "관리자",
          title: "[5/22] 테스트중입니다",
          created_date: "2018-05-22 13:30:28"
        },
        {
          id: 6,
          writerId: "admin",
          name: "관리자",
          title: "[3/33] 모카 안드로이드 서비스",
          created_date: "2018-03-33 13:30:28"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
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

<style scoped>
.notice-title {
  display: inline-block;
  border-bottom: 2px solid #1976d2;
}
</style>

