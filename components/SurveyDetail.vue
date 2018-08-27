<template>
  <v-card>
    <v-card-title
      class="headline pl-5"
      primary-title
    >
      설문 확인
    </v-card-title>
      <v-layout justify-center>
        <v-flex xs10>
          <v-card-text>
            <div v-if="!isAddGroup">
              <p class="my-2 ml-3 subheading">기본정보</p>
              <v-data-table
                :items="basicInfo"
                class="elevation-1"
                hide-actions
                hide-headers
              >

                <template slot="items" slot-scope="props">
                  <td class="font-weight-bold">{{ props.item.name }}</td>
                  <td class="text-xs-left" v-if="props.item.name=='진행상태' && props.item.value=='01'">진행중</td>
                  <td class="text-xs-left" v-else-if="props.item.name=='진행상태' && props.item.value=='02'">종료</td>
                  <td class="text-xs-left" v-else-if="props.item.name=='진행상태' && props.item.value=='03'">중단</td>
                  <td class="text-xs-left" v-else>{{ props.item.value }}</td>
                </template>
              </v-data-table>
            </div>

            <div>
              <p class="mb-2 mt-5 ml-3 subheading">설문 내용</p>
              <v-data-table
                :items="itemContent"
                class="elevation-1"
                hide-actions
                hide-headers
              >
                <template slot="items" slot-scope="props">
                  <tr v-if="props.item.name == '객관식형 (텍스트)'">
                    <td class="font-weight-bold">{{ props.item.name }}</td>
                    <td>
                      <v-data-table
                        :items="props.item.value"
                        class="elevation-1 my-4"
                        hide-actions
                        hide-headers
                      >
                        <template slot="items" slot-scope="props">
                          <tr @click="selectOption($event, props.item)">
                            <td>{{props.item.name}}</td>
                            <td class="text-xs-center"><span class="font-weight-bold">{{props.item.percent}}%</span>  ({{props.item.num_people}}명)</td>
                          </tr>
                        </template>
                      </v-data-table>
                    </td>
                  </tr>
                  <tr v-else>
                    <td class="font-weight-bold">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.value }}</td>
                  </tr>
                </template>
              </v-data-table>
            </div>

          </v-card-text>



        </v-flex>
      </v-layout>
    <v-divider></v-divider>
    <v-card-actions v-if="!isAddGroup">
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="surveyDetailDialog = false"
      >
        재개
      </v-btn>
      <v-btn
        color="pink"
        flat
        @click="surveyDetailDialog = false"
      >
        중단
      </v-btn>
      <v-btn
        flat
        @click="surveyDetailDialog = false"
        color="primary"
      >
        완료
      </v-btn>
      <v-btn
        flat
        depressed
        @click="$emit('closeDialog')"
      >
        닫기
      </v-btn>
    </v-card-actions>
    <v-card-actions v-else>
      <v-spacer></v-spacer>
      <v-btn flat @click="surveyDetailDialog = false">선택</v-btn>
      <v-btn flat @click="$emit('closeDialog')" color="pink">취소</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SurveyDetail",
  props: {
    item: {
      type: Object
    },
    isAddGroup: {
      type: Boolean
    }
  },
  methods: {
    selectOption(e, item) {
      if (!this.isAddGroup) {
        return;
      }
      e.target.parentElement.style.backgroundColor = "cyan";
      this.selectedOption = item;
    }
  },
  data() {
    return {
      selectedOption: null,
      basicInfo: [
        {
          name: "설문 번호",
          value: this.item.surveyId
        },
        {
          name: "설문 타입",
          value: this.item.surveyTypeCode
        },
        {
          name: "설문 기간",
          value: `${this.item.surveyStartDt} ~ ${this.item.surveyEndDt}`
        },
        {
          name: "진행상태",
          value: this.item.state
        },
        {
          name: "참여 인원",
          value:
            this.item.joinCount
        },
        {
          name: "등록자 아이디",
          value:
            this.item.userId2
        },
        {
          name: "이름",
          value: this.item.name
        },
        {
          name: "설문기관",
          value: ""
        },
        {
          name: "설문 대상 설정",
          value: "전체"
        },
        {
          name: "페이지 무작위화",
          value: this.item.questionRandomYn
        },
        {
          name: "페이지 번호",
          value: this.item.pageNum
        },
        {
          name: "설문 주제",
          value: this.item.surveyTitle
        }
      ],
      itemContent: [
        {
          name: "질문 타입",
          value: "멀티미디어형"
        },
        {
          name: "질문 제목",
          value: this.item.title
        },
        {
          name: "객관식형 (텍스트)",
          value: [
            {
              name: "고양이상",
              percent: "35",
              num_people: "158"
            },
            {
              name: "강아지상",
              percent: "45",
              num_people: "202"
            },
            {
              name: "여우상",
              percent: "10",
              num_people: "47"
            },
            {
              name: "골룸상",
              percent: "2",
              num_people: "10"
            },
            {
              name: "다람쥐상",
              percent: "7",
              num_people: "32"
            }
          ]
        }
      ]
    };
  }
};
</script>

