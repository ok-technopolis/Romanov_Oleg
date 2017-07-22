(function () {

    let TodoMain = TODO_APP.components.TodoMain;
    let AddTodos = TODO_APP.components.AddTodos;
    let TodoList = TODO_APP.components.TodoList;
    let TodoActionsBar = TODO_APP.components.TodoActionsBar;

    function init() {

        let todoMain = new TodoMain();
        let addTodos = new AddTodos();
        let todoList = new TodoList();
        let todoActionsBar = new TodoActionsBar();


        addTodos
            .on('newTodo',
                function (todoData) {
                    todoList.createItem(todoData);
                }
            )
            .on('markAsReadyAll',
                function () {
                    todoList.markAsReadyAll();
                }
            );

        function itemsCountWatcher() {
            let itemsCount = todoList.getItemsCount();

            if (itemsCount !== 0) {
                todoMain.showFullInterface();
            }

            todoActionsBar.setItemsCount(itemsCount);
        }

        todoList.on('itemAdd', itemsCountWatcher)
            .on('itemDelete', itemsCountWatcher);

        todoActionsBar.on(
            'clearCompleted',
            function () {
                todoList.removeCompletedItems();
            }
        );

        todoActionsBar.on('filterSelected', function (filterId) {
            todoList.setFilter(filterId);
        });

    }

    document.addEventListener('DOMContentLoaded', init);
}());