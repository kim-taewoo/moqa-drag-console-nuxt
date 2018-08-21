<template>
  <v-container>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <nuxt-child />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "administer"
};
</script>