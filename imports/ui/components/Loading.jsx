import React from 'react';

export default class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.intervalHandler = null;
    }

    componentDidMount() {

        this.intervalHandler = setInterval(() => {
            switch (this.refs.etc.innerHTML.length) {
                case 1:
                    this.refs.etc.innerHTML = '..';
                    break;
                case 2:
                    this.refs.etc.innerHTML = '...';
                    break;
                default:
                    this.refs.etc.innerHTML = '.';
            }
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }
    
    render() {

        return (
            <div className="loading">
                <h1>Loading<span ref="etc">.</span></h1>
            </div>
        );
    }
}
