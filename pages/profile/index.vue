<template>
  <v-container>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <v-tabs
          v-model="active"
          slider-color="primary"
        >
          <v-tab
            v-for="(tab, index) in profileTabs"
            :key="index"
            ripple
            class="title"
          >
            {{tab.name}}
          </v-tab>

          <v-tab-item
            v-for="(tab, index) in profileTabs"
            :key="index"
          >
            <component :is="tab.comp" class="tabComponent"></component>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import profileInfo from "@/components/profile/profileInfo";
import promotionManage from "@/components/profile/promotionManage";

export default {
  data() {
    return {
      profileTabs: [
        {
          name: "회원 정보",
          comp: profileInfo
        },
        {
          name: "프로모션 관리",
          comp: promotionManage
        }
      ],
      active: null
    };
  }
};
</script>

