<template>
  <v-layout class="mt-3" wrap justify-center>
    <v-flex xs12>
      <h3></h3>
      <v-divider></v-divider>
      <v-data-table
        :items="profileInfo"
        class="elevation-0"
        hide-actions
        hide-headers
      >
        <template slot="items" slot-scope="props">
            <td class="font-weight-bold">{{props.item.name}}</td>
            <td v-if="props.item.name == '비밀번호' || props.item.name == '휴대전화번호'" style="padding-top: 8px; padding-bottom: 8px;">
                <v-text-field height="48px" hide-details single-line solo :label="props.item.inputValue" :value="props.item.value" ></v-text-field>
            </td>
            <td v-else class="text-xs-left">{{props.item.value}}</td>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["profile"],
  data() {
    return {
      profileInfo: [
        {
          name: "생성일",
          value: this.profile.createDt
        },
        {
          name: "기업회원 ID",
          value: this.profile.userId
        },
        {
          name: "비밀번호",
          value: "",
          inputValue: "비밀번호 변경"
        },
        {
          name: "이름",
          value: this.profile.name
        },
        {
          name: "기업코드",
          value: this.profile.code
        },
        {
          name: "담당자 이메일",
          value: this.profile.email
        },
        {
          name: "휴대전화번호",
          value: this.profile.mobile,
          inputValue: "전화번호 변경"
        }
      ]
    };
  }
};
</script>

