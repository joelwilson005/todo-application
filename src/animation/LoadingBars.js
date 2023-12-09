import React from 'react'
import {Bars} from 'react-loader-spinner'

const LoadingBars = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-neutralBackground">
            <Bars
                height="80"
                width="80"
                color="#744fc6"
                ariaLabel="bars-loading"
                visible={true}
            />
        </div>
    )
}

export default LoadingBars