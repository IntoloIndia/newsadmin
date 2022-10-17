import React, { useState, useRef, } from "react";
import {
  Box,
  CardContent,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import JoditEditor from "jodit-react";

const NewsEditer = () => {
  const classes = useStyles;

  const [newsTitle, setNewsTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const newsSubmit = () => {
    const blogdata = {
      newsTitle:newsTitle,
      subTitle:subTitle,
      content:content
    }
    alert(JSON.stringify(blogdata));
  };

  const inputnewstilte = (e) => {
    setNewsTitle(e.target.value);
  };
    const inputsubTitle = (e) => {
      setSubTitle(e.target.value);
    };

  return (
    <Box className={classes.section}>
      <PageHeader label="news" />
      <Grid container>
        <Grid item lg={12} md={12} xs={12} sm={12}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6">Post Title</Typography>
              <Box>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Title"
                  label="Title"
                  fullWidth
                  value={newsTitle}
                  onChange={inputnewstilte}
                  style={{ marginBottom: 10 }}
                />
                <Typography variant="h6">sub Title</Typography>
                <TextField
                  label="subtitle"
                  multiline
                  rows={4}
                  placeholder='text...........'
                  variant="outlined"
                  fullWidth
                  value={subTitle}
                  onChange={inputsubTitle}
                  style={{marginBottom:10}}
                />
                <JoditEditor
                  ref={editor}
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {}}
                />
                <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                  {/* <Button type="reset" variant="contained" color="secondary">Reset</Button> */}
                  <Button
                    style={{ marginBottom: 10 }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      newsSubmit();
                    }}
                  >
                   Create Post
                  </Button>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsEditer;
