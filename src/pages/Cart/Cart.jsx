// Import phần khởi tạo và sẽ chạy khi có sự thay đổi gì đó
import { useState, useEffect } from "react";

// Import database và các hàm dùng để truy vấn
import { database, auth } from "../../firebase/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

// Import hàm được dùng để cập nhật số lượng hay thông tin gì
import { updateDoc } from "firebase/firestore";
// Import hàm để xóa khi người dùng muốn xóa sản phẩm khỏi giỏ
import { deleteDoc } from "firebase/firestore";

// Import hàm lấy nhanh thông tin người dùng hiện tại
import { useAuthState } from "react-firebase-hooks/auth"

// Import các thành phần render lên giao diện
import {
    Card, CardActions, CardContent, Link as MaterialLink,
    CardMedia, Container, Grid, IconButton, Button,
    Typography, Box, TextareaAutosize, useRadioGroup
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const CartPage = () => {
    // Khởi tạo do người dùng mình lấy liền khác với các lần trước lần này chỉ cần gọi vậy là xong
    const [user] = useAuthState(auth);
    // Cái này phải truy vấn mới lấy được nên làm trình tự
    const [cart, setCart] = useState([]);
    // Này là do giỏ hàng nên cũng phải có tổng tiền
    const [total, setTotal] = useState(0);

    // Lấy cart khi có user
    useEffect(() => {
        // Kiểm tra do useEffect không cho phép async nên phải tạo hàm để lấy dduocj dữ liệu
        const fetchCartUser = async () => {
            // Kiểm tra coi có người dùng không thì mới lấy
            if (user) {
                // Lấy id của người dùng
                const uid = user.uid;
                // Tạo tham chiếu tới collection cart
                const cartRef = collection(database, "cart");
                // Tạo truy vấn có điều kiện để lấy đúng giỏ hàng của người đó
                const q = query(cartRef, where("uid", "==", uid));
                // Lấy dữ liệu
                const querySnapShot = await getDocs(q);
                // Lúc này dữ liệu là mớ hỗn độn từ querySnapShot nên mình chỉ lấy cái cần thiết
                const items = querySnapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                // Đặt lại giỏ hàng
                setCart(items);
            }
        };

        // Ở trên chỉ tạo nên ở dưới phải gọi lại nó mới chạy được
        fetchCartUser();
    }, [user, setCart]);

    // Tính tổng tiền khi cart thay đổi
    useEffect(() => {
        let tien = 0;
        cart.forEach(cartItem => {
            let gia = parseInt(cartItem.price);
            let soLuong = parseInt(cartItem.quantity);
            tien += gia * soLuong;
        });

        // Đặt lại tổng tiền
        setTotal(tien);
    }, [cart]);


    // Tăng số lượng sản phẩm
    const plusQuantity = async (id, quantity) => {
        // Tạo tham chiếu tới database sau đó tham chiếu tới collection cart và tại dòng id
        const itemRef = doc(database, "cart", id);
        // Cập nhật số lượng tăng lên 1
        await updateDoc(itemRef, {
            quantity: quantity + 1
        });

        // Sau khi cập nhật xong thì làm mới lại giỏ hàng
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Giảm số lượng sản phẩm
    const minusQuantity = async (id, quantity) => {
        if (quantity <= 1) return; // Không giảm nữa nếu chỉ còn 1

        const itemRef = doc(database, "cart", id);
        await updateDoc(itemRef, {
            quantity: quantity - 1
        });

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    // Xóa sản phẩm
    const deleteItem = async (id) => {
        const itemRef = doc(database, "cart", id);
        await deleteDoc(itemRef);

        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        <Container>
            {/* Tiêu đề */}
            <Typography variant='h4' style={{ textTransform: 'uppercase' }}>
                Giỏ hàng
            </Typography>

            {/* Do 2 cục kia nằm trên 1 hàng nên sài Grid Layout */}
            <Grid container spacing={2} justifyContent="center">

                <Grid item md={8}>
                    {/* Duyệt qua vòng lặp để in ra Cart */}
                    {cart.map(itemCart => (
                        <Card
                            key={itemCart.id}
                            sx={{
                                display: 'flex',
                                margin: '20px 0',
                                position: 'relative',
                            }}
                        >
                            {/* Phần ảnh */}
                            <CardMedia
                                component="img"
                                image={itemCart.image}
                                style={{ width: 151 }}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        {/* Phần tên */}
                                        <Typography sx={{ width: "370px" }}>
                                            {cart.name}
                                        </Typography>
                                        {/* Phần giá / đơn vị */}
                                        <Typography>
                                            {itemCart.price}/{itemCart.unit}
                                        </Typography>
                                    </CardContent>
                                </Box>

                                <Box sx={{ ml: 2, mb: 1 }}>
                                    {/* Nút giảm số lượng sản phẩm khỏi giỏ */}
                                    <IconButton color="secondary" onClick={() => minusQuantity(itemCart.id, itemCart.quantity)}>
                                        <RemoveIcon />
                                    </IconButton>

                                    {/* Thông tiun só lượng sản phẩm hiện tại */}
                                    <Typography>{itemCart.quantity}</Typography>
                                    
                                    {/* Nút giảm số lượng */}
                                    <IconButton color="primary" onClick={() => plusQuantity(itemCart.id, itemCart.quantity)}>
                                        <AddIcon />
                                    </IconButton>

                                </Box>

                                {/* Xóa sản phẩm khỏi giỏ */}
                                <IconButton
                                    style={{ position: 'absolute', top: 10, right: 10 }}
                                    onClick={() => deleteItem(itemCart.id)}
                                >
                                    <DeleteForeverIcon style={{ fontSize: '30px' }} />
                                </IconButton>

                                {/* In ra giá tiền nhan với số lượng của sản phẩm đó */}
                                <Typography style={{ position: 'absolute', bottom: 10, right: 20 }}>
                                    {itemCart.price * itemCart.quantity} đ
                                </Typography>
                            </Box>
                        </Card>
                    ))}

                </Grid>

                <Grid item md={4}>
                    {/* Phần nội dung bên phải hiện tại để cho nó đỡ bị quy tắc CRAP */}
                    <Card style={{ margin: '20px 0' }}>
                        <CardContent>
                            {/* Tiêu đề */}
                            <Typography style={{ marginBottom: '10px' }}>
                                Ghi chú
                            </Typography>
                            {/* Cho nhậ ghi chú */}
                            <TextareaAutosize
                                minRows={5}
                                placeholder="Ghi chú cho đơn hàng của bạn"
                                style={{ width: '100%', resize: 'none', marginBottom: '20px' }}
                            />
                            <hr />
                            {/* Tổng tiền */}
                            <Typography style={{ margin: '10px 0', color: 'red' }}>
                                Tổng tiền: {total} đ
                            </Typography>
                            <hr />
                            {/* Note từ trang web */}
                            <Typography>
                                Nhân Viên DVKH sẽ xác nhận lại đơn hàng của Bạn trước khi giao hàng.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
    );
}

export default CartPage;