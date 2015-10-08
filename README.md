# metalsmith-differential

> A Metalsmith plugin for building only changed files

For some reason `metalsmith-changed` wasn't ignoring all of the files I
expected it to, so I created this for myself.

Notes:

* Metalsmith must be configured with `clean(false)`
* Must be run after plugins that might change file extensions like
`metalsmith-markdown` because I didn't implement any file extension mapping. 99%
of the processing in my build was `metalsmith-layouts`, so I was only concerned
with running it before that plugin.

## Usage

```javascript
var Metalsmith = require('metalsmith');
var diff = require('metalsmith-differential');

Metalsmith(__dirname)
    .use(diff())
    .build();
```

Optionally, you can pass an object as an argument with keys for `destination`
and `force`.

### destination
Type: `string`
Default: `null`

By default the plugin will use the value from `metalsmith.destination()`. This
option allows it to work within `gulpsmith`, where the destination is set in
gulp and not metalsmith.

### force
Type: `boolean`
Default: `false`

If `true`, then the plugin will do nothing (force a build).

MIT © [Anthony Castle](http://github.com/mrajo)
