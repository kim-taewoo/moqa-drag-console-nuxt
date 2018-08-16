<template>
  <v-layout class="mt-4" wrap justify-center>
    <v-flex xs12>
      <h3>프로모션 요약</h3>
      <v-divider></v-divider>
      <v-data-table
        :items="promotionSummary"
        class="elevation-0"
        hide-actions
        hide-headers
      >
        <template slot="items" slot-scope="props">
            <td class="font-weight-bold">{{props.item.name}}</td>
            <td class="text-xs-left">{{props.item.value}}</td>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-flex>

    <v-flex xs12 class="mt-5">
      <h3>프로모션 가입 회원</h3>
      <v-divider></v-divider>
      <v-data-table
          :headers="headers"
          :items="userInfo"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" >{{ props.item.userId }}</td>
              <td class="text-xs-center">{{ props.item.userEmail }}</td>
              <td class="text-xs-center">{{ props.item.userName }}</td>
              <td class="text-xs-center">{{ props.item.userGender }}</td>
              <td class="text-xs-center">{{ props.item.userPhone }}</td>
              <td class="text-xs-center">{{ props.item.userPoint }}</td>
              <td class="text-xs-center">{{ props.item.userJoinDate }}</td>
            </tr>
          </template>
        </v-data-table>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      promotionSummary: [
        {
          name: "프로모션 포인트",
          value: "300P"
        },
        {
          name: "프로모션 이름",
          value: "제휴/프로모션 리워드"
        }
      ],
      headers: [
        {
          text: "사용자ID",
          align: "center",
          value: "userId"
        },
        {
          text: "이메일",
          value: "userEmail",
          align: "center",
          sortable: false
        },
        { text: "이름", value: "userName", align: "center" },
        {
          text: "성별",
          value: "userGender",
          align: "center"
        },
        {
          text: "휴대전화번호",
          value: "userPhone",
          align: "center",
          sortable: false
        },
        { text: "보유포인트", value: "userPoint", align: "center" },
        { text: "가입일", value: "userJoinDate", align: "center" }
      ],
      userInfo: [
        {
          userId: "ka_899839080",
          userEmail: "flora14@hanmail.net",
          userName: "이미례",
          userGender: "여자",
          userPhone: "01011114444",
          userPoint: "1123",
          userJoinDate: "2018-08-14 13:08:23.213"
        },
        {
          userId: "changm0918@nate.com",
          userEmail: "changm0918@nate.com",
          userName: "천강훈",
          userGender: "남자",
          userPhone: "01045267274",
          userPoint: "2223",
          userJoinDate: "2018-08-14 13:08:23.213"
        }
      ]
    };
  }
};
</script>
