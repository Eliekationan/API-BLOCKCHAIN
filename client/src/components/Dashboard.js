import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Header from "./Header";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
    }
    render() {
        return (
            <div className="flex">
                <Header />
                <div className="menu colums row">
                    <div className="col-3">
                        Dashboard
                        <ul>
                            <li>
                                <span> cas positifs</span>
                            </li>
                            <li>
                                <span> despitage</span>
                            </li>
                            <li>
                                <span>Diff</span>
                            </li>
                        </ul>


                    </div>
                    <div className="col-3 colums">
                        ici tout ce que vous voulez
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;