import React from "react";
import { useRouteLoaderData } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProductItemAdmin from "./productItemAdmin";

const ProductsListAdmin = () => {
    const data = useRouteLoaderData("admin-parent");
    const beautyData = data.filter((item)=>item.category === 'beauty');
    const fragrancesData = data.filter((item)=>item.category === 'fragrances');
    const furnitureData = data.filter((item)=>item.category === 'furniture');
    const groceriesdata = data.filter((item)=>item.category === 'groceries');

    return (
        <div className='px-5'>
            <Tabs>
                <TabList>
                    <Tab>Beauty</Tab>
                    <Tab>Fragrances</Tab>
                    <Tab>Furniture</Tab>
                    <Tab>Groceries</Tab>
                </TabList>

                <TabPanel >
                    {
                        beautyData.map((item)=> <ProductItemAdmin key={item._id} product={item}/>)
                    }
                </TabPanel>
                <TabPanel>
                   {
                        fragrancesData.map((item)=> <ProductItemAdmin key={item._id} product={item}/>)
                    }
                </TabPanel>
                <TabPanel>
                   {
                        furnitureData.map((item)=> <ProductItemAdmin key={item._id} product={item}/>)
                    }
                </TabPanel>
                <TabPanel>
                   {
                        groceriesdata.map((item)=> <ProductItemAdmin key={item._id} product={item}/>)
                    }
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ProductsListAdmin;
