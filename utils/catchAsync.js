/* catchAsync() will accept a function as a parameter, and its objective is to check if there
are any errors in that function. If there aren't, it will return the same function that was
passed as an argument, and the code will be run normally, but if there's an error, it will
catch the error, calling next() on it so it can be handled */

module.exports = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};
