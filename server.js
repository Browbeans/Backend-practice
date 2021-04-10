const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000

const todos = [
    {
        id: 1, 
        title: "Städa"
    },
    {
        id: 2, 
        title: "Handla"
    },
    {
        id: 3, 
        title: "Skotta"
    },
]


app.use(express.static('./public'))
app.use(express.json())


app.get("/api", (req, res) => {
    res.json(todos)
})

app.get("/api/:id", (req, res) => {
    const id = req.params.id
    const foundTodo = todos.find((todo) => {
        return todo.id == id
    })
    if(foundTodo === undefined) {
        res.json({"error": "Detta id finns ej prova med 1, 2 eller 3"})
    }
    res.json(foundTodo)
})

app.post("/api", (req, res) => {
    if(!req.body.title) {
        res.json({"Error": "Titel finns ej"})
        return
    }
    const titleToSave = req.body.title
    let idToSave = 0
    todos.forEach((todo) => {
        if(todo.id > idToSave) {
            idToSave = todo.id
        }
    })
    idToSave++
    
    todos.push({
        id: idToSave, 
        title: titleToSave
    })

    res.json({
        status: "Ny Todo sparad",
        todos
    })
})

app.listen(port, () => { console.log('app is running on port ' + port) })