﻿import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import './Home.css';
import Profile from './Home.json';

const carouselItems = [
    {
        src: require('../assets/images/bg-un-hall.jpg'),
        altText: 'HITMUN 2018',
        key: 'un-hall'
    },
    {
        src: require('../assets/images/bg-panel-discussion.jpg'),
        altText: 'HITMUN 2018',
        key: 'panel-discussion'
    },
    {
        src: require('../assets/images/bg-model-un.jpg'),
        altText: 'HITMUN 2018',
        key: 'model-un'
    }
]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === carouselItems.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? carouselItems.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    onImageClick = () => {
        this.props.history.push('/mun');
    }

    render() {
        const { activeIndex } = this.state;
        const text = Profile[this.props.language];

        const slides = carouselItems.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.key}
                >
                    <img src={item.src} alt={item.altText} className='hica-home-carousel-image' onClick={this.onImageClick} />
                    <CarouselCaption captionText={text[item.key].text} captionHeader={text[item.key].caption} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                slide={false}
                pause={false}
                ride='carousel'
                interval={6000}
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={carouselItems} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

Home.propTypes = {
    language: PropTypes.string,
    history: PropTypes.object
};

const mapStateToProps = state => ({
    language: state.header.language
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Home))
