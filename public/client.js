


function tw(id){

    var tweet = document.getElementById("tweet");
    console.log(id)
    twttr.widgets.createTweet(
      id, tweet, 
      {
        conversation : 'all',    // or all
        cards        : 'visible',  // or visible 
        linkColor    : '#cc0000', // default is blue
        theme        : 'light',    // or dark
        align        : 'center'
      });
};

if(window.location.hash !=""){
  reqwest("likes/" + window.location.hash.substr(1), function (resp) {
    console.log(resp);
    tw(resp.id);
    document.getElementById("new").style.display = "block";
  })
  document.getElementById("user").innerHTML = `<a href="https://twitter.com/`+window.location.hash.substr(1)+`"><img id="avatar" src="https://avatars.io/twitter/`+window.location.hash.substr(1)+`"><br> <span id="name">@`+window.location.hash.substr(1)+`</span></a>`
}
else{
  document.getElementById("user").innerHTML = `<h3>What's your username?</h3><div id="avaar"></div><br><br><form  id="form"><span id="wha">@&nbsp;</span><input style="display:inline;max-width:200px; font-size:1.3em; text-align:center" type="text" onkeyup="update()" id="username"><br><button type="submit">Go 🚀</button></form>`
}

function update(){
  document.getElementById("avaar").innerHTML = `<img id="avatar" src="https://avatars.io/twitter/`+document.getElementById("username").value +`">`
}

const element = document.querySelector('form');
element.addEventListener('submit', event => {
  event.preventDefault();
    window.location.hash+=document.getElementById("username").value;
  reqwest("likes/" + window.location.hash.substr(1), function (resp) {
    console.log(resp);
    tw(resp.id);
  })
  document.getElementById("user").innerHTML = `<a href="https://twitter.com/`+window.location.hash.substr(1)+`"><img id="avatar" src="https://avatars.io/twitter/`+window.location.hash.substr(1)+`"><br> <span id="name">@`+window.location.hash.substr(1)+`</span></a>`
  document.getElementById("new").style.display = "block";
});


function newTweet(){
  document.getElementById("tweet").innerHTML = "";
  reqwest("likes/" + window.location.hash.substr(1), function (resp) {
    console.log(resp);
    tw(resp.id);
  })
}


var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close"
});



var info = 
`
<h1>About Twitter Wayback ⏰</h1>
<p>We use the twitter API to show you a random tweet out of your last <em>200</em> likes. It is not possible to seatch for more, due to twitter's API limitations.</p>

<p>All code is available on <a href="https://github.com/jajoosam/twitter-wayback">Github</a> and <a href="https://glitch.com/~twitter-wayback">Glitch.</a> <br>Made by <a href="https://twitter.com/jajoosam">Samarth Jajoo</a> in 3 hours.</p>

`
modal.setContent(info);