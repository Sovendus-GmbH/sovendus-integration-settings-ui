import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/package/index.ts",
      output: "dist/package/index",
      options: {
        type: "react-tailwind",
        packageConfig: {
          dtsEntryRoot: "src/package",
          dtsInclude: ["src/package/**/*"],
          isPackage: true,
        },
      },
    },
    {
      input: "src/app/index.ts",
      output: "dist/demo/index",
      options: {
        type: "react-tailwind",
        packageConfig: {
          dtsEntryRoot: "src",
          dtsInclude: ["src/**/*"],
          isPackage: true,
        },
      },
    },
    {
      input: "src/app/utils-index.ts",
      output: "dist/demo-utils/index",
      options: {
        type: "react-tailwind",
        packageConfig: {
          dtsEntryRoot: "src",
          dtsInclude: ["src/**/*"],
          isPackage: true,
        },
      },
    },
  ],
  filesOrFoldersToCopy: [{ input: "src/app/logos", output: "dist/logos" }],
};

export default buildConfig;
