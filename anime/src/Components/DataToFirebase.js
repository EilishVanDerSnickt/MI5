import React from 'react';
import Firebase from './FirebaseInit';

class DataToFirebase extends React.Component {
    constructor(props) {
        super(props);
    } // constructor

    render() {
        const that = this;
        console.log(that.props.data);
        return(<p>Weggeschreven naar firebase</p>);
    } // render
}

export default DataToFirebase;