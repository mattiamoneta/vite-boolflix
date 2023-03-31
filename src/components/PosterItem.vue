<script>
export default {
    name: 'PosterItem',
    data() {
        return {
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
    <div class="poster">
        <div class="content">
            <div class="poster-thumbnail">
                <img :src="`https://image.tmdb.org/t/p/w500${itemObj.poster_path}`" alt="">
            </div>
            <div class="poster-details">
                <div class="details">
                    <h5 v-if="itemType == 'movie'">{{ itemObj.title }}</h5>
                    <h5 v-else>{{ itemObj.name }}</h5>

                    <h5 v-if="itemType == 'movie'">{{ itemObj.original_title }}</h5>
                    <h5 v-else>{{ itemObj.original_name }}</h5>

                    <span v-if="convertLangFlag() != false" :class="`fi fi-${convertLangFlag()}`"></span>
                    <span v-else>{{ itemObj.original_language }}</span>

                    <div class="vote">
                        <i v-for="star in voteConverter()" class="fa-solid fa-star"></i>
                        <i v-for="star in (5 - voteConverter())" class="fa-regular fa-star"></i>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use "flag-icons/css/flag-icons.min.css";
</style>