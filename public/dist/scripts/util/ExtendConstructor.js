(function () {
    /**
     * @param {Function} Extendable
     * @param {Function} Extension
     * @return {Function} Extendable
     */
    function extendConstructor(Extendable, Extension) {
        let extendablePrototype = Extendable.prototype;
        let extensionPrototype = Extension.prototype;

        for (let p in extensionPrototype) {
            extendablePrototype[p] = extensionPrototype[p];
        }

        return Extendable;
    }

    TODO_APP.utils.extendConstructor = extendConstructor;
}());