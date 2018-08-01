<template>
<v-card class="logicCard pa-3 ma-2 elevation-2">
    <v-layout wrap align-baseline style="position:relative">
        <v-flex xs12>
            <p class="mb-2">만약 이 문항 {{questionIndex + 1}}의 선택값이</p> 
        </v-flex>
        <v-flex xs6 align-center class="pr-2">
            <v-select
            :items="options"
            label="별점 고르기"
            outline
            hide-details
            height="24px"
            offset-y browser-autocomplete="off"
            ></v-select>
        </v-flex>
        <v-flex class="xs6 pl-2">
            <v-select
            :items="options2"
            label="이상,이하"
            outline
            hide-details
            height="24px"
            offset-y browser-autocomplete="off"
            >
            </v-select>
        </v-flex>
        <v-flex xs12 align-center class="text-xs-left">
            <div class="mt-2">이라면</div> 
        </v-flex>
        <v-flex xs9 class="mt-2">
            <v-select offset-y no-data-text="다른 문항이 없습니다." browser-autocomplete="off" height="24px" outline hide-details label="목표 문항 고르기">                          
            </v-select>
        </v-flex>
        <v-flex xs3>
            <div class="ml-3">으로 간다.</div>
        </v-flex>
    </v-layout>
    <v-icon @click="deleteLogic" style="position:absolute; top:5px; right: 5px;">delete</v-icon>

</v-card>
</template>

<script>
export default {
    name: 'LogicCardStar',
    props: ['questionIndex', 'options','options2'],
    methods: {
        deleteLogic (e) {
            this.$emit('deletelogic')
        }
    }
}
</script>