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

var timecode = 0;

  var getPosts = function(){
    
    $.ajax({
      // always use this 

      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data:{
        order: '-createdAt',
        createdAt: '{"$gt": timecode}'
      },
      success: function (data) {
        console.log(data.results);
        displayPosts(data.results);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  var displayPosts = function(data){
    console.log(timecode);
    var messages = [];
    var roomNames = {};
    var rooms = [];
    timecode = data[0]['createdAt'];
    for (var i = 0; i < data.length; i++) {
      //populating room name object
      if(data[i]['roomname']){
        roomNames[data[i]['roomname']] = true;
      }
      var username = (data[i]['username']) ? data[i]['username'] : "Guest";
      var text = (validateData(data[i]['text'])) ? data[i]['text'] : "ILLEGAL XSS";
      messages.push('<p class = "'+ data[i]['roomname'] +'">' + data[i]['roomname'] + username + ': ' + text+ '</p>');
    }

    //initial GET
    //updates



    for(var keys in roomNames){
      rooms.push("<li>"+keys+"</li>");
    }
    $('.posts').prepend(messages);
    $('.rooms ul').html(rooms);
    var currentRoom = $('#currentRoom').text();
    if(currentRoom){
      $('p[class!='+ currentRoom +']').hide();
    }
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
      text: message,
      roomname: $('#currentRoom').text() || undefined
    };
    sendPosts(messageObj);
  });

  $('.rooms ul').on('click', 'li', function(){
    console.log($(this).text());
    $('#currentRoom').text($(this).text()).show();
    $('.rooms ul').hide();
    $('.newRoom').hide();
    $('#back').show();
    var currentRoomName = $(this).text();
    // $('p[class!='+ currentRoomName +']').hide();
    $('p').each(function(currentRoomName){
      if(!$(this).hasClass(currentRoomName)){
        $(this).hide();
      }
    });
  });

  // $('li').on('hover', function(){
  //   $(this).css('color', 'red');
  // });

  $('#back').on('click', function(){
    $('#currentRoom').text('').hide();
    $('.rooms ul').show();
    $('#back').hide();
    $('.newRoom').show();
    $('p').show();
  });

  $('#create').on('click', function(){
    $('#currentRoom').text($('#newRoom').val());
    // $(this) = ; 
    console.log($('#newRoom').val());
    console.log($('#currentRoom').text());
    $(this).trigger('.rooms li', 'click');
  });



  getPosts();

  setInterval(getPosts, 4000)

  
});