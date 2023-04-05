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
    // Change Body backdrop image
    defaultBackground(path) {
      this.store.fullscreenBackground = `https://image.tmdb.org/t/p/w500${path}`;
    },


    // Search for Movies and Series
    performSearch() {

      if (store.searchQuery != "") {

        this.store.showModal = false;
        this.store.filteredMovies = [];
        this.store.filteredSeries = [];

        //Query Movies
        axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.store.apiKey,
            language: this.store.searchLanguage,
            query: this.store.searchQuery
          }
        })
          .then(response => {
            this.store.respMovies = response.data.results;

            if (this.store.respMovies.length > 0) {
              this.defaultBackground(this.store.respMovies[0].poster_path);
            }

          });

        //Query Series
        axios.get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: this.store.apiKey,
            query: this.store.searchQuery,
            language: this.store.searchLanguage
          }
        })
          .then(response => {
            this.store.respSeries = response.data.results;
          });

        this.store.searchQuery = "";
      }

    },

    // Filter Movies
    filterMoviesGenres(genre) {

      this.store.respMoviesGenres.genres.forEach(e => {
        if (e.id == genre) {
          this.store.stringCurMoviesGenre = e.name;
        }
      });

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
        this.store.filteredNoMoviesRes = false;
      }


    },

    // Filter Series
    filterSeriesGenres(genre) {

      console.log(genre)
      this.store.respSeriesGenres.genres.forEach(e => {
        if (e.id == genre) {
          this.store.stringCurSeriesGenre = e.name;
        }
      });

      if (genre != 0) {

        this.store.filteredSeries = this.store.respSeries.filter(item => {
          if (item.genre_ids.includes(genre)) {
            return true;
          } else {
            return false;
          }
        });

        console.log(this.store.filteredSeries)

        if (this.store.filteredSeries.length > 0) {
          this.store.filteredNoSeriesRes = false;
        } else {
          this.store.filteredNoSeriesRes = true;
        }
      } else {
        this.store.filteredSeries = this.store.respSeries;
        this.store.filteredNoSeriesRes = false;
      }

    },

    // Get all genres
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

  <main :style="{ 'background-image': 'url(' + store.fullscreenBackground + ')' }">
    <div class="backdrop navbar-fix">
      <!-- Posters Wrapper -->
      <PosterCollection @moviesGenre="filterMoviesGenres" @seriesGenre="filterSeriesGenres" />
    </div>
  </main>

  <footer>
    <AppFooter />
  </footer>
</template>

<style lang="scss">
@use './styles/global.scss';
</style>
