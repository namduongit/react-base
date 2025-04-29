
// Đọc dữ liệu từ trình duyệt, yêu cầu file App.js tại Router của Detail phải có
// path='/detail/:nameVariable' phải trùng với tên biến bên đây nhận được tức là
// const { nameVariable } = useParams();
import { data, useParams } from "react-router-dom";

// Mới nhận được id từ bên file item.jsx
// Cần truy vấn để lấy được sản phẩm ứng với id
// import thư viện CSDL
import { database } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

// import useState để chứa sản phẩm nhận được từ file item.jsx ban đầu chưa có nên để null
import { useState, useEffect } from "react";


// import component để tạo nên giao diện
import { Button, Container, Grid, Typography } from '@mui/material';

const Detail = () => {
    const { id } = useParams();
    console.log('Bên trang mô tả sản phẩm đã nhận được: ', id);

    // Tạo nơi lưu trữ tạm thời sản phẩm bằng useState
    const [product, setProduct] = useState([]);

    // Lấy dữ liệu từ database
    useEffect(() => {

        // Tạo hàm đồng bộ do useEffect là hàm bất đồng bộ không có async được
        const fetchProduct = async () => {
            // Tạo tham chiếu có 1 điều kiện nhưng đây là điều kiện id của hàng (nghsdus123dbaq)
            const productRef = doc(database, "foods", id);
            // Lấy dữ liệu
            const dataFireStore = await getDoc(productRef);

            if (dataFireStore.exists()) {
                // const dataWeb = {id: dataFireStore.id, ...dataFireStore.data()};
                // Lấy dữ liệu thành công thì đưa vô nơi lưu trữ tạm thời của sản phẩm
                console.log(dataFireStore.data())
                setProduct(dataFireStore.data());
                // console.log('Lấy được dữ liệu và đưa vào thành công ', product);

            } else {
                console.log('Sản phẩm có id ', id, ' không tồn tại');
            }

        }

        // gọi lại hàm đồng bộ
        fetchProduct();

    }, [id, setProduct]);


    return (

        <Container sx={{
            marginTop: "20px"
        }}>
            <Grid container spacing={4}>

                <Grid item size={4}>
                    <img src={product.image} style={{
                        width: "100%",
                        height: "auto"
                    }}></img>

                </Grid>


                <Grid item size={8}>
                    <Typography variant='h5' style={{ margin: '10px 0', fontWeight: 'bold' }}>
                        {product.name}
                    </Typography>
                    <Typography variant='subtitle1' style={{ margin: '10px 0' }}>
                        {product.note}
                    </Typography>
                    <Typography variant='body1'>
                        Giá tiền: {product.price} đ/{product.unit}
                    </Typography>
                    <Typography variant='body2' style={{ margin: '10px 0' }}>
                        Mô tả sản phẩm: {product.note}
                    </Typography>
                    <hr />
                    <Typography variant='body1' style={{ margin: '10px 0' }}>
                        {product.description}
                    </Typography>
                    <Button
                        variant="contained"
                        color="warning"
                        style={{ marginTop: '10px' }}
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </Grid>

            </Grid>
        </Container>

    );
}

export default Detail;


// Đầu tiên Tạo component Feature -> Hiển thị linh động trong File Main.jsx để hiển thị
// tên danh mục và một số loại sản phẩm ứng vớ danh mục

// Bước 2 sửa lại file Item để hiển thị

// Bước 3: Điều chỉnh Item có khả năng đi sang trang khác