import { useState } from "react";
import ProductCard from "../../pages/ProductCard";
import { useLoaderData } from "react-router";


const Home = () => {
    const data = useLoaderData(); 

    if (!data) return <p>Loading...</p>;
    

    const products = Array.isArray(data) ? data : data.products || [];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const currentItems = products.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {currentItems.map(p => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded border ${
                            currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default Home;
