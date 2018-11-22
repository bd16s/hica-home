import React, { Component } from 'react';
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
import { connect } from 'react-redux'
import { setLanguage } from '../actions'
import * as FontAwesome from 'react-icons/fa'
import * as Material from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
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
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className='clickable' onClick={() => this.navigateTo('/')}>HICA</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className='clickable' onClick={() => this.navigateTo('/mun')}>HITMUN2018</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='clickable' onClick={() => window.open("https://github.com/bd16s/hica-home", "_blank")}><FontAwesome.FaGithub /></NavLink>
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch(setLanguage(language))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))
