var Class = {
    extend: function (child) {
        var ClassObject = function () {
            for (var key in child) {
                this[key] = child[key];
            }
        };
        ClassObject.prototype = this;
        var res = new ClassObject()
        res.constructor = ClassObject;
        return res;
    }
}