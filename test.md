## 

1. let var const差異
2. cookie session 差異
3. 閉包
4. 同步vs非同步
5. == 跟 ===差異 
```js
6. 
console.log('one');
setTimeout(function() {
    console.log('two');
}, 0);
console.log('three');

7. 
let a = alert('a');
function test() {
    let b = alert('b');
}
alert(a + b);
```