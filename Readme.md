
# json-to-dom

  Fill in DOM nodes with JSON. Supports arrays.

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

It's more flexible and simpler than most templating / binding engines.

## Design

* json-to-dom assumes the tags you are interested in are classes and that you are looking to replace `innerText`. I'm looking for ways to make this more flexible.

* When json-to-dom encounters an arrays, it will repeat that block, even if you don't have any tags to match:

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

* You can reference plain array values using the `.key` class:

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

* When json-to-dom encounters an object, it will fill in the classes it finds in the block using the object's keys:

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

## License

  MIT
