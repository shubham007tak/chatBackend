// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlFnVFF5ZEtUVyIsImlhdCI6MTU0NjgzNzA0MzY2MywiZXhwIjoxNTQ2OTIzNDQzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IlBwOHdmdFJRNiIsImZpcnN0TmFtZSI6InZhaWJoYXYiLCJsYXN0TmFtZSI6ImRoaW5ncmEiLCJlbWFpbCI6InZhaWJoYXYuZGhpbmdyYUB4eXouY29tIiwibW9iaWxlTnVtYmVyIjoxMjM0NTY3ODl9fQ.hehNBVQsoIrt-6sw5VaZLQp1yC31x_vzENqn8slR57U"
const userId= "Pp8wftRQ6"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'GluLVrmp_',//putting user2's id here 
  receiverName: "ashish",
  senderId: userId,
  senderName: "vaibhav"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Aditya Kumar")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
