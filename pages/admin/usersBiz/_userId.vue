<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>기업회원정보</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-radio-group v-model="radioBtn" row hide-details>
          <v-radio label="기본 정보" value="status"></v-radio>
          <v-radio label="프로모션 관리" value="promotion"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex class="xs12" v-show="radioBtn == 'status'">
        <profileInfo :profile="content"/>
      </v-flex>
      <v-flex xs12 v-show="radioBtn == 'promotion'">
        <promotion-manage :userId="content.userId"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import profileInfo from "@/components/profile/profileInfo";
import promotionManage from "@/components/profile/promotionManage";

export default {
  components: {
    profileInfo,
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
