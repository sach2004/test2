import { useRouter } from "next/navigation"

export default function Notes({id , title, content }) {

    const router = useRouter()

    function handleClick(){
        router.push(`/notes/${id}`)
    }
    return(
        <div onClick={handleClick} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <h1 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {title}
            </h1>
            {/* <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {content}
            </p> */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                    Click to view details
                </span>
            </div>
        </div>
    )
}