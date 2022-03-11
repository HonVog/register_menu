import Vue from "vue"
import Vuex from "vuex"
import axios from "axios" // импортируем axios


Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isAuth: false,
        user:{
            id: 1,
            name:"",
            login:"",
            pasvord:"",
            forKey: "",    
        },
        UserBase:[],
        userImput:{} //пока пустой компанентю ОТКУДЫ Я ЗНАЮ ЗАЧЕМ! ВОТ ХОТСЯ.
    },
    mutations:{
        USER_AUTH:(state)=>{
             state.isAuth = true;
        },
        SET_USER_NAME:(state, name )=>{ 
            state.user.name = name; 
        },
        SET_USER_LOGIN:(state, login)=>{
            state.user.login = login; 
        },
        SET_USER_PASVORD:(state, pasvord)=>{ 
            state.user.pasvord = pasvord; 
        },
        SET_USER_KEY:(state)=>{
            state.user.id = new Date.getTime();
            state.user.forKey = '%'+state.user.login +'%' + state.user.id;
        },
        SET_USER_DATA_BASE:(state, UserBase)=>{ 
            state.UserBase = UserBase; 
        },
        PUSH_USER_DATA_BASE:(state, user)=>{
            state.UserBase.push(user);
        }
    },
    actions:{
       /* GET_USERS_BASE_API:({commit})=> // {commit} можно заменить на переменую ctx и обращаться к комит через ctx.commit
        {
            return axios('http://localhost:3000/UserBazis', { method:'GET' })
            // здесь мы условно говорим взять из нашей db объект UserBase 
            // точнее используя фейк-API мы будем при GET запросах использовать объект UserBase
            .then((UserBase)=>{
                commit('SET_USER_DATA_BASE', UserBase.data);
                return UserBase;
            }) //записываем что мы примерно ожидаим во время исполнения
            .catch((error)=>{
                console.log("Woops!\n "+ error)
            }) //ловим на ошибки
        }*/
    },
    getters:{// это гетеры но будем пользоваться ими как константами
        USER_NAME:(state)=>{ state.user.name; },
        USER_LOGIN:(state)=>{ state.user.login; },
        USER_PASVORD:(state)=>{ state.user.pasvord; },
        IS_AUTH:(state)=>{ state.user.isAuth; },
        USERS_BASE:(state)=>{ state.UserBase; },
        LENGTH_USERS_BASE:(state)=>{ state.UserBase.length; }
    }
});

export default store;