import Item from '../../components/Item/Item';
import { Container, Grid, Typography } from "@mui/material";
import anh1 from '../../assets/anh1.png'
import anh3 from '../../assets/anh3.png'



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

        <Container><Typography variant="h5" color="initial">MỘT SỐ LOẠI CÁ</Typography></Container>

        <Container>
            <Grid container spacing={2}>
                <Item />
                <Item />
                <Item />
                <Item />
            </Grid>
        </Container>

        <Container><Typography variant="h5" color="initial">MỘT SỐ LOẠI CÁ</Typography></Container>

        <Container>
            <Grid container spacing={2}>
                <Item />
                <Item />
                <Item />
                <Item />
            </Grid>
        </Container>

        <Container><Typography variant="h5" color="initial">MỘT SỐ LOẠI CÁ</Typography></Container>

        <Container>
            <Grid container spacing={2}>
                <Item />
                <Item />
                <Item />
                <Item />
            </Grid>
        </Container>
        


        </>
    );
}

export default Main;