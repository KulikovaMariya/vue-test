import { v4 as uuidv4 } from 'uuid';

export default class User {

  constructor ({ name, phoneNumber, supervisorUUID }) {
    this.UUID = User._getUuid()
    this.name = name
    this.phoneNumber = phoneNumber
    this.subordinates = []
    this.supervisorUUID = supervisorUUID
  }

  static _getUuid () {
    return uuidv4()
  }
}
