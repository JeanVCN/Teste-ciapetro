<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row align="center">
          <v-col cols="auto">
            <v-btn :to="{ name: 'convertermoeda' }" outlined
              >Nova cotação</v-btn
            >
          </v-col>
          <v-col>Histórico de cotações</v-col>
        </v-row>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          hide-details="auto"
          outlined
          dense
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.info="{ item }">
            <v-btn
              :to="{ name: 'dadoscotacao', params: { id: item.id } }"
              outlined
              >Dados detalhados</v-btn
            >
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ new Date(item.createdAt).toLocaleString() }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import api from "../services/api";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Moeda de Referencia", value: "referencia" },
        { text: "Moeda para Cotação", value: "moeda" },
        { text: "Data de conversão", value: "createdAt" },
        { text: "Informações adicionais", sortable: false, value: "info" },
      ],
      items: [],
    };
  },
  created() {
    this.getHistoricos().then();
  },
  methods: {
    async getHistoricos() {
      const resposta = await api.get("/historicos");
      this.items = resposta.data;
    },
  },
};
</script>
<style>
</style>