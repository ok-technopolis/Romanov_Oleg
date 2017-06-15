// Крайне простая реализация (костыли приличные)
// А до какого числа надо сдать полностью работу?
document.addEventListener('DOMContentLoaded', function () {

        var selectAll = document.querySelector('.js-todos-select-all');
        var todoSelectAll = new TodoSelectAll(selectAll);
        todoSelectAll.activate();

        var input = document.querySelector('.todo-add_input');
        var list = document.querySelector('.todo-list');
        var itemsLeft = document.getElementsByClassName('js-todos-actions-bar_counter')[0];

        var counter = new Counter(itemsLeft);
        var addTodo = new AddTodo(input, counter, list);

        var showAll = document.getElementsByClassName('filter')[0];
        var completed = document.getElementsByClassName('filter')[2];
        var active = document.getElementsByClassName('filter')[1];
        var clearCompleted = document.querySelector('.js-todos-actions-bar_clear-completed');

        var todoActionBar = new TodoActionBar(completed, active, clearCompleted, counter, showAll);

    }
);
