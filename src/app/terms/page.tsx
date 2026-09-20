import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: "120px", paddingBottom: "6rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
                <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
                    <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "2rem", fontFamily: "var(--font-display)" }}>
                        Terms of Service
                    </h1>
                    <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>Last updated: September 2026</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the Gravitech Global website, our educational courses, or enterprise IT services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>2. Intellectual Property</h2>
                            <p>
                                The service and its original content (including course materials, videos, text, graphics, and logos), features, and functionality are and will remain the exclusive property of Gravitech Global and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Gravitech Global.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>3. User Responsibilities</h2>
                            <p>
                                As a user of our platform or services, you agree to:
                            </p>
                            <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                                <li>Provide accurate and complete information during registration or inquiry.</li>
                                <li>Maintain the confidentiality of any account credentials.</li>
                                <li>Not use our services for any illegal or unauthorized purpose.</li>
                                <li>Not reproduce, duplicate, copy, sell, or exploit any portion of our course materials or enterprise resources.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>4. Limitation of Liability</h2>
                            <p>
                                In no event shall Gravitech Global, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>5. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>6. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at: <a href="mailto:gravitechglobalitsolutions@gmail.com" style={{ color: "var(--accent)", textDecoration: "none" }}>gravitechglobalitsolutions@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
