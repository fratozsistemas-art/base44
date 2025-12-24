import * as Icons from "lucide-react";

const fallbackIcon = Icons.Check || Icons.Circle || (() => null);

export const CheckCircleIcon = Icons.CheckCircle
  || Icons.CheckCircle2
  || Icons.CheckCircleIcon
  || fallbackIcon;

export const CheckCircle = CheckCircleIcon;
