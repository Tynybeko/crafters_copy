import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

//styles
import './corusel.css'
import { Thumb } from "@/components/image-corusel/ImageCoriselThumb";

type PropType = {
    options?: EmblaOptionsType
    model?: any
}

const EmblaCarousel = ({ model, options, product }: { model?: any, options?: any, product?: any }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [isCart, setIsCart] = useState(false)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })
    const [imagesFilter, setImagesFilter] = useState<any[]>();

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    useEffect(() => {
        if (!model || !model.images || model.images.length === 0) return;
        setImagesFilter(model.images);
    }, [model]);

    // useEffect(() => {
    // console.log(model, "modal");
    // console.log(options, "option");
    // }, [model])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {imagesFilter && imagesFilter.map((image: any, index: any) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                <div
                                    onClick={() => setIsCart(!isCart)}
                                    style={{
                                        background: isCart ? '#1DBE60' : 'white',
                                        position: 'absolute',
                                        top: '30px',
                                        right: '30px',
                                    }}
                                    className='btn-heart'>
                                    <img src={`/svg/heart-cart${isCart ? '-white' : '-blue'}.svg`} alt="" />
                                </div>
                                <img src={image.image} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {imagesFilter && imagesFilter.map((item: any, index: any) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
