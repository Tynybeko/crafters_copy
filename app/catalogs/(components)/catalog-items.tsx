import React, { useState } from "react";
import Link from "next/link";


import { Button } from "@/components/ui/button";

//style
import './catalog-items.css'

export function CatalogItems(props : { ref : React.MutableRefObject<HTMLDivElement | null>, onClick : () => void, onMouseEnter : () => void, onMouseLeave : () => void, openDrop : boolean }) {
    const [ catalogData, setCatalogData ] = useState<string[]>([]);
    const [ currentCatalog, setCurrentCatalog ] = useState<string | null>(null);
    
    const handleCatalogHover = (catalog : string) => {
        switch ( catalog ) {
            case "Catalog1":
                setCatalogData([ "Data for Catalog1" ]);
                break;
            case "Catalog2":
                setCatalogData([ "Data for Catalog2" ]);
                break;
            case "Catalog3":
                setCatalogData([ "Data for Catalog3" ]);
                break;
            case "Catalog4":
                setCatalogData([ "Data for Catalog4" ]);
                break;
            default:
                setCatalogData([]);
        }
        setCurrentCatalog(catalog);
    };
    
    return (
      <div ref={ props.ref }>
          <Link href={ '/catalogs' }>
              <Button onClick={ props.onClick } onMouseEnter={ props.onMouseEnter }
                      onMouseLeave={ props.onMouseLeave }>Catalog
                  <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="m1 1 4 4 4-4"/>
                  </svg>
              </Button>
          </Link>
          { props.openDrop && (
            <>
                <div className='w-full h-full fixed top-0 left-0 bg-[#262D294D] -z-50 backdrop-blur-sm'
                     onMouseEnter={ props.onMouseLeave }/>
                <div
                  onMouseEnter={ props.onMouseEnter }
                  className="catalog-menu"
                  onMouseLeave={ props.onMouseLeave }>
                    <div className='catalog-menu-lists'>
                        <button onMouseEnter={ () => handleCatalogHover("Catalog1") }>
                            Catalog1
                        </button>
                    </div>
                    <div className='catalog-menu-items'>
                        <h3>
                            Catalog1
                        </h3>
                        { currentCatalog === "Catalog1" && (
                          <div>
                              { catalogData.map((item, index) => (
                                <div key={ index }>{ item }</div>
                              )) }
                          </div>
                        ) }
                    </div>
                </div>
            </>
         ) }
      </div>
    );
}
