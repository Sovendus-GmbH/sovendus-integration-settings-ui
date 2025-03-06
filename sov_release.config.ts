import type { ReleaseConfig } from "sovendus-release-tool/types";

const releaseConfig: ReleaseConfig = {
  packages: [
    {
      directory: "./",
      updateDeps: true,
      version: "3.7.7",
      release: true,
      test: false,
      lintAndBuild: true,
      versionBumper: {
        jsVars: [
          {
            filePath: "src/utils/constants.ts",
            varName: "version",
          },
        ],
      },
      releaseOptions: {
        foldersToScanAndBumpThisPackage: [
          // scan whole dev env
          { folder: "../../../../" },
        ],
      },
    },
  ],
};
export default releaseConfig;
