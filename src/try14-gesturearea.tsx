import { useState } from "react"
import { Slider } from "./components/Slider"

export default function App() {
    const [value, setValue] = useState(0)
    const [isPointerDown, setIsPointerDown] = useState(true)
    const [valueDelta, setValueDelta] = useState(0)
    return (
        <div>
            <TryBubbleCapture />
            <Slider
                className="w-full h-80  "
                isVertical={ false }
                value={ value }
                onValueChange={ (newValue) => {
                    setValue(newValue)
                } }
            />
        </div>
    )
}

function TryBubbleCapture() {
    const [count, setCount] = useState(0)
    /**
     * 結論:
     * 1. 兩個 sibling,只有一個能收到 event
     * 2. 但是 children/parent 就正常 bubble
     * 3. 實際順序是 
     *      從 parent 開始查詢event,如果是capture event,就執行,然後直到最裡面的 children
     *      然後從 最裡面的 children 開始bubble,向外執行默認的 bubble event
     *      parent -> children --┐ 檢查 capture
     *      parent <- children <-┘ 檢查 bubble
     *      
     *      
     */
    return (
        <div className="border w-96 h-96">
            <div className="absolute bg-red-600/60 left-0 top-0 w-48 h-48" onClickCapture={ () => {
                console.log('red is clicked')
            } }>

                <div className="absolute bg-green-600/60 left-12 top-12 w-48 h-48" onClick={ () => {
                    console.log('green is clicked')
                } }>

                    <div className="absolute bg-yellow-300/60 left-12 top-12 w-48 h-48" onClickCapture={ () => {
                        console.log('yellow is clicked')
                    } }>

                    </div>
                </div>
            </div>
        </div>
    )
}
