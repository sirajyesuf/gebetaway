import { useState } from "react";

// Define a type for the possible keys used in search params
type SearchParamsKey = string;

// Define a type for the useSearchParams hook's return value
interface UseSearchParams {
    get: (key: SearchParamsKey) => string | null;
    set: (key: SearchParamsKey, value: string | null) => void;
    delete: (key: SearchParamsKey) => void;
}

function useSearchParams(): UseSearchParams {
    // Function to get a search param
    const get: (key: SearchParamsKey) => string | null = (key) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    };

    // Function to set a search param
    const set: (key: SearchParamsKey, value: string | null) => void = (
        key,
        value
    ) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(key, value); // Add or update the parameter
        } else {
            params.delete(key); // If value is null, remove the param
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
    };

    // Function to delete a search param
    const del: (key: SearchParamsKey) => void = (key) => {
        const params = new URLSearchParams(window.location.search);
        params.delete(key);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
    };

    return {
        get,
        set,
        delete: del,
    };
}

export default useSearchParams;
