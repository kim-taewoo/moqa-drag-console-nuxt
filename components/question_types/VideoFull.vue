<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{questionIndex+1}}. 동영상 <small class="gray--text"> (Full)</small><span class="q-title">: {{qTitle}}</span> </div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-card>
          <v-container>
              <v-layout wrap justify-center>
                  <v-flex xs10 class="text-xs-center">
                      <v-flex v-if="videoUrl" class="xs12">
                        <video id="video" :src="videoUrl" width="320" height="240" controls></video>
                      </v-flex>
                      <v-flex xs12 v-if="youtubeLink">
                        <iframe width="100%" height="300px" :src="'https://www.youtube.com/embed/'+embed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                      </v-flex>
                      <v-flex class="xs10" offset-xs1>
                        <v-text-field :disabled="!!videoUrl" v-model="youtubeLink" label="Youtube 링크" hint="http://youtube.be/XXX"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <span class="mr-3">또는,</span>
                        <v-btn @click="onPickFile" class="white--text" color="error" :disabled="!!youtubeLink">
                            동영상 업로드 <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input type="file" style="display:none;" ref="fileInput" accept="video/*" @change="onFilePicked">
                      </v-flex>
                  </v-flex>
                  <v-flex xs10>
                      <v-text-field label="설명" v-model="qTitle"></v-text-field>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
      
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>

  export default {
    name: 'StarRating',
    props: ['questionIndex'],
    data () {
      return {
        panel: [true],
        qTitle: null,
        active: null,
        videoUrl: null,
        youtubeLink: '',
        embed: ''
      }
    },
    watch: {
      youtubeLink (val) {
        let x = this.youtubeLink.split('/')
        
        this.embed = x.splice(3,1)
      }
    },
    methods: {
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
          const files = event.target.files
          console.log('1:', files)
          const file = files[0]
          let filename = file.name
          let filesize = file.size
          console.log(filesize)
          var video = document.getElementById('video');
          if (filename.lastIndexOf('.') <= 0) {
              return alert('유효한 동영상 파일을 업로드 해주세요!')
          }
          if (filesize > 15728640) {
            return alert('15mb 이상의 파일은 업로드할 수 없습니다.')
          }
          
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.videoUrl = fileReader.result
          })
          

          fileReader.readAsDataURL(file)
        //   var rawData = fileReader.readAsBinaryString(file)
        //   console.log(rawData)
        //   var binaryData = [];
        //   binaryData.push(rawData)
        //   var video = document.getElementById('video');
        //   var obj_url = window.URL.createObjectURL(file);
        //   video.src = obj_url;
        //   video.play()
        //   window.URL.revokeObjectURL(obj_url);
      }
    }
  }
</script>

<style>
.v-expansion-panel__header {
  background:#00BCD4;
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
