'use client'

import React from 'react';
import EmblaCarousel from "@/components/carusel/EmblaCaresel";
import { EmblaOptionsType } from "embla-carousel";

import './banner.css'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 8
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Banner = () => {
    return (
        <section className='globalContainer'>
            <div className='banner'>
                <div className='banner-item'>
                    <div className='banner-content'>
                        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                    </div>
                    <div className='banner-image'>
                        <img src="/images/banner.png" alt="Image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
