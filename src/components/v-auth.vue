<template>
    <div class="v-auth" >
        <el-form>
            <h1 align="center">Авторизация на сайте</h1>
            <el-form-item >            
                <el-input type="text"
                            placeholder="Имя пользователя" 
                            v-model="this_User.name_User" 
                            
                >
                    <template 
                                slot="prepend">
                        <i class="el-icon-s-custom"></i>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-input type="password"
                             placeholder="Пароль"
                              v-model="this_User.pasvord_User" 
                              
                >
                    <template
                                slot="prepend">
                        <i class="el-icon-unlock"></i>
                    </template>
                </el-input>
            </el-form-item>
            <div align="center">
            <el-button type="primary" @click="is_Users">Авторизироваться</el-button>
            <el-button type="primary" @click="isRegistr">Регистрация</el-button>
            </div>
        </el-form>
    </div>
    
</template>

<script>

export default {
    name: "v-auth",
     data(){
        return{
            this_User:{
                name_User:"",
                pasvord_User:"",
            },

            comp:"v-auth",
        }
            
     },

    props:{},

    methods:{
        is_Users(){
            this.$emit("is_user_arr_users", this.this_User);
        },

        isRegistr(){
            this.comp='v-registr';
            this.$emit("userRegister", this.comp);
        }
    },

    watch:{
    },
}
</script>


<style>
.v-auth{
    margin: 10px;
    width: 400px;
    height: 260px;
    border: 1px solid #0c0c0c;
    padding: 10px 40px;
    background-color:  #315467;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
}
.el-form h1{
    padding: auto;
    font-size: 20px;
    margin: 0 0 40px 0; 
    color: aliceblue;
}
.el-button{
    width: 195px;
    height: 50px;
    border: #00B9BC;
    background-color: #00B9BC;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
