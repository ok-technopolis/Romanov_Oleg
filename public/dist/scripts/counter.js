function TodoActionsBarCounter(counter) {
    // this._counter = counter;

    var count = 0;

    this.set = function setCounter(setCount) {
        count = setCount;
        showCounter();
    };

    this.inc = function incrementCounter() {
        count++;
        showCounter();
    };

    this.dec = function decrementCounter() {
        count--;
        showCounter();

    };

    function showCounter() {
        counter.textContent = count + " item(s) left";
    }
}