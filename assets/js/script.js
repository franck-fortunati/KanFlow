const add = document.getElementById("add")
const toDo = document.getElementById("toDo")
const progress = document.getElementById("progress")
const finish = document.getElementById("finish")
const title = document.getElementById("title")
const description = document.getElementById("description")
const date = document.getElementById("date")
const priority = document.getElementById("priority")
let tasks

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"))

    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i])
        if (tasks[i].status === "toDo") {
            toDo.innerHTML += `
                <div class="toDo" draggable="true" data-id="${tasks[i].id}">
                    <div>
                        <p>Titre :</p>
                        <h3>${tasks[i].title}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${tasks[i].description}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${tasks[i].priority}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${tasks[i].date}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                </div>
            `
        } else if (tasks[i].status === "progress") {
            progress.innerHTML += `
                <div class="progress" draggable="true" data-id="${tasks[i].id}">
                    <div>
                        <p>Titre :</p>
                        <h3>${tasks[i].title}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${tasks[i].description}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${tasks[i].priority}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${tasks[i].date}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                </div>
            `
        } else {
            finish.innerHTML += `
                <div class="finish" draggable="true" data-id="${tasks[i].id}">
                    <div>
                        <p>Titre :</p>
                        <h3>${tasks[i].title}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${tasks[i].description}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${tasks[i].priority}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${tasks[i].date}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                </div>
            `
        }
    }

} else {
    tasks = []
}


if (add) {
    add.addEventListener("click", (event) => {

        let task = {
            id: Date.now(),
            title: title.value,
            description: description.value,
            date: date.value,
            priority: priority.value,
            status: "toDo",
        }

        tasks.push(task)

        localStorage.setItem("tasks", JSON.stringify(tasks))

                toDo.innerHTML += `
                    <div class="toDo" draggable="true" data-id="${task.id}">
                        <div>
                            <p>Titre :</p>
                            <h3>${title.value}</h3>
                            <hr>
                        </div>
                        <div>
                            <p>Description :</p>
                            <p>${description.value}</p>
                            <hr>
                        </div>
                        <div>
                            <p>Priorité :</p>
                            <p>${priority.value}</p>
                            <hr>
                        </div>
                        <div>
                            <p>Date :</p>
                            <p>${date.value}</p>
                            <hr>
                        </div>
                        <div>
                            <button class="buttonChoice">Modifier</button>
                            <button class="delete">Supprimer</button>
                        </div>
                    </div>
                `

    })
}

