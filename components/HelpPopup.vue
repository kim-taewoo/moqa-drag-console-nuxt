<template>
  <div>
    <v-menu
      v-model="helpPop"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
    <v-btn color="secondary--text" class="ma-0" icon @mouseover.stop="helpPop = true">
        <v-icon >help_outline</v-icon>
    </v-btn>    
      <v-card>
        하이하이
      </v-card>
    </v-menu>
  </div>


  <!-- <v-menu
    v-model="helpPop"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <v-btn color="secondary--text" class="ma-0" icon @mouseover.stop="helpPop = true">
      <v-icon >help_outline</v-icon>
    </v-btn>
  <v-card>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
          <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            :class="fav ? 'red--text' : ''"
            icon
            @click="fav = !fav"
          >
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="message" color="purple"></v-switch>
        </v-list-tile-action>
        <v-list-tile-title>Enable messages</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-switch v-model="hints" color="purple"></v-switch>
        </v-list-tile-action>
        <v-list-tile-title>Enable hints</v-list-tile-title>
      </v-list-tile>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn flat @click="helpPop = false">Cancel</v-btn>
      <v-btn color="primary" flat @click="helpPop = false">Save</v-btn>
    </v-card-actions>
  </v-card>
  </v-menu> -->
</template>

<script>
export default {
  name: "HelpPopup",
  data() {
    return {
      helpPop: false,
      fav: true,
      hints: false,
      message: false
    };
  }
};
</script>
