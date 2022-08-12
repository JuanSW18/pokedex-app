import PokedexService from '../../services/pokedex.service'
import GenericModal from '../../components/GenericModal.vue'
import LoadingBg from '../../components/LoadingBg.vue'
import PokemonItem from '../../components/PokemonItem.vue'

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
        this.pokemonFullList.forEach(item => item.cssClass = 'star-default');
        this.pokemonList = [... this.pokemonFullList];
      },
      () => {
        console.error("Pokedex API conection error!");
      }
    );
  },
  computed: {},
  methods: {
    reset() {
      this.pokemonName = '';
      this.btnActive = '';
      this.pokemonList = [...this.pokemonFullList];
    },
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
      this.pokemonList = this.pokemonFullList.filter(item => item.cssClass === 'star-yellow');
    },
    searchPokemon: function () {
      const searchStarted = this.pokemonName.length > 0;
      if (searchStarted) {
        this.btnActive = '';
        this.pokemonList = this.pokemonFullList.filter(item => item.name.includes(this.pokemonName));
      } else {
        this.reset();
      }
    },
    showPokemonInfo: function (pokemon) {
      this.isLoading = true;
      new PokedexService().getPokemonDetail(pokemon.name).then(
        (response) => {
          response.data['class'] = pokemon.cssClass;
          this.pokemonData = response.data
          setTimeout(() => {
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