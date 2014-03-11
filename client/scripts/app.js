$(document).ready(function(){

  var sendPosts = function(message){
    $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

  var getPosts = function(){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
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
      // console.log(data[i]['username'],data[i]['text']);
      var username = (data[i]['username']) ? data[i]['username'] : "Guest";
      var text = (validateData(data[i]['text'])) ? data[i]['text'] : "ILLEGAL XSS";

      messages.push('<p>' + username + ': ' + text+ '</p>');
    }
    $('.posts').append(messages);
  };

  var validateData = function(data){
    if(typeof data === 'string'){
      if(data.charAt(0) === '<'){
        return false;
      }else{
        return true;
      }
    }

  };

  var newUser;
 $('#joined').on('click',function(){
    newUser = $('#name').val();
    $('.enterName').hide();
    $('#userName').append('<h3>'+ newUser + '</h3>');
    $('.enterMessage').show();
  console.log(newUser);
  });

  $('#send').on('click',function(){
    var message = $('#message').val();
    console.log(message);
    var messageObj = {
      username: newUser,
      text: message
    };
    sendPosts(messageObj);
  });

  getPosts();

  setInterval(getPosts(), 1000);
  
});



