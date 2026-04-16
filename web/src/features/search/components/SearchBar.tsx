"use client"

import { useEffect, useState } from 'react'
import { Input } from 'antd';
import { useDebounce, useQueryParams } from '@/hooks';

export const SearchBar = () => {
    const { getParam, setParam } = useQueryParams();
    const [search, setSearch] = useState(getParam("search") || "");
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const current = getParam("search");

        if (current !== debouncedSearch) {
            setParam("search", debouncedSearch);
        }
    }, [debouncedSearch, setParam, getParam]);

    return (
        <Input
            placeholder="Rechercher un article"
            size="medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}