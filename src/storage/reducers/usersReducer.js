import { USERS_ACTIONS } from "../actions/usersActions";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {
   role: '',
   userName: '',
   userCard: {},
   token: JSON.parse(sessionStorage.getItem('token')) || null
}

const usersRreducer = (state = initialState, action) => {
   switch (action.type) {

      case USERS_ACTIONS.LOGOUT:
         return {
            ...state,
            role: '',
            userName: '',
            userCard: {},
            token: null                       //разлогинился
         }

      // авторизациz пользователя
      case USERS_ACTIONS.FETCH_AUTH_USER_SUCCESS:
         return {
            ...state,
            role: action.role,
            userName: action.userName,
            userCard: {
               Address: "ул. Спасателей, д.3",
               Catalogs: [],
               Categories: (4)['Лифты грузовые', 'Лифты пассажирские', 'Прочее грузоподъемное оборудование', 'Прочие запчасти для складской техники'],
               Company: "Руспромаппаратура",
               Description: "Компания РПА обладает уникальной возможностью по изготовлению пластиковых деталей малыми и средними сериями. Парк станков  ЧПУ, литейные машины,металлообрабатывающие станки позволяют нам выпускать продукцию для разных заказчиков, а также самим производить пресс-формы для отливки деталей. Льем тэп (термоэластопласт ), полипропилен. В детали могут быть залиты закладные элементы.",
               Direction: "Производство пластиковых деталей",
               Employ_number: null,
               Entity: "2015",
               Facebook: null,
               INN: 5040082190,
               Instagram: null,
               KPP: 504001001,
               Locality: "Жуковский",
               OGRN: 1155040002260,
               Post: "tee@rpa-plast.ru",
               Products: [],
               Region: "Московская область",
               Status: "Действующая организация",
               Telephone: "915 062 05 51",
               URL: "http://rpa-plast.ru/",
               VK: null,
               Youtube: null,
               id: 30,
               id_company: 21468
            },
            token: action.token
         }

      default: return state;
   }
}

const persistConfig = {
   key: 'users',
   storage: storage,
   blacklist: ['token'],
   stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

export default persistReducer(persistConfig, usersRreducer);
