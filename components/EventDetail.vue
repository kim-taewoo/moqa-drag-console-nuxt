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
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['selectedItem'],
  data () {
    return {
      eventInfo: [
        {
          name: "ID",
          value: this.selectedItem.eventId
        },
        {
          name: "제목",
          value: this.selectedItem.eventTitle
        },
        {
          name: "기간",
          value: this.selectedItem.eventPeriod
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
            this.selectedItem.content
        },
      ],
    }
  }
}
</script>

