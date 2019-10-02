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
        <select id="rating" name="rating" required>
            <option value"5">5</option>
            <option value"4">4</option>
            <option value"3">3</option>
            <option value"2">2</option>
            <option value"1">1</option>
        </select>
    </div>

    <div class="description">
        <input type="text" name="desc" placeholder="Add a description for your new bookmark..." required>
    </div>

    <button class="submit" type="submit">Submit</button>
</form>`;
};

const generateBookmarkElement = function (bookmark) {
    return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3>${bookmark.title}</h3>
    <p>Rating: ${bookmark.rating}</p>
    <button onclick="window.location.href='${bookmark.url}';" class="visit-URL js-visit-URL">Visit Site!</button>
    <p>Description: ${bookmark.desc}</p>
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
        store.toggleAddBookmark();
        render();
    });
};


// const handleNewBookmarkSubmit = function () {
//     $('body').on('submit', '#js-bookmark-list-form', function(event) {
//         event.preventDefault();
//         const title = $('.bookmark-title-entry').val();
//         const url = $('.bookmark-URL-entry').val();
//         const rating = $('.rating').val();
//         const desc = $('.desc').val();
//         const newBookmark = {title, url, rating, desc};
        
//         console.log(newBookmark);

//         api.createBookmark(newBookmark)
//             .then((newBookmark) => {
//                 store.addBookmark(newBookmark);
//                 store.toggleAddBookmark();
//                 render();
//         });
//     });
// };

const handleNewBookmarkSubmit = function() {
    $('#js-bookmark-list-form').submit(function(event){
        event.preventDefault();
        const newTitle = $('.bookmark-title-entry').val();
        const newUrl = $('.bookmark-URL-entry').val();
        const newRating = $('.rating').val();
        const newDesc = $('.desc').val();
        $('.bookmark-title-entry').val();
        $('.bookmark-URL-entry').val();
        $('.rating').val();
        $('.desc').val();
        const newBookmarkArray = (newTitle, newUrl, newRating, newDesc);
        api.createBookmark(newBookmarkArray)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                render();
            });
    });
};

const bindEventListeners = function () {
    handleNewBookmarkClick();
    handleNewBookmarkSubmit();
};

export default {
    generateBookmarkList,

    addNewBookmarkForm,
    render,
    bindEventListeners
};