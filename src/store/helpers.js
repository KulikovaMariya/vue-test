function getUserByUUID (users, UUID) {
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

export function sortUsersByField (users, sortingParams) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].subordinates && users[i].subordinates.length > 0) {
      sortUsersByField(users[i].subordinates, sortingParams)
    }
  }
  users.sort(compare(sortingParams))
}

export function updateSortingParams (sortingParams, field) {
  if (sortingParams.field !== field) {
    sortingParams.field = field
    sortingParams.direction = 1
  } else {
    sortingParams.direction *= -1
  }
}

function compare ({ field, direction }) {
  return (a, b) => {
    return ((a[field] ? a[field].toLowerCase() : '') < (b[field] ? b[field].toLowerCase() : '') && -direction) ||
      ((a[field] ? a[field].toLowerCase() : '') > (b[field] ? b[field].toLowerCase() : '') && direction) || 0
  }
}

export function addUserAndSort(users, newUSer, sortingParams) {
  let usersList
  if (newUSer.supervisorUUID) {
    const supervisor = getUserByUUID(users, newUSer.supervisorUUID)
    if (supervisor) {
      supervisor.subordinates.push(newUSer)
      usersList = supervisor.subordinates
    } else {
      throw new Error(`Supervisor ${newUSer.supervisorUUID} not found`)
    }
  } else {
    users.push(newUSer)
    usersList = users
  }

  if (sortingParams.field) {
    usersList.sort(compare(sortingParams))
  }
}

export function getUsersFlatList (usersList) {
  const list = []

  function _getUsersFlatList (users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].subordinates && users[i].subordinates.length > 0) {
        _getUsersFlatList(users[i].subordinates)
      }
      list.push({name: users[i].name, UUID: users[i].UUID})
    }
  }

  _getUsersFlatList (usersList)
  return list
}
