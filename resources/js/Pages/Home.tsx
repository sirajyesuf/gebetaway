import { useState, useEffect } from "react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import GebetaSearch from "@/components/GebetaSearch";
import Review from "@/types/review";
import Reviewer from "@/types/reviewer";
import { TikTokEmbed } from "react-social-media-embed";

export default function Home({ reviewers, reviews }) {
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
                <GebetaSearch reviewers={reviewers} reviews={reviews.data} />
                {reviews.data.map((review: Review) => (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* <p> {review.restaurant_name}</p> */}
                        <TikTokEmbed
                            url={review.tiktok_video_url}
                            width={325}
                        />
                    </div>
                ))}
            </main>
        </>
    );
}
