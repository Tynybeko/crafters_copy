'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {
    
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )
    
    return (
      <div className='globalContainer'>
          <ul className={containerClasses}>
              <li className={listClasses}><Link href={'/'} className='flex items-center gap-[4px]'>   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.41735 9.33381C5.71337 10.484 6.75744 11.3338 8 11.3338C9.24256 11.3338 10.2866 10.484 10.5827 9.33381M7.34513 1.84315L2.82359 5.3599C2.52135 5.59498 2.37022 5.71252 2.26135 5.85973C2.16491 5.99012 2.09307 6.13701 2.04935 6.29319C2 6.4695 2 6.66095 2 7.04386V11.8671C2 12.6139 2 12.9872 2.14532 13.2725C2.27316 13.5233 2.47713 13.7273 2.72801 13.8552C3.01323 14.0005 3.3866 14.0005 4.13333 14.0005H11.8667C12.6134 14.0005 12.9868 14.0005 13.272 13.8552C13.5229 13.7273 13.7268 13.5233 13.8547 13.2725C14 12.9872 14 12.6139 14 11.8671V7.04386C14 6.66095 14 6.4695 13.9506 6.29319C13.9069 6.13701 13.8351 5.99012 13.7386 5.85973C13.6298 5.71252 13.4787 5.59499 13.1764 5.35991L8.65487 1.84315C8.42065 1.66099 8.30354 1.5699 8.17423 1.53489C8.06013 1.504 7.93987 1.504 7.82577 1.53489C7.69646 1.5699 7.57935 1.66099 7.34513 1.84315Z"
                    stroke="#262D29" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> {homeElement} </Link></li>
              {pathNames.length > 0 && separator}
              {
                  pathNames.map( (link, index) => {
                      let href = `/${pathNames.slice(0, index + 1).join('/')}`
                      let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                      let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                      return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                      )
                  })
              }
          </ul>
      </div>
    )
}

export default NextBreadcrumb