import { useState } from "react"
import './try04-css-blend.scss'

export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <div className="grid">
                <div className="col">
                    <div className="note">
                        Blending in isolation (no blending with the background)
                    </div>
                    <div className="row isolate">
                        <div className="cell">
                            normal
                            <div className="container normal">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <defs>
                                            <linearGradient id="red">
                                                <stop offset="0" stop-color="hsl(0 100% 50%)" />
                                                <stop offset="100%" stop-color="hsl(0 0% 100%)" />
                                            </linearGradient>
                                            <linearGradient id="green">
                                                <stop offset="0" stop-color="hsl(120 100% 50%)" />
                                                <stop offset="100%" stop-color="hsl(120 0% 100%)" />
                                            </linearGradient>
                                            <linearGradient id="blue">
                                                <stop offset="0" stop-color="hsl(240 100% 50%)" />
                                                <stop offset="100%" stop-color="hsl(240 0% 100%)" />
                                            </linearGradient>
                                        </defs>
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            multiply
                            <div className="container multiply">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="itemy R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            darken
                            <div className="container darken">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            screen
                            <div className="container screen">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            lighten
                            <div className="container lighten">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            overlay
                            <div className="container overlay">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color-dodge
                            <div className="container color-dodge">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color-burn
                            <div className="container color-burn">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            hard-light
                            <div className="container hard-light">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            soft-light
                            <div className="container soft-light">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            difference
                            <div className="container difference">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            exclusion
                            <div className="container exclusion">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            hue
                            <div className="container hue">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            saturation
                            <div className="container saturation">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color
                            <div className="container color">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            luminosity
                            <div className="container luminosity">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            plus-darker
                            <div className="container plus-darker">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            plus-lighter
                            <div className="container plus-lighter">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="note">Blending globally (blend with the background)</div>
                    <div className="row">
                        <div className="cell">
                            normal
                            <div className="container normal">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            multiply
                            <div className="container multiply">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            darken
                            <div className="container darken">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            screen
                            <div className="container screen">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            lighten
                            <div className="container lighten">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            overlay
                            <div className="container overlay">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color-dodge
                            <div className="container color-dodge">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color-burn
                            <div className="container color-burn">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            hard-light
                            <div className="container hard-light">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            soft-light
                            <div className="container soft-light">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            difference
                            <div className="container difference">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            exclusion
                            <div className="container exclusion">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            hue
                            <div className="container hue">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            saturation
                            <div className="container saturation">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            color
                            <div className="container color">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            luminosity
                            <div className="container luminosity">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            plus-darker
                            <div className="container plus-darker">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="cell">
                            plus-lighter
                            <div className="container plus-lighter">
                                <div className="group">
                                    <div className="item firefox"></div>
                                    <svg className="item" viewBox="0 0 150 150">
                                        <ellipse className="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                        <ellipse className="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
