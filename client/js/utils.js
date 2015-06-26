//use this guid generator as the id hashing fn to generate a unique id
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
//var idHash = function() { //non-cb version
//var hashCode = function(rand){
//var hash = 0;
//if (rand.length == 0) return hash;
//for (i = 0; i < rand.length; i++) {
//char = rand.charCodeAt(i);
//hash = ((hash<<5)-hash)+char;
//hash = hash & hash; // Convert to 32bit integer
//}
//return hash;
//};
//return hashCode(_.shuffle(['a','b','c','d']).join(''));
//};
