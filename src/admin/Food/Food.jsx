import { navCategories } from "../../contanst";
import { unit } from "../../contanst";


// Bước 2: Import các component có sẵn từ thư viện để tạo nên bố cục
import { Container, Box, TextField, Typography, Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

// Bước 3: import khai báo tạm thời và hàm thay đổi giá trị của biến khai báo
import { useState } from "react";

// Bước 4: import những thứ dùng để tương tác với cơ sở dữ liệu

import { database } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";


const FoodPage = () => {

    // Bước 5: Khai báo các giá trị sẽ gửi lên server
    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDiscriptonProduct] = useState('');
    const [noteProduct, setNoteProduct] = useState('');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [unitProduct, setUnitProduct] = useState('');
    const [priceProduct, setPriceProduct]= useState('');
    const [urlImageProduct, setURLImageProduct] = useState('');

    const [typeProduct, setTypeProduct] = useState('');


    // Bước 8:  Viết hàm để gửi lên server
    const handleSubmit = async () => {
        if (nameProduct == '' || descriptionProduct == '' || noteProduct == '' || unitProduct == '' || priceProduct == '') {
            alert('Bạn chưa nhập đủ thông tin');
            return;
        }

        const menuCollectionRef = collection(database, "foods");
        await addDoc(menuCollectionRef, {
            name: nameProduct,
            description: descriptionProduct,
            note: noteProduct,
            category: categoryProduct,
            unit: unitProduct,
            price: priceProduct,
            image: urlImageProduct
        });

        alert('Đã thêm sản phẩm');
        
    }

    // Bước 7: Tạo form
    return (
        <Container>
            <Box>
                <Typography sx={{
                    marginTop: "50px",
                    fontWeight: "bold",
                    textAlign: "center"
                }}>THÊM SẢN PHẨM</Typography>
                <Typography sx={{
                    textAlign: "center"
                }}>Vui lòng điền đủ thông tin sản phẩm</Typography>


                <form>

                <TextField sx={{marginBottom: "20px"}} fullWidth label="Thêm sản phẩm" value={nameProduct} onChange={(event) => setNameProduct(event.target.value)}></TextField>
                
                <TextField sx={{marginBottom: "20px"}} fullWidth label="Mô tả" value={descriptionProduct} onChange={(event) => setDiscriptonProduct(event.target.value)}></TextField>

                <TextField sx={{marginBottom: "20px"}} fullWidth label="Ghi chú" value={noteProduct} onChange={(event) => setNoteProduct(event.target.value)}></TextField>
                
                <TextField sx={{marginBottom: "20px"}} fullWidth label="Giá tiền" value={priceProduct} onChange={(event) => setPriceProduct(event.target.value)}></TextField>
                
                <FormControl sx={{marginBottom: "20px"}} fullWidth>
                    <InputLabel>Danh mục</InputLabel>

                    <Select
                        label="Loại sản phẩm"
                        value={categoryProduct}
                        onChange={(event) => setCategoryProduct(event.target.value)}
                        fullWidth
                    >

                        {navCategories.map((item) => {
                            return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                <FormControl sx={{marginBottom: "20px"}} fullWidth>
                    <InputLabel>Đơn vị</InputLabel>

                    <Select
                        label="Đơn vị"
                        value={unitProduct}
                        onChange={(event) => setUnitProduct(event.target.value)}
                        fullWidth
                    >

                        {unit.map((item) => {
                            return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        })}

                    </Select>
                </FormControl>

                <TextField sx={{marginBottom: "20px"}} fullWidth label="Link hình ảnh" value={urlImageProduct} onChange={(event) => setURLImageProduct(event.target.value)}></TextField>

                <Button onClick={handleSubmit} fullWidth sx={{marginTop: "20px", backgroundColor: "blue", color: "white", padding: "10px 20px"}}>Thêm sản phẩm</Button>
                </form>


            </Box>
        </Container>
    );
}

export default FoodPage;