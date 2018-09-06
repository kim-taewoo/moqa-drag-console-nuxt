<template>
  <v-card>
    <v-container>
      <v-layout wrap>
        <v-flex>
          <p class="my-2 ml-3 subheading">대상 정보</p>
          <v-data-table
            :items="messageInfo"
            class="elevation-0"
            hide-actions
            hide-headers
          >

            <template slot="items" slot-scope="props">
              <td class="font-weight-bold">{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.value }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      messageInfo: [
        {
          name: "ID",
          value: this.item.seq
        },
        {
          name: "유저번호",
          value: this.item.memberSeq
        },
        {
          name: "제목",
          value:
            this.item.title
        },
        {
          name: "내용",
          value:
            this.item.context
        },
        {
          name: "발송일",
          value: this.item.sendDt
        },
        {
          name: "생성일",
          value: this.item.createDt
        },
      ]
    }
  }
}
</script>
