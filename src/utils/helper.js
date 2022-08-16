// get random number of any length
export function randomNumber(len) {
  var x = "";
  for (var i = 0; i < len; i++) {
    x += Math.floor(Math.random() * 10);
  }
  return x;
}
