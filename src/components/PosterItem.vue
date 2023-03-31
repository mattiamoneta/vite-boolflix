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
                    <h5>{{ itemObj.title }}</h5>
                    <h5>{{ itemObj.original_title }}</h5>
                    <h5>{{ itemObj.original_language }}</h5>
                    <h5>{{ itemObj.vote_average }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>