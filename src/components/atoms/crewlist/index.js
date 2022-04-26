import React from "react";


class CrewList extends React.Component
{
    render() {
        let crewlist = this.props.data;
        console.log("CrewList");
        console.log(this.props.data);
        return (
            <div className="r-crewlist">
            {
                crewlist.map((crew,i) => {return <div className="r-crew">{crew}</div>})
            }
            </div>
        );
    }

}

export default CrewList;