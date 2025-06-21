# SelectorJS

**SelectorJS** is a lightweight, chainable JavaScript utility for DOM manipulation — inspired by jQuery, built for modern vanilla JavaScript. Clean syntax, no dependencies.

## How to Use SelectorJS

To use SelectorJS in your code, include it via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/selectorjs@1.0.0/main.js"></script>
```

## Documentation

- html(content): Sets or gets the inner HTML of each selected element.
- css(attribute, value): Sets or gets a CSS style property of each selected element.
- text(content): Sets or gets the text content of each selected element.
- on(events, callback): Attaches event listeners to each selected element. Supports space-separated multiple events.
- each(callback): Loops through and calls a function on each selected element.
- attr(name, value): Sets or gets attributes from DOM elements.
- addClass(className): Adds a class (or multiple classes) to each selected element.
- removeClass(className): Removes a specified class from each selected element.
- toggleClass(className): Toggles a class on each selected element.
- $(selector): Core selector function returning a chainable instance of matched elements.