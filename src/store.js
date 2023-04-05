import { reactive } from "vue";

export const store = reactive({
    apiKey: 'ee9477622fd438eb5e8774f9d79daa52', //Chiave Api TMDB

    //Query Parameters
    searchQuery: '',
    searchLanguage: 'it',

    //Response
    respMovies: [], //Array ritornato dalla query per Film
    respSeries: [],  //Array ritornato dalla query per Serie

    respMoviesGenres: [],
    stringCurMoviesGenre: 'Tutti',
    respSeriesGenres: [],
    stringCurSeriesGenre: 'Tutti',

    // Filtered Arrays
    filteredMovies: [],
    filteredNoMoviesRes: false,
    filteredSeries: [],
    filteredNoSeriesRes: false,


    currentYear: new Date().getFullYear(),

    fullscreenBackground: '/default-bg.jpg',

    // Modal
    modalObj: null,
    modalCastObj: [],
    showModal: false,
    scrollPos: 0,

    favourites: [],

    // Message Box
    showMsgBox: false,
    msgboxText: '',
    msgBoxStyle: ''

});

// Film:    https://api.themoviedb.org/3/search/movie?api_key=ee9477622fd438eb5e8774f9d79daa52&language=it&query=nome+film
// Serie:   https://api.themoviedb.org/3/search/tv?api_key=ee9477622fd438eb5e8774f9d79daa52&language=it&query=nome+film