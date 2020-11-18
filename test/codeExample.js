import _ from "lodash";

export default (code, withTwoNewlines = false) => {
  return _.trim(code) + `${withTwoNewlines ? "\n\n" : "\n"}`;
};
