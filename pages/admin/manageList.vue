<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>질문관리</h3>
         <v-divider></v-divider>
        <SurveyList></SurveyList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SurveyList from "~/components/SurveyList";

export default {
  components: {
    SurveyList
  }
};
</script>
