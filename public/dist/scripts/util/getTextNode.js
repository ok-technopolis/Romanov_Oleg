(function () {
    /**
     * @param {HTMLElement} node
     * @return {Node}
     */
    function getTextNode(node) {
        let children = node.childNodes;

        let l = children.length;

        for (let i = 0; i !== l; i += 1) {
            if (children[i].nodeName === '#text') {
                return children[i];
            }
        }

        let result = document.createTextNode('');
        node.appendChild(result);
        return result;
    }

    TODO_APP.utils.getTextNode = getTextNode;
}());