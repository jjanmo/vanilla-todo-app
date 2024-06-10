let todos = [];
let todoIdCounter = 0;
let filterOption = document.querySelector('.filter .selected').textContent;

const newTodoEl = document.querySelector('.new-todo');
newTodoEl.addEventListener('change', function(event) {
    todos.push({
        name: event.target.value,
        completed: false,
        id: todoIdCounter++,
    })
    console.log(todos);
    newTodoEl.value = "";
    refresh();
});

const filterBtns = document.querySelectorAll('.filter li a');
filterBtns.forEach(function(filterBtn) {
    filterBtn.addEventListener('click', function() {
        filterOption = this.textContent;
        refresh();
    });
});

const toggleAll = document.querySelector('#toggle-all');
toggleAll.addEventListener('change', function() {
    if (this.checked) {
        todos.forEach(todo => {
            todo.completed = true;
        });
    } else {
        todos.forEach(todo => {
            todo.completed = false;
        });
    }
    refresh();
    console.log(todos);
});


function refresh() {
    const todoListEl = document.querySelector('.todo-list');
    todoListEl.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (filterOption == 'All') return true;
        if (filterOption == 'Active') return !todo.completed;
        if (filterOption == 'Completed') return todo.completed;
    });

    filteredTodos.forEach(todoItem => {
        const newTodoItem = document.createElement('li');
        newTodoItem.setAttribute('data-id', todoItem.id);

        if (todoItem.completed) {
            newTodoItem.classList.add('completed');
        } else {
            newTodoItem.classList.remove('completed');
        }

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add('toggle');
        checkbox.checked = todoItem.completed
        checkbox.addEventListener('change', function() {
            let todoId = +this.parentElement.getAttribute('data-id');
            todoItem = todos.find(todo => todo.id === todoId);
            if (this.checked) {
                todoItem.completed = true;
            } else {
                todoItem.completed = false;
            }
            console.log(todos);
            refresh();
        });
        newTodoItem.appendChild(checkbox);

        let label = document.createElement("label");
        label.textContent = todoItem.name;
        label.setAttribute('for', 'toggle')
        label.addEventListener('dblclick', function() {
            const input = document.createElement('input');
            input.classList.add('edit');
            input.type = 'text';
            input.value = todoItem.name;
            input.addEventListener('change', function() {
                todoItem.name = input.value;
                refresh();
            })
            newTodoItem.replaceChild(input, label);
            input.focus();
        });
        newTodoItem.appendChild(label);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("destroy");
        deleteBtn.addEventListener('click', function() {
            let todoId = +this.parentElement.getAttribute('data-id');
            index = todos.findIndex(todo => todo.id === todoId);
            if (index !== -1) {
                todos.splice(index, 1);
            }
            console.log(todos);
            refresh();
        });
        newTodoItem.appendChild(deleteBtn);

        todoListEl.appendChild(newTodoItem);
    });
    
    const itemsLeftCountEl = document.querySelector('.todo-count strong');
    itemsLeftCountEl.textContent = todos.filter(todo => !todo.completed).length;

    filterBtns.forEach(filterBtn => {
        if (filterBtn.textContent === filterOption) {
            filterBtn.classList.add('selected');
        } else {
            filterBtn.classList.remove('selected');
        }
    });

    const completedItems = todos.filter(todo => todo.completed);
    if (todos.length > 0 && completedItems.length === todos.length) {
        toggleAll.checked = true;
    } else {
        toggleAll.checked = false;
    }

    const toggleAllLabel = document.querySelector('.toggle-all-label');
    if (toggleAll.checked) {
        toggleAllLabel.classList.add('checked');
    } else {
        toggleAllLabel.classList.remove('checked');
    }

    const footer = document.querySelector('.todoapp .footer');
    const clearCompletedBtn = document.querySelector('.todoapp .footer>a');
    if (clearCompletedBtn && completedItems.length === 0) {
        footer.removeChild(clearCompletedBtn);
    } else if (!clearCompletedBtn && completedItems.length > 0) {
        const clearCompletedBtn = document.createElement('a');
        clearCompletedBtn.text = "Clear completed";
        clearCompletedBtn.addEventListener('click', function() {
            todos = todos.filter(todo => !todo.completed);
            refresh();
        });
        footer.appendChild(clearCompletedBtn);
    }
}