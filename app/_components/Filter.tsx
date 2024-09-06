'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterType } from "../types/filterTypes";


export default function Filter(){

    const searchParams = useSearchParams();
    const activeFilter = searchParams.get('capacity') ?? "all";
    const router = useRouter();
    const pathName = usePathname()

    const handleFilter = function(filter: FilterType): void{
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);

        router.replace(`${pathName}?${params.toString()}`, {
            scroll: false,
        })
    }

    return (
        <div className="border-primary-800 flex">
            <FilterButton filter="all" handleFilter={handleFilter} activeFilter={activeFilter as FilterType}>All cabins</FilterButton>
            <FilterButton filter="small" handleFilter={handleFilter} activeFilter={activeFilter as FilterType}>1&mdash;3 Guests</FilterButton>
            <FilterButton filter="medium" handleFilter={handleFilter} activeFilter={activeFilter as FilterType}>4&mdash;7 Guests</FilterButton>
            <FilterButton filter="large" handleFilter={handleFilter} activeFilter={activeFilter as FilterType}>8+ Guests</FilterButton>
        </div>
    )
}

interface FilterButtonProps {
    filter: FilterType,
    activeFilter: FilterType,
    handleFilter: (filter: FilterType)=>void,
    children: string,
}

const FilterButton = function({ filter, handleFilter, activeFilter, children }: FilterButtonProps){
    return (
        <button 
            className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter && 'bg-primary-700 text-primary-50'}`} 
            onClick={()=>handleFilter(filter)}
        >
            {children}
        </button>
    )
}