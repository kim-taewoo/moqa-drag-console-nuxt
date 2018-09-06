<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>1:1 메시지 작성하기</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-3">
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs9 md4>
                <v-text-field persistent-hint hint="회원이름/회원번호/제목으로 검색 가능" label="대상 검색/추가하기" single-line></v-text-field>
              </v-flex>
              <v-flex xs3 md2>
                <v-btn>검색</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-text-field persistent-hint hint="쉼표( , ) 로 구분하여 회원번호 입력" v-model="selected" single-line label="대상 리스트"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.title" label="제목"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <quill-editor v-model="editedItem.content"
                  ref="myQuillEditor"
                  :options="editorOption">
                </quill-editor>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="save">보내기</v-btn>
            <v-btn color="blue darken-1" flat @click.native="close">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editedItem: {
        title:'',
        content:''
      },
      selected: '',
      editorOption: {
        // theme: "bubble",
        placeholder: "여기에 작성",
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
        },
        theme: "snow"
      },
    };
  },
  methods: {
    close() {
      this.newDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.selectedMembers == false) {
        alert('적어도 한 명의 대상이 필요합니다.')
      } else if (this.selectedMembers.length == 1) {
        this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxInsertMemberNote.do?' + qs.stringify({
          title: this.editedItem.title,
          content: this.editedItem.content,
          memberSeq: this.selectedMembers[0]
        }), {
          withCredentials: true,
          crossdomain: true
        }).then(data => {
          alert('메시지 작성이 완료되었습니다.')
        }).catch(err => {
          alert('오류 발생', err)
        })
      } else if (this.selectedMembers.length > 1) {
        this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxInsertMemberNoteBatch.do?' + qs.stringify({
          title: this.editedItem.title,
          content: this.editedItem.content,
          memberSeqs: this.selectedMembers
        }), {
          withCredentials: true,
          crossdomain: true
        }).then(data => {
          alert('메시지 작성이 완료되었습니다.')
        }).catch(err => {
          alert('오류 발생', err)
        })
      }
    },
  },
  computed: {
    selectedMembers () {
      let x = this.selected.split(',')
      let y = []
      x.forEach((e) => {
        y.push(e)
      })
      return y
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
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
</style>
