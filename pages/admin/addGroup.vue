<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>회원그룹</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 sm6 lg4 class="text-xs-left">
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
        <v-btn top slot="activator" dark><v-icon>add</v-icon>그룹생성</v-btn>
          <!-- <v-dialog v-model="dialog" max-width="900px" persistent>
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
                      <quill-editor v-model="content"
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
                <v-btn color="blue darken-1" flat @click.native="close">저장</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
      </v-flex>

      <v-flex class="xs12 mt-3">
        <v-data-table
          :headers="headers"
          :items="groups"
          :search="search"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click="$router.push({name: 'notice-id', params: props.item})" >
              <td class="text-xs-center">{{ props.item.groupId }}</td>
              <td class="text-xs-center">{{ props.item.groupName }}</td>
              <td class="text-xs-center">{{ props.item.creator }}</td>
              <td class="text-xs-center">{{ props.item.numPeople }}</td>
              <td class="text-xs-center">{{ props.item.created_date }}</td>
              <td class="text-xs-center">{{ props.item.public }}</td>
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
  created() {
    this.$nextTick(() => {
      this.initialize();
    });
  },
  methods: {
    initialize() {
      this.groups = [
        {
          groupId: 1,
          groupName: "배현우님",
          creator: "배현우",
          numPeople: 1,
          created_date: "2018-07-27 13:30:28",
          public: "공개"
        },
        {
          groupId: 2,
          groupName: "REAL_CONTACT",
          creator: "관리자",
          numPeople: 3,
          created_date: "2018-08-27 13:30:28",
          public: "비공개"
        },
        {
          groupId: 3,
          groupName: "류대표님",
          creator: "관리자",
          numPeople: 1,
          created_date: "2018-07-20 13:30:28",
          public: "공개"
        },
        {
          groupId: 4,
          groupName: "인데이터랩",
          creator: "배현우",
          numPeople: 100,
          created_date: "2018-07-30 13:30:28",
          public: "공개"
        }
      ];
    }
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "그룹번호", align: "center", value: "groupId" },
        { text: "그룹명", align: "center", value: "groupName" },
        { text: "만든 사람", align: "center", value: "creator" },
        { text: "인원수", align: "center", value: "numPeople" },
        { text: "등록일", align: "center", value: "created_date" },
        { text: "공개여부", align: "center", value: "public" }
      ],
      groups: [{}]
    };
  }
};
</script>

