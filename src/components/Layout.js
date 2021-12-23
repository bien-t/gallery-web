import React from 'react'
import styled from 'styled-components'
import SidePanel from './SidePanel'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const Container = styled.div`
display:flex;
flex-direction:column;
position:relative;
height:100%;
`

const Wrapper = styled.div`
display:flex;
@media(max-width:800px){
    flex-direction:column;
}

`
const Top = styled.div`
width:100%;
`




function Layout({ children }) {
    return (
        <>
        <Container>
            <Wrapper>
                <SidePanel />
                <Top>
                    <Header />
                    <Main>{children}</Main>
                </Top>
            </Wrapper>
            <Footer />
        </Container>
        </>
    )
}

export default Layout