import React from 'react';


interface Props
    {
        className?: string,
        onClick? : () => void,
        activeStage : number,
        setActiveStage : any
        stageNames? : string[]
    }

export const Stages = ({ stageNames, onClick, className, activeStage, setActiveStage, } : Props) => {
    
    const handleClick = (index : any) => {
        setActiveStage(index)
    }
    
    return (
      <div className={ `add-products-steps ${className}` }>
          {stageNames && stageNames?.map((item, index) => (
            <div
              key={ index }
              onClick={ () => handleClick(index + 1) }
              className={ activeStage === index + 1 ? "add-products-step add-products-step-active" : "add-products-step" }
            >
                { item }
            </div>
          )) }
      </div>
    );
}

export default Stages;