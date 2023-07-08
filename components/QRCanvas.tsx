'use client'

import React from 'react'
import { qrcanvas, QRCanvasOptions } from 'qrcanvas'

function QRCanvas(props: { options: QRCanvasOptions }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        update()
    }, [canvasRef, props])

    function update() {
        let { options } = props
        if (canvasRef.current) {
            options = {
                ...options,
                canvas: canvasRef.current,
            }
        }
        if (!options.cellSize && !options.size) options.cellSize = 6
        qrcanvas(options)
    }

    return <canvas ref={canvasRef} />
}

export default QRCanvas
