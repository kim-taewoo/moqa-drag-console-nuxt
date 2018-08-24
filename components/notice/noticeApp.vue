<template>
  <v-layout>
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="notices"
        :search="search"
        class="elevation-0"
      >
        <template slot="items" slot-scope="props">
          <tr @click="$router.push({name: 'notice-id', params: props.item})" >
            <td class="text-xs-center">{{ props.item.writerId }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.created_date }}</td>
          </tr>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

