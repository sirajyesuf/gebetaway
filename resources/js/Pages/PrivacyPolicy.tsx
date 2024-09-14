import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
export default function PrivacyPolicy() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-4xl mx-auto bg-white text-black border-none shadow-none">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            Privacy Policy
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Last updated: {currentDate}
                        </p>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-semibold mt-6">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to Gebetaway ("we," "our," or "us"). We are
                            committed to protecting your personal information
                            and your right to privacy. This Privacy Policy
                            explains how we collect, use, disclose, and
                            safeguard your information when you use our service
                            to find and display nearby restaurants.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            2. Information We Collect
                        </h2>
                        <p>We collect the following types of information:</p>

                        <h3 className="text-xl font-semibold mt-4">
                            2.1 Location Data
                        </h3>
                        <ul>
                            <li>
                                We collect your device's geolocation data to
                                provide you with information about nearby
                                restaurants.
                            </li>
                            <li>
                                This data is collected only when you use our
                                service and grant permission for location
                                access.
                            </li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">
                            2.2 User-Provided Information
                        </h3>
                        <ul>
                            <li>
                                Information you provide when creating an account
                                (if applicable), such as your name and email
                                address.
                            </li>
                            <li>
                                Your search queries and preferences related to
                                restaurant searches.
                            </li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">
                            2.3 Device Information
                        </h3>
                        <ul>
                            <li>
                                Information about your mobile device, including
                                device type, operating system, and unique device
                                identifiers.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-6">
                            3. How We Use Your Information
                        </h2>
                        <p>We use the collected information to:</p>
                        <ul>
                            <li>
                                Locate and display nearby restaurants based on
                                your current location.
                            </li>
                            <li>Improve and personalize our service.</li>
                            <li>Communicate with you about our service.</li>
                            <li>
                                Ensure the technical functionality of our
                                service.
                            </li>
                            <li>Analyze how our service is used.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-6">
                            4. Sharing of Your Information
                        </h2>
                        <p>
                            We do not sell your personal information. We may
                            share your information with:
                        </p>
                        <ul>
                            <li>
                                Third-party service providers that help us
                                operate our service.
                            </li>
                            <li>
                                Restaurant partners to facilitate reservations
                                or orders (if applicable).
                            </li>
                            <li>
                                Legal authorities when required by law or to
                                protect our rights.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-6">
                            5. Data Retention
                        </h2>
                        <p>
                            We retain your personal information only for as long
                            as necessary to provide you with our service and as
                            described in this Privacy Policy. We will also
                            retain and use your information as necessary to
                            comply with our legal obligations, resolve disputes,
                            and enforce our agreements.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            6. Your Rights
                        </h2>
                        <p>
                            Depending on your location, you may have the right
                            to:
                        </p>
                        <ul>
                            <li>
                                Access the personal information we hold about
                                you.
                            </li>
                            <li>
                                Request that your personal information be
                                corrected or deleted.
                            </li>
                            <li>
                                Object to or restrict the processing of your
                                personal information.
                            </li>
                            <li>Data portability.</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us using
                            the information provided in the "Contact Us"
                            section.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            7. Security
                        </h2>
                        <p>
                            We implement appropriate technical and
                            organizational measures to protect your personal
                            information against unauthorized or unlawful
                            processing, accidental loss, destruction, or damage.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            8. Children's Privacy
                        </h2>
                        <p>
                            Our service is not intended for children under the
                            age of 13. We do not knowingly collect personal
                            information from children under 13.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            9. Changes to This Privacy Policy
                        </h2>
                        <p>
                            We may update our Privacy Policy from time to time.
                            We will notify you of any changes by posting the new
                            Privacy Policy on this page and updating the "Last
                            updated" date.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6">
                            10. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy,
                            please contact us at:
                        </p>
                        <p className="font-semibold">info@gebetaway.com</p>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
