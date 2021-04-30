const app = new Vue({
  el: '#app',
  data: {
    title: 'Chat demo',
    name: '',
    text: '',
    messages: [],
    rooms: [],
    socket: null,
  },
  methods: {
    sendMessagePM() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (this.validateInput()) {
        const message = {
          text: this.text,
          receiver: urlParams.get('receiver'),
        };
        this.socket.emit('msgPrivateToServer', message);
        this.text = '';
      }
    },
    getRooms() {
      console.log('hii');
      this.socket.emit('getRooms', {});
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.socket = io('http://localhost:3000', {
      query: 'token=' + urlParams.get('token'),
    });

    this.socket.on('connect', (message) => {
      //   this.receivedMessage(message);
      console.log(message);
      console.log('connected');
      this.getRooms();
    });

    this.socket.on('getRooms', (message) => {
      console.log(message);
      this.rooms = [...message];
    });

    this.socket.on('msgPrivateToClient', (message) => {
      this.receivedMessage(message);
    });
  },
});
