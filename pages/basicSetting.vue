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

              <v-stepper-step :complete="e1 > 2" step="2">설문 디자인</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">배포하기</v-stepper-step>
            

              <div class="stepper-header-footer justify-end">
                <v-btn v-show="e1 !=2" class="primary" @click="e1++">다음 <v-icon>arrow_forward</v-icon></v-btn>
                <v-btn v-show="e1 == 2" class="primary" @click.stop="lastStepDialog=true">배포<v-icon>arrow_forward</v-icon></v-btn>
              </div>

            </v-stepper-header>

                <nuxt-child />      
            <!--<v-stepper-items>
              <v-stepper-content :step="e1">
              </v-stepper-content>
            </v-stepper-items> -->

          </v-stepper>

          <v-dialog
            v-model="lastStepDialog"
            max-width="320"
          >
            <v-card>
              <v-card-title class="headline">이대로 배포하실건가요?</v-card-title>

              <v-card-text>
                배포 이후에는 '설문관리' 에서 중단할 수 있습니다.
              </v-card-text>

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
                  @click="finish"
                >
                  배포하기
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
                배포되었습니다.
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
      }
    }
  },
  data() {
    return {
      e1: 1,
      title: "",
      lastStepDialog: false,
      finishDialog: false
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


