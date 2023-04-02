<script>

import { store } from '../store.js';

export default {
    name: 'AppFooter',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
  <div class="wrapper-lg">
    <div class="row p-5">
        <p class="small text-white">Copyright &copy; {{ store.currentYear }}. Tutti i diritti riservati.</p>
    </div>
  </div>
</template>

