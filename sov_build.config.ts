import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/package/index.ts",
      output: "dist/package/index",
      options: {
        type: "react-tailwind",
        inlineCss: true,
        packageConfig: {
          dtsEntryRoot: "src/package",
          dtsInclude: ["src/package/**/*"],
          isPackage: true,
        },
      },
    },
    {
      input: "src/package/index.ts",
      output: "dist/package-style-less/index",
      options: {
        type: "react-tailwind",
        inlineCss: false,
        buildOptions: {
          cssCodeSplit: false,
        },
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
        inlineCss: true,
        packageConfig: {
          dtsEntryRoot: "src/app",
          dtsInclude: ["src/app/**/*"],
          isPackage: true,
        },
      },
    },
    {
      input: "src/app/index.ts",
      output: "dist/demo-style-less/index",
      options: {
        type: "react-tailwind",
        inlineCss: false,
        buildOptions: {
          cssCodeSplit: false,
        },
        packageConfig: {
          dtsEntryRoot: "src/app",
          dtsInclude: ["src/app/**/*"],
          isPackage: true,
        },
      },
    },
  ],
  filesOrFoldersToCopy: [{ input: "src/app/logos", output: "dist/logos" }],
};

export default buildConfig;
