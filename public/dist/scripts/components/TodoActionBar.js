var ACTIVE_MARK = "__active";
var READY_MARK = "__ready";
var HIDE_MARK = "__hide";

function TodoActionBar(completed, active, clearCompleted, counter, showAll) {
    this.completed = completed;
    this.active = active;
    this.clearCompleted = clearCompleted;
    this.counter = counter;
    this.showAll = showAll;

    this.active.addEventListener('click', function (e) {
        e.preventDefault();

        fixHidden();

        active.classList.add(ACTIVE_MARK);
        showAll.classList.remove(ACTIVE_MARK);
        completed.classList.remove(ACTIVE_MARK);


        var hidden = document.getElementsByClassName(READY_MARK);
        var size = hidden.length;
        for (var i = 0; i < size; i++) {
            hidden[i].classList.add(HIDE_MARK);
        }
    });


    this.completed.addEventListener('click', function (e) {
        e.preventDefault();

        fixHidden();

        completed.classList.add(ACTIVE_MARK);
        showAll.classList.remove(ACTIVE_MARK);
        active.classList.remove(ACTIVE_MARK);

        var hidden = document.getElementsByClassName('todo-item');
        var size = hidden.length;

        var uncompletedItems = [];
        var j = 0;
        for (var i = 0; i < size; i++) {
            if (!hidden[i].classList.contains(READY_MARK)) {
                uncompletedItems[j++] = hidden[i];
            }
        }

        for (i = 0; i < j; i++) {
            uncompletedItems[i].classList.add(HIDE_MARK);
        }
    });

    var fixHidden = function () {
        var hidden = document.getElementsByClassName('todo-item ' + READY_MARK + ' ' + HIDE_MARK);
        var size = hidden.length;
        for (var i = 0; i < size; i++) {
            hidden[0].classList.remove(HIDE_MARK);
        }

        hidden = document.getElementsByClassName('todo-item ' + HIDE_MARK);
        size = hidden.length;
        for (var j = 0; j < size; j++) {
            hidden[0].classList.remove(HIDE_MARK);
        }
    };

    this.showAll.addEventListener('click', function (e) {
        e.preventDefault();

        showAll.classList.add(ACTIVE_MARK);
        completed.classList.remove(ACTIVE_MARK);
        active.classList.remove(ACTIVE_MARK);

        fixHidden();
    });

    this.clearCompleted.addEventListener('click', function (e) {
        e.preventDefault();

        var items = document.getElementsByClassName('todo-item ' + READY_MARK);
        var size = items.length;
        for (var i = 0; i < size; i++) {
            items[0].parentNode.removeChild(items[0]);
            counter.dec();
        }

    });

    this.clearCompleted.addEventListener('click', function (e) {
        e.preventDefault();

        var items = document.getElementsByClassName('todo-item ' + READY_MARK);
        var size = items.length;
        for (var i = 0; i < size; i++) {
            items[0].parentNode.removeChild(items[0]);
        }

    });

}