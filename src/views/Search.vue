<template>
    <loading-bg v-show="isLoading"></loading-bg>
    <div class="container col-11 col-sm-8 mb-4">
        <div class="input-group mb-4 form-control align-items-center">
            <div class="ic-search"></div>
            <input type="text" class="form-control border-0" aria-label="Pokemon name" placeholder="Search" v-model="pokemonName" v-on:input="searchPokemon()">
        </div>
        <div>
            <div v-if="showAll">
                <div class="d-flex flex-row justify-content-between card my-2" v-for="pokemon in pokemonList" :key="pokemon.name">
                    <p class="pokemonName my-auto ms-4" @click="showPokemonInfo(pokemon)">{{ pokemon.name }}</p>
                    <div class="my-2 me-4" :class="pokemon.cssClass" @click="addFavorite(pokemon)"></div>
                </div>
            </div>
            <div v-else-if="!showAll && searchStarted && searchResult.length !== 0">
                <div class="d-flex flex-row justify-content-between card my-2" v-for="pokemon in searchResult" :key="pokemon.name">
                   <p class="pokemonName my-auto ms-4" @click="showPokemonInfo(pokemon)">{{ pokemon.name }}</p>
                    <div class="my-2 me-4" :class="pokemon.cssClass" @click="addFavorite(pokemon)"></div>
                </div>
            </div>
            <div class="my-4" v-else-if="searchStarted && searchResult.length === 0">
                <h1 class="fw-bold">Uh-oh!</h1>
                <h3 class="info">You look lost on your journey!</h3>
                <router-link class="btn btn-danger rounded-pill" to="/">Go back home</router-link>
            </div>
            <div v-else>
                <div class="d-flex flex-row justify-content-between card my-2" v-for="pokemon in favoriteList" :key="pokemon.name">
                    <p class="pokemonName my-auto ms-4" @click="showPokemonInfo(pokemon)">{{ pokemon.name }}</p>
                    <div class="my-2 me-4" :class="pokemon.cssClass" @click="addFavorite(pokemon)"></div>
                </div>
            </div>
        </div>
        <div class="btn-group" v-if="!searchStarted || searchResult.length !== 0">
            <button class="btn rounded-pill me-4" :class="!searchStarted && showAll === true ? 'btn-danger' : 'btn-secondary'" @click="switchShowAll(true)">
                All
            </button>
            <button class="btn rounded-pill ms-4" :class="!searchStarted && showAll !== true ? 'btn-danger' : 'btn-secondary'" @click="switchShowAll(false)">
                Favorites
            </button>
        </div>
    </div>
    <generic-modal v-show="showModal" :pokemonData="pokemonData" @clicked="showModal = false"></generic-modal>
</template>

<style>
  @import '../static/style.css';
</style>

<script>
    import PokedexService from '../services/pokedex.service'
    import GenericModal from '../components/GenericModal.vue'
    import LoadingBg from '../components/LoadingBg.vue'

    export default {
        name: 'Search',
        components: {
            GenericModal,
            LoadingBg
        },
        data() {
            return {
                isLoading: false,
                pokemonList: [],
                searchResult: [],
                showAll: true,
                pokemonName: '',
                searchStarted: false,
                showModal: false,
                pokemonData: {
                    'name': '',
                    'weight': '',
                    'height': '',
                    'types': '',
                    'class': ''
                }
            }
        },
        created() {
            new PokedexService().getPokemonList().then(
                (response) => {
                    this.pokemonList = response.data.results;
                    this.pokemonList.forEach( item => item.cssClass = 'star-default');
                },
                () => {
                    console.error("Pokedex API conection error!");
                }
            );
        },
        computed: {
            favoriteList: function () {
                return this.pokemonList.filter( item => item.cssClass === 'star-yellow' );
            }
        },
        methods: {
            addFavorite: function (pokemon) {
                if (pokemon.cssClass === 'star-default') {
                    pokemon.cssClass = 'star-yellow';
                } else {
                    pokemon.cssClass = 'star-default';
                }
            },
            searchPokemon: function () {
                this.searchStarted = this.pokemonName.length > 0 ? true : false;
                if (this.searchStarted) {
                    this.showAll = false;
                    this.searchResult = this.pokemonList.filter( item => item.name.includes(this.pokemonName) );
                }else{
                    this.showAll = true;
                }
            },
            switchShowAll: function (value) {
                this.pokemonName = '';
                this.searchStarted = false;
                this.searchResult = [];
                this.showAll = value;
            },
            showPokemonInfo: function (pokemon) {
                this.isLoading = true;
                new PokedexService().getPokemonDetail(pokemon.name).then( 
                    (response) => {
                        const types = [];
                        response.data.types.forEach( item => types.push(item.type.name));
                        this.pokemonData.types = types.join(', ');
                        this.pokemonData.weight = response.data.weight;
                        this.pokemonData.height = response.data.height;
                        this.pokemonData.name = pokemon.name;
                        this.pokemonData.class = pokemon.cssClass;
                        setTimeout( () => {
                            this.isLoading = false;
                            this.showModal = true;
                        }, 200);
                    },
                    () => {
                        this.isLoading = false;
                        console.error("Pokemon information doesn't found!");
                    }
                );
            }
        }
    }
</script>