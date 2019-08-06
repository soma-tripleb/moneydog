import axios from 'axios';

export function getPost(postId) {
  return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}

export function getComments(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}

export function getServerHelloWorld() {
  return axios.get(`http://localhost:5000`);
}

export function getUserServiceInfo(userID) {
  return axios.get(`http://localhost:5000/subscribeInfo/${userID}`);
}


