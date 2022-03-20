export default class GenericView {
  clear() {
    this._parentElement.innerHTML = '';
  }

  spinloader() {
    const loaderTemplate = `<div class="spinner">
    <h2>Loading...</h2>
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`;
    console.log('loading...');
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', loaderTemplate);
  }

  renderError(message = 'This is default error message') {
    const errorTemplate = `<div class="error">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    console.error(message);
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorTemplate);
  }
}
