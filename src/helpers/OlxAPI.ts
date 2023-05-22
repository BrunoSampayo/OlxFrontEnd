export type CategoriesType ={
    img:string,
    name:string,
    slug:string,
    _id:string
}
export type stateListType ={
    _id:string,
    name:string
}
export type AdsType ={
    id: string
    title: string
    price: number
     priceNegotiable: boolean
    image: string
}

export type AdType={
    id: string
    title: string
    price: number
    priceNegotiable: boolean
    description: string
    dateCreated: string
    views: number
    category: adCategory
    userInfo: adUserInfo
    stateName: string
    images: string[]
    others: adOther[]   
}
type adCategory={
    _id: string
    name: string
    slug: string
}
type adUserInfo={
    name: string
    email: string
}
type adOther={
    id: string
    title: string
    price: number
    priceNegotiable: boolean
    image: string
}



import Cookies from 'js-cookie'
import qs from 'qs'
const BaseAPI ='http://alunos.b7web.com.br:501'
const apiFetchPost = async (endPoint:string,body:Record<string,unknown>)=>{
    if(!body.token){
        let token = Cookies.get('token')
        if(token){
            body.token = token
        }
    }
    const res = await fetch(BaseAPI+endPoint,{
        method:'POST',  
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    
    });
    console.log("teste")
    if(!res.ok){
        console.log('Erro conecção à API', res.status, res.statusText)
    }
    const json = await res.json()
    if(json.notallowed){
        window.location.href='/signin'
        return
    }
    return json
}
const apiFetchGet = async (endPoint:string,body?:Record<string,unknown>)=>{
    
    const res = await fetch(`${BaseAPI +endPoint}?${qs.stringify(body)}`);
    
    const json = await res.json()
    if(json.notallowed){
        window.location.href='/signin'
        return
    }
    return json
}


const OlxAPI = {
    login:async (email:string,password:string) =>{
        const json = await apiFetchPost(
            '/user/signin',
            {email,password}
        );
        return json
    },
    register:async(name:string,email:string,password:string,stateLoc:string)=>{
        const json = await apiFetchPost(
            '/user/signup',
            {name,email,password,state:stateLoc}
        );
        return json
    },
    getStates:async():Promise<stateListType[]>=>{
        const json = await apiFetchGet(
          '/states'  
        );
        return json.states

    },
    getCategories:async():Promise<CategoriesType[]>=>{
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories
    },
    getAds:async (options:Record<string,unknown>)=>{
        const json= await apiFetchGet(
            '/ad/list',
            options
        )
        return json
    },
    getAd:async (id:string|undefined,other=false)=>{
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json
    }

}

export default ()=> OlxAPI