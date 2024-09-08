import { useState, useEffect,useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useSearchParams from "@/hooks/useUrlSearchParams";

interface Category {
    id: string;
    name: string;
}

export default function CategoryFilter({ categories }) {
    console.log(categories);
    const searchParams = useSearchParams();

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

    const toggleCategory = (category_name: string) => {
        setSelectedCategories((current) =>
            current.includes(category_name)
                ? current.filter((value) => value !== category_name)
                : [...current, category_name]
        );
    };

    return (
        <div className="p-2 space-y-2 flex md:flex-row flex-col gap-2  md:items-center">
            <h2 className="text-lg font-bold">Categories</h2>
            <div className="flex flex-wrap gap-2">
                {categories.map((category:Category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                        onClick={() => toggleCategory(category.name)}
                        className={`
             bg-white
             text-black
              rounded-full 
              text-xs
              py-1
              h-auto
              transition-all 
              duration-200 
              capitalize
              ${selectedCategories.includes(category.name) ? "pr-1 pl-2" : "px-2"}
            `}
                    >
                        {category.name}
                        {selectedCategories.includes(category.name) && (
                            <X
                                className="ml-1 h-3 w-3 shrink-0 opacity-50 hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCategory(category.name);
                                }}
                            />
                        )}
                    </Button>
                ))}
            </div>
            {/* <Button onClick={applyFilter} className="mt-2 text-xs py-1 h-auto rounded-full w-full">
        Apply Filter
      </Button> */}
        </div>
    );
}
