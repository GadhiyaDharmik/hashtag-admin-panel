/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";
import { Switch } from "@mui/material";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

function Blog() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [fileData, setFileData] = useState(null);
  const [title, setTitle] = useState(null);
  const [discription, setDiscription] = useState(null);
  const [blogList, setBlogList] = useState([]);
  const [lodder, setLodder] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setLodder(true);
    axios.get("https://hashteg-bbfc1-default-rtdb.firebaseio.com/blogs.json").then((res) => {
      const data = Object.values(res.data);
      if (data.length > 0) {
        setBlogList(data);
        setLodder(false);
      } else {
        setBlogList([]);
      }
    });
  }, []);

  const handleSubmit = () => {
    console.log(fileData);
    const data = { file: fileData, title: title, discription: discription };
    if (fileData !== null && title !== null && discription !== null) {
      axios
        .post("https://hashteg-bbfc1-default-rtdb.firebaseio.com/blogs.json", data)
        .then((res) => {
          if (res.status === 200) {
            setFileData(null);
            document.getElementsById("file-upload").value = "";
            setTitle(null);
            setDiscription(null);
            alert("Blog Created Success Fully");
            setBlogList([...blogList, data]);
          }
        });
    } else {
      alert("please fill all detail");
    }

    // console.log(pColumns);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Create Blogs
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <MDBox mb={2}>
                      <MDInput
                        type="file"
                        id="file-upload"
                        label=""
                        fullWidth
                        onChange={handleFileChange}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="title"
                        label="Title"
                        value={title}
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type="discription"
                        label="Discription"
                        value={discription}
                        fullWidth
                        onChange={(e) => setDiscription(e.target.value)}
                      />
                    </MDBox>
                    {/* <MDBox display="flex" alignItems="center" ml={-1}>
                      <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                      <MDTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                      >
                        &nbsp;&nbsp;Remember me
                      </MDTypography>
                    </MDBox> */}
                    <MDBox mt={4} mb={1}>
                      <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                        Create Blog
                      </MDButton>
                    </MDBox>
                    {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  All Blogs
                </MDTypography>
              </MDBox>
              <MDBox mb={3} ml={3} mt={3} style={{ height: "50vh", overflowY: "auto" }}>
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}

                <Grid container spacing={3}>
                  {blogList.map((ele, index) => (
                    <Grid item xs={12} md={6} xl={4} p={5} key={index}>
                      <SimpleBlogCard
                        image={ele.file}
                        title={ele.title}
                        description={ele.discription}
                        action={{
                          type: "internal",
                          route: "/somewhere",
                          color: "info",
                          label: "Go Somewhere",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Blog;
