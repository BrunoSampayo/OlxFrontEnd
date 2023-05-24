import {useEffect, useRef, useState} from 'react';
import useApi from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { PageArea } from "./AddAd.Styled";
import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponents";
import { MutableRefObject } from 'react';
import { CategoriesType } from '../../helpers/OlxAPI';
import {  useNavigate } from 'react-router-dom';


export const AddAd = ()=>{
    const api = useApi()
    const fileField: MutableRefObject<HTMLInputElement | undefined > = useRef()
    const history = useNavigate()

    const [categories,setCategories] = useState<CategoriesType[]>([])

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNegociable, setPriceNegociable] = useState(false)
    const [desc, setDesc] = useState('')

   
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')

    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories()

    },[])

   
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');

        let errors =[]
        if(!title.trim()){
            errors.push('Sem Titulos');
        }
        if(!category){
            errors.push('Sem Categoria');
        }
        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title',title);
            fData.append('price',price);
            fData.append("priceneg", priceNegociable.toString());
            fData.append("desc", desc);
            fData.append('cat', category)
            
            

            if(fileField.current){
                if(fileField.current.files){
                    if(fileField.current.files.length > 0){
                        for (let i = 0; i<fileField.current.files.length; i++){
                            fData.append('img', fileField.current.files[i])
                            console.log('foi?')
                        }
                    }
                }
            }

            
            
            const json = await api.addAd(fData);

            if(!json.error){
                history(`/ad/${json.id}`)
                return
            }else{
                setError(json.error)
            }
        }else{
            setError(errors.join("\n"));
        }
        setDisabled(false);
       
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
            <PageTitle>Postar um anuncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit} >
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                            disabled={disabled}
                            onChange={e=>setCategory(e.target.value)}
                            required
                            >
                                <option></option>
                                {categories && 
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
                           disabled={disabled || priceNegociable}
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
                                checked={priceNegociable}
                                onChange={()=>setPriceNegociable(!priceNegociable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea
                           disabled={disabled}
                           value={desc}
                           onChange={e=>setDesc(e.target.value)}
                           >
                           </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                           <input 
                            type="file" 
                            disabled={disabled}
                            ref={fileField}
                            multiple
                           
                           
                           
                           />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar anuncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}