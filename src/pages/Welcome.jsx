import { useEffect, useState } from "react"
import NavBar from "../components/Nav-bar"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore"
import loadingImage from '../../public/loading-loader.gif'



console.log(auth)
function Welcome() {

    const [todosList, setTodosList] = useState([])
    const todosCollectionRef = collection(db, "todos");
    const [isLoading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [createModal, setCreateModal] = useState(false);
    const [newTodoName, setNewTodoName] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');

    const authData = JSON.parse(localStorage.getItem('user'));


    const openModal = (id) => {

        console.log(id);
        setEditModal(true);
    }

    const openCreateModal = () => {
        setCreateModal(true);
    }

    const closeCreateModal = () => {
        setCreateModal(false);
    }

    const getTodosData = async () => {

        try {

            setLoading(true)
            const data = await getDocs(todosCollectionRef)
            const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setTodosList(filterData);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const addNewTodo = async () => {

        try {

            let data = {
                name: newTodoName,
                description: newTodoDescription,
                is_done: false,
                author_email: authData?.email
            }

            const response = await addDoc(todosCollectionRef, data)

            console.log(response)


            getTodosData()
            window.location.reload();


        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (id) => {

        const todo = doc(db, "todos", id);

        await deleteDoc(todo);

        getTodosData()

    }

    useEffect(() => {
        getTodosData();
    }, [])

    return (<>
        <div className="min-h-screen bg-gray-100 flex flex-col gap-2">
            <NavBar />
            <div className="w-full flex justify-center">
                <div className="w-5/6 relative">

                    <div className="relative overflow-x-auto">

                        {
                            auth?.currentUser !== null &&
                            <div className="w-full p-4 flex flex-row-reverse">
                                <button onClick={() => { openCreateModal() }} className="px-4 py-2 rounded-lg border-2 hover:border-none hover:bg-white hover:scale-105 duration-700 hover:drop-shadow-lg"> Add new todo</button>
                            </div>
                        }

                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author Email
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {isLoading === true && <tr>
                                    <td colSpan="5">
                                        <div className="flex justify-center">
                                            <img src={loadingImage} alt="" />
                                        </div>

                                    </td>
                                </tr>}
                                {todosList.map((todo) => (
                                    <tr className="bg-white border-b " key={todo.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            <h1>{todo.name}</h1>
                                        </th>
                                        <td className="px-6 py-4">
                                            <h1>{todo.description}</h1>
                                        </td>
                                        <td className="px-6 py-4">
                                            <h1>  {todo.is_done ? 'done' : 'not yet!'}</h1>

                                        </td>
                                        <td className="px-6 py-4">
                                            <h1>{todo.author_email}</h1>

                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                auth?.currentUser !== null &&
                                                <div className="flex gap-2">
                                                    <button onClick={() => openModal(todo)} className="px-4 py-2 rounded-lg hover:bg-white hover:scale-105 duration-700 hover:drop-shadow-lg">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => deleteTodo(todo.id)}
                                                        className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400 hover:scale-105 duration-700 hover:drop-shadow-lg"> Delete</button>
                                                </div>

                                            }

                                        </td>
                                    </tr>
                                ))
                                }

                            </tbody >
                        </table>
                    </div >

                    {
                        createModal === true &&
                        <div className="absolute z-10 backdrop-opacity-10 backdrop-invert bg-white/30 h-screen w-full top-0 flex justify-center">
                            <div className="w-1/2 h-full flex items-center">
                                <div className="w-full h-1/2 bg-white rounded-lg drop-shadow-sm p-4 flex flex-col gap-4">
                                    <h1 className="w-full text-center text-xl font-bold"
                                    >Add Todo</h1>
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="name" className="text-xs">Name</label>
                                        <input type="text" onChange={(e) => setNewTodoName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100" placeholder="name" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="name" className="text-xs">Description</label>
                                        <input type="text" onChange={(e) => setNewTodoDescription(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-100" placeholder="name" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <input type="hidden" className="w-full px-4 py-2 rounded-lg bg-gray-100" placeholder="name" value={auth?.currentUser?.email} />
                                    </div>


                                    <div className="w-full flex flex-row-reverse gap-5">

                                        <button onClick={() => { closeCreateModal() }} className="px-4 py-2 bg-red-300 hover:bg-red-400 duration-700 hover:scale-105 rounded-lg">close</button>
                                        <button onClick={() => { addNewTodo() }} className="px-4 py-2  hover:bg-white duration-700 hover:scale-105 rounded-lg drop-shadow-md" >Add</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div >
        </div >

    </>)
}
export default Welcome