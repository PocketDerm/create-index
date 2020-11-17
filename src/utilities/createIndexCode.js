import _ from "lodash";

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf(".");
  let safeFileName = fileName;

  if (indexOfDot !== -1) {
    safeFileName = fileName.slice(0, indexOfDot);
  }

  return _.upperFirst(_.camelCase(safeFileName));
};

const buildExportBlock = (files) => {
  let importBlock;

  importBlock = _.map(files, (fileName) => {
    // Removes .ts for TypeScript compatibility
    const nameWithoutExtension = fileName.replace(/\.[^.]*$/, "");
    return (
      "export { default as " +
      safeVariableName(fileName) +
      " } from './" +
      nameWithoutExtension +
      "';"
    );
  });

  importBlock = importBlock.join("\n");

  return importBlock;
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;

  code = "";
  configCode = "";

  if (options.banner) {
    const banners = _.isArray(options.banner)
      ? options.banner
      : [options.banner];

    banners.forEach((banner) => {
      code += banner + "\n";
    });

    code += "\n";
  }

  if (options.config && _.size(options.config) > 0) {
    configCode += " " + JSON.stringify(options.config);
  }

  code += "// @create-index" + configCode + "\n\n";

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths) + "\n\n";
  }

  return code;
};
