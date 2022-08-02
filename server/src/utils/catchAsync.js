/**
 * @param --> async function
 * @result --> async function wrapped for catching errors
*/
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  