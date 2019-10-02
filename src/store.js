/* eslint-disable indent */
const bookmarks = [];
let addingNewBookmark = false;
let expandedView = false;
let error = null;

const toggleAddBookmark = function () {
    this.addingNewBookmark = !this.addingNewBookmark;
};

const toggleExpanded = function () {
    this.expandedView = !this.expandedView;
};

const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const setError = function (error) {
    this.error = error;
};

export default {
    toggleExpanded,
    expandedView,
    toggleAddBookmark,
    addingNewBookmark,
    bookmarks,
    error,
    findById,
    addBookmark,
    findAndDelete,
    setError
};