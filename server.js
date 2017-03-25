import redis from 'redis';

const DB_NAME = 'userCursors';

module.exports = function subscribe(redisUrl) {
  console.log('inside multiple-cursors subscribe');
  return (ctx) => {
    const rc = redis.createClient(redisUrl);

    console.log('inside multiple-cursors subscribe');
    // try to push something to redis
    rc.hset([DB_NAME, username, "should be able to see this"], function(err, readOnly) {
      if (err) throw err;
      rc.quit();
    });

    const pub = redis.createClient(redisUrl);
    const sub = redis.createClient(redisUrl);

    sub.on('message', (channel, message) => {
    if(channel == 'multiple-cursors') {
      if(message == 'newUser') {
        // handle new user here
        console.log('newUser event');
        ctx.websocket.send('to sockect newUser event');
      } else if(message == 'removeUser') {
        // handle remote user leaving here
        console.log('removeUser event');
        ctx.websocket.send('to sockect newUser event');
      } else if(message == 'cursorChange') {
        // handle cursor change here
        console.log('cursorChange event');
        ctx.websocket.send('to sockect newUser event');
      } else {
        console.warn(`unhandled message: ${message}`);
      }
    }
  });

  sub.subscribe('multiple-cursors');

  // listen to socket messages from client
  ctx.websocket.on('message', (message) => {
    try {
      message = JSON.parse(message);
    } catch(e) {
      // meh
    }
  })


  }


}