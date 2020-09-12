const parseCookies = (req, res, next) => {
  let outputObj = {};
  if (req.headers.cookie) {
    var cookiesArr = req.headers.cookie.split('; ');

    for (let cookie of cookiesArr) {
      let splitCookie = cookie.split('=');
      outputObj[splitCookie[0]] = splitCookie[1];
    }
  }
  req.cookies = outputObj;
  next(null, outputObj);
};

module.exports = parseCookies;