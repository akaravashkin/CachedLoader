(function() {
var _cache = {},
    _bus = {};

function _pushToBus(url, callBack) {
  if (_bus[url] === undefined) 
      _bus[url] = [];
    
  _bus[url].push(callBack);
};

window.CachedLoader = Class.extend({
  cachedCall: function(url, callBack) {
    if (_cache[url] === undefined) {
      _pushToBus(url, callBack);
      _cache[url] = null;

      $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
          _cache[url] = data;
          if (_bus[url] && _bus[url].length) {
            for (var i = 0; i < _bus[url].length; i++) {
              _bus[url][i](data)
            }
          }
          delete _bus[url];
        }
      });
      
    } else {
      if (_cache[url] != null) {
        callBack(_cache[url])
      } else {
        _pushToBus(url, callBack)
      }
    }
  },
  
  resetCache: function(url) {
    if (url) {
      delete _cache[url];
      delete _bus[url];
    } else {
      _cache = {};
      _bus = {};
    }
  } 
});
})();