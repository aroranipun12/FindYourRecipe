import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const markup_forward = `
            <button class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
      `;
    const markup_backward = `
            <button class="btn--inline      pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            `;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //scenarios for pagination
    //Page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return markup_forward;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return markup_backward;
    }
    //other page
    if (curPage < numPages) {
      return markup_forward + markup_backward;
    }
    //page1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();
