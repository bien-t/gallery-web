import React from "react";
import SignupForm from "./SignupForm";
import {
    Section,
    Container,
    TopBar,
    BottomBar,
} from './styles/Styles'
import {Redirect,useHistory} from 'react-router-dom'
import {useMutation } from '@apollo/client'

import { USER_CREATE } from '../gql/mutation'

function Signup() {
    const [formValues, setFormValues] = React.useState({})
    const [emailError, setEmailError] = React.useState({ message: '' })
    const [passwordError, setPasswordError] = React.useState({ message: '' })
    const [userError, setUserError] = React.useState([])
    const [userCreate, { loading, error }] = useMutation(USER_CREATE)
    const history = useHistory()

    const changeValue = (event) => {
        setUserError([])
        setFormValues(state => {
            state[event.target.name] = event.target.value
            checkPassword(state.password, state.confirmPassword)
            checkEmail(state.email, state.confirmEmail)
            return {
                ...state
            }
        })
    }
    const checkEmail = (email, confirmEmail) => {
        if (email !== confirmEmail) {
            setEmailError({ message: 'Email addresses are different' })
        } else {
            setEmailError({ message: '' })
        }
    }

    const checkPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setPasswordError({ message: 'Passwords are different' })
        } else {
            setPasswordError({ message: '' })
        }
    }
    const submitValues = async (event) => {
        event.preventDefault()
        const { data } = await userCreate({
            variables: {
                input: {
                    email: formValues.email,
                    confirmEmail: formValues.confirmEmail,
                    password: formValues.password,
                    confirmPassword: formValues.confirmPassword
                }
            }
        })
        setUserError(data.userCreate.errors)
        if (data.userCreate.user) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('id', data.userCreate.user._id);
            history.push('galleries')
        }
    }

    const disableButton = () => {
        if (emailError.message || passwordError.message) {
            return true
        }
    }

    if(localStorage.getItem('isLogged')){
        return <Redirect to="/galleries" />
    }
    return (
        <Section>
            <Container>
                <TopBar />
                <SignupForm submit={submitValues} changeValue={changeValue} errors={[emailError, passwordError, ...userError]} disable={disableButton} />
                <BottomBar />
            </Container>
        </Section>
    )
}

export default Signup