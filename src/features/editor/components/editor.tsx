"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEditor } from '@/features/editor/Hooks/useEditor'
import { fabric } from 'fabric'
import { Navbar } from '@/features/editor/components/navbar'
import Sidebar from '@/features/editor/components/sidebar'
import Toolbar from '@/features/editor/components/toolbar'
import Footer from '@/features/editor/components/footer'
import { ActiveTool } from '@/features/editor/type'


const Editor = () => {
    const { init } = useEditor()
    const canvasRef = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeTool, setActiveTool] = useState<ActiveTool>("select")

    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        if (tool === activeTool) {
            return setActiveTool("select")
        }

        if (tool === "draw") {
            //TODO:Enable draw mode
        }

        if (activeTool === "draw") {
            //TODO:Disable draw mode
        }

        setActiveTool(tool)
    }, [activeTool])

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

        return () => {
            canvas.dispose()
        }
    }, [init])

    // can you tell me why the width is being apply to the canvas but the initialCOntainer height is always being only 150px

    return (
        <div className='flex h-full flex-col'>
            <Navbar
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main className='bg-muted flex-1 overflow-auto related flex flex-col'>
                    <Toolbar />
                    <div className='flex-1 h-[calc(100%-124px)] bg-muted' ref={containerRef}>
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Editor