import { range } from 'lodash-es'
import { OpenCC } from 'opencc'
// const { OpenCC } = OpenCC_
async function main() {
    const converter: OpenCC = new OpenCC('s2t.jso')

    console.time('convert')
    const results = await Promise.all(range(100000).map(() => converter.convertPromise('汉字')))
    console.timeEnd('convert')
    // console.log(results)
}
main()
