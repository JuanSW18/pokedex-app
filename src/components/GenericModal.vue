<template>
    <div class="modal showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-modal">
                    <div class="close-btn-div"><img alt="Close button" src="../assets/close-btn.png" @click="close()"></div>
                </div>
                <div class="modal-body">
                    <p class="text-start"><b>Name:</b> {{ pokemonData.name }}</p>
                    <p class="text-start"><b>Weight:</b> {{ pokemonData.weight }}</p>
                    <p class="text-start"><b>Height:</b> {{ pokemonData.height }}</p>
                    <p class="text-start"><b>Types:</b> {{ pokemonData.types }}</p>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-danger rounded-pill" @click="sharedInfo()">Shared to my friends</button>
                    <div :class="pokemonData.class"></div>
                </div>
            </div>
         </div>
    </div>
</template>

<style>
  @import '../static/style.css';
  @import '../static/generic-modal.component.css';
</style>

<script>
    export default {
        name: 'GenericModal',
        props: {
            info: Object
        },
        data() {
            return {
                pokemonData: {
                    'name': '',
                    'weight': '',
                    'height': '',
                    'types': '',
                    'class': ''
                }   
            }
        },
        watch: {
          info() {
            const types = [];
            this.info.types.forEach(item => types.push(item.type.name));
            this.pokemonData.types = types.join(', ');
            this.pokemonData.weight = this.info.weight;
            this.pokemonData.height = this.info.height;
            this.pokemonData.name = this.info.name;
            this.pokemonData.class = this.info.class;
          }  
        },
        methods: {
            close: function () {
                this.$emit('clicked', '');
            },
            sharedInfo: function () {
                const clipboardData = window.clipboardData || navigator.clipboard;
                const text = this.pokemonData.name + ' (' + this.pokemonData.types + ')';
                clipboardData.writeText(text);
            }
        }
    }
</script>