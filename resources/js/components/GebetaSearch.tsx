import {
    Search,
    MoveLeft,
    MapPin,
    ListFilter,
    ChevronsUpDown,
    Check,
    X,
    CheckIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Reviewer as TypeReviewer } from "@/types/reviewer";
import useSearchParams from "@/hooks/useUrlSearchParams";
import { router } from "@inertiajs/react";
import TikTokVideo from "@/components/TikTokVideo";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

function RestaurantSearch() {
    const searchParams = useSearchParams();

    const [restaurant, setRestaurant] = useState(
        searchParams.get("restaurant") || ""
    );
    const updateURL = useCallback(
        (name: string, value: string) => {
            if (value) {
                searchParams.set(name, value);
            } else {
                searchParams.delete(name);
            }

            // router.push(`/?${params.toString()}`, { scroll: false });
        },
        [searchParams]
    );

    useEffect(() => {
        updateURL("restaurant", restaurant);
    }, [restaurant, updateURL]);

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
    const searchParams = useSearchParams();
    const [location, setLocation] = useState(
        searchParams.get("location") || ""
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function clear() {
        setLocation("");
    }

    const updateURL = useCallback(
        (name: string, value: string) => {
            if (value) {
                searchParams.set("location", value);
            } else {
                searchParams.delete("location");
            }
        },
        [searchParams]
    );

    const handleGetLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // const response = await fetch(
                    //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    // );
                    // const data = await response.json();

                    // if (data.display_name) {
                    //     setLocation(data.display_name);
                    // } else {
                    //     setError("Unable to retrieve address");
                    // }
                    setLocation(`${latitude},${longitude}`)
                } catch (error) {
                    setError("Error fetching location data");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError(`Unable to retrieve your location: ${error.message}`);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        updateURL("location", location);
    }, [location, updateURL]);

    return (
        <div className="relative">
            <Input
                type="text"
                value={location}
                placeholder="Figa, road to summit fird bet. In front of kaldis coffee"
                onChange={(e) => setLocation(e.target.value)}
                className="pl-14 text-lg text-black bg-white  border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
            />
            <Button
                variant="outline"
                size={null}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white border-none hover:bg-[#c44015] p-1 rounded-full"
                onClick={handleGetLocation}
            >
                <MapPin className="h-6 w-6" />
            </Button>
            {location ? (
                <Button
                    variant="ghost"
                    size={null}
                    className="absolute right-1 top-1/2 -translate-y-1/2  border-none hover:bg-[#c44015] rounded-full p-1"
                    onClick={clear}
                >
                    <X className="h-6 w-6" />
                </Button>
            ) : (
                ""
            )}
        </div>
    );
}

function Reviewer({ reviewer }) {
    return (
        // <div className="w-full flex gap-2 items-center px-2">
        // <Avatar className="border-2 border-[#ff3b5c]">
        //     <AvatarImage
        //         src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/dd5ec6adf36e6b504ecf0f0989e24c26~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=22065&refresh_token=34caa5b9f42d94f71b1ba957db90bfa9&x-expires=1724547600&x-signature=KO9RQK47fHaDiXZhm6dIvUDzEjw%3D&shp=a5d48078&shcp=81f88b70"
        //         alt="@shadcn"
        //     />
        //     <AvatarFallback className="bg-white">SG</AvatarFallback>
        // </Avatar>
        // <div className="font-bold"> {reviewer.name}</div>
        // {/* </div> */}

        <span className="flex space-x-2 items-center p-[3px]">
            <Avatar className="border-2 border-[#ff3b5c]">
                <AvatarImage
                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/dd5ec6adf36e6b504ecf0f0989e24c26~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=22065&refresh_token=34caa5b9f42d94f71b1ba957db90bfa9&x-expires=1724547600&x-signature=KO9RQK47fHaDiXZhm6dIvUDzEjw%3D&shp=a5d48078&shcp=81f88b70"
                    alt="@shadcn"
                />
                <AvatarFallback className="bg-white">SG</AvatarFallback>
            </Avatar>
            <span>{reviewer.name.toUpperCase()}</span>
        </span>
    );
}

