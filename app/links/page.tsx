import React from "react";
import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Section from "../components/Section";

export default function LinksPage() {
    return (
        <CenteredLayout>
            <Line as="h1">Links</Line>

            <Section>
                <Line as="a" href="https://github.com/PaulLin1">
                    GitHub
                </Line>

                <Line as="a" href="https://linkedin.com/in/plin">
                    LinkedIn
                </Line>

                <Line as="a" href="mailto:linp40182@gmail.com">
                    Email
                </Line>
            </Section>
        </CenteredLayout>
    );
}