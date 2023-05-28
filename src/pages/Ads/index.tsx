
import {useState, useEffect} from 'react';
import useApi from '../../helpers/OlxAPI';
import { stateListType,CategoriesType,AdsType } from '../../helpers/OlxAPI';
import { PageArea} from "./Ads.Styled";
import {  PageContainer} from "../../components/MainComponents";
import { Link } from 'react-router-dom';
import { AdItem } from '../../components/partials/Aditem';



export const Ads = ()=>{
    const api = useApi()

    const [stateList, setStatelist] = useState<stateListType[]>([]);
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [adList, setAdList] = useState<AdsType[]>([])

    useEffect(()=>{

        const getStates = async () =>{
            const slist = await api.getStates();
            setStatelist(slist)
        }
        getStates()

    }
    , []);
    useEffect(()=>{

        const getCategories = async () =>{
            const cats = await api.getCategories();
            setCategories(cats)
        }
        getCategories()
        

    }
    , []);
    useEffect(()=>{
        const getRecentAds = async () =>{
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads)
        }
        getRecentAds()
        
    }
    , []);




    return(
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form action="" method="get">
                        <input type="text" name="q" />

                        <div className="filterName">Estado:</div>
                        <select name="state">
                            <option></option>
                            {stateList.map((i,k)=>(
                                <option value={i.name} key={k}>{i.name}</option>
                            ))}
                        </select>


                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i,k)=>(
                                <li key={k} className='categoryItem'>
                                    <img src={i.img} alt='' />
                                    <span>{i.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    ...
                </div>
            </PageArea>
        </PageContainer>
    )
       
}