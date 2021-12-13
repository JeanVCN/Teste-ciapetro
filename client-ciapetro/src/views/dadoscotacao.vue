<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-btn :to="{ name: 'consultarhistorico' }" outlined>Histórico</v-btn>
          </v-col>
          <v-col>Dados detalhados</v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table hide-default-footer :headers="headers" :items="items"></v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Moeda de Referencia', value: 'referencia', },
        { text: 'Moeda para Cotação', value: 'cotacao' },
        { text: 'Data de conversão', value: 'data' },
        { text: 'Valor de referencia', value: 'valorreferencia' },
        { text: 'Valor de conversão', value: 'valorconversao' },
      ],
      items: [
        {
          referencia: 'Dolar',
          cotacao: 'Real',
          data: '12/12/2021-17:18',
          valorreferencia: '5,5 USD',
          valorconversao: '1,5 BRL'
        }
      ],
    }
  },
}
</script>
<style>
</style>