import {
  Bath,
  Car,
  Cctv,
  CookingPot,
  Laptop,
  PawPrint,
  ShieldAlert,
  Waves,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";

export const amenityIcons: Record<string, ReactNode> = {
  kitchen: <CookingPot size={24} />,
  wifi: <Wifi size={24} />,
  workspace: <Laptop size={24} />,
  parking: <Car size={24} />,
  pool: <Waves size={24} />,
  hottub: <Bath size={24} />,
  pets: <PawPrint size={24} />,
  camera: <Cctv size={24} />,
  alarm: <ShieldAlert size={24} />,
  smoke: <ShieldAlert size={24} />,
};
