<template>
  <v-flex xs12 >
    <v-layout>
      <v-flex xs4>
        <v-text-field v-model="search" single-line hide-details label="검색" append-icon="search"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs6 class="text-xs-right">
        <v-btn @click.stop="$router.push({name: 'admin-message-newMessage'})">작성하기</v-btn>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-dialog
      v-model="messageDetailDialog"
      width="980"
      lazy
    >
      <MessageDetail v-if="messageDetailDialog" :item="selectedItem"></MessageDetail>
    </v-dialog>
    <v-data-table
        :headers="headersMessage"
        :items="messages"
        :pagination.sync="paginationMessage"
        :total-items="totalMessages"
        :loading="loading"
        :rows-per-page-items="[10,15,20]"
        class="elevation-0"
      >
      <template slot="items" slot-scope="props">
        <tr @click.stop="itemSelected($event,props.item)">
          <td class="text-xs-center">{{ props.item.seq }}</td>
          <td class="text-xs-center">{{ props.item.memberSeq }}</td>
          <td class="text-xs-center">{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.context }}</td>
          <td class="text-xs-center">{{ props.item.sendDt }}</td>
          <td class="text-xs-center">{{ props.item.createDt }}</td>
        </tr>
      </template>
      <!-- <template slot="items" slot-scope="props">
        <tr @click.stop="itemSelected($event,props.item)">
          <td class="text-xs-center">{{ props.item.messageNum }}</td>
          <td class="text-xs-center">{{ props.item.memberSeq }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.gender }}</td>
          <td class="text-xs-center">{{ props.item.messageContent }}</td>
          <td class="text-xs-center">{{ props.item.check }}</td>
        </tr>
      </template> -->
    </v-data-table>
  </v-flex>
</template>

<script>
import qs from 'qs'
import MessageDetail from '@/components/MessageDetail'
export default {
  components: {
    MessageDetail
  },
  data() {
    return {
      selectedItem: null,
      messageDetailDialog: false,
      search: "",
      headersMessage: [
        { text: "메시지 번호", align: "center", value: "seq" },
        { text: "회원번호", align: "center", value: "memberSeq" },
        { text: "제목", align: "center", value: "title" },
        { text: "내용", align: "center", value: "context" },
        { text: "발송일", align: "center", value: "sendDt" },
        { text: "생성일", align: "center", value: "createDt" },
      ],
      messages: [],
      totalMessages: 0,
      paginationMessage: {},
      loading: true
    };
  },
  watch: {
    paginationMessage: {
      handler() {
        this.getDataFromApi().then(data => {
          this.messages = data.rows;
          this.totalMessages = data.total;
          this.loading = false
        });
      },
      deep: true
    },
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.messages = data.rows;
      this.totalMessages = data.total;
      this.loading = false
    });
  },
  methods: {
    itemSelected(e, item) {
      // this.openDialogKey++;
      this.selectedItem = item;
      this.messageDetailDialog = true;
    },
    getDataFromApi() {
      this.loading = true;
      return this.$axios.$post('http://admin.moqa.co.kr/admin/ajax/ajaxSelectMemberNote.do', {
        withCredentials: true,
        crossdomain : true,
      })
    },
  }
};
</script>

<style scoped>
.v-input {
  margin-top: 5px;
}
.v-subheader {
  padding: 0;
  height: 40px;
}
</style>

