"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from 'antd';

const { Search } = Input;


export const SearchBar = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [search, setSearch] = useState(params.get("search") || "");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setSearch(params.get("search") || "");
    }, [params]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const query = new URLSearchParams(params.toString());

            if(!search) setLoading(false);
            setLoading(true);

            if (search) {
                query.set("search", search);
            }else{
                query.delete("search");
            }

            router.push(`/?${query.toString()}`);

            return clearTimeout(timeout);
        }, 500);
    }, [search]);
    return (
        <Search 
            placeholder="Rechercher un article" 
            enterButton="Search" 
            size="large"
            value={search}
            loading={loading}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}