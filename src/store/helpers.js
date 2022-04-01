export function getUserByUUID (users, UUID) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].UUID === UUID) {
      return users[i]
    }
    if (users[i].subordinates && users[i].subordinates.length > 0) {
      getUserByUUID(users[i].subordinates, UUID)
    }
  }
}

export function sortUsersByField (users, field) {

  for (let i = 0; i < users.length; i++) {
    if (users[i].subordinates && users[i].subordinates.length > 0) {
      sortUsersByField(users[i].subordinates, field)
    }
  }

  users.sort((user1, user2) => {
    if (user1[field].toLowerCase() > user2[field].toLowerCase()) {
      return 1;
    }
    if (user1[field].toLowerCase() < user2[field].toLowerCase()) {
      return -1;
    }
    return 0;
  })
}
