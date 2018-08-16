<template>
  <v-container>
    <v-layout wrap justify-center>
      <v-flex class="ma-3 title" xs12>
        <span class="pa-2 notice-title">상세통계</span> 
      </v-flex>
      <v-flex xs12 class="mt-3 px-2">
        <h3>설문 요약</h3>
        <v-divider></v-divider>
        <v-data-table
          :items="statisticsSummary"
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

      <v-flex class="mt-5 px-2" xs12>
        <h3>문항별 통계</h3>
        <v-divider class="mb-3"></v-divider>
        <h4>1번</h4>
        <v-divider></v-divider>
        <v-data-table
          :items="questionResults"
          class="elevation-1"
          hide-actions
          hide-headers
        >
          <template slot="items" slot-scope="props">
              <td class="font-weight-bold">{{props.item.name}}</td>

              <td v-if="props.item.name != '질문'" class="text-xs-left">
                <p>*단일선택/총 응답자 수: </p>
                {{props.item.value}}
              </td>
              <td v-else>{{props.item.value}}</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 class="mt-5 px-2">
        <h3>응답회원 기본 프로파일링</h3>
        <v-divider></v-divider>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">남녀 비율</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">연령대 통계</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">지역별 통계</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">결혼 여부</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">학력 통계</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">개인 소득 통계</div>
        </v-card>
        <v-card class="mt-3">
          <div class="pa-3 subheading text-xs-center">직업군 통계</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      statisticsSummary: [
        {
          name: "설문 기간",
          value: "2018-08-16 00:00:00.0 ~ 2018-09-16 00:00:00.0"
        },
        {
          name: "설문 주제",
          value: "블랙핑크에서 최애는?"
        }
      ],
      questionResults: [
        {
          name: "질문",
          value: "블랙핑크에서 최애는?"
        },
        {
          name: "객관식형",
          value: ""
        }
      ]
    };
  }
};
</script>



<style scoped>
.notice-title {
  display: inline-block;
  border-bottom: 2px solid #1976d2;
}
</style>
