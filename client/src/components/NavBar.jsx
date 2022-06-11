import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <div>
            <input type="text" placeholder="Search"></input>
            <button>Buscar</button>
            <Link to="/createActivity"> <button>Create Activity</button> </Link>
        </div>
    )
}