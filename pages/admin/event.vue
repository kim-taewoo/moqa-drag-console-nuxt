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
                          v-model="startDate"
                          label="시작하는 날"
                          prepend-icon="event"
                          hide-details
                        ></v-text-field>
                        <v-date-picker 
                          v-model="startDate" 
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
                        :disabled="!startDate"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="endDate"
                          label="끝나는 날"
                          :disabled="!startDate"
                          readonly
                          prepend-icon="event"
                          hide-details
                        ></v-text-field>
                        <v-date-picker 
                          v-model="endDate" 
                          no-title 
                          locale="ko-kr" 
                          @input="menu2 = false"
                          :min="startDate">
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
      loadingImage: false,
      filename: "",
      startDate: null,
      endDate: null,
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
          this.events = data.items;
          this.totalEvents = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.events = data.items;
      this.totalEvents = data.total;
    });
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
      console.log("1:", files);
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
    },
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let dataResult = this.getEvents();
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
    },
    getEvents() {
      return {
        total: 8,
        rows: [
          {
            eventId: 1,
            eventTitle: "예시 1",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 2,
            eventTitle: "예시 2",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 3,
            eventTitle: "예시 3",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 4,
            eventTitle: "예시 4",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 5,
            eventTitle: "예시 5",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 6,
            eventTitle: "예시 6",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 7,
            eventTitle: "예시 7",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          },
          {
            eventId: 8,
            eventTitle: "예시 8",
            eventPeriod: "2018-08-18 22:52 ~ 2018-08-18 24:52",
            eventCreateDt: "2018-08-18 22:52:56.823",
            eventStatus: "종료"
          }
        ]
      };
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
</style>

