<template>
  <!-- <v-stepper-content step="1" style="height:100%;"> -->
    <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}" grid-list-lg>
      <v-layout justify-center wrap>
        <v-flex xs12 sm10 md8 lg6>
          <h3><v-icon>border_color</v-icon> 기본사항</h3>
          <v-card ref="form" class="mt-2">
            <v-card-text>        
                <v-container py-0 grid-list-md >
                  <v-layout row wrap>  
                      <v-flex xs12>
                        <v-text-field
                          ref="title"
                          v-model="title"
                          :rules="[
                            () => !!title || '필수 입력란입니다.',
                            () => !!title && title.length <=25 || '제목은 30자보다 길 수 없습니다.'
                          ]"
                          :error-messages="errorMessages"
                          label="프로젝트 이름"
                          required
                          counter="30"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 lg6>
                        <v-menu
                          ref="menu1"
                          :close-on-content-click="false" 
                          v-model="menu1"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            readonly
                            v-model="date"
                            label="시작하는 날"
                            persistent-hint
                            prepend-icon="event"
                            
                          ></v-text-field>
                          <v-date-picker 
                            v-model="date" 
                            no-title 
                            locale="ko-kr" 
                            @input="menu1 = false"
                            :min="new Date(new Date().setDate(new Date().getDate()-1)).toJSON()">
                          </v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 lg6>
                        <v-menu
                          ref="menu2"
                          :close-on-content-click="false" 
                          v-model="menu2"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          :disabled="!date"
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="date2"
                            label="끝나는 날"
                            readonly
                            :disabled="!date"
                            persistent-hint
                            prepend-icon="event"
                            
                          ></v-text-field>
                          <v-date-picker 
                            v-model="date2" 
                            no-title 
                            locale="ko-kr" 
                            @input="menu2 = false"
                            :min="date">
                            </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 lg6>
                        <v-menu
                          ref="menu_time1"
                          :close-on-content-click="false"
                          v-model="menu_time1"
                          :nudge-right="40"
                          :return-value.sync="time"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="time"
                            label="시작 시간"
                            prepend-icon="access_time"
                            readonly
                          ></v-text-field>
                          <v-time-picker
                            v-if="menu_time1"
                            v-model="time"
                            @change="$refs.menu_time1.save(time)"
                            format="24hr"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 lg6>
                        <v-menu
                          ref="menu_time2"
                          :close-on-content-click="false"
                          v-model="menu_time2"
                          :nudge-right="40"
                          :return-value.sync="time2"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          :disabled="!time"
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="time2"
                            label="종료 시간"
                            prepend-icon="access_time"
                            readonly
                            :disabled="!time"
                          ></v-text-field>
                          <v-time-picker
                            v-if="menu_time2"
                            format="24hr"
                            v-model="time2"
                            @change="$refs.menu_time2.save(time2)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <!-- 날짜 및 '리워드' 유효하지 않은 값을 입력했을 경우 경고 후 리셋 하도록 로직 설정이 필요함 -->

                      <!-- 리워드 설정인 관리자 페이지에서 접근했을 경우에만 렌더링됨 -->
                      <v-flex xs9 mt-3 v-if="isAdmin">
                        <v-slider
                          v-model="reward"
                          :max="500"
                          label="답변 리워드"
                          thumb-label="always"
                        >
                        </v-slider>
                      </v-flex>
                      <v-flex xs3 mt-3 v-if="isAdmin">
                        <v-text-field
                          v-model="reward"
                          class="mt-0"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs9 v-if="isAdmin">
                        <v-slider
                          v-model="stopReward"
                          :max= reward
                          label="중단 리워드"
                          thumb-label="always"
                        >
                        </v-slider>
                      </v-flex>
                      <v-flex xs3 v-if="isAdmin">
                        <v-text-field
                          v-model="stopReward"
                          class="mt-0"
                          type="number"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                          ref="state"
                          v-model="state"
                          label="설문 기관"
                        ></v-text-field>
                      </v-flex>
                      <!-- 만들어져있는 API 에 설명들어가는 곳이없음. -->
                      <!-- <v-flex xs12>
                        <v-textarea
                          name="input-7-1"
                          label="설문 설명"
                          auto-grow
                          v-model="description"
                          row-height="12"
                        ></v-textarea>
                      </v-flex> -->


                  </v-layout>
                </v-container>
            </v-card-text>
          </v-card>
        </v-flex>


        <v-flex xs12 sm10 md8 lg6 :class="{'mt-3': $vuetify.breakpoint.mdAndDown}">
          <h3><v-icon>how_to_reg</v-icon> 응답 대상자 설정</h3>
          <v-card class="mt-2">
            <v-card-text>
              <form>
                <v-container py-0 grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs9 mt-3>
                      <v-slider
                        v-model="maxParticipate"
                        :max="10000"
                        label="최대 참여 인원"
                        thumb-label="always"
                      >
                      </v-slider>
                    </v-flex>
                    <v-flex xs3 mt-3>
                      <v-text-field
                        v-model="maxParticipate"
                        class="mt-0"
                        type="number"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        ref="targetGroup"
                        :items="targetGroups"
                        item-text="memberGroupName"
                        item-value="memberCount"
                        return-object
                        single-line
                        v-model="targetGroup"
                        label="나의 맞춤타겟 가져오기"
                      ></v-select>
                    </v-flex>
                    <v-flex class="xs9" @click.stop="newTargetDialog = true">
                      <v-text-field v-model="calcTargetMember" readonly label="새로 대상 설정하기" >

                      </v-text-field>
                    </v-flex>
                    <v-flex class="xs3">
                      <v-dialog v-model="newTargetDialog" scrollable persistent transition="dialog-bottom-transition">
                        <v-btn slot="activator" color="primary" ref="newTargetBtn">설정</v-btn>
                        <v-card>
                          <v-card-title class="primary white--text headline">
                            <v-icon dark>people</v-icon>
                            <span class="pl-2">타겟설정</span>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text class="text-xs-center">
                            <v-layout wrap>
                              <v-flex xs12>
                                <select-target @targetSet="makeForm($event)"></select-target>
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                </v-container>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
  <!-- </v-stepper-content> -->
