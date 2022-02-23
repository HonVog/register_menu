<template>
    <div class="v-body">
        <v-registr/>
    </div>
</template>

<script>

import VRegistr from './v-registr.vue'

export default {
    name: "v-body",
    components:{
        VRegistr,
    }
}
</script>

<style>
.v-body{
    margin: 10px;
    display: flex;   
}
</style>
