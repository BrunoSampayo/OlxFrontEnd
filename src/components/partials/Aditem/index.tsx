type propsType={
    props:AdsType
}

import { Item } from "./Aditem.Styled"
import { AdsType } from "../../../helpers/OlxAPI"
import { Link } from "react-router-dom"


export const AdItem = ({props}:propsType)=>{
    let price='';

    if(props.priceNegotiable){
        price= "Preço Negociável";
    }else{
        price = `R$ ${props.price}`
    }
   
    return(
        <Item className="aditem">
            <Link to={`/ad/${props.id}`}>
                <div className="itemImage">
                    <img src={props.image} alt="" />
                </div>
                <div className="itemName">{props.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>

        </Item>
    )
}