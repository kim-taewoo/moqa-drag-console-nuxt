<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      fixed
      width="170"
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dense fixed app :clipped-left="clipped" class="elevation-0">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat nuxt @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-content>
        
        <nuxt />

    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { icon: "notifications", title: "공지사항", to: "/admin" },
        { icon: "list", title: "설문관리", to: "/admin/manageList" },
        { icon: "person", title: "회원관리", to: "/admin/users" },
        { icon: "group_add", title: "회원그룹", to: "/admin/addGroup" },
        { icon: "event", title: "이벤트", to: "/admin/event" },
        { icon: "message", title: "메시지/push", to: "/admin/message" },
        { icon: "desktop_windows", title: "포인트 관리", to: "/admin/point" },
        { icon: "payment", title: "결제 관리", to: "/admin/payment" },
        { icon: "domain", title: "기업회원", to: "/admin/usersBiz" }
      ],
      miniVariant: false,
      title: "MOQA 관리자"
    };
  },
  methods: {
    logout () {
      // 로그아웃 로직이 들어갈 장소
      this.$router.push('/login')
    }
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>

