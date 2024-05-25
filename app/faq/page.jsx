"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./faq.module.scss";
import { useStore } from "../_lib/store";
import Link from "next/link";
export default function Faq() {
  const { name } = useStore();
  return (
    <div className={styles.accordionContainer}>
      <h1 className="center">Hei {name}! What can we help you with?</h1>
      <h2 className="center">For Guests</h2>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          What should I do if I have to cancel my booking?
        </AccordionSummary>
        <AccordionDetails>
          Go to my trips an cancel the trip there.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          What should I do if I have an issue during my stay?
        </AccordionSummary>
        <AccordionDetails>
          Contact your venue manger or contact Holidaze.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How do I communicate with hosts?
        </AccordionSummary>
        <AccordionDetails>
          You will find information on the trip details under my trips.
        </AccordionDetails>
      </Accordion>
      <h2 className="center">For Hosts</h2>

      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How do I list my property?{" "}
        </AccordionSummary>
        <AccordionDetails>
          Register on the platform and go to the profile to become a venue
          manager. The you can list your venue under list your home. Fill in the
          details as good as possible.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          How do I handle cancellations?
        </AccordionSummary>
        <AccordionDetails>
          Include your cancellation policy in the listing description. Ensure
          guests understand the terms before booking.
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.lastAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How can I improve my listing´s visibility?
        </AccordionSummary>
        <AccordionDetails>
          Use quality photos, have a detailed description, respond quickly and
          offer competative pricing.
        </AccordionDetails>
      </Accordion>

      <p className="center">
        Didn't find what you were looking for?{" "}
        <Link href="/contact" className={styles.contactUs}>
          Contact us here.
        </Link>
      </p>
    </div>
  );
}
