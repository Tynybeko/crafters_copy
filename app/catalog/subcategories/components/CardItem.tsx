import Box from "@/components/ui/Box";
import {Button} from "@/components/ui/button";
import React from "react";

export const CardItem = ({ colorModels, product, } : {colorModels: any, product: any}) => {
    return (
        <div className={"product-card"}>
            <div className={"product-card-item"}>
                <h1>Your product</h1>
                <div className={"flex items-center justify-between mb-[24px]"}>
                    <div className={"flex items-center"}>
                        {[1, 2, 3, 4, 5].map((star: number) => (
                            <img key={star}
                                 src={`/svg/star${star <= product?.raiting ? '' : '-outline'}.svg`}
                                 alt=''/>
                        ))}
                        <span className={"ml-2"}>
                                       {colorModels.raiting !== 0 && colorModels.raiting ? colorModels.raiting : 0} reviews
                                    </span>
                    </div>
                    <div className={"item-stage1-header-contents-code"}>
                        Code: #{colorModels.code}
                        <img
                            src="/svg/copy.svg"
                            alt="Copy Code"
                            style={{cursor: "pointer"}}
                        />
                    </div>
                </div>
                <div className={"rounded-[32px] overflow-hidden mb-[24px]"}>
                    <img className={"w-full h-full object-cover"} src={colorModels.images[0].image}
                         alt="Image"/>
                </div>
                <Box className={"p-[24px]"}>
                    <div className={"flex items-center justify-between mb-[12px]"}>
                        <p className={"text-[16px] text-[#1DBE60] font-[400] flex items-center gap-1"}>
                            <img src="/svg/check-circle-broken.svg" alt="Icon"/>
                            {product.models_name.length ? "In stock" : "0"}
                        </p>
                        <div className={"flex items-center gap-2"}>
                                        <span className={"text-[16px] text-[#262D29]/40 font-[500] leading-[16px]"}>
                                            Vendor: <span
                                            className={" text-[#262D29] underline ml-[4px]"}>{product.company.legal_name}</span>
                                        </span>
                            <div className={"w-[24px] h-[24px] rounded-full overflow-hidden"}>
                                <img className={"w-full h-full object-cover object-center"}
                                     src={product.company.image ? product.company.image : "/images/avatar.jpeg"}
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                    <p className={"text-[32px] font-[700] text-[#F83427] flex items-center gap-1 mb-[12px]"}>
                        <span>{colorModels?.currency?.code} </span>
                        {colorModels?.price}
                        {colorModels?.discount !== null &&
                            <span className={"font-[500] text-[16px] line-through opacity-40"}>
                                            <span>{colorModels?.currency?.code} {colorModels?.discount} </span>
                                        </span>}
                    </p>
                    <div className={"flex items-center gap-2"}>
                        <Button variant={"default"} className={"flex items-center gap-1 w-[142px]"}>
                            <img src="/svg/shopping.svg" alt="Cart"/>
                            Buy
                        </Button>
                        <Button variant={"outline"} className={"flex items-center gap-1 w-[142px]"}>
                            Fast buy
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}