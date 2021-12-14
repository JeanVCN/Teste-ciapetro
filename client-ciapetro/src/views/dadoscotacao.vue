<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row align="center">
          <v-col cols="auto">
            <v-btn :to="{ name: 'consultarhistorico' }" outlined
              >Histórico</v-btn
            >
          </v-col>
          <v-col>Dados detalhados</v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-col>
          <v-data-table :headers="headers" :items="resultados">
            <template v-slot:item.createdAt="{ item }">
              {{ new Date(item.createdAt).toLocaleString() }}
            </template>
          </v-data-table>
        </v-col>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    return {
      resultados: [],
      headers: [
        { text: "Moeda", value: "moeda" },
        { text: "Valor", value: "valor" },
      ],
    };
  },

  created() {
    this.getHistorico().then();
  },
  methods: {
    async getHistorico() {
      const id = this.$route.params.id;
      const resposta = await api.get(`/historico/${id}`);
      const data = resposta.data;

      this.resultados = Object.keys(data).map((key) => ({
        moeda: key,
        valor: data[key],
      }));
    },
  },
};
</script>
<style>
</style>