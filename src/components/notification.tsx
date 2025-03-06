import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import type { JSX } from "react";
import { useEffect, useState } from "react";

import { cn } from "../utils/utils";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "loading";
}

export function Notification({
  message,
  type,
}: NotificationProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return (): void => {
        clearTimeout(timer);
        setIsVisible(false);
      };
    }
    setIsVisible(true);

    return;
  }, [type]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={cn("tw:fixed tw:bottom-4 tw:right-4 tw:z-50")}
        >
          <div
            className={cn(
              `tw:rounded-lg tw:shadow-lg tw:p-4 tw:flex tw:items-center tw:space-x-3 ${
                type === "success"
                  ? "tw:bg-green-500"
                  : type === "error"
                    ? "tw:bg-red-500"
                    : "tw:bg-blue-500"
              } tw:text-white`,
            )}
          >
            {type === "success" && (
              <CheckCircle className={cn("tw:h-6 tw:w-6")} />
            )}
            {type === "error" && <XCircle className={cn("tw:h-6 tw:w-6")} />}
            {type === "loading" && (
              <svg
                className={cn("tw:animate-spin tw:h-6 tw:w-6")}
                viewBox="0 0 24 24"
              >
                <circle
                  className={cn("tw:opacity-25")}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className={cn("tw:opacity-75")}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
