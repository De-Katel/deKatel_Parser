import { USERS_ACTIONS } from "../actions/usersActions";

const initialState = {
   user: {
      role: 'Admin',
      userCard: {},
      token: null
   }
}

const usersRreducer = (state = initialState, action) => {
   switch (action.type) {

      case USERS_ACTIONS.LOGOUT:
         return {
            ...state,
            user: {
               role: null,
               userCard: null,
               token: null
            }                            //разлогинился
         }

      // авторизациz пользователя
      case USERS_ACTIONS.FETCH_AUTH_USER_SUCCESS:
         return {
            ...state,
            user: {
               role: 'Admin',
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
         }

      default: return state;
   }
}
export default usersRreducer;

