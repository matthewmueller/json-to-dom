/**
 * Module dependencies
 */

var isArray = require('isArray'),
    isObject = require('isObject');

/**
 * Export `json-to-dom`
 */

module.exports = json_to_dom;

/**
 * json-to-dom
 *
 * @param {DomNode} el
 * @param {Mixed} val
 * @return {DomNode}
 */

function json_to_dom(el, val, key) {
  var node = el;

  if(key && typeof key == 'string')
    node = el.querySelector('.' + key);
  if(!node) return el;

  if(isArray(val)) {
    var out = [], clone;

    for(var i = 0, len = val.length; i < len; i++) {
      clone = node.cloneNode(true);
      clone = json_to_dom(clone, val[i], i);
      out.push(clone.innerHTML);
    }

    node.innerHTML = out.join('');

  } else if(isObject(val)) {
    for(var k in val) {
      if(val.hasOwnProperty(k)) {
        json_to_dom(node, val[k], k);
      }
    }
  } else {
    var keyNode = node.querySelector('.key');
    if(typeof key != 'number') return node.innerText = val;
    else if(keyNode) keyNode.innerText = val;
  }

  return el;
}
