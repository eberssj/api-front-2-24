import { Link } from "react-router-dom";

export default function PageNotAllowed() {
    return (
        <div>
            <h1>Page Not Allowed</h1>
            <Link to="/">Go to Home</Link>
        </div>
    )
}