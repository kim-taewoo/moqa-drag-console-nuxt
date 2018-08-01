<template>
    <!-- 추후에 저장된 로직은 select 형식의 인풋이 아닌 그냥 정리된 형식의 줄글로 표시되도록 변경. -->
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
        <v-icon @click="deleteLogic" style="position:absolute; top:5px; right: 5px;">delete</v-icon>
    </v-card>
</template>

<script>
export default {
    name: 'LogicCard',
    props: ['questionIndex', 'options'],
    methods: {
        deleteLogic (e) {
            this.$emit('deletelogic')
        }
    }
}
</script>

