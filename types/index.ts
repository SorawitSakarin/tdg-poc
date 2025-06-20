import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum Topic {
  StaffNotWeighingArea = "staffNotWeighingArea",
  StaffNotCashierArea = "staffNotCashierArea",
  StaffOutOfUniform = "staffOutOfUniform",
  InconsistentStoreHours = "inconsistentStoreHours",
  InsufficientFreshFood = "insufficientFreshFood",
  UnusualPickingBehavior = "unusualPickingBehavior",
  SuspiciousCameraBehavior = "suspiciousCameraBehavior",
  UnusualSafeOpening = "unusualSafeOpening",
  OpenLid = "openLid",
}
