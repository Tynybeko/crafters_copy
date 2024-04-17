import React, { useEffect, useState } from "react";


import { Button } from "@/components/ui/button";

//style
import './catalog-items.css'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItemCategories } from "@/redux/slices/item-categories";
import { fetchItemSubcategories } from "@/redux/slices/item-subcategories";
import { useRouter } from "next/navigation";

export function CatalogItems(props: {
    onClick: () => void,
    onMouseLeave: () => void,
    openDrop: boolean
}) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { data: categories } = useAppSelector(state => state.categories)
    const { data: subcategories } = useAppSelector(state => state.subCategories)
    const [categoryId, setCategoryId] = useState<any>();

    useEffect(() => {
        dispatch(fetchItemCategories())
    }, [dispatch]);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchItemSubcategories({ categoryId }))
        }
    }, [dispatch, categoryId]);

    const handleCatalogHover = (id: any) => setCategoryId(id)

    const handleRoute = (item: any) => {
        router.push(`/catalog/?category=${item.category}&subcategory=${item.id}`);
        props.onClick()
    }

    return (
        <div>
            <Button onClick={props.onClick}>Catalog
                <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="m1 1 4 4 4-4" />
                </svg>
            </Button>
            <div className={props.openDrop ? 'fonCatalog fonCatalog-active' : 'fonCatalog'}
                onMouseEnter={props.onMouseLeave} />
            <>
                <div
                    className={props.openDrop ? "catalog-menu  catalog-menu-active" : "catalog-menu "}
                    onMouseLeave={props.onMouseLeave}>
                    <div className='catalog-menu-lists'>
                        {categories?.map((item: any) => (
                            <button className={'text-left'} key={item.id}
                                onMouseEnter={() => handleCatalogHover(item.id)}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <div className='catalog-menu-items'>
                        <h3>
                            Catalog
                        </h3>
                        <div className={'sub_catalog-cards'}>
                            {subcategories?.map((item) => (
                                <div className={'cart-subcategory'} onClick={() => handleRoute(item)} key={item.id}>
                                    <div className={'cart-subcategory-item'}>
                                        <img src={item.image ? item.image : "/images/sub-category.png"} alt="Image" />
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </>
        </div>
    );
}
