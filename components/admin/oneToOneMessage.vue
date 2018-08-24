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
    <v-data-table
        :headers="headersMessage"
        :items="messages"
        :pagination.sync="paginationMessage"
        :total-items="totalMessages"
        :loading="loading"
        class="elevation-0"
        :search="search"
      >
      <template slot="items" slot-scope="props">
        <!-- <tr @click.stop="$router.push({name: 'admin-users-memberSeq', params: props.item})"> -->
          <td class="text-xs-center">{{ props.item.messageNum }}</td>
          <td class="text-xs-center">{{ props.item.memberSeq }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.gender }}</td>
          <td class="text-xs-center">{{ props.item.messageContent }}</td>
          <td class="text-xs-center">{{ props.item.check }}</td>
        <!-- </tr> -->
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headersMessage: [
        { text: "메시지 번호", align: "center", value: "messageNum" },
        { text: "회원번호", align: "center", value: "memberSeq" },
        { text: "이메일", align: "center", value: "email" },
        { text: "이름", align: "center", value: "name" },
        { text: "성별", align: "center", value: "gender" },
        { text: "메시지 내용", align: "center", value: "messageContent" },
        { text: "수신확인", align: "center", value: "check" }
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
          this.messages = data.items;
          this.totalMessages = data.total;
        });
      },
      deep: true
    },
    // 1:1 메세지 기능에서 검색을 했을 경우 아래 search 와 관련이 있음.
    // 위 pagination 처럼 ajax 콜을 보낸 후에 this.pushes 에 받은 데이터를 넣어야함.
    // this.totalPushes 에는 해당 검색 결과의 항목 개수가 들어가게 됨.
    search: {
      //로직
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.messages = data.items;
      this.totalMessages = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.paginationMessage;

        let dataResult = this.getMessages();
        let items = dataResult.rows;
        const total = dataResult.total;

        if (this.paginationMessage.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }
        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getMessages() {
      return {
        total: 25,
        rows: [
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          },
          {
            messageNum: "100",
            memberSeq: "2084",
            email: "example@gmail.com",
            name: "민수",
            gender: "M",
            messageContent: "안녕하세요 민수님",
            check: "수신"
          }
        ]
      };
    }
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

