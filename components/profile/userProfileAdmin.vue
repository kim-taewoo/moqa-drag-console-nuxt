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
              <v-text-field type="password" height="48px" hide-details single-line solo :label="props.item.inputValue" :value="props.item.value" ></v-text-field>
            </td>
            <td style="padding-top: 8px; padding-bottom: 8px;" v-else-if="props.item.name =='포인트 수동적립'">
              <v-text-field append-icon="attach_money" class="d-inline-block mr-2" type="number" height="48px" hide-details single-line solo :value="props.item.value" ></v-text-field>
              <v-text-field label="포인트 적립사유" class="d-inline-block" height="48px" hide-details single-line solo :value="props.item.value" ></v-text-field>
              <v-btn>적립</v-btn>
            </td>
            <td  v-else-if="props.item.name =='이용제한'">
              <v-radio-group class="d-inline-block" v-model="punishRadioBtn" row hide-details>
                <v-radio label="3일" value="three"></v-radio>
                <v-radio label="5일" value="five"></v-radio>
                <v-radio label="7일" value="seven"></v-radio>
                <v-radio label="14일" value="fourteen"></v-radio>
              </v-radio-group>
              <!-- 징계하기 버튼을 누르면 아래 script 태그 내 methods 의 punishUser 가 실행됩니다. 필요한 로직을 그곳에 써주세요 -->
              <v-btn class="d-inline-block" @click.stop="punishUser">징계하기</v-btn>
            </td>
            <td v-else-if="props.item.name=='회원상태'" v-text="profile.useYn == 'Y' ? '사용중' : '탈퇴'"></td>
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
  methods: {
    punishUser() {
      console.log("징계");
    }
  },
  data() {
    return {
      punishRadioBtn: "three",
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
          value: this.profile.useYn
        },
        {
          name: "로그인 기기",
          value: this.profile.deviceType
        },
        {
          name: "앱 버전",
          value: this.profile.version
        },
        {
          name: "탈퇴일",
          value: this.profile.widtdrawDate
        },
        {
          name: "거주지역",
          value: this.profile.location
        },
        {
          name: "결혼여부",
          value: this.profile.marryYn
        },
        {
          name: "통신사",
          value: this.profile.mobileComp
        },
        {
          name: "최종학력",
          value: this.profile.education
        },
        {
          name: "직업분야",
          value: this.profile.job
        },
        {
          name: "가구구성",
          value: this.profile.famillyMember
        },
        {
          name: "개인소득",
          value: this.profile.privacyIncome
        },
        {
          name: "가족소득",
          value: this.profile.famillyIncome
        },
        {
          name: "포인트 수동적립",
          value: ""
        },
        {
          name: "이용제한",
          value: ""
        }
      ]
    };
  }
};
</script>

