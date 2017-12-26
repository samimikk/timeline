# Timeline
Simple Javascript timeline

Creates a simple SVG timeline. Demo at [Codepen.io](https://codepen.io/samimikk/pen/POMQgG)

# Usage
## Javascript
```javascript
var events = [
  [new Date("2012-03-25"),new Date("2012-09-30"),"Description","#B5FFE1"],
  [new Date("2013-01-01"),new Date("2015-07-31"),"Description","#93E5AB"],
  [new Date("2014-01-01"),new Date("2019-07-31"),"Description","#65B891"],
  [new Date("2012-01-01"),new Date("2014-07-31"),"Description","#4E878C"],
  [new Date("2011-09-01"),new Date("2015-01-01"),"Description","#00241B"]
]

var timeline = new Timeline('timeline',events);
```
## HTML
```HTML
<div id="timeline"></div>
```