function ReviewerFilter({ reviewers }) {
    const searchParams = useSearchParams();
    const [searchquery, setSearchQuery] = useState("");
    const [selectedReviewers, setSelectedReviewers] = useState<string[]>(() => {
        const reviewersParams = searchParams.get("reviewers");
        return reviewersParams
            ? reviewersParams.split(",").filter(Boolean)
            : [];
    });

    const filteredReviewer = reviewers.filter((rev: any) =>
        rev.name.toLowerCase().includes(searchquery.toLowerCase())
    );

    const updateURL = useCallback(
        (value: string) => {
            if (value) {
                searchParams.set("reviewers", value);
            } else {
                searchParams.delete("reviewers");
            }
        },
        [searchParams]
    );

    useEffect(() => {
        if (selectedReviewers.length > 0) {
            updateURL(selectedReviewers.join(", "));
        } else {
            updateURL("");
        }
    }, [selectedReviewers, updateURL]);

    function handleSelect(tiktok_handler: string) {
        const newSelectedReviewers = selectedReviewers.includes(tiktok_handler)
            ? selectedReviewers.filter((rev) => rev !== tiktok_handler)
            : [...selectedReviewers, tiktok_handler];

        setSelectedReviewers(newSelectedReviewers);
    }

    return (
        <div className="flex gap-2 flex-wrap justify-start items-center">
            {selectedReviewers.map((rev: string, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    className="border-2 border-[#ff3b5c]  rounded-full bg-[#f3f4f6] hover:bg-gray-300"
                    onClick={() => handleSelect(rev)}
                >
                    <p className="text-black text-md font-bold">@{rev}</p>
                </Button>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex gap-2 border-2 border-[#222222] rounded-full capitalize font-bold text-lg bg-white text-black"
                    >
                        Reviewer
                        <ListFilter />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:h-auto h=[100svh] sm:w-auto w-full bg-white">
                    <div className="mx-auto w-[95%] max-w-sm p-2">
                        <DialogHeader>
                            <DialogTitle>Reviewer</DialogTitle>
                            <DialogDescription>
                                Select Your Favourite Food Reviewer
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col space-y-4 py-4">
                            <input
                                className="text-lg border-2 border-[#f4f3f3] px-4 py-1 rounded-md"
                                placeholder="shegergebeta"
                                value={searchquery}
                                type="text"
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                            />

                            <ul className="w-[100%]">
                                <ScrollArea className="sm:h-96 h-[77shv]  w-[100%] rounded-lg border-2 border-[#f4f3f3]">
                                    {filteredReviewer.length > 0 ? (
                                        filteredReviewer.map(
                                            (
                                                reviewer: TypeReviewer,
                                                index: number
                                            ) => (
                                                <li
                                                    key={index}
                                                    className="w-[100%]"
                                                >
                                                    <Button
                                                        size="lg"
                                                        variant="ghost"
                                                        className="rounded-none w-[100%] h-[20] flex items-center text-left justify-between px-4 hover:bg-[#f7f7f3] hover:text-black"
                                                        onClick={() =>
                                                            handleSelect(
                                                                reviewer.tiktok_handler
                                                            )
                                                        }
                                                    >
                                                        {/* {reviewer.tiktok_handler} */}
                                                        <Reviewer
                                                            reviewer={reviewer}
                                                        ></Reviewer>
                                                        {selectedReviewers.includes(
                                                            reviewer.tiktok_handler
                                                        ) && <CheckIcon />}
                                                    </Button>
                                                    {index <
                                                        reviewers.length -
                                                            1 && <Separator className="bg-[#f4f3f3]" />}
                                                </li>
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
                            </ul>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
function Categories(props) {
    const searchParams = useSearchParams();
    const categories = props.categories;

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        () => {
            const categoriesParam = searchParams.get("categories");
            return categoriesParam
                ? categoriesParam.split(",").filter(Boolean)
                : [];
        }
    );

    const updateURL = useCallback(
        (value: string) => {
            if (value) {
                searchParams.set("categories", value);
            } else {
                searchParams.delete("categories");
            }
        },
        [searchParams]
    );

    useEffect(() => {
        if (selectedCategories.length > 0) {
            updateURL(selectedCategories.join(","));
        } else {
            updateURL("");
        }
    }, [selectedCategories, updateURL]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((value) => value !== category)
                : [...current, category]
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-white border-[#f05b1b] hover:bg-red-500 relative flex gap-2"
                >
                    <ListFilter className="h-6 w-6" />
                    {/* <p> Categories</p> */}
                    {selectedCategories.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {selectedCategories.length}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-60 bg-white text-black border-2 border-[#f05b1b]">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none f">
                            Categories
                        </h4>
                    </div>
                    <ScrollArea className="sm:h-96 h-[77shv]  w-[100%] rounded-sm border-2  border-[#f05b1b] p-2">
                        {categories.map((framework) => (
                            <>
                                <Button
                                    variant="ghost"
                                    key={framework}
                                    className="rounded-none w-[100%] h-[20] flex items-center text-left justify-between px-4 py-2"
                                    onClick={() => toggleCategory(framework)}
                                >
                                    {framework}
                                    {selectedCategories.includes(framework) && (
                                        <Check className="h-4 w-4" />
                                    )}
                                </Button>
                            </>
                        ))}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function GebetaSearch({ reviewers, categories }) {
    const searchParams = useSearchParams();
    console.log("render");

    function search() {
        const restaurant_name = searchParams.get("restaurant") || null;
        const reviewers = searchParams.get("reviewers") || null;
        const location = searchParams.get("location") || null;
        const categories = searchParams.get("categories") || null;
        let data = {};
        if (restaurant_name !== null) data.restaurant = restaurant_name;
        if (reviewers !== null) data.reviewers = reviewers.replace(/\s+/g, "");
        if (location !== null) data.location = location;
        if (categories !== null)
            data.categories = categories.replace(/\s+/g, "");
        router.visit("/", {
            method: "get",
            data: data,
            preserveScroll: true,
            only: ["reviews"],
        });
    }

    useEffect(() => {
        const handleSearchParamsChange = () => {
            // Trigger your search API with the new params
            // search();
            // console.log("URL changed");
            // console.log(window.location.search);
        };

        // Call initially on mount
        handleSearchParamsChange();

        // Listen for URL changes (e.g., back/forward navigation)
        window.addEventListener("popstate", handleSearchParamsChange);

        // Clean up listener on unmount
        return () => {
            window.removeEventListener("popstate", handleSearchParamsChange);
        };
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center  border-none p-1">
                {/* <div className="w-[90%] md:w-[90%] flex flex-row md:flex-row gap-4 justify-evenly  p-1 items-center"> */}
                <div className="w-full border-2 border-[#ca3b19] px-2  rounded-full  flex justify-between  items-center gap-2 py-[2px]">
                    <div className="w-[90%]">
                        <Address></Address>
                    </div>
                    <Button
                        className="bg-[#ca3b19] border-2 border-none rounded-full text-[rgb(249,245,245)] text-md hover:bg-black hidden md:block"
                        onClick={() => search()}
                    >
                        Search
                    </Button>
                </div>

                <div className="self-start">
                    {/* <Categories categories={categories}  /> */}
                </div>
                {/* </div> */}
                <div className="w-[90%] flex flex-wrap gap-2 p-2">
                    <ReviewerFilter reviewers={reviewers} />
                </div>
            </div>
        </>
    );
}

export default GebetaSearch;
