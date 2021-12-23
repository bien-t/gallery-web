import React from "react";
import styled from "styled-components";
import { colors } from './styles/Variables'
import { Link } from 'react-router-dom'

const PathContainer = styled.div`
border-bottom: 3px solid ${colors.color2};
padding-left:15px;
display:flex;
flex-wrap:wrap;
 a {
     text-decoration:none;
     color:${colors.fontMain};
     font-weight:bold;
     &:hover{
         color:${colors.white}
     }
 }
`

function Path({ path, id }) {
    path = path.split('/')
    id = id.split('/')
    return (
        <PathContainer>Current location: {
            path.map((path, index) => {
                return <Link key={`path-${index}`} to={`/galleries/${id[index]}`}>{path}/</Link>
            })
        }
        </PathContainer>
    )

}

export default Path