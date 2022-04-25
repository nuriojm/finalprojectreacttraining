function Menu(props) {
    return (
        <a href={props.target} className="r-menu">{props.description}</a>
    );
}
export default Menu;