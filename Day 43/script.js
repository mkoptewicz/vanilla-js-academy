const LIB = (function () {
  const Constructor = function (selector) {
    this.elems = document.querySelectorAll(selector);
  };

  Constructor.prototype.items = function () {
    return [...this.elems];
  };
  Constructor.prototype.getFirst = function () {
    return this.elems[0];
  };

  Constructor.prototype.getLast = function () {
    return this.elems[this.elems.length - 1];
  };

  Constructor.prototype.addClass = function (className) {
    this.items().forEach(item => item.classList.add(className));
    return this;
  };

  Constructor.prototype.removeClass = function (className) {
    this.items().forEach(item => item.classList.remove(className));
    return this;
  };
  return Constructor;
})();
const buttons = new LIB("button");
const listItems = new LIB("li");