toDo.addEventListener("click", (event) => {
    if (event.target.classList.contains("buttonChoice")) {

        const modal = document.getElementById("modal")
        let card = event.target.closest(".toDo")
        let id = Number(card.dataset.id)
        let task = tasks.find((task) => task.id === id)

        modal.showModal()

        const save = document.getElementById("save")
        const cancel = document.getElementById("cancel")
        
        if (save) {
            save.addEventListener("click", () => {
                const titre = document.getElementById("titre")
                const desc = document.getElementById("desc")
                const laDate = document.getElementById("laDate")
                const priorite = document.getElementById("priorite")

                task.title = titre.value
                task.description = desc.value
                task.priority = priorite.value
                task.date = laDate.value
                
                card.innerHTML = `
                    <div>
                        <p>Titre :</p>
                        <h3>${titre.value}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${desc.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${priorite.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${laDate.value}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                `
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
        } else if (cancel) {
            cancel.addEventListener("click", () => {
                modal.close()
            })
        } else {
            console.log("erreur CA MARCHE PAS !")
        }
    
        console.log(event.target)

    } else if (event.target.classList.contains("delete")) {

        let card = event.target.closest(".toDo")
        let id = Number(card.dataset.id)

        card.remove()
        tasks = tasks.filter((task) => task.id !== id)
        localStorage.setItem("tasks", JSON.stringify(tasks))

    }
    
})

progress.addEventListener("click", (event) => {
    if (event.target.classList.contains("buttonChoice")) {

        const modal = document.getElementById("modal")
        let card = event.target.closest(".progress")
        let id = Number(card.dataset.id)
        let task = tasks.find((task) => task.id === id)

        modal.showModal()

        const save = document.getElementById("save")
        const cancel = document.getElementById("cancel")
        
        if (save) {
            save.addEventListener("click", () => {
                const titre = document.getElementById("titre")
                const desc = document.getElementById("desc")
                const laDate = document.getElementById("laDate")
                const priorite = document.getElementById("priorite")

                task.title = titre.value
                task.description = desc.value
                task.priority = priorite.value
                task.date = laDate.value
                
                card.innerHTML = `
                    <div>
                        <p>Titre :</p>
                        <h3>${titre.value}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${desc.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${priorite.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${laDate.value}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                `
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
        } else if (cancel) {
            cancel.addEventListener("click", () => {
                modal.close()
            })
        } else {
            console.log("error modal")
        }
    
        console.log(event.target)

    } else if (event.target.classList.contains("delete")) {

        let card = event.target.closest(".progress")
        let id = Number(card.dataset.id)

        card.remove()
        tasks = tasks.filter((task) => task.id !== id)
        localStorage.setItem("tasks", JSON.stringify(tasks))

    }
    
})

finish.addEventListener("click", (event) => {
    if (event.target.classList.contains("buttonChoice")) {

        const modal = document.getElementById("modal")
        let card = event.target.closest(".finish")
        let id = Number(card.dataset.id)
        let task = tasks.find((task) => task.id === id)

        modal.showModal()

        const save = document.getElementById("save")
        const cancel = document.getElementById("cancel")
        
        if (save) {
            save.addEventListener("click", () => {
                const titre = document.getElementById("titre")
                const desc = document.getElementById("desc")
                const laDate = document.getElementById("laDate")
                const priorite = document.getElementById("priorite")

                task.title = titre.value
                task.description = desc.value
                task.priority = priorite.value
                task.date = laDate.value
                
                card.innerHTML = `
                    <div>
                        <p>Titre :</p>
                        <h3>${titre.value}</h3>
                        <hr>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>${desc.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Priorité :</p>
                        <p>${priorite.value}</p>
                        <hr>
                    </div>
                    <div>
                        <p>Date :</p>
                        <p>${laDate.value}</p>
                        <hr>
                    </div>
                    <div>
                        <button class="buttonChoice">Modifier</button>
                        <button class="delete">Supprimer</button>
                    </div>
                `
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
        } else if (cancel) {
            cancel.addEventListener("click", () => {
                modal.close()
            })
        } else {
            console.log("error modal")
        }
    
        console.log(event.target)

    } else if (event.target.classList.contains("delete")) {

        let card = event.target.closest(".finish")
        let id = Number(card.dataset.id)

        card.remove()
        tasks = tasks.filter((task) => task.id !== id)
        localStorage.setItem("tasks", JSON.stringify(tasks))

    }
    
})

function dragStart () {

    document.addEventListener("dragstart", (event) => {

        if (event.target.classList.contains("toDo")) {
            event.target.classList.add("dragging")
        } else if (event.target.classList.contains("progress")) {
            event.target.classList.add("dragging")
        } else if (event.target.classList.contains("finish")) {
            event.target.classList.add("dragging")
        }

    })

}

function dragOver () {

    toDo.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

    progress.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

    finish.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

}

function toDoDrop () {

    toDo.addEventListener("drop", (event) => {
        event.preventDefault()

        const dragging = document.querySelector(".dragging")

        toDo.appendChild(dragging)

        dragging.classList.remove("progress", "finish")
        dragging.classList.add("toDo")

        let id = Number(dragging.dataset.id)
        let task = tasks.find((task) => task.id === id)

        task.status = "toDo"

        localStorage.setItem("tasks", JSON.stringify(tasks))

        console.log(task)

    })
}

function progressDrop () {

    progress.addEventListener("drop", (event) => {
        event.preventDefault()

        const dragging = document.querySelector(".dragging")

        progress.appendChild(dragging)

        dragging.classList.remove("finish", "toDo")
        dragging.classList.add("progress")

        let id = Number(dragging.dataset.id)
        let task = tasks.find((task) => task.id === id)

        task.status = "progress"

        localStorage.setItem("tasks", JSON.stringify(tasks))

        console.log(task)
    })
}

function finishDrop () {

    finish.addEventListener("drop", (event) => {
        event.preventDefault()

        const dragging = document.querySelector(".dragging")

        finish.appendChild(dragging)

        dragging.classList.remove("progress", "toDo")
        dragging.classList.add("finish")

        let id = Number(dragging.dataset.id)
        let task = tasks.find((task) => task.id === id)

        task.status = "finish"

        localStorage.setItem("tasks", JSON.stringify(tasks))

        console.log(task)
    })
}

dragStart()
dragOver()
toDoDrop()
progressDrop()
finishDrop()

document.addEventListener("dragend", () => {
    const dragging = document.querySelector(".dragging")

    if (dragging) {
        dragging.classList.remove("dragging")
    }

})