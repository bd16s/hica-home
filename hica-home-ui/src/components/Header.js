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
    DropdownItem
} from 'reactstrap';
import { setLanguage } from '../actions'
import * as FontAwesome from 'react-icons/fa'
import * as Material from 'react-icons/md'
import './Header.css'
import Profile from './Header.json';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            activePath: '/'
        };

        this.props.history.listen((location) => {
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

    // Use ISO639-1 code for languages
    // #53245C purple
    // #FB9E45 orange
    render() {
        const text = Profile[this.props.language];
        return (
            <div>
                <Navbar style={{ backgroundColor: '#53245C', opacity: '0.9' }} dark expand='md' fixed='top'>
                    <NavbarBrand className='clickable' onClick={() => this.navigateTo('/')} style={{ color: '#FB9E45' }}>
                        <img src={require('../assets/images/logo-hica-white.png')} height='40px' alt={'HICA'} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem active={this.state.activePath === '/mun'}>
                                <NavLink className='clickable' onClick={() => this.navigateTo('/mun')}>{text.mun}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='clickable' onClick={() => window.open('https://github.com/bd16s/hica-home', '_blank')}><FontAwesome.FaGithub /></NavLink>
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
            </div>
        );
    }
}

Header.propTypes = {
    language: PropTypes.string,
    history: PropTypes.object
};

const mapStateToProps = state => ({
    language: state.header.language
})

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch(setLanguage(language))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))
