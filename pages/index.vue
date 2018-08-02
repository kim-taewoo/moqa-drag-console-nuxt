<template>
  <v-container justify-center>
    <!-- <v-layout justify-center>
      <v-flex class="text-xs-center notice">
        <span><v-icon>info</v-icon></span>
        <p class="notice-content body-1 ma-0">공지사항: 점검이 있을 예정입니다. <span>2018.09.01</span></p>
      </v-flex>
    </v-layout> -->

    <v-layout class="ma-3">
      <v-flex>
        <v-container :class="{'pa-0': $vuetify.breakpoint.smAndDown}">
          <v-tabs
            v-model="active"
            slider-color="primary"
          >
            <v-tab
              v-for="(tab, index) in dashboardTabs"
              :key="index"
              ripple
              class="title"
            >
              {{tab.name}}
            </v-tab>

            <v-tab-item
              v-for="(tab, index) in dashboardTabs"
              :key="index"
            >
              <component :is="tab.comp" class="tabComponent"></component>
            </v-tab-item>
          </v-tabs>

        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import surveyList from "~/components/SurveyList";
import fitTarget from "~/components/FitTarget";
export default {
  data() {
    return {
      dashboardTabs: [
        {
          name: "설문관리",
          comp: surveyList
        },
        {
          name: "맞춤타겟",
          comp: fitTarget
        }
      ],
      active: null
    };
  }
};
</script>

<style>
.notice {
  margin: 1.4rem;
}

.notice-content {
  display: inline-block;
  vertical-align: middle;
  vertical-align: -webkit-baseline-middle;
  border-bottom: 1px solid gray;
}
</style>

