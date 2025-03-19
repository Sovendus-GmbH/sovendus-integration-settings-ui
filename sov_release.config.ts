import type { ReleaseConfig } from "sovendus-release-tool/types";

const releaseConfig: ReleaseConfig = {
  packages: [
    {
      directory: "./",
      updateDeps: true,
      test: false,
      lint: true,
      build: true,
      release: {
        version: "4.0.10",
        versionBumper: [
          {
            filePath: "src/utils/constants.ts",
            varName: "version",
          },
        ],
        foldersToScanAndBumpThisPackage: [
          // scan whole dev env
          { folder: "../../../../" },
        ],
      },
    },
  ],
};
export default releaseConfig;
