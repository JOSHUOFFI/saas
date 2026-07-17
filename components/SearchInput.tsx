'use client';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";


const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    //also using a usestate to modify it
    const [searchQuery, setsearchQuery] = useState(query);

    // navigate when searchQuery changes
    useEffect(() => {
        if (searchQuery !== undefined) {
            router.push(`${pathname}?topic=${encodeURIComponent(searchQuery)}`);
        }
    }, [searchQuery, router, pathname]);


    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 py-1 ps-1 h-fit">
            <Image src="/icons/search.svg"
                alt="search"
                width={15}
                height={15}
            />

            <input
                placeholder="Search Companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setsearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput


