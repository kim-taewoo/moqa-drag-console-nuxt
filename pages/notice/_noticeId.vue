<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 class="ma-3">
        <v-card class="py-4">
          <v-card-title class="mb-0" style="justify-content:center;">
              <h3 class="display-1 text-xs-center">{{content.title}}</h3>
          </v-card-title>

          <div class="mx-4 secondary--text text-xs-right"><strong>{{content.createDt}}</strong> - <span class="primary--text">{{content.name}}</span> </div>
          <v-divider></v-divider>
          <v-card-text>
            <p class="pa-4 subheading">
              공지사항의 세부내용이 들어갈 자리입니다. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, ipsam accusamus? Facilis ut sint nobis! Laborum, dolore sed aut tempora, ab distinctio at, delectus fuga quam ea est dolorem vero.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-right px-2">
        <v-btn nuxt color="primary" @click="$router.go(-1)">
          목록으로
        </v-btn>
        <v-btn dark color="pink" @click="deleteNotice">
          삭제
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      content: { ...this.$route.params }
    };
  },
  methods: {
    deleteNotice () {
      this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxDeleteNotice.do?' + qs.stringify({
          noticeId: this.content.noticeId
        }), {
          withCredentials: true,
          crossdomain: true
      }).then(data => {
        alert('삭제되었습니다.')
        this.$router.go(-1)
      }).catch(err => {
        alert('에러가 발생했습니다.', err)
      })
    }
  }
};
</script>

<style scoped>
</style>


