<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>회원목록</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-layout>
          <v-flex xs2 class="mr-3">
            <v-select
              :items="searchTypes"
              v-model="searchType"
              hide-details
              label="검색 기준"
            ></v-select>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="검색"
              @keydown.enter.prevent="searchByType"
              :hint="`${searchType} 로 검색`"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 class="text-xs-right">
            <!-- 다운로드 버튼 클릭시 회원목록을 엑셀로 다운 받는 기능 들어가야 함. (아래 script 태그 내용의 methods 중에 'downloadUserList' 함수 안에 해당 로직 들어가도록 되어있음) -->
            <v-btn @click.stop="downloadUserList">회원목록 다운로드</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="mt-2">
        <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="users"
            :pagination.sync="pagination"
            :total-items="totalUsers"
            :loading="loading"
            class="elevation-0"
          >
            <template slot="items" slot-scope="props">
              <tr @click.stop="$router.push({name: 'admin-users-memberSeq', params: props.item})">
                <td class="text-xs-center">{{ props.item.memberSeq }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.gender }}</td>
                <td class="text-xs-center">{{ props.item.mobileNum }}</td>
                <td class="text-xs-center">{{ props.item.point }}</td>
                <td class="text-xs-center">{{ props.item.joinDt }}</td>
                <td class="text-xs-center"></td>
                <td class="text-xs-center">{{ props.item.birth }}</td>
                <td class="text-xs-center">{{ props.item.deviceType }}</td>
                <td class="text-xs-center">{{ props.item.version }}</td>
                <td class="text-xs-center" v-text="props.item.useYn == 'Y' ? '사용중' : '탈퇴'"></td>
              </tr>
            </template>
          </v-data-table>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      searchTypes: [
        {
          text: "이름",
          value: "name"
        },
        {
          text: "휴대전화",
          value: "mobile"
        },
        {
          text: "회원번호",
          value: "userNum"
        },
        {
          text: "메일",
          value: "email"
        }
      ],
      searchType: "name",

      //테이블 관련 데이터들
      headers: [
        { text: "회원번호", align: "center", value: "memberSeq" },
        { text: "이메일", align: "center", value: "email" },
        { text: "이름", align: "center", value: "name" },
        { text: "성별", align: "center", value: "gender" },
        { text: "전화번호", align: "center", value: "mobileNum" },
        { text: "보유포인트", align: "center", value: "point" },
        { text: "가입일", align: "center", value: "joinDt" },
        { text: "마지막접속", align: "center", value: "" },
        { text: "생일", align: "center", value: "birth" },
        { text: "로그인기기", align: "center", value: "deviceType" },
        { text: "앱버전", align: "center", value: "version" },
        { text: "회원상태", align: "center", value: "useYn" }
      ],
      loading: true,
      pagination: {},
      users: [],
      totalUsers: 0
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.users = data.items;
          this.totalUsers = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.users = data.items;
      this.totalUsers = data.total;
    });
  },
  methods: {
    downloadUserList() {
      // 엑셀 다운로드 아래 로그 기록은 지워도 됨.
      console.log("리스트 다운로드");
    },

    searchByType() {
      //검색 유형에 따른 다른 함수 적용. 물론 하나의 함수에 인자만 다르게 넣어도 됨.
      // this.search 가 사용자가 검색입력창에 입력한 값이고 this.searchType 가 검색기준(이름,휴대전화,메일, 회원번호)이다.
      if (this.searchType == "name") {
        console.log(this.search + "를 이름으로 검색중");
      } else if (this.searchType == "mobile") {
        console.log("모바일로 검색중");
      } else if (this.searchType == "userNum") {
        console.log("회원번호로 검색중");
      } else {
        console.log("메일로 검색중");
      }
    },

    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;
        let dataResult = this.getUsers();
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
    getUsers() {
      return {
        total: 9650,
        rows: [
          {
            num: 1,
            memberSeq: 9691,
            memberId: "ka_905484132",
            password: null,
            email: "cbw0911304@naver.com",
            mobileNum: "01055387558",
            userState: "4",
            authNumber: "8060",
            authNumberSendDt: "2018-08-24 16:33:59.993",
            authNumberAuthDt: "2018-08-24 16:34:09.673",
            name: "최보월",
            gender: "F",
            birth: "1991-1-5",
            age: 27,
            rcmdMemberCode: null,
            myRcmdCode: "vrjw7WUJRv8Kpyx",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "대구광역시",
            marryYn: "미혼",
            famillyMember: "모,형제/자매/남매",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "대학교 졸업",
            mobileComp: "LG U+",
            privacyIncome: "월 100만원 이상~ 월 200만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-08-24 16:33:54.337",
            withdrawDt: null,
            widtdrawDate: null,
            point: 500,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9691_201808240733054_aVM2ktgEQb",
            keyGenDate: "2018-08-24 16:33:54.353",
            keyMaxDate: "2018-09-23 16:33:54.353",
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
            num: 2,
            memberSeq: 9690,
            memberId: "fb_276659893157109",
            password: null,
            email: "",
            mobileNum: "0",
            userState: "1",
            authNumber: "7187",
            authNumberSendDt: "2018-08-24 16:30:01.293",
            authNumberAuthDt: null,
            name: "최민성",
            gender: null,
            birth: null,
            age: 0,
            rcmdMemberCode: null,
            myRcmdCode: "KubkxI86Iuuyz30",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: null,
            marryYn: null,
            famillyMember: null,
            job: null,
            education: null,
            mobileComp: null,
            privacyIncome: null,
            famillyIncome: null,
            joinDt: "2018-08-24 16:29:31.89",
            withdrawDt: null,
            widtdrawDate: null,
            point: 0,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: null,
            joinType: "facebook",
            useYn: "Y",
            authKey: "9690_201808240729031_7ABwKISM3v",
            keyGenDate: "2018-08-24 16:29:31.89",
            keyMaxDate: "2018-09-23 16:29:31.89",
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
            memberSeq: 9689,
            memberId: "gg_110755121348857292346",
            password: null,
            email: "chyy1358@gmail.com",
            mobileNum: "01046127670",
            userState: "4",
            authNumber: "5105",
            authNumberSendDt: "2018-08-24 16:23:19.933",
            authNumberAuthDt: "2018-08-24 16:23:31.24",
            name: "조예영",
            gender: "F",
            birth: "2004-8-15",
            age: 14,
            rcmdMemberCode: null,
            myRcmdCode: "GmvZAUuYj7ovhnf",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "서울특별시",
            marryYn: "미혼",
            famillyMember: "부,모,형제/자매/남매",
            job: "중학생",
            education: "중학교 재학",
            mobileComp: "LG U+",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 100만원 미만",
            joinDt: "2018-08-24 16:23:08.503",
            withdrawDt: null,
            widtdrawDate: null,
            point: 500,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "google",
            useYn: "Y",
            authKey: "9689_201808240723008_dqXW4F7Vka",
            keyGenDate: "2018-08-24 16:23:08.51",
            keyMaxDate: "2018-09-23 16:23:08.51",
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
            memberSeq: 9688,
            memberId: "gg_108661278830542563856",
            password: null,
            email: "gingin8926@gmail.com",
            mobileNum: "01074408926",
            userState: "4",
            authNumber: "0637",
            authNumberSendDt: "2018-08-24 16:17:19.697",
            authNumberAuthDt: "2018-08-24 16:17:44.397",
            name: "김서정",
            gender: "F",
            birth: "1993-1-1",
            age: 25,
            rcmdMemberCode: null,
            myRcmdCode: "lgz1gzPMOFbFBKE",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "부산광역시",
            marryYn: "미혼",
            famillyMember: "연인",
            job: "IT/정보통신업",
            education: "대학교 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 300만원 이상~ 월 400만원 미만",
            famillyIncome: "월 500만원 이상~ 월 600만원 미만",
            joinDt: "2018-08-24 16:16:28.53",
            withdrawDt: null,
            widtdrawDate: "2018-08-24 16:21:41.99",
            point: 500,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "google",
            useYn: "N",
            authKey: "9688_201808240716028_u1iKuDDPdZ",
            keyGenDate: "2018-08-24 16:16:28.53",
            keyMaxDate: "2018-09-23 16:16:28.53",
            todayFreeCount: 0,
            todayFreeSavePoint: 0,
            todaySaveYn: null,
            accessKey: null,
            scretKey: null,
            bucketName: null,
            withdrawNum: "SeZn",
            deviceType: "android",
            version: "1.0.44",
            currentAnswerStastics: null,
            memberSns: null
          },
          {
            num: 5,
            memberSeq: 9687,
            memberId: "ka_905473381",
            password: null,
            email: "jch710515@gmail.com",
            mobileNum: "01027501816",
            userState: "3",
            authNumber: "6829",
            authNumberSendDt: "2018-08-24 16:14:57.787",
            authNumberAuthDt: "2018-08-24 16:15:10.643",
            name: "장창희",
            gender: "F",
            birth: "1971-5-15",
            age: 47,
            rcmdMemberCode: "케익",
            myRcmdCode: "kYtSMEGfw21q6nW",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: null,
            marryYn: null,
            famillyMember: null,
            job: null,
            education: null,
            mobileComp: null,
            privacyIncome: null,
            famillyIncome: null,
            joinDt: "2018-08-24 16:14:08.347",
            withdrawDt: null,
            widtdrawDate: null,
            point: 0,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9687_201808240714008_xSZIw0kpfE",
            keyGenDate: "2018-08-24 16:14:08.353",
            keyMaxDate: "2018-09-23 16:14:08.353",
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
            num: 6,
            memberSeq: 9686,
            memberId: "ka_905471285",
            password: null,
            email: "rudrms1987@naver.com",
            mobileNum: "01063921987",
            userState: "4",
            authNumber: "5728",
            authNumberSendDt: "2018-08-24 16:10:24.157",
            authNumberAuthDt: "2018-08-24 16:10:34.23",
            name: "송경근",
            gender: "M",
            birth: "2006-10-3",
            age: 11,
            rcmdMemberCode: null,
            myRcmdCode: "v54chUVHt3tij57",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "대전광역시",
            marryYn: "미혼",
            famillyMember: "부",
            job: "기타",
            education: "초등학교 재학",
            mobileComp: "SKT",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 100만원 미만",
            joinDt: "2018-08-24 16:10:16.427",
            withdrawDt: null,
            widtdrawDate: null,
            point: 600,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9686_201808240710016_ZGc0oy1w2B",
            keyGenDate: "2018-08-24 16:10:16.433",
            keyMaxDate: "2018-09-23 16:10:16.433",
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
            memberSeq: 9685,
            memberId: "ka_905466850",
            password: null,
            email: "ghddbwls12@naver.com",
            mobileNum: "01033103507",
            userState: "4",
            authNumber: "1009",
            authNumberSendDt: "2018-08-24 16:02:18.05",
            authNumberAuthDt: "2018-08-24 16:02:27.533",
            name: "홍유진",
            gender: "F",
            birth: "2006-2-27",
            age: 12,
            rcmdMemberCode: null,
            myRcmdCode: "o4D91YmvcLJV03h",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "강원도",
            marryYn: "미혼",
            famillyMember: "부,모,형제/자매/남매",
            job: "중학생",
            education: "초등학교 졸업",
            mobileComp: "KT",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 100만원 미만",
            joinDt: "2018-08-24 16:02:10.97",
            withdrawDt: null,
            widtdrawDate: null,
            point: 750,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9685_201808240702010_sMgV4ADi0M",
            keyGenDate: "2018-08-24 16:02:10.97",
            keyMaxDate: "2018-09-23 16:02:10.97",
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
            memberSeq: 9684,
            memberId: "ka_905460476",
            password: null,
            email: "iom1004@daum.net",
            mobileNum: "01034480624",
            userState: "4",
            authNumber: "8449",
            authNumberSendDt: "2018-08-24 15:51:23.2",
            authNumberAuthDt: "2018-08-24 15:51:38.287",
            name: "최정임",
            gender: "F",
            birth: "1960-8-13",
            age: 58,
            rcmdMemberCode: null,
            myRcmdCode: "AKsxOaz8ayif9Ao",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "울산광역시",
            marryYn: "기혼",
            famillyMember: "모,자녀,배우자",
            job: "주부",
            education: "전문대 졸업",
            mobileComp: "SKT",
            privacyIncome: "월 100만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-08-24 15:50:30.79",
            withdrawDt: null,
            widtdrawDate: null,
            point: 500,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9684_201808240650030_IOAw3xBSjq",
            keyGenDate: "2018-08-24 15:50:30.793",
            keyMaxDate: "2018-09-23 15:50:30.793",
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
            memberSeq: 9683,
            memberId: "ka_905460240",
            password: null,
            email: "hitetiger@hanmail.net",
            mobileNum: "01026178374",
            userState: "4",
            authNumber: "0999",
            authNumberSendDt: "2018-08-24 15:50:12.213",
            authNumberAuthDt: "2018-08-24 15:50:27.507",
            name: "김용민",
            gender: "M",
            birth: "1984-6-10",
            age: 34,
            rcmdMemberCode: null,
            myRcmdCode: "pn8NUoeYYlPct9K",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: "울산광역시",
            marryYn: "기혼",
            famillyMember: "배우자",
            job: "사무직(일반사무직, 일반 공무원 등)",
            education: "대학교 졸업",
            mobileComp: "LG U+",
            privacyIncome: "월 300만원 이상~ 월 400만원 미만",
            famillyIncome: "월 300만원 이상~ 월 400만원 미만",
            joinDt: "2018-08-24 15:50:06.16",
            withdrawDt: null,
            widtdrawDate: null,
            point: 650,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: "Y",
            joinType: "kakao",
            useYn: "Y",
            authKey: "9683_201808240650005_eAsFE32bHB",
            keyGenDate: "2018-08-24 15:50:06.167",
            keyMaxDate: "2018-09-23 15:50:06.167",
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
            num: 10,
            memberSeq: 9682,
            memberId: "gg_101670789434942460489",
            password: null,
            email: "jung4you71@gmail.com",
            mobileNum: null,
            userState: "1",
            authNumber: null,
            authNumberSendDt: null,
            authNumberAuthDt: null,
            name: "박박상훈",
            gender: null,
            birth: null,
            age: 0,
            rcmdMemberCode: null,
            myRcmdCode: "jmglRNbyk3A5S7i",
            usageAgreeDt: null,
            privacyAgreeDt: null,
            usageAgreeYn: null,
            privacyAgreeYn: null,
            location: null,
            marryYn: null,
            famillyMember: null,
            job: null,
            education: null,
            mobileComp: null,
            privacyIncome: null,
            famillyIncome: null,
            joinDt: "2018-08-24 15:47:48.413",
            withdrawDt: null,
            widtdrawDate: null,
            point: 0,
            adminYn: null,
            nationalCode: null,
            mobileAuthYn: null,
            joinType: "google",
            useYn: "Y",
            authKey: "9682_201808240647048_7zZGencIf2",
            keyGenDate: "2018-08-24 15:47:48.413",
            keyMaxDate: "2018-09-23 15:47:48.413",
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
          }
        ],
        search: null
      };
    }
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 5px;
}
.v-input__control {
  min-height: 25px;
}
</style>
