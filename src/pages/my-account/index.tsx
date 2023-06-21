import {useEffect, useState} from 'react';
import useApi, { CategoriesType, stateListType, userAds, userDataType } from '../../helpers/OlxAPI';
import { Modal, PageArea, UserAds, UserData } from "./myAccount.Styled";
import { ErrorMessage,  PageContainer, PageTitle } from "../../components/MainComponents";
import Cookies from "js-cookie";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Link } from 'react-router-dom';



export const MyAccount = ()=>{
    const api = useApi()

    const priceMask = createNumberMask({
        prefix:"R$ ",
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ userData, setUserData] = useState<userDataType>()
    const [stateLoc, setStateLoc] = useState('');
    const [stateList, setStateList] = useState <stateListType[]>([])
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')
    const [modalIsOpened, setIsopen] = useState(true)
    const [modalAdData, setModalAdData] = useState<userAds>()
    const [categories,setCategories] = useState<CategoriesType[]>([])

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
    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories()

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

  
    const handleModalClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLDivElement
        if(target.className.includes('modalContainer')){
            console.log(target.className)
            setIsopen(!modalIsOpened)
        }else{
            console.log(target.className)
            return
        }
    }

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
                            <div key={k} className="ad" >
                                <div className="adTitle">{i.title}</div>
                                
                                    <Link to={`/ad/${i.id}`} className='adImage'>
                                        <img src={`http://alunos.b7web.com.br:501/media/${i.images[0].url}`} alt="" />
                                    </Link>
                                
                                <div className="adPrice">{`R$ ${i.price}`}</div>
                                <button onClick={e=>{setIsopen(!modalIsOpened);setModalAdData(i)} }>Editar Anuncio</button>
                                
                            </div>
                            
                        ))}
                    </div>

               
                </UserAds>
              
              <Modal className='modalContainer' style={{display:`${modalIsOpened ? 'none' : 'flex'}`}} onClick={e=>handleModalClick(e)} >
                
                <div className="modalContent" >
                    <div className="closeButton">
                        <button onClick={e=>setIsopen(!modalIsOpened)}>X</button>
                    </div>
                    <h3>Editar Anuncio</h3>
                    <form action="">
                        <label className='area'>
                            <div className="area--title">Imagens </div>
                            <div className="currentModalAdImage">
                                <img src={`http://alunos.b7web.com.br:501/media/${modalAdData?.images[0].url}`} alt="" />
                            </div>
                            <div className="area--input">
                           <input 
                            type="file" 
                            disabled={disabled}
                            
                            multiple
                           
                           />
                        </div>
                        </label>
                        <label className="area">
                            <div className="area--title">status publicado</div>
                            <div className="area--input">
                                
                                <input 
                                checked={modalAdData?.status}
                                type='checkbox'/>
                           
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Titulo</div>
                            <div className="area--input">
                                <input 
                                    type="text" 
                                    disabled={disabled} 
                                    value={modalAdData?.title}
                                    //onChange={e=>setTitle(e.target.value)}
                                    required
                                />
                            </div>
                         </label>
                        <label className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                <select
                                disabled={disabled}
                                //onChange={e=>setCategory(e.target.value)}
                                required
                                >
                                    <option></option>
                                    //{categories && 
                                    categories.map((cat,k)=>(
                                        <option key={k} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Preço</div>
                            <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                //disabled={disabled || priceNegociable}
                                value={modalAdData?.price}
                                //onChange={e=>setPrice(e.target.value)}
                            />
                            </div>
                        </label>
                    <label className="area">
                        <div className="area--title">Preço Negociavel</div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disabled}
                                //checked={priceNegociable}
                                //onChange={()=>setPriceNegociable(!priceNegociable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea
                           disabled={disabled}
                            value={modalAdData?.description}
                            //onChange={e=>setDesc(e.target.value)}
                           >
                           </textarea>
                        </div>
                    </label>
                    
                
                       
                    
                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled}>Alterar Dados</button>
                            </div>
                        </label>
                    </form>
                </div>
              </Modal>
            </PageArea>
        </PageContainer>
    )
}