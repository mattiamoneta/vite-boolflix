<script>
import { store } from '../store.js';

export default {
    name: "AppMessageBox",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="msgbox p-5 text-center" :class="store.msgBoxStyle">
        {{ store.msgboxText }}
    </div>
</template>