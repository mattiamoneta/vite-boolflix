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
    <div class="wrapper">
        <input type="text" v-model="this.store.searchQuery">
        <button @click="$emit('search')">Search</button>
    </div>
</template>