<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Knights List</h1>
        <v-row align="center" style="margin-top: 10px;">
          <v-btn color="blue" @click="newKnight()">
            <v-icon left>mdi-pencil</v-icon>New
          </v-btn>
          <v-btn style="margin-left: 10px;" color="blue" @click="heroKnight()">
            <v-icon left>mdi-shield"></v-icon>Heroes
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col
        v-for="knight in knights"
        :key="knight.id"
        cols="12"
        md="4"
      >
        <v-card class="pa-2">
          <v-card-title>
            {{ knight.name }} - {{ knight.nickname }}
          </v-card-title>
          <v-card-subtitle>
            Key Attribute: {{ knight.keyAttribute }}
          </v-card-subtitle>
          <v-card-text>
            <p>Strength: {{ knight.attributes.strength }}</p>
            <p>Dexterity: {{ knight.attributes.dexterity }}</p>
            <p>Constitution: {{ knight.attributes.constitution }}</p>
            <p>Intelligence: {{ knight.attributes.intelligence }}</p>
            <p>Wisdom: {{ knight.attributes.wisdom }}</p>
            <p>Charisma: {{ knight.attributes.charisma }}</p>
            <p>Weapons: {{ knight.weapons.length }}</p>
            <p>Attack: {{ knight.attack }}</p>
            <p>Experience: {{ knight.experience }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="deleteKnight(knight.id)">
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
            <v-btn color="blue" @click="editKnight(knight.id)">
              <v-icon left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      knights: []
    };
  },
  async mounted() {
    const response = await api.get('/Knights');
    this.knights = response.data;
  },
  methods: {
    async deleteKnight(id) {
      await api.delete(`/Knights/${id}`);
      this.knights = this.knights.filter(knight => knight.id !== id);
    },
    editKnight(id) {
      this.$router.push(`/edit-knight/${id}`);
    },
    newKnight() {
      this.$router.push(`/add-knight`);
    },
    heroKnight() {
      this.$router.push(`/filter-knights`);
    }
  }
};
</script>
