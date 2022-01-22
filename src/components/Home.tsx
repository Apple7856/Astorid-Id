import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import { useState } from 'react'

const useStyle = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    newCar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2)
    },
    details: {
        marginTop: theme.spacing(5)
    },
    para: {
        margin: theme.spacing(2),
    },
    datax: {
        color: 'green',
        marginLeft: theme.spacing(2)
    }
}));

type AstoridState = {
    name: string
    Nasa_jpl_url: string
    is_potentially_hazardous_asteroid: string
}
export const Home = () => {
    const [astoridId, setAstoridId] = useState<string>("");
    const [astoridDetails, setAstoridDetails] = useState<AstoridState | null>(null);
    const [data, setData] = useState<boolean>(true);
    const classes = useStyle();

    const searchAstoridId = async () => {
        try {
            const responce = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${astoridId}?api_key=1GJVd4dvUdtowCfangpoY09S9tFE4BnSF4GUjWB7`);
            setAstoridDetails({
                name: responce.data.name,
                Nasa_jpl_url: responce.data.nasa_jpl_url,
                is_potentially_hazardous_asteroid: JSON.stringify(responce.data.is_potentially_hazardous_asteroid)
            });
            setData(false);
            setAstoridId("");
        } catch (error) {
            console.log(error);
        }
    }

    const randomAstoridId = async () => {
        try {
            const responce = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=1GJVd4dvUdtowCfangpoY09S9tFE4BnSF4GUjWB7`);
            const randomValue = Math.floor((Math.random() * 20));
            const responceData = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${responce.data.near_earth_objects[randomValue].id}?api_key=1GJVd4dvUdtowCfangpoY09S9tFE4BnSF4GUjWB7`);
            setAstoridDetails({
                name: responceData.data.name,
                Nasa_jpl_url: responceData.data.nasa_jpl_url,
                is_potentially_hazardous_asteroid: JSON.stringify(responceData.data.is_potentially_hazardous_asteroid)
            });
            setData(false);
        } catch (error) {
            console.log(error);
        }
    }

    return   <Container className={classes.container} data-testid="mainComponent">
            {
                data ?
                    <Typography component='div' className={classes.newCar}>
                        <TextField id="standard-basic" data-testid="inputField" label="Astorid-Id" value={astoridId} onChange={(e) => setAstoridId(e.target.value)} />
                        <Button variant="contained" data-testid="buttonTest" className={classes.button} color="primary" disabled={astoridId ? false : true} onClick={() => searchAstoridId()}>
                            Search Astorid
                        </Button>
                        <Button variant="contained" data-testid="randomButtonTest" className={classes.button} color="primary" onClick={() => randomAstoridId()}>
                            Random Astorid
                        </Button>
                    </Typography>
                    :
                    <Typography component='div' className={classes.details}>
                        <Typography component='p' className={classes.para}>Name:
                            <Typography component='span' className={classes.datax}>{astoridDetails?.name}</Typography>
                        </Typography>
                        <Typography component='p' className={classes.para}>Nasa_jpl_url:
                            <Typography component='span' className={classes.datax}>{astoridDetails?.Nasa_jpl_url}</Typography>
                        </Typography>
                        <Typography>is_potentially_hazardous_asteroid:
                            <Typography component='span' className={classes.datax}>{astoridDetails?.is_potentially_hazardous_asteroid}</Typography>
                        </Typography>
                    </Typography >
            }
        </Container >
    
}
