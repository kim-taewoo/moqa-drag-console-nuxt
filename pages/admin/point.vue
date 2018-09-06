<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>포인트 관리</h3>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="포인트 사용내역" value="use"></v-radio>
          <v-radio label="포인트 취득내역" value="save"></v-radio>
          <v-spacer></v-spacer>
          <v-btn @click="radioBtn == 'use' ? downloadUse() : downloadSave()">다운로드</v-btn>
        </v-radio-group>
      </v-flex>

      <v-flex class="xs12" v-show="radioBtn == 'use'">
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="points"
          :pagination.sync="pagination"
          :total-items="totalPoints"
          :loading="loading"
          :rows-per-page-items="[10,15,20]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.memberId }}</td>
            <td class="text-xs-center">{{ props.item.name }} </td>
            <td class="text-xs-center">{{ props.item.useDt }}</td>
            <td class="text-xs-center">{{ props.item.useReason }}</td>
            <td class="text-xs-center">{{ props.item.usePoint }}</td>
            <td class="text-xs-center" v-text="props.item.revokeYn == 'N'? '정상구매': '환불'"></td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex class="xs12" v-show="radioBtn == 'save'">
        <v-divider></v-divider>
        <v-data-table
          :headers="headersSave"
          :items="pointsSave"
          :pagination.sync="paginationSave"
          :total-items="totalPointsSave"
          :loading="loading"
          :rows-per-page-items="[10,15,20]"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.memberId }}</td>
            <td class="text-xs-center">{{ props.item.name }} </td>
            <td class="text-xs-center">{{ props.item.saveDt }}</td>
            <td class="text-xs-center">{{ props.item.saveReason }}</td>
            <td class="text-xs-center">{{ props.item.savePoint }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      radioBtn: "use",
      totalPoints: 0,
      totalPointsSave: 0,
      headers: [
        { text: "사용자ID", align: "center", value: "memberId", sortable: false },
        { text: "이름", align: "center", value: "name", sortable: false },
        { text: "사용일시", align: "center", value: "useDt", sortable: false },
        { text: "사용아이템", align: "center", value: "useReason", sortable: false },
        { text: "사용포인트", align: "center", value: "usePoint", sortable: false },
        { text: "처리상태", align: "center", value: "status", sortable: false }
      ],
      headersSave: [
        { text: "사용자ID", align: "center", value: "memberId", sortable: false },
        { text: "이름", align: "center", value: "name", sortable: false },
        { text: "적립일시", align: "center", value: "saveDt", sortable: false },
        { text: "적립사유", align: "center", value: "saveReason", sortable: false },
        { text: "적립포인트", align: "center", value: "savePoint", sortable: false }
      ],
      points: [],
      pointsSave: [],
      loading: true,
      pagination: {},
      paginationSave: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi("use").then(data => {
          console.log(data)
          this.points = data.rows;
          this.totalPoints = data.total
          this.loading = false
          console.log(this.pagination)
        }).catch(err => console.log(err));
      },
      deep: true
    },
    paginationSave: {
      handler() {
        this.getDataFromApi("save").then(data => {
          this.pointsSave = data.rows;
          this.totalPointsSave = data.total;
          this.loading =false
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi("use").then(data => {
      this.points = data.rows;
      this.totalPoints = data.total;
      this.loading = false
    });
    this.getDataFromApi("save").then(data => {
      this.pointsSave = data.rows;
      this.totalPointsSave = data.total;
      this.loading = false
    });
  },
  methods: {
    downloadUse() {
      // 포인트 사용내역 다운로드 버튼 클릭시 실행되는 함수. 사용내역 목록을 엑셀로 다운 받는 리퀘스트가 들어갈 예정
      // 예시
      // this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/downloadExcelPointUse.do')

      console.log("use");
    },
    downloadSave() {
      // 포인트 취득내역 다운로드 버튼 클릭시 실행되는 함수. 취득내역 목록을 엑셀로 다운 받는 리퀘스트가 들어갈 예정
      // 예시
      // this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/downloadExcelPointSave.do')

      console.log("save");
    },
    getDataFromApi(arg) {
      this.loading = true;
      if (arg == "use") {
        
        return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/pointUseList.do?' + qs.stringify({
            pageSize:10,
            offset:0,
            pageNum:this.pagination.page,
          }), {
          withCredentials: true,
          crossdomain : true,
        })
      } else {
        return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/pointSaveList.do?' + qs.stringify({
            pageSize:10,
            offset:0,
            pageNum:this.paginationSave.page,
          }), {
          withCredentials: true,
          crossdomain : true,
        })
      }
    },
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 0px;
}
</style>
