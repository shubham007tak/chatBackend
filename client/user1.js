// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Im1MdnpaTEVCVyIsImlhdCI6MTU0NjgzNjI2NzcyMSwiZXhwIjoxNTQ2OTIyNjY3LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6IkdsdUxWcm1wXyIsImZpcnN0TmFtZSI6InZhaWJoYXYiLCJsYXN0TmFtZSI6ImRoaW5ncmEiLCJlbWFpbCI6ImFiY2RAeHl6LmNvbSIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5fX0.CudvLtEhfXL8-YEqR0qH3i4yCRoz5H4qI4ZHSQ-TDL8"
const userId = "GluLVrmp_"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'Pp8wftRQ6',//putting user2's id here 
  receiverName: "vaibhav",
  senderId: userId,
  senderName: "ashish"
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

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Mr Xyz")

  })




}// end chat socket function

chatSocket();
