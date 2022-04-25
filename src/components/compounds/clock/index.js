class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Halo, dunia!</h1>
                <h2>Ini {this.props.date.ToLocaleTimeString()}</h2>
            </div>
        );
    }
}