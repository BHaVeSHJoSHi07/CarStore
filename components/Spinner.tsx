"use client";

import React from "react";
import { Spinner as NextUISpinner } from "@nextui-org/react";
import { SpinnerProps } from "@/types";

export default function Spinner({ color }: SpinnerProps) {
  return (
    <div className="flex gap-4">
      <NextUISpinner
        color={
          color as
            | "success"
            | "current"
            | "white"
            | "default"
            | "primary"
            | "secondary"
            | "warning"
            | "danger"
            | undefined
        }
      />
    </div>
  );
}
