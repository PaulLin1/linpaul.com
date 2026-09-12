import Image from "next/image";

import CenteredLayout from "./components/MainLayout";

export default function Home() {
    return (
        <CenteredLayout>
            <div
                style={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    src="/main.png"
                    alt="Paul Lin"
                    width={1850}
                    height={850}
                    sizes="60vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority
                />
            </div>
        </CenteredLayout>
    );
}
