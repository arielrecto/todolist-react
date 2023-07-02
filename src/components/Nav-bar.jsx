import { Link } from "react-router-dom"
import { auth } from '../config/firebase'
import {signOut} from 'firebase/auth'


const authUser = localStorage.getItem('user')

function NavBar() {
    const logout = async () => {

        await signOut(auth)

        localStorage.removeItem('user')
        window.location.reload()
   }
   
    return (
        <>
            <div className="w-full flex-col  drop-shadow-sm">
                <div className="flex p-2 bg-white">
                    <h1 className="flex-grow text-center text-lg font-bold">
                        Todo List
                    </h1>

                    { authUser === null &&
                        <div className="flex gap-2">
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Sign up</Link>
                        </div>
                    }
                     { authUser !== null &&
                        <div className="flex gap-2">
                           <button onClick={logout}>Log out</button>
                        </div>
                    }



                </div>
                <div className="w-full p-2 bg-gray-50 ">
                    <Link to="/">Home</Link>

                </div>
            </div>

        </>
    )
}


export default NavBar