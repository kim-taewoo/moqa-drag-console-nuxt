<template>
  <v-expansion-panel v-model="panel" expand>
    <v-expansion-panel-content>
      <div slot="header">Q{{questionIndex+1}}. 객관식<small class="gray--text"> (이미지)</small> <span class="q-title">: {{qTitle}}</span> </div>
      <div slot="actions"><v-icon class="white--text">keyboard_arrow_down</v-icon> </div>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        slider-color="yellow"
        fixed-tabs
      >
        <v-tab>
          문항
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center>
                <v-flex xs10>
                  <v-text-field label="제목" v-model="qTitle"></v-text-field>
                </v-flex>
                <v-flex xs9 offset-xs1 v-for="(option,index) in options" :key="'A-' + index">
                  <v-text-field @click:append="deleteOption(option,index)" append-icon="delete" :label="(index+1).toString()" v-model="options[index]"></v-text-field>
                </v-flex>
                <v-flex v-if="options.length<6" xs9 offset-xs1>
                  <v-text-field label="선택지 (Tab 키로 추가)" v-model="anotherOption" @keydown.tab.prevent="addOption"></v-text-field>
                </v-flex>
                
                <v-flex v-for="(option,index) in options" :key="'B-'+index" class="xs6 text-xs-center mt-3">
                    <div 
                        class="backgroundQ"                        
                        :style="{ 'background-image': 'url(' + imageUrlQ[index] + ')' }">
                    </div>
                    <div>{{option}}</div>                    
                    <v-btn @click="onPickFileQ('fileInput'+index)" class="primary">
                        Upload <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <input type="file" style="display:none;" :ref="'fileInput'+index" accept="image/*" @change="onFilePickedQ($event, index)">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab>
          옵션
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container>
              <v-layout wrap justify-center align-center>
                <v-flex xs6>
                  <v-switch
                    label="중복 선택 가능"
                    v-model="multiselectSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!multiselectSwitch" v-model="multiselectMax" type="number"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-switch
                    label="멀티미디어형"
                    v-model="multimediaSwitch"
                  ></v-switch>
                </v-flex>
                <v-flex xs4>
                    <v-btn @click="onPickFile" :disabled="!multimediaSwitch" class="primary">
                        Upload <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">
                </v-flex>
                <v-flex class="xs12">
                    <img
                    v-for="(img,index) in imageUrl"
                    :key="index"
                    :src="img"
                    width="100%"
                    alt="">
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab>
          로직
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-container class="pa-1">
              <v-layout justify-center>
                <v-flex xs12>
                  <LogicCard @deletelogic="deleteLogic(logicCard)" v-for="(logicCard, index) in logicCards" :key="index" :questionIndex="questionIndex" :options="options" />
                  <v-card class="logicCard pa-3 ma-2 elevation-2">
                    <v-layout wrap align-baseline style="position:relative">
                        <v-flex xs12>
                            <p class="mb-2">만약 이 문항 {{questionIndex + 1}}의 답변이</p> 
                        </v-flex>
                        <v-flex xs9 align-center>
                            <v-select
                                :items="options"
                                label="답변 고르기"
                                outline
                                hide-details
                                height="24px"
                                offset-y no-data-text="선택지가 없습니다." browser-autocomplete="off"
                            ></v-select>
                        </v-flex>
                        <v-flex xs3 align-center class="text-xs-left align-end">
                            <div class="ml-3">이라면</div> 
                        </v-flex>
                        <v-flex xs9 class="mt-2">
                            <v-select offset-y no-data-text="다른 문항이 없습니다." browser-autocomplete="off" height="24px" outline hide-details label="목표 문항 고르기">                          
                            </v-select>
                        </v-flex>
                        <v-flex xs3>
                            <div class="ml-3">으로 간다.</div>
                        </v-flex>
                    </v-layout>
                  </v-card>

                  <v-layout style="position: relative">
                    <v-btn
                      absolute
                      dark
                      fab
                      bottom
                      right
                      small
                      color="orange"
                      style="top:-28px"
                      @click="addLogicCard"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-layout>
                  <v-layout wrap class="ma-3" align-baseline>
                    <v-flex class="xs12">
                      <p class="my-2">그 밖의 모든 경우</p>
                    </v-flex>
                    <v-flex class="xs9">
                      <v-select offset-y browser-autocomplete="off" height="24px" outline hide-details label="다음 문항" :items="logicOption">
                      </v-select>
                    </v-flex>
                    <v-flex class="xs3">
                      <div class="ml-3">으로 간다.</div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
      
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import LogicCard from '@/components/question_types/LogicCard'

  export default {
    name: 'MultipleImage',
    props: ['questionIndex'],
    components: {
      LogicCard
    },
    methods: {
      addOption () {
        if (this.anotherOption) {
          this.options.push(this.anotherOption)
          this.anotherOption = null
          this.feedback = null  
        } else {
          this.feedback = "빈칸 선택지는 사용할 수 없습니다."
        }
      },
      deleteOption (option,index) {
        this.imageUrlQ.splice(index,1)
        this.options = this.options.filter(opt => {
          return opt != option
        })
      },
      addLogicCard () {
        this.logicCardOrder++
        this.logicCards.push(this.logicCardOrder)
      },
      deleteLogic (logic) {
        this.logicCards.splice(this.logicCards.indexOf(logic),1)
      },
      onPickFileQ (ref) {
        console.log(this.$refs)
        this.$refs[ref][0].click()
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePickedQ (event, index) {
        const files = event.target.files
        console.log('1:', files)
        const file = files[0]
        let filename = file.name
        if (filename.lastIndexOf('.') <= 0) {
            return alert('유효한 이미지 파일을 업로드 해주세요!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
            this.imageUrlQ.splice(parseInt(index), 1, fileReader.result)
        })
        fileReader.readAsDataURL(file)
      },
      onFilePicked (event) {
          const files = event.target.files
          console.log('1:', files)
          const file = files[0]
          let filename = file.name
          if (filename.lastIndexOf('.') <= 0) {
              return alert('유효한 이미지 파일을 업로드 해주세요!')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
              this.imageUrl.push(fileReader.result)
          })
          fileReader.readAsDataURL(file)
      }
    },
    data () {
      return {
        rules: {
          option: [
            val => (val || '').length > 0 || this.feedback
          ]
        },
        feedback: null,
        anotherOption: null,
        logicCardOrder: 0,
        logicCards: [],
        options: [],
        logicOption: ['다음문항','자격박탈','설문 종료','3.lorem...'],
        multiselectSwitch: false,
        multiselectMax: 0,
        qTitle: null,
        panel: [true],
        active: null,
        imageUrlQ: ['none','none','none','none','none','none'],
        imageUrl: [],
        multimediaSwitch: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
.backgroundQ {
    width:97%;
    height:100px;
    padding-top:97%;
    background: #eee no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

</style>
