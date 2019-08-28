/*class UserChoice{
    constructor() {
    }

    catchDecision(){
       Decision();
       Decision.prototype = EE.prototype;
       Decision.prototype.constructor = Decision
    }


}

function Decision() {
    var EE = require("events").EventEmitter;
  // call EE constructor
  EE.call(this);

  // myProperty instance variable
  var selection;

  // define dynamic property
  Object.defineProperty(this, "selection", {
    get: function() {
      return selection;
    },
    set: function(newValue) {
      selection = newValue;
      this.emit("change:selection", selection);
      return selection;
    }.bind(this)
  });
}*/
var EE = require("events").EventEmitter;
function UserChoice() {
  // call EE constructor
  EE.call(this);

  // myProperty instance variable
  var selection;

  // define dynamic property
  Object.defineProperty(this, "selection", {
    get: function() {
      return selection;
    },
    set: function(newValue) {
      selection = newValue;
      this.emit("change:selection", selection);
      return selection;
    }.bind(this)
  });
}
  UserChoice.prototype = EE.prototype;
  UserChoice.prototype.constructor = UserChoice


module.exports = UserChoice;