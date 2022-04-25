import Menu from "../../atoms/menu";

function Links(props) {
    return (
        <div className="r-form r-form-left">
            <div className="r-form-title">Links</div>
            <Menu target="http://www.google.com" description="Google" />
            <Menu target="https://www.facebook.com" description="Facebook" />
            <Menu target="https://www.twitter.com" description="Twitter" />
            <Menu target="https://www.instagram.com" description="Instagram" />
        </div>
    );
}

export default Links;