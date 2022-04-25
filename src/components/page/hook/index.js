import axios from "axios";
import React, {useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Hook() {

    const [url, setUrl] = useState("https://swapi.dev/api/people");
    const [peoplelist, setPeoplelist] = useState([]);
    const [nexturl, setNexturl] = useState(null);
    const [prevurl, setPrevurl] = useState(null);

    const GetData = (url) => {

        axios.get(url)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    const peoplelist = response.data.results;
                    const nexturl = response.data.next;
                    const prevurl = response.data.previous;
                    setNexturl(nexturl);
                    setPrevurl(prevurl);
                    setPeoplelist(peoplelist); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        GetData(url);
    }, [url]);

      
    return (
        <div>
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
                        : peoplelist.map((person, index) => {     
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
                        })}
                    </tbody>
                </Table>

                <button onClick={() => {setUrl(prevurl)}}>Prev</button>
                <button onClick={() => {setUrl(nexturl)}}>Next</button>
            </div>
        </div>
    );
}

export default Hook;