import { Typography } from "@mui/material";
import Footer from "./shared/Footer";

export default function LandingContainer(){
    return (
        <div style={{height:"100%", display:"grid",gridTemplateRows:"min-content auto min-content", paddingInline:25, paddingTop: 64}}>
            <div style={{marginBlock:5}}>
                <Typography variant="h4">Index View: </Typography>
            </div>

            <div style={{overflow:"auto",borderRadius:5, boxShadow: "box-shadow: inset 0 0 10px #000000"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo architecto assumenda, quam perspiciatis consequatur distinctio consectetur, quis accusamus eligendi minima obcaecati ipsum fugiat odit error doloremque, debitis tempora ullam.
            </div>

            <Footer />
        </div>
    )
}