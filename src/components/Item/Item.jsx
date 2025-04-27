import { Grid, Card, Button, Box, Link as MaterialLink } from "@mui/material";

import { Link } from "react-router-dom";

const Item = ({ product }) => {
    // console.log('Item này đang nhận sản phẩm: ', product);
    return (
        <Grid item size={3}>
            <Card sx={{ cursor: "pointer" }}>

                {/* Bọc vào nội dung và biến cho nó được phép điều hướng trang
                    - MaterialLink mới là thẻ a chưa được phép điều hướng
                */}
                <MaterialLink
                    // Biến MaterialLink thành Component Link trong react-router-dom
                    // Điều hướng cho nó đi đến đâu bằng to
                    component={Link} to={`/detail/${product.id}`}
                >

                    <Box sx={{ overflow: "hidden" }}>
                        {/* Hiển thị hình ảnh biến thẻ Box thành component img trong HTML */}
                        <Box
                            component="img"
                            src={product.image}
                            alt="ca"
                            sx={{
                                width: "100%",
                                transition: "transform 0.3s",
                                "&:hover": {
                                    transform: "scale(1.1)"
                                },
                                aspectRatio: 4 / 3
                            }}
                        />
                    </Box>
                    
                    {/* Hiển thị tên sản phẩm và giá sản phẩm và nút thêm vào giỏ hàng */}
                    <div style={{
                        padding: "10px"
                    }}>
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                        <div>
                            <Button sx={{
                                backgroundColor: "orange",
                                color: "white"
                            }}>THÊM VÀO GIỎ</Button>
                        </div>
                    </div>

                </MaterialLink>

            </Card>
        </Grid>

    );
}

export default Item;