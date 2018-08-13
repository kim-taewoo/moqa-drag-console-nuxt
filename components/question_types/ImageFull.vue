<template>
      <v-card>
          <v-container>
              <v-layout wrap justify-center>
                  <v-flex xs10 class="text-xs-center">
                      <v-flex class="xs12">
                        <img
                        :src="imageUrl"
                        width="100%"
                        alt="">
                      </v-flex>
                      <v-btn @click="onPickFile" dark class="amber">
                          이미지 업로드 <v-icon right dark>cloud_upload</v-icon>
                      </v-btn>
                      <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">
                  </v-flex>
                  <v-flex xs10>
                      <v-text-field label="설명" v-model="qTitle"></v-text-field>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
</template>

<script>
export default {
  name: "StarRating",
  props: ["questionIndex"],
  data() {
    return {
      panel: [true],
      qTitle: null,
      active: null,
      imageUrl: null
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      console.log("1:", files);
      const file = files[0];
      let filename = file.name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("유효한 이미지 파일을 업로드 해주세요!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(file);
    }
  }
};
</script>

<style>
.v-expansion-panel__header {
  background: #00bcd4;
  color: white;
}
.header__icon {
  color: white;
}
.q-title {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
