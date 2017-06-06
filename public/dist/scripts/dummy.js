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
        var templateResult = templates.item({
            text: text
        });

        list.appendChild(templateResult.root);

        templateResult.deleteLink.addEventListener(
            'click',
            function (e) {
                e.preventDefault();
                var item = templateResult.root;
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
                deleteLink: deleteLink
            };
        }
    };

});

