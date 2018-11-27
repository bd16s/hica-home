import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import * as FontAwesome from 'react-icons/fa'

import Config from '../../config.json';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: Config.color.primary}}>
                <Container className='footer-section'>
                    <Row form>
                        <Col sm='12' md='8'>
                            <p className='footer-text'>&copy; 2018 HIT International Communication Association (HICA).</p>
                            <p className='footer-text'>HICA is a recognized student organization.</p>
                            <FontAwesome.FaGithub className='footer-text' onClick={() => window.open('https://github.com/bd16s/hica-home', '_blank')} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Footer.propTypes = {
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
)(withRouter(Footer))
