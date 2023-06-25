import styled from "styled-components";

export const PageArea = styled.div`
    form{
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
    }
    .area{
        display: flex;
        align-items: center;
        padding: 10px;
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