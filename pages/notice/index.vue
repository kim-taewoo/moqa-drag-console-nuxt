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
      <!-- <v-flex class="xs12 sm6 text-xs-right">
          <v-dialog v-model="dialog" max-width="900px" persistent>
            <v-btn large slot="activator" color="primary" dark class="mb-2"><v-icon>add</v-icon> 글쓰기</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">공지사항 글쓰기</span>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <div class="subheading grey--text">내용</div>
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
      </v-flex> -->
    </v-layout>
        
    <v-divider></v-divider>

    <v-layout>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="items"
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
    editorOption: {
      // theme: "bubble",
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
    dialog: false,
    search: "",
    headers: [
      { text: "사용자ID", align: "center", value: "writerId",sortable: false },
      { text: "이름", align: "center", value: "name" ,sortable: false},
      { text: "제목", align: "center", value: "title", sortable: false },
      { text: "등록일", align: "center", value: "created_date" ,sortable: false}
      // { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    items: [],
    editedIndex: -1,
    pagination: {descending: true},
    loading: true,
    editedItem: {
      title: "",
      content: ""
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    pagination: {
      handler () {
        this.getDataFromApi().then(data => {
          this.items = data.rows;
          this.pagination.totalItems = data.total
          this.loading = false
          console.log(data)
        }).catch(err => console.log(err))
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi().then(data => {
      this.items = data.rows;
      this.pagination.totalItems = data.total
      this.loading = false
      console.log(this.pagination)
    })
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
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
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    check(item) {
      console.log(item);
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
.ql-editor {
  min-height: 300px;
}
</style>

