<template>
    <loading-bg v-show="isLoading"></loading-bg>
    <div class="container col-11 col-sm-8 mb-4">
        <div class="input-group mb-4 form-control align-items-center">
            <div class="ic-search"></div>
            <input type="text" class="form-control border-0" aria-label="Pokemon name" placeholder="Search" v-model="pokemonName" v-on:input="searchPokemon()">
        </div>
        <div>
            <pokemon-item v-for="pokemon in pokemonList"
                :key="pokemon"
                :info="pokemon"
                @show-info="showPokemonInfo">
            </pokemon-item>
        </div>
        <div class="btn-group">
            <button class="btn rounded-pill me-4" :class="isBtnActive('primary')" @click="showFullList()">
                All
            </button>
            <button class="btn rounded-pill ms-4" :class="isBtnActive('secondary')" @click="showFavoriteList()">
                Favorites
            </button>
        </div>
    </div>
    <generic-modal v-show="showModal" :info="pokemonData" @clicked="showModal = false"></generic-modal>
</template>

<style>
  @import '../static/style.css';
</style>

<script>
    import PokedexService from '../services/pokedex.service'
    import GenericModal from '../components/GenericModal.vue'
    import LoadingBg from '../components/LoadingBg.vue'
    import PokemonItem from '../components/PokemonItem.vue'

    export default {
        name: 'Search',
        components: {
            GenericModal,
            LoadingBg,
            PokemonItem
        },
        data() {
            return {
                showModal: false,
                isLoading: false,
                btnActive: '',
                pokemonName: '',
                pokemonList: [],
                pokemonFullList: [],
                pokemonData: {},
            }
        },
        created() {
            new PokedexService().getPokemonList().then(
                (response) => {
                    this.pokemonFullList = response.data.results;
                    this.pokemonFullList.forEach( item => item.cssClass = 'star-default');
                    this.pokemonList = [... this.pokemonFullList];
                },
                () => {
                    console.error("Pokedex API conection error!");
                }
            );
        },
        computed: {},
        methods: {
            isBtnActive(btn) {
                const cssStyle = (this.btnActive === btn) ? 'btn-danger' : 'btn-secondary';
                return cssStyle;
            },
            showFullList() {
                this.pokemonName = '';
                this.btnActive = 'primary';
                this.pokemonList = [...this.pokemonFullList];
            },
            showFavoriteList() {
                this.pokemonName = '';
                this.btnActive = 'secondary';
                this.pokemonList = this.pokemonFullList.filter( item => item.cssClass === 'star-yellow' );
            },
            searchPokemon: function () {
                const searchStarted = this.pokemonName.length > 0;
                if (searchStarted) {
                    this.btnActive = '';
                    this.pokemonList = this.pokemonFullList.filter( item => item.name.includes(this.pokemonName) );
                } else {
                    this.showFullList();
                }
            },
            showPokemonInfo: function (pokemon) {
                this.isLoading = true;
                new PokedexService().getPokemonDetail(pokemon.name).then( 
                    (response) => {
                        response.data['class'] = pokemon.cssClass;
                        this.pokemonData = response.data
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