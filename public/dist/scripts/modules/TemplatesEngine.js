(function () {

    let div = document.createElement('div');

    function getTemplateRootNode(scriptId) {
        let scriptTag = document.getElementById(scriptId);
        div.innerHTML = scriptTag.innerHTML;
        let result = div.children[0];
        div.removeChild(result);
        return result;
    }

    TODO_APP.modules.templatesEngine = {
        todoItem: function (data) {
            let root = getTemplateRootNode('todoItemTemplate');

            let markReady = root.querySelector('.js-todo-item_mark-ready');
            let removeAction = root.querySelector('.js-todo-item_remove-action');
            let text = root.querySelector('.js-todo-item_text');

            if (data.text) {
                text.innerText = data.text;
            }

            if (data.isReady) {
                markReady.checked = true;
            }

            return {
                root: root,
                text: text,
                markReady: markReady,
                removeAction: removeAction
            };
        }
    }

}());