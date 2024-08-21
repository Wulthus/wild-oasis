import { UsersIcon } from "@heroicons/react/24/solid";
import { Cabin } from "../types/cabinTypes";
import Image from "next/image";
import Link from "next/link";


function CabinCard({ cabin }: Cabin) {
  const { id, name, num_Bedrooms, base_price, discount, picture } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="relative flex-1">
        <Image
          src={picture}
          alt={`Cabin ${name}`}
          fill
          className="object-cover flex-1 border-r border-primary-800"
        />
      </div>


      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{num_Bedrooms}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${base_price - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${base_price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${base_price}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;