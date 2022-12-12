import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate('/' + props.id);
    }

    return (
        <div style={{}} onClick={onClick}>
            <Card
                style={{
                width: 400,
                backgroundColor: "gray",
                }}
            hoverable="true">
                <CardContent>
                    <Typography variant="h5" component="h2" style={{margin:20}}>
                        {props.name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
export default ProjectCard
