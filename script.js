const ul = document.querySelector('.tasks-list')
const inputAddTask = document.querySelector('.add-tasks')
const buttonAdd = document.querySelector('.btn-add')

let tasksList;

const localStorageTasks = JSON.parse(localStorage.getItem("data"))

const showTask = () => {
  tasksList = localStorage.getItem("data") !== null ? localStorageTasks : []
  init()
}

const init = () => {
  ul.innerHTML = ""

  tasksList.forEach(createTask);
}

buttonAdd.addEventListener('click', () => {
  if(inputAddTask.value == '') {
    return alert("Você precisa colocar um nome para adicionar uma tarefa")
  }

  const createId = Math.round(Math.random() * 1000)

  const task = {
    name: inputAddTask.value,
    id: createId
  }

  
  tasksList.push(task)
  save()
  init()
})

const createTask = task => {
  const li = document.createElement("li")

  li.innerHTML = `
    <span>${task.name}</span>
    <button class="btn-remove" onClick="removeTask(${task.id})">x</button>
  `

  ul.append(li)
  inputAddTask.value = ''
}

ul.addEventListener("click", e => {
  if(e.target.tagName == "LI") {
    e.target.classList.toggle("checked")
  }
})

const removeTask = ID => {
  tasksList = tasksList.filter(task => task.id !== ID)
  save()
  init()
}

const save = () => {
  localStorage.setItem("data", JSON.stringify(tasksList))
}


showTask()


