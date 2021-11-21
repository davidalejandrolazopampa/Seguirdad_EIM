var currentUserId = 0;
var currentClickedId = 0;
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                        if(response[i].id != currentUserId){
                            f = '<div role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                            f = f + '<img src="/static/images/user.png" width="30" height="30" />';
                            f = f + ' '+response[i].name + ' '+response[i].fullname;
                            f = f + '</div>';

                            $('#allusers').append(f);
                        }
                        i = i+1;
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);
        currentClickedId = user_to_id;
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                var i = 0;
                $('#messages').html("")
                $.each(response, function(){
                    if(response[i].user_from_id==currentUserId){
                    f = '<div class="text-right text-success">';
                    f = f + response[i].content;
                    f = f + '</div>';
                    i = i+1;
                   }
                    else{
                    f = '<div class="text-lefts text-primary" >';
                    f = f + response[i].content;
                    f = f + '</div>';
                    i = i+1;
                    }
                     $('#messages').append(f);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
          });
    }

    function sendMessage(){
        var message = $('#postmessage').val();
        $('#postmessage').val('');

        var data = JSON.stringify({
                "user_from_id": currentUserId,
                "user_to_id": currentClickedId,
                "content": message
            });

        $.ajax({
            url:'/enviar/messages',
            type:'POST',
            contentType: 'application/json',
            data : data,
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                loadMessages(currentUserId,currentClickedId);
            },
            error: function(response){
                //alert(JSON.stringify(response));
            }
        });


}
//Acutalizar cada 5 segundos xD es espero

//Cerrar Secion
function logout(){
        var url = 'http://' + document.domain + ':' + location.port + '/static/login.html';
                    $(location).attr('href',url);
        }