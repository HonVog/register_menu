<template>
    <div class="v-registr">
        <el-form ref="form" 
        :model="sizeForm" 
        label-width="120px"
         size="mini"
         align="center">
            <h1 >Регистрация пользователя</h1>

            <el-form>
                <el-input 
                placeholder="ФИО"
                v-model="sizeForm.name">
                    <template 
                                slot="prepend">
                        <i class="el-icon-user"></i>
                    </template>
                
                </el-input>
            </el-form>

            <el-form>
                <el-input 
                placeholder="Логин"
                v-model="sizeForm.login">
                    <template 
                                slot="prepend">
                        <i class="el-icon-user-solid"></i>
                    </template>
                
                </el-input>
            </el-form>

            <el-form>
                <el-input 
                type="password"
                placeholder="Пароль"
                v-model="promoPasvord.vvod_1">
                    <template 
                                slot="prepend">
                        <i class="el-icon-key"></i>
                    </template>
                </el-input>
                <el-alert
                    v-show="promoPasvord.vvod_1!==''&&promoPasvord.vvod_2===''"
                    type="error" >{{promoPasvord.info}}
                </el-alert>
            </el-form>

            <el-form>
                <el-input 
                type="password"
                placeholder="Повторите пароль"
                v-model="promoPasvord.vvod_2">
                    <template 
                                slot="prepend">
                        <i class="el-icon-unlock"></i>
                    </template>
                    
                </el-input>
                <el-alert
                    v-show="promoPasvord.vvod_2!==''"
                    type="error" >{{promoPasvord.info}}
                </el-alert>
            </el-form>

            <el-form>
                <el-select 
                v-model="sizeForm.gender"
                 placeholder="Укажите пол">
                    <el-option label="Мужской" value="Мужской"></el-option>
                    <el-option label="Женский" value="Женский"></el-option>
                    <el-option label="Средний" value="Средний"></el-option>
                    <el-option label="Не определеный" value="Не определеный"></el-option>
                </el-select>
            </el-form>

            <el-form>
                <p>Согласие на отправку данных <el-radio value="true" v-model="allGood" border label="Подтвердить"></el-radio></p>
            </el-form>

            <el-form>
                <el-button  @click="onSubmit">Регистрация</el-button>
                <el-button  @click="isBreakTime">Отмена</el-button>
            </el-form>
        </el-form>
    </div>
</template>

<script>

export default {
    name: "v-registr",
     data(){
        return{
            sizeForm: {
                name: '',
                login:'',
                pasvord: '',
                gender: '',
             },
            
            promoPasvord:{
                vvod_1:'',
                vvod_2:'',
                info:"Избегайте простых поролей",
                alert: "error",
            },

            alertInfo:["success", "info", "warning", "error"],

            allGood: false,
            comp: "v-registr",
        };
     },
     
    methods:{
        onSubmit() {
        console.log('submit!');
      },
      
      isBreakTime(){
          this.comp="v-auth";
          this.$emit("breacAuth", this.comp)
      },
    },

    watch:{
        promoPasvord:function(pas){
            if(this.promoPasvord.vvod_1!=''&& this.promoPasvord.vvod_2 ===''){
                if(this.promoPasvord.vvod_1.length > 10){
                    this.promoPasvord.info="Пароль не должен привышать 10 символов";
                }
            }
        }
    },

    props:{},

    components: {}, 
     
}
</script>


<style scoped>

.v-registr{
    margin: 10px;
    width: 400px;
    height: 460px;
    border: 1px solid #0c0c0c;
    padding: 10px 40px;
    background-color:  #315467;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
}

.el-form{
    color: azure;
    margin: 10px 0;

}

.el-form h1{
    padding: auto;
    font-size: 20px;
    margin: 0 0 20px 0; 
    color: aliceblue;
}

.el-button{
    flex-direction: row;
    width:160px;
    height: 50px;
    border: #00B9BC;
    background-color: #00B9BC;
}

.el-form-item{
    color: azure;
}

</style>
