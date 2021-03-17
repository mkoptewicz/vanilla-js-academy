const lib = (function () {
  const methods = {};
  
  methods.convertToArray = iterable => [...iterable];

  methods.getElem = selector => document.querySelector(selector);

  methods.getAllAsArray = selector => [...document.querySelectorAll(selector)];
  // methods.getAllAsArray = selector =>
  //   methods.convertToArray(document.querySelectorAll(selector));

  methods.addClassToAll = (selector, className) =>
    methods.getAllAsArray(selector).forEach(el => el.classList.add(className));

  methods.removeClassFromAll = (selector, className) =>
    methods
      .getAllAsArray(selector)
      .forEach(el => el.classList.remove(className));

  return methods;
})();

