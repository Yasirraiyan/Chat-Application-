document.addEventListener('DOMContentLoaded', function() {
    function showTime() {
        document.getElementById('currentTime').innerHTML = new Date().toUTCString();
    }
    showTime();
    setInterval(showTime, 1000);

    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('Send');
    const imageInput = document.getElementById('imageInput');
    const sendImageButton = document.getElementById('SendImage');
    const voiceInput = document.getElementById('voiceInput');
    const sendVoiceButton = document.getElementById('SendVoice');
    const messageList = document.getElementById('messagesList');
    const removeButton = document.getElementById('Remove');

    sendButton.addEventListener('click', function() {
        const messageText = messageInput.value;
        if (messageText.trim()) {
            const li = document.createElement('li');
            li.textContent = messageText;
            messageList.appendChild(li);
            messageInput.value = ''; // Clear the input box after sending the message
        }
    });

    sendImageButton.addEventListener('click', function() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%'; // Ensure the image is responsive
                li.appendChild(img);
                messageList.appendChild(li);
            };
            reader.readAsDataURL(file);
            imageInput.value = ''; // Clear the input after sending the image
        }
    });

    sendVoiceButton.addEventListener('click', function() {
        const file = voiceInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const li = document.createElement('li');
                const audio = document.createElement('audio');
                audio.src = e.target.result;
                audio.controls = true; // Show audio controls
                li.appendChild(audio);
                messageList.appendChild(li);
            };
            reader.readAsDataURL(file);
            voiceInput.value = ''; // Clear the input after sending the voice message
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    removeButton.addEventListener('click', function() {
        // Clear all messages
        while (messageList.firstChild) {
            messageList.removeChild(messageList.firstChild);
        }
    });
});
