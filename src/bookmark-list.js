/* eslint-disable indent */
import $ from 'jquery';
import store from './store';
import api from './api';

const render = function () {
    if(store.addingNewBookmark === true) {
        addNewBookmarkForm();
    }
    else if (store.addingNewBookmark === false) {
        renderList();
    }
};

const addNewBookmarkForm = function () {`
    <form id="js-bookmark-list-form">

    <div class="bookmark-title">
        <label for="bookmark-title-entry">Title:</label>
        <input type="text" name="bookmark-title-entry" placeholder="Bookmark Title..." required>
    </div>

    <div class="bookmark-URL">
        <label for="bookmark-URL-entry">URL:</label>
        <input type="url" name="bookmark-URL-entry" placeholder="https://NewBookmarksURL.com" required>
    </div>

    <div class="rating">
        <p>Rate your bookmark:</p>
        <select id="rating" name="rating">
            <option value"5">5</option>
            <option value"4">4</option>
            <option value"3">3</option>
            <option value"2">2</option>
            <option value"1">1</option>
        </select>
    </div>

    <div class="description">
        <input type="text" name="desc" placeholder="Add a description for your new bookmark (optional)...">
    </div>

    <button type="submit">Submit</button>
</form>`;
};

const generateBookmarkElement = function (bookmark) {
    return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3>${bookmark.title}</h3>
    <p>${bookmark.rating}</p>
    <button class="visit-URL js-visit-URL">Visit Site!</button>
    <p>${bookmark.desc}</p>
    `;
};

const generateBookmarkList = function(bookmarks){
    const nav = `
        <div>
            <label for="newBookmark">Create a new bookmark</label>
            <button class="addNewForm" name="newBookmark" type="button">+</button>
            <select id="filter-menu" name="ratingMenu">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
      </div>
    `;
    const items = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
    return nav + items.join('');
}

const renderList = function () {
    $('.app-input').html(generateBookmarkList(store.bookmarks));
};



// const generateBookmarkElement = function (bookmark) {
//     let bookmarkExpandedView = ``;
//     let bookmarkTitle = `<span class="bookmark-item">${bookmark.rating}</span>`;
//     if (bookmark.expanded) {
//         bookmarkTitle = `
//         <button class="bookmark-item-delete">
//             <span class="button-label">delete</span>
//         </button>`;
//         bookmarkExpandedView = `
//         <div class="bookmark-item-controls">
//                 <button class="visit-URL js-visit-URL">
//                 <span class="button-label">Visit Site!</span>
//             <div>${bookmark.desc}</div>
//         </div>
//     `;}
//     return `
//         <li class="bookmark-element" data-item-id="${bookmark.id}">
//             <span class"bookmark-item">${bookmark.title} ${bookmarkTitle}</span>
//                 ${bookmarkExpandedView}
//         </li>
//     `;
// };

// const generateBookmarksItemsString = function (bookmarkList) {
//     const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
//     return bookmarks.join('');
// };

// const render = function () {
//     let bookmarks = [...store.bookmarks];
//     const bookmarkListItemsString = generateBookmarksItemsString(bookmarks);
//     $('.js-bookmark-list').html(bookmarkListItemsString);
// };

// const handleNewBookmarkSubmit = function () {
//     $('#js-shopping-list-form').submit(function (event) {
//       event.preventDefault();
//       const newItemName = $('.js-shopping-list-entry').val();
//       $('.js-shopping-list-entry').val('');
//       api.createItem(newItemName)
//         .then((newItem) => {
//           store.addItem(newItem);
//           render();
//         });
//     });
// };
  
// const getBookmarkIdFromElement = function (item) {
//     return $(item)
//         .closest('.js-item-element')
//         .data('item-id');
// };
  
// const handleDeleteItemClicked = function () {
//     $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
//         const id = getBookmarkIdFromElement(event.currentTarget);
//         let bookmark = store.findById(id);
//         api.deleteItem(bookmark.id)
//             .then (() => {
//                 store.findAndDelete (id);
//                 render();
//             });
//     });
// };


const bindEventListeners = function () {
    handleNewBookmarkSubmit();
    handleBookmarkClicked();
    handleDeleteBookmarkClicked();
    handleAddingClick();
};

export default {
    generateBookmarkList,
    renderList,
    addNewBookmarkForm,
    render,
    bindEventListeners
};