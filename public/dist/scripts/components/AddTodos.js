(function () {
    let extendConstructor = TODO_APP.utils.extendConstructor;
    let Eventable = TODO_APP.modules.Eventable;

    const ENTER_KEY_CODE = 13;

    const TODOS_TODO_INPUT_SELECTOR = '.js-todos-todo-input';
    const TODOS_SELECT_ALL_SELECTOR = '.js-todos-select-all';

    /**
     * @implements {EventListener}
     * @extends {Eventable}
     * @constructor
     */
    function AddTodosConstructor() {
        this._todoInput = document.querySelector(TODOS_TODO_INPUT_SELECTOR);
        this._todoSelectAll = document.querySelector(TODOS_SELECT_ALL_SELECTOR);

        this._todoInput.addEventListener('keypress', this);
        this._todoSelectAll.addEventListener('click', this);

        this._initEventable();
    }

    extendConstructor(AddTodosConstructor, Eventable);


    AddTodosConstructor.prototype._markAsReadyAll = function () {
        return this.trigger('markAsReadyAll');
    };

    AddTodosConstructor.prototype._addItem = function () {
        let todoInputValue = this._todoInput.value.trim();

        if (todoInputValue.length !== 0) {
            this._todoInput.value = '';
        }

        return this.trigger('newTodo', {
            text: todoInputValue
        });
    };

    AddTodosConstructor.prototype.handleEvent = function (e) {
        switch (e.type) {
            case 'click':
                this._markAsReadyAll();
                break;
            case 'keypress':
                if (e.keyCode === ENTER_KEY_CODE) {
                    this._addItem();
                }
                break;
        }
    };

    TODO_APP.components.AddTodos = AddTodosConstructor;
}());