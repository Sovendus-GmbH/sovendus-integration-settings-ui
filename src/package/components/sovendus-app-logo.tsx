import type { JSX } from "react";

import logo from "../../logos/sovendus-logo.png";

export function SovendusAppLogo(): JSX.Element {
  return (
    <img
      src={logo.src}
      alt="Sovendus Logo"
      className="tw:h-6 tw:w-6 tw:rounded-full"
      style={{ filter: "grayscale(100%)" }}
    />
  );
}
