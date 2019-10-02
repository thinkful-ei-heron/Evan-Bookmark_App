/* eslint-disable indent */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evanvogts';

const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
        .then (res => {
            if (!res.ok) {
                error = {code: res.status};
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
};

const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function (title, url, desc, rating) {
    const newBookmark = JSON.stringify({ 
        title: title,
        url: url,
        desc: desc,
        rating: rating
    });
    return listApiFetch(`${BASE_URL}/bookmarks`, 'POST', newBookmark);
};
  
const deleteBookmark = function (id) {
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    });
};
  
export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};