document.addEventListener('DOMContentLoaded', function () {

        var input = document.querySelector('.todo-add_input');
        var addButton = document.getElementsByClassName('action_target')[0];
        var list = document.querySelector('.todo-list');
        input.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                processingInput();
            }
        });

        var selectAll = document.querySelector('.js-todos-select-all');
        selectAll.addEventListener('click', function (e) {
            e.preventDefault();

            var hidden = document.getElementsByClassName('todo-item');
            var badMoves = document.getElementsByClassName('input-checkbox_target');

            var size = hidden.length;
            for (var i = 0; i < size; i++) {
                hidden[i].classList.add("__ready");
                badMoves[i].checked = true;
            }
        });


        var active = document.getElementsByClassName('filter')[1];
        active.addEventListener('click', function (e) {
            e.preventDefault();

            fixHidden();

            active.classList.add("__active");
            showAll.classList.remove("__active");
            completed.classList.remove("__active");


            var hidden = document.getElementsByClassName('__ready');
            var size = hidden.length;
            for (var i = 0; i < size; i++) {
                hidden[i].classList.add("__hide");
            }
        });

        var completed = document.getElementsByClassName('filter')[2];
        completed.addEventListener('click', function (e) {
            e.preventDefault();

            fixHidden();

            completed.classList.add("__active");
            showAll.classList.remove("__active");
            active.classList.remove("__active");

            var hidden = document.getElementsByClassName('todo-item');
            var size = hidden.length;

            var uncompletedItems = [];
            var j = 0;
            for (var i = 0; i < size; i++) {
                if (!hidden[i].classList.contains("__ready")) {
                    uncompletedItems[j++] = hidden[i];
                }
            }

            for (i = 0; i < j; i++) {
                uncompletedItems[i].classList.add("__hide");
            }
        });

        var fixHidden = function () {
            var hidden = document.getElementsByClassName('todo-item __ready __hide');
            var size = hidden.length;
            for (var i = 0; i < size; i++) {
                hidden[0].classList.remove("__hide");
            }

            hidden = document.getElementsByClassName('todo-item __hide');
            size = hidden.length;
            for (var j = 0; j < size; j++) {
                hidden[0].classList.remove("__hide");
            }
        };

        var showAll = document.getElementsByClassName('filter')[0];
        showAll.addEventListener('click', function (e) {
            e.preventDefault();

            showAll.classList.add("__active");
            completed.classList.remove("__active");
            active.classList.remove("__active");


            fixHidden();
        });

        var clearCompleted = document.querySelector('.js-todos-actions-bar_clear-completed');
        clearCompleted.addEventListener('click', function (e) {
            e.preventDefault();

            var items = document.getElementsByClassName('todo-item __ready');
            var size = items.length;
            for (var i = 0; i < size; i++) {
                items[0].parentNode.removeChild(items[0]);
                counter.dec();
            }

        });

        var itemsLeft = document.getElementsByClassName('js-todos-actions-bar_counter')[0];
        var counter = new TodoActionsBarCounter(itemsLeft);
        counter.set(0);


        clearCompleted.addEventListener('click', function (e) {
            e.preventDefault();

            var items = document.getElementsByClassName('todo-item __ready');
            var size = items.length;
            for (var i = 0; i < size; i++) {
                items[0].parentNode.removeChild(items[0]);
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

            counter.inc();

            var templateResult = templates.item({
                text: text
            });

            list.appendChild(templateResult.root);

            templateResult.deleteLink.addEventListener(
                'click',
                function (e) {
                    counter.dec();
                    e.preventDefault();
                    var item = templateResult.root;
                    item.parentNode.removeChild(item);
                }
            );

            templateResult.completeLink.addEventListener(
                'click',
                function (e) {
                    var item = this.closest('.todo-item');

                    if (item.className === 'todo-item') {
                        item.classList.add("__ready");
                    } else {
                        item.classList.remove("__ready");
                    }
                }
            );
        }

        var templates = {
            item: function (data) {
                var item = document.createElement('div');
                item.className = 'todo-item';

                var inputCheckboxWrapper = document.createElement('div');
                inputCheckboxWrapper.className = 'input-checkbox todo-item_ready-checker';

                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.className = "input-checkbox_target";

                var checkboxVisual = document.createElement('div');
                checkboxVisual.className = 'input-checkbox_visual';

                inputCheckboxWrapper.appendChild(checkbox);
                inputCheckboxWrapper.appendChild(checkboxVisual);
                item.appendChild(inputCheckboxWrapper);

                var removeWrapper = document.createElement('div');
                removeWrapper.className = 'action todo-item_remove-action';

                var actionVisual = document.createElement('div');
                actionVisual.className = 'action_visual';

                var deleteLink = document.createElement('button');
                deleteLink.className = 'action_target js-todo-item_remove-action';

                removeWrapper.appendChild(actionVisual);
                removeWrapper.appendChild(deleteLink);
                item.appendChild(removeWrapper);

                var textWrapper = document.createElement('div');
                textWrapper.className = 'todo-item_text-w';

                var text = document.createElement('div');
                text.className = 'todo-item_text';
                text.contentEditable = true;
                text.appendChild(document.createTextNode(data.text || ''));

                textWrapper.appendChild(text);
                item.appendChild(textWrapper);

                return {
                    root: item,
                    deleteLink: deleteLink,
                    completeLink: inputCheckboxWrapper
                };
            }
        };
    }
);
