import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="py-6 px-4 bg-gray-100 text-center">
            <div className="max-w-4xl mx-auto">
                <p className="text-sm text-gray-600 mb-4">
                    © {new Date().getFullYear()} Your Company. All rights
                    reserved.
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
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Terms
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
