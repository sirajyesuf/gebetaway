import { useState, useEffect, useRef } from "react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import GebetaSearch from "@/components/GebetaSearch";
import Review from "@/types/review";
import Reviewer from "@/types/reviewer";
import { TikTokEmbed } from "react-social-media-embed";

export default function Home(props) {
    console.log(props.reviews);
    const [reviews, setReviews] = useState(props.reviews.data);
    const [nextPageUrl, setNextPageUrl] = useState(props.reviews.links.next);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef();

    useEffect(() => {
        fetchBooks(page);
    }, [page]);

    const fetchBooks = async (page) => {
        setLoading(true);
        console.log(page);
        try {
            const response = await axios.get(`/reviews?page=${page}`);
            setReviews((prevReviews) => [
                ...prevReviews,
                ...response.data.data,
            ]);
            setHasMore(response.data.links.next !== null); // Check if there's more data
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    // IntersectionObserver callback
    const lastBookElementRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1); // Trigger next page load
            }
        }, options);

        if (lastBookElementRef.current) {
            observer.observe(lastBookElementRef.current);
        }

        return () => {
            if (lastBookElementRef.current) {
                observer.unobserve(lastBookElementRef.current);
            }
        };
    }, [loading, hasMore]);

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
                {reviews.map((review: Review, index: number) =>
                    index === reviews.length - 1 ? (
                        <div
                            className="flex flex-col justify-center  items-center  gap-2"
                            ref={lastBookElementRef}
                            key={review.id}
                        >
                            <div>
                                {review.restaurant_name} = {review.id}
                            </div>

                            <TikTokEmbed
                                url={review.tiktok_video_url}
                                width={325}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center  items-center  gap-2" key={review.id}>
                            <div>
                                {review.restaurant_name} = {review.id}
                            </div>

                            <TikTokEmbed
                                url={review.tiktok_video_url}
                                width={325}
                            />
                        </div>
                    )
                )}
            </main>
        </>
    );
}
