import {useEffect, useState} from 'react';
import useApi, { stateListType, userDataType } from '../../helpers/OlxAPI';
import { PageArea, UserAds, UserData } from "./myAccount.Styled";
import { ErrorMessage, Modal, PageContainer, PageTitle } from "../../components/MainComponents";
import Cookies from "js-cookie";
import  createNumberMask  from 'text-mask-addons/dist/createNumberMask';
import { Link } from 'react-router-dom';



export const MyAccount = ()=>{
    const api = useApi()


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ userData, setUserData] = useState<userDataType>()
    const [stateLoc, setStateLoc] = useState('');
    const [stateList, setStateList] = useState <stateListType[]>([])
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')
    const [modalIsOpened, setIsopen] = useState(true)

    useEffect(()=>{
        const getuserData = async()=>{
            let token = Cookies.get('token');
            const userData = await api.getUserData(token)
            setUserData(userData)
            console.log(userData)
        }
        getuserData()
    },[])
    
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

        const json = await api.login(email,password)
        
        if(json.error){
            setError(json.error)
            setDisabled(false)
            
            
        }
    }

    const priceMask = createNumberMask({
        prefix:"R$ ",
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    return(
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
            <PageArea>
                <UserData>
                
                    <form action="">
                    <h3>Dados:</h3>
                
                        <label className="area">
                                <div className="area--title">Email</div>
                                <div className="area--input">
                                    <input 
                                        type="state" 
                                        disabled={disabled} 
                                        value={userData?.email}
                                        onChange={e=>setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Estado</div>
                            <div className="area--input">
                            <select required  value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                <option   ></option>
                            {stateList.map((item, index)=>(
                                        <option value={item._id} key={index}>{item.name}</option>
                                    ))
                            }  
                            </select>
                            </div>
                        </label>
                        <label className="area"> 
                            <div className="area--title">Alterar Senha</div>
                            <div className="area--input">
                                <input 
                                    type="password" 
                                    disabled={disabled} 
                                    placeholder='***********'
                                    onChange={e=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled}>Alterar Dados</button>
                            </div>
                        </label>
                    </form>
                </UserData>

                
                <UserAds>
                <h3>Anuncios Usuario</h3>
                    <div className="ads">
                        {userData?.ads.map((i,k)=>(
                            <div className="ad" >
                                <div className="adTitle">{i.title}</div>
                                
                                    <Link to={`/ad/${i.id}`} className='adImage'>
                                        <img src={`http://alunos.b7web.com.br:501/media/${i.images[0].url}`} alt="" />
                                    </Link>
                                
                                <div className="adPrice">{`R$ ${i.price}`}</div>
                                <button onClick={e=>setIsopen(!modalIsOpened)}>Editar Anuncio</button>
                                
                            </div>
                            
                        ))}
                    </div>

               
                </UserAds>
              
              <Modal modalIsOpened={modalIsOpened} onClick={e=>e.target==this?console.log('teste1'):console.log('teste2')}>
                
                <div className="modalContent" onClick={(e)=>e.preventDefault()}>
                    ffj
                </div>
              </Modal>
            </PageArea>
        </PageContainer>
    )
}