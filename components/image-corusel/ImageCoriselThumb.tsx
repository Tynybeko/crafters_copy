import React from 'react'

type PropType = {
    selected: boolean
    item: any
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, item, onClick } = props
    
    return (
      <div
        className={'embla-thumbs__slide'.concat(
          selected ? ' embla-thumbs__slide--selected' : ''
        )}
      >
          <button
            onClick={onClick}
            type="button"
            className="embla-thumbs__slide__number"
          >
              <img src={item.image} alt=""/>
          </button>
      </div>
    )
}
