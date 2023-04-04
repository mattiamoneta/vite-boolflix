<script>

//Dependencies
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            showDropdown: false
        }
    },
    methods: {
        toggleDropdown() {
            if (this.showDropdown) {
                this.showDropdown = false;
            } else {
                this.showDropdown = true;
            }
        }
    }
}
</script>

<template>
    <div class="wrapper-lg p-3">
        <div class="row justify-content-between">
            <div class="navbar-left">
                <img src="/logo.png" alt="" class="nav-logo">
                <div class="dropdown">
                    <a href="#" @click="toggleDropdown">La mia Lista &#9662;</a>
                    <div class="dropdown-menu" v-show="showDropdown">
                        <ul>
                            <li v-if="store.favourites.length == 0" class="text-white">La tua lista è vuota</li>
                            <li v-for="(elem, index) in store.favourites">
                                <img :src="elem.poster" :alt="elem.title">
                                <div class="info v-center ml-5">
                                    <h4 class="text-white">{{ elem.title }}</h4>
                                    <span class="text-lightgrey small">{{ elem.title }}</span>
                                </div>
                                <span class="delete-item" @click="this.store.favourites.splice(index, 1)"><i
                                        class="fa-solid fa-trash"></i></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="input-group text-right">
                <input type="text" v-model="this.store.searchQuery" @keyup.enter="$emit('search')" placeholder="Cerca...">
                <button @click="$emit('search')" class="btn btn-dark-textual btn-rounded"><i
                        class="fa-solid fa-magnifying-glass"></i></button>
                <div class="user-profile">
                    <img src="/userpicture.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>