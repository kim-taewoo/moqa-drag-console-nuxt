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
          name: "가입일",
          value: this.profile.joinDt
        },
        {
          name: "아이디",
          value: this.profile.memberId
        },
        {
          name: "회원타입",
          value: this.profile.joinType
        },
        {
          name: "모카포인트",
          value: this.profile.point
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
          name: "휴대폰 번호",
          value: this.profile.mobileNum
        },
        {
          name: "성별",
          value: this.profile.gender
        },
        {
          name: "생년월일",
          value: this.profile.birth
        },
        {
          name: "회원상태",
          value: ""
        },
        {
          name: "탈퇴일",
          value: ""
        },
        {
          name: "포인트 수동적립",
          value: ""
        }
      ]
    };
  }
};
</script>

