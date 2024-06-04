'use client';

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { addToFavorites, deleteFavorites, fetchFavorites } from "@/redux/slices/favorites";
import { apiToken } from "@/axios";

export function AddFavorite({ data }: { data: any }) {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.favorites.data);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch, isFavorite]);

    useEffect(() => {
        if (favorites && Array.isArray(favorites)) {
            const foundFavorite = favorites.some((favorite: any) => favorite.item_data && favorite.item_data.id === data.id);
            setIsFavorite(foundFavorite);
        }
    }, [favorites, data.id]);

    const addToFavoritesAction = () => {
        if (favorites && Array.isArray(favorites)) {
            const isItemInFavorites = favorites.some((favorite: any) => favorite.item_data && favorite.item_data.id === data.id);
            if (isItemInFavorites) {
                const favoriteItem = favorites.find((favorite: any) => favorite.item_data && favorite.item_data.id === data.id);
                if (favoriteItem) {
                    apiToken.delete(`/favorite-items/${favoriteItem.id}`)
                        .then(res => {
                            dispatch(deleteFavorites(favoriteItem.id));
                            setIsFavorite(false);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            } else {
                apiToken.post('/favorite-items/', {
                    item: data.id
                })
                    .then(res => {
                        dispatch(addToFavorites(data));
                        setIsFavorite(true);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <div
            onClick={addToFavoritesAction}
            className={`card-top-btn shadow-custom ${isFavorite ? 'favorite' : ''}`}
        >
            <img className="object-cover" src={`/svg/heart-cart${isFavorite ? '-white' : '-blue'}.svg`} alt="" />
        </div>
    );
}
