import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Scroll from "../components/Scroll";
import Section from "../components/Section";

export const metadata = { title: "Music" };

export default function MusicPage() {
    return (
        <CenteredLayout>
            <Line as="h1">Music</Line>
            <Scroll>
                <Section>
                    <Line block>In progress</Line>
                </Section>
            </Scroll>
        </CenteredLayout>
    );
}
