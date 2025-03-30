import { FaComment } from "react-icons/fa";

export default function JobCard() {
    return(
        <div className="flex flex-col bg-[#ffffffbf] max-w-72 rounded-2xl p-4">
            <div className="mb-2 border-b-2 border-[#b978ff9d] flex justify-between items-center">
                <h1>Title</h1>
                <h2 className="px-2 text-sm text-center text-green-700 bg-green-300 rounded-3xl">Status</h2>
            </div>
            <div className="mb-2">
                <p>Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde suscipit rerum blanditiis ad, doloribus eius sit commodi eos nulla inventore aliquam, quis, est labore mollitia aperiam asperiores consequuntur quas dolores?</p>
            </div>
            <div className="flex">
                <p>02/11</p>
                <p className="flex items-center ml-4">2 <span className="ml-1 text-[#313131]"><FaComment></FaComment></span></p>
            </div>
        </div>
    )
}