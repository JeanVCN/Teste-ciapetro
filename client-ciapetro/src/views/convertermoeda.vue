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
            <v-autocomplete
              item-text="nome"
              item-value="codigo"
              :items="moedasreferencia"
              label="Moeda de Referencia"
              hide-details="auto"
              outlined
              dense
              @change="converter"
              v-model="referencia"
              :loading="loading"
            />
          </v-col>
          <v-col>
            <v-autocomplete
              item-text="nome"
              item-value="codigo"
              :items="moedasconversao"
              label="Moeda para cotação"
              hide-details="auto"
              outlined
              dense
              v-model="moedaconversao"
              multiple
              :loading="loading"
            />
          </v-col>
          <v-col>
            <v-btn @click="converter"> Converter </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              :loading="loading"
              :headers="headers"
              :items="resultados"
            >
            </v-data-table>
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
      resultados: [],
      error: "",
      loading: false,

      headers: [
        { text: "Moeda", value: "moeda" },
        { text: "Valor", value: "valor" },
      ],
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
        this.loading = true;
        if (!this.referencia || this.moedaconversao.length === 0) return;
        const resposta = await api.get("/converter", {
          params: {
            referencia: this.referencia,
            moeda: this.moedaconversao,
          },
        });
        const data = resposta.data;
        this.resultados = Object.keys(data).map((key) => ({
          moeda: key,
          valor: data[key],
        }));
        this.error = "";
      } catch (error) {
        if (error.response) {
          this.error = error.response.data;
        } else {
          this.error = "erro desconhecido";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>