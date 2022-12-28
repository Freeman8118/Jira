import { useEffect, useState } from "react"

//1.清空对象中的空白key和value，主要用于fetch发送请求的URL配置参数中
export const isFalsy = (value: unknown) => value === 0? false : !value
export const isVoid = (value :unknown) => value === undefined || null || ''? true : false



//在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string] :unknown}) =>{
  const result = {...object}
  Object.keys(result).forEach(key =>{
    const value = result[key]
    if(isVoid(value)){
      delete result[key]
    }
  })
  return result
}

//2.自定义hook，页面加载时的封装
export const useMount = (callback: ()=>void) =>{
  useEffect(() => {
    callback()
  },[])
}
//3.自定义防抖的hook
export const useDebounce = <V>(value: V,delay?: number) =>{
  const [debounceValue,setDebounceValue] = useState(value)
  useEffect(()=>{
    //每次在value变化之后，设置一个定时器
    const timeout = setTimeout(()=> setDebounceValue(value),delay)
    //每次在上一个useEffect处理完之后再运行
    return () => clearTimeout(timeout)
  },[value,delay])
  return debounceValue
}