<template>
    <div class="v-user">
        <h1>Привет пользователь {{this_user.name_User}} ! </h1>
    </div>
    
</template>

<script>

export default{
    name: "v-user",

    props:{
        this_user:{
            type: Object,
            default(){
                return {};
            }
        }
    }
}


</script>

<style>

</style>
