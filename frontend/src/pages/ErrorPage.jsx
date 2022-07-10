import { NavLink } from "react-router-dom"

export const ErrorPage = () => {
    
    return (
        <div style={{fontSize: 60, marginLeft: "120px"}}>
            404 not found
            <br></br>
            <NavLink style={{fontSize: 28}} to="/">
                Go to catalog
            </NavLink>
        </div>
    )
}