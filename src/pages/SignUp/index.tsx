import {useState, useEffect} from 'react';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';
import { PageArea } from "./SignUp.Styled";
import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents";
import { stateListType } from '../../helpers/OlxAPI';


export const SignUp = ()=>{
    const api = useApi()

    const [name,setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState <stateListType[]>([])

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')

    useEffect(()=>{
        const getStates = async () =>{
            const slist = await api.getStates()
            setStateList(slist)
            console.log(stateList)
        }
        getStates();
    },[])


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setDisabled(true)
        setError('')

        if(password !== confirmPassword){
            setError('Senhas nao são iguais')
            setDisabled(false)
            return;
        }

        const json = await api.register(name,email,password,stateLoc)

        if(json.error){
            setError(json.error)
        }else{
            doLogin(json.token)
            window.location.href='/'

        }
    }


    return(
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit} >
                <label className="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                           <select required value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                            <option ></option>
                           {stateList.map((item, index)=>(
                                    <option value={item._id} key={index}>{item.name}</option>
                                ))}  
                           </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled} 
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type="password"
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                   
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}