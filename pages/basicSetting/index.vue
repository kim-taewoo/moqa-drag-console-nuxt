<template>
  <!-- <v-stepper-content step="1" style="height:100%;"> -->
    <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}" grid-list-lg>
      <v-layout justify-center wrap>
        <v-flex xs12 sm10 md8 lg6>
          <h3><v-icon>border_color</v-icon> 기본사항</h3>
          <v-card ref="form" class="mt-2">
            <v-card-text>                                                  
              <form action="">
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
                            v-model="dateFormatted"
                            label="시작하는 날"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date = parseDate(dateFormatted)"
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
                          :disabled="!dateFormatted"
                          full-width
                          max-width="290px"
                          min-width="290px"
                        >
                          <v-text-field
                            slot="activator"
                            v-model="dateFormattedEnd"
                            label="끝나는 날"
                            readonly
                            :disabled="!dateFormatted"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date2 = parseDate(dateFormattedEnd)"
                          ></v-text-field>
                          <v-date-picker 
                            v-model="date2" 
                            no-title 
                            locale="ko-kr" 
                            @input="menu2 = false"
                            :min="dateFormatted">
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
                      <v-flex xs9 mt-3>
                        <v-slider
                          v-model="reward"
                          :max="500"
                          label="답변 리워드"
                          thumb-label="always"
                        >
                        </v-slider>
                      </v-flex>
                      <v-flex xs3 mt-3>
                        <v-text-field
                          v-model="reward"
                          class="mt-0"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs9>
                        <v-slider
                          v-model="stopReward"
                          :max= reward
                          label="중단 리워드"
                          thumb-label="always"
                        >
                        </v-slider>
                      </v-flex>
                      <v-flex xs3>
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
                          :rules="[() => !!state || '필수 입력란입니다.']"
                          label="설문 기관"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          name="input-7-1"
                          label="설문 설명"
                          auto-grow
                          v-model="description"
                          row-height="12"
                        ></v-textarea>
                      </v-flex>


                  </v-layout>
                </v-container>
              </form>
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
                        :max="5000"
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
                      <v-autocomplete
                        ref="targetGroup"
                        :items="targetGroups"
                        v-model="targetGroup"
                        label="나의 맞춤타겟 가져오기"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex class="xs9" @click.stop="newTargetDialog = true">
                      <v-text-field readonly disabled label="새로 대상 설정하기" >

                      </v-text-field>
                    </v-flex>
                    <v-flex class="xs3">
                      <v-dialog v-model="newTargetDialog" scrollable persistent fullscreen hide-overlay transition="dialog-bottom-transition">
                        <v-btn slot="activator" color="primary" ref="newTargetBtn">설정</v-btn>
                        <v-card>
                          <v-card-title class="primary white--text headline">
                            <v-icon dark>people</v-icon>
                            <span class="pl-2">타겟설정</span> 
                            <v-spacer></v-spacer>
                            <v-dialog max-width="290" persistent v-model="addTargetDialog">
                              <v-btn slot="activator" flat dark>현재 설정을 맞춤타겟에 추가</v-btn>
                              <v-card>
                                <v-card-title class="subheading">맞춤타겟에 추가</v-card-title>
                                <v-card-text>
                                  <v-text-field v-model="addedTargetGroup" counter="25" label="타겟 이름"></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="green darken-1" flat @click.native="addTargetDialog = false">취소</v-btn>
                                  <v-btn color="green darken-1" flat @click.native="addTargetDialog = false">저장</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-btn dark class="subheading" flat @click.native="newTargetDialog = false">
                              적용하기
                            </v-btn>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text class="text-xs-center">
                            <v-layout>
                              <v-flex xs12>
                                <select-target></select-target>
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

export default {
  components: {
    SelectTarget
  },
  name: "BasicSetting",
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
      addedTargetGroup: null,
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
      addTargetDialog: false
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