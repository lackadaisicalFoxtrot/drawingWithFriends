//this is just some random hashing shit for now. unused
var hasherino = function(cb) {

  var hashCode = function(rand){
    var hash = 0;
    if (rand.length == 0) return hash;
    for (i = 0; i < rand.length; i++) {
      char = rand.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };
  var hash = hashCode(_.shuffle(['a','b','c','d']).join(''));
  cb(hash);
};

//http get on client side to server id OR....
//hash it on the client side like so
//

////instantiate new line, save the line to db
////get the line in db's id to serve back.
////http get request that pings server
////server uses bookshelf to talk to db
////dummy id for now
//cb(++count);
