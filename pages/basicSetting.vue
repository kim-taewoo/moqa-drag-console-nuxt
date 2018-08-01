<template>
    <v-container fill-height class="pa-0 ma-0" fluid>
      <v-layout>
        <v-flex xs12>
          <v-stepper v-model="e1" style="height: 100%;">
            <v-stepper-header>

              <!-- 작은 화면에서 사라지게 하고 밑으로 위치를 옮길 필요가 있음 -->
              <div class="stepper-header-header justify-center">
                <v-badge left color="green">
                  <span slot="badge">퀵</span>
                  <h3 class="stepper-header-header-title">{{title}}</h3>
                </v-badge>
              </div>

              <v-stepper-step :complete="e1 > 1" step="1" editable>기본 설정</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">설문 디자인</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">배포하기</v-stepper-step>
            

              <div class="stepper-header-footer justify-end">
                <v-btn v-show="e1 !=3" class="primary" @click="e1++">다음 <v-icon>arrow_forward</v-icon></v-btn>
              </div>

            </v-stepper-header>

            <v-stepper-items>
              <nuxt-child />
            </v-stepper-items>

          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
    
</template>

<script>
// import Editor from '@/components/Editor'
import CheckBox from "@/components/basic_setting_target/CheckBox";

export default {
  name: "BasicSetting",
  components: {
    // Editor,
    CheckBox
  },
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false
        },
        {
          text: "Link 1",
          disabled: false
        },
        {
          text: "Link 2",
          disabled: true
        }
      ],
      e1: 0,
      targetGroups: [
        "나의 맞춤타겟1",
        "나의 맞춤타겟2",
        "나의 맞춤타겟3",
        "나의 맞춤타겟4",
        "나의 맞춤타겟5"
      ],
      targetGroup: null,
      errorMessages: [],
      title: null,
      state: null,
      description: null,
      formHasErrors: false,
      reward: 5,
      stopReward: 0,
      date: null,
      date2: null,
      time: null,
      menu_time1: false,
      time2: null,
      menu_time2: false,
      dateFormatted: null,
      dateFormattedEnd: null,
      menu1: false,
      menu2: false,
      maxParticipate: 1000,
      newTargetDialog: false,
      addTargetDialog: false,
      addedTargetGroup: null,

      genders: ["남자", "여자"],
      selectedGender: ["남자", "여자"],
      ages: ["10대", "20대", "30대", "40대", "50대", "60대 이상"],
      selectedAge: ["10대", "20대", "30대", "40대", "50대", "60대 이상"],
      areas: [
        "강원도",
        "경기도",
        "경상남도",
        "경상북도",
        "광주광역시",
        "대구광역시",
        "대전광역시",
        "부산광역시",
        "서울특별시",
        "세종특별자치시",
        "울산광역시",
        "인천광역시",
        "전라남도",
        "전라북도",
        "제주특별자치도",
        "충청남도",
        "충청북도"
      ],
      selectedArea: [
        "강원도",
        "경기도",
        "경상남도",
        "경상북도",
        "광주광역시",
        "대구광역시",
        "대전광역시",
        "부산광역시",
        "서울특별시",
        "세종특별자치시",
        "울산광역시",
        "인천광역시",
        "전라남도",
        "전라북도",
        "제주특별자치도",
        "충청남도",
        "충청북도"
      ],
      marries: ["기타", "기혼", "미혼"],
      selectedMarry: ["기타", "기혼", "미혼"],
      families: [
        "1인 가구",
        "모",
        "배우자",
        "부",
        "연인",
        "자녀",
        "조부모",
        "친구",
        "형제/자매/남매"
      ],
      selectedFamily: [
        "1인 가구",
        "모",
        "배우자",
        "부",
        "연인",
        "자녀",
        "조부모",
        "친구",
        "형제/자매/남매"
      ],
      jobs: [
        "경찰/군인/소방관",
        "고등학생",
        "관리직(사장,간부,고위공무원 등)",
        "교직(교사,유치원교사,학원강사 등)",
        "금융업",
        "기능직(자동차정비,운전기사,안경사,택시기사 등)",
        "기타",
        "농업/임업/광업/수산업/축산업",
        "대학생/대학원생",
        "무직",
        "방송인/언론인/기자",
        "사무직(일반사무직,일반 공무원 등)",
        "생산/노무직(생산감독,경비원,공장근로자 등)",
        "서비스직(요식업,숙박업,미용실근로자 등)",
        "자영업 및 개인사업(도소매업,숙박업,미용업,프리랜서 등)",
        "전문직(의사,판검사,예술가,종교인,운동선수 등)",
        "주부",
        "중학생",
        "퇴직/연금생활자",
        "판매직(상점점원,보험설계사,노점상 등",
        "IT/정보통신업"
      ],
      selectedJob: [
        "경찰/군인/소방관",
        "고등학생",
        "관리직(사장,간부,고위공무원 등)",
        "교직(교사,유치원교사,학원강사 등)",
        "금융업",
        "기능직(자동차정비,운전기사,안경사,택시기사 등)",
        "기타",
        "농업/임업/광업/수산업/축산업",
        "대학생/대학원생",
        "무직",
        "방송인/언론인/기자",
        "사무직(일반사무직,일반 공무원 등)",
        "생산/노무직(생산감독,경비원,공장근로자 등)",
        "서비스직(요식업,숙박업,미용실근로자 등)",
        "자영업 및 개인사업(도소매업,숙박업,미용업,프리랜서 등)",
        "전문직(의사,판검사,예술가,종교인,운동선수 등)",
        "주부",
        "중학생",
        "퇴직/연금생활자",
        "판매직(상점점원,보험설계사,노점상 등",
        "IT/정보통신업"
      ],
      educations: [
        "고등학교 재학",
        "고등학교 졸업",
        "대학교 재학",
        "대학교 졸업",
        "대학원(박사)",
        "대학원(석사)",
        "전문대 재학",
        "전문대 졸업",
        "중학교 재학",
        "중학교 졸업",
        "초등학교 재학",
        "초등학교 졸업"
      ],
      selectedEducation: [
        "고등학교 재학",
        "고등학교 졸업",
        "대학교 재학",
        "대학교 졸업",
        "대학원(박사)",
        "대학원(석사)",
        "전문대 재학",
        "전문대 졸업",
        "중학교 재학",
        "중학교 졸업",
        "초등학교 재학",
        "초등학교 졸업"
      ],
      cellphones: ["기타", "KT", "LG U+", "SKT"],
      selectedCellphone: ["기타", "KT", "LG U+", "SKT"],
      indIncomes: [
        "월 200만원 이상 ~ 월 300만원 미만",
        "월 300만원 이상 ~ 월 400만원 미만",
        "월 400만원 이상 ~ 월 500만원 미만",
        "월 500만원 이상 ~ 월 600만원 미만",
        "월 600만원 이상 ~ 월 700만원 미만",
        "월 700만원 이상 ~ 월 800만원 미만",
        "월 800만원 이상 ~ 월 900만원 미만",
        "월 900만원 이상 ~ 월 1000만원 미만"
      ],
      selectedIndIncome: [
        "월 200만원 이상 ~ 월 300만원 미만",
        "월 300만원 이상 ~ 월 400만원 미만",
        "월 400만원 이상 ~ 월 500만원 미만",
        "월 500만원 이상 ~ 월 600만원 미만",
        "월 600만원 이상 ~ 월 700만원 미만",
        "월 700만원 이상 ~ 월 800만원 미만",
        "월 800만원 이상 ~ 월 900만원 미만",
        "월 900만원 이상 ~ 월 1000만원 미만"
      ],
      famIncomes: [
        "월 200만원 이상 ~ 월 300만원 미만",
        "월 300만원 이상 ~ 월 400만원 미만",
        "월 400만원 이상 ~ 월 500만원 미만",
        "월 500만원 이상 ~ 월 600만원 미만",
        "월 600만원 이상 ~ 월 700만원 미만",
        "월 700만원 이상 ~ 월 800만원 미만",
        "월 800만원 이상 ~ 월 900만원 미만",
        "월 900만원 이상 ~ 월 1000만원 미만"
      ],
      selectedFamIncome: [
        "월 200만원 이상 ~ 월 300만원 미만",
        "월 300만원 이상 ~ 월 400만원 미만",
        "월 400만원 이상 ~ 월 500만원 미만",
        "월 500만원 이상 ~ 월 600만원 미만",
        "월 600만원 이상 ~ 월 700만원 미만",
        "월 700만원 이상 ~ 월 800만원 미만",
        "월 800만원 이상 ~ 월 900만원 미만",
        "월 900만원 이상 ~ 월 1000만원 미만"
      ]
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
    // genderAll: {
    //   get () {
    //     if (this.genders.length == this.selectedGender.length) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    //   set (event) {
    //     if (event) {
    //       this.selectedGender = this.genders
    //     } else {
    //       this.selectedGender = []
    //     }
    //   }
    // }
  },
  watch: {
    name() {
      this.errorMessages = [];
    },
    date(val) {
      this.dateFormatted = this.date;
    },
    date2(val) {
      this.dateFormattedEnd = this.date2;
    }
  },
  methods: {
    addressCheck() {
      this.errorMessages =
        this.address && !this.name ? ["Hey! I'm required"] : [];

      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    },
    // formatDate (date) {
    //   if (!date) return null

    //   const [year, month, day] = date.split('-')
    //   return `${year}-${month}-${day}`
    // },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

<style>
.stepper-header-header {
  display: inline-flex;
  align-items: center;
  width: 16%;
  justify-content: center;
}
.stepper-header-footer {
  display: inline-flex;
  align-items: center;
  width: 16%;
  justify-content: flex-end;
}
.v-stepper__wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
}
.v-list-tile {
  justify-content: flex-start;
}
.v-input--checkbox {
  margin-top: 8px;
}
.stepper-header-header-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


