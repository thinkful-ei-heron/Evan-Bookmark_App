/* eslint-disable indent */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/evanvogts';

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
  
// export default {
//     getBookmarks,
//     createBookmark,
//     deleteBookmark
// };

const apiFetch = function(url, method, newData){
    let error = false;
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: newData
    })
      .then(res => {
        if(!res.ok) {
          error = {code: res.status};
        }
        return res.json();
      })
      .then( data => {
        if (error){
          error.message = data.message;
          return Promise.reject(error);
        }
        return data;
      });
};
  
const getBookmarks = function() {
    return apiFetch(`${BASE_URL}/bookmarks`);
};
  
const createBookmark = function(newObject){
    return apiFetch(`${BASE_URL}/bookmarks`, 'POST', JSON.stringify(newObject));
};
  
const deleteItem = function(id){
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, 'DELETE');
};
  
export default {
    getBookmarks,
    createBookmark,
    deleteItem
};