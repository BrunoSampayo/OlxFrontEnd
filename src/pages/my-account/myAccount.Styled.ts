import styled from "styled-components";



export const PageArea = styled.div`
   

   
`;

export const UserData = styled.div`
      form{
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
    }
    .area{
        display: flex;
        align-items: center;
        padding: 15px;
        max-width: 500px;

        .area--title{
            width: 200px;
            text-align: right;
            padding-right: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .area--input{
            flex: 1;
            

            input{
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 4px;
                outline: 0;
                display: flex;
                transition: all ease .4s;
                &:focus{
                    border: 1px solid #333;
                }

            }
            input[type=checkbox]{
                width: auto;
            }
            button{
                background-color: #0089ff;
                border: 0;
                outline: 0;
                padding: 8px 12px;
                border-radius: 8px;
                color: #fff;
                font-size: 15px;
                cursor: pointer;
                transition: all ease .4s;

                &:hover{
                    background-color: #006fce;
                }
            }
        }
    }
    @media (max-width: 600px){
    form{
        .area{
            flex-direction: column;

            .area--title{
                width: 100%;
                text-align: left;
                margin-bottom: 10px;
            }
            .area--input{
                width: 100%;
                

                button{
                    width: 100%;
                    padding: 10px;
                }
            }
        }
    }
}


`;

export const UserAds = styled.div`

    margin-top: 50px;
    background-color: #fff;
    padding: 1px 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #999;
   
        
.ads{
    display: flex;
    gap: 10px;
}
.ad{
    width: 25%;
    
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #000;

    .adTitle{
        font-weight: bold;
        text-align: center;
        padding: 5px;

    }

    .adImage{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img{
            width: 78%;
        }
    }
    
    .adPrice{
        font-weight: bold;
        margin: 5px 0;
    }
    button{
        background-color: #00846f;
        border: 0;
        outline: 0;
        padding: 8px 10px;
        border-radius: 10px;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all ease .4s;

        &:hover{
            background-color: #006471;
        }
            }
}

@media (max-width: 600px){
    .ad{
        width: 50%;
        flex-wrap: wrap;
    }
}

`;

export const Modal = styled.div`
    
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0,0,0,0.4);
    
    
    
    

    .modalContent{
        width: 40%;
        height: auto;
        box-shadow: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        z-index: 9999;
        
        h3{
            
            margin-top: 5px;
            text-align: center;
        }
        
       .closeButton{
        display: flex;
        justify-content: flex-end;
        
        

        button{
            background-color: #f00;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            width: 26px;
            height: 26px;
            margin-right: 15px;
            margin-top: 8px;
            border-radius: 100%;
            font-weight: bold;
            font-size: 15px;
            color: #fff;
            
            text-shadow: 1px 1px 1px #000;
            cursor: pointer;
        }
       
       } 
    }

    form{
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
    }
    .area{
        display: flex;
        align-items: center;
        padding: 15px;
        max-width: 500px;

        .area--title{
            width: 200px;
            text-align: right;
            padding-right: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .currentModalAdImage{
            width: 10%;
            margin-right: 10px;

            img{
                width: 100%;
                box-shadow: 1px 1px 5px #000;
                 
                &:hover{
                    scale: 2;
                }
            }
        }
        .area--input{
            flex: 1;
            

            input{
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 4px;
                outline: 0;
                display: flex;
                transition: all ease .4s;
                &:focus{
                    border: 1px solid #333;
                }

            }
            input[type=checkbox]{
                width: auto;
            }
            button{
                background-color: #0089ff;
                border: 0;
                outline: 0;
                padding: 8px 12px;
                border-radius: 8px;
                color: #fff;
                font-size: 15px;
                cursor: pointer;
                transition: all ease .4s;

                &:hover{
                    background-color: #006fce;
                }
            }


          

        }
        
    }
    @media (max-width: 600px){

    .modalContent{
            width: 90%;
            
    }
    form{
        .area{
            flex-direction: column;

            .area--title{
                width: 100%;
                text-align: left;
                margin-bottom: 10px;
            }
            .area--input{
                width: 100%;
                

                button{
                    width: 100%;
                    padding: 10px;
                }
            }
        }
    }
}
`;