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
                <v-text-field single-line readonly label="대상 리스트"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption">
                </quill-editor>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">저장</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">취소</v-btn>
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
      content: "",
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
      }
    };
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
</style>
