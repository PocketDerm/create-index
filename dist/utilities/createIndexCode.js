"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safeVariableName = fileName => {
  const indexOfDot = fileName.indexOf(".");
  let safeFileName = fileName;

  if (indexOfDot !== -1) {
    safeFileName = fileName.slice(0, indexOfDot);
  }

  return _lodash.default.upperFirst(_lodash.default.camelCase(safeFileName));
};

const buildExportBlock = files => {
  let importBlock;
  importBlock = _lodash.default.map(files, fileName => {
    // Removes .ts for TypeScript compatibility
    const nameWithoutExtension = fileName.replace(/\.[^.]*$/, "");
    return "export { default as " + safeVariableName(fileName) + " } from './" + nameWithoutExtension + "';";
  });
  importBlock = importBlock.join("\n");
  return importBlock;
};

var _default = function _default(filePaths) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let code;
  let configCode;
  code = "";
  configCode = "";

  if (options.banner) {
    const banners = _lodash.default.isArray(options.banner) ? options.banner : [options.banner];
    banners.forEach(banner => {
      code += banner + "\n";
    });
    code += "\n";
  }

  if (options.config && _lodash.default.size(options.config) > 0) {
    configCode += " " + JSON.stringify(options.config);
  }

  code += "// @create-index" + configCode + "\n\n";

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort(); // Add single new-line at end of file if there are exports for
    // compatibility with prettier standard

    code += buildExportBlock(sortedFilePaths) + "\n";
  }

  return code;
};

exports.default = _default;
//# sourceMappingURL=createIndexCode.js.map