<template>
  <div class="fill-height">
    <v-container fill-height>
      <!-- <v-layout row class="text-xs-center" justify-center align-center>
        <v-flex class="xs12"> -->
          <v-layout  justify-center align-center>
            <v-flex xs3 >
              <v-card height="500px" style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')"></v-card>
            </v-flex>
            <v-flex xs4 class="grey lighten-4">
              <v-container class="text-xs-center" >
                <v-card flat>
                  <v-card-title primary-title>
                    <h4>로그인</h4>
                  </v-card-title>
                  <v-form>
                  <v-text-field prepend-icon="person" name="Username" label="Username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
                  <v-card-actions>
                    <v-btn color="primary" large block>Login</v-btn>
                  </v-card-actions>
                  </v-form>
                </v-card>
              </v-container>
            </v-flex>            
          </v-layout>
        <!-- </v-flex>
      </v-layout> -->
    </v-container>
  </div>
</template>


<script>
export default {
  layout: "login"
};
</script>

<style>
</style>

