window.addEventListener('load', eventListeners)

function eventListeners() {
    // getAllTodos()
    // getSpecificTodo(3)
    saveNewTodo("Damma")
}

async function getAllTodos() {
   const todos = await makeRequest("/api", "GET")
   console.log(todos)
}

async function getSpecificTodo(id) {
    const todo = await makeRequest("/api/" + id, "GET")
    console.log(todo)
}

async function saveNewTodo(title) {
 
    const body = {
        title: title
    }
    const status = await makeRequest("/api", "POST", body)
    console.log(status)
}

async function makeRequest(url, method, body) {

   const response = await fetch(url, {
        method: method, 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    console.log(response)
    const result = await response.json()
    return result
}