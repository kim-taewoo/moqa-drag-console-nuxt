<template>
  <v-card>
    <v-container>
      <v-layout wrap>
        <v-flex>
          <p class="my-2 ml-3 subheading">기본정보</p>
          <v-data-table
            :items="eventInfo"
            class="elevation-1"
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
      <v-layout wrap class="mt-3">
        <v-flex xs12>
          <v-spacer></v-spacer>
          <v-btn nuxt color="primary" @click="$router.go(-1)">
            목록으로
          </v-btn>
          <v-btn dark color="pink" @click="deleteEvent">
            삭제
          </v-btn>

        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import qs from 'qs'
export default {
  props: ['selectedItem'],
  methods: {
    deleteEvent () {
      this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxRemoveEvent.do?' + qs.stringify({
          eventSeq: this.selectedItem.eventSeq
        }), {
          withCredentials: true,
          crossdomain: true
      }).then(data => {
        alert('삭제되었습니다.')
        this.$router.go(-1)
      }).catch(err => {
        alert('에러가 발생했습니다.', err)
      })
    }
  },
  data () {
    return {
      eventInfo: [
        {
          name: "ID",
          value: this.selectedItem.eventSeq
        },
        {
          name: "제목",
          value: this.selectedItem.title
        },
        {
          name: "기간",
          value: this.selectedItem.startDt + '~' + this.selectedItem.endDt
        },
        {
          name: "작성일",
          value: this.selectedItem.createDt
        },
        {
          name: "상태",
          value:
            this.selectedItem.eventStatus
        },
        {
          name: "내용",
          value:
            this.selectedItem.contents
        },
      ],
    }
  }
}
</script>

