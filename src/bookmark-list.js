/* eslint-disable indent */
import $ from 'jquery';
import store from './store';
import api from './api';

const render = function () {
    let html = ``;
    if(store.addingNewBookmark === true) {
        html=addNewBookmarkForm();
    }
    else if (store.addingNewBookmark === false) {
        html=generateBookmarkList(store.bookmarks);
    }
    $('.app-input').html(html);
};

const addNewBookmarkForm = function () {
    return `
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

    <button class="submit" type="submit">Submit</button>
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
};

const handleNewBookmarkClick = function () {
    $('body').on('click','.addNewForm', function() {
        console.log('check')
        store.toggleAddBookmark();
        console.log(store)
        render();
    });
};

// const handleNewBookmarkSubmit = function () {
//     $('body').on('submit', '#js-bookmark-list-form', function(event) {
//         event.preventDefault();
//         const newBookmarkTitle
//     })
// }







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
    handleNewBookmarkClick();
};

export default {
    generateBookmarkList,

    addNewBookmarkForm,
    render,
    bindEventListeners
};