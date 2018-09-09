<template>
  <v-app>
    <v-toolbar
      app
      flat
      class="primary"
      id="toolbar-main"
      dark
      dense
    >
      <img @click="$router.push('/')" style="cursor:pointer;" :src="require('@/assets/moqaLogos/toolbarIcon2.png')" alt="" height="60%" class="mr-2">
      <v-tooltip bottom>
        <v-toolbar-title slot="activator" class="toolbar-title">
          <router-link to="/" tag="span" nuxt style="cursor: pointer;">
            MOQA
          </router-link>
        </v-toolbar-title>
        <span>홈으로</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-tooltip bottom>
          <v-btn icon right slot="activator" nuxt to="/">
            <v-icon>dashboard</v-icon>
          </v-btn>
          <span>대시보드</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" nuxt to="/support">
            <v-icon>contact_support</v-icon>
          </v-btn>
          <span>모카에 문의하기</span>
        </v-tooltip>
        <v-menu :nudge-width="0">
          <v-btn flat slot="activator">
            <span class="dropdown-user">김태우</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          
          <v-list>
            <v-list-tile
              v-for="item in dropdown_user"
              :key="item.title"
              @click="$router.push(item.link)"
            >
              <nuxt-link :to="'/'+item.link" style="text-decoration:none;color:inherit;">
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </nuxt-link>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content style="background: white;">
      <transition name="fade" mode="out-in">
        <nuxt />
      </transition>
    </v-content>
    <v-footer app>
      <v-layout justify-end>
        <v-flex class="text-xs-right">
          <span>&copy; 2018 Moqa</span>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  // middleware: ['auth'],
  data() {
    return {
      title: "MOQA!",
      dropdown_user: [
        {
          title: "프로필",
          link: "profile"
        },
        {
          title: "결제 내역",
          link: "payment"
        },
        {
          title: "로그아웃",
          link: "login"
        }
      ]
    };
  },
  name: "App"
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>

