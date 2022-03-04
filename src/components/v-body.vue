<template>
    <div class="v-body">

        <transition name="slide-fade">
            <v-auth 
                @is_user_arr_users="authUser"
                @userRegister="isRegistr"
                v-show="isShowTime=='v-auth'"
            />
        </transition>

        <transition name="slide-fade">
            <v-registr
                @breacAuth="isBreakRegister"
                v-show="isShowTime=='v-registr'"
            />
        </transition>

        <transition name="slide-fade">
            <v-user 
                v-show="isShowTime=='v-user'"
                :this_user="user"
            />
        </transition>

        <!--
        <v-base-info v-else
            :this_user="user"
        />
        -->

        

    </div>
</template>

<script>

//import VBaseInfo from './data/v-baseInfo.vue';

import VUser from './store/v-user.vue';
import VAuth from './v-auth.vue';
import {CookieStorage} from "../BazisConstrukt/BrowserStorageHelpers.js"
import VRegistr from './v-registr.vue';

var cookieStorage = new CookieStorage();


export default {
    name: "v-body",
    components:{
        VAuth,   
        VUser,
        VRegistr,
        //VBaseInfo,
    },

    data(){
        return{
            user:{},
            isAuth: false,
            showComponent:'v-auth',
        };
    },

    props:{
        nameComponent:{
            type: String,
            default(){
                return "v-user";
            }
        }
     },

    methods:{
        authUser(data){ 
            this.user = data;
            this.isAuth = true; 

            cookieStorage.set("user", this.user.name_User, true);
            alert(cookieStorage._getCurrentTypeItem());
        },



        isRegistr(data){
            this.showComponent = data;
        },

        isBreakRegister(data){
            this.showComponent = data;
        }
    },

    computed:{
        isShowTime: function(){
            return this.showComponent;
        }
    },

}


</script>


<style>

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
