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
      <div style="position: relative;">
        <h3>프로모션 가입 회원</h3>
        <v-btn @click="downloadProm" absolute style="right: 0; top:-15px;">다운로드</v-btn>
      </div>
      <v-divider></v-divider>
      <v-data-table
          :headers="headers"
          :items="promUsers"
          :pagination.sync="pagination"
          :total-items="totalPromUsers"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <tr @click.stop="$router.push({name: 'admin-users-memberSeq', params: props.item})">
              <td class="text-xs-center" >{{ props.item.memberId }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.gender }}</td>
              <td class="text-xs-center">{{ props.item.mobileNum }}</td>
              <td class="text-xs-center">{{ props.item.point }}</td>
              <td class="text-xs-center">{{ props.item.joinDt }}</td>
            </tr>
          </template>
        </v-data-table>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["userId"],
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
          value: "memberId"
        },
        {
          text: "이메일",
          value: "email",
          align: "center",
          sortable: false
        },
        { text: "이름", value: "name", align: "center" },
        {
          text: "성별",
          value: "gender",
          align: "center"
        },
        {
          text: "휴대전화번호",
          value: "mobileNum",
          align: "center",
          sortable: false
        },
        { text: "보유포인트", value: "point", align: "center" },
        { text: "가입일", value: "joinDt", align: "center" }
      ],

      promUsers: [],
      totalPromUsers: 0,
      pagination: {},
      loading: true
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.promUsers = data.items;
          this.totalPromUsers = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.promUsers = data.items;
      this.totalPromUsers = data.total;
    });
  },
  methods: {
    downloadProm() {
      console.log("promotionDownload");
    },
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let dataResult = this.getPromUsers();
        let items = dataResult.rows;
        const total = dataResult.total;
        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }
        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getPromUsers() {
      return {
        total: 640,
        rows: [
          {
            num: 1,
            memberSeq: 8707,
            memberId: "supremeacme@naver.com",
            password:
              "0D7FF87449A5DFD71168B742B774C207E64B01D9000000000000000000000000000000000000000000000000000000000000",
            email: "supremeacme@naver.com",
            mobileNum: "01072070346",
            userState: "4",
            authNumber: "3259",
            authNumberSendDt: "2018-08-18 23:59:56.103",
            authNumberAuthDt: "2018-08-19 00:00:07.02",
            name: "전원",
            gender: "M",
            birth: "1986-7-21",
            age: 32,
            rcmdMemberCode: "1410",
            myRcmdCode: "mmel3gTwJivTJbr",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "인천광역시",
            marryYn: "미혼",
            famillyMember: "부,모",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "대학교 졸업",
            mobileComp: "KT",
            privacyIncome: "월 300만원 이상~ 월 400만원 미만",
            famillyIncome: "월 800만원 이상~ 월 900만원 미만",
            joinDt: "2018-08-18 23:59:46.323",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1060,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "8707_201808181459046_lVetDoIQfF",
            keyGenDate: "2018-08-18 23:59:46.323",
            keyMaxDate: "2018-09-17 23:59:46.323",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 2,
            memberSeq: 8554,
            memberId: "sad1386@naver.com",
            password:
              "87894AA4B4E30C4214714EDFA879D5BBCEDB8105000000000000000000000000000000000000000000000000000000000000",
            email: "sad1386@naver.com",
            mobileNum: "01035881612",
            userState: "4",
            authNumber: "1715",
            authNumberSendDt: "2018-08-18 12:17:27.18",
            authNumberAuthDt: "2018-08-18 12:17:53.147",
            name: "이태권",
            gender: "M",
            birth: "2001-01-25",
            age: 17,
            rcmdMemberCode: "1410",
            myRcmdCode: "UepVq3gr0ok1s4V",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "대구광역시",
            marryYn: "미혼",
            famillyMember: "부,모",
            job: "고등학생",
            education: "고등학교 재학",
            mobileComp: "SKT",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-08-18 12:16:38.87",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1073,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "8554_201808180316038_6rX61zydSI",
            keyGenDate: "2018-08-18 12:16:38.883",
            keyMaxDate: "2018-09-17 12:16:38.883",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: null,
            version: null,
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 3,
            memberSeq: 7685,
            memberId: "ka_899839080",
            password: null,
            email: "flora14@hanmail.net",
            mobileNum: "01096480824",
            userState: "4",
            authNumber: "7809",
            authNumberSendDt: "2018-08-14 13:08:33.15",
            authNumberAuthDt: "2018-08-14 13:08:44.807",
            name: "이미례",
            gender: "F",
            birth: "1987-8-24",
            age: 31,
            rcmdMemberCode: null,
            myRcmdCode: "8LeWuoAERPrBeyS",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "부산광역시",
            marryYn: "미혼",
            famillyMember: "1인 가구",
            job: "전문직(의사, 판검사, 예술가, 종교인, 운동선수 등)",
            education: "대학교 졸업",
            mobileComp: "LG U+",
            privacyIncome: "월 300만원 이상~ 월 400만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-08-14 13:08:23.213",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1249,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "7685_201808140408023_xRfApRtu6j",
            keyGenDate: "2018-08-14 13:08:23.23",
            keyMaxDate: "2018-09-13 13:08:23.23",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 4,
            memberSeq: 7656,
            memberId: "c732@hansfos.com",
            password:
              "714897908D357865435F31B6113A1CD42C95452C000000000000000000000000000000000000000000000000000000000000",
            email: "c732@hansfos.com",
            mobileNum: "01047487323",
            userState: "4",
            authNumber: "0181",
            authNumberSendDt: "2018-08-14 09:21:44.45",
            authNumberAuthDt: "2018-08-14 09:21:54.793",
            name: "채수영",
            gender: "M",
            birth: "1981-11-24",
            age: 36,
            rcmdMemberCode: "1410",
            myRcmdCode: "qMJ4iBMZMUNe6JY",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "기혼",
            famillyMember: "부,모,자녀,배우자",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "대학원(석사)",
            mobileComp: "SKT",
            privacyIncome: "월 400만원 이상~ 월 500만원 미만",
            famillyIncome: "월 700만원 이상~ 월 800만원 미만",
            joinDt: "2018-08-14 09:21:38.027",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1060,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "7656_201808140021037_U6zZhSq2Gj",
            keyGenDate: "2018-08-14 09:21:38.043",
            keyMaxDate: "2018-09-13 09:21:38.043",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: null,
            version: null,
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 5,
            memberSeq: 7622,
            memberId: "0508ysm@naver.com",
            password:
              "E31CDD881D1150264ED93780AF86F97753B84211000000000000000000000000000000000000000000000000000000000000",
            email: "0508ysm@naver.com",
            mobileNum: "01080047561",
            userState: "4",
            authNumber: "7838",
            authNumberSendDt: "2018-08-14 01:03:18.07",
            authNumberAuthDt: "2018-08-14 01:03:39.38",
            name: "윤석민",
            gender: "M",
            birth: "1987-5-8",
            age: 31,
            rcmdMemberCode: null,
            myRcmdCode: "G61ROvnZGI2fhwc",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "미혼",
            famillyMember: "형제/자매/남매",
            job: "무직",
            education: "대학교 졸업",
            mobileComp: "KT",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 200만원 이상~ 월 300만원 미만",
            joinDt: "2018-08-14 01:01:58.25",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1270,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "7622_201808131601057_AhsVZ3Fv9G",
            keyGenDate: "2018-08-14 01:01:58.25",
            keyMaxDate: "2018-09-13 01:01:58.25",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 6,
            memberSeq: 4827,
            memberId: "ka_890460111",
            password: null,
            email: "lplove7@hanmail.net",
            mobileNum: "01071040132",
            userState: "4",
            authNumber: "0551",
            authNumberSendDt: "2018-07-29 17:13:46.41",
            authNumberAuthDt: "2018-07-29 17:14:03.817",
            name: "박남숙",
            gender: "F",
            birth: "1969-11-23",
            age: 48,
            rcmdMemberCode: "1410",
            myRcmdCode: "EkK4rI6KEvUVtr0",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "강원도",
            marryYn: "기혼",
            famillyMember: "자녀,배우자",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "대학교 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 200만원 이상~ 월 300만원 미만",
            famillyIncome: "월 400만원 이상~ 월 500만원 미만",
            joinDt: "2018-07-29 17:13:37.02",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1599,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "4827_201807290813036_2xRjT3UdrS",
            keyGenDate: "2018-07-29 17:13:37.02",
            keyMaxDate: "2018-08-28 17:13:37.02",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 7,
            memberSeq: 4794,
            memberId: "changm0918@nate.com ",
            password:
              "253CC1685C9CE2E013DC0F8CA19A236FA857B60D000000000000000000000000000000000000000000000000000000000000",
            email: "changm0918@nate.com",
            mobileNum: "01071865368",
            userState: "4",
            authNumber: "7895",
            authNumberSendDt: "2018-07-29 00:56:06.39",
            authNumberAuthDt: "2018-07-29 00:56:17.263",
            name: "천강민",
            gender: "F",
            birth: "1988-9-18",
            age: 29,
            rcmdMemberCode: null,
            myRcmdCode: "gREonVx6wBpjCQ0",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "미혼",
            famillyMember: "친구",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "전문대 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 200만원 이상~ 월 300만원 미만",
            famillyIncome: "월 400만원 이상~ 월 500만원 미만",
            joinDt: "2018-07-29 00:56:00.78",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1332,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "4794_201807281556000_ZRKUh7W3DU",
            keyGenDate: "2018-07-29 00:56:00.78",
            keyMaxDate: "2018-08-28 00:56:00.78",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 8,
            memberSeq: 4735,
            memberId: "bdh80@nate.com",
            password:
              "1692CFF73CE9DCE7547796B20FBA7F7758EB79D5000000000000000000000000000000000000000000000000000000000000",
            email: "bdh80@nate.com",
            mobileNum: "01091084786",
            userState: "4",
            authNumber: "4025",
            authNumberSendDt: "2018-07-28 10:42:36.383",
            authNumberAuthDt: "2018-07-28 10:42:47.803",
            name: "변동훈",
            gender: "M",
            birth: "1980-7-19",
            age: 38,
            rcmdMemberCode: "1410",
            myRcmdCode: "tDm3E6b6bnzMS7g",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "기혼",
            famillyMember: "배우자",
            job: "서비스직(요식업, 숙박업, 미용실근로자 등)",
            education: "고등학교 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 200만원 이상~ 월 300만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-07-28 10:42:31.117",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1910,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "4735_201807280142030_0TVml5nK3p",
            keyGenDate: "2018-07-28 10:42:31.133",
            keyMaxDate: "2018-08-27 10:42:31.133",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 9,
            memberSeq: 3736,
            memberId: "acbc3479@naver.com",
            password:
              "6C7FAA7042A6C396C3DAEC5765867391C8106C3D000000000000000000000000000000000000000000000000000000000000",
            email: "acbc3479@naver.com",
            mobileNum: "01039557849",
            userState: "4",
            authNumber: "8220",
            authNumberSendDt: "2018-07-23 11:55:29.66",
            authNumberAuthDt: "2018-07-23 11:55:44.067",
            name: "정동원",
            gender: "M",
            birth: "1995-07-26",
            age: 22,
            rcmdMemberCode: "1410",
            myRcmdCode: "SUVSYn6ztLc1wcE",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "미혼",
            famillyMember: "부,모,형제/자매/남매",
            job: "대학생/대학원생",
            education: "대학교 재학",
            mobileComp: "KT",
            privacyIncome: "월 900만원 이상~ 월 1000만원 미만",
            famillyIncome: "월 200만원 이상~ 월 300만원 미만",
            joinDt: "2018-07-23 11:54:11.467",
            withdrawDt: null,
            widtdrawDate: null,
            point: 1170,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "3736_201807230254011_zwHImI4KRb",
            keyGenDate: "2018-07-23 11:54:11.467",
            keyMaxDate: "2018-08-22 11:54:11.467",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: null,
            version: null,
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 10,
            memberSeq: 3680,
            memberId: "kwan99@daum.net",
            password:
              "30293D68BC953566EC4D6B2F4FA98D914EAF42FA000000000000000000000000000000000000000000000000000000000000",
            email: "kwan99@daum.net",
            mobileNum: "01036138763",
            userState: "4",
            authNumber: "2396",
            authNumberSendDt: "2018-07-23 00:38:12.603",
            authNumberAuthDt: "2018-07-23 00:38:31.243",
            name: "신관석",
            gender: "M",
            birth: "1980-05-11",
            age: 38,
            rcmdMemberCode: "1410",
            myRcmdCode: "QF2zwwTXpIEsTTJ",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "기혼",
            famillyMember: "자녀,배우자",
            job: "IT/정보통신업",
            education: "대학교 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 300만원 이상~ 월 400만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-07-23 00:38:08.103",
            withdrawDt: null,
            widtdrawDate: null,
            point: 800,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "EMAIL",
            useYn: "Y",
            authKey: "3680_201807221538007_1bzesMDzTU",
            keyGenDate: "2018-07-23 00:38:08.107",
            keyMaxDate: "2018-08-22 00:38:08.107",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: null,
            deviceType: "iOS",
            version: "1.12",
            currentAnswerStastics: null,
            memberSns: null
          }
        ],
        search: null
      };
    }
  }
};
</script>
