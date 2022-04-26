import axios from "axios";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import CrewList from "../../atoms/crewlist";

class Selectpeople extends React.Component {
    constructor() {
        super();
        this.state = {
            
            vehiclelist : [],
            vehicleurl : "https://swapi.dev/api/vehicles",
            
            peoplelist : [],
            peopleurl : "https://swapi.dev/api/people",

            vehiclecrews : [],
            selectedvehicle : "",
            selectedperson : ""
        }
    };

    

    componentDidMount() {
        this.GetDataPeople();
        this.GetDataVehicle();
    }

    GetDataVehicle() {
        for (var x = 1; x <= 4; x++) {
            axios.get("https://swapi.dev/api/vehicles/?page=" + x,{
                params: {
                _limit: 1
                }
            })
            .then((response) => {
                this.processDataVehicle(response);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    processDataVehicle(response) {
        let page = parseInt(response.request.responseURL.replace("https://swapi.dev/api/vehicles/?page=","").replace("&_limit=1",""));
        var dumArr = this.state.vehiclelist;
        console.log(response);
        for (var i = 0; i < response.data.results.length; i++) {
            let idx = ((page-1) * 10) + i + 1;
            let pidx = "V" + (idx+"").padStart(4, "0");
            if (dumArr.indexOf(pidx + " - "  + response.data.results[i].name) === -1) {
                dumArr.push(pidx + " - "  + response.data.results[i].name);
            }
        }

        this.setState((state, props) => ({
            vehiclelist : dumArr.sort()
        }));
    }

    processDataPeople(response) {

        let page = parseInt(response.request.responseURL.replace("https://swapi.dev/api/people/?page=","").replace("&_limit=1",""));
        var dumArr = this.state.peoplelist;
        console.log(response.data.results);

        for (var i = 0; i < response.data.results.length; i++) {
            let idx = ((page-1) * 10) + i + 1;
            let pidx = "P" + (idx+"").padStart(4, "0");
            if (dumArr.indexOf(pidx + " - " + response.data.results[i].name) === -1) {
                dumArr.push(pidx + " - " + response.data.results[i].name);
            }
        }

        this.setState((state, props) => ({
            peoplelist : dumArr.sort()
        }));
    }

    processAddCrew = () => {
        let vhc = document.getElementById("vehicle").innerHTML;
        let person = document.getElementById("person").innerHTML;

        if (vhc === "&nbsp;" || person === "&nbsp;") return;

        var dumArr = this.state.vehiclecrews;
        var dumArr2 = this.state.peoplelist;
        let vehicle = dumArr.filter(vehicle => vehicle.name === vhc);

        if (vehicle.length === 0) {
            dumArr.push({name : vhc, crewlist : [ person ]})
        } else {
            for (var j = 0; j < dumArr.length; j++) {
                if (dumArr[j].name === vhc) {
                    dumArr[j].crewlist.push(person);
                    dumArr[j].crewlist.sort();
                    break;
                }
            }
        }

        var z = -1;
        for (z = 0; z < dumArr2.length; z++) {
            if (dumArr2[z] === person) {
                break;
            }
        }

        if (dumArr2[z] === person) {
            dumArr2.splice(z,1);
        }

        document.getElementById("person").innerHTML = "&nbsp;";

        console.log(dumArr2);

        this.setState(() => ({
            vehiclecrews : dumArr.sort(),
            peoplelist : dumArr2.sort()
        }));
    }
    
    GetDataPeople() {

        for (var x = 1; x <= 9; x++) {            
            axios.get("https://swapi.dev/api/people/?page=" + x,{
                params: {
                _limit: 1
                }
            })
            .then((response) => {
                this.processDataPeople(response, x);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    renderPersonRow(person, index) {     
        return (
            <Dropdown.Item eventKey={index} onClick={() => { document.getElementById("person").innerHTML = person;}}>{person}</Dropdown.Item>
        );
    };

    renderVehicleRow(vehicle, index) {
        return (
            <Dropdown.Item eventKey={index} onClick={() => { document.getElementById("vehicle").innerHTML = vehicle;}}>{vehicle}</Dropdown.Item>
        );
    }

    renderVehicleCrews(vehicle, index) {
        return (
            <div className="r-vehicle">
            <div className="r-vehicle-name">{vehicle.name}</div>
            <CrewList data={vehicle.crewlist} />
            </div>
        );
    }

    render() {
        
        let {peoplelist,vehiclelist,vehiclecrews} = this.state;
        
        return (
            <div>
                
                
                <div className="r-container">
                    <DropdownButton id="select-vehicle" variant="dark" title="Vehicle">
                        {vehiclelist.map(this.renderVehicleRow)}
                    </DropdownButton>
                    <span id="vehicle" className="r-dropdown-selected">&nbsp;</span>
                </div>
                <div className="r-container">
                    <DropdownButton id="select-person" variant="dark" title="Person">
                        {peoplelist.map(this.renderPersonRow)}
                    </DropdownButton>
                    <span id="person" className="r-dropdown-selected">&nbsp;</span>
                </div>
                <hr />
                <button onClick={this.processAddCrew}>Add Crew</button>
                <hr />
                <div class="r-tree">
                    {vehiclecrews.map(this.renderVehicleCrews)}
                </div>
            </div>
        );
    }
}

export default Selectpeople;