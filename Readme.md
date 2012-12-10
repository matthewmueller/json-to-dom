
# json-to-dom

  Fill in DOM nodes with JSON. Supports arrays and attributes.

## Example

```html
<div class="note">
  <p class="title">title</p>
  <ul class="tags">
    <li class="tag">
      <span class="name">tag</span>
    </li>
  </ul>
</div>
```

```js
var json = {
  title : 'Javascript',
  tags : [
    { name : 'programming' },
    { name : 'javascript' }
  ]
};

var render = require('json-to-dom');
render(document.querySelector('.note'), json);
```

outputs:

```html
<div class="note">
  <p class="title">Javascript</p>
  <ul class="tags">
    <li class="tag">
      <span class="name">programming</span>
    </li>
    <li class="tag">
      <span class="name">javascript</span>
    </li>
  </ul>
</div>
```

## Installation

    $ component install matthewmueller/json-to-dom

## Motivation

It's simpler and more flexible than most templating / binding engines.

## API

### `el = render(el, template)`

Fills in `el` with the `template`. `template` may either be an object or array.

```js
el = render(document.querySelector('.contact'), author);
```

If the element is already on the page and you don't want to alter it immediately, use `cloneNode(true)`

```js
var body = render(document.body.cloneNode(true), json);
// stuff
document.body.innerHTML = body.innerHTML;
```

## Design

### Arrays

#### json-to-dom will iterate over the selected block, even if you don't have any matched tags:

```html
<ul class="people">
  <li class="person">
    <span class="first">First Name<span>
    <span class="last">Last Name</span>
  </li>
</ul>
```

```js
var people = [
  { first : "matt", last : "mueller" },
  { first : "drew", last : "quinn" }
];

render(document.querySelector('.people'), people);
```

outputs:

```html
<ul class="people">
  <li class="person">
    <span class="first">matt<span>
    <span class="last">mueller</span>
  </li>
  <li class="person">
    <span class="first">drew<span>
    <span class="last">quinn</span>
  </li>
</ul>
```

#### You can reference plain array values using the `.key` class:

```html
<ul class="people">
  <li class="person">
    <span class="key">name</span>
  </li>
</ul>
```

```js
var people = ['matt', 'drew'];

render(document.querySelector('.people'), people);
```

outputs:

```html
<ul class="people">
  <li class="person">
    <span class="key">matt<span>
  </li>
  <li class="person">
    <span class="key">drew<span>
  </li>
</ul>
```

### Objects

#### json-to-dom will fill in the classes it finds in the block using the object's keys:

```html
<div class="email">
  <div class="subject">subject</div>
  <div class="from">from</div>
  <div class="to">to</div>
  <div class="message">message</div>
</div>
```

```js
var email = {
  subject : 'You inherited $11.3 million from the death of your uncle',
  from : 'money@nigeria.com',
  to : 'matt@matt.com',
  message : 'Reply with your bank credentials so we can send you the money'
}

render(document.querySelector('.email'), email)
```

outputs:

```html
<div class="email">
  <div class="subject">You inherited $11.3 million from the death of your uncle</div>
  <div class="from">money@nigeria.com</div>
  <div class="to">matt@matt.com</div>
  <div class="message">Reply with your bank credentials so we can send you the money</div>
</div>
```

### Setting attributes

json-to-dom will also work with attributes. The supported attributes are:

* `data-html` : will set the `innerHTML`
* `data-text` : will set the `innerText` (the default)
* `data-[attr]` : will set the `attr` (ex. `data-value`)

When you use data attributes, you have access to the other keys in the object block.

```html
<div class="note">
  <a class="title" data-href="url"></a>
</div>
```

```js
var note = {
  title : "This is a note",
  url : "http://notes.com"
}

render(document.querySelector('.note'), note);
```

outputs:

```html
<div class="note">
  <a class="title" href="http://notes.com">This is a note</a>
</div>
```

If you'd like to not add the `innerText`, simply use a data attribute with the name of the class:

```html
<div class="note">
  <a class="title" data-href="title"></a>
</div>
```

outputs:

```html
<div class="note">
  <a class="title" href="this is a note"></a>
</div>
```

## License

  MIT
