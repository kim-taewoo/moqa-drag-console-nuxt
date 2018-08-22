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
        </v-radio-group>
      </v-flex>
      <v-flex class="xs12" v-show="radioBtn == 'status'">
        <userProfileAdmin :profile="content"/>
      </v-flex>
      <v-flex xs12 v-show="radioBtn == 'surveys'">
        <promotion-manage :userId="content.userId"/>
      </v-flex>
      <v-flex xs12 v-show="radioBtn == 'points'">
        <promotion-manage :userId="content.userId"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userProfileAdmin from "@/components/profile/userProfileAdmin";
import promotionManage from "@/components/profile/promotionManage";

export default {
  components: {
    userProfileAdmin,
    promotionManage
  },
  data() {
    return {
      content: { ...this.$route.params },
      radioBtn: "status"
    };
  }
};
</script>
