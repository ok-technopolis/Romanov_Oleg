function Counter(display) {
    this.display = display;
    this.currentNumber = 0;
}

Counter.prototype = {
    set: function set(setCount) {
        this.currentNumber = setCount;
        this.show();
    },
    inc: function inc() {
        this.currentNumber++;
        this.show();
    },
    dec: function decrementCounter() {
        this.currentNumber--;
        this.show();
    },
    show: function show() {
        this.display.textContent = this.currentNumber + " item(s) left";
    }
};

