// Bước 2: Import lại loại danh mục và tên đơn vị
import { navCategories, units } from "../../contanst";

// Những thứ để tạo nên giao diện
import { Container, Box } from "@mui/material";
import { Typography, TextField, Button} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Khai báo tạm thời
import { useState } from "react";

// Import database bên firebase.js, các hàm có sẵn từ thư viện firestore để tương tác tới cơ sở dữ liệu
import { database } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";


// Bước 3: Tạo trang
const FoodPage = () => {

    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [noteProduct, setNoteProduct] = useState('');
    const [categoryProduct, setCategoryProduct] = useState('');
    const [unitProduct, setUnitProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');

    const [imageProduct, setImageProduct] = useState('');


    // Tạo hàm để tương tác lên cơ sở dữ liệu
    const handleSubmit = async () => {
        if (nameProduct == '' || descriptionProduct == '' || noteProduct == '' || unitProduct == '' || priceProduct == '' || imageProduct == '') {
            alert('Chưa nhập đủ dữ liệu');
            return;
        }

        const foodRef = collection(database, "foods");
        await addDoc(foodRef, {
            name: nameProduct,
            description: descriptionProduct,
            note: noteProduct,
            category: categoryProduct,
            unit: unitProduct,
            price: priceProduct,
            image: imageProduct
        });

        alert('Thêm sản phẩm thành công');
    }


    // Bước 4: Tạo giao diện
    return (
        <Container>
            <Box>
                <Typography sx={{textAlign: "center", fontWeight: "bold", marginTop: "20px", fontSize: "24px"}}>THÊM SẢN PHẨM</Typography>
                <Typography sx={{textAlign: "center"}}>Vui lòng điền thông tin sản phẩm</Typography>

                <TextField sx={{marginTop: "20px"}} fullWidth label="Tên sản phẩm" value={nameProduct} onChange={(event) => setNameProduct(event.target.value)}></TextField>
                
                <TextField type="number" sx={{marginTop: "20px"}} fullWidth label="Giá sản phẩm" value={priceProduct} onChange={(event) => setPriceProduct(event.target.value)}></TextField>
                
                <TextField sx={{marginTop: "20px"}} fullWidth label="Mô tả sản phẩm" value={descriptionProduct} onChange={(event) => setDescriptionProduct(event.target.value)}></TextField>
                
                <TextField sx={{marginTop: "20px"}} fullWidth label="Ghi chú sản phẩm" value={noteProduct} onChange={(event) => setNoteProduct(event.target.value)}></TextField>
                
                <TextField sx={{marginTop: "20px"}} fullWidth label="Link hình ảnh" value={imageProduct} onChange={(event) => setImageProduct(event.target.value)}></TextField>
            
                <FormControl sx={{marginTop: "20px"}} fullWidth>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                        value={categoryProduct}
                        onChange={(event) => setCategoryProduct(event.target.value)}
                    >
                        {navCategories.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <FormControl sx={{marginTop: "20px"}} fullWidth>
                    <InputLabel>Đơn vị</InputLabel>
                    <Select
                        value={unitProduct}
                        onChange={(event) => setUnitProduct(event.target.value)}
                    >
                        {units.map((item) => (
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button onClick={handleSubmit} fullWidth sx={{marginTop: "20px"}} variant="contained">Thêm sản phẩm</Button>

            </Box>
        </Container>
    );
}

export default FoodPage;