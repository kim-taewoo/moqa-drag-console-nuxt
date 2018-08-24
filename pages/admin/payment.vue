<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h3>결제 관리</h3>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12 class="mt-3">
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="payments"
          :pagination.sync="pagination"
          :total-items="totalpayments"
          :loading="loading"
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.payDate }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>            
            <td class="text-xs-center">{{ props.item.product }} P</td>
            <td class="text-xs-center">{{ props.item.payAmount }} 원</td>
            <td class="text-xs-center">{{ props.item.status }}</td>
            <td class="text-xs-center">{{ props.item.payPlan }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      totalpayments: 0,
      headers: [
        { text: "일자", align: "center", value: "payDate" },
        { text: "이름", align: "center", value: "name" },
        { text: "상품명", align: "center", value: "product" },
        { text: "결제금액", align: "center", value: "payAmount" },
        { text: "처리상태", align: "center", value: "status" },
        { text: "결제방식", align: "center", value: "payPlan" }
      ],
      payments: [],
      loading: true,
      pagination: {}
    };
  },
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.payments = data.items;
          this.totalpayments = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.payments = data.items;
      this.totalpayments = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let items = this.getPayments();
        const total = items.length;

        if (this.pagination.sortBy) {
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
    getPayments() {
      return [
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        },
        {
          payDate: "2018-02-05 18:50",
          name: "김태우",
          product: 2000,
          payAmount: 2000,
          status: "처리완료",
          payPlan: "신용카드 결제"
        }
      ];
    }
  }
};
</script>

