import styled from "styled-components";

export const HeaderArea = styled.div`

    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

.container{
    max-width: 13 00px;
    margin: auto;
    display: flex;
}
a{
    text-decoration: none;
}
.logo{
    flex:1;
    display: flex;
    align-items: center;
    height: 60px;

    .logo-1,
    .logo-2,
    .logo-3{
        font-size: 27px;
        font-weight: bold;
    }
    .logo-1{color:#ff0000}
    .logo-2{color:#00ff00}
    .logo-3{color:#0000ff}
}

nav{
    padding: 10px 0;

    ul,li{
        margin:0;
        padding: 0;
        list-style: none;
    }
    ul{
        display: flex;
        align-items: center;
        height: 40px;
    }
    li{
        margin: 0 20px;

        a,button{
            color: #000;
            font-size: 14px;
            background: none;
            border: none;
            cursor: pointer;
            outline: 0;

            &:hover{
                color: #999;
            }
            &.button{
                background-color: #ff8100;
                border-radius: 4px;
                color: #fff;
                padding: 5px 10px;
            }
            &.button:hover{
                background-color: #E57706;
            }
        }
    }
}
`;