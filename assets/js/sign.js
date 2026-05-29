const inscription = document.getElementById("inscription")
const connexion = document.getElementById("connexion")
let logs = []

if (localStorage.getItem("logs")) {
    logs = JSON.parse(localStorage.getItem("logs"))
}

if (localStorage.getItem("logged") === true) {
    window.location = "index.html"
}

if (inscription) {
    inscription.addEventListener("click", (event) => {
        const mail = document.getElementById("mail").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value

        logs.push({
            mail: mail,
            password: password,
            confirmPassword: confirmPassword,
        })

        localStorage.setItem("logs", JSON.stringify(logs))
    })
} else {
    connexion.addEventListener("click", (event) => {
        event.preventDefault()

        const mail = document.getElementById("mail").value
        const password = document.getElementById("password").value
        let connect = JSON.parse(localStorage.getItem("logs"))
        
        for(let i = 0; i < connect.length; i++) {
            if (connect[i].mail === mail && connect[i].password === password) {
                localStorage.setItem("logged", true)
                window.location = "index.html"
            } else {
                console.log("false")
            }
        }
    })
}