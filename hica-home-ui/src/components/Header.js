import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Alert
} from 'reactstrap';
import { setLanguage, setAlert } from '../actions'
import * as Material from 'react-icons/md'
import './Header.css'
import Profile from './Header.json';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            activePath: '/',
            isAlertOpen: true
        };

        this.props.history.listen((location) => {
            this.props.setAlert({isOpen: false})
            this.setState({
                activePath: location.pathname
            });
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    selectLanguage = lang => {
        this.props.setLanguage(lang);
    }

    navigateTo = path => {
        this.props.history.push(path);
    }

    onAlertDismiss = () => {
        this.props.setAlert({isOpen: false})
    }

    // Use ISO639-1 code for languages
    // #53245C purple
    // #FB9E45 orange
    render() {
        const text = Profile[this.props.language];
        return (
            <div>
                <Navbar style={{ backgroundColor: '#53245C' }} dark expand='md' fixed='top'>
                    <NavbarBrand className='clickable' onClick={() => this.navigateTo('/')} style={{ color: '#FB9E45' }}>
                        <img src={require('../assets/images/logo-hica-white.png')} height='32px' alt={'HICA'} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem active={this.state.activePath === '/mun'}>
                                <NavLink className='clickable' onClick={() => this.navigateTo('/mun')}>{text.mun}</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <Material.MdLanguage />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className='clickable' onClick={() => this.selectLanguage('zh')}>中文</DropdownItem>
                                    <DropdownItem className='clickable' onClick={() => this.selectLanguage('en')}>English</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className='alert-fixed'>
                    <Alert color={this.props.alert.color} isOpen={this.props.alert.isOpen} toggle={this.onAlertDismiss}>
                        {this.props.alert.message}
                    </Alert>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    history: PropTypes.object,
    language: PropTypes.string,
    alert: PropTypes.object
};

const mapStateToProps = state => ({
    language: state.header.language,
    alert: state.header.alert
})

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch(setLanguage(language)),
    setAlert: alert => dispatch(setAlert(alert))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))
