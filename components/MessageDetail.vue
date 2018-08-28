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
          value: this.item.messageNum
        },
        {
          name: "유저번호",
          value: this.item.memberSeq
        },
        {
          name: "이메일",
          value: this.item.email
        },
        {
          name: "이름",
          value: this.item.name
        },
        {
          name: "성별",
          value:
            this.item.gender
        },
        {
          name: "수신여부",
          value:
            this.item.check
        },
        {
          name: "내용",
          value:
            this.item.messageContent
        },
      ]
    }
  }
}
</script>
