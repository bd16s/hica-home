import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import SVGInline from "react-svg-inline"
import ReactLoading from 'react-loading'
import { setAlert } from '../actions'
import * as FontAwesome from 'react-icons/fa'
import './Mun.css';
import Profile from './Mun.json';
import Config from '../config.json';

class Mun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: {},
            formDisabled: false,
            formValueName: "",
            formValueId: "",
            formValuePhone: "",
            formValueEmail: "",
            formValueCaptcha: ""
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
    }

    scrollToRegistration = () => {
        window.scrollTo({
            top: this.registrationAnchorRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    onCaptchaClick = () => {
        this.setState({ captcha: {} })
        this.fetchCaptcha()
    }

    onFormSubmit = () => {
        const text = Profile[this.props.language];

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
                id: this.state.formValueId,
                phone: this.state.formValuePhone,
                email: this.state.formValueEmail,
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
                        formValueName: "",
                        formValueId: "",
                        formValuePhone: "",
                        formValueEmail: "",
                        formValueCaptcha: "",
                    })
                } else {
                    this.props.setAlert({ isOpen: true, color: 'danger', message: text.alert.failed })
                    this.setState({
                        formDisabled: false,
                        formValueCaptcha: ""
                    })
                }
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
    onIdInputChange = (event) => {
        this.setState({
            formValueId: event.target.value
        })
    }
    onPhoneInputChange = (event) => {
        this.setState({
            formValuePhone: event.target.value
        })
    }
    onEmailInputChange = (event) => {
        this.setState({
            formValueEmail: event.target.value
        })
    }
    onCaptchaInputChange = (event) => {
        this.setState({
            formValueCaptcha: event.target.value
        })
    }

    render() {
        const text = Profile[this.props.language];

        return (
            <div style={{ marginTop: '60.2px' }}>
                <Jumbotron fluid style={{ backgroundColor: Config.color.primary}}>
                    <Container>
                        <Row>
                            <Col sm='12' md='8'>
                                <h1 className="display-3 light-text">{text.jumbo.title}</h1>
                                <p className="lead light-text">{text.jumbo.intro}</p>
                                <hr className="my-2 jumbotron-divider" />
                                <p className='light-text'>{text.jumbo.intro2}</p>
                                <p className="lead">
                                    <Button color="primary" onClick={this.scrollToRegistration}>{text.jumbo.button}</Button>
                                </p>
                            </Col>
                            <Col md='4' className='d-none d-sm-none d-md-block'>
                                <img src={require('../assets/images/logo-un-white.png')} alt='un' style={{width:'100%'}} />
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <div ref={this.registrationAnchorRef} />
                <Container style={{ paddingBottom: '80px' }}>
                    <Form>
                        <Row form>
                            <Col sm='12' md='4' className='sub-section'>
                                <h2>{text.registration.title}</h2>
                                <FormGroup>
                                    <Label for="name">{text.registration.name}</Label>
                                    <Input type="text" name="name" id="name" value={this.state.formValueName} onChange={this.onNameInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="studentId">{text.registration.studentId}</Label>
                                    <Input type="text" name="studentId" id="studentId" value={this.state.formValueId} onChange={this.onIdInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="studentId">{text.registration.phone}</Label>
                                    <Input type="text" name="phone" id="phone" value={this.state.formValuePhone} onChange={this.onPhoneInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="emailAddress">{text.registration.email}</Label>
                                    <Input type="textarea" name="emailAddress" id="emailAddress" value={this.state.formValueEmail} onChange={this.onEmailInputChange} disabled={this.state.formDisabled} onKeyDown={this.onFormKeyDown} />
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
                                        {this.state.captcha.svg && <SVGInline svg={this.state.captcha.svg} onClick={ this.onCaptchaClick } style={{ cursor: 'pointer' }}/>}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button onClick={ this.onFormSubmit } disabled={ this.state.formDisabled}>{text.registration.submit}</Button>
                                    {this.state.formDisabled && <ReactLoading type={'cylon'} color={Config.color.primary} width={58} />}
                                </FormGroup>
                            </Col>
                            <Col md='1' className='sub-section d-none d-sm-none d-md-block'>
                                <div className="vl"></div>
                            </Col>
                            <Col sm='12' md='7' className='sub-section'>
                                <h2>{text.munIntro.title}</h2>
                                <p>{text.munIntro.p1}</p>
                                <p>{text.munIntro.p2}</p>
                                <h2>{text.hitmunIntro.title}</h2>
                                <p>{text.hitmunIntro.p1}</p>
                                <p onClick={() => window.open('http://today.hit.edu.cn/article/2018/11/23/61588', '_blank')} style={{ cursor: 'pointer', color: Config.color.primary }}>
                                    今日哈工新闻：大第十一届哈尔滨工业大学模拟联合国大会冬季会代表招募
                                </p>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <div style={{ backgroundColor: Config.color.primary}}>
                    <Container className='footer-section'>
                        <Row form>
                            <Col sm='12' md='8'>
                                <p className='light-text' style={{ fontSize: '12px', marginBottom: '0' }}>&copy; 2018 HIT International Communication Association (HICA).</p>
                                <p className='light-text' style={{ fontSize: '12px', marginBottom: '0' }}>HICA is a recognized student organization.</p>
                                <FontAwesome.FaGithub className='light-text' onClick={() => window.open('https://github.com/bd16s/hica-home', '_blank')} />
                            </Col>
                            <Col sm='12' md='4'>
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

Mun.propTypes = {
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
)(withRouter(Mun))
