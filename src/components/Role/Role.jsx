// Bước 2: import lại các chức năng đã tạo bên kia 
import { userItem, staffItem, adminItem } from "../../contanst";

// Bước 3: import Font-end để tạo ra giao diện
// Có đổi tên lại 1 trong 2 thẻ Link để không bị trùng
import { AppBar, Container, Box, Button, Link as LinkMaterial } from "@mui/material";

// Bước 4: import thẻ được dùng để định hướng trong Router
import { Link } from 'react-router-dom';


// Bước 5: Tạo component
const Role = ({ bienTruyenVao }) => { // Truyền vào lại quyền

    return (
        <div style={{
            marginTop: "90px",
            backgroundColor: "blue",
            padding: "20px 0"
        }}>
            {/* Kiểm tra nếu biến truyền vào tức là quyền hiện tại là user
                && kiểm tra thêm nếu userItem tồn tại thì duyệt phần tử
            */}
            <Container sx={{display: "flex", justifyContent: "space-around", padding: "0"}}>

                {bienTruyenVao == 'user' && userItem.map((item) => (
                    <Button sx={{
                        height: "100%",
                    }} key={item.value}>

                        <LinkMaterial component={Link} to={`user/${item.value}`} sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "white",
                            textDecoration: "none",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white"
                            },
                            padding: "20px 30px",
                            borderRadius: "10px"
                        }}>
                            {item.label}
                        </LinkMaterial>

                    </Button>
                ))}

                {bienTruyenVao == 'admin' && adminItem.map((item) => (
                    <Button sx={{
                        height: "100%",
                    }} key={item.value}>

                        <LinkMaterial component={Link} to={`admin/${item.value}`} sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "white",
                            textDecoration: "none",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white"
                            },
                            padding: "20px 30px",
                            borderRadius: "10px"
                        }}>
                            {item.label}
                        </LinkMaterial>

                    </Button>
                ))}

                {bienTruyenVao == 'staff' && staffItem.map((item) => (
                    <Button sx={{
                        height: "100%",
                    }} key={item.value}>

                        <LinkMaterial component={Link} to={`staff/${item.value}`} sx={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "white",
                            textDecoration: "none",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white"
                            },
                            padding: "20px 30px",
                            borderRadius: "10px"
                        }}>
                            {item.label}
                        </LinkMaterial>

                    </Button>
                ))}

            </Container>

        </div>
    )
}

export default Role;