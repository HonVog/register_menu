import Vue from "vue"
// импортируем саму Vue
import Router from "vue-router" 
// импортируем router

import vBaseInfo from "../components/data/v-baseInfo.vue";
//импартируем компаненты которые планируем использовать

Vue.use(Router);

//создаем сам объек с которым будем работать
let router=new Router( 
    {
        routes: [//аргументом являеться массив объектов
        {
            path: '/', // сами переходы
            name: 'home', //имя по которому мы обращаемся к роуту
            component: vBaseInfo, //компанент который планируем использовать
        }
        ]
    }
);

export default router;

