/**
 * @param --> async function
 * @result --> async function wrapped for catching errors
 */
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
