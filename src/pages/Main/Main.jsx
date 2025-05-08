import Item from '../../components/Item/Item';
import { Container, Grid, Typography } from "@mui/material";
import anh1 from '../../assets/anh1.png'
import anh3 from '../../assets/anh3.png'
// import Feature from '../../components/Feature/Feature';
import Feature from '../../components/Feature/Feature';


const Main = () => {
    return (
        <>

        <Container sx={{marginTop: "150px"}}></Container>

        <Container>
            <Grid container spacing={2}>
                <Grid item size={6}>
                    <img src={anh1} alt="" width="100%"/>
                </Grid>
                <Grid item size={6}>
                    <img src={anh1} alt="" width="100%" />
                </Grid>
            </Grid>
        </Container>

        <Container>
            <Grid container spacing={2} sx={{marginTop: "50px"}}>
                <Grid item size={6}>
                    <img src={anh1} alt="" width="100%"/>
                </Grid>
                <Grid item size={6}>
                    <img src={anh1} alt="" width="100%" />
                </Grid>
            </Grid>
        </Container>

        <Feature name={"Hải sản biến"} value={"seafood"} />
        {/* <Feature type={'hotpot'} img={anh3} name={'Lẩu hải sản'} /> */}
        <Feature name={"Hải sản chế biến đã được đổi tên"} value={"hotpot"} />



        </>
    );
}

export default Main;