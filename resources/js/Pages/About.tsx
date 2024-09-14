import AppBar from "@/components/AppBar";
import { Coffee, Utensils, MapPin, Star } from "lucide-react";

export default function AboutUs() {
    return (
        <>
            <AppBar></AppBar>
            <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-amber-800 mb-8">
                        About GebetaWay
                    </h1>

                    <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Welcome to GebetaWay, your ultimate guide to
                            discovering authentic Ethiopian flavors near you!
                            Our mission is to connect food lovers with the best
                            Ethiopian restaurants, all reviewed by popular
                            TikTok food influencers.
                        </p>

                        <div className="flex items-center space-x-4 text-amber-700">
                            <Utensils className="w-6 h-6" />
                            <p className="text-lg font-semibold">
                                Discover Authentic Flavors
                            </p>
                        </div>

                        <p className="text-gray-700">
                            Whether you're in the mood for the iconic injera or
                            eager to experience a traditional Ethiopian coffee
                            ceremony, GebetaWay helps you find the perfect spot
                            to indulge.
                        </p>

                        <div className="flex items-center space-x-4 text-amber-700">
                            <Star className="w-6 h-6" />
                            <p className="text-lg font-semibold">
                                Curated by Influencers
                            </p>
                        </div>

                        <p className="text-gray-700">
                            Our platform curates recommendations from top
                            influencers to ensure you're always enjoying the
                            most authentic dishes. From hidden gems to beloved
                            local favorites, GebetaWay makes it easy to explore
                            the vibrant and rich world of Ethiopian cuisine.
                        </p>

                        <div className="flex items-center space-x-4 text-amber-700">
                            <MapPin className="w-6 h-6" />
                            <p className="text-lg font-semibold">
                                Your Neighborhood Guide
                            </p>
                        </div>

                        <p className="text-gray-700">
                            Join us on this flavorful journey and let GebetaWay
                            be your gateway to the best of Ethiopian food, right
                            in your neighborhood!
                        </p>
                    </div>

                    <div className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-200">
                        <div className="flex items-center justify-center space-x-4 text-amber-800">
                            <Coffee className="w-8 h-8" />
                            <p className="text-xl font-semibold">
                                Experience the Ethiopian Coffee Ceremony
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
