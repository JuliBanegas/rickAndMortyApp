const root = document.getElementById("root");
const spinner = document.getElementById("spinner-container");

const allPages = document.getElementById("all-pages");
const currentPage = document.getElementById("current-page");
const firstPage = document.getElementById("first-page");
const lastPage = document.getElementById("last-page");
const nextPage = document.getElementById("next-page");
const previusPage = document.getElementById("previus-page");

const charactersList = document.getElementById("characters");
const menCharacters = document.getElementById("male-characters");
const womenCharacters = document.getElementById("female-characters");

let data = {};
let pages = 1;
let total = 0;
