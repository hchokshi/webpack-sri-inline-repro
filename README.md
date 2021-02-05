## Minimal repro for [waysact/webpack-subresource-integrity#147](https://github.com/waysact/webpack-subresource-integrity/issues/147)

To repro:
```bash
git clone https://github.com/hchokshi/webpack-sri-inline-repro.git
cd webpack-sri-inline-repro
npm ci
npm run build-no-inline # works
npm run build           # does not work
```

The `build` script uses script-ext-webpack-plugin's `inline` functionality to inline the webpack runtime chunk in the output HTML. The `build-no-inline` script disables the `inline` option.

- `dist/noInline` contains the output of `build-no-inline`
    - one main chunk
    - one async chunk
    - *one runtime chunk*
    - one HTML file
- `dist/inline` contains the *expected* output of `build`. This was done by patching `webpack-subresource-integrity` in `node_modules` with this change - [webpack-subresource-integrity#148](https://github.com/waysact/webpack-subresource-integrity/pull/148)
    - one main chunk
    - one async chunk
    - one HTML file with *inline runtime chunk*

---

## Error output from `build`:
```
> webpack --mode production

assets by status 4.26 KiB [cached] 4 assets
Entrypoint app = runtime.js app.js
runtime modules 9.06 KiB 11 modules
cacheable modules 82 bytes
  ./index.js 47 bytes [built] [code generated]
  ./async.js 35 bytes [built] [code generated]

ERROR in   TypeError: Cannot convert undefined or null to object

  - hasOwnProperty

  - index.js:237 SubresourceIntegrityPlugin.processTag
    [webpack-sri-inline-repro]/[webpack-subresource-integrity]/index.js:237:49

  - index.js:318
    [webpack-sri-inline-repro]/[webpack-subresource-integrity]/index.js:318:48

  - Array.forEach

  - index.js:318
    [webpack-sri-inline-repro]/[webpack-subresource-integrity]/index.js:318:26


  - new Promise


  - Hook.js:22 Hook.PROMISE_DELEGATE [as _promise]
    [webpack-sri-inline-repro]/[tapable]/lib/Hook.js:22:14

  - index.js:311
    [webpack-sri-inline-repro]/[html-webpack-plugin]/index.js:311:81



webpack 5.20.2 compiled with 1 error in 292 ms
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! @ build: `webpack --mode production`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the @ build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```
