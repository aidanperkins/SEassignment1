$(function() {
   //Get 
   //TODO: get all users' IDs & display it
    $('#get-button').on('click', function() {
      $.ajax({
        url: '/tweets',
        method: "GET",
        contentType: 'application/json',
        success: function(response) {
            var tbody = $('#namebody');

            tbody.html('');

            //grab all twitter user names and add them to the html
            response.forEach(function(block) {
                tbody.append('\
                    <tr>\
                        <td class="id">' + block.user.id_str + '</td>\
                        <td class="screen name">' + block.user.screen_name + '</td>\
                        <td class="name">' + block.user.name + '</td>\
                    </tr>\
                ');
            });
        }
    });
  });


    //Get tweets
    //TODO: get tweet info and display it
    $('#get-tweets-button').on('click', function(){
      $.ajax({
        url: '/tweetinfo',
        contentType: 'application/json',
        success: function (response) {
          var tbodyE1 = $('#tweetbody');
          tbodyE1.html('');

          response.forEach(function(tweetinfo) {
            tbodyE1.append('\
              <tr>\
                <td class="id">' + tweetinfo.id + '</td>\
                <td class="text">' + tweetinfo.text + '</td>\
                <td class="created at">' + tweetinfo.created_at + '</td>\
              </tr>\
            ');
          });
        }
        });
      });

    //Get searched tweets
    //TODO: get a searched tweet(s) & display it
    $('#get-searched-tweets').on('click', function() {
      $.ajax({
        method: "GET",
        url: "/searchinfo",
        success: function(response){
          var tbody = $('#searchbody');
          tbody.html('');

          response.forEach(function(tweetinfo) {
            tbody.append('\
              <tr>\
                <td class="id">' + tweetinfo.id + '</td>\
                <td class="text">' + tweetinfo.text + '</td>\
                <td class="created at">' + tweetinfo.created_at + '</td>\
              </tr>\
            ');
          });
        }
      })
    });


  //CREATE
  //TODO: creat a tweet
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        
        createInput = createInput[0].value
        createInput = createInput.split(";");

        createInput = JSON.stringify({id: createInput[0], text: createInput[1]});

        $.ajax({
          url:'/tweetinfo',
          method:"POST",
          data:createInput,
          contentType: 'application/json',
          success: function(response) {
            console.log(response);
            createInput.val('');
            $('#get-button').click();
          }
        })

        //$.post('/tweetinfo', createInput, function(data){}, "json");
        
  });

    //Create searched tweets
    //TODO: search a tweet and display it.
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input').val();

    userID = JSON.stringify({userID : userID});

    $.ajax({
      method: "POST",
      url: "/searchinfo",
      data: userID,
      contentType: 'application/json',
      success: function(response) {
        var tbody = $('#searchbody');
          tbody.html('');

          response.forEach(function(tweetinfo) {
            tbody.append('\
              <tr>\
                <td class="id">' + tweetinfo.id + '</td>\
                <td class="text">' + tweetinfo.text + '</td>\
                <td class="created at">' + tweetinfo.created_at + '</td>\
              </tr>\
            ');
          });
      }
    })
    
    //$.post("/searchinfo", userID);

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];

    newName = (JSON.stringify({newName: newName}));

    $.ajax({
      url: "/tweets/" + name,
      method: "PUT",
      data: newName,
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        $('#get-button').click();
      }
    })
    
    //TODO: update

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val();
    event.preventDefault();
    
    $.ajax({
      method: 'DELETE',
      url: "/tweetinfo/" + id,
      data: id
    });
  });


});


                    
   