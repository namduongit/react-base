
// Đọc dữ liệu từ trình duyệt, yêu cầu file App.js tại Router của Detail phải có
// path='/detail/:nameVariable' phải trùng với tên biến bên đây nhận được tức là
// const { nameVariable } = useParams();
import { data, useParams } from "react-router-dom";

// Mới nhận được id từ bên file item.jsx
// Cần truy vấn để lấy được sản phẩm ứng với id
// import thư viện CSDL
import { auth, database } from "../../firebase/firebase";
import { addDoc, doc, getDoc } from "firebase/firestore";

// Import thêm các thư viện
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";

// Các hàm để lấy ra người dùng hiện tại để phân biệt được
import { onAuthStateChanged } from "firebase/auth";

// import useState để chứa sản phẩm nhận được từ file item.jsx ban đầu chưa có nên để null
import { useState, useEffect } from "react";


// import component để tạo nên giao diện
import { Button, Container, Grid, Typography } from '@mui/material';

const Detail = () => {
    const { id } = useParams();
    console.log('Bên trang mô tả sản phẩm đã nhận được: ', id);

    // Tạo nơi lưu trữ tạm thời sản phẩm bằng useState
    const [product, setProduct] = useState([]);

    // Tạo nơi lưu trữ tạm thời của người dùng
    const [user, setUser] = useState([]);

    // Tạo nơi lưu trữ tạm thời của giỏ hàng người dùng
    const [cart, setCart] = useState([]);

    // Lấy dữ liệu từ database
    useEffect(() => {
        // Đăng ký sự kiện thay đổi trạng thái người dùng (đăng nhập/đăng xuất)
        const unsubscribe = onAuthStateChanged(auth, async (userFireBase) => {
            if (userFireBase) {
                setUser(userFireBase);  // Cập nhật người dùng vào state

                // Viết chung nếu có người dùng thì lấy được giỏ hàng
                // Lấy uid của tài khoản hiện tại
                const uid = userFireBase.uid;
                // Tạm tham chiểu để lấy giỏ hàng
                const cartRef = collection(database, "cart");
                // Thực hiện truy vấn có điều kiện
                const q = query(cartRef, where("uid", "==", uid));
                // Chờ đợi để lấy kết quả
                const querySnapShot = await getDocs(q);

                console.log(querySnapShot)

                // Tạo và đưa vào mảng items
                const items = querySnapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setCart(items);
                console.log(items);

            } else {
                setUser(null);  // Nếu không có người dùng, set lại null
                setCart(null);
            }
        });

        // Tạo hàm lấy thông tin sản phẩm từ Firestore
        const fetchProduct = async () => {
            const productRef = doc(database, "foods", id);
            const dataFireStore = await getDoc(productRef);

            if (dataFireStore.exists()) {
                setProduct(dataFireStore.data());
            } else {
                console.log("Sản phẩm không tồn tại");
            }
        };

        // Gọi hàm lấy sản phẩm
        fetchProduct();

        // Cleanup function khi component bị unmount
        return () => unsubscribe();
    }, [id]);



    // Tạo hàm thêm vào giỏ
    const handleAddToCart = async () => {
        console.log(product);
        console.log(user);
        console.log(cart);

        // Tạo tham chiếu để kiểm tra sản phẩm đã tồn tại chưa
        const userCartItem = collection(database, "cart");
        // Tạo câu truy vấn để kiểm tra
        const q = query(userCartItem,
            where("uid", "==", user.uid),
            where("foodId", "==", id)
        );
        // Lấy dữ liệu từ câu truy vấn
        const querySnapShot = await getDocs(q);

        // Kiểm tra
        if (!querySnapShot.empty) {
            alert('Sản phẩm đã có trong giỏ');

            // Vì đã có nên data của nó luôn nằm ở vị trí 0
            const existingDoc = querySnapShot.docs[0];
            // Tạo tham chiếu tới id của món hàng đó
            const existingRef = doc(database, "cart", existingDoc.id);

            // Lấy số lượng hiện tại sau dấu || là để debug nếu không có thì nó lấy 1
            const currentQuantity = existingDoc.data().quantity || 1;
            // Cập nhật tăng lên 1
            await updateDoc(existingRef, {
                quantity: currentQuantity + 1
            });

            alert("Đã tăng số lượng sản phẩm trong giỏ hàng");

        } else {
            // Tạo tham chiếu mới 
            const cartItemRef = collection(database, "cart");
            await addDoc(cartItemRef, {
                foodId: id,
                quantity: 1,
                uid: user.uid,
                image: product.image,
                name: product.name,
                price: product.price,
                unit: product.unit
            });

            alert('Thêm vào giỏ thành công');
        }
    }

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
                        onClick={handleAddToCart}
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