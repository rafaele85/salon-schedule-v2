import {Button, makeStyles, Theme, Typography} from "@material-ui/core";
import {SALONS} from "../types/salon";

const useStyles = makeStyles((_theme: Theme) => ({
    container: {
        height: "100%",
        width: "100%",
        overflow: "scroll",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    container1: {
        flex: 0,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        padding: "20px",
        border: "1px solid lightgray",
    },
    header: {
        flex: 0,
        display: "flex",
    },
    text: {
        minWidth: "400px",
        background: "lightgray",
        padding: "20px",
        flex: 0,
        display: "flex",
    },
    footer: {
        flex: 0,
        display: "flex",
    },
}));


export interface ISaveResultProps {
    schedules: Date[][];
    onClose: () => void;
}

type ISTime = {from: number, to: number};
type ISTimes = {[key: string]: ISTime[]};

export const SaveResult = (props: ISaveResultProps) => {
    const classes = useStyles();

    //console.log("saveresult", props.schedules)

    const schedules = [];
    for(let i=0; i<props.schedules.length; i++) {
        const sc = props.schedules[i].sort((a,b) => +a - +b);
        if(!sc || sc.length===0) {
            continue;
        }
        const scheduleType = SALONS[i];
        const dt: ISTimes = {};
        for(let j=0; j<sc.length; j++) {
            const d = sc[j];
            const wd = d.toString().split(" ")[0];
            const hr = d.getHours();
            console.log(`~~~~${wd} ${hr}`, d)
            const tms = dt[wd] || [];
            if(tms.length===0 || tms[tms.length-1].to<hr) {
                tms.push({from: hr, to: hr+1});
            } else {
                tms[tms.length-1].to++;
            }
            dt[wd] = tms;
        }
        schedules.push({scheduleType, times: dt});
    }


    const text = JSON.stringify(schedules, null, 2);
    const handleClick = () => {
        props.onClose();
    }

    return (
        <div className={classes.container}>
            <div className={classes.container1}>
                <header className={classes.header}>
                    <Typography variant={"h4"}>
                        Save Result
                    </Typography>
                </header>
                <pre className={classes.text}>
                {text}
            </pre>
                <footer className={classes.footer}>
                    <Button color={"primary"} variant={"contained"} onClick={handleClick}>Назад</Button>
                </footer>
            </div>
        </div>
    );
}