import { Link } from "@inertiajs/react";

export default function HeroWithAppBar() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="flex-grow flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-600 to-amber-700 text-white">
                <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl">
                            Discover Authentic Ethiopian Flavors Near You
                        </h1>
                        <p className="max-w-[600px] text-lg sm:text-xl md:text-2xl text-amber-100">
                            Explore nearby restaurants reviewed by popular
                            TikTok food influencers and enjoy the best of
                            Ethiopian cuisine, from injera to traditional coffee
                            ceremonies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#main"
                                className="inline-flex h-12 items-center justify-center rounded-md bg-white text-orange-600 px-8 text-base font-medium shadow transition-colors hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600"
                            >
                                Explore Now
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white bg-transparent px-8 text-base font-medium text-white shadow transition-colors hover:bg-white hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-600"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
