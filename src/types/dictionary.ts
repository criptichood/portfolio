import type en from "@/lib/dictionaries/en.json";

export type Dictionary = Omit<typeof en, "about"> & {
  about: Omit<typeof en["about"], "points"> & {
    points?: string[];
  };
};
