type props = {
    modalIsOpened:boolean
}

import styled from "styled-components";

export const Template = styled.div``;


export const PageContainer = styled.div`
max-width: 1000px;
margin: auto;

`;

export const PageTitle = styled.h1`
    font-size: 27px;
    text-align: center;

`;

export const PageBody = styled.div``;

export const ErrorMessage = styled.div`
    margin: 10px 0;
    background-color: #ffcaca;
    color: #000;
    border: 2px solid #f00;
    padding: 10px;
    border-radius: 10px;




`;

export const Modal = styled.div<props>`
    display: ${props=>(props.modalIsOpened ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0,0,0,0.4);
    
`;


