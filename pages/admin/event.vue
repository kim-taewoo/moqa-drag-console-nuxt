<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>이벤트</h3>
        <v-divider></v-divider>
      </v-flex>
      <!-- 테이블 시작 -->
      <v-flex xs12 class="mt-3">
        <div class="text-xs-right">
          <v-btn @click.stop="newDialog = true">새로 만들기</v-btn>
        </div>
        <v-divider></v-divider>


        <!-- 새로 만들기 눌렀을 시 뜨는 대화창 시작 newDialog 변수가 true 인 경우 열림. -->
        <v-dialog v-model="newDialog" max-width="900px" persistent>
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex class="xs12 md6 lg4">
                      <v-btn
                        :loading="loadingImage"
                        :disabled="loadingImage"
                        color="pink"
                        class="ml-0 my-0 white--text d-inline-block"
                        @click="onPickFile"
                      >
                        썸네일 이미지
                        <v-icon right dark>cloud_upload</v-icon>
                      </v-btn>
                      <span class="grey--text">{{filename}}</span> 
                      <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">

                    </v-flex>
                    <v-flex xs12>
                      <v-text-field hide-details v-model="editedItem.title" label="제목"></v-text-field>
                    </v-flex>
                    <!-- 이벤트 기간 설정 -->
                    <v-flex xs12 lg6>
                      <v-menu
                        ref="menu1"
                        :close-on-content-click="false" 
                        v-model="menu1"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          readonly
                          v-model="startDt"
                          label="시작하는 날"
                          prepend-icon="event"
                          hide-details
                        ></v-text-field>
                        <v-date-picker 
                          v-model="startDt" 
                          no-title 
                          locale="ko-kr" 
                          @input="menu1 = false"
                          :min="new Date(new Date().setDate(new Date().getDate()-1)).toJSON()">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 lg6>
                      <v-menu
                        ref="menu2"
                        :close-on-content-click="false" 
                        v-model="menu2"
                        :nudge-right="40"
                        lazy
                        :disabled="!startDt"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="endDt"
                          label="끝나는 날"
                          :disabled="!startDt"
                          readonly
                          prepend-icon="event"
                          hide-details
                        ></v-text-field>
                        <v-date-picker 
                          v-model="endDt" 
                          no-title 
                          locale="ko-kr" 
                          @input="menu2 = false"
                          :min="startDt">
                          </v-date-picker>
                      </v-menu>
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
                <v-btn color="blue darken-1" flat @click.native="save">등록</v-btn>
                <v-btn color="blue darken-1" flat @click.native="close">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- 이벤트 추가 대화창 끝 -->
          <!-- 표 row 클릭시 등장하는 이벤트 세부사항 대화창 시작 -->
          <v-dialog lazy v-model="eventDetailDialog" max-width="900px">
            <EventDetail v-if="eventDetailDialog" :selectedItem='selectedItem' @closeDialog="surveyDetailDialog=false"></EventDetail>
          </v-dialog> 
          <!-- 이벤트 디테일 세부사항 대화창 끝 -->
        <v-data-table
          :headers="headers"
          :items="events"
          :pagination.sync="pagination"
          :total-items="totalEvents"
          :loading="loading"
          :rows-per-page-items="[10,25,50,100]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click.stop="itemSelected($event,props.item)">
              <td class="text-xs-center">{{ props.item.eventId }}</td>
              <td class="text-xs-center">{{ props.item.eventTitle }} </td>
              <td class="text-xs-center">{{ props.item.eventPeriod }}</td>
              <td class="text-xs-center">{{ props.item.eventCreateDt }}</td>
              <td class="text-xs-center">{{ props.item.eventStatus }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import qs from 'qs'
import EventDetail from '@/components/EventDetail'
export default {
  components: {
    EventDetail
  },
  data() {
    return {
      selectedItem: null,
      eventDetailDialog: false,
      
      newDialog: false,
      menu1: false,
      menu2: false,
      imageUrl: [],
      image: [],
      loadingImage: false,
      filename: "",
      startDt: null,
      endDt: null,
      editedItem: {
        title: "",
        content: ""
      },
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
      headers: [
        { text: "ID", align: "center", value: "eventId" },
        { text: "제목", align: "center", value: "eventTitle" },
        { text: "기간", align: "center", value: "eventPeriod" },
        { text: "작성일", align: "center", value: "eventCreateDt" },
        { text: "상태", align: "center", value: "eventStatus" }
      ],
      totalEvents: 0,
      events: [],
      loading: true,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.events = data.rows;
          this.totalEvents = data.total
          this.loading = false
        }).catch(err => console.log(err))
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.events = data.rows;
      this.totalEvents = data.total
      this.loading = false
    }).catch(err => console.log(err))
  },
  methods: {
    // 이벤트 세부사항 대화창 클릭시 실행
    itemSelected(e, item) {
      // this.openDialogKey++;
      this.selectedItem = item;
      this.eventDetailDialog = true;
    },
    // 새로만들기에서 취소를 클릭시 발생 이벤트. 창을 닫고 내용을 초기화시킨다.
    close() {
      this.newDialog = false;
      this.editedItem.title = "";
      this.editedItem.content = "";
      this.startDt = null
      this.endDt = null
    },
    save() {
      // 공지사항 저장 클릭시 실행 함수 POST request 가 들어가야 한다. 
      this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxCreateEvent.do?' + qs.stringify({
        title: this.editedItem.title,
        contents: this.editedItem.content,
        userId: '',
        startDt: this.startDt,
        endDt: this.endDt
      }), {
        withCredentials: true,
        crossdomain: true
      }).then(data => {
        alert('이벤트 작성이 완료되었습니다.')
      }).catch(err => {
        alert('오류 발생', err)
      })
    },
    // 이미지 업로드를 위한 버튼 클릭 method
    onPickFile() {
      this.$refs.fileInput.click();
    },
    // 실질적으로 이미지 업로드 하는 method
    onFilePicked(event) {
      this.loadingImage = true;
      this.imageUrl = [];
      const files = event.target.files;
      const file = files[0];
      let filename = file.name;
      this.filename = filename;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("유효한 이미지 파일을 업로드 해주세요!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl.push(fileReader.result);
      });
      fileReader.readAsDataURL(file);
      this.loadingImage = false;
      this.image.push(file)
    },
    getDataFromApi() {
      this.loading = true;
      // 이벤트 목록 가져오기
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxGetEvent.do')
    },
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

