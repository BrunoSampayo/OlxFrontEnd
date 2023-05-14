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
    const json = await res.json()
    if(json.notallowed){
        window.location.href='/signin'
        return
    }
    return json
}
const apiFetchGet = async (endPoint:string,body:Record<string,unknown>)=>{
    if(!body.token){
        let token = Cookies.get('token')
        if(token){
            body.token = token
        }
    }
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
    }
}

export default ()=> OlxAPI