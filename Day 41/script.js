const LIB = (function () {
  const Constructor = function (selector) {
    this.selector = selector;
  };
  const getEl = selector => document.querySelector(selector);
  const getAllAsArray = selector => [...document.querySelectorAll(selector)];
  const addClassToAll = (selector, className) =>
    getAllAsArray(selector).forEach(el => el.classList.add(className));
  const removeClassFromAll = (selector, className) =>
    getAllAsArray(selector).forEach(el => el.classList.remove(className));

  Constructor.prototype.getAll = function () {
    return getAllAsArray(this.selector);
  };
  Constructor.prototype.getFirst = function () {
    return getEl(this.selector);
  };

  Constructor.prototype.getLast = function () {
    return getEl(this.selector + ":last-of-type");
  };

  Constructor.prototype.addClass = function (className) {
    addClassToAll(this.selector, className);
  };

  Constructor.prototype.removeClass = function (className) {
    removeClassFromAll(this.selector, className);
  };

  return Constructor;
})();
const buttons = new LIB("button");
const listItems = new LIB("li");
