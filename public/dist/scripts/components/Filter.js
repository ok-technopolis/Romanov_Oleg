(function () {
    let Eventable = TODO_APP.modules.Eventable;
    let extendConstructor = TODO_APP.utils.extendConstructor;

    const ACTIVE_FILTER_MODIFICATOR = '__active';

    /**
     * @param {HTMLElement} domRoot
     * @constructor
     * @implements {EventListener}
     */
    function FilterConstructor(domRoot) {
        this._initEventable();

        let filters = this._filters = domRoot.querySelectorAll('.filter');
        this._currentActive = null;

        for (let i = filters.length; i--;) {
            filters[i].addEventListener('click', this);
            if (filters[i].classList.contains(ACTIVE_FILTER_MODIFICATOR)) {
                this._currentActive = filters[i];
            }
        }
    }

    extendConstructor(FilterConstructor, Eventable);

    let filterConstructorPrototype = FilterConstructor.prototype;

    /**
     * @param {HTMLElement} filterElement
     * @return {FilterConstructor}
     * @private
     */
    filterConstructorPrototype._setFilter = function (filterElement) {
        if (this._currentActive !== filterElement) {
            this._currentActive.classList.remove(ACTIVE_FILTER_MODIFICATOR);
            filterElement.classList.add(ACTIVE_FILTER_MODIFICATOR);
            this._currentActive = filterElement;
            this.trigger('filterSelected', filterElement.getAttribute('data-filter'));
        }
        return this;
    };

    filterConstructorPrototype.handleEvent = function (e) {
        switch (e.type) {
            case 'click':
                this._setFilter(e.target);
                break;
        }
    };

    TODO_APP.components.Filter = FilterConstructor;
}());