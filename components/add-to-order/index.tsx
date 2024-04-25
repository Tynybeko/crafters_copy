import React from "react";
import {ItemsTypes} from "@/types";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {CardItem} from "@/app/catalog/[subcategories]/components/CardItem";

export function AddToOrder(props: {
    open: boolean,
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    dataOrder: any,
    onChange1: (e: any) => void,
    colorModels: any,
    product: ItemsTypes | null
}) {
    return <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent className="max-w-[720px]">
            <div className="flex gap-x-[40px]">
                <form onSubmit={props.onSubmit} className="dialog-title flex-1 gap-[40px]">
                    <h1>Quick purchase <span>For a quick purchase, enter your email</span></h1>
                    <div className={"my-[24px]  flex flex-col gap-2"}>
                        <div>
                            <Input name={"name"} onChange={props.onChange} value={props.dataOrder.name}
                                   placeholder={"Your name*"}/>
                        </div>
                        <div>
                            <Input name={"phone"} onChange={props.onChange} value={props.dataOrder.phone}
                                   placeholder={"Your phone*"}/>
                        </div>
                        <div>
                            <Textarea name={"comment"} onChange={props.onChange1}
                                      value={props.dataOrder.comment}
                                      className={"resize-none h-[226px] p-[10px] rounded-[24px]"}/>
                        </div>
                    </div>
                    <Button type={"submit"} className={"w-full"}>
                        Send
                    </Button>
                </form>
                <div className="grid flex-1 gap-2">
                    {props.colorModels && (
                        <CardItem setIsActiveAlert={props.onOpenChange}
                                  colorModels={props.colorModels} product={props.product}/>
                    )}
                </div>
            </div>
        </DialogContent>
    </Dialog>;
}
