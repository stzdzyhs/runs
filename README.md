# runs
A light-weight nodejs package to run Promise/Runnable in series

### Usage
In many senarious, it needs to exec promises in a list one by one.
Basicly, this lib is based on Promise, and encapsulated a promise what to do in a 
Runnable class, override Runnable.run in decent classes.

first, create a Runnable list, e.g:
```js
    let runnables = [
        new Runnable(),
        new Runable(), ....
    ]
```
then, create a SeriesExecutor
```js
    let executor = new SeriesExecutor(runnables);
    executor.run(resolve, reject); // resolve and reject callback
        resolve: function(results) 
            results: array includes all results for each runnable.
        reject: function(err, idx)
            err: the Error object
            idx: the index to indicate which runnable to throw the error.
```
and wait on the resolve function for all results.
If anything error, the reject(err, idx) callback will be invoked.

I am a nodejs novice and,
Hope this useful

### Demo
Please see in the test/testResolve1.js and test/testReject1.js
