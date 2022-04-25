import axios from "axios";
import React, {useState, useEffect} from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

/*
const MAX_REQUESTS_COUNT = 5;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;
// create new axios instance
const api = axios.create({});
*/
/**
 * Axios Request Interceptor
 */
/*
 api.interceptors.request.use(function (config) {
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
          PENDING_REQUESTS++
          clearInterval(interval)
          resolve(config)
        } 
      }, INTERVAL_MS)
    })
  });
*/
  /**
 * Axios Response Interceptor
 */
/*
api.interceptors.response.use(function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.resolve(response)
  }, function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.reject(error)
  });
*/



function TestPage() {
    const [ url, setUrl ] = useState("https://swapi.dev/api/people");
}

class Selectpeople extends React.Component {
    constructor() {
        super();
        this.state = {
            
            vehiclelist : [],
            vehicleurl : "https://swapi.dev/api/vehicles",
            
            peoplelist : [],
            peopleurl : "https://swapi.dev/api/people",
            peoplenexturl : null,
            peopleprevurl : null,
            peoplepage : 0,
            peopletotal : 0,

            selectedpeople : [],
            vehiclecrews : [],
            selectedvehicle : ""
        }
    };

    

    componentDidMount() {
        this.GetDataPeople();
        this.GetDataVehicle();
    }

    GetDataVehicle() {
        axios.get("https://swapi.dev/api/vehicles",{
            params: {
              _limit: 5
             }
          })
        .then((response) => {
            console.log(response);
            this.processDataVehicle(response.data.results);
        })
        .catch((error) => {
            console.log(error);
        });

        for (var x = 2; x <= 4; x++) {
            axios.get("https://swapi.dev/api/vehicles/?page=" + x,{
                params: {
                _limit: 5
                }
            })
            .then((response) => {
                this.processDataVehicle(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    processDataVehicle(results) {
        
        var dumArr = this.state.vehiclelist;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            if (dumArr.indexOf(results[i].name) == -1) {
                dumArr.push(results[i].name);
            }
        }

        this.setState((state, props) => ({
            vehiclelist : dumArr.sort()
        }));
    }

    processDataPeople(results) {
        
        var dumArr = this.state.peoplelist;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            if (dumArr.indexOf(results[i].name) == -1) {
                dumArr.push(results[i].name);
            }
        }

        this.setState((state, props) => ({
            peoplelist : dumArr.sort()
        }));
    }
    
    // 
    GetDataPeople() {
        axios.get("https://swapi.dev/api/people",{
            params: {
              _limit: 5
             }
          })
        .then((response) => {
            console.log(response);
            this.processDataPeople(response.data.results);
        })
        .catch((error) => {
            console.log(error);
        });

        for (var x = 2; x <= 9; x++) {
            axios.get("https://swapi.dev/api/people/?page=" + x,{
                params: {
                _limit: 5
                }
            })
            .then((response) => {
                this.processDataPeople(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    renderSelectVehicle(vehicle, index) {
        return (
            <option value={vehicle.name}>{vehicle.name}</option>
        );
    }

    renderPersonRow(person, index) {     
        //let page = 1;//this.state.page;   
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{person}</td>
                <td><button onClick={() => {
                    var vhc = document.getElementById("vehicle").innerHTML;
                    console.log(person)
                    addToCrew(person, vhc);
                }}>Add to Crew</button></td>
            </tr>
        );
    };

    addToCrew(person, vhc) {
        alert(person + "," + vhc);
    }

    selectVehicle(vehicle) {
        console.log("select vehicle triggered");
        document.getElementById("vehicle").innerHTML = vehicle;
    }

    renderVehicleRow(vehicle, index) {
        return (
            <Dropdown.Item eventKey={index} onClick={() => { document.getElementById("vehicle").innerHTML = vehicle;}}>{vehicle}</Dropdown.Item>
        );
    }

    render() {
        
        let {peoplelist,vehiclelist} = this.state;
        
        return (
            <div>
                
                <div className="r-container">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peoplelist.count === 0 ? 
                            <tr><td colSpan="6">No Data</td></tr>
                            : peoplelist.map(this.renderPersonRow)}
                        </tbody>
                    </Table>
                </div>
                <div className="r-container">
                    <DropdownButton id="select-vehicle" variant="dark" title="Vehicle">
                        {vehiclelist.map(this.renderVehicleRow)}
                    </DropdownButton>
                    <span id="vehicle" className="r-dropdown-selected">&nbsp;</span>
                </div>
                <hr />
            </div>
        );
    }
}

export default Selectpeople;