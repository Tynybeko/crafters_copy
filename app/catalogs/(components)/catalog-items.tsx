import React, { useState } from "react";
import Link from "next/link";


import { Button } from "@/components/ui/button";

//style
import './catalog-items.css'

export function CatalogItems(props : { onClick : () => void, onMouseEnter : () => void, onMouseLeave : () => void, openDrop : boolean }) {
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
      <div >
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
            <>
                <div className={ props.openDrop ? 'fonCatalog fonCatalog-active' : 'fonCatalog' }
                     onMouseEnter={ props.onMouseLeave }/>
                <div
                  onMouseEnter={ props.onMouseEnter }
                  className={ props.openDrop ? "catalog-menu  catalog-menu-active" : "catalog-menu" }
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
      </div>
    );
}
