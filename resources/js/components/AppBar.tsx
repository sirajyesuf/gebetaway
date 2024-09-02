import { Beef, CircleHelp } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AppBar() {
    return (
        <header className="sticky top-0 z-40 w-full bg-white shadow">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <Beef className="text-orange-600" />
                    <span className="text-lg font-semibold text-orange-600">
                        Gebetaway
                    </span>
                </Link>

                <Link href="/about" className="flex items-center gap-2">
                    <CircleHelp className="text-orange-600" />
                </Link>
            </div>
        </header>
    );
}
