import * as Icons from "lucide-react";

const fallbackIcon = Icons.Check || Icons.Circle || (() => null);

export const CheckCircleIcon = Icons.CheckCircle
  || Icons.CheckCircle2
  || Icons.CheckCircleIcon
  || fallbackIcon;

const getGlobalTarget = () => {
  if (typeof window !== "undefined") return window;
  if (typeof globalThis !== "undefined") return globalThis;
  return undefined;
};

export const registerGlobalIconAliases = (target = getGlobalTarget()) => {
  if (!target) return;
  if (!target.CheckCircle) {
    target.CheckCircle = CheckCircleIcon;
  }
};
