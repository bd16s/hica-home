import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';

import Footer from '../footer/Footer'
import { setAlert } from '../../actions'
import Config from '../../config.json'

import Form from './Form'
import Profile from './Mun.json'
import './Mun.css';

const unLogo = require('../../assets/images/logo-un-white.png')

class Mun extends Component {
    constructor(props) {
        super(props);
        this.formAnchorRef = React.createRef()
    }
    
    scrollToRegistration = () => {
        window.scrollTo({
            top: this.formAnchorRef.current.offsetTop,
            behavior: 'smooth'
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
                                <img src={unLogo} alt='un' style={{width:'100%'}} />
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <div ref={this.formAnchorRef} />
                <Container style={{ paddingBottom: '80px' }}>
                    <Row form>
                        <Col sm='12' md='4' className='sub-section'>
                            <h2>{text.registration.title}</h2>
                            <Form />
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
                </Container>
                <Footer />
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
