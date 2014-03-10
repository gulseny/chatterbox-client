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
  for (var i = 0; i < data.length; i++) {
    var username = data[i]['username'];
    var text = data[i]['text'];
    $('.posts').append('<p>' + username + ': ' + text + '</p>');
  };
};

getPosts();


