jQuery Smoothwheel Plugin
=========================
A [jQuery](http://jquery.com/) plugin that adds cross-browser *smooth* scrolling.
##Requirements for jquery-smoothwheel

[jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel/)

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