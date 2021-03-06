import texts from './texts.js';

const aux = {
  gradient  : 0
}

aux.getGrey       = function(a){return Math.lerp(0,255,a);}
aux.updateGradient    = function(t){aux.gradient = Math.sin(t * 0.003)*0.5 + 0.5;}
aux.readUserLanguage  = function(){
  if (navigator && navigator.languages){
    for (var i in navigator.languages){
      for (var j in texts) {
        if (j == navigator.languages[i]){
          texts.language = j;
          return;
        }
      }
    }
  }
}

Math.lerp       = function(a,b,x){return a+x*(b-a)};
Math.tileDistance   = function(x1, y1, x2, y2){return Math.abs(x1-x2)+Math.abs(y1-y2)};
export default aux;

