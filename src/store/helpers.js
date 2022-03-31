export function getUserByUUID (users, UUID) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].UUID === UUID) {
      return users[i]
    } else if (users[i].subordinates && users[i].subordinates.length > 0) {
      return  getUserByUUID(users[i].subordinates, UUID)
    }
  }
}
