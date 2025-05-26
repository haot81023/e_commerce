'use client'

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import posts from "@/components/data/posts.json";

export default function SearchProducts() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const found = posts.find(
            (post) => post.name.toLowerCase().includes(search.toLowerCase())
        )
        if (found) {
            router.push(`/products/${found.id}`);
        } else {
            alert("Product not found");
        }
    };
    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
            />
            <Button
                variant="outline"
                onClick={handleSearch}
                className="flex items-center justify-center"
            >
                <SearchIcon />
            </Button>
        </div>
    );
};
