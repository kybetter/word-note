const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, 'dic.json');
const dic = require(file);

const submit = document.querySelector("#submit");
const search = document.querySelector("#search");

// 添加单词
submit.addEventListener('click', e => {
  e.preventDefault();
  const phrase = document.querySelector('#phrase');
  const explain = document.querySelector('#explain');
  if (phrase.value.trim() === '' || explain.value.trim() === '') return;
  dic[phrase.value.trim()] = explain.value.trim();
  fs.writeFile(file, JSON.stringify(dic), 'utf8', err => {
    if (err) return;
    phrase.value = explain.value = '';
    const addTip = document.querySelector("#add-tip");
    addTip.classList.add('active');
    setTimeout(function () {
      addTip.classList.remove('active');
    }, 1800);
  });
});

// 查询单词
search.addEventListener('click', e => {
  e.preventDefault();
  const keywordsDom = document.querySelector("#keywords");
  const keywords = keywordsDom.value.trim();
  if (keywords === '') return;
  let resultDom = document.querySelector("#result");
  const keys = Object.keys(dic);
  resultDom.innerHTML = '';
  keys.forEach(key => {
    if (key.indexOf(keywords) !== -1) {
      resultDom.insertAdjacentHTML(
        'beforeend',
        `<div><span>${key}：</span><span>${dic[key]}</span></div>`
      );
    }
  })
})

const searchTab = document.querySelector("#search-tab");
const addTab = document.querySelector("#add-tab");
const searchForm = document.querySelector("#search-form");
const addForm = document.querySelector("#add-form");

searchTab.addEventListener('click', function (e) {
  e.preventDefault();
  addTab.classList.remove('active');
  if (this.className.indexOf('active') === -1) {
    this.classList.add('active');
    addForm.classList.remove('active');
    searchForm.classList.add('active');
  }
});

addTab.addEventListener('click', function (e) {
  e.preventDefault();
  searchTab.classList.remove('active');
  if (this.className.indexOf('active') === -1) {
    this.classList.add('active');
    searchForm.classList.remove('active');
    addForm.classList.add('active');
  }
});