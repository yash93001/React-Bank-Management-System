export function startLoadingUsers() {
    return (dispatch) => {
        return fetch("https://react-bank-system.herokuapp.com/api/users").then(res => res.json()).then((result) => {
           dispatch(loadUsers(result))
        }).catch((error) => {
            
        })
    }
}

export function startAddingUser(user) {
    return (dispatch) => {
        return fetch("https://react-bank-system.herokuapp.com/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          }).then(() => {
            dispatch(addUser(user))
        }).catch((error) => {
            
        })
    }
} 

export function startAddingLoan(dupCurrentUser,index,id) {
    return (dispatch) => {
        return fetch("https://react-bank-system.herokuapp.com/api/users/" + id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dupCurrentUser)
          }).then(() => {
            dispatch(addLoan(dupCurrentUser,index))
        }).catch((error) => {
            
        })
    }
}

export function loadUsers(users) {
    return {
        type: 'LOAD_USERS',
        users: users
    }

}


export function addUser(user) {
    return {
        type: 'ADD_USER',
        user: user
    }
}

export function addLoan(updatedUser,index){
    return {
        type: 'ADD_LOAN',
        index: index,
        updatedUser : updatedUser
    }
}