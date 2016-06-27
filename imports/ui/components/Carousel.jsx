import React from 'react';
import Flickity from 'flickity';

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
        }
    }

    componentDidMount() {
        const carousel = this.refs.carousel;

        this.flkty = new Flickity(carousel, this.flickityOptions);
        this.flkty.resize();
    }

    componentWillUnmount() {
        if (this.flkty) {
            this.flkty.destroy();
        }
    }

    render() {
        const { images } = this.props;

        return (
            <div ref="carousel" className='carousel'>
                { images.map(im => (
                    <div className="sliderBoxes">
                        <img key={im._id} src={im.url({store: 'medium'})} />
                    </div>
                )) }
            </div>
        );
    }
}

Carousel.propTypes = {
    images: React.PropTypes.array
};
