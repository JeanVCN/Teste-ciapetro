<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="auto">
            <v-btn :to="{ name: 'consultarhistorico' }" outlined>Histórico</v-btn>
          </v-col>
          <v-col>Realizar cotação</v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              item-text="nome"
              item-value="id"
              :items="moedasreferencia"
              label="Moeda de Referencia"
              hide-details="auto"
              outlined
              dense
              v-model="referencia"
            />
          </v-col>
          <v-col>
            <v-select
              item-text="nome"
              item-value="id"
              :items="moedasconversao"
              label="Moeda para cotação"
              hide-details="auto"
              outlined
              dense
              v-model="moedaconversao"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Resultado"
              hide-details="auto"
              :value="resultadoconversao"
              outlined
              dense
              readonly
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "convertermoeda",
  data() {
    return {
      referencia: "",
      moedaconversao: "",
      moedas: [
        {
          nome: "Real",
          id: "BRL",
          valor: 1
        },
        {
          nome: "Dolar",
          id: "USD",
          valor: 5.5
        },
        {
          nome: "Euro",
          id: "EUR",
          valor: 6.5
        }

      ]
    }
  },
  computed: {
    moedasreferencia() {
      return this.moedas.filter(moeda => moeda.id != this.moedaconversao);
    },
    moedasconversao() {
      return this.moedas.filter(moeda => moeda.id != this.referencia);
    },
    resultadoconversao() {
      const moedareferencia = this.moedas.find(moeda => moeda.id == this.moedaconversao);
      const moedaconversao = this.moedas.find(moeda => moeda.id == this.referencia);
      if (!moedareferencia || !moedaconversao)
        return "";

      return moedareferencia.valor.toString() + " " + moedaconversao.nome;
    }
  }



}
</script>

<style>
</style>