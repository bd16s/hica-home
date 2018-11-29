import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    UncontrolledTooltip
} from 'reactstrap'
import SVGInline from 'react-svg-inline'
import ReactLoading from 'react-loading'

import { setAlert } from '../../actions'
import Config from '../../config.json'

import Profile from './Form.json'
import './Form.css'

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: {},
            formDisabled: false,
            formValueName: '',
            formValueSchool: '',
            formValueContact: '',
            formValueNotes: '',
            formValueCaptcha: ''
        }
        this.registrationAnchorRef = React.createRef()
    }

    componentDidMount() {
        this.fetchCaptcha()
    }

    fetchCaptcha = () => {
        fetch('/api/captcha')
            .then(resp => resp.json())
            .then(json => {
                this.setState({ captcha: json })
            })
            .catch(e => console.error(e))
    }

    onCaptchaClick = () => {
        this.setState({ captcha: {} })
        this.fetchCaptcha()
    }

    onFormSubmit = () => {
        const text = Profile[this.props.language]

        this.setState({
            formDisabled: true
        })

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.formValueName,
                school: this.state.formValueSchool,
                contact: this.state.formValueContact,
                notes: this.state.formValueNotes,
                captchaInput: this.state.formValueCaptcha,
                captchaSecret: this.state.captcha.secret
            })
        })
            .then(res => res.json())
            .then(json => {
                this.fetchCaptcha()
                if (json.isSuccess) {
                    this.props.setAlert({ isOpen: true, color: 'success', message: text.alert.success })
                    this.setState({
                        formDisabled: false,
                        formValueName: '',
                        formValueSchool: '',
                        formValueContact: '',
                        formValueNotes: '',
                        formValueCaptcha: '',
                    })
                } else {
                    this.props.setAlert({ isOpen: true, color: 'danger', message: text.alert.failed })
                    this.setState({
                        formDisabled: false,
                        formValueCaptcha: ''
                    })
                }
            })
            .catch(e => {
                console.error(e)
                this.props.setAlert({ isOpen: true, color: 'danger', message: text.alert.failed })
                this.setState({
                    formDisabled: false,
                    formValueCaptcha: ''
                })
            })
    }

    onFormKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onFormSubmit()
        }
    }

    onNameInputChange = (event) => {
        this.setState({
            formValueName: event.target.value
        })
    }

    onSchoolInputChange = (event) => {
        this.setState({
            formValueSchool: event.target.value
        })
    }

    onContactInputChange = (event) => {
        this.setState({
            formValueContact: event.target.value
        })
    }

    onNotesInputChange = (event) => {
        this.setState({
            formValueNotes: event.target.value
        })
    }

    onCaptchaInputChange = (event) => {
        this.setState({
            formValueCaptcha: event.target.value
        })
    }

    render() {
        const text = Profile[this.props.language]

        return (
            <Form>
                <FormGroup>
                    <Label for="name">{text.registration.name}</Label>
                    <Input type="text" name="name" id="name" value={this.state.formValueName} onChange={this.onNameInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                </FormGroup>
                <FormGroup>
                    <Label for="school">{text.registration.school}</Label>
                    <Input type="text" name="school" id="school" value={this.state.formValueSchool} onChange={this.onSchoolInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                </FormGroup>
                <FormGroup>
                    <Label for="contact">{text.registration.contact}</Label>
                    <Input type="text" name="contact" id="contact" value={this.state.formValueContact} onChange={this.onContactInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">{text.registration.notes}</Label>
                    <Input type="textarea" name="notes" id="notes" value={this.state.formValueNotes} onChange={this.onNotesInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                </FormGroup>
                <FormGroup>
                    <Label for="captcha">{text.registration.captcha}</Label>
                    <Input type="text" name="captcha" id="captcha" value={this.state.formValueCaptcha} onChange={this.onCaptchaInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                    <div style={{ paddingTop: '16px' }}>
                        {!this.state.captcha.svg &&
                            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <ReactLoading type={'spin'} color={Config.color.primary} height={30} width={30} />
                            </div>
                        }
                        {this.state.captcha.svg &&
                            <SVGInline svg={this.state.captcha.svg} onClick={this.onCaptchaClick} style={{ cursor: 'pointer' }} id='captcha-svg'/>
                        }
                        {this.state.captcha.svg &&
                            <UncontrolledTooltip placement='right' target='captcha-svg'>
                            {text.registration.captchaTip}
                            </UncontrolledTooltip>
                        }
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.onFormSubmit} disabled={this.state.formDisabled}>{text.registration.submit}</Button>
                    {this.state.formDisabled && <ReactLoading type={'cylon'} color={Config.color.primary} width={58} />}
                </FormGroup>
            </Form>
        )
    }
}

ContactForm.propTypes = {
    language: PropTypes.string,
    setAlert: PropTypes.func
};

const mapStateToProps = state => ({
    language: state.header.language
})

const mapDispatchToProps = dispatch => ({
    setAlert: alert => dispatch(setAlert(alert))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContactForm))
