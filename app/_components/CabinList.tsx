import { unstable_noStore as noStore} from "next/cache";
import { getCabins } from "../_library/data-service";
import { Cabin } from "../types/cabinTypes";
import { FilterType } from "../types/filterTypes";

import CabinCard from "./CabinCard";


interface CabinListProps {
    filter: FilterType,
}

export default async function CabinList({ filter }: CabinListProps){

    noStore();

    const cabins: Cabin[] = await getCabins();

    if (!cabins) return null;

    let filteredCabins: Cabin[] = [];
    switch (filter) {
        case 'all':
            filteredCabins = cabins;
            break;
        case 'small':
            filteredCabins = cabins.filter((cabin)=>cabin.num_Bedrooms <= 3);
                break;
        case 'medium':
            filteredCabins = cabins.filter((cabin)=>cabin.num_Bedrooms >= 4 && cabin.num_Bedrooms <= 7 );
                break;
        case 'large':
            filteredCabins = cabins.filter((cabin)=>cabin.num_Bedrooms >= 8);
                break;
        default:
            break;
    }

    return(
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}