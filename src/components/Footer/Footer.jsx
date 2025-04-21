import logo from '../../assets/logo.png';
import boconthuong from '../../assets/bocongthuong.png';
import { Container } from '@mui/material';

const Footer = () => {
    return (
        <div style={{marginTop: "100px", backgroundColor: "#1976d2"}}>
            <Container sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <img src={logo} alt="" width="200px"/>
                <div>
                    <p style={{margin: "5px 0"}}>HỆ THỐNG HẢI SẢN BIỂN ĐÔNG</p>
                    <p style={{margin: "5px 0"}}>HỆ THỐNG HẢI SẢN BIỂN ĐÔNG</p>
                    <p style={{margin: "5px 0"}}>HỆ THỐNG HẢI SẢN BIỂN ĐÔNG</p>
                    <p style={{margin: "5px 0"}}>HỆ THỐNG HẢI SẢN BIỂN ĐÔNG</p>
                    
                </div>
                <img src={boconthuong} alt="" width="200px"/>
            </Container>
        </div>
    );
}

export default Footer;