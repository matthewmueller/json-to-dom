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
 * Dataset mappings
 */

var map = {
  'text' : 'innerText',
  'html' : 'innerHTML'
};

/**
 * json-to-dom
 *
 * @param {DomNode} el
 * @param {Mixed} val
 * @return {DomNode}
 */

function json_to_dom(el, val, key, obj) {
  obj = obj || {};
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
        json_to_dom(node, val[k], k, val);
      }
    }
  } else {
    var keyNode = node.querySelector('.key'),
        dataset = node.dataset,
        values = [];

    Object.keys(dataset).forEach(function(attr) {
      var dsv = dataset[attr],
          val = obj[dsv] || val;
      delete dataset[attr];
      attr = map[attr] || attr;
      if(keyNode) set(keyNode, attr, val);
      else if(typeof key != 'number') set(node, attr, val);
      values.push(dsv);
    });

    if(!values.length || !~values.indexOf(key)) {
      if(keyNode) set(keyNode, 'innerText', val);
      else if(typeof key != 'number') set(node, 'innerText', val);
    }
  }

  return el;
}

/**
 * Set
 */

function set(node, attr, val) {
  val = val || '';
  switch(attr) {
    case 'innerHTML':
    case 'innerText':
      node[attr] = val;
      break;
    default:
      node.setAttribute(attr, val);
  }
  return node;
}
