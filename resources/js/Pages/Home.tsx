import { useState, useEffect, useRef } from "react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import GebetaSearch from "@/components/GebetaSearch";
import Review from "@/types/review";
import Reviewer from "@/types/reviewer";
import { TikTokEmbed } from "react-social-media-embed";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Map } from "lucide-react";
import { router } from "@inertiajs/react";
import useSearchParams from "@/hooks/useUrlSearchParams";
import { Input } from "@/components/ui/input";
import Video404 from "@/components/Video404";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/CategoryFilter";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ReviewCard from "@/components/Review";

interface HomeProps {
    reviews: {
        data: Review[];
        links: {
            next: string | null;
        };
    };
    categories: string[];
    reviewers: Reviewer[];
}

export default function Home({ reviews, categories, reviewers }: HomeProps) {
    const searchParams = useSearchParams();
    const [reviewsData, setReviewsData] = useState(reviews.data);
    const [nextPageUrl, setNextPageUrl] = useState(reviews.links.next);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchBooks = async (page: number) => {
        setLoading(true);
        try {
            const restaurant_name = searchParams.get("restaurant") || null;
            const reviewerIds = searchParams.get("reviewers") || null;
            const data: Record<string, string> = {};
            if (restaurant_name !== null) data.restaurant = restaurant_name;
            if (reviewerIds !== null) data.reviewers = reviewerIds;

            router.visit(`/?page=${page}`, {
                method: "get",
                data: data,
                preserveScroll: true,
            });
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppBar />
            <Hero />

            <main
                id="main"
                className="min-h-screen h-auto flex flex-col gap-4 text-black mb-16 "
            >
                <div className="container mx-auto px-4">
                    <div className="capitalize text-2xl font-bold mb-6">Discover</div>
                    <CategoryFilter categories={categories} />

                    <GebetaSearch
                        reviewers={reviewers}
                        categories={categories}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
                        {reviewsData.length === 0 ? (
                            <Video404 />
                        ) : (
                            reviewsData.map((review: Review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
