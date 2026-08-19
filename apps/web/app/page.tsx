import type { Metadata } from "next";

import { ProdigalHome } from "./ProdigalHome";

export const metadata: Metadata = {
  title: "The Prodigal",
  description:
    "The Prodigal is a Jamaica-connected platform helping people around the world and at home return, build, invest, work, manage property and create opportunity in Jamaica.",
};

export default function HomePage() {
  return <ProdigalHome />;
}
