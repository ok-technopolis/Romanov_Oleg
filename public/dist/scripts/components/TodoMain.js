(function () {

    const TODOS_MAIN_SELECTOR = '.js-todos-main';
    const FULL_INTERFACE_MODIFICATOR = '__hide';

    /**
     * @constructor
     */
    function TodoMain() {
        this._todosMain = document.querySelector(TODOS_MAIN_SELECTOR);
    }

    /**
     * @returns {TodoMain}
     */
    TodoMain.prototype.showFullInterface = function () {
        this._todosMain.classList.remove(FULL_INTERFACE_MODIFICATOR);
        return this;
    };

    /**
     * @returns {TodoMain}
     */
    TodoMain.prototype.hideFullInterface = function () {
        this._todosMain.classList.add(FULL_INTERFACE_MODIFICATOR);
        return this;
    };

    TODO_APP.components.TodoMain = TodoMain;
}());