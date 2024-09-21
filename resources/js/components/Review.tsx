import React, { useState, useEffect } from "react";
import { Review as ReviewType } from "@/types/review";
import { MapPin } from "lucide-react";
import { Play } from "lucide-react"; // Add this import
import { TiktokPlayerSkeleton } from "./tiktok-player-skeleton";
const fallbackImage = "https://placehold.co/600x400?text=No+Thumbnail";

const PlayIcon = () => (
    <div className="relative w-16 h-16 flex items-center justify-center bg-red-600 rounded-full shadow-lg transition-transform transform hover:scale-110">
        <Play className="w-8 h-8 text-white" />
    </div>
);

const LocationIcon = () => (
    <MapPin className="w-6 h-6 text-[#dc2825] transition-transform transform hover:scale-110" />
);

const VideoLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gray-300 animate-pulse"></div>{" "}
            {/* Skeleton background */}
            <div className="absolute inset-0 border-4 border-[#25F4EE] rounded-full animate-spin"></div>{" "}
            {/* Spinning border with TikTok brand color */}
            <div className="absolute inset-0 rounded-full border-4 border-t-4 border-t-[#FE2C55] border-gray-300 animate-spin"></div>{" "}
            {/* Modern spinner with TikTok brand color */}
        </div>
    </div>
);

const Skeleton = () => (
    <div className="animate-pulse bg-gray-300 w-full h-full"></div>
);

interface ReviewProps {
    review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const fetchVideoInfo = async () => {
            try {
                const response = await fetch(
                    `https://www.tiktok.com/oembed?url=${encodeURIComponent(
                        review.tiktok_video_url
                    )}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setThumbnailUrl(data.thumbnail_url);
                } else {
                    console.error("Failed to fetch video info");
                }
            } catch (error) {
                console.error("Error fetching video info:", error);
            }
        };

        fetchVideoInfo();
    }, [review.tiktok_video_url]);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    const videoId = review.tiktok_video_url.split("/").pop();

    return (
        <div className="bg-white rounded-lg shadow-sm border-none overflow-hidden transition duration-300 relative w-full">
            <div className="relative aspect-[9/16] w-full">
                {!isPlaying ? (
                    <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={handlePlayClick}
                    >
                        {thumbnailUrl ? ( // Check if thumbnailUrl is available
                            <img
                                src={thumbnailUrl}
                                alt={review.restaurant_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Skeleton /> // Show Skeleton until thumbnailUrl is fetched
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="transform group-hover:scale-110 transition-transform duration-300">
                                <PlayIcon />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        {!isVideoLoaded ? (
                            <Skeleton /> // Show Skeleton while video is loading
                        ) : (
                            <img
                                src={thumbnailUrl}
                                alt={review.restaurant_name}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {!isVideoLoaded && <VideoLoader />}{" "}
                        {/* Loader while video is loading */}
                        <iframe
                            src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=1&mute=0&rel=0&loop=1`}
                            className={`absolute inset-0 w-full h-full ${
                                isVideoLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            allowFullScreen
                            allow="autoplay; fullscreen"
                            onLoad={() => setIsVideoLoaded(true)}
                        ></iframe>
                    </div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-[#dc2825] line-clamp-1 capitalize">
                    {review.restaurant_name || <Skeleton />}
                </h2>
                <div className="flex items-start space-x-2">
                    <LocationIcon className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />{" "}
                    {/* Updated to use LocationIcon */}
                    <p className="text-sm text-gray-700 font-medium line-clamp-2 transition duration-300 hover:text-[#dc2825]">
                        {review.restaurant_address || <Skeleton />}
                    </p>
                </div>

                <div className="flex items-center space-x-1">
                    {review.distance ? ( // Check if distance is available
                        <>
                            <span className="text-sm text-gray-600">
                                {review.distance} km
                            </span>
                            <span className="h-1 w-1 bg-gray-400 rounded-full"></span>{" "}
                            {/* Separator dot */}
                            <span className="text-sm text-gray-500">
                                Distance
                            </span>{" "}
                            {/* Label for clarity */}
                        </>
                    ) : (
                        <span className="text-sm text-gray-500">
                            Distance not available
                        </span> // Fallback message
                    )}
                </div>
            </div>
            <a
                className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 text-food-red hover:bg-opacity-100 hover:scale-110 transition duration-300 shadow-md"
                aria-label="View on Map"
                href={`https://www.google.com/maps/search/?api=1&query=${review.restaurant_location[0]},${review.restaurant_location[1]}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <LocationIcon />
            </a>
        </div>
    );
};

export default Review;
