<template>
  <v-container class="pa-0">
    <v-layout class="mt-2" wrap>
      <v-flex class="xs12 mt-4 text-xs-right">
        <v-btn large class="primary" nuxt to="/addGroup"><v-icon>add</v-icon> 그룹 생성</v-btn>
      <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-layout justify-center>
          <v-flex>
            <v-data-table
              :headers="headers"
              :items="target_groups"
              class="elevation-0"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.group_id }}</td>
                <td class="text-xs-center">{{ props.item.group_name }}</td>
                <td class="text-xs-center">{{ props.item.group_target_num }}</td>
                <td class="text-xs-center">{{ props.item.group_created_at }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FitTarget",
  data() {
    return {
      headers: [
        {
          text: "그룹번호",
          align: "center",
          value: "group_id",
          sortable: false
        },
        {
          text: "그룹명",
          value: "group_name",
          align: "center",
          sortable: false
        },
        { text: "인원수", value: "group_target_num", align: "center" },
        { text: "등록일", value: "group_created_at", align: "center" }
      ],
      target_groups: [
        {
          value: false,
          group_id: "1",
          group_name: "예시 그룹1",
          group_target_num: 120,
          group_created_at: "2018-07-12 00:00"
        },
        {
          value: false,
          group_id: "2",
          group_name: "예시 그룹2",
          group_target_num: 120,
          group_created_at: "2018-07-12 00:00"
        },
        {
          value: false,
          group_id: "3",
          group_name: "예시 그룹 3",
          group_target_num: 120,
          group_created_at: "2018-07-12 00:00"
        },
        {
          value: false,
          group_id: "4",
          group_name: "예시 그룹 4",
          group_target_num: 120,
          group_created_at: "2018-07-12 00:00"
        },
        {
          value: false,
          group_id: "5",
          group_name: "예시 그룹 5",
          group_target_num: 120,
          group_created_at: "2018-07-12 00:00"
        }
      ]
    };
  }
};
</script>
