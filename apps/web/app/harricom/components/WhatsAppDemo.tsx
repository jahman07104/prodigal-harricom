"use client";

import { useCallback, useEffect, useId, useRef } from "react";

import { whatsappHref } from "../lib/brand";
import styles from "../harricom.module.css";

export function WhatsAppDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={open}
      >
        See 30-sec WhatsApp demo
      </button>
      <dialog
        ref={dialogRef}
        className={styles.backdrop}
        aria-labelledby={titleId}
      >
        <div className={styles.phone}>
          <div className={styles.phoneHead}>
            <span id={titleId}>Miss T&apos;s Cook Shop — AI agent</span>
            <button type="button" className={styles.close} onClick={close}>
              Close
            </button>
          </div>
          <div className={styles.chat}>
            <p className={`${styles.bubble} ${styles.inbound}`}>
              Hi! How much for brown stew chicken Saturday?
            </p>
            <p className={`${styles.bubble} ${styles.outbound}`}>
              Hey! Brown stew is $1,800 JMD with rice &amp; peas. We have 12pm
              and 3pm pickup open Saturday. Want me to book 12pm? Just reply YES.
            </p>
            <p className={`${styles.bubble} ${styles.inbound}`}>YES 12pm</p>
            <p className={`${styles.bubble} ${styles.outbound}`}>
              Booked! See you Saturday 12pm at 12 Half Way Tree Rd. Pay at
              pickup. Thanks! — Miss T (AI)
            </p>
            <p className={styles.chatNote}>
              Replied in 2.3 seconds · 9:42 PM when the shop was closed ·
              $1,800 saved
            </p>
          </div>
          <div className={styles.phoneFoot}>
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href={whatsappHref(
                "I saw the WhatsApp AI demo - I want this for my shop",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              I want this for my shop
            </a>
            <p>Demo conversation. Live sites use your menu and your voice.</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
