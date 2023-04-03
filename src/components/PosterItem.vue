<script>
export default {
    name: 'PosterItem',
    data() {
        return {
            emits: ['toggle-modal']
        }
    },
    props: {
        itemType: String,
        itemObj: Object
    },
    methods: {
        convertLangFlag() {
            let apiLang = this.itemObj.original_language;

            switch (apiLang) {
                case 'en':
                    return 'gb'
                    break;
                case 'it':
                    return 'it'
                    break;
                case 'es':
                    return 'es-ct'
                    break;
                default:
                    return false;
            }
        },
        voteConverter() {
            return Math.round(this.itemObj.vote_average / 2);
        }
    }
}
</script>

<template>
    <li class="poster">
        <div class="content">

            <!-- Movie Poster -->
            <div class="poster-thumbnail">
                <span class="btn-play"><i class="fa-solid fa-circle-play"></i></span>
                <!-- Overlay -->
                <div class="overlay"></div>
                <img v-if="itemObj.poster_path != undefined" :src="`https://image.tmdb.org/t/p/w500${itemObj.poster_path}`"
                    alt="">
                <img v-else src="poster-empty.jpg" alt="">
                <span class="title-undefined" v-show="itemObj.poster_path == undefined">{{ itemObj.name }}</span>
            </div>

            <!-- Movie Description -->
            <div class="poster-details" @click="$emit('toggle-modal')">
                <div class="details pt-2">

                    <h2 class="font-condensed mb-3" v-if="itemType == 'movie'">{{ itemObj.title }}</h2>
                    <h2 class="font-condensed mb-3" v-else>{{ itemObj.name }}</h2>

                    <h5 class="mb-2" v-if="itemType == 'movie'">{{ itemObj.original_title }}</h5>
                    <h5 class="mb-2" v-else>{{ itemObj.original_name }}</h5>



                    <div class="vote text-streaming-red mb-5">
                        <i v-for="star in voteConverter()" class="fa-solid fa-star"></i>
                        <i v-for="star in (5 - voteConverter())" class="fa-regular fa-star"></i>
                    </div>

                    <p class="description text-lightgrey">
                        {{ itemObj.overview }}
                    </p>

                    <div class="bottom-section">
                        <div class="flag">
                            <span v-if="convertLangFlag() != false" :class="`fi fi-${convertLangFlag()}`"></span>
                            <span v-else>{{ itemObj.original_language }}</span>
                        </div>
                        <div class="actions">
                            <button class="btn-icon mr-3"><i class="fa-solid fa-thumbs-up"></i></button>
                            <button class="btn-icon" @click="$emit('toggle-modal')"><i
                                    class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    </li>
</template>

<style lang="scss">
@use "flag-icons/css/flag-icons.min.css";
</style>