</template>

<script>
import SelectTarget from "@/components/basic_setting_target/SelectTarget";
import qs from 'qs'
export default {
  props: {
    isAdmin: {
      type: Boolean,
      required: false,
    }
  },
  components: {
    SelectTarget
  },
  name: "BasicSetting",
  data() {
    return {
      e1: 0,
      targetGroups: [],
      targetGroup: null,
      errorMessages: [],
      title: null,
      state: null,
      description: null,
      formHasErrors: false,
      reward: 0,
      stopReward: 0,
      date: null,
      date2: null,
      time: null,
      menu_time1: false,
      time2: null,
      menu_time2: false,
      menu1: false,
      menu2: false,
      maxParticipate: null,
      newTargetDialog: false,
      calcTargetMember: null,
      formAll: null
    };
  },
  mounted () {
    // 페이지가 열리면 맞춤타겟 목록도 가져와서 대기한다.
    // 역시나 쿠키가 필요한 곳이라 어떻게 설정하느냐가 중요할 거 같다. 
    this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxMemberGroupList.do?')
      .then(data => {
        this.targetGroups = data.rows
      })
  },
  methods: {
    makeForm (e) {
      this.formAll = {
        surveyTitle: this.title,
        surveyStartDt: this.date,
        surveyEndDt: this.date2,
        startTime: this.time,
        endTime: this.time2,
        savePoint: this.reward,
        stopSurveyPoint: this.stopReward,
        surveyCompany: this.state,
        maxUserCount: this.maxParticipate,
        ...e
      }
      console.log(this.formAll)
      this.newTargetDialog = false

      // 멤버 수 계산
      // this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxAdminUserList.do?' + qs.stringify({
      //   targetAge: e.targetAge,
      //   targetLocation: e.targetLocation,
      //   targetMarryYn: e.targetMarryYn,
      //   targetFamilly: e.targetFamilly,
      //   targetJob: e.targetJob,
      //   targetEducation: e.targetEducation,
      //   targetGender: e.targetGender,
      //   targetMobileComp: e.targetMobileComp,
      //   targetPrivacyIncome: e.targetPrivacyIncome,
      //   targetFamillyIncome: e.targetFamillyIncome
      // }), {
      //   withCredentials: true,
      //   crossdomain: true
      // }).then(data => {
      //   this.calcTargetMember = data.data.length
      //   this.$emit('targetSetting', {
      //     ...this.formAll,
      //     memberSeqs: data.data
      //   })
      // }).catch(err => console.log(err))
      this.$emit('targetSetting', {
          ...this.formAll,
          memberSeqs: 8000
        })

    }
  }
};
</script>