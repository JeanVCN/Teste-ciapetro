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
              @change="converter"
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
              @change="converter"
              v-model="moedaconversao"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Resultado"
              hide-details="auto"
              :value="resultado"
              outlined
              dense
              readonly
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert v-if="error" color="red lighten-2" dark>
              {{ error }}
            </v-alert>
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
      resultado: "",
      error: "",
    };
  },
  computed: {
    moedasreferencia() {
      return this.moedas.filter((moeda) => moeda.codigo != this.moedaconversao);
    },
    moedasconversao() {
      return this.moedas.filter((moeda) => moeda.codigo != this.referencia);
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
      try {
        if (!this.referencia || !this.moedaconversao) return;
        const resposta = await api.get("/converter", {
          params: {
            referencia: this.referencia,
            moeda: this.moedaconversao,
          },
        });
        this.resultado = resposta.data.toLocaleString("pt-BR", {
          style: "currency",
          currency: this.moedaconversao,
          currencyDisplay: "symbol",
        });
        this.error = "";
      } catch (error) {
        if (error.response) {
          this.error = error.response.data;
        } else {
          this.error = "erro desconhecido";
        }
      }
    },
  },
};
</script>

<style>
</style>