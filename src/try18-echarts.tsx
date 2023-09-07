import { useEffect, useRef, useState } from "react"
import * as echarts from 'echarts'
import clsx from "clsx"
export default function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (refChart.current) {
            const myChart = echarts.init(refChart.current, 'dark')
            myChart.setOption({
                title: {
                    text: 'Accumulated Waterfall Chart'
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    },
                    // formatter: function (params: any) {
                    //     let tar
                    //     if (params[1] && params[1].value !== '-') {
                    //         tar = params[1]
                    //     } else {
                    //         tar = params[2]
                    //     }
                    //     return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
                    // }
                },
                legend: {
                    data: ['Expenses', 'Income']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'category',
                    data: (function () {
                        let list = []
                        for (let i = 1; i <= 11; i++) {
                            list.push('Nov ' + i)
                        }
                        return list
                    })()
                },
                xAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Placeholder',
                        type: 'bar',
                        stack: 'Total',
                        silent: true,
                        itemStyle: {
                            borderColor: 'transparent',
                            color: 'transparent'
                        },
                        emphasis: {
                            itemStyle: {
                                borderColor: 'transparent',
                                color: 'transparent'
                            }
                        },
                        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
                    },
                    {
                        name: 'Income',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
                    },
                    {
                        name: 'Expenses',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        data: [100, '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                    },
                    {
                        name: 'Expenses78',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        data: [200, '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                    },
                    {
                        name: 'Expenses8',
                        type: 'bar',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        data: [300, '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                    },
                ]
            }

            )
        }
    }, [])

    const refChart = useRef<HTMLDivElement>(null)
    return (
        <div>
            234
            <div id="mychart" ref={ refChart } className={ clsx(
                'w-1/2 h-96',
            ) }>wef</div>
            erg
        </div>
    )
}
