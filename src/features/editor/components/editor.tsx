"use client"

import React, { useEffect, useRef } from 'react'
import { useEditor } from '@/features/editor/Hooks/useEditor'
import { fabric } from 'fabric'


const Editor = () => {
    const { init } = useEditor()
    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true
        })

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!
        })
    }, [init])

    // can you tell me why the width is being apply to the canvas but the initialCOntainer height is always being only 150px

    return (
        <div className='flex h-full flex-col'>
            <div className='h-full flex-1 bg-muted' ref={containerRef}>
                <canvas ref={canvasRef}  />
            </div>
        </div>
    )
}

export default Editor