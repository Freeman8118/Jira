import { useEffect } from "react"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = ( param?: Partial<Project> ) => {
  const {run, ...result} = useAsync<Project[]>()
  const client = useHttp()

  useEffect(()=>{
    run(client('projects',{data:cleanObject(param || {})}))
    
  /*     
    上面封装后的代码和该处效果相同
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`)
    .then(async response =>{
      if(response.ok){
        setList(await response.json())
      }
    }) 
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[param])
  return result
}