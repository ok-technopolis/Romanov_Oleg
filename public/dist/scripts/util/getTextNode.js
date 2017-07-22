(function () {
    /**
     * @param {HTMLElement} node
     * @return {Node}
     */
    function getTextNode(node) {
        let childs = node.childNodes;
        let i = 0;
         let l = childs.length;

        for (; i !== l; i += 1) {
            if (childs[i].nodeName === '#text') {
                return childs[i];
            }
        }

        let result = document.createTextNode('');
        node.appendChild(result);
        return result;
    }

    TODO_APP.utils.getTextNode = getTextNode;
}());