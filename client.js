const DB_NAME = 'userCursors';

function SharedbMultipleCursors(socket, ace) {
  const MAX_USERS = 50;

  // no error checking for now
  const _mode = prompt('Insert (unique) username:', "user" + Math.floor(Math.random() * MAX_USERS));
  const username = _mode;



  // listen for local cursor changes
  ace.selection.on('changeCursor', function() {
    console.log('cursor change to: ' + JSON.stringify(ace.getCursorPosition()));
    //console.log('sending to socket')
    //socket.send(JSON.stringify(ace.getCursorPosition()));
  });

  socket.addEventListener('message', (message) => {
    console.log('client received: ' + message);
  })

}

module.exports = SharedbMultipleCursors;