const firebaseConfig = {
    apiKey: "AIzaSyBr2oF36Du5mETgl74VHW_HioJSvgDORaU",
    authDomain: "ayush-chat-app-eaa13.firebaseapp.com",
    projectId: "ayush-chat-app-eaa13",
    storageBucket: "ayush-chat-app-eaa13.firebasestorage.app",
    messagingSenderId: "225838197190",
    appId: "1:225838197190:web:07a29039fed5141ef1aac7"
  };
  
  // ✅ This now works with compat version
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const messagesDiv = document.getElementById('messages');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  
  function sendMessage() {
    const name = nameInput.value;
    const message = messageInput.value;
  
    if (!name || !message) return;
  
    db.collection('messages').add({
      name,
      message,
      timestamp: Date.now()
    });
  
    messageInput.value = '';
  }
  
  db.collection('messages').orderBy('timestamp')
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const msg = doc.data();
        const div = document.createElement('div');
        div.textContent = `${msg.name}: ${msg.message}`;
        messagesDiv.appendChild(div);
      });
    });
  