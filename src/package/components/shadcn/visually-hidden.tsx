import * as React from "react";

/**
 * VisuallyHidden component
 * 
 * This component is used to hide content visually while keeping it accessible to screen readers.
 * It's useful for providing context to screen reader users without affecting the visual layout.
 * 
 * Usage:
 * <VisuallyHidden>This text is only visible to screen readers</VisuallyHidden>
 */
const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      }}
      {...props}
    >
      {children}
    </span>
  );
});

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
