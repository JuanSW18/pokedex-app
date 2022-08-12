<template>
  <div class="d-flex flex-row justify-content-between card my-2">
    <p class="pokemonName my-auto ms-4" @click="showInfo()">{{ pokemon.name }}</p>
    <div class="my-2 me-4" :class="pokemon.cssClass" @click="addFavorite()"></div>
  </div>
</template>

<style>
  @import '../static/style.css';
</style>

<script>
  export default {
    name: 'PokemonItem',
    props: {
      info: {
        name: String,
        cssClass: String
      }
    },
    data() {
      return {
        pokemon: this.info
      }
    },
    methods: {
      showInfo: function () {
        this.$emit('showInfo', this.info)
      },
      addFavorite: function () {
        if (this.pokemon.cssClass === 'star-default') {
          this.pokemon.cssClass = 'star-yellow';
          this.$store.commit('savePokemon', this.pokemon);
        } else {
          this.pokemon.cssClass = 'star-default';
          this.$store.commit('removePokemon', this.pokemon);
        }
        this.$emit('addFavorite');
      },
    }
  }
</script>