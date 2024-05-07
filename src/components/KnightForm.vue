<template>
  <v-container>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="knight.name"
        label="Nome"
        required
      />
      <v-text-field
        v-model="knight.nickname"
        label="Apelido"
        required
      />
      <v-text-field
        v-model="knight.birthday"
        label="Data de Nascimento"
        required
      />
      <v-divider></v-divider>

      <div v-for="(weapon, index) in knight.weapons" :key="index">
        <v-text-field
          v-model="weapon.name"
          label="Arma"
        />
        <v-text-field
          v-model="weapon.mod"
          label="Modificador"
          type="number"
        />
        <v-text-field
          v-model="weapon.attr"
          label="Atributo"
        />
        <v-checkbox
          v-model="weapon.equipped"
          label="Equipado"
        />
      </div>

      <v-divider></v-divider>
      <v-text-field
        v-model="knight.attributes.strength"
        label="Força"
        type="number"
      />
      <v-text-field
        v-model="knight.attributes.dexterity"
        label="Destreza"
        type="number"
      />
      <v-text-field
        v-model="knight.attributes.constitution"
        label="Constituição"
        type="number"
      />
      <v-text-field
        v-model="knight.attributes.intelligence"
        label="Inteligência"
        type="number"
      />
      <v-text-field
        v-model="knight.attributes.wisdom"
        label="Sabedoria"
        type="number"
      />
      <v-text-field
        v-model="knight.attributes.charisma"
        label="Carisma"
        type="number"
      />

      <v-divider></v-divider>
      <v-text-field
        v-model="knight.keyAttribute"
        label="Atributo Chave"
      />

      <v-btn type="submit" color="primary">Salvar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import api from "../services/api";

function generateObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  }).toLowerCase();
}

export default {
  data() {
    return {
      menu: false,
      knight: {
        id: "",
        name: "",
        nickname: "",
        birthday: "",
        weapons: [{ name: "", mod: 0, attr: "", equipped: false }],
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0
        },
        keyAttribute: ""
      }
    };
  },
  methods: {


    
    async handleSubmit() {
      try {
        // Verifique se está editando ou inserindo um novo knight
        if (this.knight.id) {
          await api.put(`/Knights/${this.knight.id}`, this.knight);
          alert("Knight atualizado com sucesso!");
        } else {
          this.knight.id = generateObjectId();
          this.knight.birthday = new Date(this.knight.birthday).toISOString();
          await api.post("/Knights", this.knight);
          alert("Knight criado com sucesso!");
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao salvar Knight:", error);
        alert("Erro ao salvar Knight. Veja o console para mais detalhes.");
      }
    }
  },
  mounted() {
    // Simulação de carregamento de um knight para edição
    const knightId = this.$route.params.id; // Ou de outra fonte
    if (knightId) {
      api.get(`/Knights/${knightId}`).then(response => {
        this.knight = response.data;
      });
    }
  }
};
</script>
