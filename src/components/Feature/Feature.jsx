
import { database } from "../../firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { useState, useEffect } from "react";

import { Container, Typography, Grid } from "@mui/material";
import Item from "../Item/Item";


const Feature = ({ name, value }) => {
    const [productList, setProductList] = useState([]);

    useEffect( () => {
        
        const fetchDataFromFireStore = async () => {
            // Bước 1: Tạo tham chiếu tới collection (bảng) foods
            const foodRef = collection(database, "foods");
            // Bước 2: Tạo điều kiện truy vấn (ở đây) xet bên file Main.jsx đang truyền value là gì
            const testQuery = query(foodRef, where('category', '==', value));
            // Bước 3: Lấy dữ liệu từ cơ sở dữ liệu
            const data = await getDocs(testQuery);

            // Bước 4: Lấy dữ liệu từ data đưa về
            const dataFireStore = data.docs;

            // console.log(dataFireStore);

            const dataWeb = dataFireStore.map(itemData => ({
                id: itemData.id,
                ...itemData.data()
            }));

            // console.log(dataWeb);

            setProductList(dataWeb);
        }

        fetchDataFromFireStore();

    }, [value]);

    return (
        <Container>
            {/* In ra tên của danh mục */}
            <Typography>MỘT SỐ LOẠI {name}</Typography>


            {/* Duyệt in sản phảm ứng với danh mục */}
            <Grid container spacing={3}>
                
                {productList.map(product => (
                    <Item key={product.id} product={product} />
                ))}

            </Grid>

        </Container>
    );
}

export default Feature;