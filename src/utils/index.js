import { sha256 } from 'js-sha256';

export function paramTrans(obj) {
    let arr = Object.entries(obj).sort((pre,next)=>pre[0]>next[0]?1:-1)
    return arr.map(item=>item.join('=')).join('&')
}

export function shaParams(params) {
    return sha256(paramTrans(params))
}