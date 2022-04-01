let words = [];
let articles = [];
let oldArticles = [];
let word = 'First';
let wordCounter = 0;
var wordTimer = 28;
let lastTime = 0;
let canvas;
let api;

var myTextsize = 61;
var myTextColor = ' #4f65ea';
var myBackgroundColor = ' #e9c0e5';

// GUI
let visible = false;
var gui;

// dynamic parameters

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    
    sliderRange(0, 200, 1);
    gui = createGui('p5.gui');
    gui.addGlobals('myTextColor', 'myBackgroundColor', 'myTextsize', 'wordTimer');
    gui.hide()

    lastTime = new Date();
    getArticleList();
}


function draw() {
  if(myBackgroundColor){
    background(myBackgroundColor);
  }

  if(myTextColor) {
		fill(myTextColor);
  }
  
  textSize(myTextsize);
  noStroke();
  textAlign(CENTER, CENTER);
  nextWord();
  text(word, (width/2), (height/2));
}

function nextWord(){
  var now = new Date().getTime();
  var diff = now - lastTime.getTime();
  if( diff >= wordTimer){
    lastTime = new Date();
    word = words[wordCounter];
    wordCounter++;
    if( wordCounter > words.length ){
      wordCounter = 0;
      //getNextArticle();
    }
    
  }
  
}


function getArticleList(){
  let feedUrl = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
  fetch(feedUrl).then((res) => {
    res.text().then((xmlTxt) => {
      var domParser = new DOMParser();
      let doc = domParser.parseFromString(xmlTxt, 'text/xml');
      doc.querySelectorAll('item').forEach((item) => {
        articles.push(item.querySelector('link').innerHTML);
      })
      getNextArticle();
    })
  })
}



function getNextArticle(){
  let nextURL =  articles.shift();
  oldArticles.push(nextURL);
  getNewArticle('TxqaJFtRyHvrV4388x!MI7A^5kjWnK&url', nextURL);
}


function getNewArticle(key,url){
  let toFetch = './new_photo.php?key='+key+'&url='+url;
  fetch(toFetch)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    let returned_html = new DOMParser().parseFromString(atob(myJson.data.html), 'text/html');
    preprocessArticle(returned_html);
  });
}


function preprocessArticle(html){
  let story = html.getElementsByName("articleBody");
  setWords(story[0].innerText);
}

function setWords(newWords){
  //let nw = newWords.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ');
  let word_array = newWords.split(" ");
  word_array = word_array.filter(function(str) {
      return /\S/.test(str);
  });
  words = word_array;
}


function keyTyped() {
  if ((key == 'g') || (key == 'G')) {
    visible = !visible;
    if(visible) gui.show(); else gui.hide();
  }
}




window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
};
