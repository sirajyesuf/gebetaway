import { Search, MoveLeft, MapPin, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Reviewer as TypeReviewer } from "@/types/reviewer";
function RestaurantSearch() {
    // const router = useRouter();
    // const searchParams = useSearchParams();

    const [restaurant, setRestaurant] = useState("");
    // searchParams.get("restaurant") || ""
    // const updateURL = useCallback(
    //     (name: string, value: string) => {
    //         const params = new URLSearchParams(searchParams.toString());
    //         if (value) {
    //             params.set(name, value);
    //         } else {
    //             params.delete(name);
    //         }
    //         router.push(`/?${params.toString()}`, { scroll: false });
    //     },
    //     [router, searchParams]
    // );

    // useEffect(() => {
    //     updateURL("restaurant", restaurant);
    // }, [restaurant, updateURL]);

    return (
        <div className="w-full relative">
            <Input
                type="text"
                value={restaurant}
                placeholder="Amrogn chiken"
                onChange={(e) => setRestaurant(e.target.value)}
                className="pl-12 border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary bg-white text-black"
            />

            <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 hover:none bg-white text-black"
            >
                {restaurant ? (
                    <MoveLeft className="h-5 w-5" />
                ) : (
                    <Search className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}

function Address() {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    const [location, setLocation] = useState("");
    // searchParams.get("location") || ""

    // const updateURL = useCallback(
    //     (name: string, value: string) => {
    //         const params = new URLSearchParams(searchParams.toString());
    //         if (value) {
    //             params.set("location", value);
    //         } else {
    //             params.delete("location");
    //         }
    //         router.push(`/?${params.toString()}`, { scroll: false });
    //     },
    //     [router, searchParams]
    // );

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(
                        `${latitude.toFixed(6)},${longitude.toFixed(6)}`
                    );
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // useEffect(() => {
    //     updateURL("location", location);
    // }, [location, updateURL]);

    return (
        <div className="relative">
            <Input
                type="text"
                value={location}
                placeholder="Figa, road to summit fird bet. In front of kaldis coffee"
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary bg-white text-black"
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white text-black"
                onClick={handleGetLocation}
            >
                <MapPin className="h-5 w-5" />
            </Button>
        </div>
    );
}

function Reviewer({ reviewer }) {
    return (
        <div className="w-full flex gap-2 items-center px-2">
            <Avatar className="border-2 border-[#ff3b5c]">
                <AvatarImage
                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/dd5ec6adf36e6b504ecf0f0989e24c26~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=22065&refresh_token=34caa5b9f42d94f71b1ba957db90bfa9&x-expires=1724547600&x-signature=KO9RQK47fHaDiXZhm6dIvUDzEjw%3D&shp=a5d48078&shcp=81f88b70"
                    alt="@shadcn"
                />
                <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <div className="font-bold"> {reviewer.name}</div>
        </div>
    );
}

function ReviewerFilter({ reviewers }) {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const [reviewers, setReviewers] = useState(reviewers);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const [searchquery, setSearchQuery] = useState("");
    const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
    // useEffect(() => {
    //     async function fetchOptions() {
    //         try {
    //             setIsLoading(true);
    //             const { data, error } = await supabase
    //                 .from("reviewers")
    //                 .select();

    //             if (error) throw error;
    //             console.log(data);

    //             setReviewers(data);
    //         } catch (e) {
    //             setError("Failed to fetch reviewers");
    //             console.error(e);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     fetchOptions();
    // }, []);

    const filteredReviewer = reviewers.filter((rev: any) =>
        rev.name.toLowerCase().includes(searchquery.toLowerCase())
    );

    // const updateURL = useCallback(
    //     (updates: Record<string, string>) => {
    //         const params = new URLSearchParams(searchParams.toString());
    //         Object.entries(updates).forEach(([key, value]) => {
    //             if (value) {
    //                 params.set(key, value);
    //             } else {
    //                 params.delete(key);
    //             }
    //         });
    //         router.push(`/?${params.toString()}`, { scroll: false });
    //     },
    //     [router, searchParams]
    // );

    // useEffect(() => {
    //     if (selectedReviewers.length > 0) {
    //         updateURL({ reviewers: selectedReviewers.join(",") });
    //     } else {
    //         updateURL({ reviewers: "" });
    //     }
    // }, [selectedReviewers, updateURL]);

    function handleSelect(reviewerId: string) {
        const newSelectedReviewers = selectedReviewers.includes(reviewerId)
            ? selectedReviewers.filter((id) => id !== reviewerId)
            : [...selectedReviewers, reviewerId];
        setSelectedReviewers(newSelectedReviewers);
    }

    // if (isLoading) return <p>Loading options...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex gap-2 flex-wrap justify-start items-center">
            {selectedReviewers.map((rev: TypeReviewer, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    className="border-2 border-[#ff3b5c]  rounded-full bg-[#f3f4f6] hover:bg-gray-300"
                    onClick={() => handleSelect(rev.tiktok_handler)}
                >
                    <p className="text-black text-md font-bold">{rev}</p>
                </Button>
            ))}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex gap-2 border-2 border-[#222222] rounded-full capitalize font-bold text-lg bg-white text-black"
                    >
                        Reviewer
                        <ListFilter/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Reviewer</h4>
                        <p className="text-sm text-muted-foreground">
                            select your favourite food reviewer
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4 py-4">
                        <input
                            className="text-md border p-2 rounded-md"
                            placeholder="Search Food Reviewer"
                            value={searchquery}
                            type="text"
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchQuery(value);
                            }}
                        />

                        <div className="w-[100%]">
                            <ScrollArea className="sm:h-96 h-[77shv] w-[100%] rounded-lg border-2">
                                {filteredReviewer.length > 0 ? (
                                    filteredReviewer.map(
                                        (
                                            reviewer: TypeReviewer,
                                            index: number
                                        ) => (
                                            <div
                                                key={index}
                                                className="w-[100%]"
                                            >
                                                <Button
                                                    size="lg"
                                                    variant="ghost"
                                                    className="rounded-none w-[100%] h-[20] flex items-center text-left justify-between px-4 py-2"
                                                    onClick={() =>
                                                        handleSelect(
                                                            reviewer.tiktok_handler
                                                        )
                                                    }
                                                >
                                                    <Reviewer
                                                        reviewer={reviewer}
                                                    ></Reviewer>
                                                </Button>
                                                {index <
                                                    reviewers.length - 1 && (
                                                    <Separator />
                                                )}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <>
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="rounded-none w-[100%] h-[20] flex items-center text-left justify-between px-4 py-2"
                                        >
                                            no result found
                                        </Button>
                                        <Separator></Separator>
                                    </>
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
function GebetaSearch({ reviewers }) {
    console.log(reviewers);
    return (
        <>
            <div className="flex flex-col">
                <div className="w-[90%] flex  gap-4 justify-evenly  p-1 items-center">
                    <div className="w-full border-2 border-[#ca3b19] px-4  rounded-full  flex justify-between  items-center gap-2 ">
                        <div className="w-[50%]">
                            <RestaurantSearch></RestaurantSearch>
                        </div>
                        <div className="bg-[#ca3b19] w-[2px] h-10 border-1"></div>
                        <div className="w-[50%]">
                            <Address></Address>
                        </div>
                    </div>
                    <Button className="bg-white border-2 border-[#ca3b19] text-[#ca3b19] text-md">
                        Search
                    </Button>
                </div>
                <div className="w-[90%] flex flex-wrap gap-2 p-2">
                    <ReviewerFilter reviewers={reviewers} />
                </div>
            </div>
        </>
    );
}

export default GebetaSearch;
