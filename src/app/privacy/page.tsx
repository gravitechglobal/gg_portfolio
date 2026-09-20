import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "120px", paddingBottom: "6rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
                <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
                    <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem", fontFamily: "var(--font-display)" }}>
                        Privacy Policy
                    </h1>
                    <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Last updated: September 2026</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>1. Introduction</h2>
                            <p>
                                Gravitech Global ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our educational and enterprise IT services.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>2. Information We Collect</h2>
                            <p>
                                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. This may include your name, email address, phone number, and professional details.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>3. How We Use Your Information</h2>
                            <p>
                                We use personal information collected via our website for a variety of business purposes, including:
                            </p>
                            <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                                <li>To facilitate account creation and logon process.</li>
                                <li>To send you marketing and promotional communications.</li>
                                <li>To respond to user inquiries and offer support.</li>
                                <li>To deliver services to the user (e.g., course enrollment, IT consulting).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>4. Data Security</h2>
                            <p>
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>5. Contact Us</h2>
                            <p>
                                If you have questions or comments about this notice, you may email us at: <a href="mailto:gravitechglobalitsolutions@gmail.com" style={{ color: "var(--accent)", textDecoration: "none" }}>gravitechglobalitsolutions@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
