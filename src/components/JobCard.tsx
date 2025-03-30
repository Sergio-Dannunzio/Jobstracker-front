export default function JobCard() {
    return(
        <div className="flex flex-col bg-[#aa8895bf] max-w-72 rounded-2xl p-4">
            <div className="mb-2">
                <h1>Title</h1>
            </div>
            <div className="mb-2">
                <h2 className="text-green-300">Status</h2>
            </div>
            <div className="mb-2">
                <p>Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde suscipit rerum blanditiis ad, doloribus eius sit commodi eos nulla inventore aliquam, quis, est labore mollitia aperiam asperiores consequuntur quas dolores?</p>
            </div>
        </div>
    )
}