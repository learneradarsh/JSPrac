class SearchView {
  _parentElement = document.querySelector('.search');
  _query = document.querySelector('.search__field');
  _searchButton = document.querySelector('.search__btn');

  handleSearch(handler) {
    this._searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getSearchQuery() {
    return this._query.value;
  }
}

export default new SearchView();
