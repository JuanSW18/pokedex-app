<template>
    <img alt="Pikachu logo" src="../assets/pikachu.svg">
    <h1 class="fw-bold">Welcome to Pokédex</h1>
    <p class="info col-10 col-sm-5">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <router-link class="btn btn-danger rounded-pill" to="/search">Get started</router-link>
</template>

<script>
    export default {
        name: 'Home',
    }
</script>