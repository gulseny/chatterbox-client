var getPosts = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    success: function (data) {
      displayPosts(data.results);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var displayPosts = function(data){
  var messages = [];
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]['username'],data[i]['text']);
    messages.push('<p>' + data[i]['username'] + ': ' + data[i]['text']+ '</p>');
  }
  $('.posts').append(messages);
};

var validateData = function(data){
  if(typeof data === 'string'){
    if(data.charAt(0) === '<'){
      return true;
    }else{
      return false;
    }
  }

};

getPosts();

// setInterval(getPosts, 5000);


