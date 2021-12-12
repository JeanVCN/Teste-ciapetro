<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          <v-btn :to="{ name: 'convertermoeda' }" outlined>Nova cotação</v-btn>
        </v-col>
      </v-row>Histórico de cotações
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:item.info="{ item }">
        <v-btn :to="{ name: 'convertermoeda', params: { id: item.id } }" outlined>Dados detalhados</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Moeda de Referencia', value: 'referencia', },
        { text: 'Moeda para Cotação', value: 'cotacao' },
        { text: 'Data de conversão', value: 'data' },
        { text: "Informações adicionais", sortable: false, value: "info" },
      ],
      items: [
        {
          referencia: 'Dolar',
          cotacao: 'Real',
          data: '12/12/2021-17:18'
        },
        {
          referencia: 'Dolar',
          cotacao: 'Real',
          data: '12/12/2021-17:18'
        },
        {
          referencia: 'Dolar',
          cotacao: 'Real',
          data: '12/12/2021-17:18'
        },
        {
          referencia: 'Dolar',
          cotacao: 'Real',
          data: '08/12/2021-17:18'
        }
      ],
    }
  },
}
</script>
<style>
</style>