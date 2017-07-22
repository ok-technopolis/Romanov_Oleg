(function () {
    let extendConstructor = TODO_APP.utils.extendConstructor;
    let getTextNode = TODO_APP.utils.getTextNode;
    let Eventable = TODO_APP.modules.Eventable;
    let Filter = TODO_APP.components.Filter;

    /**
     * @constructor
     * @implements {EventListener}
     */
    function TodoActionsBarConstructor() {
        this._initEventable();

        this._counterNode = document.querySelector('.js-todos-actions-bar_counter');
        this._counterNodeText = getTextNode(this._counterNode);
        this._clearCompletedNode = document.querySelector('.js-todos-actions-bar_clear-completed');

        this._clearCompletedNode.addEventListener('click', this);

        this._filters = new Filter(document.querySelector('.js-todos-actions-bar_filter'));

        this._filters.on('filterSelected', this._onFilterSelected, this);
    }

    extendConstructor(TodoActionsBarConstructor, Eventable);

    let todoActionsBarConstructorPrototype = TodoActionsBarConstructor.prototype;

    todoActionsBarConstructorPrototype._onFilterSelected = function (filterId) {
        this.trigger('filterSelected', filterId);
    };

    /**
     * @return {TodoActionsBarConstructor}
     * @private
     */
    todoActionsBarConstructorPrototype._clearCompleted = function () {
        this.trigger('clearCompleted');
        return this;
    };

    /**
     * @param {Number} count
     * @return {TodoActionsBarConstructor}
     */
    todoActionsBarConstructorPrototype.setItemsCount = function (count) {
        this._counterNodeText.nodeValue = count + ' item' + (count === 0 ? '' : 's') + ' left';
        return this;
    };

    /**
     * @param {Event} e
     */
    todoActionsBarConstructorPrototype.handleEvent = function (e) {
        switch (e.type) {
            case 'click':
                this._clearCompleted();
                break;
        }
    };

    TODO_APP.components.TodoActionsBar = TodoActionsBarConstructor;
}());