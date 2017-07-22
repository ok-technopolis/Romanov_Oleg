(function () {
    let Eventable = TODO_APP.modules.Eventable;
    let extendConstructor = TODO_APP.utils.extendConstructor;

    let TodoItem = TODO_APP.components.TodoItem;

    const TODO_LIST_SELECTOR = '.js-todos-list';
    let itemsIdIterator = 0;

    /**
     * @extends {Eventable}
     * @constructor
     */
    function TodoListConstructor() {
        /**
         * @type {Array.<TodoItemConstructor>}
         * @private
         */
        this._items = [];
        this._todosList = document.querySelector(TODO_LIST_SELECTOR);
        this._currentFilter = 'all';

        this._initEventable();
    }

    extendConstructor(TodoListConstructor, Eventable);

    /**
     * @return {Number}
     */
    TodoListConstructor.prototype.getItemsCount = function () {
        return this._items.length;
    };

    /**
     * @param {Object} todoItemData
     * @return {TodoListConstructor}
     */
    TodoListConstructor.prototype.createItem = function (todoItemData) {
        var item = new TodoItem(Object.assign(
            {
                id: itemsIdIterator++,
            },
            todoItemData
        ));

        this._items.push(item);

        item.on('change', this._onItemChange, this)
            .on('remove', this._onItemRemove, this)
            .render(this._todosList);

        this.trigger('itemAdd', item);

        return this;
    };

    /**
     * @return {TodoListConstructor}
     */
    TodoListConstructor.prototype.removeCompletedItems = function () {
        var items = this._items;
        var i = items.length;

        for (; i--;) {
            if (items[i].model.isReady) {
                items[i].remove();
            }
        }

        return this;
    };

    /**
     * @param {Number} itemId
     * @return {TodoItem|null}
     * @private
     */
    TodoListConstructor.prototype._getItemById = function (itemId) {
        var items = this._items;

        for (var i = items.length; i--;) {
            if (items[i].model.id === itemId) {
                return items[i];
            }
        }

        return null;
    };

    TodoListConstructor.prototype._onItemChange = function (itemModel) {
        this.filterShowedItems(this._currentFilter);
    };

    TodoListConstructor.prototype._onItemRemove = function (itemId) {
        var todoItemComponent = this._getItemById(itemId);

        if (todoItemComponent) {
            todoItemComponent.off('change', this._onItemChange, this);
            todoItemComponent.off('remove', this._onItemRemove, this);
            var todoItemComponentIndex = this._items.indexOf(todoItemComponent);
            this._items.splice(todoItemComponentIndex, 1);
            this.trigger('itemDelete', todoItemComponent.model);
        }

        return this;
    };

    /**
     * @return {TodoListConstructor}
     */
    TodoListConstructor.prototype.markAsReadyAll = function () {
        this._items.forEach(function (todoItem) {
            todoItem.setReady(true);
        });
        return this;
    };

    /**
     * @param {String} filterId
     * @return {TodoListConstructor}
     */
    TodoListConstructor.prototype.setFilter = function (filterId) {
        this._currentFilter = filterId;
        return this.filterShowedItems(filterId);
    };

    /**
     * @param {String} filterId
     * @return {TodoListConstructor}
     */
    TodoListConstructor.prototype.filterShowedItems = function (filterId) {
        this._items.forEach(function (item) {
            switch (filterId) {
                case 'all':
                    item.show();
                    break;
                case 'completed':
                    if (item.model.isReady) {
                        item.show();
                    } else {
                        item.hide();
                    }
                    break;
                case 'active':
                    if (!item.model.isReady) {
                        item.show();
                    } else {
                        item.hide();
                    }
                    break;
            }
        });
        return this;
    };

    TODO_APP.components.TodoList = TodoListConstructor;
}());