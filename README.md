## sitecore-certification-exam-prep-typescript-preact

Sitecore Certified Platform Associate Developer Exam Prep App with TypeScript Preact X.

Soucre code for [this blog post](https://www.mydatahack.com/sitecore-9-certified-platform-associate-developer-exam-prep-quiz/).

### Get Started

```
npm i

npm start
```

### Build app

```
npm run build
```

## Development Reference

### Preact X Installation

When this was made, preact X was in alpha stage. Needed @next suffix.
```
npm i preact@next
```
### Redux 

With Preact X, use react-redux instead of preact-redux

```
npm i react-redux redux redux-thunk styled-jsx-preact 
```

Note: preact/compat is moved to the core. No need to install preact-compat

### Running fetch on moch integration test in node environment

```
npm i --save-dev @types/isomorphic-fetch isomorphic-fetch
```

Then, replace fetch with isomorphic-fetch in the test file

```javascript
import fetch from 'isomorphic-fetch';
(<any>global).fetch = fetch;
```

## PWA Support

### Generation manifest.json file and icons

Used [Web App Manifest Generator](https://app-manifest.firebaseapp.com/). 