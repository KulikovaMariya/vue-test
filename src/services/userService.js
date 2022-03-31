import {store} from "../store";

export default class UserService {
  // TODO: сделать без внутренней функции
  static getUsersFlatList () {
    const list = []

    function _getUsersFlatList (users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].subordinates && users[i].subordinates.length > 0) {
          _getUsersFlatList(users[i].subordinates)
        }
        list.push({name: users[i].name, UUID: users[i].UUID})
      }
    }

    _getUsersFlatList (store.getters.users)
    return list
  }
}
