import { Grid, Card, Button, Box } from "@mui/material";
import ca from '../../assets/ca.png';

const Item = () => {
    return (
        <Grid item size={3}>
            <Card sx={{cursor: "pointer"}}>
                <Box sx={{ overflow: "hidden" }}>
                    <Box
                        component="img"
                        src={ca}
                        alt="ca"
                        sx={{
                            width: "100%",
                            transition: "transform 0.3s",
                            "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }}
                    />
                </Box>
                <div style={{
                    padding: "10px"
                }}>
                    <div>Cá mặt quỷ</div>
                    <div>1,200,000 VND</div>
                    <div>
                        <Button sx={{
                            backgroundColor: "orange",
                            color: "white"
                        }}>THÊM VÀO GIỎ</Button>
                    </div>
                </div>
            </Card>
        </Grid>

    );
}

export default Item;