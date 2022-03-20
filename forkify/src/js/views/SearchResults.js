import GenericView from './GenericView';

class SearchResults extends GenericView {
  _parentElement = document.querySelector('.results');
  _data;

  render(data) {
    this._data = data;
    const markup = this.generateTemplate();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  generateTemplate() {
    return this._data.map(d => {
      return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${d.id}">
          <figure class="preview__fig">
            <img src="${d.image}" alt="${d.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${d.title}</h4>
            <p class="preview__publisher">${d.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
    });
  }
}

export default new SearchResults();
