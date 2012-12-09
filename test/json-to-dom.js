var render = require('json-to-dom'),
    assert = require('component-assert');

var note = {
  title : 'this is a note',
  date : new Date(),
  tags : [ 'javascript', 'travel' ],
  authors : [
    {
      name : 'matt',
      email : 'mattmuelle@gmail.com'
    },
    {
      name : 'andrew',
      email : 'andrew@drew.com'
    }
  ],
  stats : {
    favoriteTags : ['travel', 'blog']
  }
};

var dom = document.createElement('div');
dom.setAttribute('class', 'note');

describe('render', function() {
  var html;
  beforeEach(function() {
    html = dom.cloneNode(true);
  });

  it('should insert at classes', function() {
    html.innerHTML = '<div class="title">title</div>';
    html = render(html, note);
    assert(html.querySelector('.title').innerText === 'this is a note');
  });

  it('should not overwrite other nodes', function() {
    html.innerHTML = 'lol<div class="title">title</div>wahoo!';
    html = render(html, note);
    assert(html.innerHTML === 'lol<div class="title">this is a note</div>wahoo!');
  });

  it('should insert tags in an array using .key', function() {
    html.innerHTML = '<div class="tags"><div class="key"></div></div>';
    html = render(html, note);
    var tags = html.querySelectorAll('.key');
    assert(tags.length === 2);
    assert(tags[0].innerText === 'javascript');
    assert(tags[1].innerText === 'travel');
  });

  it('should repeat the block if .key isnt present', function() {
    html.innerHTML = '<div class="tags"><div class="tag">tag</div></div>';
    html = render(html, note);
    var tags = html.querySelectorAll('.tag');
    assert(tags.length === 2);
    assert(tags[0].innerText === 'tag');
    assert(tags[1].innerText === 'tag');
  });

  it('should handle objects within arrays', function() {
    html.innerHTML = '<div class="authors"><span class="name"></span><span class="email"></span></div>';
    html = render(html, note);

    var names = html.querySelectorAll('.name');
    assert(names.length === 2);
    assert(names[0].innerText === 'matt');
    assert(names[1].innerText === 'andrew');

    var emails = html.querySelectorAll('.email');
    assert(emails.length === 2);
    assert(emails[0].innerText === 'mattmuelle@gmail.com');
    assert(emails[1].innerText === 'andrew@drew.com');
  });

  it('array of objects places nodes in the correct order', function() {
    html.innerHTML = '<div class="authors"><span class="name"></span><span class="email"></span></div>';
    html = render(html, note);

    var names = html.querySelectorAll('.name'),
        emails = html.querySelectorAll('.email');

    // Ensure correct order
    assert(names[0].parentNode.className === 'authors');
    assert(names[0].nextSibling.innerText === 'mattmuelle@gmail.com');
    assert(emails[0].parentNode.className === 'authors');
    assert(emails[0].nextSibling.innerText === 'andrew');
    assert(names[1].parentNode.className === 'authors');
    assert(names[1].nextSibling.innerText === 'andrew@drew.com');
    assert(emails[1].parentNode.className === 'authors');
  });

  it('should handle complex json objects', function() {
    html.innerHTML = '<div class="stats"><div class="favoriteTags"><span class="key"></span><span class="extra">hi</span></div></div>';
    html = render(html, note);
    var expected = '<div class="stats"><div class="favoriteTags"><span class="key">travel</span><span class="extra">hi</span><span class="key">blog</span><span class="extra">hi</span></div></div>';
    assert(html.innerHTML === expected);
  });

  it('should handle arrays as the initial value', function() {
    html.innerHTML = '<div class="people"><span class="first">First Name</span><span class="last">Last Name</span></div>';
    // console.log(html.firstChild);
    html = render(html.firstChild, [
      { first : "matt", last : "mueller" },
      { first : "andrew", last : "quinn" }
    ]);
    var expected = '<div class="people"><span class="first">matt</span><span class="last">mueller</span><span class="first">andrew</span><span class="last">quinn</span></div>';
    assert(html.outerHTML === expected);
  });
});

