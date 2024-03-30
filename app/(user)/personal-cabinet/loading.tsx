import React from "react";

import '../../globals.css';

function LoadingSkeleton() {
    return (
        <div className="loading">
            <div className="loader"></div>
        </div>
    );
}

export default function Loading() {
    return <LoadingSkeleton />
}