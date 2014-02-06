Surfnet.OnderwijsData.Tools = function() { };
Surfnet.OnderwijsData.Tools.extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}