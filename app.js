//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector(".filter-todo")

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)


todoInput.addEventListener('keydown',()=>{
    document.getElementById("error").innerText=""
})


//Functions
function addTodo(event){
    //prvent frm form submitting
    event.preventDefault()
    if(todoInput.value.length==0){
        document.getElementById("error").innerText="please enter any task"
    }else{
    

    //creating div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    //creating li
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //Add todo to localstorage
    saveLocalTodos(todoInput.value)

    //check marking bttn
    const completedButton=document.createElement("button")
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //check DELETE bttn
    const trashButton=document.createElement("button")
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //append to list
    todoList.appendChild(todoDiv )
    //clear todo input value
    todoInput.value=""
    
}
}

function deleteCheck(e){
    const item=e.target;
    //Delete todo
    if(item.classList[0]==="trash-btn"){
        // item.remove()
        const todo =item.parentElement;
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function(){
            console.log("deleted")
            todo.remove();
        })
        
    }
    //check mark todo
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle('completed')
    }
}
function filterTodo(e){
    const todos=todoList.childNodes;
   todos.forEach(function(todo){
    if(todo.nodeType==Node.ELEMENT_NODE){
    switch(e.target.value){
        case "all":
            todo.style.display='flex';
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display='flex';
            }else{
                todo.style.display="none";
            }
            break;
        case "uncompleted":
            if(todo.classList.contains('completed')){
                todo.style.display='none'
            }
            else{
                todo.style.display="flex"
            }
            break;
        }
    }
   })

}
function saveLocalTodos(todo){
    // chechk--- do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function getTodos(){

     // chechk--- do I already have any  thing in there?
     let todos;
     if(localStorage.getItem('todos')===null){
         todos=[];
     }else{
         todos=JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
        //creating div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    //creating li
    const newTodo=document.createElement("li");
    newTodo.innerText=todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    

    //check marking bttn
    const completedButton=document.createElement("button")
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    //check DELETE bttn
    const trashButton=document.createElement("button")
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //append to list
    todoList.appendChild(todoDiv )

     })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf('2'))
}