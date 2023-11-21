"use client";
import Breadcrumb from "@/components/ui/breadcrumb";
import { useProductQuery } from "@/hooks/api/product/useGetProduct";
import { IProduct } from "@/types";
import { GlobeIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import ProductDetails from "../screens/ProductDetails";
type Props = {
  params: {
    productSlug: string;
  };
};
const Product = ({ params: { productSlug } }: Props) => {
  const { data, isLoading } = useProductQuery(productSlug);
  return (
    <div className="py-5  ">
      <section className="py-5 bg-gray-100 dark:bg-gray-900 ">
        <div className="flex justify-between items-center container">
          <h1>djf</h1>
          <Breadcrumb />
        </div>
      </section>

      <div className="flex flex-col space-y-5 md:flex-row  md:space-x-6 container py-8">
        <div className="w-full md:w-[75%] overflow-hidden ">
          <ProductDetails {...{ product: data as IProduct }} />
        </div>
        <div className="flex w-full md:w-[25%] h-auto space-y-5 bg-gray-100 flex-col py-4 px-4 overflow-hidden">
          <div className="bg-white py-4 px-4 w-full flex gap-4 items-center ">
            <div>
              <Image
                src={data?.shop.logo.img_url as string}
                alt={data?.shop.name as string}
                width={90}
                height={90}
                className="rounded-full w-14 h-14 sm:w-20 sm:h-20"
              />
            </div>
            <div>
              <h1 className="text-primary text-lg font-semibold">
                {data?.shop.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-400">{data?.shop.description}</p>
            <span className=" w-full border-dotted border-t-2 mt-4" />
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <SmartphoneIcon className="w-4 text-primary" />
                <p className="text-base text-gray-900 dark:text-white font-medium">
                  Contact:
                </p>
              </span>
              <p>{data?.shop.settings?.contact}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1 sm:gap-2">
                <GlobeIcon className="w-4 text-primary" />
                <p className="text-xs sm:text-base text-gray-900 dark:text-white font-medium">
                  Website:
                </p>
              </span>
              <p className="text-xs sm:text-base">{data?.shop.settings?.website}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
