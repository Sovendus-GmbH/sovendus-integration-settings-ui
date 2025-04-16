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
        input: "src/package/components/shadcn/index.ts",
        output: "dist/ui/index",
        type: "react-tailwind",
        inlineCss: true,
        modulesToExternalize: ["next/link", "next/router"],
        packageConfig: {
          dtsEntryRoot: "src/package/components/shadcn",
          dtsInclude: ["src/package/components/shadcn/**/*"],
          isPackage: true,
        },
      },
      viteOptions: {
        build: {
          cssCodeSplit: true,
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
        modulesToExternalize: ["next/link", "next/router"],
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
        modulesToExternalize: ["next/link", "next/router"],
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
  filesOrFoldersToCopy: [{ input: "src/logos", output: "dist/logos" }],
};

export default buildConfig;
