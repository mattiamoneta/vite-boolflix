<script>
//Dependencies

import { store } from '../store';

import PosterItem from './PosterItem.vue';


export default {
    name: 'PosterCollection',
    data() {
        return {
            store
        }
    },
    components: {
        PosterItem
    }
}
</script>

<template>
    <div class="wrapper-lg">
        <h1>Film</h1>
        <div class="row row-wrap">
            <PosterItem v-for="(item) in store.respMovies" :itemObj="item" itemType="movie" />
        </div>
        <h1>Serie</h1>
        <div class="row row-wrap">
            <PosterItem v-for="(item) in store.respSeries" :itemObj="item" itemType="tv" />
        </div>
    </div>
</template>