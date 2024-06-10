import React, { useEffect, useState } from 'react';
import { ItemsTypes } from "@/types";
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import { fetchItems } from '@/redux/slices/items';
import ProductCard from '@/components/cards/ProductCard';

const ItemStage2 = ({ colorModels, product }: { colorModels: any, product: ItemsTypes }) => {
    const handleCopy = () => navigator.clipboard.writeText(colorModels.code);
    const { data: items } = useAppSelector(state => state.items);
    const dispatch = useDispatch()
    const [popularItems, setPopularItems] = useState([]);

    // console.log(popularItems, "fuck");

    useEffect(() => {
        dispatch(fetchItems({}) as any)
    }, [])

    useEffect(() => {
        if (items && items.length > 0) {
            const sortedItems = items.slice().sort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
            setPopularItems(sortedItems.slice(0, 3));
        }
    }, [items]);

    return (
        <section className={'main-features'}>
            <div className={'globalContainer'}>
                <div className=''>
                    <div>
                        <h2 className='text-[#262D29] text-[24px] leading-[26px] font-[500] mb-[24px]'>Main characteristics about the soft toy of large size brown color</h2>
                        <p className='text-[#262D2999] leading-[22px] text-[16px] font-[400] mb-[80px]'>
                            In front of you naykruhest phone of all existing, on my favorite Android.
                            <br /><br />
                            The smartphone is sealed and completely new, even in the factory film.
                            <br /><br />
                            All the characteristics and why exactly he will write below.
                            I use it myself, the smartphone is gorgeous absolutely everything.
                            <br /><br />
                            Why it and not S22 ultra.
                            The main difference from the S 22 - 23rd battery holds really longer and the second is the camera, ultrashirik it became a lot cleaner and cooler. They put armored glass victus now it is definitely shockproof and it feels.
                            Poigrams, S 22 on the bubge warms up more.
                            <br /><br />
                            In general, the characteristics.
                            <br /><br />
                            Smartphone Samsung Galaxy S23 Ultra 5G:
                            The color is probably the topmost (green)
                            <br /><br />
                            Version Europe (upgradable). Don't fall for America, buy it and you'll regret it.
                            Yes it is cheaper, yes it is almost no different, but everything in it, language, programs and even communication, will work crookedly and it is not fixed.
                            <br /><br />
                            RAM: 12 GB
                            Built-in memory 512 GB
                            <br /><br />
                            Screen Type:AMOLED 6.8 inches 3884 * 2560
                            Number of pixels per inch 500 ppi Refresh 120Hz at 1750 nits the brightest and most colorful display available.
                            <br /><br />
                            Fastest Galaxy
                            Snapdragon 8 Gen 2 processor is the fastest and most powerful of all Qualcomm chips.
                            But Only on the Galaxy S23 released an improved version, Snapdragon 8 Gen 2 for Galaxy at 3.3 It will only be on them, and thus us.
                            <br /><br />
                            The battery has a capacity of 5,000. Enough for a day in amplified user mode Charging less than an hour and another day.
                            45-watt wired unit charges 65% in 30 minutes. USB Type-C 3.2, OTG.
                            wireless charging also works.
                            <br /><br />
                            Translated with www.DeepL.com/Translator (free version)
                            <br /><br />
                            Case - Absolute reliability.
                            Fully metal and Gorilla Glass Victus 2 on both sides, which is the strongest glass created by Corning.
                            <br /><br />
                            The signature S Pen gives you a truly unique drawing experience. You'll feel like you're working with real paper: drawing, writing, making notes, sketching or working with Excel. In general, everything is easier with it.
                            <br /><br />
                            And this is the main reason why it is it! Mega-cool camera at 200 megapixels with 10 times uvilichivaniya shooting 8k in 30frames, makes video vivid, and pictures divine, as on a professional camera with color correction in expert mode. Or on auto settings, when neural networks take over all the work of enhancing photos and videos.
                            Also macro and incredible night shooting plus a whole universe of settings for them.
                            Number of main (rear) cameras:4
                            Flash: LED
                            Auto-HDR, HDR10+ panorama, stereo audio recording, gyroscope-EIS
                            Front Camera:
                            12 MP, f/2.2, 26mm (wide), Dual Pixel
                            Max video resolution of front camera: 4K It's really the best and will not yield to the 14.
                            <br /><br />
                            With this phone you will conquer all social networks, every photo is a masterpiece and hundreds of likes.
                            <br /><br />
                            Operating System:Android 13
                            5G support:
                            <br /><br />
                            SIM cards:2 Nano-SIM
                            <br /><br />
                            Finally installed 5.3 latest bluetooth
                            And the latest version of wi-fi.
                            <br /><br />
                            Translated with www.DeepL.com/Translator (free version)
                        </p>
                    </div>
                    <div>
                        <h2 className='text-[#262D29] text-[24px] leading-[26px] font-[500] mb-[24px]'>Related Products</h2>
                        <div className='flex gap-[24px]'>
                            {
                                popularItems.map((item: any) => (
                                    <ProductCard key={item.id} data={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemStage2;
