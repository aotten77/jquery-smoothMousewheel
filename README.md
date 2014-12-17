jQuery Smoothwheel Plugin
=========================
A [jQuery](http://jquery.com/) plugin that adds cross-browser *smooth* scrolling by using requestAnimationFrame. It provides for a better user experience on e.g. scrolling animations. To see it in action at [joinmedia.de](http://joinmedia.de).

##Requirements for jquery-smoothwheel

- [jQuery](https://github.com/jquery/jquery)
- [jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel/)
- [requestAnimationFrame polyfill for IE8 & IE9](https://gist.github.com/paulirish/1579671)

##Usage
```js
$(function () {
    $.smoothwheel({
        // defaults
        friction: 0.2,
        deltaSteps: 100
    });
});
```

| Behaviour           | Values              | Description                                                                                                                                          |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `friction`     | `number`  | The amount of friction the site |
| `deltaSteps` | `number`   | Specifies the scrolling step in pixel off one mousewheel step|


##Browser and os detection
Browsers that support *smooth* scrolling natively should be excluded. This condition is also built in the plugin, but prevent the execution of the plugin on these browsers to reduce unnecessary overhead.
```js
$(function () {
    if (navigator.platform.toLowerCase().indexOf('win') === 0 && navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        $.smoothwheel();
    }
});
```