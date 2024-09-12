import useSearchParams from "@/hooks/useUrlSearchParams";
import { router } from "@inertiajs/react";

function Search() {
    const searchParams = useSearchParams();

    const reviewers = searchParams.get("reviewers") || null;
    const location = searchParams.get("location") || null;
    const address = searchParams.get("address") || null;
    const categories = searchParams.get("categories") || null;

    let data = {};
    if (reviewers !== null) data.reviewers = reviewers.replace(/\s+/g, "");
    if (location !== null) data.location = location;
    if (address != null) data.address = address;
    if (categories !== null) data.categories = categories;

    router.visit("/", {
        method: "get",
        data: data,
        preserveScroll: true,
        preserveState: false,
        only: ["reviews"],
        onSuccess: (page) => {
            const params = window.location.search;
            console.log(params);
        },
    });
}

export default Search;
