// Model
            // If local storage does not have anything use this default array
            let todos;

            // retreive from local storage
            const savedToDos = JSON.parse(localStorage.getItem('todos'));
            // check if the saved data is an array
            if(Array.isArray(savedToDos)){
                todos = savedToDos;
            } else{
                todos = [];
            }

            
            
            render();

            // creates a todo
            function createToDo(title, dueDate){
                const id = '' + new Date().getTime(); // id is a string

                todos.push({
                    title: title,
                    dueDate: dueDate,
                    id: id
                });
                saveToDos();

            }

            // deletes a todo
            function removeToDo(idToDelete){
                todos = todos.filter(function(todo){
                    if(todo.id == idToDelete){
                        return false;
                    }
                    return true;
                });

                saveToDos();

            }

            function saveToDos(){
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            // Controller 
            function addToDo() {
                let textbox = document.getElementById('todo-title');
                let title = textbox.value;

                const datePicker = document.getElementById('date-picker');
                const dueDate = datePicker.value;

                createToDo(title, dueDate);
                render();
            }

            function deleteToDo(event){
                const deleteButton = event.target;
                const idToDelete = deleteButton.id;
                
                removeToDo(idToDelete);
                render();

            }


            // View
            function render(){

                // reset our list - erase what was there
                document.getElementById('todo-list').innerHTML = '';

                todos.forEach(function (todo){

                    let box = document.createElement('input');
                    box.type= 'checkbox';
                    box.style='margin-right: 12px', 'border-radius: 80px';

                    let element = document.createElement('div');
                    element.innerText = todo.title + ' ' + todo.dueDate;
                    element.prepend(box);

                    // delete button 
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.style = 'margin-left: 12px';
                    deleteButton.onclick = deleteToDo;
                    deleteButton.id = todo.id;
                    element.appendChild(deleteButton);
                    
                    let toDoList = document.getElementById('todo-list');
                    toDoList.appendChild(element);

                });
            }

            