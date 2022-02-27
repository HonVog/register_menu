<template>
    <div class="v-body">

        <v-auth 
            @is_user_arr_users="new_user"
            v-if="!isAuth"       
        />

        <!--
        <v-registr v-else-if="non_this_user"/>
        Пока не реализованно

        <v-base-info v-else
            :this_user="user"
        />
        -->

        <v-user 
            v-else
            
            :this_user="user"
        />


    </div>
</template>

<script>

//import VRegistr from './v-registr.vue'
//import VBaseInfo from './data/v-baseInfo.vue';

import VUser from './store/v-user.vue';
import VAuth from './v-auth.vue'


export default {
    name: "v-body",
    components:{
        VAuth,   
        VUser,
        //VRegistr,
        //VBaseInfo,
    },

    data(){
        return{
            user:{},
            isAuth: false,
        };
    },
    methods:{
        new_user(data){      
            this.user = data;
            this.isAuth = true;
        },
    },
    with:{}
}
</script>

<style>

</style>
