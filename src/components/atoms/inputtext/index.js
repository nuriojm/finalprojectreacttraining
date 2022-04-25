function Inputtext(props)
{
    return (
        <input type={props.type} name={props.name} className="r-inputtext" value={props.value} />
    );
}

export default Inputtext;