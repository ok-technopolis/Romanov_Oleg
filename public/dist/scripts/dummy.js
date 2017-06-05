document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('.todo-add_input');
    var addButton = document.getElementsByClassName('action_target')[0];
    var list = document.querySelector('.todo-list');
    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            processingInput();
        }
    });
    addButton.addEventListener('click', processingInput);
    function processingInput() {
        var text = input.value.trim();
        if (text.length !== 0) {
            input.value = '';
            addItem(text);
        }
    }

    function addItem(text) {
        list.insertAdjacentHTML(
            'beforeend',
            '<div class="todo-item">' +
            '<div class="input-checkbox todo-item_ready-checker">' +
            '<input type="checkbox"' +
            ' class="input-checkbox_target js-todo-item_mark-ready"' +
            ' aria-label="Пометить как выполненное"/>' +
            '<div class="input-checkbox_visual"></div>' +
            '</div>' +
            '<div class="action todo-item_remove-action">' +
            '<div class="action_visual"></div>' +
            '<button class="action_target js-todo-item_remove-action" aria-label="Удалить todo"></button>' +
            '</div>' +
            '<div class="todo-item_text-w">' +
            '<div contentEditable="true" class="todo-item_text">' + text + '</div>' +
            '</div>' +
            '</div>');

        var removeItems = list.querySelectorAll('.js-todo-item_remove-action');
        removeItems[removeItems.length - 1].addEventListener(
            'click',
            function (e) {
                e.preventDefault();
                var item = this.closest('.todo-item');
                item.parentNode.removeChild(item);
            }
        );

        var completeItems = list.querySelectorAll('.js-todo-item_mark-ready');
        completeItems[completeItems.length - 1].addEventListener(
            'click',
            function (e) {
                e.preventDefault();
                var item = this.closest('.todo-item');

                if (item.className === 'todo-item') {
                    item.className += ' __ready';
                } else {
                    item.className = 'todo-item';
                }
            }
        );
    }

});
