class searchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  //its a form(parent element)
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      //preventing default action(otherwise page will reload)
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
