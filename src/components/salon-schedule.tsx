import {Schedule} from "./schedule";
import {Button, makeStyles, Theme} from "@material-ui/core";
import {SALONS} from "../types/salon";


const useStyles = makeStyles((_theme: Theme) => {
    return {
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
});

export interface ISalonScheduleProps {
    onSave: () => void;
    schedule: Date[][];
    onChange: (scheduleNo: number, schedule: Date[]) => void
}

export const SalonSchedule = (props: ISalonScheduleProps) => {

    const classes = useStyles();

    const jsxSalons: JSX.Element[] = [];
    for(let i=0; i<SALONS.length; i++) {
        const s = SALONS[i];
        jsxSalons.push((
            <div className={classes.entity} key={i}>
                <div className={classes.header}>
                    {s}
                </div>
                <div className={classes.body}>
                    <Schedule schedule={props.schedule[i]} onChange={(v: Date[]) => props.onChange(i, v)}/>
                </div>
            </div>
        ));
    }


    return (
        <div className={classes.container1}>
            <div className={classes.container2}>
                {jsxSalons}
            </div>
            <div className={classes.footer}>
                <Button variant="contained" color={"primary"} onClick={props.onSave}>Сохранить</Button>
            </div>
        </div>
    )
}