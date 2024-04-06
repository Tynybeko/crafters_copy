import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from "@/components/image-corusel/ImageCoriselThumb";

//styles
import './corusel.css'

type PropType = {
    options?: EmblaOptionsType
    images?: any
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options, images } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })
    
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
    
    console.log(images[0])
    
    return (
      <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
              <div className="embla__container">
                  {images && images[0].images.map((image: any, index: any) => (
                    <div className="embla__slide" key={index}>
                        <div className="embla__slide__number">
                            <img src={image.image} alt=""/>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
          
          <div className="embla-thumbs">
              <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                  <div className="embla-thumbs__container">
                      {images && images[0].images.map(( item: any,index: any) => (
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
