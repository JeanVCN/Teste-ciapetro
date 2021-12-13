<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row align="center">
          <v-col cols="auto">
            <v-btn :to="{ name: 'consultarhistorico' }" outlined>
              Histórico
            </v-btn>
          </v-col>
          <v-col>Realizar cotação</v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              item-text="nome"
              item-value="codigo"
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
              item-value="codigo"
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
import api from "../services/api";

export default {
  name: "convertermoeda",
  data() {
    return {
      referencia: "",
      moedaconversao: "",
      moedas: [],
    };
  },
  computed: {
    moedasreferencia() {
      return this.moedas.filter((moeda) => moeda.codigo != this.moedaconversao);
    },
    moedasconversao() {
      return this.moedas.filter((moeda) => moeda.codigo != this.referencia);
    },
    resultadoconversao() {
      const moedareferencia = this.moedas.find(
        (moeda) => moeda.codigo == this.moedaconversao
      );
      const moedaconversao = this.moedas.find(
        (moeda) => moeda.codigo == this.referencia
      );
      if (!moedareferencia || !moedaconversao) return "";

      return moedareferencia.valor.toString() + " " + moedaconversao.nome;
    },
  },
  created() {
    this.getmoedas().then();
  },
  methods: {
    async getmoedas() {
      const resposta = await api.get("/moedas");
      this.moedas = resposta.data;
    },
    async converter() {
      const resposta = await api.get("/converter", {
        params: {
          referencia: this.referencia,
          moeda: this.moedaconversao,
        },
      });
      this.resultado = resposta.data;
    },
  },
};
</script>

<style>
</style>