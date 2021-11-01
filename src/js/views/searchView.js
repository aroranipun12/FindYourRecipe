class searchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  //its a form(parent element)
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      //preventing default action(otherwise page will reload)
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
