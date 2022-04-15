/* The catchAsync() function is only adding functionality to a function, without executing it,
that is, it received a function, added something to it, and then returned the 'powered version'
of that function. But, when that function should be executed, it's still up to Express to decide.
The catch() handler with next(e) was added to that function, which is now able to handle
asynchronous errors properly. That function is then returned */

/* catchAsync() will accept a function as a parameter, and its objective is to check if there
are any errors in that function. If there aren't, it will return the same function that was
passed as an argument, and the code will be run normally, but if there's an error, it will
catch the error, calling next() on it so it can be handled */

module.exports = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
