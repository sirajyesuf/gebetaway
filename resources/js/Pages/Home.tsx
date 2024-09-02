import React from "react";
import { Head } from "@inertiajs/inertia-react";
import AppBar from "@/components/AppBar";
import Hero from "@/components/Hero";
export default function Home() {
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
            </main>
        </>
    );
}
