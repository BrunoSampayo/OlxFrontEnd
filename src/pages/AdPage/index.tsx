import "react-slideshow-image/dist/styles.css";

import {useState, useEffect} from 'react';
import useApi from '../../helpers/OlxAPI';
import { AdType } from '../../helpers/OlxAPI';
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';


import { PageArea, Fake, OtherArea, BreadChumb } from "./AdPage.Styled";
import { PageContainer } from "../../components/MainComponents";
import { AdItem } from '../../components/partials/Aditem';
import { Link } from "react-router-dom";


export const AdPage = ()=>{
    const api = useApi();

    const {id} = useParams();

    const [loading, setLoagin] = useState(true);
    const [adInfo, setAdInfo] = useState<AdType>();
     
    useEffect (()=>{
        if(id !== undefined){
            const getAdInfo = async (id: string ) =>{
                const json =await api.getAd(id,true);
                setAdInfo(json);
                setLoagin(false)
            }
       
       
        getAdInfo(id)
        
        }
            
    },[])
    
    const formatDate = (date:string)=>{
        let cDate = new Date(date);
        let months =['janeiro, feveiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro','dezembro'];
        let cDay = cDate.getDate();
        let CMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[CMonth]} de ${cYear}`

    }

    return(
        <PageContainer>
           <BreadChumb>
                Você está aqui:
                <Link to='/'>Home</Link>
                /
                <Link to={`/ads?state=${adInfo?.stateName}`}>{adInfo?.stateName}</Link>
                /
                <Link to={`/ads?state=${adInfo?.stateName}&cat=${adInfo?.category.slug}`}>{adInfo?.category.name}</Link>
                / {adInfo?.title}

           </BreadChumb>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                       
                        <div className="adImage">
                        {loading &&<Fake height={300}/>}
                            {adInfo?.images &&
                                <Slide>
                                    {adInfo.images.map((img,k)=>(
                                        <div key={k} className="each-slide">
                                            <img src={img} alt=""  />
                                        </div>
                                    ))}
                                </Slide>
                            
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading &&<Fake height={30}/>}
                                {adInfo?.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo?.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                                
                            </div>
                            <div className="adDescription">
                                {loading &&<Fake height= {100}/>}
                                {adInfo?.description}
                                <hr />
                                {adInfo?.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading &&<Fake height={30}/>}
                        {adInfo?.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo?.priceNegotiable && adInfo?.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>
                    
                    {loading &&<Fake height={50}/>}
                    {adInfo?.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className='contactSellerLink'>Fale com o vendedor</a>
                            <div className=" createdBy box box--padding">
                                
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>

                            </div>
                        </>
                    }
                </div>

                
            </PageArea>
                <OtherArea>
                    {adInfo?.others && 
                        <>
                            <h2>Outras ofertas do vendedor</h2>
                            <div className="list">
                                {adInfo.others.map((item,k)=>(
                                    <AdItem key={k} props={item}/>
                                ))}
                            </div>
                        
                        </>
                    }
                </OtherArea>
        </PageContainer>
    )
}