<template>
  <v-container>
    <v-layout wrap>
      <v-flex class="xs12">
        <h3>메세지/push</h3>
        <v-divider></v-divider>
        <v-btn class="secondary" right nuxt to="/admin/message">push 목록</v-btn>
        <v-btn class="secondary" right nuxt to="/admin/message/oneToOne">1:1 메세지 목록</v-btn>
      </v-flex>
      <v-flex class="xs12">

        <nuxt-child></nuxt-child>


      </v-flex>
    </v-layout>
  </v-container>
</template>

