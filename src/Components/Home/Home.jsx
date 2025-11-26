import { Suspense, useState } from "react";
import ProductCard from "../../pages/ProductCard";
import { useLoaderData } from "react-router";
import Loader from "../Loader/Loader";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Home = () => {
    const data = useLoaderData();
    
    // Filter data by categories
    const beautyData = data?.filter((item) => item.category === 'beauty') || [];
    const fragrancesData = data?.filter((item) => item.category === 'fragrances') || [];
    const furnitureData = data?.filter((item) => item.category === 'furniture') || [];
    const groceriesData = data?.filter((item) => item.category === 'groceries') || [];
    
    const products = Array.isArray(data) ? data : data?.products || [];

    // Pagination states for each tab
    const [currentPage, setCurrentPage] = useState(1);
    const [beautyPage, setBeautyPage] = useState(1);
    const [fragrancesPage, setFragrancesPage] = useState(1);
    const [furniturePage, setFurniturePage] = useState(1);
    const [groceriesPage, setGroceriesPage] = useState(1);
    
    const itemsPerPage = 12;

    // Pagination calculations for each category
    const getPaginatedData = (data, currentPage, itemsPerPage) => {
        const indexOfLast = currentPage * itemsPerPage;
        const indexOfFirst = indexOfLast - itemsPerPage;
        return data.slice(indexOfFirst, indexOfLast);
    };

    const getTotalPages = (data, itemsPerPage) => {
        return Math.ceil(data.length / itemsPerPage);
    };

    // Current items for each tab
    const currentItems = getPaginatedData(products, currentPage, itemsPerPage);
    const currentBeautyItems = getPaginatedData(beautyData, beautyPage, itemsPerPage);
    const currentFragrancesItems = getPaginatedData(fragrancesData, fragrancesPage, itemsPerPage);
    const currentFurnitureItems = getPaginatedData(furnitureData, furniturePage, itemsPerPage);
    const currentGroceriesItems = getPaginatedData(groceriesData, groceriesPage, itemsPerPage);

    // Total pages for each tab
    const totalPages = getTotalPages(products, itemsPerPage);
    const beautyTotalPages = getTotalPages(beautyData, itemsPerPage);
    const fragrancesTotalPages = getTotalPages(fragrancesData, itemsPerPage);
    const furnitureTotalPages = getTotalPages(furnitureData, itemsPerPage);
    const groceriesTotalPages = getTotalPages(groceriesData, itemsPerPage);

    // Pagination component
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        if (totalPages <= 1) return null;

        return (
            <div className='flex justify-center mt-6 space-x-2'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-4 py-2 rounded border transition-colors ${
                            currentPage === i + 1
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <p className="text-lg text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs>
                <TabList className="flex flex-wrap border-b border-gray-200 mb-6">
                    <Tab className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 cursor-pointer focus:outline-none ui-selected:border-blue-600 ui-selected:text-blue-600">
                        All Products ({products.length})
                    </Tab>
                    <Tab className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 cursor-pointer focus:outline-none ui-selected:border-blue-600 ui-selected:text-blue-600">
                        Beauty ({beautyData.length})
                    </Tab>
                    <Tab className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 cursor-pointer focus:outline-none ui-selected:border-blue-600 ui-selected:text-blue-600">
                        Fragrances ({fragrancesData.length})
                    </Tab>
                    <Tab className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 cursor-pointer focus:outline-none ui-selected:border-blue-600 ui-selected:text-blue-600">
                        Furniture ({furnitureData.length})
                    </Tab>
                    <Tab className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 cursor-pointer focus:outline-none ui-selected:border-blue-600 ui-selected:text-blue-600">
                        Groceries ({groceriesData.length})
                    </Tab>
                </TabList>

                {/* All Products Tab */}
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <div>
                            {currentItems.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                        {currentItems.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination 
                                        currentPage={currentPage} 
                                        totalPages={totalPages} 
                                        onPageChange={setCurrentPage} 
                                    />
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No products found.</p>
                                </div>
                            )}
                        </div>
                    </Suspense>
                </TabPanel>

                {/* Beauty Tab */}
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <div>
                            {currentBeautyItems.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                        {currentBeautyItems.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination 
                                        currentPage={beautyPage} 
                                        totalPages={beautyTotalPages} 
                                        onPageChange={setBeautyPage} 
                                    />
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No beauty products found.</p>
                                </div>
                            )}
                        </div>
                    </Suspense>
                </TabPanel>

                {/* Fragrances Tab */}
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <div>
                            {currentFragrancesItems.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                        {currentFragrancesItems.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination 
                                        currentPage={fragrancesPage} 
                                        totalPages={fragrancesTotalPages} 
                                        onPageChange={setFragrancesPage} 
                                    />
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No fragrances products found.</p>
                                </div>
                            )}
                        </div>
                    </Suspense>
                </TabPanel>

                {/* Furniture Tab */}
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <div>
                            {currentFurnitureItems.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                        {currentFurnitureItems.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination 
                                        currentPage={furniturePage} 
                                        totalPages={furnitureTotalPages} 
                                        onPageChange={setFurniturePage} 
                                    />
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No furniture products found.</p>
                                </div>
                            )}
                        </div>
                    </Suspense>
                </TabPanel>

                {/* Groceries Tab */}
                <TabPanel>
                    <Suspense fallback={<Loader />}>
                        <div>
                            {currentGroceriesItems.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                        {currentGroceriesItems.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <Pagination 
                                        currentPage={groceriesPage} 
                                        totalPages={groceriesTotalPages} 
                                        onPageChange={setGroceriesPage} 
                                    />
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No groceries products found.</p>
                                </div>
                            )}
                        </div>
                    </Suspense>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Home;