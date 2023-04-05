<script>
//Dependencies


import { store } from '../store';

import PosterItem from './PosterItem.vue';
import AppModal from './AppModal.vue';
import { registerRuntimeHelpers } from '@vue/compiler-core';
import axios from 'axios';


export default {
    name: 'PosterCollection',
    data() {
        return {
            store,
            moviesGenre: 0,
            seriesGenre: 0,
            emits: ['moviesGenre', 'seriesGenre']
        }
    },
    methods: {

        // Detect Scroll
        handleScroll(e) {
            this.store.scrollPos = window.scrollY;
        },

        scrollLeftMovies() {
            const elMoviesCollection = document.getElementById("moviesList")
            elMoviesCollection.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        },

        scrollLeftSeries() {
            const elSeriesCollection = document.getElementById("seriesList");
            elSeriesCollection.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        },

        // Change Body backdrop image on mouseover
        setBackground(backdrop, poster) {
            if (backdrop !== null) {
                this.store.fullscreenBackground = `https://image.tmdb.org/t/p/w1280${backdrop}`;
            } else {
                this.store.fullscreenBackground = `https://image.tmdb.org/t/p/w1280${poster}`;
            }

        },

        // Handle Modal
        toggleModal(obj) {

            this.store.modalObj = obj;
            this.store.modalCastObj = [];

            if (obj.original_name == undefined) {
                axios.get(`https://api.themoviedb.org/3/movie/${obj.id}/credits?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}`)
                    .then(response => {

                        for (let i = 0; i < 5; i++) {
                            if (response.data.cast[i].known_for_department == 'Acting') {
                                this.store.modalCastObj.push(response.data.cast[i]);
                            }
                        }

                    });

            } else {
                axios.get(`https://api.themoviedb.org/3/tv/${obj.id}/credits?api_key=${this.store.apiKey}&language=${this.store.searchLanguage}`)
                    .then(response => {
                        for (let i = 0; i < 5; i++) {
                            if (response.data.cast[i].known_for_department == 'Acting') {
                                this.store.modalCastObj.push(response.data.cast[i]);
                            }
                        }
                    });

            }


            if (this.store.showModal) {
                this.store.showModal = false;
            } else {
                this.store.showModal = true;
            }
        }
    },
    components: {
        PosterItem,
        AppModal
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    }
}
</script>

<template>
    <!-- Modal -->
    <AppModal v-if="store.showModal == true && store.modalObj != null" />

    <!-- Splash Screen -->
    <div v-show="store.respMovies.length == 0 || store.respSeries.length == 0" class="splash-screen">
        <img src="/sad-logo.png" alt="" class="logo-inline mb-5">
        <h2 class="text-white">Nessun risultato disponibile</h2>
        <span class="text-lightgrey mt-3">Usa la barra di ricerca in alto</span>
    </div>


    <div v-show="store.respMovies.length > 0 || store.respSeries.length > 0"
        class="wrapper-lg py-5 p-relative poster-collection">

        <!-- Movies -->
        <div class="row justify-content-between align-items-end p-5 mb-5">
            <div class="title-wrapper">
                <h1 class="text-white font-light d-inlineblock v-center font-conden">Film</h1>
                <span class="v-super text-white ml-5 text-lightgrey genre-badge">{{ store.stringCurMoviesGenre }}</span>
            </div>

            <!-- Select Genre -->
            <div class="select-wrapper">
                <label for="genreMovieSelect" class="text-white mr-5">Genere</label>
                <select class="lg" name="genreMovieSelect" v-model="moviesGenre"
                    @change="$emit('moviesGenre', moviesGenre)">
                    <option v-for="genre in store.respMoviesGenres.genres" :value="genre.id" :key="genre.id">{{ genre.name
                    }}
                    </option>
                </select>
            </div>
        </div>

        <ul class="row overflow-x py-5 poster-list" id="moviesList">
            <PosterItem v-if="store.filteredMovies.length > 0" v-for="(item) in store.filteredMovies" :itemObj="item"
                itemType="movie" @mouseover="setBackground(item.backdrop_path, item.poster_path)"
                @toggle-modal="toggleModal(item)" />
            <li v-else-if="store.filteredNoMoviesRes == true">
                <h2 class="text-white p-5">Nessun titolo trovato.</h2>
            </li>
            <PosterItem v-else v-for="(item) in store.respMovies" :itemObj="item" itemType="movie"
                @mouseover="setBackground(item.backdrop_path, item.poster_path)" @toggle-modal="toggleModal(item)"
                :key="item.id" />

            <li v-if="store.respMovies.length > 0 && store.filteredNoMoviesRes == false" class="poster">
                <div class="poster-lastchild">
                    <h2 class="v-center text-white">Non ci sono altri titoli!</h2>
                    <div class="btn-icon" @click="scrollLeftMovies"><i class="fa-solid fa-arrow-left"></i>
                    </div>
                </div>
            </li>
        </ul>


        <!-- Series -->
        <div class="row justify-content-between align-items-end p-5 mb-5">

            <div class="title-wrapper mt-6">
                <h1 class="text-white font-light d-inlineblock v-center">Serie</h1>
                <span class="v-super text-lightgrey ml-5 genre-badge">{{ store.stringCurSeriesGenre }}</span>
            </div>

            <!-- Select Genre -->
            <div class="select-wrapper">
                <label for="genreSerieSelect" class="text-white mr-5">Genere</label>
                <select class="lg" name="genreSerieSelect" v-model="seriesGenre"
                    @change="$emit('seriesGenre', seriesGenre)">
                    <option v-for="genre in store.respSeriesGenres.genres" :value="genre.id" :key="genre.id">{{ genre.name
                    }}
                    </option>
                </select>
            </div>


        </div>

        <!-- Movies / Series poster list -->
        <ul class="row overflow-x py-5 poster-list" id="seriesList">
            <PosterItem v-if="store.filteredSeries.length > 0" v-for="(item) in store.filteredSeries" :itemObj="item"
                itemType="tv" @mouseover="setBackground(item.poster_path)" @toggle-modal="toggleModal(item)" />
            <li v-else-if="store.filteredNoSeriesRes == true">
                <h2 class="text-white p-5">Nessun titolo trovato.</h2>
            </li>
            <PosterItem v-else v-for="(item) in store.respSeries" :itemObj="item" itemType="tv"
                @mouseover="setBackground(item.poster_path)" @toggle-modal="toggleModal(item)" :key="item.id" />

            <li v-if="store.respSeries.length > 0 && store.filteredNoSeriesRes == false" class="poster">
                <div class="poster-lastchild">
                    <h2 class="v-center text-white">Non ci sono altri titoli!</h2>
                    <div class="btn-icon" @click="scrollLeftSeries"><i class="fa-solid fa-arrow-left"></i>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>