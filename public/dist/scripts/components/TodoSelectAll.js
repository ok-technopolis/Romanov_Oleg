var READY_MARK = "__ready";

function TodoSelectAll(selectAll) {
    this.selectAll = selectAll;
}

TodoSelectAll.prototype.activate = function () {
    this.selectAll.addEventListener('click', function (e) {
        e.preventDefault();

        var items = document.getElementsByClassName('todo-item');
        var checkboxes = document.getElementsByClassName('input-checkbox_target');

        for (var i = 0; i < items.length; i++) {
            items[i].classList.add(READY_MARK);
            checkboxes[i].checked = true;
        }
    });
};