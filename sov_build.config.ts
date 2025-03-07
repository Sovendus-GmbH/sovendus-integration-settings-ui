import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/index.ts",
      output: "dist/index",
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
      input: "src/app/index.ts",
      output: "dist/demo-index",
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
