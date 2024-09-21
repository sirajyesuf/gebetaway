import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useSearchParams from "@/hooks/useUrlSearchParams";
import Search from "@/api"; 

interface Category {
    id: string;
    name: string;
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        () => {
            const categoriesParam = searchParams.get("categories");
            return categoriesParam
                ? categoriesParam.split(",").filter(Boolean)
                : [];
        }
    );

    const updateURL = (value: string) => {
        if (value) {
            searchParams.set("categories", value);
        } else {
            searchParams.delete("categories");
        }
    };

    const toggleCategory = (category_name: string) => {
        setSelectedCategories((current) => {
            const selectedCategories = current.includes(category_name)
                ? current.filter((value) => value !== category_name)
                : [...current, category_name];

            if (selectedCategories.length > 0) {
                updateURL(selectedCategories.join(","));
            } else {
                updateURL("");
            }

            Search();

            return selectedCategories;
        });
    };

    return (
        <div className="p-2 flex md:flex-row flex-col gap-2 md:items-center">
            <h2 className="text-lg font-bold capitalize text-[#ff5722]">categories</h2>
            <div className="flex flex-wrap gap-2">
                {categories.map((category: Category) => (
                    <Button
                        key={category.id}
                        variant={
                            selectedCategories.includes(category.name)
                                ? "default"
                                : "outline"
                        }
                        onClick={() => toggleCategory(category.name)}
                        className={`
             bg-[#e5e7eb]
             text-black
              rounded-full 
              text-sm
              py-1
              h-auto
              transition-all 
              duration-200 
              capitalize
              border-none
              ${
                  selectedCategories.includes(category.name)
                      ? "px-2 py-0 border-2 bg-[#ff5722] text-white hover:bg-[#ca3b19]"
                      : "px-4"
              }
            `}
                    >
                        {category.name}
                        {selectedCategories.includes(category.name) && (
                            <X
                                className="ml-1 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCategory(category.name);
                                }}
                            />
                        )}
                    </Button>
                ))}
            </div>
        </div>
    );
}
