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

// exports.retrieveModels = function(){
// 	//write mySQL query here 
// 	//to retrieve completed PictureModels
// }