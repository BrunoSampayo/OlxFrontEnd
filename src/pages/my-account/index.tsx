import {MutableRefObject, useEffect, useRef, useState} from 'react';
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

    const [ userData, setUserData] = useState<userDataType>()
    
    const [name,setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [stateLoc, setStateLoc] = useState('');

    
    const [stateList, setStateList] = useState <stateListType[]>([])
    const [disabled, setDisabled] = useState(false);
    const [categories,setCategories] = useState<CategoriesType[]>([])

    const [modalAdData, setModalAdData] = useState<userAds>()
    const [modalIsOpened, setIsopen] = useState(true)

    const [status, setStatus] = useState(true)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState<boolean|undefined>(modalAdData?.priceNegotiable)
    const [description, setDescription] = useState<string>(' ')
    const [images,setImages] = useState('')
    const [img,setImg]=useState([])
    
    const [error, setError] = useState('')
    
    
    

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
        setError('')
        let token = Cookies.get('token');

        const json:any = await api.changeUserData(token,name,email,stateLoc,password)
        
        if(json.error){
            setError(json.error)
            setDisabled(false) 
        }
        setDisabled(false)
    }

    const adChangeHandleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        let token = Cookies.get('token');

        

            
            if(modalAdData){
                const json = await api.changeAd(modalAdData.id,token,status,title,category,price,priceNegotiable,description,images,img);
            }
       

           // if(!json.error){
               // history(`/ad/${json.id}`)
              //  return
            //}else{
                // setError(json.error)
            //}
        //}else{
          //  setError(errors.join("\n"));
        //}
        setDisabled(false);
       
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
                
                    <form action="" onSubmit={handleSubmit}>
                    <h3>Dados:</h3>
                        <label className="area">
                                <div className="area--title">Nome</div>
                                <div className="area--input">
                                    <input 
                                        type="text" 
                                        disabled={disabled} 
                                        placeholder={userData?.name}
                                        value={name}
                                        onChange={e=>setName(e.target.value)}
                                        
                                    />
                                </div>
                        </label>
                        <label className="area">
                                <div className="area--title">Email</div>
                                <div className="area--input">
                                    <input 
                                        type="text" 
                                        disabled={disabled} 
                                        value={email}
                                        placeholder={userData?.email}
                                        onChange={e=>setEmail(e.target.value)}
                                        
                                    />
                                </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Estado</div>
                            <div className="area--input">
                            <select   value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                <option   ></option>
                            {stateList.map((item, index)=>(
                                        <option value={item.name} key={index}>{item.name}</option>
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
                                    onChange={e=>setPassword(e.target.value)}
                                    
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
                    <form action="" onSubmit={adChangeHandleSubmit}>
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
                                
                                onChange={e=>setStatus(!modalAdData?.status)}
                                type='checkbox'/>
                           
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Titulo</div>
                            <div className="area--input">
                                <input 
                                    type="text" 
                                    disabled={disabled} 
                                    placeholder={modalAdData?.title}
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                    
                                />
                            </div>
                         </label>
                        <label className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                
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
                                placeholder={`R$ ${modalAdData?.price}`}
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                            </div>
                        </label>
                    <label className="area">
                        <div className="area--title">Preço Negociavel</div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disabled}
                                checked={modalAdData?.priceNegotiable}
                                onChange={()=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea
                           disabled={disabled}
                            placeholder={modalAdData?.description}
                            value={description}
                            onChange={e=>setDescription(e.target.value)}
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