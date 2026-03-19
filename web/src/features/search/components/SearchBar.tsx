"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from 'antd';

export const SearchBar = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [search, setSearch] = useState(params.get("search") || "");
    
    useEffect(() => {
        setSearch(params.get("search") || "");
    }, [params]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const query = new URLSearchParams(params.toString());

            search ? query.set("search", search) : query.delete("search");

            router.push(`/?${query.toString()}`);
        }, 500);
        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <Input 
            placeholder="Rechercher un article" 
            size="medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}