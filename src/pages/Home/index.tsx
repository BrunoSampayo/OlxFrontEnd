


import {useState, useEffect} from 'react';
import useApi from '../../helpers/OlxAPI';
import { stateListType,CategoriesType,AdsType } from '../../helpers/OlxAPI';
import { PageArea, SearchArea } from "./Home.Styled";
import {  PageContainer} from "../../components/MainComponents";
import { Link } from 'react-router-dom';
import { AdItem } from '../../components/partials/Aditem';



export const Home = ()=>{
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
                sort:'asc',
                limit:8
            });
            setAdList(json.ads)
        }
        getRecentAds()
        
    }
    , []);




    return(
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method='GET' action='/ads'>
                            <input type='text' name='q' placeholder='O que você procura?'/>
                            <select name="state" >
                                <option></option>
                                {stateList.map((item,index)=>(
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((item,index)=>(
                            <Link key={index} to={`/ads/cat=${item.slug}`} className='categoryItem'>
                                <img src={item.img} alt=''/>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                 <h2>Anuncios Recentes</h2>
                 <div className="list">
                    
                    {adList.map((item,key)=>(
                        
                        <AdItem key={key} props={item}/>
                    ))}
                 </div>
                 <Link to='/ads' className='seeAllLink'>Ver todos</Link>
                 <hr />
                 <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span>
                 </PageArea>
            </PageContainer>
   
        </>
    )
       
}