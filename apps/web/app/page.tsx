import type { Metadata } from "next";

import { ProdigalHome } from "./ProdigalHome";

export const metadata: Metadata = {
  title: "The Prodigal Program",
  description:
    "The Prodigal Program by HarriCom helps Jamaican diaspora and returning residents navigate RR concessions, business setup, and encore entrepreneurship. Built by a returnee, for returnees.",
};

export default function HomePage() {
  return <ProdigalHome />;
}
