
var firebaseConfig = {
  apiKey: "AIzaSyATsuNHm0Dgicy0RytVCHChEHMKHAP_iFU",
  authDomain: "kwitter-191fe.firebaseapp.com",
  databaseURL: "https://kwitter-191fe-default-rtdb.firebaseio.com",
  projectId: "kwitter-191fe",
  storageBucket: "kwitter-191fe.appspot.com",
  messagingSenderId: "1084802714177",
  appId: "1:1084802714177:web:264d38e6da4b437e8214c0",
  measurementId: "G-2CY75DH1PW"
};

firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");



function send(){
  msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like:0
  });
  document.getElementById("msg").value="";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;

console.log(firebase_message_id);
console.log (message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4> "+ name + "<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+ message +"</h4>";
like_button="<button class='btn btn-warning' id="+ firebase_message_id+ " value="+like+" onclick= 'updateLike(this.id)'>";
span_width_tag="<span class='glyphicon glyphicon-thumbs-up'> Like: "+ like +"</span> </button><hr>";
row= name_with_tag+ message_with_tag+ like_button+ span_width_tag;
document.getElementById("output").innerHTML+= row;

  } });  }); }
getData();
function updateLike(message_id){
  console.log("clicked on like button- "+ message_id);
  button_id=message_id;
  likes= document.getElementById(button_id).value;
  update_like= Number(likes)+ 1;
  console.log(update_like);
  firebase.database().ref(room_name).child(message_id).update({
        like:update_like
  });

}
function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}
     