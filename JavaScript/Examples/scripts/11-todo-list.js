let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'make dinner',
    dueDate: '2024-12-29'
}, {
    name: 'wash clothes',
    dueDate: '2024-12-29'
}];

renderTodoList();

function renderTodoList(){
    let todoListHTML = '';

    for(let i = 0; i < todoList.length; i++){
        let todoObject = todoList[i];
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        let html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
                todoList.splice(${i},1)
                renderTodoList();
                saveToStorage();
            " class="js-delete delete">Delete</button>
        `;
        todoListHTML += html;
    }
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo(){
    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js-due-date');
    const dueDate = dateInputElement.value;
    todoList.push({
        name: name,
        dueDate: dueDate
});
    inputElement.value = '';

    renderTodoList();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('todoList',JSON.stringify(todoList));
}