import { userItem, staffItem, adminItem } from "../../contanst";

import { AppBar, Container, Box, Button, Link as LinkMaterial } from "@mui/material";

// Link as LinkMaterial là thẻ a trong HTML

import { Link } from 'react-router-dom';


const Role = ({ bienTruyenVao }) => {
    // console.log("Quyền hiện tại:", bienTruyenVao);
    // console.log(userItem)
    // console.log(staffItem)
    // console.log(adminItem)
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