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
import './Mun.css';
import Profile from './Mun.json';

class Mun extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        console.log(this.myRef);
    }

    scrollToRegistration = () => {
        window.scrollTo({
            top: this.myRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    onFormSubmit = () => {

    }

    render() {
        const text = Profile[this.props.language];
        return (
            <div style={{ marginTop: '60.2px' }}>
                <Jumbotron fluid style={{ backgroundColor: '#53245C'}}>
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
                <div ref={this.myRef} />
                <Container style={{ paddingBottom: '80px'}}>
                    <Form>
                        <Row form>
                            <Col sm='12' md='4' className='sub-section'>
                                <h2>{text.registration.title}</h2>
                                <FormGroup>
                                    <Label for="name">{text.registration.name}</Label>
                                    <Input type="text" name="name" id="name" disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="studentId">{text.registration.studentId}</Label>
                                    <Input type="text" name="studentId" id="studentId" disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">{text.registration.phone}</Label>
                                    <Input type="text" name="phone" id="phone" disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="emailAddress">{text.registration.email}</Label>
                                    <Input type="email" name="emailAddress" id="emailAddress" disabled />
                                </FormGroup>
                                <Button onClick={this.onFormSubmit} disabled>{text.registration.submit}</Button>
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
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <div style={{ backgroundColor: '#53245C'}}>
                    <Container className='footer-section'>
                        <p className='light-text' style={{ fontSize: '12px', marginBottom: '0' }}>&copy; 2018 HIT International Communication Association (HICA).</p>
                        <p className='light-text' style={{ fontSize: '12px', marginBottom: '0' }}>HICA is a recognized student organization.</p>
                    </Container>
                </div>
            </div>
        );
    }
}

Mun.propTypes = {
    language: PropTypes.string
};

const mapStateToProps = state => ({
    language: state.header.language
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Mun))
