import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class People extends React.Component {
    constructor() {
        super();
        this.state = {
            value : 0,
            value2 : "Halo, dunia!",
            peoplelist : [],
            url : "https://swapi.dev/api/people",
            nexturl : null,
            prevurl : null,
            page : 0,
            total : 0
        }
    };

    componentDidMount() {
        this.GetData(this.state.url, "Next");
    }

    
    // 
    GetData(url, mode) {
        console.log("GetData accessed");

        axios.get(url)
            .then((response) => {
                this.setState((state, props) => ({
                    peoplelist : response.data.results,
                    nexturl : response.data.next,
                    prevurl : response.data.previous,
                    total : response.data.count,
                    page : mode == "Prev" ? (this.state.page === 1 ? 1 : this.state.page - 1) : 
                        (this.state.page === Math.ceil(this.state.total / 10) ? Math.ceil(this.state.total) : this.state.page + 1)
                }));
                console.log("Current Page : " + this.state.page);
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });

            //console.log(this.state.peoplelist);
    };

    renderPersonRow(person, index) {     
        //let page = 1;//this.state.page;   
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{person.name}</td>
                <td>{person.height}</td>
                <td>{person.mass}</td>
                <td>{person.hair_color}</td>
                <td>{person.skin_color}</td>
            </tr>
        );
    };

    nextPage() {
        this.GetData(this.state.nexturl, "Next");
    }

    prevPage() {
        this.GetData(this.state.prevurl, "Prev");
    }

    render() {
        //console.log(this.state);
        let {value, ...value2} = this.state;
        let {peoplelist} = this.state;
        
        return (
            <div>
                <h1>{value2.value2}</h1>
                <div className="r-container">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Hair</th>
                            <th>Skin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peoplelist.count === 0 ? 
                            <tr><td colSpan="6">No Data</td></tr>
                            : this.state.peoplelist.map(this.renderPersonRow)}
                        </tbody>
                    </Table>

                    <button onClick={() => {this.prevPage()}}>Prev</button>
                    <button onClick={() => {this.nextPage()}}>Next</button>
                </div>
            </div>
        );
    }
}

export default People;