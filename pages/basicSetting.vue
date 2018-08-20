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
              
              <v-stepper-step :complete="e1 > 1" step="1" @click="$router.push('/basicSetting')" editable>기본 설정</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2" editable>설문 디자인</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">배포하기</v-stepper-step>
            

              <div class="stepper-header-footer justify-end">
                <v-btn v-show="e1 !=2" class="primary" @click="e1++">다음 <v-icon>arrow_forward</v-icon></v-btn>
                <v-btn v-show="e1 == 2" class="primary" @click.stop="lastStepDialog=true">배포<v-icon>arrow_forward</v-icon></v-btn>
              </div>

            </v-stepper-header>
              <nuxt-child />   

          </v-stepper>

          <v-dialog
            v-model="lastStepDialog"
            max-width="800"
          >
            <v-card>
              <v-card-title class="headline">내역 확인</v-card-title>
              <v-card-text class="pt-0 px-5">
                <v-data-table
                  :items="checkList"
                  class="elevation-1"
                  hide-actions
                  hide-headers
                >
                  <template slot="items" slot-scope="props">
                    <tr @click="selectOption($event, props.item)">
                      <td class="font-weight-bold">{{props.item.name}}</td>
                      <td class="text-xs-center">{{props.item.value}}</td>
                    </tr>
                  </template>
                </v-data-table>

                <p class="mt-3 mb-1">
                  위 설정 내역에 변경이 필요한 항목이 있다면 상단 메뉴바의 “기본설정”, “설문디자인”탭으로 돌아가서 수정 후 심사 요청을 다시 진행해주세요.
                </p>

                <div>
                  <v-checkbox class="mt-0" hide-details label="위의 설정 내역이 모두 정확한 것을 확인합니다."></v-checkbox> 
                </div>

                <p class="mt-3 mb-1">
                  심사는 영업일 기준으로 24시간 이내에 진행됩니다.
                </p>

                <div>
                  <v-checkbox class="mt-0" hide-details label="심사 기준에 대해서 잘 인지하였습니다."></v-checkbox> 
                </div>
                
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="lastStepDialog = false"
                >
                  취소
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="lastStepDialog = false"
                >
                  미리보기
                </v-btn>

                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="finish"
                >
                  심사 요청하기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>   

          <v-dialog
            v-model="finishDialog"
            max-width="320"
          >
            <v-card>
              <v-card-title class="headline">알림</v-card-title>

              <v-card-text>
                심사 요청되었습니다.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="$router.push('/')"
                >
                  대시보드로 돌아가기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>   
        </v-flex>
      </v-layout>
    </v-container>
    
</template>

<script>
export default {
  methods: {
    finish() {
      this.lastStepDialog = false;
      this.finishDialog = true;
    }
  },
  watch: {
    e1: function(val) {
      if (val == 2) {
        this.$router.push("/basicSetting/editor");
      } else if (val == 1) {
        this.$router.push("/basicSetting");
      }
    },
    $route: function(to, from) {
      if (to.name == "basicSetting") {
        this.e1 = 1;
      } else if (to.name == "basicSetting-editor") {
        this.e1 = 2;
      }
    }
  },
  data() {
    return {
      e1: 1,
      title: "",
      lastStepDialog: false,
      finishDialog: false,
      checkList: [
        {
          name: "제목",
          value: ""
        },
        {
          name: "설명",
          value: ""
        },
        {
          name: "응답 인원수",
          value: ""
        },
        {
          name: "연령",
          value: ""
        },
        {
          name: "성별",
          value: ""
        },
        {
          name: "거주지역",
          value: ""
        },
        {
          name: "직업",
          value: ""
        }
      ]
    };
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
.stepper-header-header-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-stepper__content {
  padding: 0;
}
</style>


