"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from 'antd';

const { Search } = Input;


export const SearchBar = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [search, setSearch] = useState(params.get("category") || "");
    
    useEffect(() => {
        setSearch(params.get("category") || "");
    }, [params]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const query = new URLSearchParams(params.toString());

            search ? query.set("category", search) : query.delete("category");

            router.push(`/?${query.toString()}`);
        }, 500);
        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <Search 
            placeholder="Rechercher un article" 
            enterButton="Rechercher" 
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}