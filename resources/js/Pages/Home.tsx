import { useState, useEffect, useRef } from "react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import GebetaSearch from "@/components/GebetaSearch";
import Review from "@/types/review";
import Reviewer from "@/types/reviewer";
import { TikTokEmbed } from "react-social-media-embed";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { router } from "@inertiajs/react";
import useSearchParams from "@/hooks/useUrlSearchParams";

export default function Home(props) {
    const searchParams = useSearchParams();

    console.log(props.reviews);
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
                className="container mt-2 p-2 h-screen bg-white flex flex-col gap-4 text-black"
            >
                <div className="capitalize text-xl text-black font-bold mb-10">
                    Discover
                </div>
                <GebetaSearch reviewers={props.reviewers} />
                <div className="flex flex-col items-center gap-4">
                    {reviews.map((review: Review, index: number) =>
                        index === reviews.length - 1 ? (
                            <div
                                className="flex flex-col justify-center  items-center  gap-2"
                                ref={lastBookElementRef}
                                key={review.id}
                            >
                                <div className="border-2 border-red-500">
                                    {review.restaurant_name} = {review.id}
                                </div>

                                <TikTokEmbed
                                    url={review.tiktok_video_url}
                                    width={325}
                                />
                            </div>
                        ) : (
                            <div
                                className="flex flex-col justify-center  items-center  gap-2 border-2 border-red-900 w-[400px] p-4"
                                key={review.id}
                            >
                                <div>
                                    {review.restaurant_name} = {review.id}
                                </div>

                                {/* <div className="shadow-2 border-none bg-red-400 rounded-md px-4 flex items-center">
                                    {review.restaurant_address}
                                    <Button>
                                        <MapPin></MapPin>
                                    </Button>
                                </div> */}

                                <TikTokEmbed
                                    url={review.tiktok_video_url}
                                    width={325}
                                />
                            </div>
                        )
                    )}
                </div>
            </main>
        </>
    );
}
