<template>
  <v-container justify-center>
    <v-layout justify-center>
      <v-flex xs10 class="text-xs-center">
        <!-- <div style="height: 50px; overflow: hidden;">
          <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
            <swiper-slide v-for="(notice,index) in noticeList" :key="index"><p class="notice-content">{{notice.title}} <span>{{notice.date}}</span></p></swiper-slide>
          </swiper>
        </div> -->
        <div class="text-xs-right"> <nuxt-link to="/notice" style="text-decoration:none;" > 공지사항 전체보기</nuxt-link> </div>
        <v-divider></v-divider>
        <div class="swiper-container">
          <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
            <swiper-slide v-for="(notice,index) in noticeList" :key="index" class="notice-slide">
              <span style="color: gray;" class="mr-3"><small>{{notice.date}}</small></span> <p style="margin: 0;">{{notice.title}} </p>
            </swiper-slide>
          </swiper>
        </div>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>

    <v-layout justify-center class="mt-3">
      <v-flex xs12>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import surveyList from "~/components/SurveyList";
import fitTarget from "~/components/FitTarget";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 4000
        }
      },
      noticeList: [
        {
          title: "정기점검이 8일 오후 3시경에 있을 예정입니다",
          date: "2018-01-03"
        },
        {
          title: "모카를 찾아주셔서 감사합니다~",
          date: "2018-06-03"
        },
        {
          title: "새로운 기능이 추가되었습니다!",
          date: "2018-01-08"
        }
      ],
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
.notice-content {
  display: inline-block;
  vertical-align: middle;
  vertical-align: -webkit-baseline-middle;
}
.notice-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-container {
  width: 80%;
}
</style>

