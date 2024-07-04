export const Check = (id, completed) => {
    return dispatch => {
        dispatch({type: 'check/load/start'})

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                completed: !completed
            })
        })
        .then((responce) => responce.json())
        .then(() => {
            dispatch({
                type: ''
            })
        })
    }
}