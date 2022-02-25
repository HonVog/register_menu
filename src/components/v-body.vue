<template>
    <div class="v-body">

        <v-registr 
            @is_user_arr_users="new_user"

            v-if="is_got_user"
            
        />
        
        <div v-else>Привет пользователь</div>


    </div>
</template>

<script>

import VRegistr from './v-registr.vue'

export default {
    name: "v-body",
    components:{
        VRegistr,
    },

    data(){
        return{
            user:{},
        };
    },

    methods:{
        new_user(data){
            this.user = data;
        },

        is_got_user()
        {
            console.log("Работает?")

            if (user.new_user != "" && user.pasvord_User !=""){
                return true;
            }
            else{
                return false;
            }
        },
    },

    with:{}

}
</script>


<style scoped>
</style>
