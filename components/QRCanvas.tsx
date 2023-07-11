'use client'

import React from 'react'
import { qrcanvas, QRCanvasOptions } from 'qrcanvas'

function QRCanvas({
    options,
    ...props
}: {
    options: QRCanvasOptions
    [key: string]: any
}) {
    const canvasRef = React.useRef<HTMLCanvasElement>(options.canvas || null)

    React.useEffect(() => {
        update()
    }, [canvasRef, options])

    function update() {
        // let { options } = props
        if (canvasRef.current) {
            options = {
                ...options,
                canvas: canvasRef.current,
            }
        }
        if (!options.cellSize && !options.size) options.cellSize = 6
        qrcanvas(options)
    }

    return <canvas ref={canvasRef} {...props} />
}

export default QRCanvas
