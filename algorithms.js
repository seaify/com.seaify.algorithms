var AlgorithmsDynamicValue = function() {

  var md5 = require("md5.js");

  this.evaluate = function(context) {
    var array = [];
    if (this.algorithm_name == "bytes") {
      if (this.input){
        return this.bytes(this.input);
      }
    }
    else if (this.algorithm_name == "b64encode") {
    }
    else if (this.algorithm_name == "b64decode") {
    }
    else if (this.algorithm_name == "md5_bytes") {
      if(this.input){
        return md5(this.input);
        //md5 encrypt bytes problem
      }
    }
    else {
      array = ["Choose one algorithm first"];
      return "Choose one algorithm first";
    }
  };
  this.title = function() {
    return "Algorithms";
  };

  this.bytes = function(str) {
    var utf8 = [];

    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;

}
};

AlgorithmsDynamicValue.identifier = "com.seaify.algorithms";
AlgorithmsDynamicValue.title = "algorithms";
AlgorithmsDynamicValue.inputs = [
  DynamicValueInput("algorithm_name", "Algorithms", "Select", {
    "choices": { "bytes": "bytes", "b64encode": "b64encode", "b64decode": "b64decode", "md5_bytes": "md5_bytes" }
  }),
  DynamicValueInput("input", "Input", "String"),
    ];

registerDynamicValueClass(AlgorithmsDynamicValue);
