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
        <input type="text" class="bookmark-title-entry" name="bookmark-title-entry" placeholder="Bookmark Title..." required>
    </div>

    <div class="bookmark-URL">
        <label for="bookmark-URL-entry">URL:</label>
        <input type="url" class="bookmark-URL-entry" name="bookmark-URL-entry" placeholder="https://NewBookmarksURL.com" required>
    </div>

    <div class="rating">
        <p>Rate your bookmark:</p>
        <select id="rating" class="ratingMenu" name="rating" required>
            <option value"5">5</option>
            <option value"4">4</option>
            <option value"3">3</option>
            <option value"2">2</option>
            <option value"1">1</option>
        </select>
    </div>

    <div class="description">
        <input type="text" class="description-box" name="desc" placeholder="Add a description for your new bookmark..." required>
    </div>

    <button class="submit" type="submit">Submit</button>
</form>`;
};

const generateBookmarkElement = function (bookmark) {
    if (store.expandedView === true)
    return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3><button class="toggleExpanded"><b>${bookmark.title}</b> ...... Rating: ${bookmark.rating}</button></h3>
    <button onclick="window.location.href='${bookmark.url}';" class="visit-URL js-visit-URL">Visit Site!</button>
    <p>Description: ${bookmark.desc}</p>
    <button class="delete">Delete</button>
    `;
    else if (store.expandedView === false)
    return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3><button class="toggleExpanded"><b>${bookmark.title}</b> ...... Rating: ${bookmark.rating}</button></h3>
    `;
};

// const getIdFromBookmark = function (bookmark) {
//     return $(bookmark)
//         .closest('.js-bookmark')
//         .data('bookmark-id');
// };

// const handleToggleBookmarkClick = function () {
//     $('body').on('click','.toggleExpanded', event => {
//         const id = getIdFromBookmark(event.currentTarget);
//         store.toggleExpanded(id);
//         render();
//     });
// };

const handleToggleBookmarkClick = function () {
    $('body').on('click','.toggleExpanded', event => {
        store.toggleExpanded(event.currentTarget);
        render();
    });
};

const generateBookmarkList = function(bookmarks){
    const nav = `
        <div class="options">
            <button class="addNewForm" name="newBookmark" type="button">New Bookmark +</button>
            <div class="filter">
            <label for="ratingMenu">Filter Bookmarks:</label>
            <select id="filter-menu" name="ratingMenu">
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
            </div>
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

const handleNewBookmarkSubmit = function() {
    $('#js-bookmark-list-form').submit(function(event){
    //$('body').on('submit', '#js-bookmark-list-form', function(event){
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
    handleToggleBookmarkClick();
};

export default {
    generateBookmarkList,
    addNewBookmarkForm,
    render,
    bindEventListeners
};