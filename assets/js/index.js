const url = "https://social-networking-system.herokuapp.com";
// const url = "http://localhost:3000";

$("#setting").submit(function (event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  const data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  const request = {
    url: `${url}/api/settings`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$("#CreateUserBtn").click((event) => {
  event.preventDefault();

  const prefix = "#";
  const username = $(prefix + "username").val();
  const name = $(prefix + "name").val();
  const email = $(prefix + "email").val();
  const password = $(prefix + "password").val();
  const passwordSalt = $(prefix + "passwordSalt").val();

  const request = {
    url: `${url}/api/users/`,
    method: "POST",
    data: { username,name, email, password, passwordSalt },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

$(".EditUserBtn").click((event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  const request = {
    url: `${url}/api/users/${id}`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {
    const prefix = "#edit";
    $(prefix + "username").val(response.user.username);
    $(prefix + "email").val(response.user.email);
    $(prefix + "id").val(response.user._id);
  });
});

$("#UpdateUserBtn").click((event) => {
  event.preventDefault();
  const id = $("#editid").val();

  const prefix = "#edit";
  const username = $(prefix + "username").val();
  const email = $(prefix + "email").val();

  const request = {
    url: `${url}/api/users/${id}`,
    method: "PUT",
    data: { username, email },
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-success").modal("show");
  });
});

function setId(event) {
  const id = event.target.dataset.id;
  $("#modal-danger")[0].dataset.id = id;
}
$(".DeleteUserBtn").click((event) => {
  event.preventDefault();

  const id = $("#modal-danger")[0].dataset.id;

  const request = {
    url: `${url}/api/users/${id}`,
    method: "DELETE",
  };

  $.ajax(request).done(function (response) {
    $("#modal-title").html(response.message);
    $("#modal-danger").modal("hide");
    $("#modal-success").modal("show");
  });
});

$("#LoginBtn").click(function (event) {
  event.preventDefault();

  $("#LoginForm").submit();
});

$("#CreatePostBtn").click(function(){
  debugger
  const user = $("#userId").val();
  const body = $("#postBody").val();

  const request = {
    url: `${url}/api/posts/`,
    method: "POST",
    data: { user, body },
  };

  $.ajax(request).done(function (response) {
    $('#create-post-modal').modal('hide');
    loadPost();
  });

 
})

$(".showpassword").click(function(e){
  var input = e.target.parentNode.parentNode.parentNode.children[0];
  if(input.type === "password"){
    input.type = "text";
  }else{
    input.type = "password";
  }
})

 function loadPost(){
      const request = {
        url: `${url}/api/posts/`,
        method: "GET",
      };

      $.ajax(request).done(function (response) {
        $('#postContent').empty();
        if (response.posts.length > 0) {
          $.each(response.posts, (i, post) => {
            const template = `
        <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-auto">
                            <div class="">
                            <span class="avatar avatar-md bg-blue-lt">${post.user.image}</span>
                            </div>
                          </div>
                          <div class="col">
                             <div class="row align-items-center">
                          <div class="col">
                            <div class="font-weight-medium">
                              ${post.user.name}
                            </div>
                            <div class="text-muted">
                             @${post.user.username}
                            </div>
                          </div>
                        </div>
                        <div class=""><pre style="border: 1px solid grey; border-radius:2%">${post.body}</p></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
            $('#postContent').append(template);
          });
        } else {
          const emptyTemplate = `
        <div class="empty">
          <div class="empty-img"><img src="/images/post.svg" height="128"  alt="">
          </div>
          <p class="empty-title">Posts are displayed here</p>
          <p class="empty-subtitle text-muted">
            No post found at this time
          </p>
        </div>`;
          $("#postContent").html(emptyTemplate);
        }
      });
  }

  
 function loadFriends(){
      const request = {
        url: `${url}/api/users/friends`,
        method: "GET",
      };

      $.ajax(request).done(function (response) {
        $('#friendListContent').empty();
        if (response.friends.length > 0) {
          $.each(response.friends, (i, friend) => {
            const template = `
              <div class="col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-body p-4 text-center">
                    <span class="avatar avatar-xl mb-3 avatar-rounded">${friend.image}</span>
                    <h3 class="m-0 mb-1"><a href="#">${friend.name}</a></h3>
                    <div class="text-muted">${friend.email}</div>
                    <div class="mt-3">
                    </div>
                  </div>
                  <div class="d-flex">
                    <a href="/personalchat?id=${friend._id}" class="card-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
                      Chat</a>
                  </div>
                </div>
              </div>`;
            $('#friendListContent').append(template);
          });
        } else {
          const emptyTemplate = `
        <div class="empty">
         <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-sad" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
   <path d="M9 10l.01 0"></path>
   <path d="M15 10l.01 0"></path>
   <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0"></path>
</svg>
        </div>
          <p class="empty-title">Friends are displayed here</p>
          <p class="empty-subtitle text-muted">
            You have no friends at this moment
          </p>
        </div>`;
          $("#friendListContent").html(emptyTemplate);
        }
      });
  }

   function loadDiscoverFriends(){
      const request = {
        url: `${url}/api/users/`,
        method: "GET",
      };

      $.ajax(request).done(function (response) {
        $('#newfriendListContent').empty();
        if (response.users.length > 0) {
          $.each(response.users, (i, user) => {
            const template = `
              <div class="col-6">
                <div class="card">
                  <div class="card-body p-4 text-center">
                    <span class="avatar avatar-xl mb-3 avatar-rounded">${user.image}</span>
                    <h3 class="m-0 mb-1"><a href="#">${user.name}</a></h3>
                    <div class="mt-3">
                    </div>
                  </div>
                  <div class="d-flex">
                    <a href="#" class="card-btn">
                       <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
                     Accept</a>
                  </div>
                </div>
              </div>`;
            $('#newfriendListContent').append(template);
          });
        } else {
          const emptyTemplate = `
        <div class="empty">
         <div class="empty-icon">
        div>
          <p class="empty-title">Friends Requests are displayed here</p>
          <p class="empty-subtitle text-muted">
            You have no friends requests at this moment
          </p>
        </div>`;
          $("#newfriendListContent").html(emptyTemplate);
        }
      });
  }
  
     function loadFriendRequests(){
      const request = {
        url: `${url}/api/users/friendRequest`,
        method: "GET",
      };

      $.ajax(request).done(function (response) {
        $('#friendRequestListContent').empty();
        if (response.friendRequests.length > 0) {
          $.each(response.friendRequests, (i, friendRequest) => {
            const {user} = friendRequest;
            const template = `
              <div class="col-6">
                <div class="card">
                  <div class="card-body p-4 text-center">
                    <span class="avatar avatar-xl mb-3 avatar-rounded">${user.image}</span>
                    <h3 class="m-0 mb-1"><a href="#">${user.name}</a></h3>
                    <div class="mt-3">
                    </div>
                  </div>
                  <div class="d-flex">
                    <a href="#" class="card-btn acceptRequest" data-id=${friendRequest._id}>
                       <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
                      Accept Friend Request</a>
                  </div>
                </div>
              </div>`;
            $('#friendRequestListContent').append(template);
          });
           $(".acceptRequest").click(function(e){
              const id = e.target.dataset.id;
              const request = {
                url: `${url}/api/users/acceptFriend/${id}`,
                method: "PUT",
              };

            $.ajax(request).done(function (response) {
              $("#modal-title").html(response.message);
              $("#modal-danger").modal("hide");
              $("#modal-success").modal("show");
            });
          })
        } else {
          const emptyTemplate = `
        <div class="empty">
         <div class="empty-icon">
    
        </div>
          <p class="empty-title">Pending Friend Requests are displayed here</p>
          <p class="empty-subtitle text-muted">
            You have no friend requests at this moment
          </p>
        </div>`;
          $("#friendRequestListContent").html(emptyTemplate);
        }
      });
      
  }

  $("#searchtext").keyup(function(){
    const text = $(this).val();
    $("#searchEmpty").hide();
   $('#searchContent').hide();
    $("#searchLoader").show();
      const request = {
        url: `${url}/api/users/search?q=${text}`,
        method: "GET",
      };

      $.ajax(request).done(function (response) {
        $('#searchContent').empty();
        $('#searchLoader').hide();
        if (response.users.length > 0) {
          $.each(response.users, (i, user) => {
            const template = `
        <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-auto">
                            <div class="">
                            <span class="avatar avatar-md bg-blue-lt">${user.image}</span>
                            </div>
                          </div>
                          <div class="col">
                             <div class="row align-items-center">
                          <div class="col">
                            <div class="font-weight-medium">
                              ${user.name}
                            </div>
                            <div class="text-muted">
                             @${user.username}
                            </div>
                          </div>
                          <div class="col"><button type="button" class="btn btn-primary requestFriend" data-id="${user._id}"> Send Friend Request </button>
                        </div>
                      </div>
                    </div>
                  </div>`;
            $('#searchContent').append(template);
          });
            $('#searchContent').show();
        } else {
          $("#searchEmpty").show();
        }

          $(".requestFriend").click(function(e){
              const user = e.target.dataset.id;
              const request = {
                url: `${url}/api/users/followFriend?friend=${user}`,
                method: "PUT",
              };

            $.ajax(request).done(function (response) {
              $("#modal-title").html(response.message);
              $("#modal-danger").modal("hide");
              $("#modal-success").modal("show");
            });
          })
      });
  })

 $("#sendGroupMessage").click(function(){
  const message = $("#messageBox").val();
      const request = {
                url: `${url}/api/chats/group`,
                method: "POST",
                data: {message}
              };

            $.ajax(request).done(function (response) {
              location.reload();
            });
 })
  $("#sendPersonalMessage").click(function(){
  const message = $("#messageBox").val();
  const to = location.href.split("=")[1];
      const request = {
                url: `${url}/api/chats/personal`,
                method: "POST",
                data: {message,to}
              };

            $.ajax(request).done(function (response) {
              location.reload();
            });
 })