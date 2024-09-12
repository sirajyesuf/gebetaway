import { MapPin, ListFilter, CheckIcon, LoaderCircle, X } from "lucide-react";
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
import Search from "@/api";

function Address() {
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(
        searchParams.get("location") || ""
    );
    const [address, setAddress] = useState(searchParams.get("address") || "");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function setAddressValue(value: string) {
        setAddress(() => {
            if (value === "") updateURL("location", value);
            updateURL("address", value);
            return value;
        });
    }

    function setLocationValue(location: string, address: string) {
        setLocation(() => {
            updateURL("location", location);
            setAddressValue(address);
            return location;
        });
    }

    function clear() {
        setAddressValue("");
        setLocationValue("", "");
    }

    const updateURL = (name: string, value: string) => {
        if (value) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name);
        }
    };

    const handleGetLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    if (data.display_name) {
                        setLocationValue(
                            `${latitude},${longitude}`,
                            data.display_name
                        );
                    } else {
                        setError("Unable to retrieve address");
                    }
                } catch (error) {
                    setError("Error fetching location data");
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                setError(`Unable to retrieve your location: ${error.message}`);
                setIsLoading(false);
            }
        );
    };

    return (
        <div className="relative">
            <Input
                type="text"
                value={address}
                placeholder="Figa, road to summit fird bet. In front of kaldis coffee"
                onChange={(e) => setAddressValue(e.target.value)}
                className="pl-20 text-lg text-black bg-white  border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
            />
            <Button
                variant="outline"
                size={null}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white border-none hover:bg-[#c44015] p-1 rounded-full"
                onClick={handleGetLocation}
            >
                {isLoading ? (
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                ) : (
                    <MapPin className="h-6 w-6" />
                )}
            </Button>

            {location || address ? (
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
        <span className="flex space-x-2 items-center p-[3px]">
            <Avatar className="border-2 border-[#ff3b5c]">
                <AvatarImage
                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/dd5ec6adf36e6b504ecf0f0989e24c26~c5_1080x1080.jpeg?lk3s=a5d48078&nonce=22065&refresh_token=34caa5b9f42d94f71b1ba957db90bfa9&x-expires=1724547600&x-signature=KO9RQK47fHaDiXZhm6dIvUDzEjw%3D&shp=a5d48078&shcp=81f88b70"
                    alt="@shadcn"
                />
                <AvatarFallback className="bg-white">SG</AvatarFallback>
            </Avatar>
            <span>{reviewer.toUpperCase()}</span>
        </span>
    );
}

function ReviewerFilter(props) {
    const reviewers = props.reviewers.map((rev) => rev.replace(/\s+/g, ""));
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    const [searchquery, setSearchQuery] = useState("");
    const [selectedReviewers, setSelectedReviewers] = useState<string[]>(() => {
        const reviewersParams = searchParams.get("reviewers");
        return reviewersParams
            ? reviewersParams.split(",").filter(Boolean)
            : [];
    });

    const filteredReviewer = reviewers.filter((rev: any) =>
        rev.toLowerCase().includes(searchquery.toLowerCase())
    );

    const updateURL = (value: string) => {
        if (value) {
            searchParams.set("reviewers", value);
        } else {
            searchParams.delete("reviewers");
        }
    };

    function handleRemoveReviewer(tiktok_handler: string) {
        setSelectedReviewers((selectedReviewers) => {
            const newSelectedReviewers = selectedReviewers.filter(
                (rev) => rev !== tiktok_handler
            );

            if (newSelectedReviewers.length > 0) {
                updateURL(newSelectedReviewers.join(","));
            } else {
                updateURL("");
            }

            Search();

            return newSelectedReviewers;
        });
    }
    function handleSelect(tiktok_handler: string) {
        setSelectedReviewers((selectedReviewers) => {
            const newSelectedReviewers = selectedReviewers.includes(
                tiktok_handler
            )
                ? selectedReviewers.filter((rev) => rev !== tiktok_handler)
                : [...selectedReviewers, tiktok_handler];

            if (newSelectedReviewers.length > 0) {
                updateURL(newSelectedReviewers.join(","));
            } else {
                updateURL("");
            }
            return newSelectedReviewers;
        });
    }

    const handleDialogClose = () => {
        Search();
    };

    return (
        <div className="flex gap-1 flex-wrap justify-start items-center">
            {selectedReviewers.map((rev: string, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    className="border-2 border-[#ff3b5c]  rounded-full bg-[#f3f4f6] hover:bg-gray-300"
                    onClick={() => handleRemoveReviewer(rev)}
                >
                    <p className="text-black text-md font-bold">@{rev}</p>
                </Button>
            ))}
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        handleDialogClose();
                    }
                }}
            >
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
                                                                reviewer
                                                            )
                                                        }
                                                    >
                                                        <Reviewer
                                                            reviewer={reviewer}
                                                        ></Reviewer>
                                                        {selectedReviewers.includes(
                                                            reviewer
                                                        ) && <CheckIcon />}
                                                    </Button>
                                                    {index <
                                                        reviewers.length -
                                                            1 && (
                                                        <Separator className="bg-[#f4f3f3]" />
                                                    )}
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

function GebetaSearch({ reviewers, categories }) {
    const handleClick = () => {
        Search();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            Search();
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center  border-none p-1">
                <div className="w-full border-2 border-[#ca3b19] px-2  rounded-full  flex justify-between  items-center gap-2 py-[2px]">
                    <div
                        className="w-[90%]"
                        onKeyDown={(e) => handleKeyDown(e)}
                    >
                        <Address></Address>
                    </div>
                    <Button
                        className="bg-[#ca3b19] border-2 border-none rounded-full text-[rgb(249,245,245)] text-md hover:bg-black hidden md:block"
                        onClick={() => handleClick()}
                    >
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
