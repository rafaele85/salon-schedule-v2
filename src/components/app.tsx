import {createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Theme} from "@material-ui/core";
import {GlobalStyles} from "./global-styles";
import {useState} from "react";
import {SalonSchedule} from "./salon-schedule";
import {SaveResult} from "./save-result";


const useStyles = makeStyles((_theme: Theme) => {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
        },
        container1: {
            display: "flex",
            flexDirection: "column",
        },
        container2: {
            display: "flex",
            flexDirection: "row",
        },
        entity: {
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            padding: "10px",
            border: "1px solid lightgray",
            borderRadius: "5px",
        },
        header: {
            flex: 0,
            display: "flex",
            justifyContent: "center",
            fontWeight: 600,
            border: "1px solid lightgray",
            padding: "4px",
            marginBottom: "10px",
        },
        body: {
            flex: 1,
            display: "flex",
        },
        footer: {
            flex: 0,
            display: "flex",
            border: "1px solid lightgray",
            width: "100%",
            margin: "10px",
            padding: "20px",
            justifyContent: "center",
        }
    }
})

export const App = () => {

    const [showResult, setShowResult] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<Date[][]>([]);

    const handleChange = (scheduleNo: number, v: Date[]) => {
        const newSchedules = [...schedules];
        newSchedules[scheduleNo] = v;
        setSchedules(newSchedules);
    };

    const handleSave = () => {
        setShowResult(true);
    };

    const handleClose = () => {
        setShowResult(false);
    }

    const classes = useStyles();

    const theme = createMuiTheme({palette: {type: "light"}});

    let jsx;
    if(showResult) {
        jsx=(
            <SaveResult schedules={schedules} onClose={handleClose}/>
        );
    } else {
        jsx=(
            <SalonSchedule
                onSave={handleSave}
                schedule={schedules}
                onChange={handleChange}
            />
        );
    }

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <div className={classes.container}>
                {jsx}
            </div>
        </MuiThemeProvider>
    );
}
