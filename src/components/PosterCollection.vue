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
        <div class="row row-wrap">
            <PosterItem v-for="(item) in store.respMovies" :itemObj="item" />
        </div>
    </div>
</template>