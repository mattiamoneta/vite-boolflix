<script>
//Dependencies

import { store } from '../store';

import PosterItem from './PosterItem.vue';


export default {
    name: 'PosterCollection',
    data() {
        return {
            store,
            moviesGenre: 0,
            seriesGenre: 0
        }
    },
    methods: {
        setBackground(path) {
            this.store.fullscreenBackground = `https://image.tmdb.org/t/p/w500${path}`;
        },

        getMovieGenreString() {
            if (this.store.respMovies.length > 0) {

            }
        }
    },
    components: {
        PosterItem
    }
}
</script>

<template>
    <div v-show="store.respMovies.length > 0 || store.respSeries.length > 0"
        class="wrapper-lg py-5 p-relative poster-collection">

        <div class="row justify-content-between align-items-end p-5 mb-5">
            <div class="title-wrapper">
                <h1 class="text-white font-light d-inlineblock v-center">Film</h1>
                <span class="v-super text-white ml-5 text-lightgrey genre-badge">{{ store.stringCurMoviesGenre }}</span>
            </div>
            <div class="select-wrapper">
                <label for="genreMovieSelect" class="text-white mr-5">Genere</label>
                <select class="lg" name="genreMovieSelect" v-model="moviesGenre"
                    @change="$emit('moviesGenre', moviesGenre)">
                    <option v-for="genre in store.respMoviesGenres.genres" :value="genre.id">{{ genre.name }}
                    </option>
                </select>
            </div>
        </div>

        <ul class="row overflow-x py-5 poster-list">
            <PosterItem v-if="store.filteredMovies.length > 0" v-for="(item) in store.filteredMovies" :itemObj="item"
                itemType="movie" @mouseover="setBackground(item.poster_path)" />
            <li v-else-if="store.filteredNoMoviesRes == true">
                <h2 class="text-white p-5">Nessun titolo trovato.</h2>
            </li>
            <PosterItem v-else v-for="(item) in store.respMovies" :itemObj="item" itemType="movie"
                @mouseover="setBackground(item.poster_path)" />
        </ul>


        <div class="row justify-content-between align-items-end p-5 mb-5">

            <div class="title-wrapper">
                <h1 class="text-white font-light d-inlineblock v-center">Serie</h1>
                <span class="v-super text-lightgrey ml-5 genre-badge">{{ store.stringCurSeriesGenre }}</span>
            </div>
            <div class="select-wrapper">
                <label for="genreSerieSelect" class="text-white mr-5">Genere</label>
                <select class="lg" name="genreSerieSelect" v-model="seriesGenre"
                    @change="$emit('seriesGenre', seriesGenre)">
                    <option v-for="genre in store.respSeriesGenres.genres" :value="genre.id">{{ genre.name }}
                    </option>
                </select>
            </div>


        </div>

        <ul class="row overflow-x py-5 poster-list">
            <PosterItem v-if="store.filteredSeries.length > 0" v-for="(item) in store.respSeries" :itemObj="item"
                itemType="tv" @mouseover="setBackground(item.poster_path)" />
            <li v-else-if="store.filteredNoSeriesRes == true">
                <h2 class="text-white p-5">Nessun titolo trovato.</h2>
            </li>
            <PosterItem v-else v-for="(item) in store.respSeries" :itemObj="item" itemType="tv"
                @mouseover="setBackground(item.poster_path)" />
        </ul>

    </div>
</template>