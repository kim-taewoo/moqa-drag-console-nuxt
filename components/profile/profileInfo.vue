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
    <v-flex xs12 class="text-xs-right">
      <v-btn class="primary">정보수정</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      profileInfo: [
        {
          name: "생성일",
          value: "2018-06-15"
        },
        {
          name: "기업회원 ID",
          value: "netpoint"
        },
        {
          name: "비밀번호",
          value: "",
          inputValue: "비밀번호 변경"
        },
        {
          name: "이름",
          value: "넷포인트"
        },
        {
          name: "기업코드",
          value: "1410"
        },
        {
          name: "담당자 이메일",
          value: "contact@in-datalab.com"
        },
        {
          name: "휴대전화번호",
          value: "010-7120-7156",
          inputValue: "전화번호 변경"
        }
      ]
    };
  }
};
</script>

