<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8>
  
      <v-layout wrap>

        <CheckBox :options="genders" :label="'성별'" @checkChanged="selectedGender = $event"></CheckBox>

        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="ages" :label="'연령대'" @checkChanged="selectedAge = $event"></CheckBox>

        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="areas" :label="'거주지역'" @checkChanged="selectedArea = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="marries" :label="'결혼여부'" @checkChanged="selectedMarry = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="families" :label="'가구구성'" @checkChanged="selectedFamily = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="jobs" :label="'직업'" @checkChanged="selectedJob = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="educations" :label="'최종학력'" @checkChanged="selectedEducation = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="cellphones" :label="'통신사'" @checkChanged="selectedCellphone = $event"></CheckBox>
        
        <v-flex class="xs12"><v-divider></v-divider></v-flex>

        <CheckBox :options="indIncomes" :label="'개인소득수준'" @checkChanged="selectedIndIncome = $event"></CheckBox>
        
        <v-flex xs12><v-divider></v-divider></v-flex>

        <CheckBox :options="famIncomes" :label="'가구소득수준'" @checkChanged="selectedFamIncome = $event"></CheckBox>
        
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import CheckBox from "@/components/basic_setting_target/CheckBox";

export default {
  name: "SelectTarget",
  components: {
    CheckBox
  },
  data() {
    return {
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
  }
};
</script>

