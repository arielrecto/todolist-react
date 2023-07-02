import NavBar from "../../components/Nav-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";


function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const signin = async () => {
        const response = await signInWithEmailAndPassword(auth, email, password)

        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.reload()
        window.location.href = '/'
    }
    return (<>
        <div className="min-h-screen bg-gray-100">
            <NavBar />

            <div className="w-full h-screen flex justify-center">
                <div className="flex items-center w-1/2">
                    <div className="w-full bg-white rounded-lg drop-shadow-md flex flex-col space-y-5 p-4">
                        <h1 className="w-full text-center font-bold tet-xl p-4">
                            Log in
                        </h1>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs">Email</label>
                            <input type="text" className="w-full px-4 py-2 bg-gray-50" placeholder="Email" 
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-xs">Password</label>
                            <input type="password" className="w-full px-4 py-2 bg-gray-50" placeholder="password" 
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </div>
                        <div className="w-full">
                            <button className="w-full text-center drop-shadow-sm px-4 py-2 rounded-lg hover:drop-shadow-lg bg-white 
                        duration-700 hover:scale-100 font-semibold text-xs" onClick={signin}>Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}



export default Login;