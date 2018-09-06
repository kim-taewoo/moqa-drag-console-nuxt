<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>회원정보</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="기본 정보" value="status"></v-radio>
          <v-radio label="설문등록 이력" value="surveys"></v-radio>
          <v-radio label="포인트 적립 및 사용" value="points"></v-radio>
          <v-radio label="1:1 메시지" value="message"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>

    <!-- '기본정보' 라디오버튼 클릭시 페이지 -->
    <v-layout wrap v-show="radioBtn == 'status'">
      <v-flex class="xs12">
        <userProfileAdmin :profile="content"/>
      </v-flex>
    </v-layout>

    <!-- '설문등록 이력' 페이지 -->
    <v-layout wrap v-show="radioBtn == 'surveys'">
      <admin-survey-list isUserInfo></admin-survey-list>
    </v-layout>

    <!-- '포인트 적립 및 사용' 페이지 -->
    <v-layout wrap v-show="radioBtn == 'points'">
      <v-flex xs12 >
        <div><span class="font-weight-bold">{{content.name}}</span> 회원님의 현재 포인트는 <span class="pink--text">{{content.point}} P</span> 입니다. </div>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="points"
          :pagination.sync="pagination"
          :total-items="totalpoints"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center" v-text="props.item.type == 'save' ? '적립' : '사용'"></td>
            <td class="text-xs-center">{{ props.item.point }} </td>
            <td class="text-xs-center">{{ props.item.reason }}</td>
            <td class="text-xs-center">{{ props.item.date }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- '1:1 메세지 페이지' -->
    <v-layout wrap v-show="radioBtn == 'message'">
      <v-flex xs12 >
        <one-to-one-message></one-to-one-message>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import userProfileAdmin from "@/components/profile/userProfileAdmin";
import oneToOneMessage from "@/components/admin/oneToOneMessage";
import adminSurveyList from '@/components/admin/adminSurveyList'
import qs from 'qs'

export default {
  components: {
    userProfileAdmin,
    oneToOneMessage,
    adminSurveyList
  },
  data() {
    return {
      content: { ...this.$route.params },
      radioBtn: "status",
      headers: [
        { text: "유형", align: "center", value: "type" },
        { text: "포인트", align: "center", value: "point" },
        { text: "사유", align: "center", value: "reason" },
        { text: "적립일", align: "center", value: "date" }
      ],
      points: [],
      totalpoints: 0,
      loading: true,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.points = data.rows;
          this.totalpoints = data.total;
          this.loading = false
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.points = data.rows;
      this.totalpoints = data.total;
      this.loading = false
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxMemberPointList.do?' + qs.stringify({
          pageSize:10,
          limit: 10,
          offset:0,
          pageNum:this.pagination.page,
          memberSeq: this.content.memberSeq
        }), {
        withCredentials: true,
        crossdomain : true,
      })
    },
    
  }
};
</script>
