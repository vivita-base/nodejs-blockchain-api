module.exports = (async () => {
  const Axios = require("axios");
  const ObjectUtil = require("../utils/object");
  const qs = require("querystring");

  // const supportedMethods = ["GET", "POST", "PATCH", "PUT", "DELETE"];
  // Headers - single quotes
  const request = async (name, endpoint, method, headers, data) => {
    const d = { err: { code: 0, message: "" }, res: {} };let r, sql, vars;

    if (headers === undefined || ObjectUtil.isEmpty(headers)) {
      headers = {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }

    if (
      headers["Content-Type"] !== undefined &&
      headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      data = qs.stringify(data);
    }

    const source = Axios.CancelToken.source();

    var axiosData = {
      cancelToken: source.token,
      async: true,
      method: method,
      timeout: 35000,
      headers: headers,
      url: endpoint,
    };

    if (method !== "GET") {
      axiosData.data = data;
    }
    await Axios(axiosData)
      .then(function (response) {
        if (response.data !== undefined) {
          d.res = response.data;
        }
      })
      .catch(function (error) {
        d.err.code = 1;
        d.err.message = "Server Error";
        // console.log("error",error);
        if (
          error !== undefined &&
          error.response !== undefined &&
          error.response.data !== undefined
        ) {
          d.err.json = error.response.data;
        }
      })
      .finally(function () {});

    return d;
  };

  return {
    request,
  };
})();
