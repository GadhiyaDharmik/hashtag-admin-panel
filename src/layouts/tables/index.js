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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";
import MDSnackbar from "components/MDSnackbar";
import "../../assets/lodar.css";

function Blog() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [fileData, setFileData] = useState("");
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [lodder, setLodder] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [showMassage, setShowMassage] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const fileClick = useRef();

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

  function getData() {
    axios
      .get("https://hastag-admin-default-rtdb.firebaseio.com/blogs.json", {
        Authorization: "Bearer J3_0kzz6HPJ1AyB4X4rG9QoZK2h3YnnpYjEgetbibb8", // Replace YOUR_TOKEN with your actual authorization token
        "Content-Type": "application/json", // Adjust content type if necessary
      })
      .then((res) => {
        if (res.data !== null) {
          let data = Object.values(res.data);
          let ids = Object.keys(res.data);
          const allData = data.map((ele, index) => {
            return { id: ids[index], ...ele };
          });
          setBlogList(allData);
          // console.log(allData);
          setLodder("");
        } else {
          setBlogList([]);
        }
      });
  }
  useEffect(() => {
    setLodder("table");
    getData();
  }, []);

  const handleSubmit = () => {
    console.log(fileData);
    const data = { file: fileData, title: title, discription: discription };
    if (fileData !== "" && title !== "" && discription !== "") {
      setFileData("");
      document.getElementById("file-upload").value = "";
      setTitle("");
      setDiscription("");
      setLodder("form");
      if (isEdit !== "") {
        let id = blogList.filter((ele) => ele.id === isEdit);

        axios
          .put(`https://hastag-admin-default-rtdb.firebaseio.com/blogs/${id?.at(0).id}.json`, data)
          .then((res) => {
            if (res.status === 200) {
              // alert("Blog Created Success Fully");
              getData();
              setSuccessSB(true);
              setShowMassage("Blog Updated Successfully");
              setIsEdit("");
              setLodder("");
              // setBlogList([...blogList, data]);
            }
          });
      } else {
        axios
          .post("https://hastag-admin-default-rtdb.firebaseio.com/blogs.json", data)
          .then((res) => {
            if (res.status === 200) {
              // alert("Blog Created Success Fully");
              setSuccessSB(true);
              setLodder("");

              setShowMassage("Blog Created Successfully");
              getData();
            }
          });
      }
    } else {
      alert("please fill all detail");
    }

    // console.log(pColumns);
  };
  const handleClickEdit = (ele) => {
    console.log(ele);
    setTitle(ele.title);
    setFileData(ele.file);
    setDiscription(ele.discription);
    setIsEdit(ele.id);
  };
  const handleClickDelete = (ele) => {
    // setBlogList([...blogList].filter((item) => item.id !== ele.id));
    let dataList = [...blogList];
    // dataList.filter((item) => item.id !== ele.id);
    // cosnole.log
    axios
      .delete(`https://hastag-admin-default-rtdb.firebaseio.com/blogs/${ele.id}.json`)
      .then((res) => {
        if (res.status === 200) {
          setBlogList([...blogList].filter((item) => item.id !== ele.id));
          setSuccessSB(true);
          setShowMassage("Blog Deleted Successfully");
        }
      });
  };

  const handleFileClick = () => {
    fileClick.current.click();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
        color="success"
        icon="check"
        title="HashTag Solution"
        content={showMassage}
        // dateTime="11 mins ago"
        open={successSB}
        onClose={() => setSuccessSB(false)}
        close={() => setSuccessSB(false)}
        bgWhite
      />
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
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} xl={6}>
                        {fileData !== "" ? (
                          <div
                            style={{
                              width: "100%",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={fileData}
                              style={{
                                width: "100%",
                                border: "2px dotted #777",
                                borderRadius: "20%",
                              }}
                              onClick={handleFileClick}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={
                                "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol-landscape-sign-photograph-gallery-logo-web-interface-and.jpg?s=612x612&w=0&k=20&c=ZmXO4mSgNDPzDRX-F8OKCfmMqqHpqMV6jiNi00Ye7rE="
                              }
                              style={{
                                width: "100%",
                                border: "2px dotted #777",
                                borderRadius: "20%",
                              }}
                              onClick={handleFileClick}
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          id="file-upload"
                          ref={fileClick}
                          label=""
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12} xl={6}>
                        <Grid container spacing={3} mt={5}>
                          <Grid item xs={12} md={12} xl={12}>
                            <MDInput
                              type="text"
                              label="Title"
                              value={title}
                              fullWidth
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} md={12} xl={12}>
                            <MDInput
                              multiline
                              label="Discription"
                              value={discription}
                              fullWidth
                              onChange={(e) => setDiscription(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} md={12} xl={12}>
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              onClick={handleSubmit}
                            >
                              {lodder === "form" ? (
                                <div className="loader"></div>
                              ) : isEdit !== "" ? (
                                "Update Blog"
                              ) : (
                                "Create Blog"
                              )}
                            </MDButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* <MDBox mb={2}></MDBox>
                    <MDBox mb={2}></MDBox>
                    <MDBox mb={2}></MDBox> */}
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
                    {/* <MDBox mt={4} mb={1}>
                    
                    </MDBox> */}
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

                {blogList.length > 0 ? (
                  <Grid container spacing={3}>
                    {blogList.map((ele, index) => (
                      <Grid item xs={12} md={6} xl={4} p={5} key={index}>
                        <SimpleBlogCard
                          image={ele.file}
                          title={ele.title}
                          description={ele.discription}
                          handleClickDelete={() => handleClickDelete(ele)}
                          handleClickEdit={() => handleClickEdit(ele)}
                          action={{
                            type: "external",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} xl={12} p={5} style={{ textAlign: "center" }}>
                      {lodder === "table" ? <div className="loader"></div> : "No Data"}
                    </Grid>
                  </Grid>
                )}
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
