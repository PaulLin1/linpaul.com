import React from "react";
import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Section from "../components/Section";

export default function PortfolioPage() {
    const links = [
        { label: "GitHub", url: "https://github.com/PaulLin1" },
        { label: "LinkedIn", url: "https://linkedin.com/in/plin" },
        { label: "Email", url: "mailto:linp40182@gmail.com" },
    ];

    return (
        <CenteredLayout>
            <Line text="Portfolio" asHeading />

            <Section>
				{links.map((link, idx) => (
					<Line
						key={idx}
						text={link.label}
						asLink
						href={link.url}
					/>
				))}
            </Section>
        </CenteredLayout>
    );
}
