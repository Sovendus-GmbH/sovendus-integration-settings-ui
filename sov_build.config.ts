import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      sovOptions: {
        input: "src/package/index.ts",
        output: "dist/package/index",
        type: "react-tailwind",
        inlineCss: true,
        packageConfig: {
          dtsEntryRoot: "src/package",
          dtsInclude: ["src/package/**/*"],
          isPackage: true,
        },
      },
      viteOptions: {
        build: {
          cssCodeSplit: false,
        },
      },
    },
    {
      sovOptions: {
        input: "src/package/index.ts",
        output: "dist/package-style-less/index",
        type: "react-tailwind",
        inlineCss: false,
        packageConfig: {
          dtsEntryRoot: "src/package",
          dtsInclude: ["src/package/**/*"],
          isPackage: true,
        },
      },
      viteOptions: {
        build: {
          cssCodeSplit: false,
        },
      },
    },
    {
      sovOptions: {
        input: "src/app/index.ts",
        output: "dist/demo/index",
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
      sovOptions: {
        input: "src/app/index.ts",
        output: "dist/demo-style-less/index",
        type: "react-tailwind",
        inlineCss: false,
        packageConfig: {
          dtsEntryRoot: "src/app",
          dtsInclude: ["src/app/**/*"],
          isPackage: true,
        },
      },
      viteOptions: {
        build: {
          cssCodeSplit: false,
        },
      },
    },
  ],
  filesOrFoldersToCopy: [{ input: "src/app/logos", output: "dist/logos" }],
};

export default buildConfig;
