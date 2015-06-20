// will contain and export callback functions for server actions
var count = 0;
module.exports.serverId = function(cb) {
  //instantiate new line, save the line to db
  //get the line in db's id to serve back.
  //http get request that pings server
  //server uses bookshelf to talk to db
  //dummy id for now
  cb(++count);
};


