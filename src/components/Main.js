import React from "react";
import styled from "styled-components";

const MainStyle = styled.main`
height:calc(100vh - 200px);
`

function Main({children}){
    return (
        <MainStyle>
            {children}
        </MainStyle>
    )
}

export default Main