import { useRef, useState } from "react"
export default function App() {
    const [count, setCount] = useState(0)
    const refDivRef = useRef<HTMLAudioElement>(null)
    return (
        /**
         * 結論: 只會fetch audio部分
         */

        <div>iiu
            <video muted controls
                src="https://fnothing.hopto.org:55000/api/file/%E6%9C%88%E5%92%8F/%E6%9C%88%E5%92%8F/03.mkv"
                onPause={ () => {
                    refDivRef.current?.pause()
                } }
                onPlay={ () => {
                    refDivRef.current?.play()
                } }
                onTimeUpdate={ (e) => {
                    if (e.currentTarget.seeking) {
                        
                        refDivRef.current.currentTime = e.currentTarget.currentTime
                    }
                } }
            >
                <audio ref={ refDivRef } controls src="https://fnothing.hopto.org:55000/api/file/%E6%9C%88%E5%92%8F/%E6%9C%88%E5%92%8F/03.mkv"></audio>
            </video>
            {/* <audio muted controls src="https://fnothing.hopto.org:55000/api/file/电波女与青春男/[Snow-Raws] 電波女と青春男/[Snow-Raws] 電波女と青春男 第07話 (BD 1920x1080 HEVC-YUV420P10 FLACx2).mkv"></audio> */ }
        </div>
    )
}
