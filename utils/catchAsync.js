module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);

//READABLE VERSION :

// module.exports = function (fn) {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => next(err));
//   };
// };
