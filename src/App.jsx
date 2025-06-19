import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === steps.length - 1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              const isDone = index <= activeIndex;

              const stepClass = [
                styles["steps-item"],
                isDone && styles.done,
                isActive && styles.active,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li key={index} className={stepClass}>
                  <button
                    className={styles["steps-item-button"]}
                    onClick={() => setActiveIndex(index)}
                  >
                    {index + 1}
                  </button>
                  {step.title}
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              onClick={() => setActiveIndex((i) => i - 1)}
              disabled={activeIndex === 0}
            >
              Назад
            </button>
            <button
              className={styles.button}
              onClick={() =>
                activeIndex === steps.length - 1
                  ? setActiveIndex(0)
                  : setActiveIndex((i) => i + 1)
              }
            >
              {activeIndex === steps.length - 1 ? "Начать сначала" : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
