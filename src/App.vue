<script>

//Components
import AppHeader from './components/AppHeader.vue';
import PosterCollection from './components/PosterCollection.vue';

//Global State
import { store } from './store.js';
import axios from 'axios';

export default {
  data() {
    return {
      store
    }
  },
  components: {
    AppHeader,
    PosterCollection
  },
  methods: {
    performSearch() {

      //Query Movies
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}&query=${this.store.searchQuery}`)
        .then(response => {
          this.store.respMovies = response.data.results;
        });

      //Query Movies
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}&query=${this.store.searchQuery}`)
        .then(response => {
          this.store.respSeries = response.data.results;
        });

    }
  }
}

</script>

<template>
  <header>
    <!-- Top Navbar -->
    <AppHeader @search="performSearch" />
  </header>

  <main>
    <!-- Posters Wrapper -->
    <PosterCollection />
  </main>
</template>

<style lang="scss">
@use './styles/global.scss';
</style>
