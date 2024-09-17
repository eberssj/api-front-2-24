import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar/Sidebar"

export default function Adm() {

    return (
        <div>
            <Sidebar />
                <h1>Adm</h1>
                <Link to="/adm">Go to Home</Link>
        </div>
    )
}