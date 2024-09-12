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

export default function Home(props) {
    const searchParams = useSearchParams();
    console.log(props);
    const [reviews, setReviews] = useState(props.reviews.data);
    const [nextPageUrl, setNextPageUrl] = useState(props.reviews.links.next);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef();

    // useEffect(() => {
    //     fetchBooks(page);
    // }, [page]);

    const fetchBooks = async (page) => {
        setLoading(true);
        console.log(page);
        try {
            // const response = await axios.get(`/reviews?page=${page}`);
            // setReviews((prevReviews) => [
            //     ...prevReviews,
            //     ...response.data.data,
            // ]);
            // setHasMore(response.data.links.next !== null);

            const restaurant_name = searchParams.get("restaurant") || null;
            const reviewers = searchParams.get("reviewers") || null;
            let data = {};
            if (restaurant_name !== null) data.restaurant = restaurant_name;
            if (reviewers !== null) data.reviewers = reviewers;

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

    // IntersectionObserver callback
    const lastBookElementRef = useRef(null);

    // useEffect(() => {
    //     const options = {
    //         root: null,
    //         rootMargin: "0px",
    //         threshold: 1.0,
    //     };

    //     const observer = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting && hasMore && !loading) {
    //             setPage((prevPage) => prevPage + 1); // Trigger next page load
    //         }
    //     }, options);

    //     if (lastBookElementRef.current) {
    //         observer.observe(lastBookElementRef.current);
    //     }

    //     return () => {
    //         if (lastBookElementRef.current) {
    //             observer.unobserve(lastBookElementRef.current);
    //         }
    //     };
    // }, [loading, hasMore]);

    return (
        <>
            <AppBar></AppBar>
            <Hero></Hero>

            <main
                id="main"
                className="md:container  min-h-screen h-auto  flex flex-col gap-4  text-black p-1 "
            >
                <div className="capitalize text-2xl font-bold">Discover</div>
                <CategoryFilter categories={props.categories} />

                <GebetaSearch
                    reviewers={props.reviewers}
                    categories={props.categories}
                />
                <div className="flex flex-col items-center gap-4">
                    {reviews.length === 0 ? (
                        <Video404 />
                    ) : (
                        reviews.map((review: Review, index: number) => (
                            <div
                                className="flex flex-col justify-center  items-center  gap-2  w-[400px] p-4"
                                key={review.id}
                            >
                                <div className="bg-[#fe2c55] text-white rounded-md w-[88%] h-auto flex justify-between items-center px-2">
                                    <p className="capitalize">
                                        {review.restaurant_name}
                                        {review.distance} km
                                    </p>
                                    <Button variant="link">
                                        <a
                                            href={`https://www.google.com/maps?q=${review.restaurant_location[0]},${review.restaurant_location[1]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Map />
                                        </a>
                                    </Button>
                                </div>

                                <TikTokEmbed
                                    url={review.tiktok_video_url}
                                    width={325}
                                    placeholderImageUrl={review.thumbnail_url}
                                />
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer></Footer>
        </>
    );
}
