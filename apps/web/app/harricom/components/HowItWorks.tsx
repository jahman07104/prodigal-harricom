import styles from "../harricom.module.css";

const steps = [
  {
    n: "1",
    title: "They message after hours",
    body: "“How much for a cut Saturday?” at 9pm. You’re closed.",
    label: "Old way: lost",
  },
  {
    n: "2",
    title: "AI answers in 3 seconds",
    body: "Price, times, and a YES to book — in your voice.",
    label: "New way: booked",
  },
  {
    n: "3",
    title: "You wake up paid",
    body: "Appointment on the list. No extra work.",
    label: "J$9k–15k extra / week",
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
          How you get 3 more customers a week
        </h2>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.n} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {step.n}
              </span>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardBody}>{step.body}</p>
              <p className={styles.tierLabel}>{step.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
