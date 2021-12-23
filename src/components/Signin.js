import React from "react";
import {
    Section,
    Container,
    TopBar,
    BottomBar,
} from './styles/Styles'
import SigninForm from "./SigninForm";
import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../gql/mutation'
import {Redirect,useHistory} from 'react-router-dom'

function Signin() {
    const [formValues, setFormValues] = React.useState({})
    const [userError, setUserError] = React.useState([])
    const [userLogin, { loading, error }] = useMutation(USER_LOGIN)
    const history = useHistory()
    const changeValue = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const submitValues = async (event) => {
        event.preventDefault()
        const { data } = await userLogin({
            variables: {
                input: {
                    email: formValues.email,
                    password: formValues.password
                }
            }
        })
        
        setUserError(data.userLogin.errors)
        if (data.userLogin.errors.length === 0) {

            localStorage.setItem('isLogged', true);
            localStorage.setItem('id', data.userLogin.user._id);

            history.push('galleries')
            
        }
        
    }
    if(localStorage.getItem('isLogged')){
        return <Redirect to="/galleries" />
    }

    return (
        <Section>
            <Container>
                <TopBar />
                <SigninForm submit={submitValues} changeValue={changeValue} errors={userError} />
                <BottomBar />
            </Container>
        </Section>
    )
}

export default Signin