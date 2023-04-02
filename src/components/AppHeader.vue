<script>

//Dependencies
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="wrapper-lg p-3">
        <div class="row justify-content-between">
            <img src="/logo.png" alt="" class="nav-logo">
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