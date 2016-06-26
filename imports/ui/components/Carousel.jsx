import React from 'react';
import Flickity from 'react-flickity';

var flickityOptions = {
    initialIndex: 0,
    cellSelector: '.sliderBoxes',
    accessibility: true,
    pageDots: true,
    wrapAround: true,
    autoPlay: 3000 // default false
};

export default class Carousel extends React.Component {

    constructor(props) {
        super(props);

        this.flickityOptions = {
            initialIndex: 0,
            cellSelector: '.sliderBoxes',
            accessibility: true,
            pageDots: true,
            wrapAround: true,
            autoPlay: 3000 // default false
        };
    }

    render() {

        const { images } = this.props;

        console.log(images);
        return (
            <Flickity
                className={ 'carousel' }
                elementType={ 'div' }
                options={ this.flickityOptions }
                disableImagesLoaded={ false }
            >
                { images.map(im => (
                    <div className="sliderBoxes">
                        <img src={im.url({store: 'medium'})} />
                    </div>
                )) }
                <div className="sliderBoxes"></div>
                <div className="sliderBoxes"></div>
                <div className="sliderBoxes"></div>
            </Flickity>
        );
    }
}

Carousel.propTypes = {
    images: React.PropTypes.array
};