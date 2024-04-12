import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

//styles
import './corusel.css'
import { Thumb } from "@/components/image-corusel/ImageCoriselThumb";

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
    const [ imagesFilter, setImagesFilter ] = useState<any[]>();
    
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
        if(!images && images.length === 0) return
        setImagesFilter(images[0].colors[0].images)
    }, []);
    
    return (
      <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
              <div className="embla__container">
                  {imagesFilter && imagesFilter.map((image: any, index: any) => (
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
                      {imagesFilter && imagesFilter.map(( item: any,index: any) => (
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
