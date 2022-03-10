# Базовый чтоб не косячить раздел 5.
![id](https://images.universe.com/3ec98038-5c4f-4c14-9f38-3975ea9027af/-/progressive/yes/-/inline/yes/)
* суть в том что, здесь пропишим что и чем являеться поможет понимать процессы


## Продолжение раздела 4 а значит и всего прописонного там кода
### В этой части мы попробуем подсоединить такие веселые вещи как Vue Router,  VueX, axios
1. Vue Router позволит обеспечить конфортный переход между компанентами. Подробно в [Vue Router](https://v3.router.vuejs.org/ru/installation.html)
2. VueX это своего рода данные которые не превязаны к компаненту и обладают реактивностью. Подробно [VueX](https://v3.vuex.vuejs.org/ru#что-такое-«паттерн-управления-состоянием»)
3. axios необходим для доступа к API, будем пользоваться для работы с jeson, подробнее про [axios](https://github.com/axios/axios)
### Шаг 1. Подготовка и установка
* Запустить Vue Router и VueX помжно как отдельно через скрипты или установить пакетом
1. Через скрипты
```js
// это пример с вымышлиным путем для запуска VueX
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>

//это пример с вымышленым путем для Vue Router
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

//это пример с axios
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
2. Через пакеты  NPM
```
// VueX
npm install vuex@next --save

// Vue Router
// 4 версия прописана на сайте но оне не работает с 2 версией vue меняем циферку на 3
npm install vue-router@4 
// axios
npm install axios
```
3. Прописать в package.json

```js
"dependencies": {
    "axios": "^0.26.0",
    "core-js": "^3.6.5",
    "element-ui": "^2.15.6",
    "typescript": "^4.6.2",
    "vue": "^2.6.11",
    "vue-router": "^3.5.3",
    "vuex": "^3.1.2"
  },

  // затем в терминале подтянуть зависимости
  npm install
```
* Создадим две папки под router и vuex назваем их аналогично и создаем там фаилы с аналогичным названием разрешение .js
### Шаг 2. Работа с Vue Router
1. Папка router фаил router.js
```js
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
// экспартуруем  объект
```
2. Папка src фаил main.js
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import router from './router/router' // импортируем

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router                          //подключаем
}).$mount('#app')
```
### Шаг 3. Работаем с VueX
1. В паке vuex фаил vuex.js
```js
import Vue from "vue"
// импортируем vue
import Vuex from "vuex"
//импортируем vuex

//подключаем vuex к vue 
Vue.use(Vuex);

// создаем объект нашей общей области видимости
const store = new Vuex.Store({
    state:{},//здесь храним наши объекты вернее их состояние(прямого доступа к объекту мы не имеем)
    mutations:{},//здесь храняться мутации объекта, с помошью их мы релизуем изменения состоянии объекта

    actions:{}, //здесь интереснее действия инициируют мутацию, 
    /*дело в том что мутации синхроны а действия асинхроны
     вызов мутации несколько раз подряд может вызвать цепочку вызова где последовательность не контролируема*/
    getters:{} //здесь мы получаем значение внутри state только даные без возможности их менять
    }
)
export default store;
```
2. В папке src фаил main.js
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router'

import store from './vuex/vuex' // импортируем


Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, 
  store                     // подключаем
}).$mount('#app')
```
### axios уже установлен и отсалось установить такую вещь как jeson-server, подробнее [jeson-server](https://github.com/typicode/json-server)
1. Скачиваем jeson-server 
```
npm install -g json-server

// возможно придеться прописать в начале sudo для запуска от имени администратора
```
2. Создаем фааил в котором будем хранить даные через json-server
```
json-server --watch db.json
//принято назвать фаил db но нас никто не ограничивает в творчестве
```
#### ! ВАЖНО ! Командой выше мы не только создали подобие бд, но и сказали json-server следить за этим файлом обязательно прописываем перед запуском проекта
* После этой команды в нашем проекте должен появиться фаил db.json найти не сложно он в основании проекта
> по умолчанию в db.json будет своего рода макет даных, цепляться к нему не обязательно, пользуемся как стандартным JESON
* терминале появиться что-то вроде 
```
\{^_^}/ hi!
  Resources
  http://localhost:3000/posts
  http://localhost:3000/comments
  http://localhost:3000/profile

  Home
  http://localhost:3000 
```
> если перейти по ссылки мы увидим содержимое первого компанента db
3. Подготовим легкий макет внутри db.jeson
```json
{
  "UserBazis":[{
      "id": 1,
      "name": "",
      "login": "",
      "pasvord":"",
      "postId": 1
    }
  ],
  "UserDataBase":[{
    "id": 0,
    "name": "Admin",
    "login": "Admin",
    "pasvord":"zis1pasvord",
    "postId": 0
    }
  ]
}
```
## Соредотачиваемся на прописывании функционала VueX который в наших планах взаимодействует с db



Vue Router и VueX
### Прописываем задачу для дальнейшей реализации:
1. Через VueX релизовать передачу запросов пользователя а так же его данных между компанентами
> В heder передаем логип пользователя и информацию что он авторизован или нет (дальнейший функционал по мере апетитов)
2. Через Vue Router организуем переход на страницу пользователя и другие переходы по страницам
#### Решение первой задачи
* Переходим в папку vuex и фаил vuex.js













