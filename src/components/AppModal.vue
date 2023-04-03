<script>
import { onMounted } from 'vue';
import { store } from '../store.js';


export default {
    name: 'AppModal',
    data() {
        return {
            store
        }
    },
    methods: {
        voteConverter(obj) {
            return Math.round(obj.vote_average / 2);
        }
    }
}

</script>

<template>
    <div class="modal-overlay" @wheel.prevent @click="this.store.showModal = false"
        :style="{ 'padding-top': (store.scrollPos + 100) + 'px' }">
        <div class="modal" @click.stop>
            <div class="modal-thumbnail">
                <div class="overlay"></div>
                <img v-if="store.modalObj.poster_path != undefined"
                    :src="`https://image.tmdb.org/t/p/w500${store.modalObj.poster_path}`" alt="">
                <img v-else src="poster-empty.jpg" alt="">
            </div>
            <div class="modal-content text-white">
                <!-- Titolo -->
                <h2 v-if="store.modalObj.title != undefined" class="font-condensed mb-2">{{ store.modalObj.title }} </h2>
                <h2 v-else class="font-condensed">{{ store.modalObj.name }} </h2>

                <h3 v-if="store.modalObj.original_title != undefined" class="font-condensed text-lightgrey mb-2">{{
                    store.modalObj.original_title }} </h3>
                <h3 v-else class="font-condensed text-lightgrey">{{ store.modalObj.original_name }} </h3>

                <!-- Voto -->
                <div class="vote text-streaming-red mb-5">
                    <i v-for="star in voteConverter(store.modalObj)" class="fa-solid fa-star"></i>
                    <i v-for="star in (5 - voteConverter(store.modalObj))" class="fa-regular fa-star"></i>
                </div>

                <!-- Descrizione -->
                <div class="modal-description pt-5">
                    <p>{{ store.modalObj.overview }}</p>
                </div>

                <!-- Cast -->
                <div class="cast">
                    <ul class="cast-carousel">
                        <li v-for="(actor, index) in store.modalCastObj">
                            <div class="actor-wrapper">
                                <img v-if="store.modalCastObj[index].profile_path !== undefined" class="mb-4"
                                    :src="`https://image.tmdb.org/t/p/w500${store.modalCastObj[index].profile_path}`"
                                    alt="">
                                <img v-else class="mb-4" src="/poster-empty.jpg" alt="">
                                <div class="caption p-2">
                                    <div class="small mb-2">{{ store.modalCastObj[index].name }}</div>
                                    <div class="small font-italic text-lightgrey">{{ store.modalCastObj[index].character }}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <button class="close-btn" @click="store.showModal = false"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>
</template>