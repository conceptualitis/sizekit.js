# Sizekit.js

Sizekit.js exists to make testing your responsive layout easier with keyboard shortcuts, console use and super-easy breakpoint setting instead of manual window resizing (barf) and calculating (so boring). Who can read the console when it's only 400px wide anyway?

Seriously though, never push this to production. Really. I mean it.

## In the console, the mighty console

Sizekit.js creates a friendly global object named `sk`. You and `sk` are going to have some good times together. Here are some suggestions for use in your console!

* `sk.c()` or `sk.customize()` - just pass this guy an object to override the defaults! You can use this function in the console or in some script on your page after you include sitekit.js. Speaking of, here are the defaults:
 * **units:** "px"
 * **background:** "#999"
 * more to come?!
* `sk.w()` or `sk.width()` - resizes the page width, so&hellip;
 * `sk.w(400)` - resizes to 400px (later it will use whatever unit you've set with `sk.customize()`, not just pixels)
 * `sk.w("600px")` - resizes to 600px
 * `sk.w("250em")` - haha, don't do this! But it'll work later, promise. For now, the centering is broken.
* `sk.p()` or `sk.preset()` - pass it a string to set the page size to one of these fun devices:
 * `sk.p("iphone")`
 * `sk.p("iphone-retina")`
 * `sk.p("ipad")`
 * `sk.p("ipad-retina")`
 * more to come?!
* `sk.setBreakpoint()` - sets a breakpoint for your media queries that you can retrieve later. I'd recommend using the keyboard shortcut instead of this command.
* `sk.getBreakpoints()` - spits out media queries that're ready to plop into your css! They look like this:

```css
@media (max-width: 380px) {
/* stuff and things */
}

@media (max-width: 470px) {
/* stuff and things */
}

@media (max-width: 500px) {
/* stuff and things */
}

@media (max-width: 520px) {
/* stuff and things */
}
```

## Keyboard shortcuts, aka "The Goods"

* `shift + up-arrow` - widens the page by 1px
* `shift + alt + up-arrow` - widens the page by 10px (I consider this to be Photoshop style)
* `shift + down-arrow` - narrows the page by 1px
* `shift + alt + down-arrow` - narrows the page by 10px
* `alt + +` - that doesn't make sense&hellip; it's just the alt key and the plus key. This sets a breakpoint for your media queries.


## Danger!!!

Big caveats right here:

* I've only tested this in Chrome Canary so ha ha hrm good luck! Well, that's not entirely true. I've done the bare minimum to get it functioning in Firefox.
* Non-pixel units are somewhat supported (but not really).