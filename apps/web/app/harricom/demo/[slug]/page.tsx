import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLiveDemo, liveDemos } from "../../demos";
import { DemoBar } from "../DemoBar";
import styles from "../demo.module.css";

type DemoPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return liveDemos.map((demo) => ({ slug: demo.slug }));
}

export function generateMetadata({ params }: DemoPageProps): Metadata {
  const demo = getLiveDemo(params.slug);
  if (!demo) {
    return { title: "Demo" };
  }
  return {
    title: `${demo.name} demo`,
    description: demo.note
      ? `${demo.name} — ${demo.note}.`
      : `Live HarriCom demo of ${demo.name}.`,
  };
}

export default function DemoPage({ params }: DemoPageProps) {
  const demo = getLiveDemo(params.slug);
  if (!demo) {
    notFound();
  }

  return (
    <div className={styles.shell}>
      <DemoBar demo={demo} />
      <iframe
        className={styles.frame}
        src={demo.src}
        title={`${demo.name} demo`}
        allow="payment; clipboard-write"
      />
    </div>
  );
}
