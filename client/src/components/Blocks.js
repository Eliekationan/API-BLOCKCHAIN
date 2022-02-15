import React, { Component } from 'react'

class Blocks extends Component {
    state = { blocks: [{ "timestamp": "01/01/2022", "hash": "fef7bf0af3d9f65d81fb69fcde6bd301b4ac6eccc96d0b78adaa3e32d03b08be", "data": "GenesisBlock", "lastHash": "0", "nonce": 0 }] };

    componentDidMount() {
        fetch('http://localhost:3000/api/blocks')
            .then(response => response.json()).then(json => this.setState({ blocks: json }));
    }
    render() {
        return (
            <div>
                <h3>Blocks</h3>
                <div>timestamp:20/01/2022</div>
                <div>hash:20/01/2022</div>
                <div>token id:20/01/2022</div>
            </div>
        );
    }
}
export default Blocks;