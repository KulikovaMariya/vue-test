export function getUserByUUID (users, UUID) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].UUID === UUID) {
      return users[i]
    }
    if (users[i].subordinates && users[i].subordinates.length > 0) {
      const user = getUserByUUID(users[i].subordinates, UUID)
      if (user) {
        return user
      }
    }
  }
}

export function sortUsersByField (users, field, sortDirection) {

  for (let i = 0; i < users.length; i++) {
    if (users[i].subordinates && users[i].subordinates.length > 0) {
      sortUsersByField(users[i].subordinates, field, sortDirection)
    }
  }
  users.sort(compare(field, sortDirection))
}

// TODO упростить функцию
export function compare (field, sortDirection) {
  let direction = 1
  if (sortDirection === -1) {
    direction = -1
  }
  return (a, b) => {
    return ((a[field] ? a[field].toLowerCase() : '') < (b[field] ? b[field].toLowerCase() : '') && -direction) ||
      ((a[field] ? a[field].toLowerCase() : '') > (b[field] ? b[field].toLowerCase() : '') && direction) || 0
  }
}
