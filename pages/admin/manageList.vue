<template>
  <v-container>
    <v-layout wrap v-if="!isAddGroup">
      <v-flex xs12>
        <h3>설문관리</h3>
         <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-layout wrap class="mt-3">
      <v-flex xs12>
        <v-divider v-if="isAddGroup"></v-divider>
        <v-tabs
          v-model="active"
          slider-color="primary"
          color="transparent"
        >
          <v-tab
            v-for="(tab, index) in adminSurveyTabs"
            :key="index"
            ripple
            class="title"
          >
            {{tab.name}}
          </v-tab>

          <v-tab-item
            v-for="(tab, index) in adminSurveyTabs"
            :key="index"
            class="mt-4"
          >
            <component :is="tab.comp" :surveyTypeCode="tab.surveyTypeCode" isUserInfo class="tabComponent" :isAddGroup="isAddGroup"></component>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import adminSurveyList from "@/components/admin/adminSurveyList";
import reportedSurveyList from '@/components/admin/reportedSurveyList'
import confirmSurveyList from '@/components/admin/confirmSurveyList'

export default {
  components: {
    adminSurveyList,
    reportedSurveyList,
    confirmSurveyList
  },
  props: {
    isAddGroup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    adminSurveyTabs () {
      return this.isAddGroup ? [
        {
          name: "일반설문",
          comp: adminSurveyList,
          surveyTypeCode: '01'
        },
        {
          name: "타겟설문",
          comp: adminSurveyList,
          surveyTypeCode: '02'
        },
        {
          name: "퀵폴",
          comp: adminSurveyList,
          surveyTypeCode: '03'
        },
        {
          name: "서베이",
          comp: adminSurveyList,
          surveyTypeCode: '04'
        },
      ]
      : [
          {
            name: "일반설문",
            comp: adminSurveyList,
            surveyTypeCode: '01'
          },
          {
            name: "타겟설문",
            comp: adminSurveyList,
            surveyTypeCode: '02'
          },
          {
            name: "퀵폴",
            comp: adminSurveyList,
            surveyTypeCode: '03'
          },
          {
            name: "서베이",
            comp: adminSurveyList,
            surveyTypeCode: '04'
          },
          {
            name: "신고설문",
            comp: reportedSurveyList,
          },
          {
            name: "심사요청",
            comp: confirmSurveyList
          }
      ]
    }
  },
  data () {
    return {
      active: null,
    }
  }
};
</script>
