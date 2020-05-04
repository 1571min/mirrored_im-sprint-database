// eslint-disable-next-line
const app = {
  server: "http://localhost:3000/classes/messages",
  init: function() {
    get()
  }
};

let serverUrl = null;

const get = () => {
  if(!serverUrl) {
    serverUrl = app.server
  }
  fetch(serverUrl, {
    method: 'GET'
  }).then(res => {

    return res.json()
  }).then(data => {
    dataToHtml(data)
  })
  serverUrl = null;
}

const post = (message) => {
  fetch(app.server, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    }
  }). then(res => {return res.json()})
  .then(() => {
    if(message.roomname === 'all') {
      serverUrl = app.server;
    } else {
      serverUrl = app.server+"?roomname="+message.roomname
    }
    read.innerHTML = "";
    get();
  })
}


let read = document.querySelector("#read")
let display = document.querySelector('.newRoomname');

// eslint-disable-next-line no-unused-vars
const roomFilter = () => {
  let room = document.getElementById('room');
  let roomName = room.options[room.selectedIndex].value;
  if(roomName === "New Room") {
    display.classList.add('newRoomnameDisplay');
  } else {
    display.classList.remove('newRoomnameDisplay');
    if(roomName === "all") {
      serverUrl = app.server;
    } else {
      serverUrl = app.server+"?roomname="+roomName
    }
    read.innerHTML = "";
    get();
  }
}

// eslint-disable-next-line no-unused-vars
const onClick = () => {
  let name = document.querySelector('#name').value;
  let content = document.querySelector('#content').value;
  let room = document.getElementById('room');
  let roomName = room.options[room.selectedIndex].value;
  if(roomName === "New Room") {
    roomName = document.querySelector('.newRoomname').value;
    display.classList.remove('newRoomnameDisplay')
    let newOption = document.createElement('option');
    newOption.value = roomName;
    newOption.textContent = roomName;
    newOption.setAttribute('selected', 'selected');
    room.add(newOption)
  }
  if(name.indexOf('<' || '>') !== -1 || content.indexOf('<' || '>') !== -1 ||  roomName.indexOf('<' || '>') !== -1 ) {
    alert('내용에 < 또는 >가 포함되어 있습니다')
  } else {
    let message = {
      username: name,
      text: content,
      roomname: roomName
    }
    document.querySelector('#name').value = "";
    document.querySelector('#content').value = "";
    document.querySelector('.newRoomname').value = "";
    post(message);
  }
}

let template = document.querySelector(".template")

const dataToHtml = (data) => {
  if(data) {
    data.map((x) => {
      let username = x.username;
      let text = x.text;
      // let date = x.date.slice(0,10)+' '+x.date.slice(11,19);
      let newTemp = document.importNode(template.content, true);
      let nodes = newTemp.querySelectorAll('li');
      // nodes[0].textContent = date;
      nodes[1].textContent = username;
      nodes[2].textContent = text;
      read.prepend(newTemp)
    })
  }
}

app.init()