/* eslint-disable indent */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evanvogts';

const getBookmarks = function () {
    return fetch(`${BASE_URL}/bookmarks`);
};

function createBookmark(title,url,descr,rate) {
    console.log('this is running');
    let newURL = JSON.stringify({
        title,
        url,
        descr,
        rate
    });
    return fetch(`${base_URL}/bookmarks`, {
        method: 'POST',
        headers: headerContent,
        body: newURL
    })
}

function updateURL(id, updateData) {
    const update = JSON.stringify(updateData);
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: headerContent,
      body: update
    })
}

function deleteItem(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: headerContent,
    })
}

export default {
    getURLs,
    createBookmark,
    updateURL,
    deleteItem
  };

// const listApiFetch = function (...args) {
//     let error;
//     return fetch(...args)
//         .then (res => {
//             if (!res.ok) {
//                 error = {code: res.status};
//                 if (!res.headers.get('content-type').includes('json')) {
//                     error.message = res.statusText;
//                     return Promise.reject(error);
//                 }
//             }
//             return res.json();
//         })
//         .then(data => {
//             if (error) {
//                 error.message = data.message;
//                 return Promise.reject(error);
//             }
//             return data;
//         });
// };
// 
// const getBookmarks = function () {
//     return listApiFetch(`${BASE_URL}/bookmarks`);
// };

// const createBookmark = function (title, url, desc, rating) {
//     const newBookmark = JSON.stringify({ 
//         title,
//         url,
//         desc,
//         rating
//     });
//     return listApiFetch(`${BASE_URL}/bookmarks`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: newBookmark
//     });
// };
  
// const deleteBookmark = function (id) {
//     return listApiFetch(BASE_URL + '/bookmarks/' + id, {
//         method: 'DELETE'
//     });
// };
  
export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};