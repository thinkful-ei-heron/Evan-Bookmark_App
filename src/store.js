/* eslint-disable indent */
const bookmarks = [];
let addingNewBookmark = false;
let error = null;

const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (title) {
    this.bookmarks.push(title);
};

const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const setError = function (error) {
    this.error = error;
};

export default {
    addingNewBookmark,
    bookmarks,
    error,
    findById,
    addBookmark,
    findAndDelete,
    setError
};