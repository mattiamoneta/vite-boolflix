<script>

//Components
import AppHeader from './components/AppHeader.vue';
import PosterCollection from './components/PosterCollection.vue';
import AppFooter from './components/AppFooter.vue';

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
    PosterCollection,
    AppFooter
  },
  methods: {
    performSearch() {

      //Query Movies
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}&query=${this.store.searchQuery}`)
        .then(response => {
          this.store.respMovies = response.data.results;
        });

      //Query Series
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}&query=${this.store.searchQuery}`)
        .then(response => {
          this.store.respSeries = response.data.results;
        });

      this.store.searchQuery = "";

    },

    filterMoviesGenres(genre) {

      if (genre != 0) {
        this.store.filteredMovies = this.store.respMovies.filter(item => {
          if (item.genre_ids.includes(genre)) {
            return true;
          } else {
            return false;
          }
        });

        if (this.store.filteredMovies.length > 0) {
          this.store.filteredNoMoviesRes = false;
        } else {
          this.store.filteredNoMoviesRes = true;
        }
      } else {
        this.store.filteredMovies = this.store.respMovies;
      }


    },

    filterSeriesGenres(genre) {
      if (genre != 0) {
        this.store.filteredSeries = this.store.respSeries.filter(item => {
          if (item.genre_ids.includes(genre)) {
            return true;
          } else {
            return false;
          }
        });

        if (this.store.filteredSeries.length > 0) {
          this.store.filteredNoSeriesRes = false;
        } else {
          this.store.filteredNoSeriesRes = true;
        }
      } else {
        this.store.filteredSeries = this.store.respSeries;
      }

    },

    getGenres() {
      //Query Movies
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}`)
        .then(response => {
          this.store.respMoviesGenres = response.data;
          this.store.respMoviesGenres.genres.unshift({ id: 0, name: 'Tutti' });
        });


      //Query Serie
      axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}`)
        .then(response => {
          this.store.respSeriesGenres = response.data;
          this.store.respSeriesGenres.genres.unshift({ id: 0, name: 'Tutti' });
        });

    }
  },
  mounted() {
    this.getGenres();
  }
}

</script>

<template>
  <header>
    <!-- Top Navbar -->
    <AppHeader @search="performSearch" />
  </header>

  <main class="navbar-fix">
    <!-- Posters Wrapper -->
    <PosterCollection @moviesGenre="filterMoviesGenres" @seriesGenre="filterSeriesGenres" />
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>

<style lang="scss">
@use './styles/global.scss';
</style>
