import styles from "../harricom.module.css";

const steps = [
  {
    title: "1. Customer messages",
    body: "“How much for a cut Saturday?” at 9pm when you’re closed.",
    label: "Old way: lost customer",
  },
  {
    title: "2. AI answers instantly",
    body: "“Cut is $3,000 JMD, 10am and 2pm open Saturday. Book 10am?” — replies in 3 seconds.",
    label: "New way: booked",
  },
  {
    title: "3. You get paid",
    body: "You wake up to a booked appointment. No extra work. Site plus AI does it.",
    label: "Result: J$9k–15k extra / week",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="how-title"
    >
      <div className={styles.container}>
        <h2 id="how-title" className={styles.sectionTitle}>
          How we get you 3 more customers per week
        </h2>
        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardBody}>{step.body}</p>
              <p className={styles.tierLabel}>{step.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
