/**
 * The function help you parse body json
 * from form-data submitted by user
 * @param {object | array | string | number} payload
 * @returns
 */
exports.parserBodyFromData = (payload) => {
  let result = {};
  const data = Object.entries(payload);

  data.forEach(([key, value]) => {
    if (typeof value === "object") {
      const __result = this.parserBodyFromData(value);

      result = { ...result, ...__result };
    } else {
      result[key] = value;
    }
  });

  return result;
};
