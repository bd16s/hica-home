import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './Mun.css';
import { withRouter } from 'react-router-dom'

class Mun extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        console.log(this.myRef);
    }

    onClick2 = () => {
        console.log(this.myRef.current.offsetTop);
        window.scrollTo({
            top: this.myRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    onFormSubmit = () => {

    }

    render() {
        return (
            <div style={{ marginTop: '60.2px' }}>
                <Jumbotron fluid style={{ backgroundColor: '#53245C'}}>
                    <Container>
                        <Row>
                            <Col sm='12' md='8'>
                                <h1 className="display-3 light-text">Welcome to HITMUN!</h1>
                                <p className="lead light-text">
                                    With extensive exercise in research, public speaking, and teamwork, Model UN helps you build confidence, leadership and diplomatic skills. 
                          It is your chance to dream, travel, meet friends and gain lifetime experiences through HITMUN.
                                </p>
                                <hr className="my-2 jumbotron-divider" />
                                <p className='light-text'>
                                    Harbin Institute of Technoloty Model United Nations
                                </p>
                                <p className="lead">
                                    <Button color="primary" onClick={this.onClick2}>Register Now</Button>
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
                                <h2>Registration</h2>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="studentId">Student ID #</Label>
                                    <Input type="text" name="studentId" id="studentId" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Phone #</Label>
                                    <Input type="text" name="phone" id="phone"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="emailAddress">Email</Label>
                                    <Input type="email" name="emailAddress" id="emailAddress" />
                                </FormGroup>
                                <Button onClick={this.onFormSubmit}>Submit</Button>
                            </Col>
                            <Col md='1' className='sub-section d-none d-sm-none d-md-block'>
                                <div className="vl"></div>
                            </Col>
                            <Col sm='12' md='7' className='sub-section'>
                                <h2>What is MUN?</h2>
                                <p>
                                    Model United Nations, also known as Model UN or MUN, is an educational simulation and/or academic activity in which students can learn about diplomacy, international relations, and the United Nations. 
                                    MUN involves and teaches participants speaking, debating, and writing skills, in addition to critical thinking, teamwork, and leadership abilities.
                                    Usually an extracurricular activity, some schools also offer Model UN as a class. 
                                    It is meant to engage students and allow them to develop deeper understanding into current world issues.
                                </p>
                                <p>
                                    Participants in Model United Nations conferences, known as delegates, are placed in committees and assigned countries to represent, or occasionally other organizations or political figures, where they represent members of that body. 
                                    They are presented with their assignments in advance, along with a topic or topics that their committee will discuss. 
                                    Delegates conduct research before conferences and formulate positions that they will then debate with their fellow delegates in the committee, staying true to the actual position of the member they represent. 
                                    At the end of a conference, the best-performing delegates in each committee, as well as delegations, are sometimes recognized with awards.
                                </p>
                                <h2>HITMUN</h2>
                                <p>
                                    MUN was brought into Harbin Institute of Technology since 2009.
                                </p>
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

export default withRouter(Mun);
