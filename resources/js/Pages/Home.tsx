import React from "react";
import { Head } from "@inertiajs/inertia-react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
import GebetaSearch from "@/components/GebetaSearch";
export default function Home({reviewers}) {
    console.log(reviewers);
    return (
        <>
            <AppBar></AppBar>
            <Hero></Hero>
            <main
                id="main"
                className="container mt-2 p-2 h-screen bg-white flex flex-col gap-4"
            >
                <div className="capitalize text-xl text-black font-bold mb-10">
                    Discover
                </div>
                <GebetaSearch reviewers={reviewers} />
            </main>
        </>
    );
}
