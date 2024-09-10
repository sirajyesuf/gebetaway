import { Link } from "@inertiajs/react";
import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-6 px-4 bg-gray-100 text-center">
            <div className="max-w-4xl mx-auto">
                <p className="text-sm text-gray-600 mb-2">
                    © {new Date().getFullYear()} Gebetaway. All rights reserved.
                </p>
                <p className="text-sm text-gray-600 mb-4 flex items-center justify-center">
                    Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in
                    Addis Ababa
                </p>
                <nav className="flex justify-center space-x-4">
                    <Link
                        href="/about"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        About
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
